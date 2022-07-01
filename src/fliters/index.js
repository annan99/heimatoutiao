import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')    //配置中文
dayjs.extend(relativeTime)
/**
 * 把时间变成相对时间
 * @param {*} time 
 * @returns 
 */
// 过滤器
export const dateformat=(time)=>{
    return dayjs(time).fromNow()
}