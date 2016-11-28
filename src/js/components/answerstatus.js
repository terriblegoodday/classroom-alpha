import React from 'react'

const AnswerStatus = (props) => {
    let { decision } = props
    let decisionText
    switch(decision) {
        case true:
            decisionText = 'Верно!'
            break
        case false:
            decisionText = 'Неверно!'
            break
        // В случае, если такое задание не пришло в ответе
        // По-другому no-op
        default:
            decisionText = ''
    }
    return (
        <p className={`decision decision-${decision}`}>{decisionText}</p>
    )
}

export default AnswerStatus