import React, { memo, useEffect, useRef } from 'react'

import {Carousel} from 'antd'
import LocaThemeHeaderRCM from '@/components/theme-header-rcm'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import {getNewAlbumsAction} from '../../store/actionCreators'

import {
    LocaNewAlbumWrapper
} from './style'
import LocaAlbumCover from '@/components/album-cover'

export default memo(function LocaNewAlbum() {

    const dispatch = useDispatch()

    const carouselRef = useRef()

    const {newAlbums} = useSelector(state => ({
        newAlbums: state.getIn(["recommend", "newAlbums"])
    }), shallowEqual)

    useEffect(() => {
        dispatch(getNewAlbumsAction())
    }, [dispatch])

    return (
        <LocaNewAlbumWrapper>
            <LocaThemeHeaderRCM title="新碟上架" />
            <div className="content">
                <div className="arrow arrow-left sprite_02" 
                    onClick={e => carouselRef.current.prev()}></div>
                <div className="album">
                    <Carousel ref={carouselRef} dots={false}>
                        {
                            [0 , 1].map(item => {
                                return (
                                    <div key={item} className="page">
                                        {
                                            newAlbums.slice(item * 5, (item + 1) * 5).map((iten,index)=> {
                                                return (
                                                    <LocaAlbumCover key={iten.id} 
                                                        info={iten} size={100} width={118} bgp={-570}/>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })

                        }
                    </Carousel>
                </div>
                <div className="arrow arrow-right sprite_02" 
                    onClick={e => carouselRef.current.next()}></div>
            </div>
        </LocaNewAlbumWrapper>
    )
})
