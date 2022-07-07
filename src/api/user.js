import request from '@/utils/request'
import store from '@/store'
/**
 *获取短信验证码
 *@param {number} mobile
 *@returns  promise
*/
export  const getSmsCode=(mobile)=>{
    return request({
        url:`/sms/codes/${mobile}`
    })
}

/**
 * 登录
 * @param {mobile,code} param0
 * @return promise
*/
export const login=({mobile,code})=>{
   return request({
        method:'POST',
        url:'/authorizations',
        data:{
            mobile,
            code
        }
    })
}

/**
 * 获取用户个人资料
 * @returns
*/
export const getUserInfo=()=>{
    return request({
        url:'user',
        headers:{
            Authorization: 'Bearer ' + store.state.user.token
        }
    })
}


/**
 * 编辑用户个人资料
 * @returns 
 */
export const getUserProfile=()=>{
    return request({
        url:'user/profile'
    })
}

/**
 * 更新用户信息
 * @param {*} profile 
 * @returns 
 */
export const updateUserProfile=(profile)=>{
    return request({
        method:'PATCH',
        url:'user/profile',
        data:profile
    })
}


/**
 * 更新头像
 * @param {裁剪之后的头像数据} data 
 * @returns 
 */
export const updateAvatar=data=>{
    return request({
        method:'PATCH',
        url:'user/photo',
        data
    })
}