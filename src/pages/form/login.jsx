import React, { Component } from 'react'
import { Card, Form, Button,Input, message,Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './form.css'
const FormItem = Form.Item
export default class FormLogin extends Component {
    handleSubmit = async () => {
        console.log(this.myForm)
        let userInfo = this.myForm.getFieldsValue(); 
        console.log(userInfo)
        try {
          const values = await this.myForm.validateFields(['username','password']);
          console.log(values);
          message.success(`${userInfo.username}恭喜你，您通过本次表单学习，您的密码为${userInfo.password}`)
        } catch (errorInfo) {
          console.log(errorInfo);
        }
      };
    // onFinish=values=>{
    //     let userInfo = this.myForm.getFieldsValue();
    //     message.success(`${values.username}恭喜你，您通过本次表单学习，您的密码为${userInfo.password}`)
    // }
    render() {
        return (
            <div className='button1'>
                <Card title="登录行内表单">
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder='请输入用户名' />
                        </FormItem>
                        <FormItem>
                            <Input placeholder='请输入密码' />
                        </FormItem>
                        <FormItem>
                            <Button type='primary'>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" style={{marginTop:10}}>
                {/* <Form style={{width:300}} onFinish={this.onFinish} ref={c => this.myForm = c}> */}
                    <Form style={{width:300}}  ref={c => this.myForm = c}>
                        <FormItem name='username' 
                        rules={[
                            {
                                required:true,
                                message:'Please input your name'
                            },{
                                min:5,max:10,
                                message:'长度不在范围内'
                            },{
                                pattern:new RegExp('^\\w+$','g'),
                                message:'用户名必须为字母或数字'
                            }
                        ]}>
                                    <Input prefix={<UserOutlined className="username" />}   placeholder='请输入用户名' />
                        </FormItem>
                        <FormItem name='password'>
                                    <Input  prefix={<LockOutlined className="username" />}placeholder='请输入密码' />
                        </FormItem>
                        <FormItem 
                        name='remember'
                        valuePropName='checked'
                        initialValue={true}
                        style={{float:'left'}}>
                            <Checkbox>记住密码</Checkbox>
                        </FormItem>
                        <FormItem>
                            <a href="/#" style={{float:'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem className='Button2'>
                              <Button  type='primary' onClick={this.handleSubmit} >登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}