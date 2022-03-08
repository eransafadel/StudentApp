class Student {
    id:string;
    textName:string;
    age:string;
    gender:string;
    school:string;
    city:string;

    constructor(key:string,textName:string,age:string,gender:string,school:string,city:string){

        this.id = key;
        this.textName = textName;
        this.age = age;
        this.gender = gender;
        this.school = school;
        this.city = city;
       
        
    }


    static fromJSON(map:any): Student {
        return new Student(map.id, map.textName, map.age,map.gender,map.school,map.city );
    }

}

export default Student;

