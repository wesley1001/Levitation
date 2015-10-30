var React = require('react-native'),
  AsyncStorageActions = require("../actions/AsyncStorageActions"),
  ServerActions = require('../actions/ServerActions'),
  Store = require("../stores/Store"),
  TimelineEvent = require("./TimelineEvent"),
  _ = require("lodash"),
  stringUtils = require("../utils/StringUtils"),
  moment = require("moment");

var {
  ScrollView,
  View,
  Text,
  StyleSheet,
  AsyncStorage
} = React;

function getStateFromStore() {
  return { 
    schedule: Store.getSchedule(),
    needsAsyncStorageFetch: Store.needsAsyncStorageFetch(),
    needsServerFetch: Store.needsServerFetch(),
    isDataReady: Store.isDataReady()
  };
}

var Content = React.createClass({
  getInitialState() {
    return getStateFromStore();
  },

  /**
   * On initial load, try to get existing data from local storage.
   */
  componentWillMount() {
    if (this.state.needsAsyncStorageFetch) {
      // Clear async data to simulate first open
      AsyncStorage.clear();

      AsyncStorageActions.getAsyncStorageData();  
    }
  },

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },

  /**
   * If no data return from AsyncStorage in `componentWillMount()`, make server fetch.
   * This will be called as part of normal lifecycle if getAsyncStorageData fails.
   */
  componentDidUpdate() {
    if (!this.state.isDataReady && this.state.needsServerFetch) {
      ServerActions.fetchScheduleData();
    }
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange() {
    this.setState(getStateFromStore());
  },

  /**
   * Flip selected state.
   * @param {obj} timelineEvent - The pressed event.
   */
  _handleTimelineEventPress(timelineEvent) {
    console.log("event", timelineEvent);
    // TODO: Probably a better functional way to do this.  Come up with structure-independent way.
    var eventDay = stringUtils.parseDate(timelineEvent.datetime),
      // Create copy of schedule to pass to `setState` after prop change.
      schedule = this.state.schedule,
      stages = schedule[eventDay],
      eventObj;

    // TODO: Find a non-stupid way to do this.  Something like a deep _.findWhere
    // (which is supposed to be deep per docs??) - https://lodash.com/docs#findWhere
    _.each(stages, function(stage) {
      if (!eventObj) {
        eventObj = _.find(stage.lineup, {id: timelineEvent.id});
      }
    });

    eventObj.selected = !eventObj.selected;

    this.setState({schedule: schedule});
    AsyncStorageActions.setAsyncStorageData(JSON.stringify({schedule: schedule}));
  },

  render() {
    if (_.isEmpty(this.state.schedule)) { return <View />; }

    var days = _.keys(this.state.schedule);

    return (
      <ScrollView contentContainerSyle={styles.container}>
        {days.map(day => { 
          return <View key={day}>
          <View style={[styles.row, {justifyContent: 'center'}]}><Text style={styles.day}>{moment(day).format("MMM d")}</Text></View>
          <View style={styles.row}>
          {this.state.schedule[day].map(stage => {
            return <View key={stage.stageId} style={styles.column}>
              {stage.lineup.map(timelineEvent => {
                return <TimelineEvent key={timelineEvent.id} {...timelineEvent} onPress={this._handleTimelineEventPress.bind(this, timelineEvent)} />
              })}
            </View>
          })}
          </View>
        </View>
        })}
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: 5
  },
  day: {
    fontSize: 20,
    textAlign: 'center'
  }
});

module.exports = Content;
