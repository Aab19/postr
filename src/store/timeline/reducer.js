import {
  CLEAR_ERROR,
  CREATE_POST_TIMELINE,
  DELETE_POST_TIMELINE,
  GET_LIST_TIMELINE,
  REPLY_POST_TIMELINE,
  SET_ERROR,
  SET_LOADING,
} from './action'

const initialState = {
  data: [],
  loading: false,
  error: false,
}

const timelineReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {...state, loading: action.payload}
    case SET_ERROR:
      return {...state, error: action.payload}
    case CLEAR_ERROR:
      return {...state, error: false}
    case GET_LIST_TIMELINE:
      return {
        ...state,
        data: action.payload.reverse(),
      }
    case CREATE_POST_TIMELINE:
      if (action.payload) {
        state.data.unshift(action.payload)
      }
      return state
    case REPLY_POST_TIMELINE:
      if (action.payload) {
        state.data.map((val, idx) => {
          if (val.id === action.payload.id) {
            state.data[idx].replies = action.payload.replies
          }
        })
      }
      return state
    case DELETE_POST_TIMELINE:
      if (action.payload) {
        state.data = state.data.filter(val => val.id !== action.payload.id)
      }
      return state
    default:
      return state
  }
}

export default timelineReducer
