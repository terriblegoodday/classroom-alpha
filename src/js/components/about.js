import React from 'react'
import { Link } from 'react-router'
import TasksAreaContainer from './tasksareacontainer'

const AboutPageContent = <div>
        <p>Мы еще, к сожалению, еще не успели оформить это веб-приложение. Пожалуйста, подождите до 31-го ноября.</p>
        </div>

class About extends React.Component {
    render() {
        return (
            <div>
                {AboutPageContent}
            </div>
        )
    }
}

export default About
