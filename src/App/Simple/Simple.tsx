import { actions, afterMount, beforeUnmount, kea, listeners, path, reducers, useActions, useValues } from 'kea'
import React from 'react'
import type { simpleLogicType } from './SimpleType'

export const simpleLogic = kea<simpleLogicType>([
    path(['App', 'Simple', 'Simple']),
    actions({
        increment: true,
        decrement: true
    }),
    // reducers are the most important part of a logic, 
    // they define how the state changes in response to actions (the place where you store your values, define your state and how it changes in response to actions, they are the core of your logic)
    reducers({
        counter: [
            0,
            {
                increment: (state) => state + 1,
                decrement: (state) => state - 1
            },
        ],
    }),
    // adding side effects to your logic is done with listeners, they are functions that run in response to actions, they are used to perform side effects (like making API calls, logging, etc)
    // In listeners, you can pass in an object describing the props you want or a function.
    listeners({
        increment: async (_, breakpoint) => {
            console.log('Incrementing counter')
            await breakpoint(1000) // this is a way to cancel the listener if the action is dispatched again within 1 second, it is useful to prevent multiple API calls, etc
            console.log('waited a second')
        },
        decrement: () => {
            console.log('Decrementing counter')
        }
    }),
    // setTimeout - browser API to delay the execution of a function, it is used here to simulate an API call or any other side effect that takes time, it is also used to demonstrate the use of breakpoint in listeners
    afterMount(({ actions, cache }) => {
        cache.interval = window.setInterval(() => {
            actions.increment()
        }, 1000) // this will increment the counter every 2 seconds
    }),
    beforeUnmount(({ cache }) => {
        cache.interval && window.clearInterval(cache.interval) // this will clear the interval when the component is unmounted to prevent memory leaks)
    })
])

export function Simple() {
    const { increment, decrement } = useActions(simpleLogic)
    // things you need in a component: use 2 hooks to get actions and values from the logic - useActions and useValues
    const { counter } = useValues(simpleLogic) // to get values from the logic

    return <div>
        <div>Counter: {counter}</div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
    </div>
}
