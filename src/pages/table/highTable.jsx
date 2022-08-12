import React, { Component } from 'react'
import { Card, Table,Badge, Button, message,Modal } from 'antd'
import axios from './../../axios/index'
// import './table.css'
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
            url: '/table/high/list',
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
    handleChange=(pagination,filters,sorter)=>{
      console.log("::"+sorter)
      this.setState({
        sorterOrder:sorter.order
      })
    }
    //删除操作
    handleDelete=(item)=>{
      let id=item.id
      let userName=item.userName
      Modal.confirm({
        title:'确认',
        content:`你确定要删除(id:${id}姓名:${userName})这条数据吗？`,
        onOk:()=>{
          message.success('删除成功');
          this.request()
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
        const columns2 = [{
            title: "id",
            dataIndex: "id",
            width:80,
            fixed:"left"
          }, {
            title: "用户名",
            dataIndex: "userName",
            width:80,
            fixed:"left"
          }, {
            title: "性别",
            dataIndex: "sex",
            render(sex) {
              return sex === 1 ? "男" : "女"
            },
            width:80
          }, {
            title: "状态",
            width:80,
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
            width:80,
            dataIndex: "interest",
            render(interest) {
              let config = {
                '1': '游泳',
                '2': '跳舞',
                '3': '唱歌',
                '4': '打篮球',
                '5': '跑步',
                '6': '踢足球',
                '7': '爬山',
                '8': '看书',
                '9': '追剧'
              }
              return config[interest];
            }
          }, {
            title: "生日",
            dataIndex: "birthday",
            width:120
          }, {
            title: "生日",
            dataIndex: "birthday1",
            width:120
          },{
            title: "生日",
            dataIndex: "birthday2",
            width:120
          },{
            title: "生日",
            dataIndex: "birthday3",
            width:120
          },{
            title: "生日",
            dataIndex: "birthday4",
            width:120
          },{
            title: "生日",
            dataIndex: "birthday5",
            width:120
          },{
            title: "生日",
            dataIndex: "birthday6",
            width:120
          },{
            title: "生日",
            dataIndex: "birthday7",
            width:120
          },{
            title: "生日",
            dataIndex: "birthday8",
            width:120
          },{
            title: "地址",
            dataIndex: "address",
            width:120
          }, {
            title: "早起时间",
            dataIndex: "time",
            width:80,
            fixed:"right"
          }]
      const columns3=[
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
            render(sex) {
                return sex = 1 ? '男' : '女'
            }
        },
        {
          title:"年龄",
          dataIndex:"age",
          sorter:(a,b)=>{
            return a.age-b.age
          },
          // defaultSortOrder:'descend'
          sorterOrder:this.state.sorterOrder
        },
        {
            title: '状态',
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
    const columns4=[
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
          render(sex) {
              return sex = 1 ? '男' : '女'
          }
      },
      {
        title:"年龄",
        dataIndex:"age",
        sorter:(a,b)=>{
          return a.age-b.age
        },
        // defaultSortOrder:'descend'
        sorterOrder:this.state.sorterOrder
      },
      {
          title: '状态',
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
          dataIndex: 'interest',
          render(interest) {
              let config = {
                  '1': <Badge status='success' text="唱"/>,
                  '2': <Badge status='error' text="跳"/>,
                  '3': <Badge status='default' text="Rap"/>,
                  '4': <Badge status='processing' text="打篮球"/>,
                  '5': <Badge status='warning' text="穿背带裤"/>,
                  '6': <Badge status='warning' text="鸡你太美"/>,
                  '7': <Badge status='warning' text="练习时长两年半"/>,
                  '8': <Badge status='success' text="小布丁"/>
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
          title: '操作',
          render:(text,item)=>
            <Button onClick={()=>{this.handleDelete(item)}}>删除</Button>
          
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
                        scroll={{x:1290}}
                    />
                </Card>
                <Card title="表格排序" className='card-wrap'>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={dataSource2}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" className='card-wrap'>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={dataSource2}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}