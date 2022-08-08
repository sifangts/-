import React, { Component } from 'react'
import { Card, Table ,Modal, Button, message} from 'antd'
import axios from './../../axios/index'
import './table.css'
import Utils from './../../utils/utils'
export default class BasicTable extends Component {
    state = {
        dataSource: [],
        dataSource2: [],
        selectedRowKeys: []
    }
    params = {
        page: 1
    }
    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                userName: 'bob',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '秦新花园公寓',
                time: '09:00'
            },
            {
                id: '1',
                userName: 'tom',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '秦新花园公寓',
                time: '09:00'
            },
            {
                id: '3',
                userName: 'susan',
                sex: '2',
                state: '1',
                interest: '1',
                birthday: '2000-01-01',
                address: '秦新花园公寓',
                time: '09:00'
            }
        ]
        dataSource.map((item, index) => item.key = index)
        this.setState({
            dataSource
        })
        this.request()
    }
    //动态获取mock数据
    request = () => {
        // let baseUrl = 'https://www.fastmock.site/mock/4449338ea86be882ee92b9ab9b8f89bd/mock';
        //  axios.get(baseUrl+'/table/list').then((res)=>{
        //     if(res.status==='200'&& res.code==='0'){
        //         this.setState({
        //             dataSource2:res.data.result
        //         })

        //     }

        //  }) 
        let _this = this;
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: 1
                }
            }
        }).then((res) => {
            res.result.list.map((item, index) => item.key = index)
            if (res.code === 0) {
                this.setState({
                    dataSource2: res.result.list,
                    selectedRowKeys: [],
                    selectedRows: null,
                    pagination: Utils.pagination(res, current => {
                        console.log(current);
                        _this.params.page = current;
                        // console.log(_this)
                        this.request();
                    })
                })
            }

        })
    }
    onRowClick=(record,index)=>{
        let selectKey=[index];
        Modal.info({
            title:'信息',
            content:`用户名：${record.userName},key:${record.key}`
        })
        this.setState({
            selectedRowKeys:selectKey, //选中当前行的key值
            selectedItem:record  //选中当前行信息
        })
    }
    //多选表格进行删除
    handleDelte=(()=>{
        let rows=this.state.selectedRows;
        let ids=[];
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title:'删除提示',
            content:`你确定要删除这些数据吗？${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    })
    render() {
        const { dataSource, dataSource2,selectedRowKeys,pagination } = this.state;
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex=1?'男':'女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config={
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    let config={
                        '1':'唱',
                        '2':'跳',
                        '3':'RAP',
                        '4':'打篮球',
                        '5':'穿背带裤',
                        '6':'鸡你太美',
                        '7':'练习时长两年半',
                        '8':'小布丁'
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ]

        const rowSelection={
            type:'radio',
            selectedRowKeys
        }
        const rowCheckSelection={
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                // let ids=[];
                // selectedRows.map((item)=>{
                //     ids.push(item.id)
                // }) 
                this.setState({
                    selectedRowKeys,
                    // selectedIds:ids
                    selectedRows
                 })
            }
        }
        return (
            <div className='button1'>
                <Card title="基础表格" className='card-wrap'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格" className='card-wrap'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="单选表格" className='card-wrap'>
                    <Table
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index)=>{
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index)
                                },  //点击行
                            }
                        }}
                        columns={columns}
                        dataSource={dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="多选表格" className='card-wrap'>
                    <div style={{marginBottom:10}}>
                        <Button onClick={this.handleDelte}>删除</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection={rowCheckSelection}
                        onRow={(record,index)=>{
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index)
                                },  //点击行
                            }
                        }}
                        columns={columns}
                        dataSource={dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="表格分页" className='card-wrap'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={dataSource2}
                        pagination={pagination}
                    />
                </Card>
            </div>
        )
    }
}
