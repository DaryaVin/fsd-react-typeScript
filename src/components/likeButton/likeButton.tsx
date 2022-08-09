import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./likeButton.scss";

interface LikeButtonProps extends  React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean,
  numberLikes: number,
  className?: string,
}
export const LikeButton = ({checked, numberLikes, className, ...props}: LikeButtonProps) => {
  const correctFomatNumberLikesFunc = (numberLikes: number): string | number => { 
    if (numberLikes >= 1000) {
      if (numberLikes >= 1000000) {
        if (numberLikes >= 1000000000) {
          return (Math.floor(numberLikes / 100000000)/10) + "МЛРД"
        }
        return (Math.floor(numberLikes / 100000)/10) + "МЛН"
      }
      return (Math.floor(numberLikes / 100)/10) + "K";
    }
    return numberLikes;
  }
  return (
    <label className={"likeButton" + (className ? " " + className : "") + (checked ? " likeButton_checked" : "")}>
      <input type={"checkbox"} className="likeButton__button" checked={checked} {...props}></input>
      <div className="likeButton__checkmark">
        {
          checked 
          ? <FaHeart className="likeButton__innerPoint"></FaHeart>
          : <FaRegHeart className="likeButton__innerPoint"></FaRegHeart>
        }
      </div>
      <div className="likeButton__label">
        {correctFomatNumberLikesFunc(numberLikes)}
      </div>
    </label>
  )
}