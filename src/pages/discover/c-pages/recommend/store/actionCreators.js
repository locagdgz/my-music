import * as actionTypes from './constants'

import {
    getTopBanners,
    getHotRecommends,
    getNewAlbums,
    getTopRanking
} from '@/services/recommend'

const changeTopBannerAction = res => ({
    type: actionTypes.CHANGE_TOP_BANNERS,
    topBanners: res.banners
})
const changeHotRecommendsAction = res => ({
    type: actionTypes.CHANGE_HOT_RECOMMENDS,
    hotRecommends: res.result
})
const changeNewAlbumsAction = res => ({
    type: actionTypes.CHANGE_NEW_ALBUM,
    newAlbums: res.albums
})
const changeOriginRankingAction = res => ({
    type: actionTypes.CHANGE_ORIGIN_RANKING,
    originRanking: res.playlist
})
const changeNewRankingAction = res => ({
    type: actionTypes.CHANGE_NEW_RANKING,
    newRanking: res.playlist
})
const changeUpRankingAction = res => ({
    type: actionTypes.CHANGE_UP_RANKING,
    upRanking: res.playlist
})


export const getTopBannersAction = () => dispatch => {
    getTopBanners().then(res => {
        dispatch(changeTopBannerAction(res))
    })
}

export const getHotRecommendsAction = (limit = 8) => dispatch => {
    getHotRecommends(limit).then(res => {
        dispatch(changeHotRecommendsAction(res))
    })
}

export const getNewAlbumsAction = (limit = 10) => dispatch => {
    getNewAlbums(limit).then(res => {
        dispatch(changeNewAlbumsAction(res))
    })
}

export const getTopRankingAction = idx => dispatch => {
    getTopRanking(idx).then(res => {
        switch (idx) {
            case 0 : 
                dispatch(changeUpRankingAction(res))
                break
            case 2 :
                dispatch(changeNewRankingAction(res))
                break
            case 3 :
                dispatch(changeOriginRankingAction(res))
                break
            default :
                return
        }
    })
}