import React from 'react'
import './App.scss'
import { Header } from './Header/Header'
import { Simple } from './Simple/Simple'
import { LoginForm } from './LoginForm/LoginForm'

export function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-layout">
        <Simple />
        <LoginForm />
      </div>
    </div>
  )
}
