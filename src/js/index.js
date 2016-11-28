// @flow

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, Route, Link, IndexLink, IndexRoute, useRouterHistory } from 'react-router'
import { About } from './components'
import actions from './actions'
import reducers from './reducers'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Menu from './menu'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import TasksContainer from './components/taskscontainer'
import StatsContainer from './components/statscontainer'
import {reducer as formReducer} from 'redux-form'
import { createHistory, useBasename } from 'history'

const logger = createLogger()

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer,
        form: formReducer
    }),
    compose(
        applyMiddleware(thunk, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

const browserHistory = useRouterHistory(useBasename(createHistory))({
  basename: "mathgen-alpha"
});

const history = syncHistoryWithStore(browserHistory, store)

class App extends React.Component {
    render() {
        return (
            <div className='page'>
                <div className='header-menu'>
                    <ul>
                        {Menu}
                    </ul>
                </div>
                <div className='content'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={About} />
                <Route path='tasks' component={TasksContainer} />
                <Route path='stats' component={StatsContainer} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)

browserHistory.listen(location => store.dispatch(actions.routeLocationDidUpdate(location)));
