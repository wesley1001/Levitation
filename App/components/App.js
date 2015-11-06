const React = require('react-native'),
  AsyncStorageActions = require("../actions/AsyncStorageActions"),
  ServerActions = require('../actions/ServerActions'),
  StoreMixin = require('../mixins/StoreMixin'),
  Header = require('./Header'),
  DayView = require("./DayView"),
  _ = require("lodash"),
  stringUtils = require("../utils/StringUtils");

const {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Navigator
} = React;

const App = React.createClass({
  mixins: [StoreMixin],

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

  /**
   * If no data return from AsyncStorage in `componentWillMount()`, make server fetch.
   * This will be called as part of normal lifecycle if getAsyncStorageData fails.
   */
  componentDidUpdate() {
    if (!this.state.isDataReady && this.state.needsServerFetch) {
      ServerActions.fetchScheduleData();
    }
  },

  _handleBackNav() {
    var navIndex = this.state.navIndex;

    this.refs.navigator.pop();
    this.setState({navIndex: navIndex - 1});
  },

  _handleForwardNav() {
    var navIndex = this.state.navIndex,
      nextIndex = navIndex + 1;

    this.refs.navigator.push({day: _.get(this.state.schedule[nextIndex], 'date')});
    this.setState({navIndex: nextIndex});
  },

  /**
   * Flip selected state.
   * @param {obj} timelineEvent - The pressed event.
   */
  _handleTimelineEventPress(timelineEvent) {
    // TODO: Probably a better functional way to do this.  Come up with structure-independent way.
    var eventDay = stringUtils.parseDate(timelineEvent.datetime),
      // Create copy of schedule to pass to `setState` after prop change.
      schedule = this.state.schedule,
      stages = _.get(_.find(schedule, {date: eventDay}), 'stages'),
      eventObj;

    // TODO: Find a non-stupid way to do this.  Something like a deep _.findWhere
    // (which is supposed to be deep per docs??) - https://lodash.com/docs#findWhere
    for (let i=0, l=stages.length; i<l; i++) {
      eventObj = _.find(stages[i].lineup, {id: timelineEvent.id});
      if (eventObj) break;
    }

    eventObj.selected = !eventObj.selected;

    this.setState({schedule: schedule});
    AsyncStorageActions.setAsyncStorageData(JSON.stringify({schedule: schedule}));
  },

  render() {
    const schedule = this.state.schedule,
      lastDayIndex = _.indexOf(schedule, _.last(schedule));

    let navIndex = this.state.navIndex;

    if (!this.state.isDataReady) { return <View />; }

    return (
      <View style={styles.container}>
        <View>
          {navIndex > 0 &&
            <TouchableOpacity onPress={this._handleBackNav}><Text>{'< Back'}</Text></TouchableOpacity>
          }
          {navIndex !== lastDayIndex &&
            <TouchableOpacity onPress={this._handleForwardNav}><Text>{'Forward >'}</Text></TouchableOpacity>
          }
        </View>
        <Header />
        <Navigator
          ref="navigator"
          initialRoute={{day: _.get(_.first(this.state.schedule), 'date')}}
          renderScene={(route, navigator) =>     
            <DayView 
              key={route.day} 
              day={route.day} 
              stages={_.get(_.find(this.state.schedule, {date: route.day}), 'stages')} 
              eventPressHandler={this._handleTimelineEventPress} 
            />
          }
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});

module.exports = App;
