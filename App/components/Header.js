var React = require('react-native');

var {
  View,
  Text,
  StyleSheet
} = React;

var Header = React.createClass({
  render() {
    return (
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.header}>Reverberation Stage</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.header}>Levitation Tent</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.header}>Elevation Ampitheatre</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    //borderWidth: 1,
    //borderColor: 'blue',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    //borderWidth: 1,
    //borderColor: 'green',
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: 5
  },
  header: {
    textAlign: 'center',
    fontSize: 18
  }
});

module.exports = Header;
