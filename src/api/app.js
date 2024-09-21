import request from '@/utils/request'

export default{
    getRecommendationsApi(){
        return request({
            url:'/app/recommendations',
            method:'GET',
            params:data
        })
    },
    getSearchSuggestionsApi(keyword){
        return null//AJAX请求更新，待完成
    }
}