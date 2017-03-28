// @flow

import { TASKS_REQUEST_CLEAR, TASKS_REQUEST_ERROR,
    TASKS_REQUEST_LOADING, TASKS_REQUEST_SUCCESS,
    ROUTE_LOCATION_DID_UPDATE, GET_AVAILABLE_GENERATORS_LOADING,
    GET_AVAILABLE_GENERATORS_ERROR, GET_AVAILABLE_GENERATORS_SUCCESS,
    REVIEW_ANSWERS_IN_PROGRESS, REVIEW_ANSWERS_ERROR,
    REVIEW_ANSWERS_SUCCESS, STATS_REQUEST_LOADING,
    STATS_REQUEST_ERROR, STATS_REQUEST_SUCCESS } from './actiontypes'
import { BACKEND_URL } from './settings'
import Q from 'q';

// Действие при загрузке статистики
const statsRequestLoading = () => {
    return {
        type: STATS_REQUEST_LOADING
    }
}

// Действие при ошибке при загрузке статистики 
const statsRequestError = () => {
    return {
        type: STATS_REQUEST_ERROR
    }
}

// Действие при успешной загрузке статистики
const statsRequestSuccess = (data) => {
    return {
        type: STATS_REQUEST_SUCCESS,
        data
    }
}

// Ответственный за загрузку статистики
const statsRequest = () => {
    return (dispatch) => {
        dispatch(statsRequestLoading)
        let data
        fetch(`${BACKEND_URL}/stats/`).then(
            (data) => {
                data.json().then(
                    (dataJson) => {
                        console.log(dataJson)
                        dispatch(statsRequestSuccess(dataJson))
                    }
                )
            },
            (reason) => {
                console.log('[Ошибка при загрузке статистики]', reason)
                dispatch(statsRequestError)
            }
        )
    }
}

// Действие при успешной загрузке заданий
const tasksRequestSuccess = (tasks, fields) => {
    return {
        type: TASKS_REQUEST_SUCCESS,
        tasks, // Задания уже имеют массив полей
        fields // Но мы дублируем его для более удобного доступа
    }
}

// Действие при загрузке заданий
const tasksRequestLoading = (request) => {
    return {
        type: TASKS_REQUEST_LOADING,
        request
    }
}

// Действие при ошибке при загрузке заданий
const tasksRequestError = (error = 'Unknown Error', request) => {
    return {
        type: TASKS_REQUEST_ERROR,
        error,
        request
    }
}

// Действие при переходе на другую страницу
const routeLocationDidUpdate = (location: string) => {
    return {
        type: ROUTE_LOCATION_DID_UPDATE,
        location
    }
}

// Действие при загрузке доступных генераторов
const getAvailableGeneratorsLoading = () => {
    return {
        type: GET_AVAILABLE_GENERATORS_LOADING,
    }
}

// Действие при ошибке при загрузке генераторов
const getAvailableGeneratorsError = (reason) => {
    return {
        type: GET_AVAILABLE_GENERATORS_ERROR,
        reason
    }
}

// Действие при успешной загрузке доступных генераторов
const getAvailableGeneratorsSuccess = (data) => {
    return {
        type: GET_AVAILABLE_GENERATORS_SUCCESS,
        data
    }
}

// "Переходник" для запроса заданий
const tasksRequest = (request) => {
    return (dispatch) => {
        dispatch(tasksRequestLoading(request))
        let tasks = []
        for (let entry of request) {
            let gen_id = entry.gen_id.value
            let limit = entry.limit.value
            tasks = tasks.concat(fetch(`${BACKEND_URL}/getTasks?gen_id=${gen_id}&limit=${limit}`).then(
                // Успех
                (result) => {
                    if (result.status != 500) {
                        return result.json()
                    } else dispatch(tasksRequestError(result.statusText, request))
                },
                // Ошибка
                function(reason) {
                    dispatch(tasksRequestError(reason, request))
                }
            ))
        }
        Q.allSettled(tasks).then(
            (results) => {
                let data = []
                let fields = {}
                for (let result of results) {
                    let data_merged = {}
                    for (let task of result.value) {
                        console.log("fdjif", task)
                        let preparedTask = task
                        if (typeof(preparedTask["task"]) == "string") {
                            preparedTask["task"] = [["Latex", preparedTask["task"]]]
                        }
                        data_merged[task.pk] = preparedTask
                    }
                    data = {...data, ...data_merged}
                    for (let i in result.value) {
                        let data_result = result.value[i]
                        fields[data_result.pk] = {}
                        for (let b in data_result.fields) {
                            fields[data_result.pk][b] = data_result.fields[b]
                        }
                    }
                }
                setTimeout(
                    dispatch,
                    500,
                    tasksRequestSuccess(data, fields)
                )
            }
        )
    }
}

// "Переходник" для запроса доступных генераторов заданий
const getAvailableGenerators = () => {
    return (dispatch) => {
        dispatch(getAvailableGeneratorsLoading)
        fetch(`${BACKEND_URL}/getAvailableGenerators`).then(
            // Успех
            (result) => {
                if (result.status != 500) {
                    result.json().then(
                        (result) => {
                            setTimeout(
                                dispatch,
                                500,
                                getAvailableGeneratorsSuccess(result)
                            )
                        }
                    )
                } else dispatch(getAvailableGeneratorsError(result.statusText))
            },
            // Ошибка
            function(reason) {
                dispatch(getAvailableGeneratorsError(reason))
            }
        )
    }
}

// Действие во время проверки правильности пользовательских ответов
const reviewAnswersInProgress = () => {
    return {
        type: REVIEW_ANSWERS_IN_PROGRESS,
    }
}

// Действие при ошибке во время проверки правильности пользовательских ответов
const reviewAnswersError = () => {
    return {
        type: REVIEW_ANSWERS_ERROR
    }
}

// Действие при успешной проверке правильности пользовательских ответов
const reviewAnswersSuccess = (decision) => {
    return {
        type: REVIEW_ANSWERS_SUCCESS,
        decision
    }
}

// "Переходник" для проверки правильности пользовательских ответов
const reviewAnswers = (userAnswers) => {
    return (dispatch) => {
        dispatch(reviewAnswersInProgress())
        console.log('reviewAns')
        let userAnswersPrepped = {}

        for (let i in userAnswers) {
            userAnswersPrepped[i] = []
            for (let a in userAnswers[i]) {
                userAnswersPrepped[i].push(userAnswers[i][a].value)
            }
        }

        // Отправить данные в бэкенд
        fetch(`${BACKEND_URL}/reviewAnswers`, {  
                method: 'post',  
                headers: {  
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                },  
                body: (JSON.stringify(userAnswers))
            }).then(
                (decision) => decision.json().then(
                    (json) => {
                        setTimeout(
                            dispatch,
                            500,
                            reviewAnswersSuccess(json)
                        )
                    }
                ),
                (error) => dispatch(reviewAnswersError())
        )
    }
}

const actions = { tasksRequest, routeLocationDidUpdate, getAvailableGenerators, reviewAnswers, statsRequest }

export default actions