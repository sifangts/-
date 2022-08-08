import React, { Component } from 'react'
import { Card, Form, Input, InputNumber,Button, Upload, Radio, Select, Switch, DatePicker, TimePicker,Checkbox } from 'antd'
import moment from 'moment';
// import Icon from '@ant-design/icons/lib/components/AntdIcon';
import {LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './form.css'

const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;
export default class Register extends Component {
    state = {}
    // handleSubmit=()=>{
    //     let userInfo=this.props.getFieldsValue();
    //     console.log(userInfo)
    // }
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }
  
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            userImg: imageUrl,
            loading: false,
          }),
        );
      }
    };
    render() {
        const {  loading } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const rowObject = {
            minRows: 4,
            maxRows: 6
        }
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        const offsetLayout={
            wrapperCol:{
                x:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        return (
            <div className='button1'>
                <Card title='注册表单'>
                    <Form layout='horizontal' {...formItemLayout}>
                        <FormItem label='用户名'
                            name='userName'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name'
                                }
                            ]}>
                            <Input placeholder='请输入用户名' />
                        </FormItem>
                        <FormItem label='密码' name='password' {...formItemLayout}>
                            <Input placeholder='请输入密码'></Input>
                        </FormItem>
                        <FormItem label='性别' name='gender'  >
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={0}>女</Radio>
                            </Radio.Group>
                        </FormItem>
                        <FormItem label='年龄' name='age' initialValue={18}  >
                            <InputNumber />
                        </FormItem>
                        <FormItem label='当前状态' name='status' initialValue={1} >
                            <Select showSearch>
                                <Option value='0'>咸鱼一条</Option>
                                <Option value='1'>风华浪子</Option>
                                <Option value='2'>北大才子一枚</Option>
                                <Option value='3'>创业者</Option>
                            </Select>
                        </FormItem>
                        <FormItem label='爱好' name='interest' initialValue={['0', '1', '2', '3']} >
                            <Select
                                showSearch
                                mode='multiple'>
                                <Option value='0'>唱</Option>
                                <Option value='1'>跳</Option>
                                <Option value='2'>rap</Option>
                                <Option value='3'>打篮球</Option>
                                <Option value='4'>踢足球</Option>
                                <Option value='5'>爬山</Option>
                                <Option value='6'>打乒乓球</Option>
                            </Select>
                        </FormItem>
                        <FormItem label='是否已婚' name='isMarried' valuePropName="checked">
                            <Switch defaultChecked />
                        </FormItem>
                        <FormItem label='生日' name='birthday' initialValue={moment('2022-08-05 11:02')}>
                            <DatePicker format='YYYY-MM-DD HH:mm' />
                        </FormItem>
                        <FormItem label='联系地址' name='address' initialValue='北京市海淀区奥林匹克公园'>
                            <TextArea autoSize={rowObject} />
                        </FormItem>
                        <FormItem label='早起时间' name='time'>
                            <TimePicker />
                        </FormItem>
                        <FormItem label='头像' name='userImg' valuePropName="fileList" >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                onChange={this.handleChange}
                            >
                                {/* {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )} */}
                                {this.state.userImg?<img src={this.state.userImg} alt=''/>:uploadButton}
                            </Upload>
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Checkbox defaultChecked>
                                我已经阅读过<a href="/#">慕课协议</a>
                            </Checkbox>
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type='primary' onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
