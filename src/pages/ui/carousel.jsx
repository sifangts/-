import React, { Component } from 'react'
import {Card,Carousel} from 'antd'
import './ui.css'
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
   const imgStyle={
    height:'350px',
    width:'100%'
  }
export default class Carousels extends Component {
    render() {
        return (
            <div className='button1'>
                <Card title='文字轮播图' className='card-wrap'>
                    <Carousel autoplay effect="fade">
                        <div><h3 style={contentStyle}>Ant Motion Banner - React</h3></div>
                        <div><h3 style={contentStyle}>Ant Motion Banner - vue</h3></div>
                        <div><h3 style={contentStyle}>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title='图片轮播图' className='card-wrap'>
                    <Carousel autoplay effect="fade">
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt="" style={imgStyle} />    
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt=""  style={imgStyle}/> 
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt="" style={imgStyle}/> 
                        </div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
