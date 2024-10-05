
import request from '../utils/request'


export default{
    loginApi(data) {
        return request({
            url: '/user/login',
            method: 'POST',
            //quary传参
            params:data
            //如果是body传参直接data
        })
    },
    getUserInfoApi(userId) {
        return request({
            url: '/user/info',
            method: 'GET',
            params: { userId }
        })
    }
}



