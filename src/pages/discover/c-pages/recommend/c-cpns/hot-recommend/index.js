import React, { memo, useEffect } from 'react'

import {HotRecommendWrapper} from './style'
import SongsCover from '@/components/songs-cover'

import LocaThemeHeaderRCM from '@/components/theme-header-rcm'

import {hotRecommendKeyWords} from '@/common/local-data'
import { useDispatch, useSelector,shallowEqual } from 'react-redux'

import { getHotRecommendsAction } from '../../store/actionCreators'

export default memo(function LocaHotRecommend() {


    const dispatch = useDispatch()

    const {hotRecommends} = useSelector(state => ({
        hotRecommends: state.getIn(["recommend", "hotRecommends"])
    }), shallowEqual)

    useEffect(() => {
        dispatch(getHotRecommendsAction())
    }, [dispatch])

    return (
        <HotRecommendWrapper>
            <LocaThemeHeaderRCM title="热门推荐" keywords={hotRecommendKeyWords} />
            <div className="recommend-list">
                {
                    hotRecommends.map((item, index) => {
                        return (
                            <SongsCover showSource={true} info={hotRecommends[index]} key={item.picUrl}>
                                {item.name}
                            </SongsCover>
                        )
                    })
                }
            </div>
        </HotRecommendWrapper>
    )
})
