import React, { Component } from 'react'
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';

export default class Pie extends Component {
    getOption1=()=>{
        let option={
            title:{
                text:'用户骑行订单',
                left:'center'
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}{{d}%}'
            },
            legend:{
                orient:'vertical',
                right:'right',
                // data:['周一',"周二",'周三',"周四",'周五',"周六",'周日']
            },
            series:[
                {
                    name:'Access Form',
                    type:'pie',
                    radius:'50%',
                    data: [
                        {
                          value:1000,
                          name:'周一'
                        },{
                          value:1200,
                          name:"周二"
                        },{
                          value:1500,
                          name:'周三'
                        },{
                          value:2000,
                          name:'周四'
                        },{
                          value:2600,
                          name:'周五'
                        },{
                          value:2500,
                          name:'周六'
                        },{
                            value:1400,
                            name:'周日'
                          }
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
                left:'center'
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}{{d}%}'
            },
            legend:{
                orient:'vertical',
                right:'right',
                // data:['周一',"周二",'周三',"周四",'周五',"周六",'周日']
            },
            series:[
                {
                    name:'Access Form',
                    type:'pie',
                    radius:['40%','70%'],
                    data: [
                        {
                          value:1000,
                          name:'周一'
                        },{
                          value:1200,
                          name:"周二"
                        },{
                          value:1500,
                          name:'周三'
                        },{
                          value:2000,
                          name:'周四'
                        },{
                          value:2600,
                          name:'周五'
                        },{
                          value:2500,
                          name:'周六'
                        },{
                            value:1400,
                            name:'周日'
                          }
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
                left:'center'
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}{{d}%}'
            },
            toolbox: {
                show: true,
                feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
            legend:{
                orient:'vertical',
                right:'right',
                // data:['周一',"周二",'周三',"周四",'周五',"周六",'周日']
            },
            series:[
                {
                    name:'Access Form',
                    type:'pie',
                    roseType:'area',
                    radius:[50,250],
                    center:['50%','60%'],
                    itemStyle:{
                        borderRadious:8
                    },
                    data: [
                        {
                          value:1000,
                          name:'周一'
                        },{
                          value:1200,
                          name:"周二"
                        },{
                          value:1500,
                          name:'周三'
                        },{
                          value:2000,
                          name:'周四'
                        },{
                          value:2600,
                          name:'周五'
                        },{
                          value:2500,
                          name:'周六'
                        },{
                            value:1400,
                            name:'周日'
                          }
                      ].sort((a,b)=>a.value-b.value),
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
