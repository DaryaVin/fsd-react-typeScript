import React from 'react';
import "./roomCard.scss";
import { Carousel } from '../carousel/carousel';
import { WrapElementContentType } from '../createWrapElement/createWrapElement';
import { RateBox } from '../rateBox/rateBox';
import { Field } from '../field/field';
import { correctDeclensionWord } from '../correctDeclensionWord/correctDeclensionWord';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

interface ReviewProps {
  id: string,
  authorName: string,
  dateToCreating: Date,
  content: string,
  listWhoLikedThisReview: string[] | null,
  appraisal: 1 | 2 | 3 | 4 | 5,
}

interface RoomCardProps {
  imgs?: WrapElementContentType,
  id: number,
  price: number,
  reviews: ReviewProps[],
  isLux?: boolean
}
export const RoomCard = ({ imgs, id, reviews, price, isLux }: RoomCardProps) => {
  const rating = reviews.reduce((sum, current) => sum + current.appraisal, 0) / reviews.length;
  const navigate = useNavigate();
  const onClickRoomCard = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (!(e.target as Element).classList.contains("carousel__button")
    && !(e.target as Element).classList.contains("carousel__dotsItem")) {
        navigate(`/roomPage/${id}`);
    }
  }
  return (
    <Field theme="card" className='roomCard block_size_m' onClick={(e) => onClickRoomCard(e)}>
      <Carousel key={"roomCard__carousel"}
        className='roomCard__carousel'
        height={150}
        width={270}
      >
        {imgs}
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
            <h2>
              №{id}
              {
                isLux && <span className='roomCard__isLux'>&nbsp; люкс</span>
              }
            </h2>
          </div>
          <div key={"upper-right-lock"}
            className="roomCard__infoItem roomCard__infoItem_rightBlock"
          >
            <span className='roomCard__highlightedInfo'>{price.toLocaleString()}₽</span>&nbsp; в сутки
          </div>
        </div>
        <div key={"roomCard__infoItem_bottomBlock"}
          className="roomCard__infoItem roomCard__infoItem_bottomBlock"
        >
          <div key={"bottom-left-block"}
            className="roomCard__infoItem roomCard__infoItem_leftBlock"
          >
            <RateBox className='roomCard__rating' rating={rating} />
          </div>
          <div key={"bottom-right-block"}
            className="roomCard__infoItem roomCard__infoItem_rightBlock"
          >
            <span className='roomCard__highlightedInfo'>{reviews.length}</span>&nbsp;
            {correctDeclensionWord({
              options: {
                1: "Отзыв",
                2: "Отзыва",
                5: "Отзывов",
              },
              value: reviews.length
            })}
          </div>
        </div>
      </div>
    </Field>
  )
}
