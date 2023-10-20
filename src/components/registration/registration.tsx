import React from 'react'
import { RegistrationForm } from '../registrationForm/registrationForm';
import { CheckAuthLoading } from '../checkAuthLoading/checkAuthLoading';
import { MainBackgroundAnimation } from '../mainBackgroundAnimation/mainBackgroundAnimation';
import { FlexContainer } from '../flexContainer/flexContainer';

export const Registration = () => {
  return (
    <FlexContainer key={"registration"}
      justifyContent='center'
      alignItems='center'
    >
      <MainBackgroundAnimation key={"wrap"}>
        <CheckAuthLoading key={"checkAuth"}>
          <RegistrationForm key={"Form"}/>
        </CheckAuthLoading>
      </MainBackgroundAnimation>
    </FlexContainer>
  )
}
