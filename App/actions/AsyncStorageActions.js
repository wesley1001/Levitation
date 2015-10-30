var React = require("react-native"), 
  Dispatcher = require("../dispatchers/Dispatcher"),
  Constants = require("../constants/Constants"),
  ActionTypes = Constants.ActionTypes,
  StringUtils = require("../utils/StringUtils");
  //AsyncStorageUtils = require("../utils/AsyncStorageUtils");

var AsyncStorage = React.AsyncStorage;

var AsyncStorageActions = {
  getAsyncStorageData() {
    //console.log("get async payload");
    AsyncStorage.getItem(Constants.ASYCSTORAGE_KEY)
      .then((payloadString) => this._dispatchGetAsyncStorageSuccess(payloadString))
      .catch((error) => this._dispatchGetAsyncStorageError(error))
      .done();
  },

  setAsyncStorageData(payload) {
    //console.log("set async payload", payload);
    // TODO: Implement util to do following:
    // - validation check for {schedule: schedule[]}
    // - JSON.stringify
    //AsyncStorageUtils.validateSetAsyncStoragePayload(payload);
    AsyncStorage.setItem(Constants.ASYCSTORAGE_KEY, payload)
      .then(() => this._dispatchSetAsyncStorageSuccess())
      .catch((error) => this._dispatchSetAsyncStorageError(error))
      .done();
  },

  _dispatchGetAsyncStorageSuccess(payloadString) {
    if (payloadString) {
      var payload = StringUtils.JSONParser(payloadString);
      //console.log("client object", payload);

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
