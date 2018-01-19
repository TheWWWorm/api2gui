import React from "react";
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'
import keygen from '../keygen';

class Header extends React.Component {
    render() {
        
        const { pages } = this.props.nav;

        const links = pages.map((page, i) => {
            return <li class="nav-item" key={keygen()}>
                <NavLink exact={!!(page.path === '/')} class="nav-link" activeClassName="active" to={page.path}>{page.name}</NavLink>
            </li>
        });

        return <header>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a class="navbar-brand" href=".">Api2Gui</a>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav">
                        {links}
                    </ul>
                </div>
            </nav>
        </header>
    }
};

export default withRouter(connect((store) => {
    return {
        nav: store.navigation
    };
})(Header));