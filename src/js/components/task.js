import React from 'react'
import { Card, TextInput } from 'belle'
import AnswerStatus from './answerstatus'
import Latex from 'react-latex'

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
    renderFromArray(array) {
        const allowedComponents = {
            "div": React.createElement("div"),
            "base64img": React.createElement("div"),
            "Latex": Latex,
            "p": React.createElement("p")
        }
        let renderedComponents = []
        for (let i of array) {
            if (allowedComponents.hasOwnProperty(i[0])) { // i[0] in allowedComponents
                console.log(`[allowedComponents] ${i[0]}`)
                let Component = allowedComponents[i[0]]
                console.log(`[component] ${Component}`)
                if (i[0] == 'img') {
                    renderedComponents.push(
                        <img
                            src = {`data:image/png;base64,${i[1]}`}
                        />
                    )
                } else {
                    renderedComponents.push(
                        <Component>
                            {i[1]}
                        </Component>
                    )
                }
            } else {
                console.log(`[Error] Illegal component '${i[0]}'.`)
            }
        }
        return (
            <div>
                { renderedComponents }
            </div>
        )
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
                { this.renderFromArray(this.props.task) }<br />
                {this.mapFieldsToComponent(this.props.fields, this.props.placeholders)}
            </Card>
        )
    }
}
