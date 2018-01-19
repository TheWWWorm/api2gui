export function handleUpdate(event) {
    event.persist();
    event.preventDefault();
    return (dispatch) => {
        const data = {};

        new FormData(event.target).forEach((value, key) => {
            if (value !== '') {
                data[key] = value;
            }
        });

        dispatch({ type: 'SETTING_UPDATE', payload: data});
    };
}
