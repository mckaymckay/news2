import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Tag, Button, Space, message, Popconfirm, Popover, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { getSideMenu, deleteRight, deleteChildren, patchRight, patchChildren } from '../../../service/rights';
import './RightList.css'
import styles from './RightList.css'
console.log(styles)
// 操作：删除成功
const handleConfirm = (e) => {
    console.log(e);
    if (e.item.grade === 1) {
        deleteRight(e.item).then(res => {
            if (res.status === 200) {
                e.getRights()
                message.success('已成功删除！');
            }
        })
    } else if (e.item.grade === 2) {
        deleteChildren(e.item).then(res => {
            if (res.status === 200) {
                e.getRights()
                message.success('已成功删除！');
            }
        })
    }
};
// 操作：删除失败
const handleCancel = (e) => {
    console.log(e)
};
// table的行
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        render: (id) => {
            return <div className='first-columns'> {id}</div >
        }
    },
    {
        title: '权限名称',
        dataIndex: 'title',
    },
    {
        title: '权限路径',
        dataIndex: 'key',
        render: (key) => {
            return <Tag color={'green'}>
                {key}
            </Tag>
        }
    },
];

export default function RightList () {
    const [dataSource, setDataSource] = useState([]);
    // 请求接口，获取权限列表
    async function getRights () {
        const res = await getSideMenu()
        res.data.forEach(v => {
            (v?.children.length === 0) && (v.children = '')
        });
        setDataSource(res.data)
    }
    // function getRights () {
    //     getSideMenu().then(res => {
    //         res.data.forEach(v => {
    //             (v?.children.length === 0) && (v.children = '')
    //         });
    //         setDataSource(res.data)
    //     })
    // }
    // 操作：编辑权限
    const handleChangeSwitch = (item) => {
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
        if (item.grade === 1) {
            patchRight(item).then(res => {
                res.status === 200 && setDataSource([...dataSource])
            })
        } else if (item.grade === 2) {
            patchChildren(item).then(res => {
                res.status === 200 && setDataSource([...dataSource])
            })
        }
    }
    useEffect(() => {
        getRights()
    }, [])

    const operation = [{
        title: '操作',
        render: (item) => {
            return <Space>
                {/* 删除 */}
                <Popconfirm
                    title="确定删除该权限吗？"
                    onConfirm={() => handleConfirm({ item, getRights })}
                    onCancel={() => handleCancel(item)}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button danger shape="circle" icon={<DeleteOutlined />} />
                </Popconfirm>
                {/* 编辑 */}
                <Popover
                    content={<Switch checked={item.pagepermisson} disabled={item.pagepermisson === undefined} onChange={() => handleChangeSwitch(item)} />}
                    title="页面配置项"
                    trigger="click"
                >
                    <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson === undefined} />
                </Popover>
            </Space>
        }
    }]
    return (
        <Table
            dataSource={dataSource}
            columns={columns.concat(operation)}
            pagination={{
                pageSize: 5
            }} />
    )
}
