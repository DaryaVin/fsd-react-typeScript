import React from "react";
import "./review.scss";
import { LikeButton } from "../likeButton/likeButton";
import { CreateWrapElement } from "../createWrapElement/createWrapElement";

const useDateFormat = (date: Date, reportDate: Date): string => {
  const oneDay = 1000 * 60 * 60 * 24;

  if (reportDate >= date && reportDate.getTime() - date.getTime() < 8 * oneDay) {
    const date1 = new Date(date.getTime());
    const reportDate1 = new Date(reportDate.getTime());
    date1.setHours(0, 0, 0, 0);
    reportDate1.setHours(0, 0, 0, 0);
    const differenceDate = Math.ceil((reportDate1.getTime() - date1.getTime()) / oneDay);
    switch (differenceDate) {
      case 0: return "Cегодня";
      case 1: return "Вчера";
      case 2: return "2 дня назад";
      case 3: return "3 дня назад";
      case 4: return "4 дня назад";
      case 5: return "5 дней назад";
      case 6: return "6 дней назад";
      case 7: return "Неделю назад";
      default: return date.toLocaleString("Ru-ru", { day: "numeric", month: 'short' });
    }
  }
  if (reportDate <= date && date.getTime() - reportDate.getTime() < 8 * oneDay) {
    const date1 = new Date(date.getTime());
    const reportDate1 = new Date(reportDate.getTime());
    date1.setHours(0, 0, 0, 0);
    reportDate1.setHours(0, 0, 0, 0);
    const differenceDate = Math.ceil((date1.getTime() - reportDate1.getTime()) / oneDay);
    switch (differenceDate) {
      case 0: return "Cегодня";
      case 1: return "Завтра";
      case 2: return "Через 2 дня";
      case 3: return "Через 3 дня";
      case 4: return "Через 4 дня";
      case 5: return "Через 5 дней";
      case 6: return "Через 6 дней";
      case 7: return "Через неделю";
      default: return date.toLocaleString("Ru-ru", { day: "numeric", month: 'short' });
    }
  }
  if (reportDate.getFullYear() === date.getFullYear()) {
    return date.toLocaleString("Ru-ru", { day: "numeric", month: 'short' });
  }
  return date.toLocaleString("Ru-ru", { day: "numeric", month: 'short', year: 'numeric' }).slice(0, -2);
}

interface ReviewProps {
  id: string,
  authorName: string,
  dateToCreating: Date,
  content: string,
  listWhoLikedThisReview: string[],
  authorPhoto?: JSX.Element,
  className?: string,
}
export const Review = ({
  id,
  authorName,
  dateToCreating,
  content,
  listWhoLikedThisReview,
  authorPhoto,
  className,
}: ReviewProps) => {
  return (
    <div className={className ? className + " review" : "review"}>
      <CreateWrapElement className="review__photo">
        {authorPhoto || "Фото нет"}
      </CreateWrapElement>
      <div className="review__info">
        <div className="review__authorName">
          {authorName}
        </div>
        <div className="review__date">
          {useDateFormat(dateToCreating, new Date())}
        </div>
      </div>
      <div className="review__likeButton">
        <LikeButton checked={true} numberLikes={listWhoLikedThisReview.length}></LikeButton>
      </div>
      <div className="review__content">
        {content}
      </div>

    </div>

  )
}
