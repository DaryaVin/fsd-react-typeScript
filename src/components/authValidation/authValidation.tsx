
import React from 'react';
import "./authValidation.scss";
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';

type AuthValidationProps = React.HTMLAttributes<HTMLDivElement> & ConnectorProps;
const authValidation = ({ error, userInfo, ...props}: AuthValidationProps) => {
  switch (error?.message) {
    case "auth/email-already-in-use": {
      if (error.userInfo.email === userInfo?.email) {
        return (
          <div {...props} className={'authValidation' + props.className ? " " + props.className: ""}>Пользователь с почтой {error.userInfo.email} уже зарегистрирован.</div>
        );
      }
      return <></>;
    }
    case "auth/wrong-password": {
      if (error.userInfo.password === userInfo?.password && error.userInfo.email === userInfo?.email) {
        return (
          <div {...props} className={'authValidation' + props.className ? " " + props.className: ""}>Введен не верный пароль. Авторизация не удалась.</div>
        );
      }
      return <></>;
    }
    case "auth/user-not-found": {
      if (error.userInfo.email === userInfo?.email) {
        return (
          <div {...props} className={'authValidation' + props.className ? " " + props.className: ""}>Пользовать с почтой {error.userInfo.email} не найден. Вам нужно зарегистриваться.</div>
        );
      }
      return <></>
    }
    default: return <></>;
  }
}

const mapStateToProps = (state: RootState) => {
  return ({
    userInfo: state.auth?.userInfo,
    error: state.auth?.error,
  })
}

const connector = connect(mapStateToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const AuthValidation = connector(authValidation);
