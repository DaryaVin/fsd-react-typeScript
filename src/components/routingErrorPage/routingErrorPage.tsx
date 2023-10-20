import React from 'react'
import { useRouteError } from 'react-router-dom';

export const RoutingErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  console.log("RoutingErrorPage", error);
  
  return (
    <div key={"routingErrorPage"} className="routingErrorPage">
      <h1 key={"header"}>Ууупс!</h1>
      <p key={"text"}>Извините, но что-то пошло не так</p>
      <p key={"codeError"}>
        Код ошибки: <i>{}</i>
      </p>
    </div>
  )
}
