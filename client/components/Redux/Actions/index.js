import { RECEIVED_DATA, REQUESTED_DATA, REQUESTED_DATA_CAPTAINS1, RECEIVED_DATA_CAPTAINS1, REQUESTED_DATA_CAPTAINS2, RECEIVED_DATA_CAPTAINS2, RESET_CAPTAIN1, RESET_CAPTAIN2 } from '../Constants';
import axios from 'axios';

// 'thunk'ed function (async)

export const getCharacters = () => dispatch => {

  // this sends an action that can be used to start a loading GIF
  dispatch({ type: REQUESTED_DATA });
   axios.get('http://localhost:3000/characters')
    .then(res => {
      // this sends an action to send HTTP response data to Redux store
      dispatch({ type: RECEIVED_DATA, characterData: res.data})
    })
}

export const getCaptainMultiplier1 = (id, p) => dispatch => {

  // this sends an action that can be used to start a loading GIF
  dispatch({ type: REQUESTED_DATA_CAPTAINS1 });
   axios.get('http://localhost:3000/multiplier?id=' + id + '&p=' + p)
    .then(res => {
      // this sends an action to send HTTP response data to Redux store
      dispatch({ type: RECEIVED_DATA_CAPTAINS1, captain1: res.data.result})
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });
      
}

export const getCaptainMultiplier2 = (id, p) => dispatch => {

  // this sends an action that can be used to start a loading GIF
  dispatch({ type: REQUESTED_DATA_CAPTAINS2 });
   axios.get('http://localhost:3000/multiplier?id=' + id + '&p=' + p)
    .then(res => {
      // this sends an action to send HTTP response data to Redux store
      dispatch({ type: RECEIVED_DATA_CAPTAINS2, captain2: res.data.result})
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
       // ADD THIS THROW error
        throw error;
      });
      
}

export const resetCaptain1 = () => ({
  type: RESET_CAPTAIN1,
  reset: 1
})

export const resetCaptain2 = () => ({
  type: RESET_CAPTAIN2,
  reset: 1
})
