import React from 'react';
import { Routes } from 'react-router-dom';
import { routes } from '../../routes';
import { routesParser } from '../routesParser/routesParser';

export const AppRouter = () => {
  return (
    <Routes>
      {routesParser(routes)}
    </Routes>
  )
}
