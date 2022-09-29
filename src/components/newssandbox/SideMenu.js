import {
    UserOutlined,
    DesktopOutlined,
    PieChartOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getSideMenu } from '../../service/sidemenu'
const { Sider } = Layout;

// const menu = [
//     {
//         label: '首页',
//         key: '/home',
//         icon: <PieChartOutlined />,
//     },
//     {
//         label: '用户管理',
//         key: '/user-manage',
//         icon: <TeamOutlined />,
//         children: [{
//             label: '用户列表',
//             key: '/user-manage/list',
//             icon: <UserOutlined />,
//         }]
//     },
//     {
//         label: '权限管理',
//         key: '/right-manage',
//         icon: < DesktopOutlined />,
//         children: [{
//             label: '角色列表',
//             key: '/right-manage/role/list',
//         }, {
//             label: '权限列表',
//             key: '/user-manage/right/list',
//         }]
//     }
// ]

function SideMenu (props) {
    const [collapsed] = useState(false);
    const [menu, setMenu] = useState([])
    useEffect(() => {
        getSideMenu().then(res => {
            console.log(40, res.data)
            setMenu(res.data)
        })
    }, [])
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo title">新闻管理</div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/home']}
            >
                {menu.map(item => (
                    item.children.length > 0 ?
                        <Menu.SubMenu title={item.title} icon={item.icon} key={item.key}>
                            {item.children.map(subitem => <Menu.Item icon={subitem.icon} key={subitem.key} onClick={() => {
                                console.log(item.key)
                                props.history.push(subitem.key)
                            }}>{subitem.title}</Menu.Item>)}
                        </Menu.SubMenu>
                        : <Menu.Item icon={item.icon} key={item.key} onClick={() => {
                            console.log(item.key)
                            props.history.push(item.key)
                        }}>{item.title}</Menu.Item>))}
            </Menu>
        </Sider>
    )
}
export default withRouter(SideMenu)
