import React, { Component } from 'react'
import {Card} from 'antd'
// import echarts from 'echarts'
//按需加载
// import echarts from 'echarts/lib/echarts'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends Component {
    getOption1=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一',"周二",'周三',"周四",'周五',"周六",'周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'用车次数',
                    type:'bar',
                    data:[1200,2222,2342,1234,4444,5556,7744]
                }
            ]
        }
        return option
    }
    getOption2=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            legend:{
                data:['OFO','摩拜','小蓝']
            },
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一',"周二",'周三',"周四",'周五',"周六",'周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'OFO',
                    type: 'bar',
                    data:[2000,3000,5500,7000,8000,12000,20000]
                  },{
                    name:'摩拜',
                    type: 'bar',
                    data:[1500,3000,4500,6000,8000,10000,15000]
                  },{
                    name:'小蓝',
                    type: 'bar',
                    data:[1000,2000,2500,4000,6000,7000,8000]
                  }
            ]
        }
        return option
    }
  render() {
    return (
      <div className='button1'>
        <Card title='柱形图表之一'>
            <ReactEcharts option={this.getOption1()} theme='Imooc' style={{height:500}}/> 
        </Card>
        <Card title='柱形图表之二'>
        <ReactEcharts option={this.getOption2()} theme='Imooc' style={{height:500}}/> 
        </Card>
      </div>
    )
  }
}
