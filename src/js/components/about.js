import React from 'react'
import { Link } from 'react-router'
import TasksAreaContainer from './tasksareacontainer'

const AboutPageContent = <div>
        <img className='aboutImage' src="./pub/img/stats.png" />
        <p className={'about-description'}>На этом сайте вы можете решать сгенерированные компьютером математические и не только задания. Этот сайт построен с использованием таких технологий, как Django и React.</p>
        <h2>С чего начать?</h2>
        <p>Перейдите в <Link to='/tasks/'>"Задания"</Link>, выберите тип заданий и количество (не более 50).</p>
        <h2>Зачем оно нужно?</h2>
        <p>Можно решать простенькие квадратные уравнения, можно перейти к более трудным заданиям, можно заняться еще чем-нибудь. Пожалуйста, не задавайте больше таких вопросов, у меня от них изжога.</p>
        <h2>Что посоветуете порешать?</h2>
        <p>Сперва посмотрите в сторону квадратных уравнений, затем перейдите к более сложным вещам.</p>
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
