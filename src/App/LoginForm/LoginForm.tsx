import { actions, kea, path, useActions, useValues } from 'kea'
import { Field, Form, forms } from 'kea-forms'

import type { loginLogicType } from './LoginFormType'

export const loginLogic = kea<loginLogicType>([
    path(['App', 'LoginForm', 'LoginForm']),
    forms({
        loginForm: {
            defaults: {
                username: '',
                password: ''
            },
            errors: ({ username, password }) => ({
                username: !username ? 'Username is empty' : '',
                password: !password ? 'Password is required' : ''
            }),
            submit: async (values, breakpoint) => {
                await breakpoint(1000)
                console.log('submitting form', values)
            },
        },
    }),
])


export const LoginForm = () => {
    const { } = useActions(loginLogic)
    const { } = useValues(loginLogic)
    return <div>
        <h1>Login Form</h1>
        <Form logic={loginLogic} formKey="loginForm" enableFormOnSubmit>
            <Field name="username">
                <input />
            </Field>
            <Field name="password">
                <input />
            </Field>
            <button type="submit">Login</button>
        </Form>
    </div>
}