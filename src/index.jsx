import { createRoot } from 'react-dom/client'
import React from 'react'
import { useEffect } from 'react'
import { MainView } from './components/main-view/main-view'
import { Provider } from "react-redux";
import { store } from './redux/store';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss'

// Main component (will eventually use all the others)
const MovieApi = () => {

  useEffect(() => {
    document.body.classList.add('background-image');
  }, []);

  return (
    // make the store available to React app
    <Provider store={store}>
      <MainView />
    </Provider>
  )
}

// Finds the root of your app
const container = document.querySelector('#root')
const root = createRoot(container)

// Tells React to render your app in the root DOM element
root.render(<MovieApi />)
