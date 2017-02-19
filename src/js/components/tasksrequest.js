import React from 'react'
import { TextInput, Button, Placeholder, Select, Option } from 'belle'
import AdaptedTextInput from './adaptedtextinput'

// (для меню)
// |_____________________^|
// |Квадратные уравнения__|
// |Линейные уравнения____|
// (чтобы не заезжало за верхнюю границу браузера)
function positionOptions (selectComponent) {
  const menuNode = ReactDOM.findDOMNode(selectComponent.refs.menu);
}

class TasksRequest extends React.Component {
    render() {
        console.log(this.props)
        const {gen_id, limit} = this.props.children
        return(
            <div className='tasksRequestChild'>
                            <h3>{`Группа заданий №${this.props.reactKey+1}`}</h3>
                            <Select
                                value='quadequationgenerator'
                                disabled={this.props.state == 'loading' || this.props.state == 'nothing'}
                                {...gen_id}
                                menuStyle={{ maxHeight: '500px',
                                    overflow: 'scroll' }}
                                    positionOptions = {positionOptions} >
                                {this.props.generators}
                                {this.props.state == 'loading' || this.props.state == 'nothing' ? 
                                    <Option value='quadequationgenerator'>
                                        <h4>Загрузка доступных генераторов заданий</h4>
                                        <p>Пожалуйста, подождите</p>
                                    </Option> : ''
                                }
                            </Select>
                            <AdaptedTextInput placeholder='Количество заданий' field={limit} />
            </div>
        )
    }
    
}

export default TasksRequest