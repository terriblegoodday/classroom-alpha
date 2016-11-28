import React from 'react'
import { Card, TextInput } from 'belle'
import AnswerStatus from './answerstatus'

const cardFStyle = {
    backgroundColor: '#FFF2F2'
}

const cardTStyle = {
    backgroundColor: '#F2FFF2'
}

export default class Task extends React.Component {
    mapFieldsToComponent(fields, placeholders) {
        console.log('[mapFieldsToComponent]', fields)
        let fieldsComponents = []
        for (let i in fields) {
            console.log(placeholders)
            fieldsComponents.push(
                <TextInput key={i} {...fields[i]} placeholder={placeholders[i].placeholder} />
            )
        }
        console.log(`[fields]`, fields)
        return fieldsComponents
    }
    render() {
        return (
            <Card className={`taskCard taskCard-${this.props.decision}`}
                style={{
                    ...this.props.decision != null ?  (this.props.decision ? cardTStyle : cardFStyle) : null,
                    position: 'relative'
                }} >
                {this.props.decision != null ? <AnswerStatus decision={this.props.decision} /> : null }
                <h3>{`Задание №${this.props.pk}`}</h3>
                <p dangerouslySetInnerHTML={{__html: this.props.task}} />
                {this.mapFieldsToComponent(this.props.fields, this.props.placeholders)}
            </Card>
        )
    }
}
