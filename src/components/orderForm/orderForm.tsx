import React, { useState, useEffect } from 'react';
import "./orderForm.scss";
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { Field } from '../field/field';
import { FlexContainer } from '../flexContainer/flexContainer';
import { Form, FormFieldset } from '../form/form';
import { RoomItem } from '../../types/rooms';
import { designations, numberOfGuests } from '../../types/filterRooms';
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
import { bookingItem, guestInfo } from '../../types/booking';
import { Modal } from '../modal/modal';
import { BulletList } from '../bulletList/bulletList';
import { WrapElementContentType } from '../createWrapElement/createWrapElement';
import ReactInputMask from 'react-input-mask';
import { bookingAPI } from '../../interfaces/bookingAPI';
import { CostCalculation } from '../costCalculation/costCalculation';
import { GuestFullNameForm } from '../guestFullNameForm/guestFullNameForm';
import { numberOfDaysBetweenDates } from '../numberOfDaysBetweenDates/numberOfDaysBetweenDates';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarTileProperties } from 'react-calendar';
import { BulletItem } from '../bulletItem/bulletItem';

type OrderFormProps = {
  roomItem: RoomItem,
  designations: designations,
  roomBookings: bookingItem[],
} & ConnectorProps
  & React.FormHTMLAttributes<HTMLFormElement>
  ;

const Order = ({
  auth,
  settings,
  userInfo,
  roomItem,
  designations,
  roomBookings,
  ...props }: OrderFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    id,
    name,
    price,
    isLux,
    roomConditions
  }: RoomItem = roomItem;
  const unitPrice = designations.unitPrice ? designations.unitPrice : "pуб.";
  const [startDateSate, setStartDateSate] = useState<Date | null>(null);
  const [endDateSate, setEndDateSate] = useState<Date | null>(null);
  const [numberOfGuestsState, setNumberOfGuestsState] = useState<numberOfGuests>({
    adults: 0,
    children: 0,
    babies: 0
  });
  const [guestsInfo, setGuestsInfo] = useState<guestInfo[]>([]);
  const [orderEmail, setOrderEmail] = useState<string>(userInfo?.email ? userInfo.email : "");
  const [orderPhone, setOrderPhone] = useState<string>("");
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateSelectionError, setDateSelectionError] = useState<string>("");

  const stayDatesValidator = useValidationFieldForm([startDateSate, endDateSate], {
    required: "Отметьте даты прибывания в данном номере",
  });
  const numberOfGuestsValidator = useValidationFieldForm(numberOfGuestsState.adults + numberOfGuestsState.children, {
    isAboveMinimum: {
      min: 1,
      message: "В номере должен проживать хотя бы один гость, не считая младенцев"
    },
    isBelowMaximum: {
      max: roomConditions.beds,
      message: "В номере не может проживать гостей больше, чем количество спальных мест в номере"
    }
  })

useEffect(() => {
  if (dateSelectionError !== "" && startDateSate !== null && endDateSate !== null) setDateSelectionError("");

  // return () => {
    
  // }
}, [startDateSate, endDateSate])


  const tileDisabled = (tile: CalendarTileProperties) => {
    let isDisabel = false;
    roomBookings.forEach((booking) => {
      if (tile.date >= booking.arrivalDate && tile.date <= booking.departureDate) {
        isDisabel = true;
      }
    })
    return isDisabel;
  }
  const onChangeCalendarStayDate = (value: Date | [Date] | [Date, Date]) => {
    if (Array.isArray(value) && value.length === 2) {
      roomBookings.forEach((booking) => {
        if (value[0] <= booking.arrivalDate && value[1] >= booking.departureDate) {
          // console.log("onChangeCalendarStayDate roomBookings.forEach");
          setStartDateSate(null);
          setEndDateSate(null);
          setDateSelectionError("В выбранном периоде находятся недоступные даты, пожалуйста, выберите другой период");
        }
      })
    }
  }
  const [isValidGuestsInfo, setIsValidGuestsInfo] = useState<boolean[]>(new Array(guestsInfo.length).fill(true));
  const orderEmailValidator = useValidationFieldForm(orderEmail, {
    required: "Email является обязательной информацией для оформления брони номера",
    isEmail: true,
  })
  const orderPhoneValidator = useValidationFieldForm(orderPhone, {
    isPhone: true,
  })

  const [modulePage, setModulePage] = useState<1 | 2 | 3>(1);
  const onChangeValueGuestsInfoForm = (indexGuest: number) => {
    return (newValue: Partial<guestInfo>) => {
      setGuestsInfo(
        guestsInfo.map((guest, index) => {
          return index === indexGuest ? { ...guest, ...newValue } : guest;
        })
      )
    }
  }
  const changeValidGuestsInfoForm = (indexGuest: number) => {
    return (newValue: boolean) => {
      const newValidArr = [...isValidGuestsInfo];
      newValidArr[indexGuest] = newValue;
      setIsValidGuestsInfo(newValidArr);

    }
  }
  const moduleContent = () => {
    let formContent: WrapElementContentType[] = [];
    switch (modulePage) {
      case 1: {
        formContent = [
          <h2 key={"header"}>Заполните информацию о гостях:</h2>,
          guestsInfo.map((guest, index) => {
            return (
              <GuestFullNameForm key={index}
                guest={guest}
                onChangeValueBookingForm={onChangeValueGuestsInfoForm(index)}
                setValid={changeValidGuestsInfoForm(index)}
              />
            )
          }),
          <Button key={"ButtonNext"}
            type="button"
            theme="withBorder"
            disabled={!isValidGuestsInfo.reduce((sumValid, item) => {
              return sumValid && item
            }, true)}
            onClick={() => setModulePage(2)}
          >
            Далее
          </Button>
        ];
        break;
      }
      case 2: {
        formContent = [
          <Button key={"ButtonPrev"}
            type="button"
            theme="withBorder"
            onClick={() => setModulePage(1)}
          >
            Назад
          </Button>,
          <h2 key={"header"}>Заполните контактную информацию:</h2>,
          <FormFieldset key={"mail"}>
            <legend key={"header"}>
              Email:
            </legend>
            <Field>
              <input
                type="email"
                value={orderEmail}
                onChange={(e) => { setOrderEmail(e.target.value) }}
                onBlur={() => orderEmailValidator.setIsDirty(true)}
              />
            </Field>
            <ValidationMessage {...orderEmailValidator} />
          </FormFieldset>,
          <FormFieldset key={"phone"}>
            <legend key={"header"}>
              Телефон (необязательно):
            </legend>
            <Field>
              <ReactInputMask
                mask={"+9-999-999-99-99"}
                placeholder='+_ ___ ___ __ __'
                value={orderPhone}
                onChange={(e) => { setOrderPhone(e.target.value) }}
                onBlur={() => orderPhoneValidator.setIsDirty(true)}
              />
            </Field>
            {
              orderPhone ? <ValidationMessage {...orderPhoneValidator} /> : ""
            }
          </FormFieldset>,
          <Button key={"ButtonNext"}
            type="button"
            theme="withBorder"
            disabled={!(orderEmailValidator.isValid && (orderPhoneValidator.isValid || !orderPhone))}
            onClick={() => setModulePage(3)}
          >
            Далее
          </Button>
        ];
        break;
      }
      case 3: {
        formContent = [
          <Button key={"ButtonPrev"}
            type="button"
            theme="withBorder"
            onClick={() => setModulePage(2)}
          >
            Назад
          </Button>,
          <h2 key={"header"}>Итоговая сводка бронирования:</h2>,
          <FormFieldset key={"contactEmail"}>
            <legend key={"header"}>Контактный  email:</legend>
            <div key={"email"}>{orderEmail}</div>
          </FormFieldset>,
          orderPhone
            ? <FormFieldset key={"contactPhone"}>
              <legend key={"header"}>Контактный  телефон:</legend>
              <div key={"phone"}>{orderPhone}</div>
            </FormFieldset>
            : "",
          <FormFieldset key={"roomInfo"}>
            <legend key={"header"}>Номер:</legend>
            <FlexContainer key={"info"}
              alignItems={'baseline'}
              flexDirection={'row'}
              justifyContent="space-between"
            >
              <div key={"header"}>

                {
                  name
                    ? name
                    : "№" + id
                }
                {
                  isLux && <span className='roomPage__isLux'>&nbsp; люкс</span>
                }
              </div>
              <div key={"price"} className='roomPage__price'>
                <span className='roomCard__highlightedInfo'>{price.toLocaleString() + unitPrice}</span>&nbsp; в сутки
              </div>
            </FlexContainer>
          </FormFieldset>,
          <FormFieldset key={"DateInfo"}>
            <legend key={"header"}>Период прибывания:</legend>
            <FlexContainer key={"info"}
              justifyContent="space-between"
            >
              <span key={"Dates"}>
                {
                  startDateSate && endDateSate
                    ? startDateSate.toLocaleDateString() + " - " + endDateSate.toLocaleDateString()
                    : ""
                }
              </span>
              <span key={"amoundDays"}>
                {
                  startDateSate && endDateSate
                    ? numberOfDaysBetweenDates(startDateSate, endDateSate)
                    + " "
                    + correctDeclensionWord({
                      options: {
                        1: "сутки",
                        2: "суток",
                        5: "суток"
                      },
                      value: numberOfDaysBetweenDates(startDateSate, endDateSate)
                    })
                    : ""
                }
              </span>
            </FlexContainer>
          </FormFieldset>,
          <FormFieldset key={"guests"}>
            <FlexContainer key={"generalInfo"}
              justifyContent="space-between"
            >
              <legend key={"header"}>
                Гости:
              </legend>
              <div key={"numberOfGuests"}>
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
                    : "Ошибка, номер не может быть забронирован без гостей!!"
                }
              </div>
            </FlexContainer>
            <BulletList key={"guestList"}>
              {
                guestsInfo.map((guest, index) => {
                  return (
                    <BulletItem key={index}>
                      {
                        (
                          guest.ageStatus === "adults"
                            ? "Взрослый"
                            : guest.ageStatus === "children"
                              ? "Ребенок"
                              : "Младенец"
                        ) + ", "
                        + guest.lastName.toLocaleUpperCase() + " "
                        + guest.firstName.toLocaleUpperCase() + " "
                        + (
                          guest.patronymic
                            ? guest.patronymic.toLocaleUpperCase()
                            : ""
                        )
                      }
                    </BulletItem>
                  )
                })
              }
            </BulletList>
          </FormFieldset>,
          <FormFieldset key={"finalPrice"}>
            <legend key={"header"}>
              Рассчет стоимости проживания:
            </legend>
            {
              startDateSate && endDateSate
                ? <CostCalculation key={"CostCalculation"}
                  price={price}
                  unitPrice={unitPrice}
                  startDateSate={startDateSate}
                  endDateSate={endDateSate}
                  discount={userInfo?.personalDiscount}
                  serviceFee={designations.serviceFee}
                />
                : ""
            }
          </FormFieldset>,
          <FlexContainer key={"buttons"}
            justifyContent="space-between"
          >
            <Button key={"bookingButton"}
              type="button"
              theme="withBorder"
              onClick={() => onClickBookingButton(false)}
              disabled={isLoading}
            >
              Забронировать
            </Button>
            <Button key={"payButton"}
              type='button'
              theme="fillBcg"
              onClick={() => onClickBookingButton(true)}
              disabled={isLoading}
            >
              Оплатить
            </Button>
          </FlexContainer>,
        ];
        break;
      }
    }
    return formContent
  }
  const onClickBookingButton = async (isPaid: boolean) => {
    const hashCode = (str: string, seed = 0) => {
      let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
      for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
      }
      h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
      h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
      h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
      h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

      return String(4294967296 * (2097151 & h2) + (h1 >>> 0));
    };
    if (auth && startDateSate && endDateSate && userInfo?.email) {
      const bookingItem: bookingItem = {
        id: hashCode(new Date().getTime().toString() + auth?.uid + id),
        userId: auth?.uid,
        roomId: String(id),
        arrivalDate: startDateSate,
        departureDate: endDateSate,
        issueDate: new Date(),
        emailForCommunication: orderEmail,
        serviceCharge: designations.serviceFee,
        discount: userInfo.personalDiscount,
        guestsInfo,
        isPaid,
        priceAtTimeOfBooking: price,
        unitPrice,
        status: "booking",
      }
      if (orderPhone) bookingItem.phone = orderPhone;
      await setIsLoading(true);
      try {
        await bookingAPI.CreateBooking(bookingItem);
        navigate("/orders");
      } catch (error) {
        alert("Попытка бронирования провалена");
      }
      await setIsLoading(false);
    }

  }


  useEffect(() => {
    const newGuestInfo: guestInfo[] = [];
    for (let index = 0; index < numberOfGuestsState.adults; index++) {
      newGuestInfo.push({
        firstName: "",
        lastName: "",
        patronymic: "",
        ageStatus: "adults"
      });
    }
    for (let index = 0; index < numberOfGuestsState.children; index++) {
      newGuestInfo.push({
        firstName: "",
        lastName: "",
        patronymic: "",
        ageStatus: "children"
      });
    }
    for (let index = 0; index < numberOfGuestsState.babies; index++) {
      newGuestInfo.push({
        firstName: "",
        lastName: "",
        patronymic: "",
        ageStatus: "babies"
      });
    }
    setGuestsInfo(newGuestInfo);
    setModulePage(1);
  }, [numberOfGuestsState]);
  useEffect(() => {
    if (startDateSate !== null
      && endDateSate !== null
      && startDateSate > endDateSate) {
      setStartDateSate(endDateSate);
      setEndDateSate(startDateSate);
    }
  }, [startDateSate, endDateSate]);

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
        <div key={"DateError"}>{dateSelectionError}</div>
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
                    onBlur={() => { stayDatesValidator.setIsDirty(true); }}
                    isClear={!!dateSelectionError}
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
                    onBlur={() => { stayDatesValidator.setIsDirty(true); }}
                    isClear={!!dateSelectionError}
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
                onChangeValue={onChangeCalendarStayDate}
                propsForCalendar={{
                  tileDisabled: tileDisabled,
                }}
              />
            </Field>
          }
        />
        <ValidationMessage key={"validator"} {...stayDatesValidator} />
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
            onBlurCapture={() => { numberOfGuestsValidator.setIsDirty(true); }}
            onMouseLeave={() => { numberOfGuestsValidator.setIsDirty(true); }}
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
          <CostCalculation
            price={price}
            unitPrice={unitPrice}
            startDateSate={startDateSate}
            endDateSate={endDateSate}
            discount={userInfo?.personalDiscount}
            serviceFee={designations.serviceFee}
          />
          <FlexContainer key={"buttonSubmit"}
            justifyContent='space-between'
          >
            <Button
              theme="fillBcg"
              className="orderForm__submitButton"
              type="button"
              disabled={!(stayDatesValidator.isValid && numberOfGuestsValidator.isValid)}
              onClick={() => {
                if (auth) {
                  setIsActiveModal(true)
                } else {
                  navigate("/login", { state: { prevPathName: location.pathname } })
                }
              }}
            >
              <span></span>
              Забронировать
              <FiArrowRight className="loginForm__buttonArrow"></FiArrowRight>
            </Button>
          </FlexContainer>
        </>
      }
      <Modal isActive={isActiveModal} setIsActive={setIsActiveModal}>
        <Form key={"form"} className={"bookingForm__form"}>
          {moduleContent()}
        </Form>
      </Modal>
    </Form>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    auth: state.auth?.auth,
    userInfo: state.auth?.userInfo,
    settings: state.filterRooms?.settings,
  })
}
const mapDispatchToProps = {
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const OrderForm = connector(Order);
