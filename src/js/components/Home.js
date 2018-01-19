'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { handleRequest } from '../actions/apiActions';
import inputFactory from './input_factory';
import Header from './Header';
import keygen from '../keygen';

const InputFactory = new inputFactory;

@connect((store) => {
    return {
        apiMap: store.apiMap,
        json: store.api.json,
        settings: store.settings
    };
})
export default class Layout extends React.Component {

    handleRequest(e) {
        this.props.dispatch(handleRequest(e, this.props.settings))
    }

    render() {
        const { apiMap, json } = this.props;

        const sidebarStyle = {
            position: 'fixed',
            top: '51px',
            right: '0',
            bottom: '0',
            zIndex: '1000',
            padding: '40px 75px',
            overflowX: 'hidden',
            overflowY: 'auto',
            borderLeft: '1px solid #eee',
            backgroundColor: '#272822'
        }

        const mappedApi = apiMap.map((req, i) => {
            const inputs = (req.fields).map((input, i) => {
                return <div class="form-group row" key={keygen()}>
                    <label class="col-md-3 col-form-label" for={input.name}>{input.name}</label>
                    <div class="col-md-6">
                        {InputFactory.make(input)}
                    </div>
                </div>;
            });

            return <li key={keygen()}>
                <h3>{req.name || req.url}</h3>
                <form action={req.url} method={req.method} onSubmit={this.handleRequest.bind(this)}>
                    {inputs}
                    <div class="input-group mb-3">
                        <button type="submit" class="btn btn-primary">{req.method}</button>
                    </div>
                </form>
            </li>
        })

        return <div class="container" style={{ paddingTop: '65px' }}>
            <div class="row">
                <main class="col-md-7">
                    <ul style={{ listStyleType: 'none'}}>{mappedApi}</ul>
                </main>
                <div class="col-md-5" style={sidebarStyle}>
                    <pre>
                        <code class="language-json" style={{ 
                            color:'#ffe04a',
                            whiteSpace: 'pre-wrap' 
                        }}>{JSON.stringify(json, null, 2)}</code>
                    </pre>
                </div>
            </div>
        </div>
    }
}
