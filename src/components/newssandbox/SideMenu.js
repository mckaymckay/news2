import {
    TeamOutlined,
    HomeOutlined,
    AlignRightOutlined,
    FileImageOutlined,
    HighlightOutlined,
    FileDoneOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getSideMenu } from '../../service/rights'
import '../newssandbox/sidemenu.css'
const { Sider } = Layout;
const iconLists = {
    "/home": <HomeOutlined />,
    "/user-manage": <TeamOutlined />,
    "/right-manage": <AlignRightOutlined />,
    "/news-manage": <FileImageOutlined />,
    "/audit-manage": <HighlightOutlined />,
    "/publish-manage": <FileDoneOutlined />
}
function SideMenu (props) {
    const [collapsed] = useState(false);
    const [menu, setMenu] = useState([])
    const selectKey = [props.location.pathname]
    const openKey = ['/' + props.location.pathname.split('/')[1]]
    useEffect(() => {
        getSideMenu().then(res => {
            setMenu(res.data)
            let title = {}
            res.data.forEach(item => {
                if (item.key === selectKey[0]) {
                    title = item
                }
                if (item.children.length > 0) {
                    item.children.forEach(subitem => {
                        if (subitem.key === selectKey[0]) {
                            title = subitem
                        }
                    })
                }
            })
            props.changetitle(title.title)
        })
    }, [])
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="sider" >
                <div className="logo title">新闻管理</div>
                <div className="sidemenu-bottom">
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={selectKey}
                        defaultOpenKeys={openKey}
                    >
                        {menu.map(item => (
                            item.children.length > 0 ?
                                item.pagepermisson === 1 && <Menu.SubMenu title={item.title} icon={iconLists[item.key]} key={item.key}>
                                    {item.children.map(subitem => subitem.pagepermisson === 1 && <Menu.Item icon={subitem.icon} key={subitem.key} onClick={() => {
                                        props.history.push(subitem.key)
                                        props.changetitle(subitem.title)
                                        console.log(subitem.title)
                                    }}>{subitem.title}</Menu.Item>)}
                                </Menu.SubMenu>
                                : item.pagepermisson === 1 && <Menu.Item icon={iconLists[item.key]} key={item.key} onClick={() => {
                                    console.log(item.title)
                                    props.changetitle(item.title)
                                    props.history.push(item.key)
                                }}>{item.title}</Menu.Item>))}
                    </Menu>
                </div>
            </div>
        </Sider>
    )
}
export default withRouter(SideMenu)
