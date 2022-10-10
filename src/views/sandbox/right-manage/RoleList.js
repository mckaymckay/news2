import React, { useEffect, useState } from 'react'
import { Table, Space, Popconfirm, Button, Tree, message, Modal } from 'antd'
import { getRolesLists, deleteRoles, updateRoles } from '../../../service/roles'
import { getSideMenu } from '../../../service/rights'
import { DeleteOutlined, ProfileOutlined } from '@ant-design/icons';

// 操作：删除成功
const handleDeleteConfirm = (e) => {
    deleteRoles(e.item).then(res => {
        if (res.status === 200) {
            e.getRoles()
            message.success('已成功删除！');
        }
    })
};
// 操作：删除失败
const handleDeleteCancel = (e) => {
    console.log(e)
};
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: (id) => {
            return <b>{id}</b>
        }
    },
    {
        title: '角色名称',
        dataIndex: 'roleName',
    },
];

export default function RoleList () {
    const [roleLists, setRoleLists] = useState([])
    const [rightList, setRightLists] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [currentId, setCurrentId] = useState(0)
    //  modal弹出框显隐
    const showModal = (item) => {
        setCurrentId(item?.id)
        setCheckedKeys(item?.rights)
        setIsModalOpen(true);
    };
    // modal弹出框：确定
    const handleEditOk = () => {
        setIsModalOpen(false);
        const params = {
            id: currentId,
            checkedKeys: checkedKeys.checked
        }
        console.log(params)
        updateRoles(params).then(res => {
            res.status === 200 && getRoles()
        })
    };
    // modal弹出框：取消
    const handleEditCancel = () => {
        setIsModalOpen(false);
    };

    // tree：处理选中
    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue); // 受控
    };

    // 请求接口，获取角色列表
    function getRoles () {
        getRolesLists().then(res => {
            setRoleLists(res.data)
        })
    }
    // 请求接口，获取权限列表
    function getRights () {
        getSideMenu().then(res => {
            setRightLists(res.data)
        })
    }
    useEffect(() => {
        getRoles()
        getRights()
    }, [])

    const operation = [{
        title: '操作',
        render: (item) => {
            return <Space>
                {/* 删除 */}
                <Popconfirm
                    title="确定删除该角色吗？"
                    onConfirm={() => handleDeleteConfirm({ item, getRoles })}
                    onCancel={() => handleDeleteCancel(item)}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button danger shape="circle" icon={<DeleteOutlined />} />
                </Popconfirm>
                {/* 编辑 */}
                <Button type="primary" shape="circle" onClick={() => showModal(item)} icon={<ProfileOutlined />} />
            </Space>
        }
    }]
    return (
        <div>
            {/*  todo:rowkey */}
            <Table dataSource={roleLists} columns={columns.concat(operation)} rowKey={item => item.id} />
            <Modal title="权限分配" open={isModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
                <Tree
                    checkable
                    checkStrictly={true}
                    onCheck={onCheck} // 选中
                    checkedKeys={checkedKeys}
                    treeData={rightList}
                />
            </Modal>
        </div>

    )
}
