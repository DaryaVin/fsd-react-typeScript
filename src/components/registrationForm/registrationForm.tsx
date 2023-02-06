import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  ChangeEmailAction,
  ChangePasswordAction,
  ChangeFirstNameAction,
  ChangeLastNameAction,
  ChangeSexAction,
  ChangeDateBirthdayAction,
  ChangeIsSubscriptionAction,
  FetchRegistration,
} from "../../store/actions/authActions";
import { Controller, useForm } from 'react-hook-form';
import { FiArrowRight } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { Button } from '../button/button';
import { DateMaskField } from '../dateMaskField/dateMaskField';
import { Field } from '../field/field';
import { FlexContainer } from '../flexContainer/flexContainer';
import { FormFieldset, Form } from '../form/form';
import { RadioButton } from '../radioButton/radioButton';
import { ToggleButton } from '../toggleButton/toggleButton';
import { RootState } from '../../store/reducers/rootReducer';
import { useValidationFieldForm } from '../../hooks/useValidationFieldFormReturn';
import { ValidationMessage } from '../validationMessage/validationMessage';
import { AuthValidation } from '../authValidation/authValidation';


type RegistrationFormProps = {
  onSubmit?: (event?: React.FormEvent<HTMLFormElement>, userInfo?: any) => Promise<void> | void;
} & ConnectorProps;
const RegForm = ({
  onSubmit,
  userInfo,
  ChangeEmailAction,
  ChangePasswordAction,
  ChangeFirstNameAction,
  ChangeLastNameAction,
  ChangeSexAction,
  ChangeDateBirthdayAction,
  ChangeIsSubscriptionAction,
  FetchRegistration,
}: RegistrationFormProps) => {

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors},
  // } = useForm({
  //   mode: "onChange"
  // });

  // return (
  //   <Field theme="card" className="loginForm">
  //       <Form onSubmit={handleSubmit(onSubmit)}>
  //         <h1>Регистрация аккаунта</h1>
  //         <FormFieldset key={"personInfo"}>
  //           <Controller
  //             name='firstname'
  //             control={control}
  //             render={({
  //               field: { onChange }
  //             }) => (
  //               <Field key={"firstName"}>
  //                 <input
  //                   type="text"
  //                   placeholder="Имя"
  //                   value={userInfo?.firstName}
  //                   onChange={(e) => { ChangeFirstNameAction(e.target.value); onChange(e); }}
  //                 />
  //               </Field>
  //             )}
  //           />
  //           <div key={"firstnameErrors"}>
  //             {
  //               errors?.firstname
  //               && <p>{errors?.firstname?.message || "В поле допущена ошибка!"}</p>
  //             }
  //           </div>
  //           <Controller
  //             name='lastname'
  //             control={control}
  //             render={({
  //               field: { onChange }
  //             }) => (
  //               <Field key={"lastName"}>
  //                 <input
  //                   type="text"
  //                   placeholder="Фамилия"
  //                   value={userInfo?.lastName}
  //                   onChange={(e) => { ChangeLastNameAction(e.target.value); onChange(e); }}
  //                 />
  //               </Field>
  //             )}
  //           />
  //           <div key={"lastnameErrors"}>
  //             {
  //               errors?.lastname
  //               && <p>{errors?.lastname?.message || "В поле допущена ошибка!"}</p>
  //             }
  //           </div>
  //           <FlexContainer key={"sex"}
  //             justifyContent="start"
  //             columnGap={20}
  //           >
  //             <Controller
  //               key={"male"}
  //               name='sex'
  //               control={control}
  //               render={({
  //                 field: { onChange },
  //               }) => (
  //                 <RadioButton
  //                   value={"male"}
  //                   checked={userInfo?.sex === "male" ? true : false}
  //                   onChange={(e) => { if (e.target.checked) ChangeSexAction("male"); onChange(e); }}
  //                 >
  //                   Мужчина
  //                 </RadioButton>
  //               )}
  //             />
  //             <Controller
  //               key={"female"}
  //               name='sex'
  //               control={control}
  //               render={({
  //                 field: { onChange },
  //               }) => (
  //                 <RadioButton
  //                   value={"female"}
  //                   checked={userInfo?.sex === "female" ? true : false}
  //                   onChange={(e) => { if (e.target.checked) ChangeSexAction("female"); onChange(e); }}
  //                 >
  //                   Женщина
  //                 </RadioButton>
  //               )}
  //             />
  //           </FlexContainer>
  //           <div key={"sexErrors"}>
  //             {
  //               errors?.sex
  //               && <p>{errors?.sex?.message || "В поле допущена ошибка!"}</p>
  //             }
  //           </div>
  //         </FormFieldset>
  //         <FormFieldset key={"birthday"}>
  //           <legend key={"label"}>Дата рождения</legend>
  //           <Controller
  //             name="birthday"
  //             key={"field"}
  //             control={control}
  //             render={({
  //               field: { onChange }
  //             }) => (
  //               <Field>
  //                 <DateMaskField
  //                   state={userInfo?.dateBirthday ? userInfo.dateBirthday : null}
  //                   setState={(date) => { ChangeDateBirthdayAction(date); onChange(date) }}
  //                   minDate={new Date(1900, 0, 0)}
  //                   maxDate={new Date()}
  //                 />
  //               </Field>
  //             )}
  //           />
  //           <div key={"birthdayErrors"}>
  //             {
  //               errors?.birthday
  //               && <p>{errors?.birthday?.message || "В поле допущена ошибка!"}</p>
  //             }
  //           </div>
  //         </FormFieldset>
  //         <FormFieldset key={"forServesInfo"}>
  //           <legend>Данные для входа в сервис</legend>
  //           <Controller
  //             name="email"
  //             key={"email"}
  //             rules={{ required: "Поле почты обязательно для заполнения", }}
  //             control={control}
  //             render={({
  //               field: { onChange }
  //             }) => (
  //               <Field>
  //                 <input
  //                   value={userInfo?.email}
  //                   type="text"
  //                   placeholder="Email"
  //                   onChange={(e) => { ChangeEmailAction(e.target.value); onChange(e) }}
  //                 />
  //               </Field>
  //             )}
  //           />
  //           <div key={"emailErrors"}>
  //             {
  //               errors?.email
  //               && <p>{errors?.email?.message || "В поле допущена ошибка!"}</p>
  //             }
  //           </div>
  //           <Controller
  //             name="password"
  //             key={"password"}
  //             rules={{ required: "Поле пароля обязательно для заполнения", }}
  //             control={control}
  //             render={({
  //               field: { onChange }
  //             }) => (
  //               <Field>
  //                 <input
  //                   value={userInfo?.password}
  //                   type="text"
  //                   placeholder="Пароль"
  //                   onChange={(e) => { ChangePasswordAction(e.target.value); onChange(e) }}
  //                 />
  //               </Field>
  //             )}
  //           />
  //           <div key={"passwordErrors"}>
  //             {
  //               errors?.password
  //               && <p>{errors?.password?.message || "В поле допущена ошибка!"}</p>
  //             }
  //           </div>
  //           <Controller
  //             name='isSubscribed'
  //             key={'isSubscribed'}
  //             control={control}
  //             defaultValue={false}
  //             render={({
  //               field: { onChange },
  //             }) => (
  //               <ToggleButton
  //                 onChange={(e) => { ChangeIsSubscriptionAction(e.target.checked); onChange(e) }}
  //                 checked={userInfo?.isSubscription}
  //               >
  //                 Получать спецпредложения
  //               </ToggleButton>
  //             )}
  //           />
  //           <div key={"isSubscribedErrors"}>
  //             {
  //               errors?.isSubscribed
  //               && <p>{errors?.isSubscribed?.message || "В поле допущена ошибка!"}</p>
  //             }
  //           </div>
  //         </FormFieldset>
  //         <Button key={"buttonSubmit"}
  //           theme="fillBcg"
  //           className="loginForm__submitButton"
  //           type="submit"
  //           disabled={(!userInfo?.email || !userInfo?.password) && !errors}
  //         >
  //           <span></span>
  //           Зарегистрироваться
  //           <FiArrowRight className="loginForm__buttonArrow"></FiArrowRight>
  //         </Button>
  //         <FlexContainer key={"helpInfo"}
  //           tagForWrap="label"
  //           justifyContent="space-between"
  //           alignItems="center"
  //         >
  //           Уже есть аккаунт на Toxin
  //           <Button theme="withBorder">
  //             <NavLink to="/login">войти</NavLink>
  //           </Button>
  //         </FlexContainer>
  //       </Form>
  //     </Field>
  // )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      await onSubmit(event, userInfo);
    } else {
      if (userInfo) {
        await FetchRegistration(userInfo?.email, userInfo?.password);
      }
    }
  }

  const firstNameValidation = useValidationFieldForm(userInfo?.firstName, {required: "Введите свое имя, это поле обязательно для заполнения"});
  const lastNameValidation = useValidationFieldForm(userInfo?.lastName, {required: "Введите свою фамилию, это поле обязательно для заполнения"});
  const sexValidation = useValidationFieldForm(userInfo?.sex, {required:"Выбирете свой пол"});
  const dateBirthdayValidation = useValidationFieldForm(userInfo?.dateBirthday, {required:"Укажите дату своего рождения"});
  const emailValidation = useValidationFieldForm(userInfo?.email, {
    required: "Поле Email обязательно к заполнению",
    isEmail: "Поле Email заполненно некорректно. Введите Email в правильном формате. Например abc@abc.ru"
  });
  const passwordValidation = useValidationFieldForm(userInfo?.password, {
    required: "Поле пароля обязательно к заполнению",
    minLength: {
      min: 6,
      message: "Поле пароля должно содержать не меньше 6 символов"
    }
  });

  return (
    <Field theme="card" className="loginForm">
      <Form onSubmit={handleSubmit}>
        <h1>Регистрация аккаунта</h1>
        <AuthValidation></AuthValidation>
        <FormFieldset key={"personInfo"}>
          <Field key={"firstName"}>
            <input
              type="text"
              placeholder="Имя"
              value={userInfo?.firstName}
              onChange={(e) => { ChangeFirstNameAction(e.target.value); }}
              onBlur={() => firstNameValidation.setIsDirty(true)}
            />
          </Field>
          <ValidationMessage className="form__validationMessage" {...firstNameValidation} />
          <Field key={"lastName"}>
            <input
              type="text"
              placeholder="Фамилия"
              value={userInfo?.lastName}
              onChange={(e) => { ChangeLastNameAction(e.target.value); }}
              onBlur={() => lastNameValidation.setIsDirty(true)}
            />
          </Field>
          <ValidationMessage className="form__validationMessage" {...lastNameValidation} />
          <FlexContainer key={"sex"}
            justifyContent="start"
            columnGap={20}
          >
            <RadioButton
              value={"male"}
              checked={userInfo?.sex === "male" ? true : false}
              onChange={(e) => { if (e.target.checked) ChangeSexAction("male"); }}
              onBlur={(e) => {sexValidation.setIsDirty(true)}}
            >
              Мужчина
            </RadioButton>
            <RadioButton
              value={"female"}
              checked={userInfo?.sex === "female" ? true : false}
              onChange={(e) => { if (e.target.checked) ChangeSexAction("female"); }}
              onBlur={(e) => {sexValidation.setIsDirty(true)}}
            >
              Женщина
            </RadioButton>
          </FlexContainer>
          <ValidationMessage className="form__validationMessage" {...sexValidation}/>
        </FormFieldset>
        <FormFieldset key={"birthday"}>
          <legend key={"label"}>Дата рождения</legend>
          <Field>
            <DateMaskField
              state={userInfo?.dateBirthday ? userInfo.dateBirthday : null}
              setState={(date) => { ChangeDateBirthdayAction(date); }}
              minDate={new Date(1900, 0, 1)}
              maxDate={new Date()}
              onBlur={(e) => {dateBirthdayValidation.setIsDirty(true)}}
            />
          </Field>
          <ValidationMessage className="form__validationMessage" {...dateBirthdayValidation}/>
        </FormFieldset>
        <FormFieldset key={"forServesInfo"}>
          <legend>Данные для входа в сервис</legend>
          <Field key={"email"}>
            <input
              value={userInfo?.email}
              type="text"
              placeholder="Email"
              onChange={(e) => { ChangeEmailAction(e.target.value); }}
              onBlur={(e) => {emailValidation.setIsDirty(true)}}
            />
          </Field>
          <ValidationMessage className="form__validationMessage" {...emailValidation}/>
          <Field key={"password"}>
            <input
              value={userInfo?.password}
              type="text"
              placeholder="Пароль"
              onChange={(e) => { ChangePasswordAction(e.target.value); }}
              onBlur={(e) => {passwordValidation.setIsDirty(true)}}
            />
          </Field>
          <ValidationMessage className="form__validationMessage"  {...passwordValidation}/>
          <ToggleButton key={"isSubscription"}
            onChange={(e) => { ChangeIsSubscriptionAction(e.target.checked); }}
            checked={userInfo?.isSubscription}
          >
            Получать спецпредложения
          </ToggleButton>
        </FormFieldset>
        <Button key={"buttonSubmit"}
          theme="fillBcg"
          className="loginForm__submitButton"
          type="submit"
          disabled={!(
            firstNameValidation.isValid
            && lastNameValidation.isValid
            && sexValidation.isValid
            && dateBirthdayValidation.isValid
            && emailValidation.isValid
            && passwordValidation.isValid
          )}
        >
          <span></span>
          Зарегистрироваться
          <FiArrowRight className="loginForm__buttonArrow"></FiArrowRight>
        </Button>
        <FlexContainer key={"helpInfo"}
          tagForWrap="label"
          justifyContent="space-between"
          alignItems="center"
        >
          Уже есть аккаунт на Toxin
          <Button theme="withBorder">
            <NavLink to="/login">войти</NavLink>
          </Button>
        </FlexContainer>
      </Form>
    </Field>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    userInfo: state.auth?.userInfo,
  })
}
const mapDispatchToProps = {
  ChangeEmailAction,
  ChangePasswordAction,
  ChangeFirstNameAction,
  ChangeLastNameAction,
  ChangeSexAction,
  ChangeDateBirthdayAction,
  ChangeIsSubscriptionAction,
  FetchRegistration,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const RegistrationForm = connector(RegForm);
