import request from '@/utils/request'

export const getRecommendationsApi = () => {
    return request({
        url: '/app/recommendations',
        method: 'GET',
    });
};

export const getSearchSuggestionsApi = (data) => {
    //data{keyword:string,num:number} 返回值[{value:string}]
    return request({
        url:'/app/searchSuggestions',
        method:'GET',
        params:data
    })
};

export const getSearchApi=(keyword)=>{
    //返回搜索的url地址
    return request({
        url:'/app/search',
        method:'GET',
    })
}