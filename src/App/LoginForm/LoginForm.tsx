import { kea, path, useActions, useValues } from 'kea'
import { forms } from 'kea-forms'

import type { loginLogicType } from './LoginFormType'

export const loginLogic = kea<loginLogicType>([
    path(['App', 'LoginForm', 'LoginForm']),
    forms({
        loginForm: {
            defaults: {
                username: '',
                password: ''
            },
            // errors: ({ username, password }) => ({
            //     username: !username ? 'Username is required' : null,
            //     password: !password ? 'Password is required' : null
            // }),
            // submit: async ({ username, password }, breakpoint) => {
            //     console.log('Submitting form with values:', { username, password })
            //     await breakpoint(1000) // simulate API call delay
            //     console.log('Form submitted successfully')
            // }
        },
    })
])


export const LoginForm = () => {
    const { } = useActions(loginLogic)
    const { } = useValues(loginLogic)
    return <div>
        <h1>Login Form</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
    </div>
}