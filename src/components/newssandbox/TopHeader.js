import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    // UserOutlined
} from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';
const { Header, Dropdown, Menu, Space } = Layout;

const menu = () => {
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        1st menu item
                    </a>
                ),
            },
            {
                key: '2',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                        2nd menu item
                    </a>
                ),
            },
            {
                key: '3',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                        3rd menu item
                    </a>
                ),
            },
        ]}
    />
}


export default function TopHeader (props) {
    const [collapsed, setCollapsed] = useState(false);
    function handleFold () {
        setCollapsed(!collapsed)
    }
    return (
        <Header
            className="site-layout-background"
            style={{
                padding: '0 16px',
            }}
        >
            {
                collapsed ? <MenuUnfoldOutlined onClick={() =>
                    handleFold()
                }></MenuUnfoldOutlined> : <MenuFoldOutlined onClick={() =>
                    handleFold()
                } ></MenuFoldOutlined>
            }
            <span className='shouye-ziti'>{props.title || '首页'}</span>
            <div className='welcome'>
                <span className='shouye-ziti welcome-back'>欢迎Admin回来</span>
                {/* <Dropdown overlay={menu}>
                    Hover me
                </Dropdown> */}

            </div>

        </Header>
    )
}
