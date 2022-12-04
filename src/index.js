import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { applyMiddleware, createStore, compose } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
// import loggerMiddleware from './middleware/logger'
// import monitorReducerEnhancer from './enhancers/monitorReducer'
import App from './App'
import thunk from 'redux-thunk'
// const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)
// const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer)

// const store = createStore(rootReducer, undefined, composedEnhancers)
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)