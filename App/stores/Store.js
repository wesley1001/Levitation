const Dispatcher = require('../dispatchers/Dispatcher'),
  EventEmitter = require('events').EventEmitter,
  ActionTypes = require('../constants/Constants').ActionTypes;
  
const CHANGE_EVENT = 'change';

let _schedule = {},
  
  // First, try local storage.
  _needsAsyncStorageFetch = true,
  
  // If that fails, fetch from server.
  _needsServerFetch = false,

  // Set `true` when data is ready (either via AsyncStorage or successful server fetch).
  _isDataReady = false;

let Store = Object.assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getSchedule() {
    return _schedule;
  },

  needsAsyncStorageFetch() {
    return _needsAsyncStorageFetch;
  },

  needsServerFetch() {
    return _needsServerFetch;
  },

  isDataReady() {
    return _isDataReady;
  }
});

Store.dispatchToken = Dispatcher.register(function (action) {
  switch(action.type) {
    case ActionTypes.GET_ASYNCSTORAGE_DATA_SUCCESS:
      console.log('AsyncStorage fetch success!');
      _schedule = action.schedule;
      _needsAsyncStorageFetch = false;
      _isDataReady = true;
      Store.emitChange();
      break;

    case ActionTypes.GET_ASYNCSTORAGE_DATA_EMPTY:
      console.log('AsycStorage was empty!');
      _needsAsyncStorageFetch = false;
      _needsServerFetch = true;
      Store.emitChange();
      break;

    // TODO: Handle
    case ActionTypes.GET_ASYNCSTORAGE_DATA_ERROR:
      console.log('Error getting AsycStorage!', action.error);
      _needsAsyncStorageFetch= false;
      _needsServerFetch = true;
      Store.emitChange();
      break;

    case ActionTypes.SET_ASYNCSTORAGE_DATA:
      console.log('Setting AsycStorage data');
      break;

    case ActionTypes.SET_ASYNCSTORAGE_DATA_SUCCESS:
      console.log('Asyc data set successfully!');
      _needsAsyncStorageFetch = false;
      _isDataReady = true;
      Store.emitChange();
      break;

    // TODO: Handle
    case ActionTypes.SET_ASYNCSTORAGE_DATA_ERROR:
      console.log('Error setting AsycStorage!', action.error);
      _needsAsyncStorageFetch= false;
      _needsServerFetch = false;
      Store.emitChange();
      break;

    case ActionTypes.FETCH_SCHEDULE_SUCCESS:
      console.log('Server data fetch success!');
      _schedule = action.schedule;
      _needsServerFetch = false;
      _isDataReady = true;
      Store.emitChange();
      break;

    // TODO: Handle
    case ActionTypes.FETCH_SCHEDULE_ERROR:
      console.log('Server data fetch error!', action.error);
      _isDataReady = false;
      //Store.emitChange();
      break;
  }

  return true;
});

module.exports = Store;