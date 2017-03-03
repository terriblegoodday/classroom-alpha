import React from 'react'
import belle, { Card, Button, TextInput } from 'belle'
import { reduxForm, addArrayValue } from 'redux-form'
import TasksRequests from './tasksrequests'

const fields = [
    'children[].gen_id',
    'children[].limit'
]

const newChildrenField = {
    gen_id: 'quadequationgenerator',
    limit: 5
}

class TasksRequestForm extends React.Component {
    constructor(props) {
        super(props)
        props.fields.children.addField(newChildrenField)
        if (props.generators.generatorsState == 'nothing') props.getAvailableGenerators()
    }
    handleSubmit(event) {
        event.preventDefault()
        console.log(this.props)
        this.props.tasksRequest(this.props.fields.children)
    }
    addTasksGroup() {
        this.props.fields.children.addField(newChildrenField)
    }
    removeTasksGroup() {
        this.props.fields.children.removeField()
    }
    render() {
        const groupTasksControlButtonStyle = {
            display: 'inline-block'
        }
        return (
            <Card className={"tasksRequest--donotprint"}>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <TasksRequests addValue={addArrayValue} fields={this.props.fields}
                    generators={this.props.generators} />
                <p style={{display: 'inline-block', paddingRight: '15px', fontWeight: '600', margin: '11px 0 11px'}}>Группы заданий: </p>
                <Button disabled={this.props.fields.children.length >= 5}
                        style={{
                            marginTop: '15px',
                            display: 'block'
                            
                        }}
                        onClick={this.addTasksGroup.bind(this)}
                        style={{...groupTasksControlButtonStyle, borderRadius: '2px 0 0 2px'}}>+</Button>
                <Button onClick={this.removeTasksGroup.bind(this)}
                        style={{...groupTasksControlButtonStyle, borderRadius: '0 2px 2px 0'}}
                        disabled={this.props.fields.children.length <= 1}>-</Button>
                <Button primary
                        disabled={this.props.tasksRequestState == 'loading' || 
                        this.props.tasksRequestState == 'error'}
                        style={{
                            marginTop: '25px',
                            display: 'block'
                        }}
                        type='submit'>Составить тест</Button>
            </form>
            </Card>
        )
    }
}

export default reduxForm({
    form: 'tasksRequestForm',
    fields,
}, undefined, {
    addValue: addArrayValue
})(TasksRequestForm)
