import React from 'react'
import { Card, Spinner } from 'belle'

const LoadingCard = () => (
    <Card key={1} style={{ fontsize: 20,
                           color: '#666',
                           textAlign: 'center',
                           borderTop: '1px solid #f2f2f2',
                        }}>
                          Загрузка заданий <Spinner characterStyle={{ fontSize: 20 }} />
    </Card>
)

export default LoadingCard