var React = require("react-native"),
  DayViewStage = require("./DayViewStage"),
  moment = require("moment");

var { 
  View,
  Text,
  StyleSheet 
} = React;

var DayView = React.createClass({
  propTypes: {
    day: React.PropTypes.string,
    stages: React.PropTypes.array,
  },

  render() {
    var { day, stages, ...other } = this.props;

    return (
      <View key={this.props.day}>
        <View style={[styles.row, {justifyContent: 'center'}]}>
          <Text style={styles.day}>{moment(day).format("MMM d")}</Text>
        </View>
        <View style={styles.row}>
        {this.props.stages.map((stage, i) => {
          return <DayViewStage key={i} {...stage} {...other} />
        })}
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  day: {
    fontSize: 20,
    textAlign: 'center'
  }
})

module.exports = DayView;
