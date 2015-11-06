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
    var navIndex = this.state.navIndex;

    this.refs.navigator.push({day: "2015-05-09"});
    this.setState({navIndex: navIndex + 1});
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
      stages = schedule[eventDay],
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
    const days = _.keys(this.state.schedule),
      lastDay = _.last(days);

    let currentDay = days[this.state.navIndex]

    if (!this.state.isDataReady) { return <View />; }

    return (
      <View style={styles.container}>
        <View>
          {this.state.navIndex > 0 &&
            <TouchableOpacity onPress={this._handleBackNav}><Text>{'< Back'}</Text></TouchableOpacity>
          }
          {currentDay !== lastDay &&
            <TouchableOpacity onPress={this._handleForwardNav}><Text>{'Forward >'}</Text></TouchableOpacity>
          }
        </View>
        <Header />
        <Navigator
          ref="navigator"
          initialRoute={{day: _.first(_.keys(this.state.schedule))}}
          renderScene={(route, navigator) =>     
            <DayView 
              key={route.day} 
              day={route.day} 
              stages={this.state.schedule[route.day]} 
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
