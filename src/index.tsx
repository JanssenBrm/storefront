import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { ConfigProvider } from '@apisuite/fe-base'

import { API_URL } from './constants/endpoints'
import { createBrowserHistory } from 'history'
import App from './App'
import ErrorMonitor from './components/ErrorMonitor'
import translations from './translations'

export const history = createBrowserHistory()

const render = (Component: React.ElementType) => {
  ReactDOM.render(
    <ErrorMonitor>
      {/* <Provider store={store}> */}
      <Router history={history}>
        <ConfigProvider api={{ base: API_URL }} translations={translations}>
          <Component />
        </ConfigProvider>
      </Router>
      {/* </Provider> */}
    </ErrorMonitor>,
    document.getElementById('root')
  )
}

render(App)
