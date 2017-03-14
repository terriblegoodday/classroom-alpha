// @flow
import React from 'react'
import ReactDOM from 'react-dom'

const Stats = (props) => {
    let { statsStatus, last_five, generated_tasks, solved_tasks } = props
    switch(statsStatus) {
        case 'loading':
            return (
                <div className="statsPageLoading">
                    Загрузка статистики. Пожалуйста, подождите.
                </div>
            )
        case 'error':
            return (
                <div className="statsPageError">
                    Ошибка загрузки статистики. Попробуйте еще раз.
                </div>
            )
        case 'nothing':
            props.statsRequest()
            return (
                <div />
            )
        case 'success':
            last_five = last_five.map((value) => {
                return (
                    <p className="solvedTask">{value}</p>
                )
            })
            return (
                <div className="stats_page">
                    <p className="statsCounter">
                    { generated_tasks }
                    </p>
                    <p className="statsCounterNote">
                    Заданий сгенерировано с момента последней очистки базы данных
                    </p>
                    <br />
                    <p className="statsCounter">
                    { solved_tasks }
                    </p>
                    <p className="statsCounterNote">
                    Раз задания были решены правильно
                    </p>
                    <br />
                    <h2>Последние решенные задания</h2>
                    { last_five }
                </div>
            )
        default:
            console.log("Что-то пошло не так. Категорически не так.")
            return (
                <div>Что-то пошло не так. Категорически не так.</div>
            )
    }
}

export default Stats
