/**
 * api接口统一管理
 */

import { get, post } from '../axios'

// 使用方法
export const apiUser = p => get('/api', p)
export const apiUser2 = p => post('/api', p)

export const mockuser = p => get('/api/users', p)
export const mocklogin = p => post('/api/login', p)

// 调用方式

// import { apiUser } from '@/api' // 导入我们的api接口
// export default {
//   methods: {
//     // 获取数据
//     fetchData() {
//       // 调用api接口，并且提供了两个参数
//       apiUser({
//         type: 0,
//         sort: 1
//       }).then(res => {
//         // 获取数据成功后的其他操作
//       }).catch(err=>{})
//     }
//   }
// }
