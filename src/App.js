import React, { memo, Suspense } from 'react'
import {Provider} from 'react-redux'
import {renderRoutes} from 'react-router-config'
import {HashRouter} from 'react-router-dom'

import LocaAppHeader from 'components/app-header'
import LocaAppFooter from 'components/app-footer'
import LocaAppPlayerBar from './pages/player/app-player-bar'


import routes from './router'
import store from './store'

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <LocaAppHeader/>
        <Suspense fallback={<div>Page Loading</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <LocaAppFooter/>
        <LocaAppPlayerBar/>
      </HashRouter>
    </Provider>
  )
})
