import React from 'react'
import { RegistrationForm } from '../registrationForm/registrationForm';
import { CheckAuthLoading } from '../checkAuthLoading/checkAuthLoading';

export const Registration = () => {
  return (
    <CheckAuthLoading>
      <RegistrationForm/>
    </CheckAuthLoading>
  )
}
