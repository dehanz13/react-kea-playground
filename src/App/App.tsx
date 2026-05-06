import React from 'react'
import './App.scss'
import { Header } from './Header/Header'
import { Simple } from './Simple/Simple'
import { LoginForm } from './LoginForm/LoginForm'
import { actions, kea, path, reducers, useValues } from 'kea'
import type { sceneLogicType } from './AppType'

export enum Scene {
  LoginForm = 'LoginForm',
  Simple = 'Simple',
}

const scenes: Record<Scene, () => JSX.Element> = {
  [Scene.LoginForm]: () => <LoginForm />,
  [Scene.Simple]: () => <Simple />,
}

export const sceneLogic = kea<sceneLogicType>([
  path(['App', 'App']),
  actions({
    // using actions that has a payload.
    setScene: (scene: Scene) => ({ scene }), // this setScene is gonna take the scene as an argument and return an object with the scene, this is how you define actions with payloads in kea, it is a function that takes an argument and returns an object that has key scene.
  }),
  reducers({
    scene: [
      Scene.LoginForm as Scene,
      {
        setScene: (_, { scene }) => scene,
      },
    ],
  }),
])

export function App() {
  const { scene } = useValues(sceneLogic)
  console.log('Current scene:', scene)
  return (
    < div className="App" >
      <Header />
      <div className="App-layout">
        <Simple />
        <LoginForm />
      </div>
    </div >
  )
}
