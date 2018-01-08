export default function reducer(state = {
    json: { Hint: 'Here you will see the latest response' },
    error: null,
    requesting: true
}, action) {

    const { type, payload } = action;

    switch (type) {
        case 'REQUEST_BEGIN': {
            return { ...state, requesting: true }
        }
        case 'REQUEST_COMPLETED': {
            return {
                ...state,
                requesting: false,
                json: payload,
                error: null
            }
        }
        case 'REQUEST_FAILED': {
            return {
                ...state,
                requesting: false,
                json: payload,
                error: payload
            }
        }
    }

    return state
}
