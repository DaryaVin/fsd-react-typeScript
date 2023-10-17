import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from '../../routes';
import { CheckAuth, FetchUserInfo } from "../../store/actions/authActions";
import { RootState } from '../../store/reducers/rootReducer';
// import { baseFillingRooms } from '../../store/actions/roomsListActions';

const AppRout = ({ 
  auth, 
  CheckAuth, 
  FetchUserInfo, 
  // baseFillingRooms,
}: ConnectorProps) => {
  // useEffect(() => {
  //   for (let index = 0; index < 100; index++) {
  //    baseFillingRooms(index.toString());
  //   }
  // }, []);
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
  // baseFillingRooms,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const AppRouter = connector(AppRout);
