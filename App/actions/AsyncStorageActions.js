const React = require('react-native'), 
  Dispatcher = require('../dispatchers/Dispatcher'),
  Constants = require('../constants/Constants'),
  ActionTypes = Constants.ActionTypes,
  StringUtils = require('../utils/StringUtils');

const { AsyncStorage } = React;

const AsyncStorageActions = {
  getAsyncStorageData() {
    //console.log("get async payload");
    AsyncStorage.getItem(Constants.ASYCSTORAGE_KEY)
      .then((payloadString) => this._dispatchGetAsyncStorageSuccess(payloadString))
      .catch((error) => this._dispatchGetAsyncStorageError(error))
      .done();
  },

  setAsyncStorageData(payload) {
    AsyncStorage.setItem(Constants.ASYCSTORAGE_KEY, payload)
      .then(() => this._dispatchSetAsyncStorageSuccess())
      .catch((error) => this._dispatchSetAsyncStorageError(error))
      .done();
  },

  _dispatchGetAsyncStorageSuccess(payloadString) {
    if (payloadString) {
      let payload = StringUtils.JSONParser(payloadString);

      Dispatcher.dispatch({
        type: ActionTypes.GET_ASYNCSTORAGE_DATA_SUCCESS,
        schedule: payload.schedule
      });
    } else {
      Dispatcher.dispatch({
        type: ActionTypes.GET_ASYNCSTORAGE_DATA_EMPTY
      });
    }
  },

  _dispatchGetAsyncStorageError(error) {
    Dispatcher.dispatch({
      type: ActionTypes.GET_ASYNCSTORAGE_DATA_ERROR,
      error: error
    });    
  },

  _dispatchSetAsyncStorageSuccess() {
    Dispatcher.dispatch({
      type: ActionTypes.SET_ASYNCSTORAGE_DATA_SUCCESS
    });
  },

  _dispatchSetAsyncStorageError(error) {
    Dispatcher.dispatch({
      type: ActionTypes.SET_ASYNCSTORAGE_DATA_ERROR,
      error: error
    });   
  }
};

module.exports = AsyncStorageActions;
