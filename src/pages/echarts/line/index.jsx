import React, { Component } from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'
export default class Line extends Component {
    getOption1=()=>{
        let option={
            title:{
                text:'用户骑行订单',
            },
            tooltip:{
                trigger:'axis',
            },
            xAxis:{
                data:['周一',"周二",'周三',"周四",'周五',"周六",'周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'骑车量',
                    type:'line',
                    data: [
                        1450,
                        2344,
                        3333,
                        2311,
                        4442,
                        3489,
                        3754
                      ],
                }
            ]
        }
        return option
    }
    getOption2=()=>{
        let option={
            title:{
                text:'用户骑行订单',
            },
            tooltip:{
                trigger:'axis',
            },
            legend:{
                top:'30px',
                // data:[
                //     'OFO订单量',
                //     '摩拜订单量'
                // ]
            },
            xAxis:{
                data:['周一',"周二",'周三',"周四",'周五',"周六",'周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'OFO骑车量',
                    type:'line',
                    data: [
                        1450,
                        2344,
                        3333,
                        2311,
                        4442,
                        3489,
                        3754
                      ],
                },
                {
                    name:'摩拜骑车量',
                    type:'line',
                    data: [
                        1550,
                        2500,
                        3833,
                        2011,
                        3442,
                        4489,
                        4754
                      ],
                }
            ]
        }
      return option
    }
    getOption3=()=>{
        let option={
            title:{
                text:'用户骑行订单',
            },
            tooltip:{
                trigger:'axis',
            },
            xAxis:{
                boundaryGap:false,
                data:['周一',"周二",'周三',"周四",'周五',"周六",'周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'骑车量',
                    type:'line',
                    data: [
                        1450,
                        2344,
                        3333,
                        2311,
                        4442,
                        3489,
                        3754
                      ],
                      areaStyle:{}
                }
            ]
        }
      return option
    }
  render() {
    return (
      <div className='button1'>
        <Card title='饼状--基本图'>
            <ReactEcharts option={this.getOption1()} theme='Imooc' style={{height:500}}/> 
        </Card>
        <Card title='饼图--环形图'>
        <ReactEcharts option={this.getOption2()} theme='Imooc' style={{height:500}}/> 
        </Card>
        <Card title='饼图——南丁格尔图'>
        <ReactEcharts option={this.getOption3()} theme='Imooc' style={{height:500}}/> 
        </Card>
      </div>
    )
  }
}
