import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
// import Login from './pages/login'
import Admin from './admin';
import Home from './pages/home/index'
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import NoMatch from './pages/nomatch';
import Loadings from './pages/ui/loadings';
import Notice from './pages/ui/notice'
import Message from './pages/ui/message';
import Tabs from './pages/ui/tab'
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import Register from './pages/form/register'
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import City from './pages/city/index';
import Order from './pages/order/index';
import Common from './common'
import OrderDetail from './pages/order/detail';
import User from './pages/user/index'
import bikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import Rich from './pages/rich';
import PermissionUser from './pages/permisssion';


export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/common" render={() =>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                            </Common>
                        } />
                        <Route path='/' component={() =>
                            <Admin>
                                <Switch>
                                    
                                    <Route path='/home' component={Home} />
                                    <Route path='/ui/buttons' component={Buttons} />
                                    <Route path='/ui/modals' component={Modals} />
                                    <Route path='/ui/loadings' component={Loadings} />
                                    <Route path='/ui/notice' component={Notice} />
                                    <Route path='/ui/messages' component={Message} />
                                    <Route path='/ui/tabs' component={Tabs} />
                                    <Route path='/ui/gallery' component={Gallery} />
                                    <Route path='/ui/carousel' component={Carousels} />
                                    <Route path='/form/login' component={FormLogin} />
                                    <Route path='/form/reg' component={Register} />
                                    <Route path='/table/basic' component={BasicTable} />
                                    <Route path='/table/high' component={HighTable} />
                                    <Route path='/city' component={City} />
                                    <Route path='/order' component={Order} />
                                    <Route path='/user' component={User} />
                                    <Route path='/bikeMap' component={bikeMap} />
                                    <Route path='/charts/bar' component={Bar} />
                                    <Route path='/charts/pie' component={Pie} />
                                    <Route path='/charts/line' component={Line} />
                                    <Route path='/rich' component={Rich} />
                                    <Route path='/permission' component={PermissionUser} />
                                    <Redirect to='/home' />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}
