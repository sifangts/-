import React, { Component } from 'react'
import { Card, Button, Table, Form,  Modal, message } from 'antd'
import axios from './../../axios/index'
// import Utils from './../../utils/utils'
import BaseForm from './../../components/BaseForm'
import './order.less'

// const { Option } = Select;
export default class Order extends Component {
    state = {
        dataSource: [],
        orderConfirmVisible:false,
        orderInfo:[]
    }
    params={
    page:1
    }
    formList=[
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            width:110,
            placeholder:'全部',
            initialValue:'0',
            list:[{id:'0',name:'全部'},{id:'1',name:'北京'},{id:'2',name:'天津'},{id:'3',name:'杭州'}]
        },
        {
            type:'时间查询'
        },
        {
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            width:110,
            initialValue:'0',
            list:[{id:'0',name:'全部'},{id:'1',name:'进行中'},{id:'2',name:'结束行程'}]
        }
    ]
    handleFilter=(params)=>{
        this.params=params;
        this.requestList();
    }
    requestList = () => {
        // let _this = this;
        axios.requestList(this,'/order/list',this.params,true)
        // axios.ajax({
        //   url: '/order/list',
        //   data: {
        //     params: {
        //       page: this.params.page
        //     }
        //   }
        // }).then(res => {
        //   if (res.code === 0) {
        //     console.log('1')
        //     this.setState({
        //       dataSource: res.result.item_list.map((item, index) => {
        //         item.key = index;
        //         return item;
        //       }),
        //       pagination: Utils.pagination(res, current => {
        //         _this.params.page = current;
        //         _this.requestList()
        //       })
        //     })
        //   }
        // })
    }
    handleFinish=()=>{
        let item=this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请选择一条订单进行结束'
            })
            return;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
               params:{
                orderId:item.id
               }
            }
        }).then(res=>{
            if(res.code===0){
                // console.log(res)
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisible:true
                   })
            }
        })
       
    }
    handleFinishOrder=()=>{
        let item =this.state.selectedItem
        axios.ajax({
            url:'/order/finish_order',
            data:{
                params:{
                    orderId:item.id
                   }
            }
        }).then(res=>{
            
            if(res.code===0){

              message.success("订单结束成功")
              this.setState({
                orderConfirmVisible:false
              })
              this.requestList()
            }
        })
    }
    onRowClick=(record,index)=>{
        let selectKey=[index];
        
        this.setState({
            selectedRowKeys:selectKey, //选中当前行的key值
            selectedItem:record  //选中当前行信息
        })
    }
    openOrderDetail=()=>{
        let item=this.state.selectedItem;
        if(!item){
            Modal.info({
                title:'信息',
                content:'请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank')
    }
    componentDidMount() {
        this.requestList()
    }
    render() {
        const { dataSource, pagination,orderConfirmVisible } = this.state;
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000+'km'
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            },

        ]
        const formItemLayout={
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        const rowSelection={
            type:"radio"
        }
        return (
            <div className='button1'>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{ margin: 10 }}>
                    <Button type='primary' onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type='primary' style={{marginLeft:30}} onClick={this.handleFinish}>结束订单</Button>
                </Card>
                <div className='content-wrap'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                        pagination={pagination}
                        rowSelection={rowSelection}
                        onRow={(record,index)=>{
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index)
                                },  //点击行
                            }
                        }}
                    />
                </div>
                <Modal
                title='结束订单'
                visible={orderConfirmVisible}
                onCancel={()=>{
                    this.setState({
                        orderConfirmVisible:false
                    })
                }}
                onOk={this.handleFinishOrder}
                width={600}
                >
                 <Form layout='horizontal'>
                    <Form.Item label="车辆编号" {...formItemLayout}>
                        {this.state.orderInfo.bike_sn}
                    </Form.Item>
                    <Form.Item label="剩余电量" {...formItemLayout}>
                        {this.state.orderInfo.battery+"%"}
                    </Form.Item>
                    <Form.Item label="行程开始时间" {...formItemLayout}>
                        {this.state.orderInfo.start_time}
                    </Form.Item>
                    <Form.Item label="当前位置" {...formItemLayout}>
                        {this.state.orderInfo.location}
                    </Form.Item>
                 </Form>
                </Modal>
            </div>
        )
    }
}
// class FilterForm extends Component {
//     render() {
//         // const {getFieldDecorator}=this.props.form;
//         return (
//             <Form layout='inline'>
//                 <Form.Item label="城市" name="city">
//                     <Select
//                         placeholder="全部"
//                         style={{ width: 110 }}
//                     >
//                         <Option value=''>全部</Option>
//                         <Option value='1'>北京</Option>
//                         <Option value='2'>天津</Option>
//                         <Option value='3'>上海</Option>
//                         <Option value='4'>杭州</Option>
//                         <Option value='5'>深圳</Option>
//                     </Select>
//                 </Form.Item>
//                 <Form.Item label="订单时间" name="start_time">
//                     <DatePicker
//                         showTime
//                         format='YYYY-MM-DD HH:mm:ss'
//                         placeholder="请输入开始时间"
//                         style={{ width: 164 }} />
//                 </Form.Item>
                
//                 <Form.Item
//                  label="~"
//                  colon={false}
//                 name="end_time">
//                     <DatePicker
//                         showTime
//                         format='YYYY-MM-DD HH:mm:ss'
//                         placeholder="请输入结束时间"
//                         style={{ width: 164 }} />

//                 </Form.Item>
//                 <Form.Item label="订单状态" name="order_status">

//                     <Select
//                         placeholder="全部"
//                         style={{ width: 110 }}
//                     >
//                         <Option value=''>全部</Option>
//                         <Option value='1'>进行中</Option>
//                         <Option value='2'>结束行程</Option>
//                     </Select>

//                 </Form.Item>
//                 <Form.Item >
//                     <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
//                     <Button>重置</Button>
//                 </Form.Item>
//             </Form>
//         )
//     }
// }
