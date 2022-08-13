import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import Utils from '../../utils/utils';
import ETable from '../../components/ETable';
import BaseForm from './../../components/BaseForm'
import axios from './../../axios';
import './index.less'
export default class User extends Component {
  state = {

  };
  params = {
    page: 1
  }
  formList = [
    {
      type: 'INPUT',
      label: '用户名',
      field: 'user_name',
      placeholder: '请输入用户名称',
      width: 130,
    },
    {
      type: 'INPUT',
      label: '手机号',
      field: 'user_mobile',
      placeholder: '请输入手机号',
      width: 130,
    }, {
      type: 'DATE',
      label: '请选择入职日期',
      field: 'user_date',
      placeholder: '请选择结束日期',
      width: 200,
    }
  ];
  filterSubmit = (params) => {
    this.params = params;
    this.requestList();
  };
  componentDidMount() {
    this.requestList()
  }
  
  requestList = () => {
    axios.requestList(this, '/user/list', this.params, true)
  }
  render() {
    const { dataSource, selectedRowKeys, selectedItem } = this.state;
    const columns = [{
      title: "id",
      dataIndex: "id"
    }, {
      title: "用户名",
      dataIndex: "username"
    }, {
      title: "性别",
      dataIndex: "sex",
      render(sex) {
        return sex === 1 ? "男" : "女"
      }

    }, {
      title: "状态",
      dataIndex: "state",
      render(state) {
        let config = {
          '1': '咸鱼一条',
          '2': '风华浪子',
          '3': '北大才子',
          '4': '百度FE',
          '5': '创业者'
        }
        return config[state];
      }
    }, {
      title: "爱好",
      dataIndex: "interest",
      render(interest) {
        return {
          '1': "跑步",
          '2': "跳舞",
          '3': "唱歌",
          '4': "打台球",
          '5': "打羽毛球",
          '6': "踢足球",
          '7': "爬山",
          '8': "骑行",
        }[interest]
      }
    }, {
      title: "婚否",
      dataIndex: "isMarried",
      render(isMarried) {
        return isMarried === 1 ? "是" : "否"
      }
    }, {
      title: "生日",
      dataIndex: "birthday"
    }, {
      title: "联系地址",
      dataIndex: "address"
    }, {
      title: "早起时间",
      dataIndex: "time"
    }]

    return (
      <div className='button1'>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.filterSubmit} />
        </Card>
        <Card style={{ margin: 10 }}>
          <Button type='primary' onClick={this.openOrderDetail}>订单详情</Button>
          <Button type='primary' style={{ marginLeft: 30 }} onClick={this.handleFinish}>结束订单</Button>
        </Card>
        <div className='content-wrap'>
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            selectedRowKeys={selectedRowKeys}
            selectedItem={selectedItem}

          />
        </div>
      </div>
    )
  }
}
