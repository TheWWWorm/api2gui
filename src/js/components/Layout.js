import React from 'react'
import { connect } from 'react-redux'
import { handleRequest } from '../actions/apiActions'

@connect((store) => {
    return {
        apiMap: store.apiMap,
        json: store.api.json
    };
})
export default class Layout extends React.Component {

    handleRequest(e) {
        this.props.dispatch(handleRequest(e))
    }

    render() {
        const { apiMap, json } = this.props;

        const mappedApi = apiMap.map((req, i) => {
            const inputs = (req.fields || []).map((input, i) => {
                return <div class="form-group row" key={'input' + i}>
                    <label class="col-md-2 col-form-label" for={input.name}>{input.name}</label>
                    <div class="col-md-5">
                        <input type={req.type} name={input.name} class="form-control" />
                    </div>
                </div>;
            });

            return <li key={'form' + i}>
                <h3>{req.name || req.url}</h3>
                <form action={req.url} method={req.method} onSubmit={this.handleRequest.bind(this)}>
                    {inputs}
                    <div class="input-group mb-3">
                        <button type="submit" class="btn btn-primary">Send</button>
                    </div>
                </form>
            </li>
        })

        return <div class="container">
            <h1>Api2Gui</h1>
            <div class="row">
                <ul class="col-md-8">{mappedApi}</ul>
                <div class="col-md-4">
                    <pre>
                        <code class="language-json">{JSON.stringify(json, null, 2)}</code>
                    </pre>
                </div>
            </div>
        </div>
    }
}
