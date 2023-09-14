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
import { userInfo } from '../../types/auth';
import { BulletList } from '../bulletList/bulletList';
import { WrapElementContentType } from '../createWrapElement/createWrapElement';
import ReactInputMask from 'react-input-mask';
import { bookingAPI } from '../../interfaces/bookingAPI';

const numberOfDaysBetweenDates = (date1: Date, date2: Date) => {
  return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24) + 1)
}


interface GuestInfoFormProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  guest: guestInfo,
  onChangeValueBookingForm: (newValue: Partial<guestInfo>) => void,
  setValid: (v: boolean) => void,
}
const GuestInfoForm: React.FC<GuestInfoFormProps> = ({
  guest,
  onChangeValueBookingForm,
  setValid,
  ...props
}) => {
  const firstNameValidator = useValidationFieldForm(guest.firstName, {
    required: "Поле имени обязательно к заполнению",
    onlyRussianAndEnglishLetters: true,
  })
  const lastNameValidator = useValidationFieldForm(guest.lastName, {
    required: "Поле фамилии обязательно к заполнению",
    onlyRussianAndEnglishLetters: true,
  })
  const patronymicValidator = useValidationFieldForm(guest.patronymic, {
    required: guest.patronymic === null ? false : "Поле отчества должно быть или удалено, или заполнено",
    onlyRussianAndEnglishLetters: guest.patronymic === null ? false : true,
  })
  useEffect(() => {
    setValid(firstNameValidator.isValid && lastNameValidator.isValid && patronymicValidator.isValid)
  }, [firstNameValidator.isValid, lastNameValidator.isValid, patronymicValidator.isValid]);

  return (
    <FormFieldset {...props} className={"guestInfoForm" + (props.className ? " " + props.className : "")}>
      <legend key={"ageStatus"}>
        {
          guest.ageStatus === "adults"
            ? "Взрослый"
            : guest.ageStatus === "children"
              ? "Ребенок"
              : "Младенец"
        }
      </legend>
      <Field key={"lastName"}>
        <input
          value={guest.lastName}
          placeholder='Фамилия'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValueBookingForm({ lastName: e.target.value })}
          onBlur={() => lastNameValidator.setIsDirty(true)}
        />
      </Field>
      <ValidationMessage key={"lastNameValidator"} {...lastNameValidator} />
      <Field key={"firstName"}>
        <input
          value={guest.firstName}
          placeholder='Имя'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValueBookingForm({ firstName: e.target.value })}
          onBlur={() => firstNameValidator.setIsDirty(true)}
        />
      </Field>
      <ValidationMessage key="firstNameValidator" {...firstNameValidator} />
      {
        guest.patronymic !== null
          ? <>
            <Field key={"patronymic"}>
              <input key={"input"}
                value={guest.patronymic}
                placeholder='Отчество'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValueBookingForm({ patronymic: e.target.value })}
                onBlur={() => patronymicValidator.setIsDirty(true)}
              />
              <button key={"delButton"}
                type="button"
                className=''
                onClick={() => onChangeValueBookingForm({ patronymic: null })}
              >
                Удалить отчество
              </button>
            </Field>
            <ValidationMessage key={"patronymicValidator"} {...patronymicValidator} />
          </>
          : <Button key={"addPatronymicButton"}
            type="button"
            onClick={() => onChangeValueBookingForm({ patronymic: "" })}
          >
            Добавить отчество
          </Button>
      }
    </FormFieldset>
  )
}


interface CostCalculationProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  price: number,
  unitPrice: string,
  startDateSate: Date,
  endDateSate: Date,
  userInfo: userInfo | undefined,
  designations: designations,
}
const CostCalculation = ({ price, unitPrice, startDateSate, endDateSate, userInfo, designations, ...props }: CostCalculationProps) => {
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
    </>
  )
}





type OrderFormProps = {
  roomItem: RoomItem,
  designations: designations,
} & ConnectorProps
  & React.FormHTMLAttributes<HTMLFormElement>
  ;

const Order = ({
  auth,
  settings,
  userInfo,
  roomItem,
  designations,
  ...props }: OrderFormProps) => {
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
              <GuestInfoForm key={index}
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
              {/* <input
                type="tel"
                value={orderPhone}
                onChange={(e) => { setOrderPhone(e.target.value) }}
              /> */}
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
            <BulletList>
              {
                guestsInfo.map((guest, index) => {
                  return (
                    <span>
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
                    </span>
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
                  userInfo={userInfo}
                  designations={designations}
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
            >
              Забронировать
            </Button>
            <Button key={"payButton"}
              type='button'
              theme="fillBcg"
              onClick={() => onClickBookingButton(true)}
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
  const onClickBookingButton = (isPaid: boolean) => {
    if (auth && startDateSate && endDateSate && userInfo?.email) {
      const bookingItem: bookingItem = {
        id: new Date().getTime().toString() + auth?.uid + id,
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
      }
      if (orderPhone) bookingItem.phone = orderPhone;
      bookingAPI.CreateBooking(bookingItem);
      
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
        <ValidationMessage {...stayDatesValidator} />
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
            userInfo={userInfo}
            designations={designations}
          />
          <FlexContainer key={"buttonSubmit"}
            justifyContent='space-between'
          >
            <Button
              theme="fillBcg"
              className="orderForm__submitButton"
              type="button"
              disabled={!(stayDatesValidator.isValid && numberOfGuestsValidator.isValid && auth)}
              onClick={() => { setIsActiveModal(true) }}
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
