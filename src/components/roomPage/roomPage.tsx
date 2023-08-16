import React, { useEffect, useState, useLayoutEffect } from 'react';
import "./roomPage.scss";
import { useLoaderData, useParams } from 'react-router-dom';
import { RoomsAPI } from '../../interfaces/roomsAPI';
import { RoomItem } from '../../types/rooms';
import { Carousel } from '../carousel/carousel';
import { Field } from '../field/field';
import { FlexContainer } from '../flexContainer/flexContainer';
import { Form, FormFieldset } from '../form/form';
import { Dropdown, dropButton } from '../dropdown/dropdown';
import { Label } from '../label/label';
import { DateMaskField } from '../dateMaskField/dateMaskField';
import { RootState } from '../../store/reducers/rootReducer';
import { ConnectedProps, connect } from 'react-redux';
import { CalendarCard } from '../calendarCard/calendarCard';
import { correctDeclensionWord } from '../correctDeclensionWord/correctDeclensionWord';
import { NumberPicker } from '../numberPicker/numberPicker';
import { FetchDesignations } from '../../store/actions/filterRoomsAction';
import { FilterRoomsAPI } from '../../interfaces/FilterRoomsAPI';
import { designations } from '../../types/filterRooms';
import { Button } from '../button/button';
import { FiArrowRight } from 'react-icons/fi';
import { OrderForm } from '../orderForm/orderForm';

export async function roomLoader({ params }: any) {
  const loaderData = JSON.parse(JSON.stringify(params));
  const designations: designations = await FilterRoomsAPI.FetchDesignations();
  const roomItem: RoomItem = await RoomsAPI.FetchRoomItem(loaderData.id);
  return {
    designations,
    roomItem
  }
}
type RoomPageProps = {

} & ConnectorProps
  // & React.FormHTMLAttributes<HTMLFormElement>
  ;

const Page = ({ auth }: RoomPageProps) => {
  const { designations, roomItem } = useLoaderData() as {
    designations: designations,
    roomItem: RoomItem
  };
  const {
    id,
    name,
    price,
    isLux,
    reviews,
    photos,
    roomConditions
  }: RoomItem = roomItem;

  return (
    <div key={"roomPage"} className='roomPage'>
      <Carousel key={"roomPage__photos"} className='roomPage__photos' height={500} theme='big'>
        {photos}
      </Carousel>
      <div key={"roomPage__info"} className='roomPage__info'>

      </div>
      <Field theme='card' key={"roomPage__orderForm"}>
        <OrderForm
          className='roomPage__orderForm'
          designations={designations}
          roomItem={roomItem}
        />
      </Field>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    auth: state.auth?.auth,
    // userInfo: state.auth?.userInfo,
    // settings: state.filterRooms?.settings,
    // designations: state.filterRooms?.designations,
    // isLoading: state.filterRooms?.isLoading
  })
}
const mapDispatchToProps = {
  // FetchDesignations,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const RoomPage = connector(Page);
