import React from 'react';
import keygen from '../keygen';

const defaults = {
    type: 'text',
    className: 'form-control'
};

export default class InputFactory extends React.Component {
    make(params) {
        switch (params.type) {
            case 'select': {
                const options = params.options.map((option, i) => {
                    return <option key={keygen()}>{option}</option>;
                });
                return <select  name={params.name} class="form-control">
                    {options}
                </select>;
            }
            default: {
                params = {...params};
                const tag = params.tag || 'input';
                const defaultValue = params.value || '';

                delete params.tag;
                delete params.value;
                
                return React.createElement(tag || 'input', Object.assign({
                    defaultValue
                }, defaults, params));
            }
        }
    }
}
