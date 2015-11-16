const React = require('react-native'),
  DayViewStageEvent = require('./DayViewStageEvent');

const { 
  View,
  StyleSheet
} = React;

let DayViewStage = React.createClass({
  propTypes: {
    stageId: React.PropTypes.number,
    lineup: React.PropTypes.array,
    eventPressHandler: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <View key={this.props.stageId} style={styles.column}>
        {this.props.lineup.map(timelineEvent => {
          return <DayViewStageEvent 
            key={timelineEvent.id} {...timelineEvent} 
            onPress={this.props.eventPressHandler.bind(null, timelineEvent)} 
          />
        })}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: 5
  }
});

module.exports = DayViewStage;
