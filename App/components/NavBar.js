const React = require("react-native"),
  stringUtils = require('../utils/StringUtils'),
  _ = require("lodash");

const { 
  View,
  TouchableOpacity,
  Text
} = React;

var NavBar = React.createClass({
  propTypes: {
    dates: React.PropTypes.array,
    navIndex: React.PropTypes.number,
    handleBackNav: React.PropTypes.func.isRequired,
    handleForwardNav: React.PropTypes.func.isRequired
  },

  render() {
    const parseDate = stringUtils.parseDate;

    let navIndex = this.props.navIndex,
      dates = this.props.dates,
      lastDayIndex = _.indexOf(dates, _.last(dates)),
      backNavText = `< ${parseDate(dates[navIndex - 1])}`,
      forwardNavText = `${parseDate(dates[navIndex + 1])} >`;

    return (
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        {navIndex > 0 &&
          <TouchableOpacity 
            style={{alignSelf: 'flex-start', marginLeft: 5}} 
            onPress={this.props.handleBackNav}>
            <Text>{backNavText}</Text>
          </TouchableOpacity>
        }
        <View style={{flex: 1}}></View>
        {navIndex !== lastDayIndex &&
          <TouchableOpacity 
            style={{alignSelf: 'flex-end', marginRight: 5}} 
            onPress={this.props.handleForwardNav}>
            <Text>{forwardNavText}</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
});

module.exports = NavBar;