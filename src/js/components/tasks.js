import React from 'react'
import TasksRequestForm from './tasksrequestform'
import TasksArea from './tasksarea'

const Tasks = (props) => {
    return (
        <div className="Tasks">
            <TasksRequestForm tasksRequest={props.tasksRequest}
                              tasksRequestState={props.tasksRequestState}
                              getAvailableGenerators={props.getAvailableGenerators}
                              generators={props.generators} />
            {props.showTasksArea ? <TasksArea latestRequest={props.latestRequest}
            tasks={props.tasks} tasksRequest={props.tasksRequest}
            fields={props.fields}
            tasksRequestState={props.tasksRequestState} requestData={props.requestData}
            reviewAnswers={props.reviewAnswers} /> : null}
        </div>
    )
}

export default Tasks