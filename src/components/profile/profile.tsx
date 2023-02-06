import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '../button/button';
import { FetchLogAut } from "../../store/actions/authActions";
import { RootState } from '../../store/reducers/rootReducer';

const profile = ({userInfo, FetchLogAut}: ConnectorProps) => {

  return (
    <div>
      Profile
      <Button key={"buttonSubmit"}
        theme="withBorder"
        type="submit"
        onClick={FetchLogAut}
      >
        <span></span>
        выход
        <FiArrowRight className="loginForm__buttonArrow"></FiArrowRight>
      </Button>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    userInfo: state.auth?.userInfo,
  })
}
const mapDispatchToProps = {
  FetchLogAut
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const Profile = connector(profile);
