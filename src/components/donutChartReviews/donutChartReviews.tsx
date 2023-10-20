import React from 'react';
import "./donutChartReviews.scss";
import { Chart } from 'react-google-charts';
import { ReviewItem } from '../../types/rooms';
import { correctDeclensionWord } from '../correctDeclensionWord/correctDeclensionWord';

interface DonutChartReviewsProps extends React.HTMLAttributes<HTMLDivElement> {
  reviews: ReviewItem[],
}
export const DonutChartReviews = ({ reviews, ...props }: DonutChartReviewsProps) => {
  const data = [
    ["Оценка", "Количество отзывов"],
    [
      "Разочарован",
      reviews.reduce((sum, review) => {
        return review.appraisal === 1 || review.appraisal === 2 ? sum + 1 : sum
      }, 0)
    ],
    [
      "Удовлетворительно", 
      reviews.reduce((sum, review) => {
        return review.appraisal === 3 ? sum + 1 : sum
      }, 0)
  ],
    [
      "Хорошо", 
      reviews.reduce((sum, review) => {
        return review.appraisal === 4 ? sum + 1 : sum
      }, 0)
    ],
    [
      "Великолепно", 
      reviews.reduce((sum, review) => {
        return review.appraisal === 5 ? sum + 1 : sum
      }, 0)
  ],
  ]
  return (
    <div {...props} className={'donutChartReviews' + (props.className ? " " + props.className : "")}>

      <Chart key={"donut"}
        className="donutChartReviews__donut"
        chartLanguage='ru-Ru'
        height={"240px"}
        width={"320px"}
        chartType="PieChart"
        loader={<div>Загрузка диаграмы отзывов...</div>}
        data={data}
        options={{
          // backgroundColor: "red",
          colors: ["919191", "BC9CFF", "6FCF97", "FFE39C"],
          pieHole: 0.9,
        }}
      />
      <div key={"signature"} className='donutChartReviews__signature'>
        {
          reviews.length + " "
          + correctDeclensionWord({
            options: {
              1: "голос",
              2: "голоса",
              5: "голосов",
            },
            value: reviews.length,
          })
        }
      </div>
    </div>
  )
}
