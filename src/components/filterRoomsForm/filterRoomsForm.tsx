import React, { useEffect, useState } from 'react';
import "./filterRoomsForm.scss";
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
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
import { DateMaskField } from '../dateMaskField/dateMaskField';
import { Dropdown } from '../dropdown/dropdown';
import { Field } from '../field/field';
import { Form, FormFieldset } from '../form/form';
import { FlexContainer } from '../flexContainer/flexContainer';
import { CalendarCard } from '../calendarCard/calendarCard';
import { Label } from '../label/label';
import { NumberPicker } from '../numberPicker/numberPicker';
import { correctDeclensionWord } from '../correctDeclensionWord/correctDeclensionWord';
import { RangeSlider } from '../rangeSlider/rangeSlider';
import { InputLengthControl } from '../inputLengthControl/inputLengthControl';
import { CheckboxButton } from '../checkboxButton/checkboxButton';

type FilterRoomsForm = {

} & ConnectorProps & React.FormHTMLAttributes<HTMLFormElement>;
const Filter = ({
  setting,
  designations,
  rooms,
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
  ...props
}: FilterRoomsForm) => {
  const minPrice = 100;
  const maxPrice = 99999;
  const unitPrice = "₽";
  const nowDate = new Date();
  const throughYearDate = new Date(nowDate.getFullYear() + 1, nowDate.getMonth(), nowDate.getDate());
  const [stateStartDate, setStateStartDate] = useState<Date | null>(setting && setting.stayDates.start !== null ? setting.stayDates.start : nowDate);
  const [stateEndDate, setStateEndDate] = useState<Date | null>(setting && setting.stayDates.end !== null ? setting.stayDates.end : throughYearDate);
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
  useEffect(() => {
    FetchDesignations();
  }, [])
  const getCorrectFormatDate = (date: Date | null | undefined) => {
    if (date !== null && date !== undefined) {
      const correctFormat = date.toLocaleDateString("ru", { day: "numeric", month: "short" });
      return date.getMonth() === 4
        ? correctFormat
        : correctFormat.slice(0, -1);
    }
    return "";
  }
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

  const onChengeRangePriceSlider = (val: number | number[]) => {
    const payload = Array.isArray(val) ? { min: val[0], max: val[1] } : { min: 0, max: val }
    ChangePriceRange(payload);
  }

  const onChecked = (id: string, arr: string[], action: (val: string[]) => void) => {
    const newArr = arr.includes(id)
      ? arr.filter(i => i !== id)
      : [...arr, id];
    action(newArr);
  }

  const getMainEquipmentText = (beds: number, bedrooms: number, bathrooms: number): string => {
    const arr: string[] = [];
    if (bedrooms > 0) {
      arr.push(bedrooms + " " + correctDeclensionWord({
        options: {
          1: "спальня",
          2: "спальни",
          5: "спальней",
        },
        value: bedrooms
      }));
    }
    if (beds > 0) {
      arr.push(beds + " " + correctDeclensionWord({
        options: {
          1: "кровать",
          2: "кровати",
          5: "кроватей",
        },
        value: beds
      }));
    }
    if (bathrooms > 0) {
      arr.push(bathrooms + " " + correctDeclensionWord({
        options: {
          1: "ванная комната",
          2: "ванные комнаты",
          5: "ванных комнат",
        },
        value: bathrooms
      }));
    }
    return arr.length !== 0 ? arr.join(", ") : "Какие удобства в номере";
  }

  return (
    <Form {...props} className={'filterRoomsForm ' + (props.className || "")} >
      <FormFieldset key={"stayDates"}>
        <legend key={"legend"}>даты пребывания в отеле</legend>
        <Dropdown key={"dropdown"}
          className={"filterRoomsForm__stayDates"}
          theme="field"
          buttonBlock={<div className='filterRoomsForm__stayDateButtonBlock'>
            {
              getCorrectFormatDate(setting?.stayDates.start)
              + " - "
              + getCorrectFormatDate(setting?.stayDates.end)
            }
          </div>}
          contenerBlock={<FlexContainer
            className='filterRoomsForm__stayDateConteiner'
            flexDirection="colomn"
            rowGap={20}
          >
            <div key={"Fields"} className='filterRoomsForm__dateBlock'>
              <FlexContainer key={"startDate"}
                flexDirection="colomn"
                rowGap={5}
              >
                <Label label='Дата въезда:'>
                  <Field  >
                    <DateMaskField
                      state={stateStartDate}
                      setState={setStateStartDate}
                      minDate={nowDate}
                      maxDate={throughYearDate}
                    />
                  </Field>
                </Label>
              </FlexContainer>
              <FlexContainer key={"endDate"}
                flexDirection="colomn"
                rowGap={5}
              >
                <Label label='Дата выезда: '>
                  <Field  >
                    <DateMaskField
                      state={stateEndDate}
                      setState={setStateEndDate}
                      minDate={nowDate}
                      maxDate={throughYearDate}
                    />
                  </Field>
                </Label>
              </FlexContainer>
            </div>
            <CalendarCard
              key={"calendar"}
              minDate={nowDate}
              maxDate={throughYearDate}
              state={stateStartDate}
              state2={stateEndDate}
              setState={setStateStartDate}
              setState2={setStateEndDate}
            />
          </FlexContainer>}
        />

      </FormFieldset>
      <FormFieldset key={"guests"}>
        <legend key={"legend"}>гости</legend>
        <Dropdown
          className={"filterRoomsForm__guests"}
          theme="field"
          buttonBlock={<div className='filterRoomsForm__guestsButtonBlock'>
            <div>
              {
                setting && setting.numberOfGuests.adults + setting.numberOfGuests.children !== 0
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
            </div>
          </div>}
          contenerBlock={<FlexContainer
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
      <FormFieldset key={"priceRange"}
        className={"filterRoomsForm__priceRange"}
      >
        <FlexContainer
          justifyContent="space-between"
          alignItems="center"
        >
          <legend key={"legend"}>диапазон цены</legend>
          <FlexContainer
            className={'filterRoomsForm__priceRangeInput'}
            justifyContent="end"
          >
            <InputLengthControl
              className='filterRoomsForm__priceRangeInputItem filterRoomsForm__priceRangeInputMin'
              value={setting?.priceRange?.min}
              onChangeValue={(val) => ChangePriceRange({ max: setting?.priceRange?.max ? setting.priceRange.max : maxPrice, min: val })}
            />
            {unitPrice}&nbsp;-&nbsp;
            <InputLengthControl
              className='filterRoomsForm__priceRangeInputItem filterRoomsForm__priceRangeInputMax'
              value={setting?.priceRange?.max}
              onChangeValue={(val) => ChangePriceRange({ min: setting?.priceRange?.min ? setting.priceRange.min : minPrice, max: val })}
            />
            {unitPrice}
          </FlexContainer>
        </FlexContainer>
        <RangeSlider
          className={"filterRoomsForm__priceRangeSlider filterRoomsForm__item_withMarrginTop20"}
          value={[setting?.priceRange?.min, setting?.priceRange?.max]}
          onChangeValue={onChengeRangePriceSlider}
          maxValue={maxPrice}
          minValue={minPrice}
          initialValue={[minPrice, maxPrice]}
        />
        <FlexContainer
          justifyContent="center"
        >
          Стоимость за сутки пребывания в номере
        </FlexContainer>
      </FormFieldset>
      <FormFieldset key={"roomRules"}
      >
        <legend>Правила прибывания в номере</legend>
        <FlexContainer
          className={"filterRoomsForm__roomRules filterRoomsForm__item_withMarrginTop20"}
          flexDirection="colomn"
          rowGap={12}
        >
          {
            designations
              ? designations.rules.map((item) => {
                return <CheckboxButton
                  checked={setting?.roomRules?.includes(item.id)}
                  onChange={(e) => onChecked(item.id, setting?.roomRules ? setting.roomRules : [], ChangeRoomRules)}
                >{item.name}</CheckboxButton>
              })
              : ""
          }
        </FlexContainer>
      </FormFieldset>
      <FormFieldset key={"facilitiesInRoom"}
      >
        <legend>доступность</legend>
        <FlexContainer
          className={"filterRoomsForm__facilitiesInRoom filterRoomsForm__item_withMarrginTop20"}
          flexDirection="colomn"
          rowGap={12}
        >
          {
            designations
              ? designations.facility.map((item) => {
                return <CheckboxButton
                  theme="withExplanation"
                  checked={setting?.facilitiesInRoom?.includes(item.id)}
                  onChange={(e) => onChecked(item.id, setting?.facilitiesInRoom ? setting.facilitiesInRoom : [], ChangeFacilities)}
                  label={item.name}
                  explanation={item.description}
                />
              })
              : ""
          }
        </FlexContainer>
      </FormFieldset>
      <FormFieldset key={"mainEquipmentInRoom"}>
        <legend key={"legend"}>удобства номера</legend>
        <Dropdown
          className={"filterRoomsForm__mainEquipment"}
          theme="field"
          buttonBlock={<div className='filterRoomsForm__mainEquipmentButtonBlock'>
            <div>
              {

                setting
                  ? getMainEquipmentText(setting?.beds, setting?.bedrooms, setting?.bathrooms)
                  : "Какие удобства в номере"
              }
            </div>
          </div>}
          contenerBlock={<FlexContainer
            className='filterRoomsForm__guestsConteiner'
            flexDirection="colomn"
            rowGap={7}
          >
            <FlexContainer key={"bedrooms"}
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
            >
              <Label label='спальни'>
                <NumberPicker
                  state={setting?.bedrooms}
                  setState={(val) => ChangeBedrooms(val)}
                  minValue={0}
                />
              </Label>
            </FlexContainer>
            <FlexContainer key={"beds"}
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
            >
              <Label label='кровати'>
                <NumberPicker
                  state={setting?.beds}
                  setState={(val) => ChangeBeds(val)}
                  minValue={0}
                />
              </Label>
            </FlexContainer>
            <FlexContainer key={"bathrooms"}
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
            >
              <Label label='Ванные комнаты' >
                <NumberPicker
                  state={setting?.bathrooms}
                  setState={(val) => ChangeBathrooms(val)}
                  minValue={0}
                />
              </Label>
            </FlexContainer>
          </FlexContainer>}
        />
      </FormFieldset>
      <FormFieldset key={"equipmentInRoom"}
      >
        <legend>дополнительные удобства</legend>
        <FlexContainer
          className={"filterRoomsForm__equipmentInRoom filterRoomsForm__item_withMarrginTop20"}
          flexDirection="colomn"
          rowGap={12}
        >
          {
            designations
              ? designations.equipment.map((item) => {
                return <CheckboxButton
                  checked={setting?.equipmentInRoom?.includes(item.id)}
                  onChange={(e) => onChecked(item.id, setting?.equipmentInRoom ? setting.equipmentInRoom : [], ChangeEquipment)}
                  label={item.name}
                />
              })
              : ""
          }
        </FlexContainer>
      </FormFieldset>
    </Form>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    setting: state.filterRooms?.settings,
    designations: state.filterRooms?.designations,
    rooms: state.room?.rooms,
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
export const FilterRoomsForm = connector(Filter);
