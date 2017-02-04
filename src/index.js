import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App'
import RegisterClaim from './RegisterClaim'
import ListClaims from './ListClaims'
import RiskReport from './RiskReport'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={RegisterClaim}/>
      <Route path="/claims" component={ListClaims}/>
      <Route path="/riskreport" component={RiskReport}/>
    </Route>
  </Router>,
  document.getElementById('root')
)
