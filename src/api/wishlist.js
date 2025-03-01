import request from '../utils/request'


export const getWishlistApi = () => {
    return request({
        url: '/wishlist',
        method: 'GET',
    });
};

export const removeFromWishlistApi = (appId) => {
    return ({
        url: '/wishlist',
        method: 'DELETE',
        params: { appId }
    })
}