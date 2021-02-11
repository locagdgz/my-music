import React, { memo } from 'react'

import {getSizeImage} from '@/utils/format-utils'

import {LocaAlbumWrapper} from './style'

export default memo(function LocaAlbumCover(props) {
    const {info, size = 130, width = 153, bgp = -845} = props
    return (
        <LocaAlbumWrapper size={size + "px"} width={width + "px"} bgp={ bgp + "px"}>
            <div className="album-image">
                <img src={getSizeImage(info.picUrl, size)} alt=""/>
                <a className="cover image_cover" href="TODO"> </a>
            </div>
            <div className="album-info">
                <div className="name text-nowrap">{info.name}</div>
                <div className="artist text-nowrap">{info.artist.name}</div>
            </div>
        </LocaAlbumWrapper>
    )
})
