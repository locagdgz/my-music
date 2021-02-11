import React, { memo } from 'react'

import LocaTopBanner from './c-cpns/top-banner'

import {
    RecommendWrapper,
    Content,
    RecommendLeft,
    RecommendRight
} from './style'

import LocaHotRecommend from './c-cpns/hot-recommend'
import LocaNewAlbum from './c-cpns/new-album'
import LocaRecommendRanking from './c-cpns/recommend-ranking'
import LocaSettleSinger from './c-cpns/settle-singer'
import LocaUserLogin from './c-cpns/user-login'
import LocaHotAnchor from './c-cpns/hot-anchor'


function LocaRecommend(props) {


    return (
        <RecommendWrapper>
            <LocaTopBanner></LocaTopBanner>
            <Content className="wrap-v2">
                <RecommendLeft>
                    <LocaHotRecommend></LocaHotRecommend>
                    <LocaNewAlbum></LocaNewAlbum>
                    <LocaRecommendRanking></LocaRecommendRanking>
                </RecommendLeft>
                <RecommendRight>
                    <LocaUserLogin/>
                    <LocaSettleSinger/>
                    <LocaHotAnchor/>
                </RecommendRight>
            </Content>
        </RecommendWrapper>
    )
}

export default memo(LocaRecommend)


// import React, { memo, useEffect } from 'react'
// import {connect} from 'react-redux'

// import {getTopBannersAction} from './store/actionCreators'

// function LocaRecommend(props) {
//     const {getBanners, topBanners} = props
//     // 发起网络请求
//     useEffect(() => {
//         getBanners()
//     }, [getBanners])

//     return (
//         <div>
//             <h2>LocaRecommend: {topBanners.length}</h2>
//         </div>
//     )
// }

// const mapStateToProps = state => ({
//     topBanners: state.recommend.topBanners
// })

// const mapDispatchToProps = dispatch => ({
//     getBanners: () => {
//         dispatch(getTopBannersAction())
//     }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(memo(LocaRecommend))
