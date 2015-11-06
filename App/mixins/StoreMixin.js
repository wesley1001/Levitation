const Store = require("../stores/Store");

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
