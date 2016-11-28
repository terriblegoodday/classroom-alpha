import React from 'react'
import { connect, dispatch } from 'react-redux'
import Tasks from './tasks'
import actions from '../actions'
import Stats from './stats'

const mapStateToProps = (state) => {
    return {
        statsStatus: state.stats.status,
        last_five: state.stats.last_five,
        generated_tasks: state.stats.generated_tasks,
        solved_tasks: state.stats.solved_tasks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        statsRequest: () => {
            dispatch(actions.statsRequest())
        }
    }
}

const StatsContainer = connect(mapStateToProps, mapDispatchToProps)(Stats)
export default StatsContainer