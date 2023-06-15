import {TimelineAPI} from 'api'

export const SET_LOADING = 'timeline/SET_LOADING'
export const SET_ERROR = 'timeline/SET_ERROR'
export const CLEAR_ERROR = 'timeline/CLEAR_ERROR'
export const GET_LIST_TIMELINE = 'timeline/GET_LIST_TIMELINE'
export const CREATE_POST_TIMELINE = 'timeline/CREATE_POST_TIMELINE'
export const REPLY_POST_TIMELINE = 'timeline/REPLY_POST_TIMELINE'
export const DELETE_POST_TIMELINE = 'timeline/DELETE_POST_TIMELINE'

export const setLoading = payload => ({
  type: SET_LOADING,
  payload,
})

export const setError = payload => ({
  type: SET_ERROR,
  payload,
})

export const clearError = () => ({
  type: CLEAR_ERROR,
})

export const setListTimeline = payload => ({
  type: GET_LIST_TIMELINE,
  payload,
})

export const setCreatePostTimeline = payload => ({
  type: CREATE_POST_TIMELINE,
  payload,
})

export const setReplyPostTimeline = payload => ({
  type: REPLY_POST_TIMELINE,
  payload,
})

export const setDeletePost = payload => ({
  type: DELETE_POST_TIMELINE,
  payload,
})

const handleGetListTimeline = payload => {
  return async (dispatch, getState) => {
    try {
      dispatch(clearError())
      dispatch(setLoading(true))
      const response = await TimelineAPI.getList()
      if (response.status === 200) {
        dispatch(setLoading(false))
        dispatch(setListTimeline(response.data))
        return response.status
      } else {
        dispatch(setError(response))
      }
    } catch (error) {
      dispatch(setError(error))
    }
  }
}

const handleCreatePostTimeline = payload => {
  return async (dispatch, getState) => {
    try {
      dispatch(clearError())
      dispatch(setLoading(true))
      const response = await TimelineAPI.postData(payload)
      if (response.status === 201) {
        dispatch(setLoading(false))
        dispatch(setCreatePostTimeline(response.data))
        return response.status
      } else {
        dispatch(setError(response))
      }
    } catch (error) {
      dispatch(setError(error))
    }
  }
}

const handleReplyPostTimeline = payload => {
  return async (dispatch, getState) => {
    try {
      dispatch(clearError())
      dispatch(setLoading(true))
      const response = await TimelineAPI.updateData(payload)
      if (response.status === 200) {
        dispatch(setLoading(false))
        dispatch(setReplyPostTimeline(response.data))
        return response.status
      } else {
        dispatch(setError(response))
      }
    } catch (error) {
      dispatch(setError(error))
    }
  }
}

const handleDeletePost = payload => {
  return async (dispatch, getState) => {
    try {
      dispatch(clearError())
      dispatch(setLoading(true))
      const response = await TimelineAPI.deleteData(payload)
      if (response.status === 200) {
        dispatch(setLoading(false))
        dispatch(setDeletePost(response.data))
        return response.status
      } else {
        dispatch(setError(response))
      }
    } catch (error) {
      dispatch(setError(error))
    }
  }
}

const TimelineAction = {
  fetchData: handleGetListTimeline,
  postData: handleCreatePostTimeline,
  updateData: handleReplyPostTimeline,
  deleteData: handleDeletePost,
}

export default TimelineAction
