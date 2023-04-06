import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

export async function roomLoader({params}: any) {
  return params;
}
export const RoomPage = () => {
  const roomItem = JSON.parse(JSON.stringify(useLoaderData()));
  return (
    <div>Room Page № {roomItem.id}</div>
  )
}
