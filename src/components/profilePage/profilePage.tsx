import React from 'react';
import { MainBackgroundAnimation } from '../mainBackgroundAnimation/mainBackgroundAnimation';
import { Profile } from '../profile/profile';
import { FlexContainer } from '../flexContainer/flexContainer';

export const ProfilePage = () => {
  return (
      <FlexContainer key={"profilePage"}
      justifyContent='center'
      alignItems='center'
      >
      <MainBackgroundAnimation key={"wrap"}>
        <Profile key={"profile"}/>
      </MainBackgroundAnimation>
      </FlexContainer>
  )
}
