import React from 'react';
import "./mainPage.scss";
import { MainBackgroundAnimation } from '../mainBackgroundAnimation/mainBackgroundAnimation';
import { LightFilterRoomsForm } from '../lightFilterRoomsForm/lightFilterRoomsForm';
import { Field } from '../field/field';

export const MainPage = () => {
  return (
    <MainBackgroundAnimation className='mainPage'>
      <Field key={"form"} 
       theme='card'>
      <LightFilterRoomsForm/>
      </Field>
    </MainBackgroundAnimation>
  )
}
