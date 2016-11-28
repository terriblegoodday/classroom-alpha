// @flow

import React from 'react'
import Task from './task'
import ErrorCard from './errorcard'
import LoadingCard from './loadingcard'
import VerificationCard from './verificationcard'
import { reduxForm, addArrayValue } from 'redux-form'
import actions from '../actions'
import { dispatch } from 'redux'

const exampleTasksRequest = [
    {
        gen_id: {value: 'quadequationgenerator'},
        limit: {value: 1}
    }
]

class TasksContainer extends React.Component {
    mapTasks() {
        const {
            addValue,
            fields,
            fieldsFromBackend,
            handleSubmit,
            decision
        } = this.props
        let tasks = []
        if (this.props.tasks) for (let i in this.props.tasks) {
            let task = this.props.tasks[i]
            tasks.push(<Task {...task} key={task.pk} fields={fields[i]} placeholders={fieldsFromBackend[i]}
            decision={decision != null ? decision[i] : null} />)
        }
        return tasks
    }
    handleSubmit(event) {
        event.preventDefault()
        this.props.reviewAnswers(this.props.fields)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                {this.mapTasks()}
                {this.props.tasksRequestState == 'success' ? <VerificationCard reviewAnswersState={this.props.reviewAnswersState} /> : null }
            </form>
        )
    }
}

class TasksArea extends React.Component {
    constructor(props) {
        super(props)
        if (!props.tasks) {
            props.tasksRequest(props.requestData || exampleTasksRequest)
            this.request = exampleTasksRequest
        }
    }
    render() {
        let fields = this.props.fields ? Object.keys(this.props.fields).map(
            (i, r) => {
                let arr = []
                for (let b in this.props.fields[i]) {
                    let field = this.props.fields[i][b]
                    arr.push(`${i}.${b}`)
                }
                return arr
            }
        ).reduce(
            (a, b) => a.concat(b) // 
        ) : ['[]']
        const TasksForm = reduxForm({
                form: 'tasksAnswers',
                fields
            }, (state) => {
                return {
                    tasks: state.tasks.tasks,
                    fieldsFromBackend: state.tasks.fields,
                    tasksRequestState: state.tasks.tasksRequestState,
                    decision: state.tasks.decision != 'undefined' ? state.tasks.decision : null,
                    reviewAnswersState: state.tasks.reviewAnswersState
                }
            }, (dispatch) => { return {
                    addValue: addArrayValue,
                    reviewAnswers: (userAnswers) => this.props.reviewAnswers(userAnswers) || null
                }
            })(TasksContainer)
        return(
            <div className={'TasksArea'}>
                {this.props.tasksRequestState == 'error'   ? <ErrorCard tasksRequest={this.props.tasksRequest} requestData={this.props.requestData} /> : null}
                {this.props.tasksRequestState == 'loading' ? <LoadingCard /> : null}
                <TasksForm />
            </div>
        )
    }
}

export default TasksArea
