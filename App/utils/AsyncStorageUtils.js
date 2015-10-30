var React = require("react-native"),
  Constants = require("../constants/Constants");

var AsyncStorage = React.AsyncStorage;

var AsyncStorageUtils = {
  getAsyncStorageData() {
    return AsyncStorage.getItem(Constants.ASYCSTORAGE_KEY);
  },

  setAsyncStorageData(payload) {
    return AsyncStorage.setItem(Constants.ASYCSTORAGE_KEY, payload);
  }
};

module.exports = AsyncStorageUtils;