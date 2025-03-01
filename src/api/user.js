
import request from '../utils/request'


const loginApi = (data) => {
    return request({
        url: '/user/login',
        method: 'POST',
        params: data
    })
}
const getUserInfoApi = () => {
    return request({
        url: '/user/info',
        method: 'GET'
    })
}


export {
    loginApi,
    getUserInfoApi
}


