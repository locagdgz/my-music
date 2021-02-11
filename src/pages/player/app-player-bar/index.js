import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import React, { memo, useEffect, useRef, useState, useCallback } from 'react'

import {
    getSizeImage,
    formatMinuteSecond,
    getPlaySong
} from '@/utils/format-utils'
import 
    {changeSequenceAction, 
    getSongDetailAction,
    changeCurrentIndexAndSong,
    changeCurrentLyricIndexAction,
} from '../store/actionCreators'

import {Slider, message} from 'antd'
import {NavLink} from 'react-router-dom'
import {
    LocaPlaybarWrapper,
    Control,
    PlayInfo,
    Operator
} from './style'


export default memo(function LocaAppPlayerBar() {
    const [currentTime, setCurrentTime] = useState(0)
    const [showCurrentTime, setShowCurrentTime] = useState("00:00")
    const [isPlaying, setIsPlaying] = useState(false)
    const [playCount, setPlayCount] = useState(0)
    //const [isChanging, setIsChanging] = useState(false)

    const {
        currentSong, 
        sequence, 
        playList,
        currentLyricList,
        currentLyricIndex
    } = useSelector(state => ({
        currentSong: state.getIn(["player", "currentSong"]),
        sequence: state.getIn(["player", "sequence"]),
        playList: state.getIn(["player", "playList"]),
        currentLyricList: state.getIn(["player", "currentLyricList"]),
        currentLyricIndex: state.getIn(["player", "currentLyricIndex"]),
    }), shallowEqual)

    const dispatch = useDispatch()
    const audioRef = useRef()

    useEffect(() => {
        dispatch(getSongDetailAction(167876))
        localStorage.setItem("isChanging", false)
    }, [dispatch])

    useEffect(()=> {
        audioRef.current.src = getPlaySong(currentSong.id)
        if (playCount > 0 || playList.length > 1) {
            setPlayCount(1)
            if (audioRef.current.paused) {
                audioRef.current.play().then(res => {
                    setIsPlaying(true)
                }).catch(err => {
                    setIsPlaying(false)
                })
            }
        }
    }, [currentSong, playCount, playList])

    let picUrl = (currentSong.al && currentSong.al.picUrl) || ""
    let singerName = (currentSong.ar && currentSong.ar[0].name) || "未知"
    let duration = currentSong.dt || 0
    let showDuration = formatMinuteSecond(duration)
    // const showCurrentTime = formatMinuteSecond(currentTime)

    const playMusic = useCallback(() => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play()
        setIsPlaying(!isPlaying)
        setPlayCount(1)
    },[isPlaying])

    const timeUpdate = e => {
        // const currentTime = e.target.currentTime
        const eCurrentTime = e.target.currentTime * 1000
        const isChanging = localStorage.getItem("isChanging")
        if (isChanging === 'false') {
            setCurrentTime(e.target.currentTime * 1000)
            setShowCurrentTime(formatMinuteSecond(currentTime))
        }

        // 获取当前的歌词
        let i = 0
        for (; i < currentLyricList.length; i ++) {
            let lyricItem = currentLyricList[i]
            if (eCurrentTime < lyricItem.t) {
                break
            }
        }
        i = i - 1 < 0 ? 0 : i - 1
        if (i !== currentLyricIndex) {
            const content = currentLyricList[i] && currentLyricList[i].l
            message.open({
                key: "lyric",
                content,
                duration: 0,
                className: "lyric-class"
            })
            dispatch(changeCurrentLyricIndexAction(i))
        }
    }

    const handleMusicEnded = e => {
        if (sequence === 2) {
            // 单曲循环
            setCurrentTime(0)
            setShowCurrentTime("00:00")
            audioRef.current.currentTime = 0
            audioRef.current.play()
        } else {
            changeMusic(1)
        }
    }

    const sliderChange = useCallback((value)=> {
        const isChanging = localStorage.getItem("isChanging")
        if (isChanging === 'false') {
            // setIsChanging(true)
            localStorage.setItem("isChanging", true)
        }
        
        setCurrentTime(value)
        setShowCurrentTime(formatMinuteSecond(currentTime))
    },[currentTime])

    const sliderAfterChange = useCallback((value)=> {
        setCurrentTime(value)
        audioRef.current.currentTime = value / 1000
        // setIsChanging(false)
        localStorage.setItem("isChanging", false)
        /* audioRef.current.play()
        setIsPlaying(true) */
        if (!isPlaying) {
            playMusic()
        }
    },[isPlaying, playMusic])

    const changeSequence = e => {
        if (sequence === 2) {
            dispatch(changeSequenceAction(0))
        } else {
            dispatch(changeSequenceAction(sequence + 1))
        }
    }

    const changeMusic = tag => {
        dispatch(changeCurrentIndexAndSong(tag))
        setCurrentTime(0)
        setShowCurrentTime("00:00")
        localStorage.setItem("isChanging", false)

        if (playCount > 0 && !isPlaying) {
            setIsPlaying(true)
            audioRef.current.play()
            audioRef.current.currentTime = 0
        }
    }

    return (
        <LocaPlaybarWrapper className="sprite_player">
            <div className="content wrap-v2">
                <Control isPlaying={isPlaying}>
                    <button className="prev sprite_player" 
                        onClick={e => changeMusic(-1)}></button>
                    <button className="play sprite_player"
                        onClick={e => playMusic()}></button>
                    <button className="next sprite_player"
                        onClick={e => changeMusic(1)}></button>
                </Control>
                <PlayInfo>
                    <div className="image">
                        <NavLink to={"/discover/player"}>
                            <img src={getSizeImage(picUrl, 35)} alt=""/>
                        </NavLink>
                    </div>
                    <div className="info">
                        <div className="song">
                            <span className="song-name">{currentSong.name}</span>
                            <a href="TODO" className="singer-name">{singerName}</a>
                        </div>
                        <div className="progress">
                            <Slider 
                                defaultValue={30} 
                                disabled={false} 
                                tooltipVisible={false}
                                max={duration}
                                min={0}
                                value={currentTime}
                                onAfterChange={value => sliderAfterChange(value)}
                                onChange={value => sliderChange(value)}/>
                            <div className="time">
                                <span className="now-time">{showCurrentTime}</span>
                                <span className="divider">/</span>
                                <span className="duration">{showDuration}</span>
                            </div>
                        </div>
                    </div>
                </PlayInfo>
                <Operator sequence={sequence}>
                    <div className="left">
                        <button className="sprite_player btn favor"></button>
                        <button className="sprite_player btn share"></button>
                    </div>
                    <div className="right sprite_player">
                        <button className="sprite_player btn volume"></button>
                        <button className="sprite_player btn loop" onClick={e => changeSequence()}></button>
                        <button className="sprite_player btn playlist"></button>
                    </div>
                </Operator>
            </div>
            <audio ref={audioRef} onTimeUpdate={e => timeUpdate(e)} onEnded={e => handleMusicEnded(e)}/>
        </LocaPlaybarWrapper>
    )
})
