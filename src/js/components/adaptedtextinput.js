import React from 'react'
import { TextInput } from 'belle'

const AdaptedTextInput = (props) => {
    const {placeholder, field} = props
    return (
        <TextInput placeholder={placeholder}
            {...field}
        />
    )
}

export default AdaptedTextInput
