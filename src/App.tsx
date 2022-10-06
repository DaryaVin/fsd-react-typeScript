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
import { ToggleButton } from './components/toggleButton/toggleButton';
import { LikeButton } from './components/likeButton/likeButton';
import { Review } from './components/review/review';
import { Card } from './components/card/card';

interface DTOUser {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  sex: "male" | "female",
  dateBirthday: Date,
  urlPhoto?: string,
  subscription?: boolean,
}


class User {
  // email: string;
  // password: string;
  firstName: string;
  lastName: string;
  sex: "male" | "female";
  dateBirthday: Date;
  urlPhoto?: string | null;
  subscription: boolean;
  protected _email: string = "";
  protected _password: string = "";
  get email(): string {
    return this._email;
  }
  set email(value: string) {
    //checking for email
    this._email = value;
  }
  get password(): string {
    return this._password;
  }
  set password(value: string) {
    // checking for password
    this._password = value;
  }
  constructor(data: DTOUser) {
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.sex = data.sex;
    this.dateBirthday = data.dateBirthday;
    data.urlPhoto? this.urlPhoto = data.urlPhoto : this.urlPhoto = null;
    data.subscription ? this.subscription = data.subscription : this.subscription = false;
  }
}


function App() {
  let [state, setState] = useState<Date | null>(null);
  let [statePeriod, setStatePeriod] = useState<Date | null>(new Date(2022,1,10));
  let [sliderState, setSliderState] = useState<number | number[]>([5000, 10000]);
  let [numberPickerState, setNumberPickerStateState] = useState<number>(10);
  let [currentPagePaginationState, setCurrentPagePaginationState] = useState<number>(1);
  let [raitingState, setRaitingState] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  let [isCheckedCheckboxButtonState, setIsCheckedCheckboxButtonState] = useState<boolean>(false);
  let [isLikeState, setIsLikeState] = useState<boolean>(false);
  let [numberLikeState, setNumberLikeState] = useState<number>(6465666);
  let [dateState, setDateState] = useState<Date>(new Date(2022, 7, 12));

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
          
      </Carousel>
      <RateButton state={raitingState} setState={setRaitingState}/>
      <RateBox rating={3.6}></RateBox>
      <BulletList>
        <div key={1}>skdjfsjfsj</div>
        <li key={2}>sdjfksjfs</li>
      </BulletList>
      <CheckboxButton 
        checked={isCheckedCheckboxButtonState} 
        onChange={() => setIsCheckedCheckboxButtonState(!isCheckedCheckboxButtonState)}
        // onKeyDown={(e) => {if (e.code === "Enter") setIsCheckedCheckboxButtonState(!isCheckedCheckboxButtonState)}}  
        label='Широкий коридор' 
        theme={'withExplanation'} 
        explanation="Ширина коридоров "
      >

        label='Широкий коридор' 
      </CheckboxButton>
      <RadioButton 
        checked={isCheckedCheckboxButtonState} 
        onChange={() => setIsCheckedCheckboxButtonState(!isCheckedCheckboxButtonState)}
        // onKeyDown={(e) => {if (e.code === "Enter") setIsCheckedCheckboxButtonState(!isCheckedCheckboxButtonState)}}  
        >
            Широкий коридор
      </RadioButton>
      <ToggleButton>
        sjvgksjvksjvkj  kj kj kl v f f f fcv fgbfb
      </ToggleButton>
      <LikeButton 
        checked={isLikeState} 
        numberLikes={numberLikeState} 
        onChange={(e => {setIsLikeState(!isLikeState); setNumberLikeState(numberLikeState+1)})}
      />
      <Review id="1" authorName='kjskddj kfjskljf' dateToCreating={dateState} content="jshsdhsdjf" listWhoLikedThisReview={["1", "2"]}></Review>
      <Card>
        <label>
          lsdfksdkf
          <TextField disabled>
            <input type="text" placeholder='sjss'/>
          </TextField>
        </label>
        <label>
          lsdfksdkf
          <TextField>
            <>
              jfkjdskjsdgjdsgjdskjgf
            </>
          </TextField>
        </label>
        <label>
          lsdfksdkf
          <TextField>
            <>
              jfkjdskjsdgjdsgjdskjgf
            </>
          </TextField>
        </label>
      </Card>
    </div>

);
}
export default App;
