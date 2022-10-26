import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../footer/footer'
import { Header } from '../header/header'

export const Layout = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}
