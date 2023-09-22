import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store/reducers/rootReducer';

type RequireAuthProps = {
  children: JSX.Element,
  redirectPath: string,
} & ConnectorProps;
const Auth = ({ children, redirectPath, auth }: RequireAuthProps) => {
  const location = useLocation();
  if (!auth) {
    return <Navigate
      to={redirectPath}
      state={{ prevPathName: location.pathname }}
    />
  };
  return children;
}
const Unauth = ({ children, redirectPath, auth }: RequireAuthProps) => {
  const location = useLocation();
  
  if (auth) {
    return <Navigate
      to={location.state ? location.state.prevPathName : redirectPath}
      state={{ prevPathName: location.pathname }}
    />
  };
  return children;
}

const mapStateToProps = (state: RootState) => {
  return ({
    auth: state.auth?.auth,
  })
}
const connector = connect(mapStateToProps);
type ConnectorProps = ConnectedProps<typeof connector>;

export const RequireAuth = connector(Auth);
export const RequireUnauth = connector(Unauth);
