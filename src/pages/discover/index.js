import React, { memo } from 'react'
import {NavLink} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

import {
    DiscoverWrapper,
    TopMenu
} from './style'
import {discoverMenu} from '@/common/local-data'

export default memo(function LocaDiscover(props) {
    const {route} = props

    return (
        <div>
            <DiscoverWrapper>
                <div className="top">
                    <TopMenu className="wrap-v1">
                        {
                            discoverMenu.map((item,index) => {
                                return (
                                    <div key={item.title} className="item">
                                        <NavLink to={item.link}>{item.title}</NavLink>
                                    </div>
                                )
                            })
                        }
                    </TopMenu>
                </div>
                {renderRoutes(route.routes)}
            </DiscoverWrapper>
        </div>
    )
})
