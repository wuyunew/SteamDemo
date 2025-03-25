import request from '@/utils/request'
//公共部分api，不需要token登录验证
export const 
getRecommendationsApi = () => {
    //轮播图中的推荐游戏
    return request({
        url: '/app/recommendations',
        method: 'GET',
    });
};

export const getSearchSuggestionsApi = (data) => {
    //ajax获取搜索提示
    return request({
        url:'/app/searchSuggestions',
        method:'GET',
        params:{matchName:data}
    })
};

export const getGameListApi=()=>{
    //返回的对象有5种属性newAndHot(新品与热门),hot（热销）,recent（热门即将推出）,off（优惠）,free（热门免费游戏），每种属性的值都是游戏数组，数组包含内容和前面的API相同
    return request({
        url:'/app/gameList',
        method:'GET',
    })
}

export const getGameDetailApi=(gameName)=>{
    //获取游戏的详细信息，载入游戏界面时调用
    return request({
        url:'/app/gameDetail',
        method:'GET',
        params:{gameName:gameName}
    })
}