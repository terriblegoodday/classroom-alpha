// @flow

import React from 'react'
import { connect, dispatch } from 'react-redux'
import TasksArea from './tasksarea'
import actions from '../actions'

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.tasks,
        fields: state.tasks.fields,
        tasksRequestState: state.tasks.tasksRequestState,
        requestData: state.tasks.latestRequest,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tasksRequest: (request) => {
            dispatch(actions.tasksRequest(request))
        },
        reviewAnswers: (userAnswers) => {
            dispatch(actions.reviewAnswers(userAnswers))
        }
    }
}

const TasksAreaContainer = connect(mapStateToProps, mapDispatchToProps)(TasksArea)

export default TasksAreaContainer
