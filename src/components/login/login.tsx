import React from 'react'
import { CheckAuthLoading } from '../checkAuthLoading/checkAuthLoading'
import { LoginForm } from '../loginForm/loginForm'
import { MainBackgroundAnimation } from '../mainBackgroundAnimation/mainBackgroundAnimation'
import { FlexContainer } from '../flexContainer/flexContainer'

export const Login = () => {
  return (
      <FlexContainer
        justifyContent='center'
        alignItems='center'
      >
        <MainBackgroundAnimation>
          <CheckAuthLoading>
            <LoginForm />
          </CheckAuthLoading>
        </MainBackgroundAnimation>
      </FlexContainer>
  )
}
