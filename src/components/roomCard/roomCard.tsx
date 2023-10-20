import React from 'react';
import "./roomCard.scss";
import { Carousel } from '../carousel/carousel';
import { RateBox } from '../rateBox/rateBox';
import { Field } from '../field/field';
import { correctDeclensionWord } from '../correctDeclensionWord/correctDeclensionWord';
import { useNavigate } from 'react-router-dom';
import { RoomItem } from '../../types/rooms';

export const RoomCard = ({id, photos, name, reviews, price, isLux }: RoomItem) => {
  const rating = reviews
  ? reviews.reduce((sum, current) => sum + current.appraisal, 0) / reviews.length
  : 0;
  const reviewsLength = reviews ? reviews.length : 0;
  const navigate = useNavigate();
  const onClickRoomCard = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (!(e.target as Element).classList.contains("carousel__button")
    && !(e.target as Element).classList.contains("carousel__dotsItem")) {
        navigate(`/roomPage/${id}`);
    }
  }
  
  return (
    <Field key={"roomCard"} theme="card" className='roomCard block_size_m' onClick={(e) => onClickRoomCard(e)}>
      <Carousel key={"roomCard__carousel"}
        className='roomCard__carousel'
        height={150}
        width={270}
      >
        {
          photos
          ? photos.map((url) => { 
            return <img key={url} src={url} alt={"Фото номера " + name}/>
           })
          : ""
        }
      </Carousel>
      <div key={"roomCard__info"}
        className="roomCard__info"
      >
        <div key={"roomCard__infoItem_upperBlock"}
          className="roomCard__infoItem roomCard__infoItem_upperBlock"
        >

          <div key={"upper-left-lock"}
            className="roomCard__header roomCard__infoItem roomCard__infoItem_leftBlock"
          >
            <h2 key={"header"}>
              {
                name
                ? name
                : "№" + id
              }
              {
                isLux && <span className='roomCard__isLux'>&nbsp; люкс</span>
              }
            </h2>
          </div>
          <div key={"upper-right-lock"}
            className="roomCard__infoItem roomCard__infoItem_rightBlock"
          >
            <span key={"highlightedInfo"} className='roomCard__highlightedInfo'>{price.toLocaleString()}₽</span>&nbsp; в сутки
          </div>
        </div>
        <div key={"roomCard__infoItem_bottomBlock"}
          className="roomCard__infoItem roomCard__infoItem_bottomBlock"
        >
          <div key={"bottom-left-block"}
            className="roomCard__infoItem roomCard__infoItem_leftBlock"
          >
            <RateBox key={"rating"} className='roomCard__rating' rating={rating} />
          </div>
          <div key={"bottom-right-block"}
            className="roomCard__infoItem roomCard__infoItem_rightBlock"
          >
            <span key={"highlightedInfo"} className='roomCard__highlightedInfo'>{reviewsLength}</span>&nbsp;
            {correctDeclensionWord({
              options: {
                1: "Отзыв",
                2: "Отзыва",
                5: "Отзывов",
              },
              value: reviewsLength
            })}
          </div>
        </div>
      </div>
    </Field>
  )
}
