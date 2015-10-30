var React = require("react-native"),
  Constants = require("./constants/constant");

var { AsyncStorage } = React;

module.exports = {
  init: function() {
    // TODO: only clear/set our app key (defined in constants)
    AsyncStorage.clear();
    AsyncStorage.multiSet([
      [Constants.STORAGE_KEY, JSON.stringify([
        {
          "name": "Spiritualized1",
          "date": "2015-01-01",
          "time": "23:00"
        },
        {
          "name": "Primal Scream2",
          "date": "2015-01-01",
          "time": "21:00"
        },
        {
          "name": "White Fence3",
          "date": "2015-01-01",
          "time": "06:00"
        },
        {
          "name": "Tamaryn1",
          "date": "2015-01-02",
          "time": "02:00"
        },
        {
          "name": "Homobiles2",
          "date": "2015-01-02",
          "time": "07:00"
        },
        {
          "name": "Shannon & The Clams3",
          "date": "2015-01-02",
          "time": "11:00"
        },
        {
          "name": "Ty Segall4",
          "date": "2015-01-02",
          "time": "14:00"
        }
      ])]
    ]);
  }
}