const React = require('react-native'),
  stringUtils = require('../utils/StringUtils'),
  _ = require('lodash');

const { 
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} = React;

var NavBar = React.createClass({
  propTypes: {
    dates: React.PropTypes.array,
    navIndex: React.PropTypes.number,
    handleBackNav: React.PropTypes.func.isRequired,
    handleForwardNav: React.PropTypes.func.isRequired
  },

  render() {
    let dates = this.props.dates,
      navIndex = this.props.navIndex,
      parseDate = stringUtils.parseDate,
      lastDayIndex = _.indexOf(dates, _.last(dates)),
      backNavText = `< ${parseDate(dates[navIndex - 1])}`,
      forwardNavText = `${parseDate(dates[navIndex + 1])} >`;

    return (
      <View style={styles.container}>
        {navIndex > 0 &&
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={this.props.handleBackNav}>
            <Text>{backNavText}</Text>
          </TouchableOpacity>
        }
        <View style={styles.spacer}></View>
        {navIndex !== lastDayIndex &&
          <TouchableOpacity 
            style={styles.forwardButton} 
            onPress={this.props.handleForwardNav}>
            <Text>{forwardNavText}</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between', 
    flexDirection: 'row'
  },
  backButton: {
    alignSelf: 'flex-start', 
    marginLeft: 5
  },
  spacer: {
    flex: 1
  },
  forwardButton: {
    alignSelf: 'flex-end', 
    marginRight: 5
  }
});

module.exports = NavBar;