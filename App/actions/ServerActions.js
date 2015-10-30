var Dispatcher = require("../dispatchers/Dispatcher"),
  Constants = require("../constants/Constants"),
  ActionTypes = Constants.ActionTypes,
  AsyncStorageActions = require("./AsyncStorageActions"),
  Store = require("../stores/Store"),
  StringUtils = require("../utils/StringUtils");

var ServerActions = {
  // One-time data fetch from server
  fetchScheduleData() {
    console.log("Making server request");    
    // TODO: Why can't I return this as a promise to WebAPIUtils?
    // TODO: Integrate NetInfo to get online/offline status
    fetch(Constants.FETCH_URL)
      .then((response) => {
        var payloadString = response._bodyText;
        var schedule = StringUtils.JSONParser(payloadString);
        //console.log("server object", schedule);
        
        this._dispatchFetchSuccess(schedule);

        // Load the data into AsyncStorage
        AsyncStorageActions.setAsyncStorageData(payloadString);

      })
      .catch((error) => this._dispatchFetchError(error));
  },

  _dispatchFetchSuccess(payload) {
    Dispatcher.dispatch({
      type: ActionTypes.FETCH_SCHEDULE_SUCCESS,
      schedule: payload.schedule
    });
  },

  _dispatchFetchError(error) {
    Dispatcher.dispatch({
      type: ActionTypes.FETCH_SCHEDULE_ERROR,
      error: error
    });
  }
};

module.exports = ServerActions;