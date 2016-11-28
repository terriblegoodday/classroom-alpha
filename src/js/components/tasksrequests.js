import React from 'react'
import { AdaptedTextInput } from './adaptedtextinput'
import TasksRequest from './tasksrequest'
import { Select, Option, Placeholder } from 'belle'

class TasksRequests extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {
            fields: { children },
            generators
        } = this.props
        let generatorsComponents = []
        if (this.props.generators.generatorsState == 'success') {
            for (let generator of generators.data) {
                generatorsComponents.push(
                    <Option value={generator.gen_id} key={generator.gen_id}>
                        <h4>{generator.title}</h4>
                        <p>{generator.description}</p>
                    </Option>
                )
            }
        }
        return (
            <div>
                {
                    children.map((child, index) => {
                        console.log('[render] ', child)
                        return (
                            <TasksRequest reactKey={index}
                                key={index}
                                children={child}
                                generators={generatorsComponents}
                                state={generators.generatorsState} />
                        )
                    })
                }
            </div>
        )
    }
}

export default TasksRequests