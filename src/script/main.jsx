import React from 'react'
import {render} from 'react-dom'
import {
    Route,
    Router,
    IndexRoute
} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';


import HeaderNav from './components/HeaderNav';
import HeaderMobile from './components/HeaderMobile';
import SingleArticle from './components/SingleArticle';
import Index from './components/Index';
import Archives from './components/Archives';
import Page from './components/Page';
import Lab from './components/Lab';


class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id='container'>
                <HeaderNav/>
                <HeaderMobile/>
                <main id='page-main'>
                    {this.props.children}
                </main>
            </div>
        );
    }
}
let history = createBrowserHistory();
const routes = (
    <Router history={history}>
        <Route component={Main} path='/'>
            <IndexRoute component={Index} name='home' />
            <Route component={Archives} name='archives' path="archives"/>
            <Route component={Lab} name='lab' path="lab"/>
            <Route component={SingleArticle} name='article' path="article/:id"/>
            <Route component={Page} name='page' path=":title"/>
        </Route>
    </Router>
);

//React.render(<Main />, document.body);
render(routes, document.getElementById('silly-react-warning'));
