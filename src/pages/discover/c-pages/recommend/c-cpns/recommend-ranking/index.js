import React, { memo, useEffect } from 'react'

import {useDispatch, useSelector} from 'react-redux'

import LocaThemeHeaderRCM from '@/components/theme-header-rcm'
import {LocaRankingWrapper} from './style'
import LocaTopRanking from '@/components/top-ranking'

import { getTopRankingAction } from '../../store/actionCreators'


export default memo(function LocaRecommendRanking() {

    const {upRanking, newRanking, originRanking} = useSelector(state => ({
        upRanking: state.getIn(["recommend", "upRanking"]),
        newRanking: state.getIn(["recommend", "newRanking"]),
        originRanking: state.getIn(["recommend", "originRanking"]),
    }))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTopRankingAction(0))
        dispatch(getTopRankingAction(2))
        dispatch(getTopRankingAction(3))
    }, [dispatch])

    return (
        <div>
            <LocaThemeHeaderRCM title="榜单"/>
            <LocaRankingWrapper>
                <div className="tops">
                    <LocaTopRanking info={upRanking}/>
                    <LocaTopRanking info={newRanking}/>
                    <LocaTopRanking info={originRanking}/>
                </div>
            </LocaRankingWrapper>
        </div>
    )
})
