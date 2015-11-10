const React = require("react-native"),
  Store = require("../stores/Store"),
  AsyncStorageActions = require("../actions/AsyncStorageActions"),
  ServerActions = require('../actions/ServerActions');

const { AsyncStorage } = React;

function getStateFromStore() {
  return { 
    schedule: Store.getSchedule(),
    needsAsyncStorageFetch: Store.needsAsyncStorageFetch(),
    needsServerFetch: Store.needsServerFetch(),
    isDataReady: Store.isDataReady()
  };
}

const StoreMixin = {
  getInitialState() {
    var state = getStateFromStore();
    state.navIndex = 0; // Remove this from Store state eventually.

    return state;
  },

  /**
   * On initial load, try to get existing data from local storage.
   */
  componentWillMount() {
    if (this.state.needsAsyncStorageFetch) {
      // Clear async data to simulate first open
      AsyncStorage.clear();

      AsyncStorageActions.getAsyncStorageData();  
    }
  },

  /**
   * If no data return from AsyncStorage in `componentWillMount()`, make server fetch.
   * This will be called as part of normal lifecycle if getAsyncStorageData fails.
   */
  componentDidUpdate() {
    if (!this.state.isDataReady && this.state.needsServerFetch) {
      ServerActions.fetchScheduleData();
    }
  },

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange() {
    this.setState(getStateFromStore());
  }
};

module.exports = StoreMixin;
