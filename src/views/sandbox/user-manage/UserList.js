import React from 'react'
import { Table, Tag, Button, Space, message, Popconfirm, Popover, Switch, Form, Input, Modal, Radio, Select, } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getUsersList, getAllRegions, getAllRoles } from '../../../service/users';
import { useEffect, useState } from 'react';

const { Option } = Select;

// 操作：删除成功
const handleConfirm = (e) => {
    console.log(e);
};
// 操作：删除失败
const handleCancel = (e) => {
    console.log(e)
};
const onChange = (checked) => {
    console.log(11);
};
const columns = [
    {
        title: '区域',
        dataIndex: 'region',
        filters: [
            {
                text: '亚洲',
                value: '亚洲'
            },
            {
                text: '南极洲',
                value: '南极洲'
            }],
        onFilter: (value, record) => record.region.indexOf(value) === 0,
        render: (region) => {
            return <b>{region === '' ? '全球' : region}</b>
        }
    },
    {
        title: '角色名称',
        dataIndex: 'role',
        render: (role) => {
            return role?.roleName
        }
    },
    {
        title: '用户名',
        dataIndex: 'username',
    },
    {
        title: '用户状态',
        render: (item) => {
            return <Switch defaultChecked onChange={onChange} disabled={item.default} checked={item.roleState} />
        }
    },
    {
        title: '操作',
        render: (item) => {
            return <Space>
                {/* 删除 */}
                <Popconfirm
                    title="确定删除该权限吗？"
                    onConfirm={() => handleConfirm(item)}
                    onCancel={() => handleCancel(item)}
                    okText="确定"
                    cancelText="取消"
                    disabled={item.default === true}
                >
                    <Button danger shape="circle" icon={<DeleteOutlined />} disabled={item.default} />
                </Popconfirm>
                {/* 编辑 */}
                {/* <Popover
                content={<Switch checked={item.pagepermisson} disabled={item.pagepermisson === undefined} onChange={() => handleChangeSwitch(item)} />}
                title="页面配置项"
                trigger="click"
            > */}
                <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default} />
                {/* </Popover> */}
            </Space>
        }
    },
];
const handleChange = (value) => {
    console.log(111);
};
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="添加用户信息"
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                layout="vertical"
                initialValues={{
                    rolename: '区域管理员',
                    username: 'Mckay',
                    password: '123'
                }}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码 ',
                        },
                    ]}>
                    <Input type="password" />
                </Form.Item>
                <Form.Item
                    name="region"
                    label="区域"
                    rules={[
                        {
                            required: true,
                            message: '请输入区域 ',
                        },
                    ]}>
                    <Select
                        onChange={handleChange}
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="rolename"
                    label="角色"
                    rules={[
                        {
                            required: true,
                            message: '请输入角色 ',
                        },
                    ]}>
                    <Select
                        onChange={handleChange}
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};


export default function UserList () {
    const [usersList, setUsersList] = useState([]);
    const [isopen, setIsOpen] = useState(false);
    const [regionList, setRegionList] = useState([])
    const [roleList, setRoleList] = useState([])


    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setIsOpen(false);
    };
    function getUsers () {
        getUsersList().then(res => {
            console.log(res)
            setUsersList(res.data)
        })
    }
    useEffect(() => {
        getUsers()
        getAllRoles().then(res => {
            console.log(193, res.data)
            const roles = res.data.map(v => v.roleName)

        })
        getAllRegions().then(res => {
            console.log(194, res.data)
            const roles = res.data.map(v => v.value)
        })
    }, [])
    return (
        <div>
            <Button type='primary' onClick={() => {
                setIsOpen(true);
            }}>添加用户</Button>
            <Table dataSource={usersList} columns={columns} rowKey={item => item.id} pagination={{
                pageSize: 5
            }} />
            <CollectionCreateForm
                open={isopen}
                onCreate={onCreate}
                onCancel={() => {
                    setIsOpen(false);
                }}
            />
        </div>
    )
}
