import axios from 'axios'

// 获取角色
export function getRolesLists () {
    return axios.get('http://localhost:5000/roles')
}

// 删除角色列表
export function deleteRoles (data) {
    return axios.delete(`http://localhost:5000/roles/${data.id}`)
}
// 修改角色列表
export function updateRoles (data) {
    return axios.patch(`http://localhost:5000/roles/${data.id}`, { rights: data.checkedKeys })
}