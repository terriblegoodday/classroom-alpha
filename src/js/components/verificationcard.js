import React from 'react'
import { Card, Button, Spinner } from 'belle'

class VerificationCard extends React.Component {
    render() {
        return (
                <div>
                    <Button type='submit'
                        disabled={this.props.reviewAnswersState == 'in_progress'}
                        className='verify' >
                        {
                            this.props.reviewAnswersState == 'in_progress' ?
                            <p>Проверка <Spinner /></p> :
                            'Проверить ответы'
                        }
                    </Button>
                    <Button className='printPage' onClick={window.print.bind()}>Распечатать тест</Button>
                </div>
        )
    }
}

export default VerificationCard