const React = require('react-native'),
  AsyncStorageActions = require("../actions/AsyncStorageActions"),
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
  Navigator
} = React;

const App = React.createClass({
  mixins: [StoreMixin],

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
    let navIndex = this.state.navIndex;

    const schedule = this.state.schedule,
      lastDayIndex = _.indexOf(schedule, _.last(schedule)),
      dates = _.pluck(schedule, 'date'),
      backNavText = `< ${stringUtils.parseDate(dates[navIndex - 1])}`
      forwardNavText = `${stringUtils.parseDate(dates[navIndex + 1])} >`;

    if (!this.state.isDataReady) { return <View />; }

    return (
      <View style={styles.container}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          {navIndex > 0 &&
            <TouchableOpacity style={{alignSelf: 'flex-start', flexBasis: 'content', marginLeft: 5}} onPress={this._handleBackNav}><Text>{backNavText}</Text></TouchableOpacity>
          }
          <View style={{flex: 1}}></View>
          {navIndex !== lastDayIndex &&
            <TouchableOpacity style={{alignSelf: 'flex-end', flexBasis: 'content', marginRight: 5}} onPress={this._handleForwardNav}><Text>{forwardNavText}</Text></TouchableOpacity>
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
