import apiMap from '../api_map';

export default function reducer(state = apiMap, action) {
    return state.map((api) => {
        if (!api.fields) {
            api.fields = [];
        }
        api.fields = api.fields.map((field) => {
            if (field.constructor === String) {
                field = {
                    name: field,
                    type: 'text'
                };
            }
            return field;
        });
        return api;
    });
}
