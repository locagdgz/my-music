import React, { memo } from 'react'

import propTypes from 'prop-types'

import {HeaderWrapper} from './style'

const LocaThemeHeaderRCM = memo(props => {
    // const {title, keywords = []} = props;
    const {title, keywords} = props;
    return (
        <HeaderWrapper className="sprite_02">
            <div className="left">
                <h3 className="title">{title}</h3>
                <div className="keyword">
                    {
                        keywords.map((item, index) => {
                            return (
                                <div className="item" key={item}>
                                    <a href="TODO">{item}</a>
                                    <span className="divider">|</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="right">
                <a href="TODO">更多</a>
                <i className="icon sprite_02"></i>
            </div>
        </HeaderWrapper>
    )
})

LocaThemeHeaderRCM.propTypes = {
    title: propTypes.string.isRequired,
    keywords: propTypes.array
}

LocaThemeHeaderRCM.defaultProps = {
    keywords: []
}

export default LocaThemeHeaderRCM