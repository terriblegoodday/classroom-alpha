// @flow

import { combineReducers } from 'redux'
import { TASKS_REQUEST_CLEAR, TASKS_REQUEST_ERROR,
    TASKS_REQUEST_LOADING, TASKS_REQUEST_SUCCESS,
    ROUTE_LOCATION_DID_UPDATE, GET_AVAILABLE_GENERATORS_LOADING,
    GET_AVAILABLE_GENERATORS_ERROR, GET_AVAILABLE_GENERATORS_SUCCESS,
    REVIEW_ANSWERS_IN_PROGRESS, REVIEW_ANSWERS_ERROR,
    REVIEW_ANSWERS_SUCCESS, STATS_REQUEST_LOADING,
    STATS_REQUEST_ERROR, STATS_REQUEST_SUCCESS } from './actiontypes'

const initialTasksRequest = [
    {
        gen_id: 'quadequationgenerator',
        limit: 5
    }
]

const tasks = (state = {
    tasksRequestState: 'nothing',
    tasks: false
}, action) => {
    let tasks = action.tasks
    let fields = action.fields
    switch(action.type) {
        case TASKS_REQUEST_LOADING:
            if (state.tasksRequestState != 'loading') {
                return {...state, tasksRequestState: 'loading', latestRequest: action.request || initialTasksRequest}
            } else {
                return state
            }
        case TASKS_REQUEST_ERROR:
            return {...state, tasksRequestState: 'error', latestRequest: action.request}
        case TASKS_REQUEST_SUCCESS:
            if (state.tasksRequestState != 'success' && state.tasksRequestState != 'error') {
                return {...state, tasks, fields, tasksRequestState: 'success', latestRequest: false}
            } else {
                return state
            }
        case REVIEW_ANSWERS_IN_PROGRESS:
            return {...state, reviewAnswersState: 'in_progress'}
        case REVIEW_ANSWERS_ERROR:
            return {...state, reviewAnswersState: 'error'}
        case REVIEW_ANSWERS_SUCCESS:
            return {...state, decision: action.decision, reviewAnswersState: 'success'}
        case ROUTE_LOCATION_DID_UPDATE:
            if (action.location.action != 'POP') {
                return {
                    ...state, 
                    tasksRequestState: 'nothing',
                    reviewAnswersState: 'nothing',
                    tasks: false,
                    decision: false,
                }
            }
        default:
            return state
    }
}

const generators = (state = {
    generatorsState: 'nothing'
}, action) => {
    switch(action.type) {
        case GET_AVAILABLE_GENERATORS_LOADING:
            return {...state, generatorsState: 'loading'}
        case GET_AVAILABLE_GENERATORS_ERROR:
            return {...state, generatorsState: 'error', errorReason: action.reason}
        case GET_AVAILABLE_GENERATORS_SUCCESS:
            return {...state, generatorsState: 'success', data: action.data}
        default:
            return state
    }
}

const tasksPage = (state = {
    showTasksArea: false
}, action) => {
    switch(action.type) {
        case TASKS_REQUEST_LOADING:
            if (state.tasksRequestState != 'loading') {
                return {...state, showTasksArea: true}
            } else {
                return state
            }
        case ROUTE_LOCATION_DID_UPDATE:
            return {...state, showTasksArea: false}
        default:
            return state
    }
}

const stats = (state = {
    status: 'nothing',
    last_five: [],
    generated_tasks: Number(),
    solved_tasks: Number()
}, action) => {
    switch(action.type) {
        case STATS_REQUEST_LOADING:
            return {...state, status: 'loading'}
        case STATS_REQUEST_SUCCESS:
            return {...state, status: 'success',
            ...action.data}
        case STATS_REQUEST_ERROR:
            return {...state, status: 'error'}
        case REVIEW_ANSWERS_IN_PROGRESS:
            return {...state, status: 'nothing'}
        default:
            return state
    }
}

const reducers = { tasks, tasksPage, generators, stats }

export default reducers
