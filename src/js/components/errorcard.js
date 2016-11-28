import React from 'react'
import Belle from 'belle'

const Card = Belle.Card
const Button = Belle.Button

const ErrorCard = (props) => {
    return(
        <Card key={1} style={{ fontSize: 20,
                           color: '#666',
                           textAlign: 'center',
                           borderTop: '1px solid #f2f2f2',
                           height: '174px'
                        }}>
                          Ошибка
                          <br />
                          <Button style={{display: 'block', margin: '25px auto 0'}} 
                          onClick={props.tasksRequest.bind(this, props.requestData)}>Повторить попытку</Button>
        </Card>
    )
}

export default ErrorCard
