import React, { useState, useEffect } from 'react';
import "./header.scss";
import { connect, ConnectedProps } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { RootState } from '../../store/reducers/rootReducer';
import { Button } from '../button/button';
import { FlexContainer } from '../flexContainer/flexContainer';
import { Logo } from '../logo/logo';

interface navLink {
  path: string,
  title: string,
  end?: boolean,
  requireAuth?: boolean,
}
export const Head = ({ auth, userInfo }: ConnectorProps) => {
  let location = useLocation();

  useEffect(() => {
    setshowMenu(false);
  }, [location]);
  const navLinks: navLink[] = [
    {
      path: "/search-rooms",
      title: "Выбор номера"
    },
    {
      path: "/orders",
      title: "Мои заказы",
      requireAuth: true,
    },
    {
      path: "/about-us",
      title: "О нас",
    },
  ];
  const [showMenu, setshowMenu] = useState<boolean>(false);
  return (

    <header key={"header"} className='header'>
      <div key={"flowOccupyingPart"} className="header__flowOccupyingPart"></div>
      <div key={"fixedPart"} className="header__fixedPart">
        <div key={"header__wrap"}
          className={"header__wrap"}
        >
          <NavLink key={"header__logo"}
            to="/"
            className='header__logo'
          >
            <Logo />
          </NavLink>
          <nav key={"header__navbar"}
            className={"header__navbar" + (showMenu ? " header__navbar_show" : "")}
            onScroll={(e) => { e.preventDefault(); e.stopPropagation(); }}
          >
            <FlexContainer key={"header__navbarScroll"}
              className="header__navbarScroll"
              justifyContent="space-between"
            >
              <div key={"helpBlock"}></div>
              <FlexContainer key={"header__navbarList"}
                className='header__navbarList'
                tagForWrap='ul'
                alignItems='center'
                columnGap={30}
                flexWrap="nowrap"
              >
                {
                  navLinks.map((item, index) => {
                    return (item.requireAuth && auth) || !item.requireAuth
                      ? <li key={index} className={"header__navbarItem"}>
                        <NavLink to={item.path} end={item.end} className={"header__navbarLink"}>{item.title}</NavLink>
                      </li>
                      : ""
                  })
                }
              </FlexContainer>
            </FlexContainer>
            {
              auth && userInfo
                ? <div className='header__navbarItem'>
                  <NavLink key={"header__authBlock"}
                    to={"/profile"}
                    className="header__authBlock header__authBlock_auth"
                  >
                    {
                      userInfo.lastName || userInfo.firstName
                        ? userInfo.lastName + " " + userInfo.firstName
                        : "Не известный"
                    }
                  </NavLink>
                </div>
                : <FlexContainer key={"header__authBlock"}
                  tagForWrap='ul'
                  justifyContent="space-between"
                  alignItems='center'
                  className="header__authBlock"
                  columnGap={20}
                >
                  <li key={"login"}>
                    <Button theme="withBorder">
                      <NavLink to="/login">войти</NavLink>
                    </Button>
                  </li>
                  <li>
                    <Button key={"registration"} theme="fillBcg">
                      <NavLink to="/registration">Зарегистрироваться</NavLink>
                    </Button>
                  </li>
                </FlexContainer>
            }
          </nav>
          <button key={"header__burger"} type='button' className={"header__burger" + (showMenu ? " header__burger_show" : "")} onClick={() => setshowMenu(!showMenu)}>
            Навигация
            <span></span>
          </button>
        </div>
      </div>
    </header >
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    auth: state.auth?.auth,
    userInfo: state.auth?.userInfo,
  })
}

const connector = connect(mapStateToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const Header = connector(Head);
