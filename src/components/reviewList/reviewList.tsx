import React from 'react';
import "./reviewList.scss";
import { ReviewItem } from '../../types/rooms';
import { Review } from '../review/review';

interface ReviewListProps extends React.HTMLAttributes<HTMLUListElement> {
  roomId: string | number,
reviews: ReviewItem[]
} 
export const ReviewList = ({roomId, reviews, ...props}: ReviewListProps) => {
  return (
    <ul {...props} className={"reviewList" + (props.className ? " " + props.className : "")}>
      {
        reviews.map((review) => { 
          return <li>
            <Review className='reviewList__item' roomId={roomId} {...review}/>
          </li>
         })
      } 
    </ul>
  )
}
