import React from 'react'
import { Card, Button, Spinner } from 'belle'

class VerificationCard extends React.Component {
    render() {
        return (
                <Button type='submit'
                    disabled={this.props.reviewAnswersState == 'in_progress'}
                    className='verify' >
                    {
                        this.props.reviewAnswersState == 'in_progress' ?
                        <p>Проверка <Spinner /></p> :
                        'Проверить ответы'
                    }
                </Button>
        )
    }
}

export default VerificationCard