import React, { Component } from 'react'
import {Card,Button,Modal} from 'antd'
import './ui.css'
export default class Moduls extends Component {
    state={
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false,
    }
    handdleOpen=(type)=>{
        this.setState({
          [type]:true
        })
    }
    handdleConfirm=(type)=>{
      Modal[type]({
        title:'确认',
        content:'你确定你学会react了吗',
        onOk(){
          console.log('Ok')
        },
        onCancel(){
          console.log('Cancel')
        }
      })
    }
  render() {
    return (
      <div className='button1'>
        <Card title='基础模态框' className='card-wrap'>
             <Button type='primary' onClick={()=>this.handdleOpen('showModal1')}>Open</Button>
             <Button type='primary' onClick={()=>this.handdleOpen('showModal2')}>自定义页脚</Button>
             <Button type='primary' onClick={()=>this.handdleOpen('showModal3')}>顶部20px弹框</Button>
             <Button type='primary' onClick={()=>this.handdleOpen('showModal4')}>水平垂直居中</Button>
        </Card>
        <Card title='信息确认款' className='card-wrap'>
             <Button type='primary' onClick={()=>this.handdleConfirm('confirm')}>Confirm</Button>
             <Button type='primary' onClick={()=>this.handdleConfirm('info')}>Info</Button>
             <Button type='primary' onClick={()=>this.handdleConfirm('success')}>Success</Button>
             <Button type='primary' onClick={()=>this.handdleConfirm('warning')}>Warning</Button>
        </Card>
        <Modal 
            title='React'
            visible={this.state.showModal1}
            onCancel={()=>{
              this.setState({showModal1:false})
            }} 
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal 
            title='React'
            visible={this.state.showModal2}
            okText='好的'
            cancelText='算了'
            onCancel={()=>{
              this.setState({showModal2:false})
            }} 
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal 
            title='React'
            style={{top:20}}
            visible={this.state.showModal3}
            onCancel={()=>{
              this.setState({showModal3:false})
            }} 
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal 
            title='React'
            wrapClassName='vertical-center-modal'
            visible={this.state.showModal4}
            onCancel={()=>{
              this.setState({showModal4:false})
            }} 
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
      </div>
    )
  }
}
