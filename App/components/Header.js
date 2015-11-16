const React = require('react-native');

const {
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: 5
  },
  header: {
    textAlign: 'center',
    fontSize: 16
  }
});

module.exports = Header;
