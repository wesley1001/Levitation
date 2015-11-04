var React = require("react-native"),
  stringUtils = require("../utils/StringUtils");

var { 
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} = React;

var DayViewStageEvent = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    datetime: React.PropTypes.string.isRequired,
    selected: React.PropTypes.bool,
    onPress: React.PropTypes.func.isRequired
  },

  render() {
    var time = stringUtils.parseTime(this.props.datetime);

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.eventWrapper, this.props.selected ? styles.selected : ""]}>
          <Text style={{textAlign: 'center'}}>{this.props.name}</Text>
          <Text style={{textAlign: 'center', marginTop: 5}}>{time}</Text>
        </View>
      </TouchableOpacity>
    ); 
  }
});

var styles = StyleSheet.create({
  eventWrapper: {
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  selected: {
    backgroundColor: 'green'
  }
});

module.exports = DayViewStageEvent;
