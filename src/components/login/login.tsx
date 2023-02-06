import React from 'react'
import { CheckAuthLoading } from '../checkAuthLoading/checkAuthLoading'
import { LoginForm } from '../loginForm/loginForm'

export const Login = () => {
  return (
    <div>
      <CheckAuthLoading>
        <LoginForm/>
      </CheckAuthLoading>
    </div>
  )
}
