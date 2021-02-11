import React from 'react'
import { Redirect } from 'react-router-dom'

const LocaDiscover = React.lazy(_=> import('@/pages/discover'))
const LocaRecommend = React.lazy(_=> import('@/pages/discover/c-pages/recommend'))
const LocaSongs = React.lazy(_=> import('@/pages/discover/c-pages/songs'))
const LocaAlbum = React.lazy(_=> import('@/pages/discover/c-pages/album'))
const LocaRanking = React.lazy(_=> import('@/pages/discover/c-pages/ranking'))
const LocaDjradio = React.lazy(_=> import('@/pages/discover/c-pages/djradio'))
const LocaArtis = React.lazy(_=> import('@/pages/discover/c-pages/artist'))
const LocaPlayer = React.lazy(_=> import('@/pages/player'))

const LocaMine = React.lazy(_=> import('@/pages/mine'))
const LocaFriend = React.lazy(_=> import('@/pages/friend'))

const routes = [
    {
        path: "/",
        exact: true,
        render: () => (
            <Redirect to="/discover"/>
        )
    },
    {
        path: "/discover",
        component: LocaDiscover,
        routes: [
            {
                path: "/discover",
                exact: true,
                render: ()=> (
                    <Redirect to="/discover/recommend"/>
                )
            },
            {
                path: "/discover/recommend",
                component: LocaRecommend
            },
            {
                path: "/discover/songs",
                component: LocaSongs
            },
            {
                path: "/discover/album",
                component: LocaAlbum
            },
            {
                path: "/discover/ranking",
                component: LocaRanking
            },
            {
                path: "/discover/djradio",
                component: LocaDjradio
            },
            {
                path: "/discover/artist",
                component: LocaArtis
            },
            {
                path: "/discover/player",
                component: LocaPlayer
            },
        ]
    },
    {
        path: "/mine",
        component: LocaMine
    },
    {
        path: "/friend",
        component: LocaFriend
    },
]

export default routes