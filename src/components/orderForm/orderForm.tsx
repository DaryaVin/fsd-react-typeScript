import React, { useState, useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { Field } from '../field/field';
import { FlexContainer } from '../flexContainer/flexContainer';
import { Form, FormFieldset } from '../form/form';
import { RoomItem } from '../../types/rooms';
import { designations } from '../../types/filterRooms';
import { Dropdown, dropButton } from '../dropdown/dropdown';
import { Label } from '../label/label';
import { DateMaskField } from '../dateMaskField/dateMaskField';
import { CalendarCard } from '../calendarCard/calendarCard';
import { correctDeclensionWord } from '../correctDeclensionWord/correctDeclensionWord';
import { NumberPicker } from '../numberPicker/numberPicker';
import { Button } from '../button/button';
import { FiArrowRight } from 'react-icons/fi';
import { useValidationFieldForm } from '../../hooks/useValidationFieldFormReturn';
import { ValidationMessage } from '../validationMessage/validationMessage';

type OrderFormProps = {
  roomItem: RoomItem,
  designations: designations,
} & ConnectorProps
  & React.FormHTMLAttributes<HTMLFormElement>
  ;

const Order = ({ settings, userInfo, roomItem, designations, ...props }: OrderFormProps) => {
  const {
    id,
    name,
    price,
    isLux,
    roomConditions
  }: RoomItem = roomItem;
  const unitPrice = designations.unitPrice ? designations.unitPrice : "pуб.";
  const [startDateSate, setStartDateSate] = useState<Date | null>(settings?.stayDates.start || null);
  const [endDateSate, setEndDateSate] = useState<Date | null>(settings?.stayDates.end || null);
  const stayDatesValidator = useValidationFieldForm([startDateSate, endDateSate], {
    required: "Отметьте даты прибывания в данном номере",
  });
  const [numberOfGuestsState, setNumberOfGuestsState] = useState<{
    adults: number;
    children: number;
    babies: number;
  }>(settings?.numberOfGuests || {
    adults: 0,
    children: 0,
    babies: 0
  });
  const numberOfGuestsValidator = useValidationFieldForm(numberOfGuestsState.adults + numberOfGuestsState.children, {
    isAboveMinimum:{
      min: 1,
      message: "В номере должен проживать хотя бы один гость, не считая младенцев"
    },
    isBelowMaximum: {
      max: roomConditions.beds,
      message: "В номере не может проживать гостей больше, чем количество спальных мест в номере"
    }
  })

  useEffect(() => {
    if (startDateSate !== null
      && endDateSate !== null
      && startDateSate > endDateSate) {
      setStartDateSate(endDateSate);
      setEndDateSate(startDateSate);
    }
  }, [startDateSate, endDateSate]);

  const numberOfDaysBetweenDates = (date1: Date, date2: Date) => {
    return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24) + 1)
  }

  return (
    <Form
    {...props}
    className={'orderForm' + (props.className ? " " + props.className : "")}
    >
      <FlexContainer key={"header"}
        alignItems={'baseline'}
        flexDirection={'row'}
        justifyContent="space-between"
      >
        <h1 key={"header"}>
          {
            name
              ? name
              : "№" + id
          }
          {
            isLux && <span className='roomPage__isLux'>&nbsp; люкс</span>
          }
        </h1>
        <div key={"price"} className='roomPage__price'>
          <span className='roomCard__highlightedInfo'>{price.toLocaleString() + unitPrice}</span>&nbsp; в сутки
        </div>
      </FlexContainer>
      <FormFieldset key={"stayDates"}>
        <Dropdown
          className='orderForm__stayDates'
          hasDropButton
          buttonBlock={[
            <FlexContainer key={"startDate"}
              flexDirection="colomn"
              rowGap={5}
            >
              <Label className={"block_size_s"} label='Дата прибытия:'>
                <Field>
                  <DateMaskField
                    state={startDateSate}
                    setState={setStartDateSate}
                    onBlur={() => { stayDatesValidator.setIsDirty(true);}}
                  />
                  {dropButton}
                </Field>
              </Label>
            </FlexContainer>,
            <FlexContainer key={"endDate"}
              flexDirection="colomn"
              justifyContent="start"
              rowGap={5}
            >
              <Label className={"block_size_s"} label='Дата выезда:'>
                <Field>
                  <DateMaskField
                    state={endDateSate}
                    setState={setEndDateSate}
                    onBlur={() =>{ stayDatesValidator.setIsDirty(true);}}
                  />
                  {dropButton}
                </Field>
              </Label>
            </FlexContainer>,
          ]}
          contenerBlock={
            <Field className='orderForm__calendarCardInDropdown' theme="card">
              <CalendarCard
                minDate={new Date()}
                state={startDateSate}
                setState={setStartDateSate}
                state2={endDateSate}
                setState2={setEndDateSate}
              />
            </Field>
          }
        />
        <ValidationMessage {...stayDatesValidator}/>
      </FormFieldset>
      <FormFieldset key={"guests"}>
        <legend key={"legend"}>гости</legend>
        <Dropdown key={"dropdown"}
          className={"orderForm__guests"}
          theme="field"
          buttonBlock={<div className='filterRoomsForm__guestsButtonBlock'>
            <div>
              {
                numberOfGuestsState.adults + numberOfGuestsState.children !== 0
                  ? numberOfGuestsState.adults + numberOfGuestsState.children + " " + correctDeclensionWord({
                    options: {
                      1: "гость",
                      2: "гостя",
                      5: "гостей",
                    },
                    value: numberOfGuestsState.adults + numberOfGuestsState.children
                  })
                  + (
                    numberOfGuestsState.babies
                      ? ", "
                      + numberOfGuestsState.babies + " " + correctDeclensionWord({
                        options: {
                          1: "младенец",
                          2: "младенца",
                          5: "младенцев",
                        },
                        value: numberOfGuestsState.babies
                      })
                      : ""
                  )
                  : "Сколько гостей"
              }
            </div>
          </div>}
          contenerBlock={<FlexContainer
            className='filterRoomsForm__guestsConteiner'
            flexDirection="colomn"
            rowGap={7}
            onBlurCapture={() => { numberOfGuestsValidator.setIsDirty(true);}}
            onMouseLeave={() => { numberOfGuestsValidator.setIsDirty(true);}} 
          >
            <FlexContainer key={"adults"}
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
            >
              <Label label='взрослые'>
                <NumberPicker
                  state={numberOfGuestsState.adults}
                  setState={(val) => setNumberOfGuestsState({ ...numberOfGuestsState, adults: val })}
                  minValue={0}
                  maxValue={roomConditions.beds}
                />
              </Label>
            </FlexContainer>
            <FlexContainer key={"children"}
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
            >
              <Label label='дети'>
                <NumberPicker
                  state={numberOfGuestsState.children}
                  setState={(val) => setNumberOfGuestsState({ ...numberOfGuestsState, children: val })}
                  minValue={0}
                  maxValue={roomConditions.beds}
                />
              </Label>
            </FlexContainer>
            <FlexContainer key={"babies"}
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
            >
              <Label label='младенцы' flexDirection="colomn">
                <NumberPicker
                  state={numberOfGuestsState.babies}
                  setState={(val) => setNumberOfGuestsState({ ...numberOfGuestsState, babies: val })}
                  minValue={0}
                />
              </Label>
            </FlexContainer>
          </FlexContainer>}
        />
        <ValidationMessage key={"validator"} {...numberOfGuestsValidator} />
      </FormFieldset>
      {
        startDateSate && endDateSate
        && <>
          <FormFieldset key={"summaryInfo"}
            className={"orderForm__summaryInfo"}
          >
            <FlexContainer key={"initialAmount"}
              className={""}
              justifyContent="space-between"
            >
              <div key={"calculation"}>
                {
                  price.toLocaleString()
                  + "₽ x "
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
                  userInfo && userInfo.personalDiscount
                    ? " " + userInfo.personalDiscount + "%"
                    : " 0%"
                }
              </div>
              <div key={"result"}>
                {
                  (
                    "- "
                    + Number(
                      (
                        (userInfo && userInfo.personalDiscount ? userInfo.personalDiscount : 0) / 100
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
                  designations.serviceFee.toLocaleString() + unitPrice
                }
              </div>
            </FlexContainer>
          </FormFieldset>
          <FormFieldset key={"totalAmound"}
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
                        * (1 - (userInfo && userInfo.personalDiscount ? userInfo.personalDiscount : 0) / 100)
                        + designations.serviceFee
                      )
                        .toFixed(2)
                    ).toLocaleString()
                    + unitPrice
                  }
                </div>
              </h2>
            </FlexContainer>
          </FormFieldset>
          <FlexContainer key={"buttonSubmit"}
            justifyContent='space-between'
          >
            <Button
              theme="fillBcg"
              className="orderForm__submitButton"
              type="submit"
              disabled={!(stayDatesValidator.isValid && numberOfGuestsValidator.isValid)}
            >
              <span></span>
              Забронировать
              <FiArrowRight className="loginForm__buttonArrow"></FiArrowRight>
            </Button>
          </FlexContainer>
        </>
      }
    </Form>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    // auth: state.auth?.auth,
    userInfo: state.auth?.userInfo,
    settings: state.filterRooms?.settings,
  })
}
const mapDispatchToProps = {
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const OrderForm = connector(Order);
