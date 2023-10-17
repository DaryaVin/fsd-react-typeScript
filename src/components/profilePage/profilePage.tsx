import React from 'react';
import { MainBackgroundAnimation } from '../mainBackgroundAnimation/mainBackgroundAnimation';
import { Profile } from '../profile/profile';
import { FlexContainer } from '../flexContainer/flexContainer';

export const ProfilePage = () => {
  return (
      <FlexContainer
      justifyContent='center'
      alignItems='center'
      >
      <MainBackgroundAnimation>
        <Profile/>
      </MainBackgroundAnimation>
      </FlexContainer>
  )
}
