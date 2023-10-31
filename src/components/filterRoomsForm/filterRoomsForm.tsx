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
import { designations } from '../../types/filterRooms';

type FilterRoomsForm = {
  designations: designations,
} & ConnectorProps & React.FormHTMLAttributes<HTMLFormElement>;
const Filter = ({
  designations,
  setting,
  isLoading,
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
  const minPrice = designations?.minPrice ? designations.minPrice : 0;
  const maxPrice = designations?.maxPrice ? designations.maxPrice : 99999;
  const minDate: Date = designations?.minDate ? designations.minDate : new Date();
  const maxDate: Date = designations?.maxDate ? designations.maxDate : new Date(minDate.getFullYear() + 1, minDate.getMonth(), minDate.getDate());
  const [stateStartDate, setStateStartDate] = useState<Date | null>(setting && setting.stayDates.start !== null ? setting.stayDates.start : null);
  const [stateEndDate, setStateEndDate] = useState<Date | null>(setting && setting.stayDates.end !== null ? setting.stayDates.end : null);
  useEffect(() => {
    if (stateStartDate !== null
      && stateEndDate !== null
      && stateStartDate > stateEndDate) {
      setStateStartDate(stateEndDate);
      setStateEndDate(stateStartDate);
    }
    // const start = setting && stateStartDate === null ? setting.stayDates.start : stateStartDate;
    // const end = setting && stateEndDate === null ? setting.stayDates.end : stateEndDate;
    const start = stateStartDate;
    const end = stateEndDate;
    ChangeStayDates({ end, start });

  }, [stateStartDate, stateEndDate]);

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

  if (isLoading) {
    return (
      <span>Идет загрузка</span>
    )
  }
  return (
    <Form {...props} className={'filterRoomsForm ' + (props.className || "")} >
      <FormFieldset key={"stayDates"}>
        <legend key={"legend"}>даты пребывания в отеле</legend>
        <Dropdown key={"dropdown"}
          className={"filterRoomsForm__stayDates"}
          theme="field"
          closeButtonInContenerBlock
          funcForResetButtonInContenerBlock={() => { setStateStartDate(null); setStateEndDate(null); }}
          buttonBlock={<div className='filterRoomsForm__stayDateButtonBlock'>
            {
              !!stateEndDate && !!stateStartDate 
              ? getCorrectFormatDate(stateStartDate)
              + " - "
              + getCorrectFormatDate(stateEndDate)
              : "Даты не указаны"
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
                      minDate={minDate}
                      maxDate={maxDate}
                      isClear
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
                      minDate={minDate}
                      maxDate={maxDate}
                      isClear
                    />
                  </Field>
                </Label>
              </FlexContainer>
            </div>
            <CalendarCard key={"calendar"}
              minDate={minDate}
              maxDate={maxDate}
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
        <Dropdown key={"dropdown"}
          className={"filterRoomsForm__guests"}
          theme="field"
          closeButtonInContenerBlock
          funcForResetButtonInContenerBlock={() => { 
            ChangeNumberOfGuests({
              adults: 0,
              children: 0,
              babies: 0,
            });
           }}
          buttonBlock={<div className='filterRoomsForm__guestsButtonBlock'>
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
        <FlexContainer key={"upperBlock"}
          justifyContent="space-between"
          alignItems="center"
        >
          <legend key={"legend"}>диапазон цены</legend>
          <FlexContainer key={"priceRangeInput"}
            className={'filterRoomsForm__priceRangeInput'}
            justifyContent="end"
          >
            <InputLengthControl key={"priceRangeInputMin"}
              className='filterRoomsForm__priceRangeInputItem filterRoomsForm__priceRangeInputMin'
              value={setting?.priceRange?.min}
              onChangeValue={(val) => ChangePriceRange({ max: setting?.priceRange?.max ? setting.priceRange.max : maxPrice, min: val })}
            />
            {
              designations?.unitPrice
                ? designations.unitPrice
                : "pуб."
            }&nbsp;-&nbsp;
            <InputLengthControl key={"priceRangeInputMax"}
              className='filterRoomsForm__priceRangeInputItem filterRoomsForm__priceRangeInputMax'
              value={setting?.priceRange?.max}
              onChangeValue={(val) => ChangePriceRange({ min: setting?.priceRange?.min ? setting.priceRange.min : minPrice, max: val })}
            />
            {
              designations?.unitPrice
                ? designations.unitPrice
                : "pуб."
            }
          </FlexContainer>
        </FlexContainer>
        <RangeSlider key={"priceRangeSlider"}
          className={"filterRoomsForm__priceRangeSlider filterRoomsForm__item_withMarrginTop20"}
          value={[setting?.priceRange?.min, setting?.priceRange?.max]}
          onChangeValue={onChengeRangePriceSlider}
          maxValue={maxPrice}
          minValue={minPrice}
          initialValue={[minPrice, maxPrice]}
        />
        <FlexContainer key={"downBlock"}
          justifyContent="center"
        >
          Стоимость за сутки пребывания в номере
        </FlexContainer>
      </FormFieldset>
      <FormFieldset key={"roomRules"}
      >
        <legend key={"legend"}>Правила прибывания в номере</legend>
        <FlexContainer key={"roomRules"}
          className={"filterRoomsForm__roomRules filterRoomsForm__item_withMarrginTop20"}
          flexDirection="colomn"
          rowGap={12}
        >
          {
            designations
              ? designations.rules.map((item) => {
                return <CheckboxButton
                  key={item.id}
                  checked={setting?.roomRules?.includes(item.id)}
                  onChange={(e) => onChecked(item.id, setting?.roomRules ? setting.roomRules : [], ChangeRoomRules)}
                >
                  {item.name}
                </CheckboxButton>
              })
              : ""
          }
        </FlexContainer>
      </FormFieldset>
      <FormFieldset key={"facilitiesInRoom"}
      >
        <legend key={"legend"}>доступность</legend>
        <FlexContainer key={"facilitiesInRoom"}
          className={"filterRoomsForm__facilitiesInRoom filterRoomsForm__item_withMarrginTop20"}
          flexDirection="colomn"
          rowGap={12}
        >
          {
            designations
              ? designations.facility.map((item) => {
                return <CheckboxButton
                  key={item.id}
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
        <Dropdown key={"mainEquipmentInRoom"}
          className={"filterRoomsForm__mainEquipment"}
          theme="field"
          closeButtonInContenerBlock
          funcForResetButtonInContenerBlock={() => { 
            ChangeBeds(0);
            ChangeBedrooms(0);
            ChangeBathrooms(0);
           }}
          buttonBlock={<div className='filterRoomsForm__mainEquipmentButtonBlock'>
              {

                setting
                  ? getMainEquipmentText(setting?.beds, setting?.bedrooms, setting?.bathrooms)
                  : "Какие удобства в номере"
              }
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
        <legend key={"legend"}>дополнительные удобства</legend>
        <FlexContainer key={"equipmentInRoom"}
          className={"filterRoomsForm__equipmentInRoom filterRoomsForm__item_withMarrginTop20"}
          flexDirection="colomn"
          rowGap={12}
        >
          {
            designations
              ? designations.equipment.map((item) => {
                return <CheckboxButton
                  key={item.id}
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
export const FilterRoomsForm = connector(Filter);
