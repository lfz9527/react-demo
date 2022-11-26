import React, { Component } from 'react'
import { HashRouter,Switch,Route,Redirect } from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent.jsx'

import Home from '../page/home/home';
const Record = asyncComponent(()=> import('../page/record/record.jsx'))
const Balance = asyncComponent(()=> import('../page/balance/balance.jsx'))
const Helpcenter = asyncComponent(()=> import('../page/helpper/helpcenter.jsx'))
const Production = asyncComponent(()=> import('../page/production/production.jsx'))

export default class RouteConfig extends Component {
  render() {
    return (
     <HashRouter>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/record' component={Record} />
            <Route path='/balance' component={Balance} />
            <Route path='/helpcenter' component={Helpcenter} />
            <Route path='/production' component={Production} />
            <Redirect to="/" />
        </Switch>
     </HashRouter>
    )
  }
}
