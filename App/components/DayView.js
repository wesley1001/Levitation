var React = require("react-native"),
  DayViewStage = require("./DayViewStage"),
  moment = require("moment"),
  stringUtils = require('../utils/StringUtils');

var {
  ScrollView,
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
      <ScrollView contentContainerSyle={styles.contentContainer}>
        <View style={[styles.row, {justifyContent: 'center'}]}>
          <Text style={styles.day}>{stringUtils.parseDate(day)}</Text>
        </View>
        <View style={styles.row}>
          {stages.map((stage, i) => {
            return <DayViewStage key={i} {...stage} {...other} />
          })}
        </View>
      </ScrollView>
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
