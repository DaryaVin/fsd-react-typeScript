import React from 'react'
import { useRouteError } from 'react-router-dom';

export const RoutingErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  console.log("RoutingErrorPage", error);
  
  return (
    <div className="routingErrorPage">
      <h1>Ууупс!</h1>
      <p>Извините, но что-то пошло не так</p>
      <p>
        Код ошибки: <i>{}</i>
      </p>
    </div>
  )
}
