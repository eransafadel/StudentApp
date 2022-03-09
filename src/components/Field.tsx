import React, { Fragment } from "react";
import classes from "./Field.module.css";
interface Props {
  image: string;
  title: string;
  content: string;
}

const Field: React.FC<Props> = ({ image, title, content }) => {
  return (
    <div className={classes.myField}>
      <img className={classes.myImg} src={image} />
      <h3>{title}</h3>
      <h3 className={classes.myFontContent}>{"   "+  content}</h3>
      
   
    </div>
  );
};

export default Field;
