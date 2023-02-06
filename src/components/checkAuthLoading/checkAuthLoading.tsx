import React from 'react';
import "./checkAuthLoading.scss";
import { RootState } from '../../store/reducers/rootReducer';
import { connect, ConnectedProps } from 'react-redux';
import { AuthValidation } from '../authValidation/authValidation';

type CheckAuthLoadingProps = {
  children: React.ReactChildren | React.ReactChild,
} & ConnectorProps;
const checkAuthLoading  = ({
  children,
  isLoading,
}: CheckAuthLoadingProps) => {

  return (
    isLoading
      ? <span> Идет загрузка</span>
      : <div className='authForm'>
        {children}
      </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    isLoading: state.auth?.isLoading,
  })
}

const connector = connect(mapStateToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const CheckAuthLoading = connector(checkAuthLoading);
