import React from 'react';
import "./roomPage.scss";
import { useLoaderData } from 'react-router-dom';
import { RoomsAPI } from '../../interfaces/roomsAPI';
import { RoomItem } from '../../types/rooms';
import { Carousel } from '../carousel/carousel';
import { Field } from '../field/field';
import { RootState } from '../../store/reducers/rootReducer';
import { ConnectedProps, connect } from 'react-redux';
import { FilterRoomsAPI } from '../../interfaces/FilterRoomsAPI';
import { designations } from '../../types/filterRooms';
import { OrderForm } from '../orderForm/orderForm';
import { ReviewList } from '../reviewList/reviewList';
import { authAPI } from '../../interfaces/authAPI';
import { userInfo } from '../../types/auth';

export async function roomLoader({ params }: any) {
  const loaderData = JSON.parse(JSON.stringify(params));
  const designations: designations = await FilterRoomsAPI.FetchDesignations();
  const roomItem: RoomItem = await RoomsAPI.FetchRoomItem(loaderData.id);

  if (roomItem.reviews) {
    for (let index = 0; index < roomItem.reviews.length; index++) {
      let authorInfo = await authAPI.FetchUserInfo(roomItem.reviews[index].authorId) as userInfo;
      roomItem.reviews[index] = {
        ...roomItem.reviews[index],
        authorName: authorInfo.firstName + " " + authorInfo.lastName,
        authorPhotoURL: authorInfo.userPhotoURL,
      };
    }
  }
  return {
    designations,
    roomItem
  }
}

type RoomPageProps = {

} & ConnectorProps;

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
        {
          photos
            ? photos.map((url) => {
              return <img key={url} src={url} alt='Фото номера' />
            })
            : ""
        }
      </Carousel>
      <div key={"roomPage__info"} className='roomPage__info'>

      </div>
      <div key={"roomPage__reviews"} className='roomPage__reviews'>
        <h2 key={"header"}>
          Отзывы посетителей номера
        </h2>
        {
          reviews
          && <ReviewList roomId={id} reviews={reviews} />
        }
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
