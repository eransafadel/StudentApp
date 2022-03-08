import { useState, createContext } from "react";
import { useContext } from "react";
import Student from "../models/student";
import classes from "./StudentItem.module.css";
import imgAddress from "../assets/Svg/address-book.svg";
import imgEnvelope from "../assets/Svg/envelope.svg";
import imgSchool from "../assets/Svg/graduation-hat.svg";
import imgGender from "../assets/Svg/Icon awesome-transgender.svg";
import imgAge from "../assets/Svg/Icon awesome-birthday-cake.svg";
import imgCity from "../assets/Svg/Icon metro-location.svg";
import Field from "./Field";
import Checkbox from "./Checkbox";
import Button from "./Button";
import { Link } from "react-router-dom";
import { setConstantValue } from "typescript";

interface Props {
  student: Student;
  selectItem: (id: string, action: string) => void;
}

const StudentItem: React.FC<Props> = ({ student, selectItem }) => {
  const { id, textName, age, gender, school, city } = student;

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const clickHandler = () => {
    setIsSelected(!isSelected);
    selectItem(id, !isSelected ? "SELECT" : "UNSELECT");
  };

  const EditPage = () => {
    <Link to={`edit-user/${id}`} state={{ stud: student }}></Link>;
  };

  return (
    <div className={classes.item}>
      {/* <Checkbox/> */}
      <input
        type="checkbox"
        defaultChecked={isSelected}
        onClick={clickHandler}
      />

      <Field image={imgAddress} title={" Name:  "} content={textName} />
      <Field image={imgAge} title={" Age: "} content={age} />
      <Field image={imgGender} title={" Gender: "} content={gender} />
      <Field image={imgSchool} title={" School:  "} content={school} />
      <Field image={imgCity} title={" City:  "} content={city} />
      <br/>
       <Link to={`edit-user/${id}`} state={{ stud: student }}>
        <button className={classes.myBtn}>Edit</button>
       </Link>
     
    </div>
  );
};

export default StudentItem;
