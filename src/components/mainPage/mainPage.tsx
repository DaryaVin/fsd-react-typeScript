import React from 'react';
import "./mainPage.scss";
import { MainBackgroundAnimation } from '../mainBackgroundAnimation/mainBackgroundAnimation';
import { LightFilterRoomsForm } from '../lightFilterRoomsForm/lightFilterRoomsForm';
import { Field } from '../field/field';

export const MainPage = () => {
  return (
    <MainBackgroundAnimation key={"MainPage"} className='mainPage'>
      <Field key={"card"}
        theme='card'>
        <LightFilterRoomsForm key={"form"}/>
      </Field>
    </MainBackgroundAnimation>
  )
}
