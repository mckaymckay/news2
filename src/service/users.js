import axios from 'axios'

// 获取用户列表
export function getUsersList () {
    return axios.get(`http://localhost:5000/users?_expand=role`)
}

//  获取区域列表
export function getAllRegions () {
    return axios.get(`http://localhost:5000/regions`)
}
// 获取所有角色
export function getAllRoles () {
    return axios.get(`http://localhost:5000/roles`)
}