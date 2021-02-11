import * as actionTypes from './constants'

import {
    getSongDetail,
    getLyric
} from '@/services/player'

import {getRandomNumber} from '@/utils/math-utils'
import {parseLyric} from '@/utils/parse-lyric'

const changeCurrentSongAction = currentSong => ({
    type: actionTypes.CHANGE_CURRENT_SONG,
    currentSong
})

const changePlayListAction = playList => ({
    type: actionTypes.CHANG_PLAY_LIST,
    playList
})

const changeCurrentSongIndexAction = currentSongIndex => ({
    type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
    currentSongIndex
})

export const changeCurrentIndexAndSong = tag => (dispatch, getState) => {
    // 先判断现在的判断模式
    const sequence = getState().getIn(["player", "sequence"])
    let currentSongIndex = getState().getIn(["player", "currentSongIndex"])
    const playList = getState().getIn(["player", "playList"])
    switch (sequence) {
        case 1:
            //随机播放
            let randomIndex = currentSongIndex
            while (randomIndex === currentSongIndex && playList.length > 1) {
                randomIndex = getRandomNumber(playList.length)
            }
            currentSongIndex = randomIndex
            break
        default:
            //顺序播放
            currentSongIndex += tag
            if (currentSongIndex >= playList.length) {
                currentSongIndex = 0
            } else if (currentSongIndex < 0) {
                currentSongIndex = playList.length - 1
            }
    }
    const currentSong = playList[currentSongIndex]
    dispatch(changeCurrentSongIndexAction(currentSongIndex))
    dispatch(changeCurrentSongAction(currentSong))
    dispatch(getLyricAction(currentSong.id))
}

export const changeSequenceAction = sequence => ({
    type: actionTypes.CHANGE_SEQUENCE,
    sequence
})

export const getSongDetailAction = ids => (dispatch, getState) => {
    // 根据id查找playList中是否已经有了这个歌曲
    const playList = getState().getIn(["player", "playList"])
    const songIndex = playList.findIndex(song => song.id === ids)
    let song = null
    // 判断是否找到了歌曲
    if (songIndex !== -1) {
        // 找到了
        dispatch(changeCurrentSongIndexAction(songIndex))
        song = playList[songIndex]
        dispatch(changeCurrentSongAction(song))
        dispatch(getLyricAction(song.id))
    } else {
        // 没有找到
        getSongDetail(ids).then(res => {
            song = res.songs && res.songs[0]
            if (!song) {
                return;
            }
            // 将最新请求到的歌曲添加到播放列表
            const newPlayList = [...playList]
            newPlayList.push(song)
            // 更新redux中的值
            dispatch(changePlayListAction(newPlayList))
            // 更改当前播放的歌曲的索引值
            dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
            dispatch(changeCurrentSongAction(song))
            dispatch(getLyricAction(song.id))
        })
    }
    

}

export const getLyricAction = id => dispatch => {
    getLyric(id).then(res => {
        let lyric = res.lrc.lyric
        const lyricList = parseLyric(lyric)
        dispatch(changeCurrentLyricListAction(lyricList))
    })
}

export const changeCurrentLyricListAction = lyric => ({
    type: actionTypes.CHANGE_CURRENT_LYRIC_LIST,
    lyric
})


export const changeCurrentLyricIndexAction = currentLyricIndex => ({
    type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
    currentLyricIndex
})

export const getPlayListAction = dispatch => {

}

export const getCurrentSontIndexAction = currentSongIndex => dispatch => {

}