import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store/reducers/rootReducer';
import { Button } from '../button/button';

interface VerificationEmailProps {

}
const VerifyEmail = ({ auth}: ConnectorProps) => {
  const location = useLocation();
  if (auth && auth.emailVerified) {
    return <Navigate to={"/profile"} state={{ from: { location } }}></Navigate>
  };
  return (
    <div>
      VerificationEmail
      <Button theme="withBorder">
        <NavLink to="/login">войти</NavLink>
      </Button>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    auth: state.auth?.auth,
  })
}

const connector = connect(mapStateToProps, {});
type ConnectorProps = ConnectedProps<typeof connector>;
export const VerificationEmail = connector(VerifyEmail);
