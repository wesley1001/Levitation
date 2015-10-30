/**
 * @author Mike Kascel (mkascel@gmail.com)
 */

'use strict';

var React = require('react-native'),
  Header = require('./App/components/Header'),
  Content = require('./App/components/Content');

var {
  AppRegistry,
  StyleSheet,
  View
} = React;

var Levitation = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Content />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  }
});

AppRegistry.registerComponent('Levitation', () => Levitation);

/**
 * App-level TODOs:
 * - Look into structured data storage when something has matured, change TimelineEvent to manage it's own state.
 */
