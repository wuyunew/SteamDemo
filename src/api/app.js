import request from '@/utils/request'

export const getRecommendationsApi = () => {
    return request({
        url: '/app/recommendations',
        method: 'GET',
    });
};

export const getSearchSuggestionsApi = (keyword) => {
    return null; // AJAX请求更新，待完成
};