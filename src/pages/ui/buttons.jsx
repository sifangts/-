import React, { Component } from 'react'
import {Card,Button,Radio} from 'antd'
import {SearchOutlined,DownloadOutlined,LeftOutlined,RightOutlined} from '@ant-design/icons'
import './ui.css'
export default class Buttons extends Component {
    state={
        loading:true
    }
    haddleCloseLoading=()=>{
        this.setState({
            loading:false,
            size:'default'
        })
    }
    haddleChange=(e)=>{
        this.setState({
            size:e.target.value
        })
    }
    render() {
        return (
            <div className='button1'>
                <Card title='基础按钮' className='card-wrap'>
                    <Button type='primary'>Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type='dashed'>Imooc</Button>
                    <Button type='danger'>Imooc</Button>
                    <Button disabled>Imooc</Button>
                </Card>
                <Card title='图形按钮' className='card-wrap'>
                    <Button icon='plus'>创建</Button>
                    <Button icon='edit'>编辑</Button>
                    <Button icon='delete'>删除</Button>
                    <Button shape='circle' icon={<SearchOutlined />}></Button>
                    <Button type='primary' icon={<SearchOutlined />}>搜索</Button>
                    <Button type='primary' icon={<DownloadOutlined />}>下载</Button>
                </Card>
                <Card title='Loading按钮' className='card-wrap'>
                    <Button type='primary' loading={this.state.loading}>确定</Button>
                    <Button type='primary' shape='circle' loading={this.state.loading} ></Button>
                    <Button loading={this.state.loading}>点击下载</Button>
                    <Button shape='circle' loading={this.state.loading}></Button>
                    <Button type='primary' onClick={this.haddleCloseLoading}>关闭</Button>
                </Card>
                <Card title='按钮组' style={{marginBottom:10}}>
                    <Button.Group>
                       <Button type='primary' icon={<LeftOutlined />}>返回</Button>
                       <Button type='primary' icon={<RightOutlined />}>前进</Button>
                    </Button.Group>
                </Card>
                <Card title='按钮尺寸' className='card-wrap'>
                <Radio.Group value={this.state.size} onChange={this.haddleChange}>
                    <Radio value='small'>小</Radio>
                    <Radio value='default'>中</Radio>
                    <Radio value='large'>大</Radio>
                </Radio.Group>
                    <Button type='primary' size={this.state.size}>Imooc</Button>
                    <Button size={this.state.size}>Imooc</Button>
                    <Button type='dashed' size={this.state.size}>Imooc</Button>
                    <Button type='danger' size={this.state.size}>Imooc</Button>
                </Card>
            </div>
        )
    }
}
