import React, { memo } from 'react'

// import {getSizeImage} from '@/utils/format-utils'
import {LocaTopRankingWrapper} from './style'

import {getSongDetailAction} from '@/pages/player/store'
import { useDispatch } from 'react-redux'

export default memo(function LocaTopRanking(props) {

    const {info={}} = props
    const {tracks=[]} = info

    const dispatch = useDispatch()

    const playMusic = item => {
        dispatch(getSongDetailAction(item.id))
    }

    return (
        <LocaTopRankingWrapper>
            <div className="header">
                <div className="image">
                    <img src={info.coverImgUrl} alt=""/>
                    <a href="TODO" className="image_cover"> </a>
                </div>
                <div className="info">
                    <a href="TODO">{info.name}</a>
                    <div>
                        <button className="btn play sprite_02"></button>
                        <button className="btn favor sprite_02"></button>
                    </div>
                </div>
            </div>
            <div className="list">
                {
                    tracks.slice(0,10).map((item, index) => {
                        return (
                            <div key={item.id} className="list-item">
                                <div className="rank">{index + 1}</div>
                                <div className="info">
                                    <span className="name text-nowrap">{item.name}</span>
                                    <div className="operate">
                                        <button className="btn play sprite_02" onClick={e => playMusic(item)}></button>
                                        <button className="btn addto sprite_icon2"></button>
                                        <button className="btn favor sprite_02"></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="footer">
                <a href="TODO">查看全部&gt;</a>
            </div>
        </LocaTopRankingWrapper>
    )
})
