import axios from 'axios';

export function handleRequest(event, settingsData) {
    event.persist();
    event.preventDefault();
    return (dispatch) => {
        dispatch({ type: 'REQUEST_BEGIN'});

        const url = event.target.action;
        const method = event.target.method;
        const data = settingsData.reduce((obj, setting) => {
            obj.settings[setting.name] = setting.value; 
            return obj;
        }, {settings : {}});

        new FormData(event.target).forEach((value, key) => {
            if (value !== '') {
                data[key] = value;
            }
        });

        axios({
            url,
            method,
            data
        }).then((response) => {
            dispatch({ type: 'REQUEST_COMPLETED', payload: response.data });
        }).catch((error) => {
            dispatch({ type: 'REQUEST_FAILED', payload: error });
        }).then(() => {
            event.target.reset();
        });
    };
}
