import React from 'react';
import "./header.scss";
import { connect, ConnectedProps } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../store/reducers/rootReducer';
import { Button } from '../button/button';
import { FlexContainer } from '../flexContainer/flexContainer';
import { Logo } from '../logo/logo';

export const Head = ({ auth, userInfo }: ConnectorProps) => {
  const navLinks = [
    {
      path: "/",
      title: "Главная",
      end: true
    },
    {
      path: "/search-rooms",
      title: "Выбор номера"
    },
  ];
  return (
    <header>
      <FlexContainer key={"header__wrap"}
        className={"header__wrap"}
        alignItems='center'
        justifyContent={"space-between"}
      >
        <NavLink key={"header__logo"}
          to="/"
          className='header__logo'
        >
          <Logo />
        </NavLink>
        <FlexContainer key={"header__navbar"}
          className={"header__navbar"}
          justifyContent="end"
          tagForWrap='nav'
          flexWrap="nowrap"
        >
          <FlexContainer key={"header__navbarList"}
            className='header__navbarList'
            tagForWrap='ul'
            justifyContent="space-around"
            columnGap={30}
            flexWrap="wrap"
          >
            {
              navLinks.map((item, index) => <NavLink key={index} to={item.path} end={item.end} className={"header__navbarItem"}>{item.title}</NavLink>)
            }
          </FlexContainer>
          {
            auth && userInfo
              ? <NavLink key={"header__authBlock"}
                to={"/profile"}
                className="header__authBlock header__authBlock_auth"
              >
                {userInfo.lastName} {userInfo.firstName}
              </NavLink>
              : <FlexContainer key={"header__authBlock"}
                tagForWrap='ul'
                justifyContent="space-between"
                alignItems='center'
                className="header__authBlock"
                columnGap={20}
              >
                <li>
                  <Button theme="withBorder">
                    <NavLink to="/login">войти</NavLink>
                  </Button>
                </li>
                <li>
                  <Button theme="fillBcg">
                    <NavLink to="/login">Зарегистрироваться</NavLink>
                  </Button>
                </li>
              </FlexContainer>
          }
        </FlexContainer>
      </FlexContainer>
    </header>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    auth: state.auth?.auth,
    userInfo: state.auth?.userInfo,
  })
}
// const mapDispatchToProps = {
//   FetchLogAut,
//   FetchUserInfo,
//   UpdateUserInfo,
// };

const connector = connect(mapStateToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const Header = connector(Head);
