import React from 'react'
import './App.scss'
import { Header } from './Header/Header'
import { Simple } from './Simple/Simple'
import { LoginForm } from './LoginForm/LoginForm'
import { actions, kea, path, reducers, selectors, useActions, useValues } from 'kea'
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
  selectors({
    Component: [(s) => [s.scene], (scene: Scene) => scenes[scene]], // this is a selector that takes the scene from the state and returns the corresponding component from the scenes object, selectors are used to derive data from the state, they are functions that take the state as an argument and return some derived data, they are useful to avoid repeating logic in your components, they are also memoized, which means that they will only recompute when the input changes, this is useful for performance optimization.
  }),
])

function Menu() {
  const { scene } = useValues(sceneLogic)
  const { setScene } = useActions(sceneLogic)
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      {Object.keys(scenes).map((s) => (
        <button key={s} onClick={() => setScene(s as Scene)} style={{ fontWeight: s === scene ? 'bold' : '' }}>
          {s}
        </button>
      ))}
    </div>
  )
}

export function App() {
  const { Component } = useValues(sceneLogic)
  // const Component = scenes[scene]
  // console.log('Current scene:', scene)
  return (
    < div className="App" >
      <Header />
      <Menu />
      <div className="App-layout">
        <Component />
      </div>
    </div >
  )
}
