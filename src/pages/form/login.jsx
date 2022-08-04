import React, { Component } from 'react'
import { Card,Form,Button } from 'antd'
const FormItem=Form.Item
export default class FormLogin extends Component {
    render() {
        return (
            <div>
                <Card title="登录界面">
                      <Form layout='inline'>
                          <FormItem>
                            <input placeholder='请输入用户名' />
                          </FormItem>
                          <FormItem>
                            <input placeholder='请输入密码' />
                          </FormItem>
                          <FormItem>
                            <Button type='primary'>登录</Button>
                          </FormItem>
                      </Form>
                </Card>
            </div>
        )
    }
}
