import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouterProvider, Routes } from 'react-router-dom';
// import { router, routes } from '../../routes';
import { router } from '../../routes';
import { routesParser } from '../routesParser/routesParser';
import { CheckAuth, FetchUserInfo } from "../../store/actions/authActions";
import { RootState } from '../../store/reducers/rootReducer';

const AppRout = ({ auth, CheckAuth, FetchUserInfo }: ConnectorProps) => {
  // useEffect(() => {
  //   CheckAuth();
  // });
  useEffect(() => {
    
    FetchUserInfo(auth?.uid);
  }, [auth]);
  return (
    // <Routes>
    //   {routesParser(routes)}
    // </Routes>
    <RouterProvider router={router}/>
  )
}
const mapStateToProps = (state: RootState) => {
  return ({
    auth: state.auth?.auth,
  })
};
const mapDispatchToProps = {
  CheckAuth,
  FetchUserInfo,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const AppRouter = connector(AppRout);
