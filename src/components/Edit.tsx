import Student from "../models/student";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Form from "./Form";

interface Props {
  student: Student;
}

const Edit: any = () => {
  // let { id } = useParams();
  const location = useLocation();
  const obj: any = location.state; // obj.stud => is the object

  return (
    <div>
      <Form  stud={obj.stud}/>
    </div>
  );
};

export default Edit;
