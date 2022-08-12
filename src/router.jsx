import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
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

export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    {/* <Route path='/login' component={Login} /> */}
                    <Route path='/admin' component={() =>
                        <Admin>
                            <Switch>
                                <Route path='/admin/home' component={Home} />
                                <Route path='/admin/ui/buttons' component={Buttons} />
                                <Route path='/admin/ui/modals' component={Modals} />
                                <Route path='/admin/ui/loadings' component={Loadings} />
                                <Route path='/admin/ui/notice' component={Notice} />
                                <Route path='/admin/ui/messages' component={Message} />
                                <Route path='/admin/ui/tabs' component={Tabs} />
                                <Route path='/admin/ui/gallery' component={Gallery} />
                                <Route path='/admin/ui/carousel' component={Carousels} />
                                <Route path='/admin/form/login' component={FormLogin} />
                                <Route path='/admin/form/reg' component={Register} />
                                <Route path='/admin/table/basic' component={BasicTable} />
                                <Route path='/admin/table/high' component={HighTable} />
                                <Route path='/admin/city' component={City} />
                                <Route path='/admin/order' component={Order} />
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    } />
                    <Route path="/common" render={()=>
                             <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                             </Common>
                    }/>
                </App>
            </HashRouter>
        )
    }
}
