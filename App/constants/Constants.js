var Constants = {
  ASYCSTORAGE_KEY: 'levitation',
  
  // Production
  FETCH_URL: 'https://palmtrees-server.herokuapp.com/',
  
  // iOS localhost
  //FETCH_URL: 'http://127.0.0.1:5000/',
  
  // Android VM IP for localhost
  //FETCH_URL: 'http://10.0.3.2:5000/',

  ActionTypes: {
    // ServerActions
    FETCH_SCHEDULE_SUCCESS: 'FETCH_SCHEDULE_SUCCESS',
    FETCH_SCHEDULE_ERROR: 'FETCH_SCHEDULE_ERROR',
    
    // AsyncStorageActions
    GET_ASYNCSTORAGE_DATA_EMPTY: 'GET_ASYNCSTORAGE_DATA_EMPTY',
    GET_ASYNCSTORAGE_DATA_SUCCESS: 'GET_ASYNCSTORAGE_DATA_SUCCESS',
    GET_ASYNCSTORAGE_DATA_ERROR: 'GET_ASYNCSTORAGE_DATA_ERROR',
    SET_ASYNCSTORAGE_DATA_SUCCESS: 'SET_ASYNCSTORAGE_DATA_SUCCESS',
    SET_ASYNCSTORAGE_DATA_ERROR: 'SET_ASYNCSTORAGE_DATA_ERROR'
  }
};

module.exports = Constants;
