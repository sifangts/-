import React, { Component } from 'react'
import { Form, Select, Input, Checkbox, Button,DatePicker } from 'antd'
import Utils from '../../utils/utils';
const FormItem = Form.Item;
// const Option = Select.Option;
export default class BaseForm extends Component {
    handleFilterSubmit = () => {
        let fieldValue = this.myForm.getFieldsValue();
        this.props.filterSubmit(fieldValue)
    }
    reset=()=>{
        this.myForm.resetFields()
        console.log('reset被触发了')
    }
    initFormList = () => {
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item) => {
                let label = item.label;
                let field = item.field;
                let width = item.width;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                if(item.type==='时间查询'){
                    const begin_time=<FormItem label="订单时间" name="start_time" >
                        <DatePicker format='YYYY-MM-DD HH:mm:ss'  placeholder='选择开始时间' style={{width:width}}/>
                    </FormItem>
                    formItemList.push(begin_time);
                    const end_time=<FormItem label="~" colon={false} name="end_time" >
                        <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder='选择结束时间' style={{width:width}}/>
                    </FormItem>
                    formItemList.push(end_time)
                }else if (item.type === 'INPUT') {
                    const INPUT = <FormItem label={label}  name={field} key={field} initialValue={initialValue}>
                        <Input
                            placeholder={placeholder}
                            style={{ width: width }}
                        />
                    </FormItem>
                    formItemList.push(INPUT)
                } else if (item.type === 'SELECT') {
                    const SELECT = <FormItem label={label} name={field} key={field} initialValue={initialValue}>
                        <Select
                            placeholder={placeholder}
                            style={{ width: width }}
                        >
                            {Utils.getOptionList(item.list)}
                        </Select>
                    </FormItem>
                    formItemList.push(SELECT)
                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} name={field}  initialValue={initialValue}>
                        <Checkbox
                            valuePropName='checked'
                            placeholder={placeholder}
                            style={{ width: width }}
                        >
                            {label}
                        </Checkbox>
                    </FormItem>
                    formItemList.push(CHECKBOX)
                }else if (item.type === "DATE") {
                    const DATE = <Form.Item label={label} name={field}  key={field} initialValue={initialValue}>
                      <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder={placeholder} style={{ width: width }}/>
                    </Form.Item>
                    formItemList.push(DATE);}
            })
        }
        return formItemList;
    }
    render() {
        return (
            <Form layout='inline' ref={c => this.myForm = c}>
                {this.initFormList()}
                <FormItem >
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
