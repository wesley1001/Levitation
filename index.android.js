/**
 * @author Mike Kascel (mkascel@gmail.com)
 */

'use strict';

const React = require('react-native'),
  App = require('./App/components/App');

const { AppRegistry } = React;

const Levitation = React.createClass({
  render() {
    return <App />;
  }
});

AppRegistry.registerComponent('Levitation', () => Levitation);

/**
 * App-level TODOs:
 * - Look into structured data storage when something has matured, change TimelineEvent to manage it's own state.
 */
