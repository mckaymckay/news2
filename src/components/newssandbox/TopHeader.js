import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    // UserOutlined
} from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';
const { Header } = Layout;




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
