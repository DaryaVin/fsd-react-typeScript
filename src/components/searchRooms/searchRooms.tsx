import React, { useState } from 'react';
import "./searchRooms.scss";
import { FilterRoomsForm } from '../filterRoomsForm/filterRoomsForm';
import { RoomCardsList } from '../roomCardsList/roomCardsList';
import { FilterRoomsAPI } from '../../interfaces/FilterRoomsAPI';
import { useLoaderData } from 'react-router-dom';
import { designations } from '../../types/filterRooms';
import { Button } from '../button/button';
import { GiSettingsKnobs } from 'react-icons/gi';

export async function searchRoomLoader() {
  const designations: designations = await FilterRoomsAPI.FetchDesignations();
  return designations;
}

export const SearchRooms = () => {
  const designations = useLoaderData() as designations;
  const [isFilterShow, setIsFilterShow] = useState<boolean>(false)
  return (
    <div className='searchRooms'>
      <RoomCardsList key={"RoomCardsList"} className='searchRooms__itemList' />
      <div className="searchRooms__filter">
        <Button
          type='button'
          className={"searchRooms__filterButton"}
          onClick={() => setIsFilterShow(!isFilterShow)}
        >
          <GiSettingsKnobs className="loginForm__buttonArrow" />
          Фильтр
        </Button>
        <FilterRoomsForm key={"FilterRoomsForm"}
          className={"searchRooms__filterForm" + (isFilterShow ? " searchRooms__filterForm_show" : "") }
          designations={designations}
        />
      </div>
    </div>
  )
}
