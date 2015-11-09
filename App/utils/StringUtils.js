var _ = require("lodash"),
  moment = require("moment");

// Why are these values already typecast when parsing string from AsyncStorage 
// without using reviver, but not with the same server payload string??
function JSONParseReviver(key, value) {
  if (key === "stageId" || key === "id" && !_.isNumber(value)) {
    return +value;
  }
  // booleans get auto-converted??
  else if (key === "selected" && !_.isBoolean(value)) {
    return (value.toLowerCase() === "true")
  }

  return value;
}

var StringUtils = {
  JSONParser(jsonString) {
    // TODO: Make this a Promise instead
    // TOOD: And handle the error
    try {
      return JSON.parse(jsonString, JSONParseReviver);
    } catch (e) {
      console.log("StringUtils.jsonParser() error:", e);
    }
  },

  /**
   * @param  {string} datetime - In form "YYYY-MM-DDTHH-MM". 
   * @return {string} date - In from "YYYY-MM-DD"
   */
  parseDatetime(datetime) {
    return moment(datetime).format("YYYY-MM-DD");
  },

  /**
   * @param  {string} date - In form "YYYY-MM-DD". 
   * @return {string} date - In from "MMM D"
   */
  parseDate(date) {
    return moment(date).format("MMM D");
  },

  /**
   * @param  {string} datetime - In form "YYYY-MM-DDTHH-MM"
   * @param  {boolean} includePeriod - Include am/pm
   * @return {Moment} - e.g. 8:45 pm
   */
  parseTime(datetime, includePeriod=true) {
    var format = includePeriod ? "h:mm a" : "h:mm";

    return moment(datetime).format(format);
  },
};

module.exports = StringUtils;
