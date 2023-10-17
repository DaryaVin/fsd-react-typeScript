import React, { useState, useEffect } from 'react';
import "./profile.scss";
import { connect, ConnectedProps } from 'react-redux';
import { Button } from '../button/button';
import { FetchLogAut, FetchUserInfo, UpdateUserInfo } from "../../store/actions/authActions";
import { RootState } from '../../store/reducers/rootReducer';
import { Field } from '../field/field';
import { Form, FormFieldset } from '../form/form';
import { FlexContainer } from '../flexContainer/flexContainer';
import { ToggleButton } from '../toggleButton/toggleButton';
import { Modal } from '../modal/modal';
import { useValidationFieldForm } from '../../hooks/useValidationFieldFormReturn';
import { ValidationMessage } from '../validationMessage/validationMessage';
import { DateMaskField } from '../dateMaskField/dateMaskField';
import { FiArrowRight } from 'react-icons/fi';
import { Label } from '../label/label';
import { authAPI } from '../../interfaces/authAPI';

interface NameModelContentProps {
  firstName: string | undefined,
  lastName: string | undefined,
  onSubmit: (firstName: string, lastName: string) => void,
  [key: string]: any
};
const NameModelContent = ({ firstName, lastName, onSubmit, ...props }: NameModelContentProps) => {
  const [currentFirstName, setCurrentFirstName] = useState<string | undefined>(firstName);
  const [currentLastName, setCurrentLastName] = useState<string | undefined>(lastName);

  const firstNameValidation = useValidationFieldForm(currentFirstName, { required: "Введите свое имя, это поле обязательно для заполнения" });
  const lastNameValidation = useValidationFieldForm(currentLastName, { required: "Введите свою фамилию, это поле обязательно для заполнения" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof currentFirstName === "string"
      && typeof currentLastName === "string"
    ) {
      onSubmit(currentFirstName, currentLastName);
    }
  }
  return (
    <Form onSubmit={handleSubmit} {...props}>
      <FormFieldset>
        <label key={"labelFirstName"}>Имя:</label>
        <Field key={"firstName"}>
          <input
            type={"text"}
            value={currentFirstName}
            onChange={(e) => { setCurrentFirstName(e.target.value) }}
            placeholder="Имя"
            onBlur={() => firstNameValidation.setIsDirty(true)}
          />
        </Field>
        <ValidationMessage className="form__validationMessage" {...firstNameValidation} />
        <label key={"labelLastName"}>Фамилия:</label>
        <Field key={"lastName"} value={currentLastName} onChange={(e) => { setCurrentLastName(e.target.value) }}>
          <input
            type={"text"}
            value={currentLastName}
            onChange={(e) => { setCurrentLastName(e.target.value) }}
            placeholder="Фамилия"
            onBlur={() => lastNameValidation.setIsDirty(true)}
          />
        </Field>
        <ValidationMessage className="form__validationMessage" {...lastNameValidation} />
      </FormFieldset>
      <Button theme="withBorder" disabled={!lastNameValidation.isValid && !firstNameValidation.isValid}>Сохранить</Button>
    </Form>
  )
}

interface DateBirthdayModelContentProps {
  onSubmit: (date: Date | null) => void,
  [key: string]: any
};
const DateBirthdayModelContent = ({ onSubmit, ...props }: DateBirthdayModelContentProps) => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const dateValidation = useValidationFieldForm(currentDate, { required: "Введите свою дату рождения, это поле обязательно для заполнения" });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(currentDate);
  }
  return (
    <Form onSubmit={handleSubmit} {...props}>
      <FormFieldset>
        <label key={"labelDateBirthday"}>Дата рождения:</label>
        <Field key={"DateBirthday"}>
          <DateMaskField minDate={new Date(1, 0, 1900)} maxDate={new Date()} state={currentDate} setState={setCurrentDate}></DateMaskField>
        </Field>
        <ValidationMessage className="form__validationMessage" {...dateValidation} />
      </FormFieldset>
      <Button theme="withBorder" disabled={!dateValidation.isValid}>Сохранить</Button>
    </Form>
  )
}
interface LogAutModelContentProps {
  onSubmit: () => void,
  [key: string]: any
};
const LogAutModelContent = ({ onSubmit, ...props }: LogAutModelContentProps) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit();
  }
  return (
    <Form onSubmit={handleSubmit} {...props}>
      <FormFieldset>
        Вы уверены, что хотите выйти из своего аккаунта?
      </FormFieldset>
      <Button theme="withBorder">Хочу выйти</Button>
    </Form>
  )
}


const Prof = ({ auth, userInfo, FetchLogAut, FetchUserInfo, UpdateUserInfo }: ConnectorProps) => {
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [ModalContent, setModalContent] = useState<JSX.Element>(<></>);

  useEffect(() => {
    if (auth) {
      FetchUserInfo(auth.uid);
    }
  }, []);

  const chengeNameHendler = () => {
    const handleSubmit = (firstName: string, lastName: string) => {
      if (auth && userInfo) {
        UpdateUserInfo(auth.uid, { ...userInfo, firstName, lastName });
      }
      setIsActiveModal(false);
    }
    setModalContent(
      <NameModelContent key={"NameModelContent"}
        firstName={userInfo?.firstName}
        lastName={userInfo?.lastName}
        onSubmit={handleSubmit}
      >
      </NameModelContent>
    );
    setIsActiveModal(true);
  };
  const chengeSexHendler = () => {
    if (auth && userInfo) {
      const newSex = userInfo?.sex === "male" ? "female" : "male";
      UpdateUserInfo(auth.uid, { ...userInfo, sex: newSex });
    }
  };
  const chengeDateBirthdayHendler = () => {
    const handleSubmit = (date: Date | null) => {
      if (auth && userInfo) {
        UpdateUserInfo(auth.uid, { ...userInfo, dateBirthday: date });
      }
      setIsActiveModal(false);
    }
    setModalContent(
      <DateBirthdayModelContent key={"DateBirthdayModelContent"}
        onSubmit={handleSubmit}
      >

      </DateBirthdayModelContent>
    );
    setIsActiveModal(true);
  };
  const LogAutHendler = () => {
    const handleSubmit = () => {
      FetchLogAut();
      setIsActiveModal(false);
    }
    setModalContent(
      <LogAutModelContent key={"LogAutModelContent"}
        onSubmit={handleSubmit}
      >
      </LogAutModelContent>
    );
    setIsActiveModal(true);
  };

  const chengeSubscriptionHendler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (auth && userInfo) {
      UpdateUserInfo(auth.uid, { ...userInfo, isSubscription: e.target.checked });
    }
  };

const SendEmailVerificationHandler = () => { 
  authAPI.SendEmailVerification();
  setModalContent(
    <div>На вашу почту выслано письмо для подтверждения вашего email</div>
  );
  setIsActiveModal(true);
 }

  return (
    <div className='profile'>
      <Field theme={"card"}>
        <Form>
          <h1>Личная карточка</h1>
          <h2 key={"PersonInfoHeader"}>Персональные данные</h2>
          <FormFieldset key={"PersonInfo"}>
            <Label label='Фамилия и Имя:' key={"labelName"}>
              <FlexContainer key="Name" justifyContent="space-between">
                <span>
                  {userInfo?.lastName + " " + userInfo?.firstName}
                </span>
                <Button type="button" onClick={() => { chengeNameHendler() }}>Изменить</Button>
              </FlexContainer>
            </Label>
            <Label label='Пол:' key={"labelSex"}>
              <FlexContainer key={"Sex"} justifyContent="space-between">
                <span>
                  {
                    userInfo?.sex === "male"
                      ? "Мужчина"
                      : "Женщина"
                  }
                </span>
                <Button type="button" onClick={() => { chengeSexHendler() }}>Изменить</Button>
              </FlexContainer>
            </Label>
            <Label label='Дата рождения:' key={"labelDateBirthday"}>
              <FlexContainer key={"DateBirthday"} justifyContent="space-between">
                <span>
                  {
                    userInfo && userInfo.dateBirthday
                      ? userInfo.dateBirthday.toLocaleString('default', { day: "numeric", month: 'long', year: "numeric" })
                      : "Не известна"
                  }
                </span>
                <Button type="button" onClick={() => { chengeDateBirthdayHendler() }}>Изменить</Button>
              </FlexContainer>
            </Label>
          </FormFieldset>
          <h2 key={"ServisInfoHeader"}>Сервисные данные</h2>
          <FormFieldset key={"ServisInfo"}>
            <Label label='Email:' key={"labelEmail"}>
              <FlexContainer key={"Email"} justifyContent="space-between" columnGap={5}>
                <span>
                  {userInfo?.email || "Email не указан"}
                </span>
                {
                  auth?.emailVerified
                    ? "Подтверждена"
                    : <Button type='button' onClick={SendEmailVerificationHandler}>Подтвердить</Button>
                }
              </FlexContainer>
            </Label>
            <FlexContainer key={"Subscription"} justifyContent="space-between" columnGap={10}>
              <label key={"labelSubscription"}>Подписка на спецпредложения:</label>
              <ToggleButton checked={userInfo?.isSubscription} onChange={chengeSubscriptionHendler}></ToggleButton>
            </FlexContainer>
          </FormFieldset>
          <FlexContainer justifyContent="space-between">
            <Button key={"buttonLogaut"}
              type="button" 
              theme="withBorder"
              onClick={() => LogAutHendler()}
            >
              <span></span>
              выход
              <FiArrowRight className="loginForm__buttonArrow"></FiArrowRight>
            </Button>
          </FlexContainer>
        </Form>
      </Field>
      <Modal isActive={isActiveModal} setIsActive={setIsActiveModal}>
        {ModalContent}
      </Modal>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    auth: state.auth?.auth,
    userInfo: state.auth?.userInfo,
  })
}
const mapDispatchToProps = {
  FetchLogAut,
  FetchUserInfo,
  UpdateUserInfo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const Profile = connector(Prof);
