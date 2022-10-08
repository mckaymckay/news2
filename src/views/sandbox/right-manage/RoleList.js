import React, { useEffect, useState } from 'react'
import { Table, Space, Popconfirm, Button, Popover, Tree } from 'antd'
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
        render: (id) => {
            return <div style={{ 'fontWeight': 'bold' }}>{id}</div>
        }
    },
    {
        title: '角色名称',
        dataIndex: 'roleName',
    },
];
const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {
                        title: '0-0-0-0',
                        key: '0-0-0-0',
                    },
                    {
                        title: '0-0-0-1',
                        key: '0-0-0-1',
                    }
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            {
                title: '0-1-0-0',
                key: '0-1-0-0',
            }
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];


export default function RoleList () {
    const [dataSource, setDataSource] = useState([])
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    useEffect(() => {
        getRoles().then(res => {
            console.log(res.data)
            setDataSource(res.data)
        })
    }, [])
    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.

        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    const operation = [{
        title: '操作',
        render: (item) => {
            return <Space>
                {/* 删除 */}
                <Popconfirm
                    title="确定删除该角色吗？"
                    onConfirm={() => handleConfirm(item)}
                    onCancel={() => handleCancel(item)}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button danger shape="circle" icon={<DeleteOutlined />} />
                </Popconfirm>
                {/* 编辑 */}
                <Popover
                    content={
                        <Tree
                            checkable
                            onExpand={onExpand}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            onCheck={onCheck}
                            checkedKeys={checkedKeys}
                            onSelect={onSelect}
                            selectedKeys={selectedKeys}
                            treeData={treeData}
                        />}
                    title="角色列表"
                    placement="left"
                    trigger="click"
                >
                    <Button type="primary" shape="circle" icon={<ProfileOutlined />} />
                </Popover>

            </Space>
        }
    }]
    return (
        <Table dataSource={dataSource} columns={columns.concat(operation)} />
    )
}
