import React from 'react'
import { useRouteError } from 'react-router-dom';

export const RoutingErrorPage = () => {
  const error = JSON.parse(JSON.stringify(useRouteError()));
  console.error(error);
  return (
    <div className="routingErrorPage">
      <h1>Ууупс!</h1>
      <p>Извините, но что-то пошло не так</p>
      <p>
        Код ошибки: <i>{error.status}</i>
      </p>
    </div>
  )
}
