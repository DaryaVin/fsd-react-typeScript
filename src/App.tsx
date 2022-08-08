import React, { useState } from 'react';
import "./components/baseComponent/baseStyle.scss"
import { CalendarCard } from './components/calendarCard/calendarCard';
import { DateMaskField } from './components/dateMaskField/dateMaskField';
import { TextField } from './components/textField/textField';
import { RangeSlider } from './components/rangeSlider/rangeSlider';
import { Dropdown } from './components/dropdown/dropdown';
import { NumberPicker } from './components/numberPicker/numberPicker';
import { Pagination } from './components/pagination/pagination';
import { Carousel } from './components/carousel/carousel';
import { RateButton } from './components/rateButton/rateButton';
import { RateBox } from './components/rateBox/rateBox';
import { Button } from './components/button/button';
import { BulletList } from './components/bulletList/bulletList';
import { CheckboxButton } from './components/checkboxButton/checkboxButton';
import { RadioButton } from './components/radioButton/radioButton';



function App() {
  let [state, setState] = useState<Date | null>(null);
  let [statePeriod, setStatePeriod] = useState<Date | null>(new Date(2022,1,10));
  let [sliderState, setSliderState] = useState<number | number[]>([5000, 10000]);
  let [numberPickerState, setNumberPickerStateState] = useState<number>(10);
  let [currentPagePaginationState, setCurrentPagePaginationState] = useState<number>(1);
  let [raitingState, setRaitingState] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  let [isCheckedCheckboxButtonState, setIsCheckedCheckboxButtonState] = useState<boolean>(false);

  const dropdownButtonBlock = [(
    <TextField className='block_size_s'>
      <div>
        <DateMaskField state={state} setState={setState} maxDate={new Date()}/>
      </div>
    </TextField>
  ),(
    <TextField className='block_size_s'>
      <div>
        <DateMaskField state={statePeriod} setState={setStatePeriod} maxDate={new Date()}/>
      </div>
    </TextField>
  )];
  const dropdownContenerBlock = (
    <TextField>
      <CalendarCard state={state} state2={statePeriod} setState={setState} setState2={setStatePeriod} maxDate={new Date()}/>
    </TextField>
  );
  
  return (
    <div className="App">
      <TextField>
        <input type="text" />
      </TextField>
      <TextField className="textField_type_subscription block_size_m">
        <>
          <input type="text" placeholder="Имя" />
          <button type="button" className="button button_theme_textOnly">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="transparent" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/>
            </svg>
          </button>
        </>
      </TextField>
      <TextField>
        <>
          <DateMaskField state={state} setState={setState} maxDate={new Date()}/>
          <Button>
            <button type="button">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/>
              </svg>
            </button>
          </Button>
          <Button>
            <button type="button">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF"/>
              </svg>
            </button>
          </Button>
        </>
      </TextField>
      <TextField>
        <CalendarCard state={state} setState={setState}  maxDate={new Date()}></CalendarCard>
      </TextField>
      {/* <CalendarCard state={state} state2={statePeriod} setState={setState} setState2={setStatePeriod}></CalendarCard> */}
      <RangeSlider state={sliderState} setState={setSliderState} label={"Range Slider"} minValue={1000} maxValue={20000} unit={"\u{20BD}"}/>
      <Dropdown buttonBlock={(<>dropdownButtonBlock</>)} contenerBlock={<>dropdownContenerBlock</>} hasDropButton theme="field"></Dropdown>
      <Dropdown buttonBlock={dropdownButtonBlock} contenerBlock={dropdownContenerBlock}></Dropdown>
      <NumberPicker state={numberPickerState} setState={setNumberPickerStateState} minValue={0} maxValue={10}></NumberPicker>
      <div>{currentPagePaginationState}</div>
      <Pagination currentPage={currentPagePaginationState} totalCount={150} pageSize={12} onPageChange={setCurrentPagePaginationState}></Pagination>
      <Carousel width={200} height={200} >
          <div>item1</div>
          <div>item2</div>
          <div>item3</div>
          <div>item1</div>
          <div>item2</div>
          <div>item3</div>
          <div>
            <img height={100} src="https://funart.pro/uploads/posts/2021-04/1617390513_58-p-oboi-ogromnoe-nebo-62.jpg" alt="небо"/>
          </div>
          <img src="https://sun9-36.userapi.com/s/v1/if2/gGvuTFxkHFeHNEGL-aMcPnCu6EGYDCCQ-BpDy0LQu1GqMHQgEk2caM5Ynzq-YTjxAKnw-cNIxZR4WZWwZ57kfdDG.jpg?size=453x604&quality=96&type=album" alt="небо"/>
          <div>item1</div>
          <div>item2</div>
          
      </Carousel>
      <RateButton state={raitingState} setState={setRaitingState}/>
      <RateBox rating={3.6}></RateBox>
      <BulletList>
        <div key={1}>skdjfsjfsj</div>
        <li key={2}>sdjfksjfs</li>
      </BulletList>
      <CheckboxButton 
        checked={isCheckedCheckboxButtonState} 
        onClick={() => setIsCheckedCheckboxButtonState(!isCheckedCheckboxButtonState)}
        // onKeyDown={(e) => {if (e.code === "Enter") setIsCheckedCheckboxButtonState(!isCheckedCheckboxButtonState)}}  
        label='Широкий коридор' 
        theme={'withExplanation'} 
        explanation="Ширина коридоров "
      />
      <RadioButton 
        checked={isCheckedCheckboxButtonState} 
        onClick={() => setIsCheckedCheckboxButtonState(!isCheckedCheckboxButtonState)}
        // onKeyDown={(e) => {if (e.code === "Enter") setIsCheckedCheckboxButtonState(!isCheckedCheckboxButtonState)}}  
        >
            Широкий коридор
      </RadioButton>
    </div>

);
}
export default App;
