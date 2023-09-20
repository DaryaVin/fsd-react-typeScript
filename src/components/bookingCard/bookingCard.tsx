import React, { useState } from 'react'
import { bookingItem } from '../../types/booking'
import { Field } from '../field/field'
import { FlexContainer } from '../flexContainer/flexContainer';
import { Button } from '../button/button';
import { Form, FormFieldset } from '../form/form';
import { correctDeclensionWord } from '../correctDeclensionWord/correctDeclensionWord';
import { BulletList } from '../bulletList/bulletList';
import { CostCalculation } from '../costCalculation/costCalculation';
import { NavLink } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { AddGuestForm, AddGuestFormProps } from '../addGuestForm/addGuestForm';
import { ChangeGuestForm, ChangeGuestFormProps } from '../changeGuestForm/changeGuestForm';
// import { DeleteGuestForm, DeleteGuestFormProps } from '../deleteGuestForm/deleteGuestForm';
import { BookingCancellationConfirmationForm, BookingCancellationConfirmationFormProps } from '../bookingCancellationConfirmationForm/bookingCancellationConfirmationForm';
import { PhoneChangeForm, PhoneChangeFormProps } from '../phoneChangeForm/phoneChangeForm';
import { EmailChangeForm, EmailChangeFormProps } from '../emailChangeForm/emailChangeForm';
import { DeleteGuestForm, DeleteGuestFormProps } from '../deleteGuestForm/deleteGuestForm';
import { numberOfDaysBetweenDates } from '../numberOfDaysBetweenDates/numberOfDaysBetweenDates';

type ContentModalProps = {
  type: "emailChange",
  props: EmailChangeFormProps,
} | {
  type: "phoneChange",
  props: PhoneChangeFormProps,
} | {
  type: "delGuest",
  props: DeleteGuestFormProps;
  // DeleteGuestFormProps,
} | {
  type: "changeGuest",
  props: ChangeGuestFormProps,
} | {
  type: "addGuest",
  props: AddGuestFormProps,
} | {
  type: "сancellations",
  props: BookingCancellationConfirmationFormProps,
};
const AddContentModal = ({ type, props }: ContentModalProps) => {
  switch (type) {
    case "emailChange": {
      return <EmailChangeForm {...props} />
    }
    case "phoneChange": {
      return <PhoneChangeForm {...props} />
    }
    case "delGuest": {
      return <DeleteGuestForm {...props} />
    }
    case "changeGuest": {
      return <ChangeGuestForm {...props} />
    }
    case "addGuest": {
      return <AddGuestForm {...props} />
    }
    case "сancellations": {
      return <BookingCancellationConfirmationForm {...props} />
    }
  }
}

interface BookingCardProps extends React.LiHTMLAttributes<HTMLLIElement> {
  bookingItem: bookingItem,
}
export const BookingCard = ({ bookingItem, ...props }: BookingCardProps) => {
  const {
    id,
    issueDate,
    departureDate,
    arrivalDate,
    isLux,
    isPaid,
    phone,
    emailForCommunication,
    serviceCharge,
    discount,
    roomId,
    roomName,
    guestsInfo,
    priceAtTimeOfBooking,
    unitPrice,
  } = bookingItem;
  const monthName = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const dateNow = new Date();

  const [showFullInfo, setShowFullInfo] = useState<boolean>(false);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<JSX.Element>(<></>);

  const countNumberOfGuests = (ageStatus: "children" | "adults" | "babies") => {
    return guestsInfo.reduce((sum, guest) => {
      return guest.ageStatus === ageStatus ? sum + 1 : sum;
    }, 0);
  }

  return (
    <li
      {...props}
      className={"bookingCard" + (props.className ? " " + props.className : "")}
    >
      <Field theme="card">
        <Form>
          <FlexContainer key={"header"}
            justifyContent='space-between'
            alignItems="baseline"
          >
            <div key={"info"}>
              <h2 key={"issueDate"}>
                Заказ от
                {
                  " "
                  + issueDate.getDate()
                  + " "
                  + monthName[issueDate.getMonth()]
                  + (
                    dateNow.getFullYear() !== issueDate.getFullYear()
                      ? " " + issueDate.getFullYear() + "г."
                      : ""
                  )
                }
              </h2>

              <div key={"bookingId"}>
                {
                  id
                }
              </div>
            </div>
            <Button key={"button"}
              type="button"
              theme="withBorder"
              onClick={() => {
                setIsActiveModal(true); setContentModal(
                  <AddContentModal type="сancellations"
                    props={{
                      setActiveModal: setIsActiveModal,
                      bookingId: id
                    }}
                  />
                )
              }}
            >
              Отменить
            </Button>
          </FlexContainer>
          <FormFieldset key={"roomInfo"}>
            <legend key={"header"}>Номер:</legend>
            <FlexContainer key={"info"}
              alignItems={'baseline'}
              flexDirection={'row'}
              justifyContent="space-between"
            >
              <NavLink key={"header"}
                to={"/roomPage/" + roomId}
              >

                {
                  roomName
                    ? roomName
                    : "№" + roomId
                }
                {
                  isLux && <span className='roomPage__isLux'>&nbsp; люкс</span>
                }
              </NavLink>
              <div key={"price"} className='roomPage__price'>
                <span className='roomCard__highlightedInfo'>{priceAtTimeOfBooking.toLocaleString() + unitPrice}</span>&nbsp; в сутки
              </div>
            </FlexContainer>
          </FormFieldset>
          <FormFieldset key={"DateInfo"}>
            <legend key={"header"}>Период прибывания:</legend>
            <FlexContainer key={"info"}
              justifyContent="space-between"
            >
              <span key={"Dates"}>
                {
                  arrivalDate && departureDate
                    ? arrivalDate.toLocaleDateString() + " - " + departureDate.toLocaleDateString()
                    : ""
                }
              </span>
              <span key={"amoundDays"}>
                {
                  arrivalDate && departureDate
                    ? numberOfDaysBetweenDates(arrivalDate, departureDate)
                    + " "
                    + correctDeclensionWord({
                      options: {
                        1: "сутки",
                        2: "суток",
                        5: "суток"
                      },
                      value: numberOfDaysBetweenDates(arrivalDate, departureDate)
                    })
                    : ""
                }
              </span>
            </FlexContainer>
          </FormFieldset>
          <Button key={"openFullInfoButton"}
            type="button"
            onClick={() => { setShowFullInfo(!showFullInfo) }}
          >
            {showFullInfo ? "Скрыть подробности" : "Посмотреть подробности"}
          </Button>
          {
            showFullInfo
              ? [
                <FormFieldset key={"contactEmail"}>
                  <FlexContainer
                    justifyContent="space-between"
                    alignItems='end'
                  >
                    <div key={"info"}>
                      <legend key={"header"}>Контактный  email:</legend>
                      <div key={"email"}>{emailForCommunication}</div>
                    </div>
                    <Button key={"button"}
                      type='button'
                      onClick={() => {
                        setIsActiveModal(true); setContentModal(
                          <AddContentModal type='emailChange'
                            props={{
                              email: emailForCommunication,
                              bookingId: id,
                              setActiveModal: setIsActiveModal,
                            }}
                          />
                        )
                      }}
                    >
                      Изменить
                    </Button>
                  </FlexContainer>
                </FormFieldset>,
                <FormFieldset key={"contactPhone"}>
                  <FlexContainer
                    justifyContent='space-between'
                    alignItems='end'
                  >
                    <div key={"info"}>
                      <legend key={"header"}>Контактный  телефон:</legend>
                      <div key={"phone"}>{phone ? phone : "Не указан"}</div>
                    </div>
                    <Button key={"button"}
                      type="button"
                      onClick={() => {
                        setIsActiveModal(true); setContentModal(
                          <AddContentModal type="phoneChange"
                            props={{
                              phone: phone,
                              bookingId: id,
                              setActiveModal: setIsActiveModal,
                            }}
                          />
                        )
                      }}
                    >
                      {phone ? "Изменить" : "Указать"}
                    </Button>
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

                        countNumberOfGuests("adults") + countNumberOfGuests("children") !== 0
                          ? (countNumberOfGuests("adults") + countNumberOfGuests("children"))
                          + " " + correctDeclensionWord({
                            options: {
                              1: "гость",
                              2: "гостя",
                              5: "гостей",
                            },
                            value: countNumberOfGuests("adults") + countNumberOfGuests("children")
                          })
                          + (
                            countNumberOfGuests("babies")
                              ? ", "
                              + countNumberOfGuests("babies") + " " + correctDeclensionWord({
                                options: {
                                  1: "младенец",
                                  2: "младенца",
                                  5: "младенцев",
                                },
                                value: countNumberOfGuests("babies")
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
                          <FlexContainer key={index}
                            justifyContent="space-between"
                          >
                            <span key="info">
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
                            <FlexContainer key={"buttons"}
                              flexDirection='colomn'
                            >
                              <Button key={"buttonChange"}
                                type="button"
                                onClick={() => {
                                  setIsActiveModal(true); setContentModal(
                                    <AddContentModal type="changeGuest"
                                      props={{
                                        guest,
                                        guestInddex: index,
                                        bookingId: id,
                                        setActiveModal: setIsActiveModal,
                                      }}
                                    />
                                  )
                                }}
                              >
                                Изменить
                              </Button>
                              {
                                guest.ageStatus === "babies"
                                || (
                                  guestsInfo.length > 1
                                    && guestsInfo.reduce((sum, item) => {
                                      return item.ageStatus !== "babies" ? sum + 1 : sum
                                    }, 0) > 1
                                )
                                  ? <Button key={"buttonDel"}
                                    type="button"
                                    onClick={() => {
                                      setIsActiveModal(true); setContentModal(
                                        <AddContentModal type="delGuest"
                                          props={{
                                            guest,
                                            guestIndex: index,
                                            bookingId: id,
                                            setActiveModal: setIsActiveModal,
                                          }}
                                        />
                                      )
                                    }}
                                  >
                                    Удалить
                                  </Button>
                                  : ""
                              }
                            </FlexContainer>
                          </FlexContainer>
                        )
                      })
                    }
                  </BulletList>
                  <Button key={"buttonAdd"}
                    type="button"
                    onClick={() => {
                      setIsActiveModal(true); setContentModal(
                        <AddContentModal type="addGuest"
                          props={{
                            bookingId: id,
                            setActiveModal: setIsActiveModal,
                          }}
                        />
                      )
                    }}
                  >
                    Добавить гостя
                  </Button>
                </FormFieldset>,
                <FormFieldset key={"finalPrice"}>
                  <legend key={"header"}>
                    Рассчет стоимости проживания:
                  </legend>
                  <CostCalculation key={"CostCalculation"}
                    price={priceAtTimeOfBooking}
                    unitPrice={unitPrice ? unitPrice : "руб."}
                    startDateSate={arrivalDate}
                    endDateSate={departureDate}
                    discount={discount}
                    serviceFee={serviceCharge}
                  />
                </FormFieldset>
              ]
              : ""
          }
        </Form>
      </Field>
      <Modal key={"modal"}
        isActive={isActiveModal}
        setIsActive={setIsActiveModal}
      >
        <Form >
          {contentModal}
        </Form>
      </Modal>
    </li >
  )
}