import axios from "axios";
import { ElMessage } from "element-plus";
import configs from '../configs/index'
import { useSteamStore } from "@/stores/SteamStore";
const NETWORK_ERROR = '网络错误...';
//创建一个axios实例，可以调用get post等方法
const service = axios.create({
    baseURL: configs.baseApi,
    //baseURL在config中查看
    timeout: 5000
});
service.interceptors.request.use(
    function (config) {
        // 在发送请求之前做将token添加到请求头
        const store = useSteamStore();
        const token = store.getToken()
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config

    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        const { status, data } = response
        if (status === 200) {
            return data

        } else {
            console.log(response)
            if (status === 401) {
                ElMessage.error('登录过期，请重新登录');
                const store=useSteamStore();
                store.logout();
            } else {
                ElMessage.error(msg || NETWORK_ERROR)
            }
            return Promise.reject(data)

        }
    }
);

function request(options) {
    let isMock = configs.mock;
    service.defaults.baseURL = isMock ? configs.mockApi : configs.baseApi;
    return service(options)
}
export default request;
