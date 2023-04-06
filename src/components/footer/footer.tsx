import React from 'react';
import { FaInstagram, FaVk } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { Field } from '../field/field';
import { FlexContainer } from '../flexContainer/flexContainer';
import { Logo } from '../logo/logo';
import "./footer.scss";

export const Footer = () => {
  const footerNav = [
    {
      header: "Навигация",
      links: [
        {
          path: "/",
          title: "Главная",
          end: true,
        },
        {
          path: "/",
          title: "Главная",
        },
        {
          path: "/",
          title: "Главная",
        },
        {
          path: "/",
          title: "Главная",
        },
      ],
    },
    {
      header: "О нас",
      links: [
        {
          path: "/",
          title: "Главная",
        },
        {
          path: "/",
          title: "Главная",
        },
        {
          path: "/",
          title: "Главная",
        },
        {
          path: "/",
          title: "Главная",
        },
      ],
    },
    {
      header: "Помощь",
      links: [
        {
          path: "/",
          title: "Главная",
        },
        {
          path: "/",
          title: "Главная",
        },
        {
          path: "/",
          title: "Главная",
        },
      ],
    },
  ]
  return (
    <footer key={"footer"} className='footer'>
      <div key={"footer__widgets"} className="footer__part">
        <div key={"footer__wrap"} className="footer__wrap footer__widgets">
          <FlexContainer key={"footer__info"}
            className="footer__info"
            flexDirection="colomn"
            rowGap={20}
          >
            <NavLink key={"footer__logo"}
              to="/"
              className='footer__logo'
            >
              <Logo />
            </NavLink>
            <div key={"footer__description"} className="footer__description">
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam eget nullam pellentesque aliquam curabitur cociis.
            </div>
          </FlexContainer>

          <FlexContainer key={"footer__navbar"}
            className="footer__navbar"
            justifyContent="space-between"
            flexDirection="row"
            columnGap={20}
            rowGap={20}
            flexWrap="nowrap"
          >
            {
              footerNav.map((item, index) => {

                return <FlexContainer key={index}
                  flexDirection="colomn"
                  rowGap={20}
                >
                  <h3 key={"header"}>{item.header}</h3>
                  <FlexContainer key={"navList"}
                    className={"footer__navbarList"}
                    tagForWrap={"ul"}
                    flexDirection="colomn"
                    rowGap={20}
                  >
                    {
                      item.links.map((link, index) => {
                        return <li key={index}>
                          <NavLink to={link.path} end={link.end} className={"footer__navbarLink"}>{link.title}</NavLink>
                        </li>
                      })
                    }
                  </FlexContainer>
                </FlexContainer>
              })
            }
          </FlexContainer>
          <FlexContainer key={"footer__quickSubscription"}
            className="footer__quickSubscription"
            alignContent="space-between"
            flexDirection="colomn"
            rowGap={20}
          >
            <h3>Subscribe to our newsletter</h3>
            <div className="footer__description">
              Receive our latest news and
              promotions in your inbox!
            </div>
            <Field className='footer__quickSubscriptionField block_size_m' >
              <input></input>
              <FiArrowRight size={30} color={"#BC9CFF"} className='footer__quickSubscriptionFieldArrow'></FiArrowRight>
            </Field>
          </FlexContainer>
        </div>
      </div>
      <div key={"footer__copyrigth"} className="footer__part">
        <FlexContainer key={"footer__copyrigth"}
          className={"footer__copyrigth footer__wrap"}
          justifyContent="space-between"
        >
          <span key={"footer__copyrigthText"} className={"footer__copyrigthText"}>Copyright ©</span>
          <FlexContainer key={"footer__socialMediaLinks"}
            className='footer__socialMediaLinks'
            columnGap={20}
          >
            <svg key={"linerGradient"} className='footer__linerGradient'>
              <linearGradient id="linerGradient">
                <stop stopColor="red" offset="0%" />
                <stop stopColor="blue" offset="100%" />
              </linearGradient>
            </svg>
            <NavLink key={"vk"} className={"footer__socialMediaLinksItem"} to="vk">
              <FaVk className='footer__socialMediaLinksIcon' />
            </NavLink>
            <NavLink key={"insta"} className={"footer__socialMediaLinksItem"} to="instagram">
              <FaInstagram className='footer__socialMediaLinksIcon' />
            </NavLink>
          </FlexContainer>
        </FlexContainer>
      </div>
    </footer>
  )
}
