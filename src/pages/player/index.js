import React, { memo } from 'react'

import {
    PlayerWrapper,
    PlayerLeft,
    PlayerRight
} from './style'

export default memo(function LocaPlayer() {
    return (
        <PlayerWrapper>
            <div className="content wrap-v2">
                <PlayerLeft>
                    <h2>LocaPlayerInfo</h2>
                    <h2>LocaSongContent</h2>
                </PlayerLeft>
                <PlayerRight>
                    <h2>LocaSimiPlaylist</h2>
                    /simi/playlist?id
                    <h2>LocaSimiSong</h2>
                    /simi/song?id
                    <h2>Download</h2>
                </PlayerRight>
            </div>
        </PlayerWrapper>
    )
})
