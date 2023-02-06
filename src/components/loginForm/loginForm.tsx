import React from "react";
import "./loginForm.scss";
import { Button } from "../button/button";
import { Field } from "../field/field";
import { FiArrowRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { FlexContainer } from "../flexContainer/flexContainer";
import { Form, FormFieldset } from "../form/form";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/reducers/rootReducer";
import { FetchLogin, ChangeEmailAction, ChangePasswordAction } from "../../store/actions/authActions";
import { useValidationFieldForm } from "../../hooks/useValidationFieldFormReturn";
import { ValidationMessage } from "../validationMessage/validationMessage";
import { AuthValidation } from "../authValidation/authValidation";


type LoginFormProps = {
  onSubmit?: ( email: string | undefined, password: string | undefined, event?: React.FormEvent<HTMLFormElement>,) => Promise<void> | void;
} & ConnectorProps;
const LogForm = ({
  onSubmit,
  email,
  password,
  FetchLogin,
  ChangeEmailAction,
  ChangePasswordAction,
 }: LoginFormProps) => {

  let emailValidation = useValidationFieldForm(email, {
    required: "Поле Email обязательно к заполнению",
    isEmail: "Поле Email заполненно некорректно. Введите Email в правильном формате. Например abc@abc.ru"
  });
  let passwordValidation = useValidationFieldForm(password, {
    required: "Поле пароля обязательно к заполнению",
    minLength: {
      min: 6,
      message: "Поле пароля должно содержать не меньше 6 символов"
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
     await onSubmit(email, password, event);
    } else {
      if(email && password) {
        await FetchLogin(email, password);
      }
    }
  }
  return (
    <Field theme="card" className="loginForm">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h1>Войти</h1>
        <AuthValidation></AuthValidation>
        <FormFieldset >
          <Field key={"email"}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => ChangeEmailAction(e.target.value)}
              onBlur={() => emailValidation.setIsDirty(true)}
            />
          </Field>
          <ValidationMessage className="form__validationMessage" {...emailValidation} />
          <Field key={"password"}>
            <input
              type="text"
              placeholder="Пароль"
              value={password}
              onChange={(e) => ChangePasswordAction(e.target.value)}
              onBlur={(e) => passwordValidation.setIsDirty(true)}
            />
          </Field>
          <ValidationMessage className="form__validationMessage"  {...passwordValidation} />
        </FormFieldset>
        <Button theme="fillBcg" className="loginForm__submitButton" type="submit" disabled={!passwordValidation.isValid || !emailValidation.isValid}>
          <span></span>
          Войти
          <FiArrowRight className="loginForm__buttonArrow"></FiArrowRight>
        </Button>
        <FlexContainer tagForWrap="label" justifyContent="space-between" alignItems="center">
          Нет аккаунта на Toxin?
          <Button theme="withBorder">
            <NavLink to="/registration">создать</NavLink>
          </Button>
        </FlexContainer>
      </Form>
    </Field>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    email: state.auth?.userInfo.email,
    password: state.auth?.userInfo.password,
  })
}
const mapDispatchToProps = {
  FetchLogin,
  ChangeEmailAction,
  ChangePasswordAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const LoginForm = connector(LogForm);
