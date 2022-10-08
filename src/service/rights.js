import axios from 'axios'

// 获取侧边栏
export function getSideMenu () {
    return axios.get('http://localhost:5000/rights?_embed=children')
}
// 获取权限列表
export function getRightLists () {
    return axios.get('http://localhost:5000/rights')
}

// 删除权限列表:grade=1
export function deleteRight (data) {
    return axios.delete(`http://localhost:5000/rights/${data.id}`)
}
// 删除权限列表:grade=2
export function deleteChildren (data) {
    return axios.delete(`http://localhost:5000/children/${data.id}`)
}
// 编辑权限:grade=1
export function patchRight (data) {
    return axios.patch(`http://localhost:5000/rights/${data.id}`, { pagepermisson: data.pagepermisson })
}
// 编辑权限:grade=2
export function patchChildren (data) {
    return axios.patch(`http://localhost:5000/children/${data.id}`, { pagepermisson: data.pagepermisson })
}