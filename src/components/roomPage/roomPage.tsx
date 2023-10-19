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
import { bookingItem } from '../../types/booking';
import { bookingAPI } from '../../interfaces/bookingAPI';
import { BulletList } from '../bulletList/bulletList';
import { BulletItem } from '../bulletItem/bulletItem';
import { MdBedroomParent } from 'react-icons/md';
import { FaBed, FaBath } from 'react-icons/fa';
import { correctDeclensionWord } from '../correctDeclensionWord/correctDeclensionWord';
import { FlexContainer } from '../flexContainer/flexContainer';
import { DonutChartReviews } from '../donutChartReviews/donutChartReviews';

export async function roomLoader({ params }: any) {
  const loaderData = JSON.parse(JSON.stringify(params));
  const designations: designations = await FilterRoomsAPI.FetchDesignations();
  const roomBookings: bookingItem[] = await bookingAPI.FetchBookingsForRoom(loaderData.id);
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
    roomItem,
    roomBookings,
  }
}

type RoomPageProps = {

} & ConnectorProps;

const Page = ({ auth }: RoomPageProps) => {
  const { designations, roomItem, roomBookings } = useLoaderData() as {
    designations: designations,
    roomItem: RoomItem,
    roomBookings: bookingItem[],
  };
  const {
    id,
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
      <div key={"main"} className="roomPage__mainBlock">
        <FlexContainer key={"roomPage__info"}
          className='roomPage__info'
          flexDirection='colomn'
          rowGap={20}
        >
          <h2>В номере</h2>
          <BulletList withBorderBetweenBulletItems>
            <BulletItem key={"beds"}
              icon={FaBed}
            >
              {
                "В данном номере находится "
                + roomConditions.beds + " "
                + correctDeclensionWord({
                  options: {
                    1: "спальное место",
                    2: "спальных места",
                    5: "спальных мест",
                  },
                  value: roomConditions.beds
                })
              }
            </BulletItem>
            <BulletItem key={"bedrooms"}
              icon={MdBedroomParent}
            >
              {
                "Которые расположены в "
                + roomConditions.bedrooms + " "
                + correctDeclensionWord({
                  options: {
                    1: "комнате",
                    2: "комнатах",
                    5: "комнатах",
                  },
                  value: roomConditions.bedrooms
                })
              }
            </BulletItem>
            <BulletItem key={"bathrooms"}
              icon={FaBath}
            >
              {
                "Содержит "
                + roomConditions.bathrooms + " "
                + correctDeclensionWord({
                  options: {
                    1: "санузел",
                    2: "санузла",
                    5: "санузлов",
                  },
                  value: roomConditions.bathrooms
                })
              }
            </BulletItem>
          </BulletList>
        </FlexContainer>
        {
          reviews
            ? <FlexContainer key={"dounut"}
              className={"roomPage__dounutContainer"}
              flexDirection='colomn'
            >
              <h2>Впечатления от номера</h2>
              <DonutChartReviews reviews={reviews} className='roomPage__dounut' />
            </FlexContainer>
            : ""
        }
        {
          reviews
            ? <FlexContainer key={"roomPage__reviews"}
              className='roomPage__reviews'
              flexDirection='colomn'
              rowGap={20}
            >
              <FlexContainer
                justifyContent='space-between'
              >
                <h2 key={"header"}>
                  Отзывы посетителей номера
                </h2>
                {
                  reviews
                    ? reviews.length + " "
                    + correctDeclensionWord({
                      options: {
                        1: "отзыв",
                        2: "отзыва",
                        5: "отзывов",
                      },
                      value: reviews.length
                    })
                    : "0 отзывов"
                }
              </FlexContainer>
              {
                reviews
                  ? <ReviewList roomId={id} reviews={reviews} />
                  : "Данному номеру пока не оставили ни одного отзыва"
              }
            </FlexContainer>
            : ""
        }
        {
          roomConditions.facilitiesInRoom
            ? <FlexContainer key={"roomPage__facilitiesInRoom"} 
            className='roomPage__facilities'
            flexDirection='colomn'
            rowGap={20}
            >
              <h2 key={"header"}>Особые удобства номера</h2>
              <FlexContainer key={"list"}
                flexDirection='colomn'
                rowGap={10}
              >
                <BulletList >
                  {
                    roomConditions.facilitiesInRoom.map((facilityId) => {
                      return <BulletItem
                        explanation={designations.facility.find((item) => { return item.id === facilityId })?.description || ""}
                      >
                        {
                          designations.facility.find((item) => { return item.id === facilityId })?.name || ""
                        }
                      </BulletItem>
                    })
                  }
                </BulletList>
              </FlexContainer>
            </FlexContainer>
            : ""
        }

        <FlexContainer key={"roomPage__rules"} 
        className='roomPage__rules'
        flexDirection='colomn'
        rowGap={20}
        >
          <h2 key={"header"}>Правила</h2>
          {
            roomConditions.roomRules
              ? <FlexContainer key={"list"}
                flexDirection='colomn'
                rowGap={10}
              >

                <BulletList>
                  {
                    roomConditions.roomRules.map((ruleId) => {
                      return <BulletItem>{designations.rules.find((item) => { return item.id === ruleId })?.name}</BulletItem>
                    })
                  }
                </BulletList>
              </FlexContainer>
              : "В этом номере нет смягчающих правил"
          }
        </FlexContainer>
        <FlexContainer key={"cancellation"} 
        className='roomPage__cancellation'
        flexDirection='colomn'
        rowGap={20}
        >
          <h2 key={"header"}>Отмена</h2>
          Бесплатная отмена в течение 48 ч. После этого при отмене не позднее чем за 5 дн. до прибытия вы получите полный возврат за вычетом сбора за услуги.
        </FlexContainer>
        <div className='roomPage__orderFormContener' key={"roomPage__orderForm"}>
          <Field theme='card' >
            <OrderForm
              className='roomPage__orderForm'
              designations={designations}
              roomItem={roomItem}
              roomBookings={roomBookings}
            />
          </Field>
        </div>
      </div>
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




// import React from 'react';
// import "./roomPage.scss";
// import { useLoaderData } from 'react-router-dom';
// import { RoomsAPI } from '../../interfaces/roomsAPI';
// import { RoomItem } from '../../types/rooms';
// import { Carousel } from '../carousel/carousel';
// import { Field } from '../field/field';
// import { RootState } from '../../store/reducers/rootReducer';
// import { ConnectedProps, connect } from 'react-redux';
// import { FilterRoomsAPI } from '../../interfaces/FilterRoomsAPI';
// import { designations } from '../../types/filterRooms';
// import { OrderForm } from '../orderForm/orderForm';
// import { ReviewList } from '../reviewList/reviewList';
// import { authAPI } from '../../interfaces/authAPI';
// import { userInfo } from '../../types/auth';

// export async function roomLoader({ params }: any) {
//   const loaderData = JSON.parse(JSON.stringify(params));
//   const designations: designations = await FilterRoomsAPI.FetchDesignations();
//   const roomItem: RoomItem = await RoomsAPI.FetchRoomItem(loaderData.id);

//   if (roomItem.reviews) {
//     for (let index = 0; index < roomItem.reviews.length; index++) {
//       let authorInfo = await authAPI.FetchUserInfo(roomItem.reviews[index].authorId) as userInfo;
//       roomItem.reviews[index] = {
//         ...roomItem.reviews[index],
//         authorName: authorInfo.firstName + " " + authorInfo.lastName,
//         authorPhotoURL: authorInfo.userPhotoURL,
//       };
//     }
//   }
//   return {
//     designations,
//     roomItem
//   }
// }

// type RoomPageProps = {

// } & ConnectorProps;

// const Page = ({ auth }: RoomPageProps) => {
//   const { designations, roomItem } = useLoaderData() as {
//     designations: designations,
//     roomItem: RoomItem
//   };
//   const {
//     id,
//     name,
//     price,
//     isLux,
//     reviews,
//     photos,
//     roomConditions
//   }: RoomItem = roomItem;

//   return (
//     <div key={"roomPage"} className='roomPage'>
//       <Carousel key={"roomPage__photos"} className='roomPage__photos' height={500} theme='big'>
//         {
//           photos
//             ? photos.map((url) => {
//               return <img key={url} src={url} alt='Фото номера' />
//             })
//             : ""
//         }
//       </Carousel>
//       <div key={"roomPage__info"} className='roomPage__info'>

//       </div>
//       <div key={"roomPage__reviews"} className='roomPage__reviews'>
//         <h2 key={"header"}>
//           Отзывы посетителей номера
//         </h2>
//         {
//           reviews
//           && <ReviewList roomId={id} reviews={reviews} />
//         }
//       </div>
//       <Field theme='card' key={"roomPage__orderForm"}>
//         {/* <OrderForm
//           className='roomPage__orderForm'
//           designations={designations}
//           roomItem={roomItem}
//         /> */}
//         <div></div>
//       </Field>
//     </div>
//   )
// }

// const mapStateToProps = (state: RootState) => {
//   return ({
//     auth: state.auth?.auth,
//     // userInfo: state.auth?.userInfo,
//     // settings: state.filterRooms?.settings,
//     // designations: state.filterRooms?.designations,
//     // isLoading: state.filterRooms?.isLoading
//   })
// }
// const mapDispatchToProps = {
//   // FetchDesignations,
// };

// const connector = connect(mapStateToProps, mapDispatchToProps);
// type ConnectorProps = ConnectedProps<typeof connector>;
// export const RoomPage = connector(Page);
