import React, { useEffect, useState, useCallback } from "react";
import StudentItem from "./StudentItem";
import Student from "../models/student";
import Button from "./Button";
import classes from "./Students.module.css";

const Students: React.FC = (props) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStud, setSelectedStud] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [studentPerPage, setStudentPerPage] = useState<number>(6);


  const nextPage = () => {
    if (currentPage >= students.length / studentPerPage) return;

    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage === 1) return;

   
    setCurrentPage(currentPage - 1);
  };

  const currentPageFunc = (index: number) => {
    if (currentPage <= 1) return;
    setCurrentPage(index);
  };

  const deleteItemsHandler = () => {
    const tempIdStud = students.map((stud) => {
      return stud.id;
    }); // only id field

    const res = tempIdStud.filter((n) => !selectedStud.includes(n)); // sub A - B =>C

    const combined = students.filter((stud) => res.includes(stud.id)); // if A contain in C

    localStorage.setItem("students", JSON.stringify(combined));
    setStudents(combined);
    const currPage = Math.ceil(combined.length / 6);
    currentPageFunc(currPage);
  };

  const checkEditStudent = (newStuds: Student[]) => {
    const studEdit: any = localStorage.getItem("UpdateStudent");
    const studEditJson = JSON.parse(studEdit);

    if (studEditJson !== null) {
      const studEdit = Student.fromJSON(studEditJson);

      let index = 0;
      for (index = 0; index < newStuds.length; index++) {
        if (newStuds[index].id === studEdit.id) break;
      }

      newStuds.splice(index, 1, studEdit);
      localStorage.setItem("students", JSON.stringify(newStuds)); // save in local localStorage
      localStorage.removeItem("UpdateStudent");
    }
  };

  const selectedItem = (id: string, action: string) => {
    if (action === "SELECT") {
      setSelectedStud((prevIdStud) => {
        const updatedIdStud: string[] = [...prevIdStud];
        updatedIdStud.unshift(id);
        return updatedIdStud;
      });
    } else if (action === "UNSELECT") {
      setSelectedStud((prevIdStud) => {
        const updatedIdStud: string[] = prevIdStud.filter(
          (idStud) => id !== idStud
        );
        return updatedIdStud;
      });
    }
  };

  const fetchStudents = useCallback(async () => {
    const savedData = localStorage.getItem("students");
    let newStuds: Student[];
    if (savedData !== null) {
      newStuds = JSON.parse(savedData).map((item: any) => {
        return Student.fromJSON(item);
      });

      checkEditStudent(newStuds);
      setStudents(newStuds);
      return;
    }

    try {
      const res = await fetch(
        "https://run.mocky.io/v3/f8e5d0ee-1cb8-4b6e-97c1-01d45b0bc521"
      );

      if (!res.ok) {
        throw new Error("something went wrong!");
      }

      const resData = await res.json();

      const loadedStudents: Student[] = [];
      for (const key in resData) {
        const tempStud = new Student(
          resData[key].id,
          resData[key].name,
          resData[key].age,
          resData[key].gender,
          resData[key].school,
          resData[key].city
        );
        loadedStudents.push(tempStud);
      }
      localStorage.setItem("students", JSON.stringify(loadedStudents)); // save in local localStorage
      setStudents(loadedStudents);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Get current students:

  const indexOfLastStudent = currentPage * studentPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentPerPage;
  const currentStudent = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const currentStudentList = currentStudent.map((stud) => (
    <StudentItem student={stud} key={stud.id} selectItem={selectedItem} />
  ));

  return (
    <div>
      <Button onClick={deleteItemsHandler} text="Delete"></Button>
      <section className={classes.gridContainer}>{currentStudentList}</section>
      <div className={classes.flexContainer}>
         <Button onClick={prevPage} text="Prev"></Button>
         <Button onClick={nextPage} text="Next"></Button>
      </div>
    </div>
  );
};

export default Students;
