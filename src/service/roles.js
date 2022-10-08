import axios from 'axios'

// 获取角色
export function getRoles () {
    return axios.get('http://localhost:5000/roles')
}