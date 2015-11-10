const React = require('react-native'),
  AsyncStorageActions = require("../actions/AsyncStorageActions"),
  StoreMixin = require('../mixins/StoreMixin'),
  NavBar = require('./NavBar'),
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
  Navigator
} = React;

const App = React.createClass({
  mixins: [StoreMixin],

  handleBackNav() {
    var navIndex = this.state.navIndex;

    this.refs.navigator.pop();
    this.setState({navIndex: navIndex - 1});
  },

  handleForwardNav() {
    var navIndex = this.state.navIndex,
      nextIndex = navIndex + 1;

    this.refs.navigator.push({day: _.get(this.state.schedule[nextIndex], 'date')});
    this.setState({navIndex: nextIndex});
  },

  /**
   * Flip selected state.
   * @param {obj} timelineEvent - The pressed event.
   */
  handleTimelineEventPress(timelineEvent) {
    // TODO: Probably a better functional way to do this.  Come up with structure-independent way.
    var eventDay = stringUtils.parseDatetime(timelineEvent.datetime),
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
    if (!this.state.isDataReady) { return <View />; }

    const schedule = this.state.schedule;

    let navBarProps = {
      dates: _.pluck(schedule, 'date'),
      navIndex: this.state.navIndex,
      handleBackNav: this.handleBackNav,
      handleForwardNav: this.handleForwardNav
    };

    return (
      <View style={styles.container}>
        <NavBar {...navBarProps} />
        <Header />   
        <Navigator
          ref="navigator"
          initialRoute={{day: _.get(_.first(schedule), 'date')}}
          renderScene={(route, navigator) =>  
            <DayView 
              key={route.day} 
              day={route.day} 
              stages={_.get(_.find(schedule, {date: route.day}), 'stages')} 
              eventPressHandler={this.handleTimelineEventPress} 
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
