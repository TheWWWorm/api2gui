'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { handleUpdate } from '../actions/settingActions';
import inputFactory from './input_factory';
import keygen from '../keygen';

const InputFactory = new inputFactory;

@connect((store) => {
    return {
        settings: store.settings
    };
})

export default class Settings extends React.Component {

    handleUpdate(e) {
        this.props.dispatch(handleUpdate(e))
    }

    render() {

        const inputs = this.props.settings.map((setting, i) => {
            return <div class="form-group row" key={keygen()}>
                <label class="col-md-3 col-form-label" for={setting.name}>{setting.name}</label>
                <div class="col-md-6">
                    {InputFactory.make(setting)}
                </div>
            </div>;
        });
    
        return <div class="container" style={{ paddingTop: '65px' }}>
            <h1>Settings</h1>
            <form onSubmit={this.handleUpdate.bind(this)}>
                {inputs}
                <div class="input-group mb-3">
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    }
}