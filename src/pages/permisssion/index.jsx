import React, { Component } from 'react'
import { Card, Button, Select, Form, Modal, Input, Tree ,Transfer} from 'antd'
import ETable from '../../components/ETable'
import Utils from '../../utils/utils'
import axios from './../../axios/index'
import menuConfig from './../../config/menuConfig'

const { Option } = Select;
const { TreeNode } = Tree
export default class PermissionUser extends Component {
    state = {
        dataSource: []
    }
    componentDidMount() {
        this.requestList()
    }
    requestList = () => {
        axios.requestList(this, '/role/list', {}, true)
    }
    //弹出创建角色弹窗
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }
    //角色提交
    handleRoleSubmit = () => {
        let data = this.roleForm.roleForm.getFieldsValue();
        axios.ajax({
            url: '/role/create',
            data: {
                params: data
            }
        }).then(res => {
            if (res.code === 0) {
                this.setState({
                    isRoleVisible: false
                })
                this.roleForm.roleForm.resetFields();
                this.requestList()
            }
        })
    }
    //权限设置
    handlePerssion = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: item,
            menuInfo: item.menus
        })
    }
    handlePermEditSubmit = () => {
        let data = this.permForm.permForm.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url: '/permission/edit',
            data: {
                params: { ...data }
            }
        }).then(res => {
            if (res) {
                this.setState({
                    isPermVisible: false
                })
                this.requestList()
            }
        })
    }
    //用户授权
    handleUserAuth = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isUserVisible: true,//弹窗
            detailInfo: item
        })
        this.getRoleUserList(item.id)
    }
    getRoleUserList = (id) => {
        axios.ajax({
            url: '/role/user_list',
            data: {
                params: {
                    id
                }
            }
        }).then(res => {
            if (res) {
                
                this.getAuthUserList(res.result)
            }
        })
    }
    //筛选目标用户
    getAuthUserList = (dataSource) => {
        const mockData = [];
        const targetKeys = [];
        if (dataSource && dataSource.length > 0) {
            for (let i = 0; i<dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if (data.status === 1) {//判断是否是目标用户
                    targetKeys.push(data.key);
                } 
                    mockData.push(data)
                
            }
            this.setState({
                mockData,
                targetKeys
            })
        }
    }
    //用户授权提交
    handleUserSubmit=()=>{
        let data={}
        data.user_ids=this.state.targetKeys;
        data.role_id=this.state.selectedItem.id;
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                    ...data
                    // user_ids:data.user_ids,
                    // role_id:data.role_id
                }
            }
        }).then(res=>{
            if(res){
                this.setState({
                    isUserVisible:false
                })
                this.requestList()
            }
        })
    }
    render() {
        const { dataSource, selectedRowKeys } = this.state
        const columns = [{
            title: '角色ID',
            dataIndex: 'id'
        }, {
            title: '角色名称',
            dataIndex: 'role_name'
        }, {
            title: '创建时间',
            dataIndex: 'create_time'
        }, {
            title: '使用状态',
            dataIndex: 'status',
            render(status) {
                return status === 1 ? '启用' : '停用'
            }
        }, {
            title: '授权时间',
            dataIndex: 'authorize_time',
            render(authorize_time) {
                return Utils.formateDate(new Date(authorize_time))
            }
        }, {
            title: '授权人',
            dataIndex: 'authorize_user_name'
        }]
        return (
            <div className='button1'>
                <Card>
                    <Button type='primary' style={{ marginRight: 10 }} onClick={this.handleRole}>创建角色</Button>
                    <Button type='primary' style={{ marginRight: 10 }} onClick={this.handlePerssion}>设置权限</Button>
                    <Button type='primary' onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        dataSource={dataSource}
                        columns={columns}
                        selectedRowKeys={selectedRowKeys}
                    />
                </div>
                <Modal
                    title='创建角色'
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.roleForm.roleForm.resetFields();
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                >
                    <RoleForm
                        ref={c => this.roleForm = c}
                    />
                </Modal>
                <Modal
                    title='设置权限'
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                >
                    <PerEditForm
                        ref={c => this.permForm = c}
                        detailInfo={this.state.detailInfo}
                        menuInfo={this.state.menuInfo}
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                    />
                </Modal>
                <Modal
                    title='用户授权'
                    visible={this.state.isUserVisible}
                    width={600}
                    onOk={this.handleUserSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false
                        })
                    }}
                >
                    <RoleAuthForm
                        ref={c => this.userAuthForm = c}
                        detailInfo={this.state.detailInfo}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo={(targetKeys)=>{
                            this.setState({
                                targetKeys
                            })
                        }}
                    />
                </Modal>
            </div>
        )
    }
}
class RoleForm extends Component {
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }

        return (
            <Form {...formItemLayout} ref={c => this.roleForm = c}>
                <Form.Item label='角色名称' name='role_name'>

                    <Input placeholder='请输入角色名称' />

                </Form.Item>
                <Form.Item label='状态' name='state' >

                    <Select>
                        <Option value={1}>开启</Option>
                        <Option value={0}>关闭</Option>

                    </Select>

                </Form.Item>
            </Form>
        )
    }
}


class PerEditForm extends Component {
    //生成权限列表
    renderTreeModes = (data) => {
        return data.map(item => {
            if (item.children) {
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeModes(item.children)}
                </TreeNode>
            } else {
                return <TreeNode title={item.title} key={item.key} />
            }
        })
    }
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const detail_Info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo
        return (
            <Form layout='horizontal' {...formItemLayout} ref={c => this.permForm = c}>
                <Form.Item label='角色名称' name='role_name'>
                    <Input disabled placeholder={detail_Info.role_name} />
                </Form.Item>
                <Form.Item label='状态' name='status' initialValue='0'>
                    <Select>
                        <Option value={1}>开启</Option>
                        <Option value={0}>关闭</Option>
                    </Select>
                </Form.Item>
                <Tree
                    checkable//是否有勾选狂
                    defaultExpandAll//默认展开
                    onCheck={(checkedKeys) => {//点击复选框触发
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}//(受控)选中复选框的书节点
                >
                    <TreeNode title='平台权限' key='platform_all'>
                        {this.renderTreeModes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}

class RoleAuthForm extends Component {
    //生成权限列表
  
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    }
    filterOption=(inputValue,option)=>{
        return option.title.indexOf(inputValue>-1)
    }
    handleChange=(targetKeys)=>{
        this.props.patchUserInfo(targetKeys)
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const detail_Info = this.props.detailInfo;
        
        return (
            <Form layout='horizontal' {...formItemLayout} ref={c => this.permForm = c}>
                <Form.Item label='角色名称' name='role_name'>
                    <Input disabled placeholder={detail_Info.role_name} />
                </Form.Item>
                <Form.Item label='选择用户'>
                <Transfer
                listStyle={{width:200,height:400}}
                    dataSource={this.props.mockData}
                    titles={['待选用户','已选用户']}
                    showSearch
                    searchPlaceholder='输入用户名'
                    filterOption={this.filterOption}
                    targetKeys={this.props.targetKeys}
                    onChange={this.handleChange}
                    render={item=>item.title}
                    />
                </Form.Item>
                
            </Form>
        )
    }
}