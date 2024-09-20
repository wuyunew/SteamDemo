import request from '../utils/request'


export default{
    loginApi(data) {
        return request({
            url: '/user/login',
            method: 'POST',
            data
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



