import React, { Component } from 'react'
import { Row, Col } from 'antd'
// import Utils from './../../utils/utils'
import { connect } from 'react-redux'
import moment from 'moment'
import './index.css'
// import utils from '../../utils/utils'
class Header extends Component {
    state = {}
    UNSAFE_componentWillMount(){
        this.setState({
            userName: '河畔一角'
        })
        setInterval(() => {
            const d1 = new Date();
            const sysTime = moment(d1).format('YYYY-MMMM-Do h:mm:ss');
            this.setState({
                sysTime
            })
        }, 1000);
    }
    render() {
        const menuType=this.props.menuType;
        return (
            <div className='header'>
                <Row className='header-top'>
                    {
                        menuType?(
                        <Col span={6} className="logo">
                           <img src="/assets/logo-ant.svg" alt="" />
                           <span>IMooc 通用管理系统</span>
                        </Col>):''
                    }
                    
                    <Col span={menuType?18:24}>
                        <span>欢迎,{this.state.userName}</span>
                        <a href="/#">退出</a>
                    </Col>
                </Row>
                {
                    menuType?'':
                    <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>
                        {this.props.menuName}
                    </Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='weather-detail'>晴</span>
                    </Col>
                </Row>
                }
                
            </div>
        )
    }
}
const mapStateToprops=state=>{
    return{
        menuName:state.menuName
    }
}
export default connect(mapStateToprops)(Header)