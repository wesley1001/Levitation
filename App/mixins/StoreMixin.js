const Store = require("../stores/Store");

function getStateFromStore() {
  return { 
    schedule: Store.getSchedule(),
    needsAsyncStorageFetch: Store.needsAsyncStorageFetch(),
    needsServerFetch: Store.needsServerFetch(),
    isDataReady: Store.isDataReady(),
    navIndex: 0 // Remove this from Store state eventually.
  };
}

const StoreMixin = {
  getInitialState() {
    console.log("store");
    return getStateFromStore();
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
