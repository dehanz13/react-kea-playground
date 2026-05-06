import React from 'react'
import './App.scss'
import { Header } from './Header/Header'
import { DemoForm } from './DemoForm/DemoForm'
import { Simple } from './Simple/Simple'

export function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-layout">
        <Simple />
      </div>
    </div>
  )
}
