import React, { Component } from 'react'
import { Card, Table } from 'antd'
import axios from './../../axios/index'
import './table.css'
import Utils from './../../utils/utils'
export default class HighTable extends Component {
    state = {
        dataSource: [],
        dataSource2: [],
        selectedRowKeys: []
    }
    params = {
        page: 1
    }
    componentDidMount() {
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
                    page: this.params.page
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
    render() {
        const {  dataSource2} = this.state;
        const columns = [
            {
                title: 'id',
                width:80,
                dataIndex: 'id'
            },
            {
                title: '用户名',
                width:80,
                dataIndex: 'userName'
            },
            {
                title: '性别',
                width:80,
                dataIndex: 'sex',
                render(sex) {
                    return sex = 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                width:80,
                dataIndex: 'state',
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
            },
            {
                title: '爱好',
                width:80,
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': '唱',
                        '2': '跳',
                        '3': 'RAP',
                        '4': '打篮球',
                        '5': '穿背带裤',
                        '6': '鸡你太美',
                        '7': '练习时长两年半',
                        '8': '小布丁'
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                width:80,
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                width:80,
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                width:80,
                dataIndex: 'time'
            }
        ]
        const columns2 = [
            {
                title: 'id',
                width:80,
                fixed:'left',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                width:80,
                fixed:'left',
                dataIndex: 'userName'
            },
            {
                title: '用户名',
                width:80,
                dataIndex: 'userName'
            },
            {
                title: '用户名',
                width:80,
                dataIndex: 'userName'
            },
            {
                title: '用户名',
                width:80,
                dataIndex: 'userName'
            },
            {
                title: '用户名',
                width:80,
                dataIndex: 'userName'
            },
            {
                title: '用户名',
                width:80,
                dataIndex: 'userName'
            },
            {
                title: '用户名',
                width:80,
                dataIndex: 'userName'
            },
            {
                title: '性别',
                width:80,
                dataIndex: 'sex',
                render(sex) {
                    return sex = 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                width:80,
                dataIndex: 'state',
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
            },
            {
                title: '爱好',
                width:80,
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': '唱',
                        '2': '跳',
                        '3': 'RAP',
                        '4': '打篮球',
                        '5': '穿背带裤',
                        '6': '鸡你太美',
                        '7': '练习时长两年半',
                        '8': '小布丁'
                    }
                    return config[interest];
                }
            },
            {
                title: '生日',
                width:80,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                width:80,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                width:80,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                width:80,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                width:80,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                width:80,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                width:80,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                width:80,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                width:80,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                width:80,
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                width:80,
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                width:80,
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                width:80,
                dataIndex: 'time'
            }
        ]
        return (
            <div className='button1'>
                <Card title="头部固定" className='card-wrap'>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={dataSource2}
                        pagination={false}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定" className='card-wrap'>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={dataSource2}
                        pagination={false}
                        scroll={{x:1930}}
                    />
                </Card>
            </div>
        )
    }
}