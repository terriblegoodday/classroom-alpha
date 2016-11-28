import React from 'react'
import { connect, dispatch } from 'react-redux'
import Tasks from './tasks'
import actions from '../actions'

const prepRequestData = (state) => {
    if (state.form.tasksRequestForm) {
        return state.form.tasksRequestForm.children
    } else {
        return state.tasks.latestRequest
    }
}

const mapStateToProps = (state) => {
    return {
        showTasksArea: state.tasksPage.showTasksArea,
        tasks: state.tasks.tasks,
        fields: state.tasks.fields,
        tasksRequestState: state.tasks.tasksRequestState,
        requestData: prepRequestData(state),
        generators: state.generators
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tasksRequest: (request) => {
            dispatch(actions.tasksRequest(request))
        },
        getAvailableGenerators: () => {
            dispatch(actions.getAvailableGenerators())
        },
        reviewAnswers: (userAnswers) => {
            dispatch(actions.reviewAnswers(userAnswers))
        }
    }
}

const TasksContainer = connect(mapStateToProps, mapDispatchToProps)(Tasks)
export default TasksContainer
