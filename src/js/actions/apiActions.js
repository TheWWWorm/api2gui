import axios from 'axios';

export function handleRequest(event) {
    event.preventDefault();
    return (dispatch) => {
        dispatch({ type: 'REQUEST_BEGIN'})

        const url = event.target.action;
        const method = event.target.method;
        const data = {};

        new FormData(event.target).forEach((value, key) => {
            data[key] = value;
        });
        

        axios({
            url,
            method,
            data
        }).then((response) => {
            dispatch({ type: 'REQUEST_COMPLETED', payload: response.data });
        }).catch((err) => {
            dispatch({ type: 'REQUEST_FAILED', payload: err });
        });
    };
}