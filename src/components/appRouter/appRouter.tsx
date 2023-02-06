import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Routes } from 'react-router-dom';
import { routes } from '../../routes';
import { routesParser } from '../routesParser/routesParser';
import { CheckAuth } from "../../store/actions/authActions";

const AppRout = ({ CheckAuth }: ConnectorProps) => {
  useEffect(() => {
      CheckAuth();
  });
  return (
    <Routes>
      {routesParser(routes)}
    </Routes>
  )
}

const mapDispatchToProps = {
  CheckAuth
};
const connector = connect(null, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const AppRouter = connector(AppRout);
