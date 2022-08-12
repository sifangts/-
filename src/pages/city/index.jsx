import React, { Component } from 'react'
import { Card, Form, Select, Button, Table ,Modal, message } from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import './city.css'

const { Option } = Select;
export default class City extends Component {
  state = {
    dataSource:[],
    isShowOpenCity:false
  }
  params = {
    page: 1
  }
  //开通城市
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity:true
    })
  }
  componentDidMount() {
    this.requestList()
  }
  //默认请求接口数据
  requestList = () => {
    let _this = this
    axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          dataSource: res.result.item_list.map((item, index) => {
            item.key = index;
            return item;
          }),
          pagination: Utils.pagination(res, current => {
            _this.params.page = current;
            _this.requestList()
          })
        })
      }
    })
  }
  //城市开通提交
  handleSubmit=()=>{
      let cityInfo=this.myForm.myForm.getFieldsValue();
      axios.ajax({
        url:"/city/open",
        data:{
          params:cityInfo
        }
      }).then(res=>{
        if(res.code===0){
          message.success("开通成功");
          this.setState({
            isShowOpenCity:false
          })
        }
      })
  }
  render() {
    const { dataSource, pagination } = this.state;
    const columns = [{
      title: "城市ID",
      dataIndex: "id"
    }, {
      title: "城市名称",
      dataIndex: "name"
    },
    {
      title: "用车模式",
      dataIndex: "mode",
      render(mode){
        return mode===1 ? '指定停车点':'禁停区'
       }
    },
    {
      title: "运营模式",
      dataIndex: "op_mode",
      render(op_mode){
        return op_mode===1?'自营':'加盟'
      }
    },
    {
      title: "授权加盟商",
      dataIndex: "franchisee_name"
    },
    {
      title: "城市管理员",
      dataIndex: "city_admins",
      render(arr) {
        return arr.map(item => {
          return item.user_name
        }).join(',')
      }
    },
    {
      title: "城市开通时间",
      dataIndex: "open_time"
    },
    {
      title: "操作时间",
      dataIndex: "update_time",
      // render :Utils.formateDate
    },
    {
      title: "操作人",
      dataIndex: "sys_user_name"
    }]
    return (
      <div className='button1'>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{marginTop:10}}>
          <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
        />
        <Modal
          title='开通城市'
          visible={this.state.isShowOpenCity}
          onCancel={()=>{
            this.setState({
              isShowOpenCity:false
            })
          }}
          onOk={this.handleSubmit}
        >
           <OpenCityForm ref={c=>this.myForm=c}/>
        </Modal>
      </div>
    )
  }
}

class FilterForm extends Component {
  render() {
    // const {getFieldDecorator}=this.props.form;
    return (
      <Form layout='inline'>
        <Form.Item label="城市" name="city">
          <Select
            placeholder="全部"
            style={{ width: 110 }}
          >
            <Option value=''>全部</Option>
            <Option value='1'>北京</Option>
            <Option value='2'>天津</Option>
            <Option value='3'>上海</Option>
            <Option value='4'>杭州</Option>
            <Option value='5'>深圳</Option>
          </Select>
        </Form.Item>
        <Form.Item label="停车模式" name="mode">

          <Select
            placeholder="全部"
            style={{ width: 150 }}
          >
            <Option value=''>全部</Option>
            <Option value='1'>指定停车点模式</Option>
            <Option value='2'>禁停区模式</Option>
          </Select>

        </Form.Item>
        <Form.Item label="运营模式" name="op_mode">

          <Select
            placeholder="全部"
            style={{ width: 110 }}
          >
            <Option value=''>全部</Option>
            <Option value='1'>自营</Option>
            <Option value='2'>加盟</Option>
          </Select>

        </Form.Item>
        <Form.Item label="加盟商授权状态" name="auth_status">

          <Select
            placeholder="全部"
            style={{ width: 110 }}
          >
            <Option value=''>全部</Option>
            <Option value='1'>已授权</Option>
            <Option value='2'>未授权</Option>
          </Select>

        </Form.Item>
        <Form.Item >
          <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
          <Button>重置</Button>
        </Form.Item>
      </Form>
    )
  }
}
class OpenCityForm extends Component{
  render(){
    const formItemLayout={
      labelCol:{
        span:5
      },
      wrapperCol:{
        span:10
      }
    }
    return(
       <div>
        <Form layout='horizontal' {...formItemLayout} ref={c=>this.myForm=c}>
          <Form.Item label='选择城市' name="city_id" initialValue="1">
            <Select> 
              <Option value="">全部</Option>
              <Option value="1">北京</Option>
              <Option value="2">天津</Option>
            </Select>
          </Form.Item>
          <Form.Item label='运营模式' name="op_mode" initialValue="1">
            <Select>
              <Option value="">全部</Option>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          </Form.Item>
          <Form.Item label='用车模式' name="use_mode" initialValue="1">
            <Select>
              <Option value="">全部</Option>
              <Option value="1">指定停车点</Option>
              <Option value="2">禁停区</Option>
            </Select>
          </Form.Item>
        </Form>
       </div>
    )
  }
}