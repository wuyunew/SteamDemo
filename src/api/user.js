
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
    getUserInfoApi() {
        //通过token验证信息，requset中
        return request({
            url: '/user/info',
            method: 'GET',
        })
    }
}



