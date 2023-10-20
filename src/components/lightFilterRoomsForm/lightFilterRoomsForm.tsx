import React, { useState, useEffect } from 'react';
import {
  ChangeStayDates,
  ChangeNumberOfGuests,
  ChangePriceRange,
  ChangeRoomRules,
  ChangeFacilities,
  ChangeEquipment,
  ChangeBeds,
  ChangeBedrooms,
  ChangeBathrooms,
  FetchDesignations,
} from '../../store/actions/filterRoomsAction';
import { RootState } from '../../store/reducers/rootReducer';
import { ConnectedProps, connect } from 'react-redux';
import { Form, FormFieldset } from '../form/form';
import { Dropdown, dropButton } from '../dropdown/dropdown';
import { FlexContainer } from '../flexContainer/flexContainer';
import { Label } from '../label/label';
import { Field } from '../field/field';
import { DateMaskField } from '../dateMaskField/dateMaskField';
import { CalendarCard } from '../calendarCard/calendarCard';
import { ValidationMessage } from '../validationMessage/validationMessage';
import { NumberPicker } from '../numberPicker/numberPicker';
import { correctDeclensionWord } from '../correctDeclensionWord/correctDeclensionWord';
import { Button } from '../button/button';
import { FiArrowRight } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

type LightFilterRoomsFormProps = {
} & ConnectorProps & React.FormHTMLAttributes<HTMLFormElement>;

const LightForm = ({
  setting,
  ChangeNumberOfGuests,
  ChangeStayDates,
  ...props
}: LightFilterRoomsFormProps) => {
  const [stateStartDate, setStateStartDate] = useState<Date | null>(setting && setting.stayDates.start !== null ? setting.stayDates.start : null);
  const [stateEndDate, setStateEndDate] = useState<Date | null>(setting && setting.stayDates.end !== null ? setting.stayDates.end : null);

  const onChengeNumberPickerGuests = (key: "adults" | "children" | "babies", val: number) => {
    let newGuests = setting
      ? { ...setting.numberOfGuests }
      : {
        adults: 0,
        children: 0,
        babies: 0,
      };
    newGuests[key] = val;
    ChangeNumberOfGuests(newGuests);
  }

  useEffect(() => {
    if (stateStartDate !== null
      && stateEndDate !== null
      && stateStartDate > stateEndDate) {
      setStateStartDate(stateEndDate);
      setStateEndDate(stateStartDate);
    }
    const start = setting && stateStartDate === null ? setting.stayDates.start : stateStartDate;
    const end = setting && stateEndDate === null ? setting.stayDates.end : stateEndDate;
    ChangeStayDates({ end, start });

  }, [stateStartDate, stateEndDate]);

  return (
    <Form {...props}>
      <h1 key={"header"}>
        Найдём номера под ваши пожелания
      </h1>
      <FormFieldset key={"stayDates"}>
        <Dropdown key={"dropdown"}
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
                    state={stateStartDate}
                    setState={setStateStartDate}
                  // onBlur={() => { stayDatesValidator.setIsDirty(true); }}
                  // isClear={!!dateSelectionError}
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
                    state={stateEndDate}
                    setState={setStateEndDate}
                  // onBlur={() => { stayDatesValidator.setIsDirty(true); }}
                  // isClear={!!dateSelectionError}
                  />
                  {dropButton}
                </Field>
              </Label>
            </FlexContainer>,
          ]}
          contenerBlock={
            <Field key={"field"}
              className='orderForm__calendarCardInDropdown'
              theme="card"
              style={{
                padding: 20,
                marginTop: 10,
              }}
            >
              <CalendarCard key={"calendar"}
                minDate={new Date()}
                state={stateStartDate}
                setState={setStateStartDate}
                state2={stateEndDate}
                setState2={setStateEndDate}
              />
            </Field>
          }
        />
      </FormFieldset>
      <FormFieldset key={"guests"}>
        <legend key={"legend"}>гости</legend>
        <Dropdown key={"dropdown"}
          className={"orderForm__guests"}
          theme="field"
          buttonBlock={<div key={"buttonBlock"} className=''>
              {
                setting
                  && (setting.numberOfGuests.adults + setting.numberOfGuests.children) !== 0
                  ? setting.numberOfGuests.adults + setting.numberOfGuests.children + " " + correctDeclensionWord({
                    options: {
                      1: "гость",
                      2: "гостя",
                      5: "гостей",
                    },
                    value: setting.numberOfGuests.adults + setting.numberOfGuests.children
                  })
                  + (
                    setting.numberOfGuests.babies
                      ? ", "
                      + setting.numberOfGuests.babies + " " + correctDeclensionWord({
                        options: {
                          1: "младенец",
                          2: "младенца",
                          5: "младенцев",
                        },
                        value: setting.numberOfGuests.babies
                      })
                      : ""
                  )
                  : "Сколько гостей"
              }
          </div>}
          contenerBlock={<FlexContainer key={"contenerBlock"}
            className='filterRoomsForm__guestsConteiner'
            flexDirection="colomn"
            rowGap={7}
          >
            <FlexContainer key={"adults"}
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
            >
              <Label label='взрослые'>
                <NumberPicker
                  state={setting?.numberOfGuests?.adults}
                  setState={(val) => onChengeNumberPickerGuests("adults", val)}
                  minValue={0}
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
                  state={setting?.numberOfGuests?.children}
                  setState={(val) => onChengeNumberPickerGuests("children", val)}
                  minValue={0}
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
                  state={setting?.numberOfGuests?.babies}
                  setState={(val) => onChengeNumberPickerGuests("babies", val)}
                  minValue={0}
                />
              </Label>
            </FlexContainer>
          </FlexContainer>}
        />
      </FormFieldset>
      <NavLink key={"link"}
      to={"/search-rooms"}
      >
      <Button key={"buttonForm"}
        type='button'
        theme='fillBcg'
      >
        <FlexContainer
          justifyContent='space-between'
        >
          <span key={"halpBlock"}></span>
          <span key={"text"}>Подрбрать номер</span>
          <FiArrowRight key={"icon"} className='loginForm__buttonArrow' />
        </FlexContainer>
      </Button>
      </NavLink>
    </Form>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    setting: state.filterRooms?.settings,
    // designations: state.filterRooms?.designations,
    isLoading: state.filterRooms?.isLoading
  })
}
const mapDispatchToProps = {
  ChangeStayDates,
  ChangeNumberOfGuests,
  ChangePriceRange,
  ChangeRoomRules,
  ChangeFacilities,
  ChangeEquipment,
  ChangeBeds,
  ChangeBedrooms,
  ChangeBathrooms,
  FetchDesignations,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const LightFilterRoomsForm = connector(LightForm);
