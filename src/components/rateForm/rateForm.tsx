import React, {useState} from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import {RateBookingAction} from "../../store/actions/bookingActions";
import { FormFieldset } from '../form/form';
import { Button } from '../button/button';
import { useValidationFieldForm } from '../../hooks/useValidationFieldFormReturn';
import { RateButton } from '../rateButton/rateButton';
import { Field } from '../field/field';

export interface RateFormProps {
  bookingId: string,
  roomId: string,
  setActiveModal: (v: boolean) => void,
}
const ChangeForm = ({ auth, userInfo, bookingState, bookingId, setActiveModal, RateBookingAction }: RateFormProps & ConnectorProps) => {
  const onClick = () => {
    if (bookingState) {
      const booking = bookingState.bookings.find((item) => item.id === bookingId);
      if (booking !== undefined && auth && userInfo && rating) {
        RateBookingAction({...booking, rating: rating}, {
          id: booking.id,
          authorId: auth.uid,
          dateToCreating: new Date(),
          content: reviewText,
          listWhoLikedThisReview: null,
          appraisal: rating,
        });
      }
      setActiveModal(false);
    }
  }
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const ratingValidator = useValidationFieldForm(reviewText,{
    required: "Вы должны поставить оценку, если хотите оставить отзыв"
  })
  return <>
    <FormFieldset key={"info"}>
      <h2 key={"header"}>Отставьте свой отзыв:</h2>
      <RateButton state={rating} setState={setRating} onBlur={() => ratingValidator.setIsDirty(true)}/>
      <Field>
        <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        />
      </Field>
    </FormFieldset>
    <Button key={"button"}
    disabled={!ratingValidator.isValid}
      type="button"
      theme='fillBcg'
      onClick={onClick}
    >
      Оставить отзыв
    </Button>
  </>
}

const mapStateToProps = (state: RootState) => {
  return ({
    bookingState: state.bookings,
    auth: state.auth?.auth,
    userInfo: state.auth?.userInfo,
  })
}
const mapDispatchToProps = {
  RateBookingAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const RateForm = connector(ChangeForm);