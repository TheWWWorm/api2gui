import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import Settings from './Settings';
import Home from './Home';
import keygen from '../keygen';

class Main extends React.Component {

    render() {
        const { pages } = this.props.nav;

        const routes = pages.map((page) => {
            return <Route 
                key={keygen()} 
                exact={!!(page.path === '/')} 
                path={page.path} 
                component={require(`./${page.name}`).default} />;
        });

        return <main>
            <Switch>
                {routes}
            </Switch>
        </main>
    }
}

export default withRouter(connect((store) => {
    return {
        nav: store.navigation
    };
})(Main));
