import React from 'react';
import { FormFieldset } from '../form/form';
import { FlexContainer } from '../flexContainer/flexContainer';
import { correctDeclensionWord } from '../correctDeclensionWord/correctDeclensionWord';
import { numberOfDaysBetweenDates } from '../numberOfDaysBetweenDates/numberOfDaysBetweenDates';


interface CostCalculationProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  price: number,
  unitPrice: string,
  startDateSate: Date,
  endDateSate: Date,
  discount: number | undefined,
  serviceFee: number,
}
export const CostCalculation = ({ price, unitPrice, startDateSate, endDateSate, discount, serviceFee, ...props }: CostCalculationProps) => {
  return (
    <>
      <FormFieldset {...props} key={"summaryInfo"}
        className={"orderForm__summaryInfo"}
      >
        <FlexContainer key={"initialAmount"}
          className={""}
          justifyContent="space-between"
        >
          <div key={"calculation"}>
            {
              price.toLocaleString()
              + unitPrice + " x "
              + numberOfDaysBetweenDates(startDateSate, endDateSate)
              + " "
              + correctDeclensionWord({
                options: {
                  1: "сутки",
                  2: "суток",
                  5: "суток"
                },
                value: numberOfDaysBetweenDates(startDateSate, endDateSate)
              })
            }
          </div>
          <div key={"result"}>
            {
              (price * numberOfDaysBetweenDates(startDateSate, endDateSate)).toLocaleString() + "₽"
            }
          </div>
        </FlexContainer>
        <FlexContainer key={"personalDiscount"}
          className={""}
          justifyContent="space-between"
        >
          <div key={"calculation"}>
            Персональная скидка:
            {
              discount
                ? " " + discount + "%"
                : " 0%"
            }
          </div>
          <div key={"result"}>
            {
              (
                "- "
                + Number(
                  (
                    (discount ? discount : 0) / 100
                    * price
                    * numberOfDaysBetweenDates(startDateSate, endDateSate)
                  )
                    .toFixed(2)
                ).toLocaleString()
              ) + unitPrice
            }
          </div>
        </FlexContainer>
        <FlexContainer key={"serviceFee"}
          className={""}
          justifyContent="space-between"
        >
          <div key={"calculation"}>
            Сервисный сбор за услуги
          </div>
          <div key={"result"}>
            {
              serviceFee.toLocaleString() + unitPrice
            }
          </div>
        </FlexContainer>
      </FormFieldset>
      <FormFieldset {...props} key={"totalAmound"}
        className={"orderForm__totalAmound"}
      >
        <FlexContainer
          justifyContent="space-between"
        >
          <h2>
            <div key={"text"} >Итого</div>
            <div key={"decor"} className='orderForm__dotDecor'></div>
            <div key={"totalAmound"}>
              {
                Number(
                  (
                    price
                    * numberOfDaysBetweenDates(startDateSate, endDateSate)
                    * (1 - (discount ? discount : 0) / 100)
                    + serviceFee
                  )
                    .toFixed(2)
                ).toLocaleString()
                + unitPrice
              }
            </div>
          </h2>
        </FlexContainer>
      </FormFieldset>
    </>
  )
}