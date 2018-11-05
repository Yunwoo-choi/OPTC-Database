import { RECEIVED_DATA, REQUESTED_DATA, REQUESTED_DATA_CAPTAINS1, RECEIVED_DATA_CAPTAINS1, REQUESTED_DATA_CAPTAINS2, RECEIVED_DATA_CAPTAINS2, RESET_CAPTAIN1, RESET_CAPTAIN2 } from '../Constants';
import { combineReducers } from 'redux';

const initialState = {
  characterData: '',
  isLoading: false,
  captain1: 1,
  captain2: 1
}

const characters = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_DATA:
      return { ...state, characterData: action.characterData };
    case REQUESTED_DATA:
      return { ...state, isLoading: true }
    case RECEIVED_DATA_CAPTAINS1:
      return { ...state, captain1: action.captain1 };
    case REQUESTED_DATA_CAPTAINS1:
      return { ...state, isLoading: true }
    case RECEIVED_DATA_CAPTAINS2:
      return { ...state, captain2: action.captain2 };
    case REQUESTED_DATA_CAPTAINS2:
      return { ...state, isLoading: true }
    case RESET_CAPTAIN1:
      return { ...state, captain1: 1 }
    case RESET_CAPTAIN2:
      return { ...state, captain2: 1 }
    default:
      return state;
  }
}

  export default combineReducers({
    characters: characters
  })