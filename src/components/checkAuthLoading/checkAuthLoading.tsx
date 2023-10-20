import React from 'react';
import "./checkAuthLoading.scss";
import { RootState } from '../../store/reducers/rootReducer';
import { connect, ConnectedProps } from 'react-redux';

type CheckAuthLoadingProps = {
  children: React.ReactChildren | React.ReactChild,
} & ConnectorProps & React.HTMLAttributes<HTMLDivElement>;
const checkAuthLoading  = ({
  children,
  isLoading,
  ...props
}: CheckAuthLoadingProps) => {

  return (
    isLoading
      ? <div {...props}> Идет загрузка</div>
      : <div {...props} className={'authForm' + (props.className ? " " + props.className : "")}>
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
