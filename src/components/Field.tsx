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
      <h2 className={classes.myFontTitle}>{title+"  "}</h2>
      <h4 className={classes.myFontContent}>{"   "+  content}</h4>
      
   
    </div>
  );
};

export default Field;
