import React from "react";
import Student from "../models/student";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import classes from "./Form.module.css"

interface Props {
  stud: Student;
}
const Form: React.FC<Props> = ({ stud }) => {
  const [textName, setName] = useState<string>(stud.textName);
  const [age, setAge] = useState<string>(stud.age);
  const [gender, setGender] = useState<string>(stud.gender);
  const [school, setSchool] = useState<string>(stud.school);
  const [city, setCity] = useState<string>(stud.city);
  const navigate = useNavigate();

  const inputInvalid = () => {
    return (
      textName.trim() === "" ||
      age.trim() === "" ||
      age.match(/^[0-9]+$/) === null||
      gender.trim() === "" ||
      school.trim() === "" ||
      city.trim() === ""
    );
  };

  const clearInput = () => {
    setName("");
    setAge("");
    setGender("");
    setSchool("");
    setCity("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (inputInvalid()) {
      clearInput();
      return;
    }
    const myStud = new Student(stud.id,textName,age,gender,school,city); 
    localStorage.setItem("UpdateStudent",JSON.stringify(myStud));
    
    navigate(-1);
  };

  const cancelEdit = () => {
    clearInput();
    navigate(-1);
  };

  return (
    <form className ={classes.form} onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text" maxLength={15}
        required
        value={textName}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Age</label>
      <input
       type="number" min="1" max="99"
        required
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <label>Gender</label>
      <input
        type="text"
        maxLength={6}
        required
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <label>School</label>
      <input
        type="text"
        maxLength={15}
        required
        value={school}
        onChange={(e) => setSchool(e.target.value)}
      />
      <label>City</label>
      <input
        type="text"
        maxLength={15}
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit">Confirm </button>
      <button onClick={cancelEdit}>Cancel </button>
    </form>
  );
};

export default Form;
