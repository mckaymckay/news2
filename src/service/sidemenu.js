import axios from 'axios'

// 获取侧边栏
export function getSideMenu () {
    return axios.get('http://localhost:5000/rights?_embed=children')
}