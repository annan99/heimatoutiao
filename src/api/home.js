import request from '@/utils/request'
export const getMyChannels=()=>{
    return request({
        url:'user/channels'
    })
}

export const getArticleList=({channel_id,timestamp})=>{
    return request({
        url:'articles',
        params:{
            channel_id,timestamp
        }

    })
}

/**
 * 获取所有的频道列表数据
*/
export const getAllArticleList=()=>{
    return request({
        url:'channels'
    })
}

/**
 * 频道数据持久化
 */
export const saveChannels=(channels)=>{
    return request({
        method:'PUT',
        url:'user/channels',
        data:{
            channels
        }
    })
}