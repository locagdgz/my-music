import React, { memo, useEffect, useRef, useCallback, useState } from 'react'
import {useDispatch, useSelector, shallowEqual} from 'react-redux'

import {getTopBannersAction} from '../../store/actionCreators'

import {
    BannerWrapper,
    BannerControl,
    BannerLeft,
    BannerRight
} from './style'

import { Carousel } from 'antd';

export default memo(function LocaTopBanner() {

    const [currentIndex, setCurrentIndex] = useState(0)

    const {topBanners} = useSelector(state => ({
        // topBanners: state.get("recommend").get("topBanners")
        topBanners: state.getIn(["recommend", "topBanners"])
    }), shallowEqual)

    const dispatch = useDispatch()
    const bannerRef = useRef()

    // 发起网络请求
    useEffect(() => {
        dispatch(getTopBannersAction())
    }, [dispatch])


    const bannerChange = useCallback((from, to) => {
        setCurrentIndex(to)
    },[])

    const str = '?imageView&blur=40x20'
    return (
        <BannerWrapper bgImage={topBanners[currentIndex] && topBanners[currentIndex].imageUrl + str}>
            <div className="banner wrap-v2">
                <BannerLeft>
                    <Carousel effect="fade" autoplay={true} ref={bannerRef} beforeChange={bannerChange}>
                        {
                            topBanners.map((item,index) => {
                                return (
                                    <div className="banner-item" key={item.imageUrl || index}>
                                        <img src={item.imageUrl} className="image" alt={item.typeTitle}/>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </BannerLeft>
                <BannerRight></BannerRight>
                <BannerControl>
                    <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
                    <button className="btn right" onClick={e => bannerRef.current.next()}></button>
                </BannerControl>
            </div>
        </BannerWrapper>
    )
})
