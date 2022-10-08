import React, { useEffect, useState } from 'react'
import { Table, Space, Popconfirm, Button } from 'antd'
import { getRoles } from '../../../service/roles'
import { DeleteOutlined, ProfileOutlined } from '@ant-design/icons';

// 操作：删除成功
const handleConfirm = (e) => {
    console.log(e);
};
// 操作：删除失败
const handleCancel = (e) => {
    console.log(e)
};
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: '角色名称',
        dataIndex: 'roleName',
    },
];


export default function RoleList () {
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        getRoles().then(res => {
            console.log(res.data)
            setDataSource(res.data)
        })
    }, [])
    const operation = [{
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
                >
                    <Button danger shape="circle" icon={<DeleteOutlined />} />
                </Popconfirm>
                {/* 编辑 */}
                <Button type="primary" shape="circle" icon={<ProfileOutlined />} />
            </Space>
        }
    }]
    return (
        <Table dataSource={dataSource} columns={columns.concat(operation)} />
    )
}
