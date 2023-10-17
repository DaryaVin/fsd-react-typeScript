import React from 'react'
import { RegistrationForm } from '../registrationForm/registrationForm';
import { CheckAuthLoading } from '../checkAuthLoading/checkAuthLoading';
import { MainBackgroundAnimation } from '../mainBackgroundAnimation/mainBackgroundAnimation';
import { FlexContainer } from '../flexContainer/flexContainer';

export const Registration = () => {
  return (
    <FlexContainer
      justifyContent='center'
      alignItems='center'
    >
      <MainBackgroundAnimation>
        <CheckAuthLoading >
          <RegistrationForm />
        </CheckAuthLoading>
      </MainBackgroundAnimation>
    </FlexContainer>
  )
}
