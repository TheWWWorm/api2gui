import settings from '../settings';

export default function reducer(state = settings, action) {

    const { type, payload } = action;
    switch (type) {
        case 'SETTING_UPDATE': {
            return state.map((setting) => {
                setting.value = payload[setting.name];
                return setting;
            });
        }
    }
    return [...state];
}
