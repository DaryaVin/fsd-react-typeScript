import { ref, set } from 'firebase/database';
import React, { useEffect } from 'react';
import { bdFirebase } from '../../firebase';
import { RoomItem } from '../../types/rooms';
import { FilterRoomsForm } from '../filterRoomsForm/filterRoomsForm';
import { Pagination } from '../pagination/pagination';
import { RoomCard } from '../roomCard/roomCard';
import { RoomCardsList } from '../roomCardsList/roomCardsList';
import { FilterRoomsAPI } from '../../interfaces/FilterRoomsAPI';
import { useLoaderData } from 'react-router-dom';
import { designations } from '../../types/filterRooms';

export async function searchRoomLoader({ params }: any) {
  const loaderData = JSON.parse(JSON.stringify(params));
  const designations: designations = await FilterRoomsAPI.FetchDesignations();
  return designations;
}

export const SearchRooms = () => {
  const designations = useLoaderData() as designations;

  return (
    <div className='searchRooms'>
      <FilterRoomsForm key={"FilterRoomsForm"} className="" designations={designations}></FilterRoomsForm>
      <RoomCardsList key={"RoomCardsList"} className=''/>
    </div>
  )
}
