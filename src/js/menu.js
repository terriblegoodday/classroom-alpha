import {IndexLink, Link} from 'react-router'
import React from 'react'

const Menu = [
    {
        object: <IndexLink activeClassName="active" to='/'>О сайте</IndexLink>,
        name: 'about'
    },
    {
        object: <Link activeClassName="active" to='/tasks/'>Задания</Link>,
        name: 'tasks'
    },
    {
        object: <Link activeClassName="active" to='/stats/'>Статистика</Link>,
        name: 'stats'
    },
]

export default Menu.map((i,b) => <li key={b}>{i.object}</li>)