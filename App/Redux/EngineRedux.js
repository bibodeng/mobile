import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setEngineFailure: null,
  setEngineInstance: ['engineInstance'],
  setEngineInitial: ['engineInit'],
  setEngineContactMgr: ['contactMgr'],
  setEngineMessages: ['messages'],
})

export const EngineTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  engineInstance: null,
  engineInit: false,
  contactMgr: null,
  messages: null,
})

/* ------------- Selectors ------------- */

export const EngineSelectors = {
  getEngineInstance: state => state.engine.engineInstance,
  getContactMgr: state => state.engine.contactMgr,
  getMessages: state => state.engine.messages,
}

/* ------------- Reducers ------------- */

// engine failed to start
export const setEngineFailure = state =>
  state.merge({ fetching: false, error: true, engine: null })

// successful engine start
export const setEngineInstance = (state, { engineInstance }) => {
  return state.merge({ engineInstance })
}

// engine intialized
export const setEngineInitial = (state, { engineInit }) => {
  return state.merge({ engineInit })
}

// set contact manager
export const setEngineContactMgr = (state, { contactMgr }) => {
  return state.merge({ contactMgr })
}

// // set messages
export const setEngineMessages = (state, { messages }) => {
  return state.merge({ messages })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_ENGINE_FAILURE]: setEngineFailure,
  [Types.SET_ENGINE_INSTANCE]: setEngineInstance,
  [Types.SET_ENGINE_INITIAL]: setEngineInitial,
  [Types.SET_ENGINE_CONTACT_MGR]: setEngineContactMgr,
  [Types.SET_ENGINE_MESSAGES]: setEngineMessages,
})
