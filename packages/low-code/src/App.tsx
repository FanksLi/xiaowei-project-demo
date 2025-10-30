// import { useState } from 'react'

import Layout from './editor/Layout'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import './App.css'

function App() {

  return (
    <DndProvider backend={HTML5Backend}>
     <Layout />
    </DndProvider>
  )
}

export default App
