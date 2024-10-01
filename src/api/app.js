import request from '@/utils/request'

export const getRecommendationsApi = () => {
    //轮播图中的推荐游戏
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
export const getGameListApi=()=>{
    //返回的对象有5种属性newAndHot(新品与热门),hot（热销）,recent（热门即将推出）,off（优惠）,free（热门免费游戏），每种属性的值都是游戏数组，数组包含内容和前面的API相同
    return request({
        url:'/app/gamelist',
        method:'GET',
        params:kind
    })

}