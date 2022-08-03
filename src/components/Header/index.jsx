import React, { Component } from 'react'
import { Row, Col } from 'antd'
// import Utils from './../../utils/utils'
import moment from 'moment'
import './index.css'
// import utils from '../../utils/utils'
export default class Header extends Component {
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
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col span={24}>
                        <span>欢迎,{this.state.userName}</span>
                        <a href="/#">退出</a>
                    </Col>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>
                        首页
                    </Col>
                    <Col span={20} className='weather'>
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='weather-detail'>晴</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
