import React from 'react'
import { NavLink } from 'react-router-dom'
import { RoomCard } from '../roomCard/roomCard'

export const SearchRooms = () => {
  const reviews: {
    id: string,
    authorName: string,
    dateToCreating: Date,
    content: string,
    listWhoLikedThisReview: string[] | null,
    appraisal:  1 | 2 | 3 | 4 | 5 ,
  }[] = [
    {
      id: "review1",
      authorName: "Иван",
      dateToCreating: new Date(),
      content: "номер говно",
      listWhoLikedThisReview: ["1"],
      appraisal: 1,
    },
    {
      id: "review2",
      authorName: "Иван",
      dateToCreating: new Date(),
      content: "номер говно",
      listWhoLikedThisReview: null,
      appraisal: 2,
    },
  ]
  return (
    <div className='searchRooms'>
      <RoomCard isLux id={1} price={10000} reviews={reviews} />
    </div>
  )
}
