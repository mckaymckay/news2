import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SideMenu from '../../components/newssandbox/SideMenu'
import TopHeader from '../../components/newssandbox/TopHeader'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NoPermission from './nopermission/NoPermission'
// css
// import './csses/'
import './NewsSandBox.css'
// antd
import { Layout } from 'antd'
const { Content } = Layout;
const arr = [

]

export default function NewsSandBox () {
    const [title, setTitle] = useState('')
    const handleChangeTitle = (e) => {
        setTitle(e)
    }
    return (
        <Layout>
            <SideMenu changetitle={handleChangeTitle}></SideMenu>
            <Layout>
                <TopHeader title={title}></TopHeader>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {/* 二级路由,路径切换 */}
                    <Switch>
                        <Route path="/home" component={Home}></Route>
                        <Route path="/user-manage/list" component={UserList}></Route>
                        <Route path="/right-manage/role/list" component={RoleList}></Route>
                        <Route path="/right-manage/right/list" component={RightList}></Route>
                        <Redirect from='/' to='/home' exact></Redirect>
                        <Route path='*' component={NoPermission}></Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    )
}
