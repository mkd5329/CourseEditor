import './App.css';
import React from 'react';
import {
    Col, Input, Button, Card, CardBody, CardTitle, CardText, Modal, ModalBody, ModalHeader, ModalFooter,Row,Table, Dropdown, DropdownToggle, DropdownItem, DropdownMenu

} from 'reactstrap';
import Courses from './Courses'
class App extends React.Component {
constructor(props){
super(props)
this.state = {courses:[], modal:false, courseName:"",courseDetails:"",courseDescription:"", courseDepartment:1};
this.getInitData = this.getInitData.bind(this);
this.toggle = this.toggle.bind(this);
this.dropdownToggle = this.dropdownToggle.bind(this);
this.addCourse = this.addCourse.bind(this);

}

    dropdownToggle(){
        this.setState({dropdownOpen:!this.state.dropdownOpen});}

    fetchData = () => {
        //In package.json add "proxy": "http://localhost:5000"
        //This will allow redirect to REST api in Flask w/o CORS errors
         fetch('/coursedata')
         .then(
             response => response.json()
             )//The promise response is returned, then we extract the json data
         .then (jsonOutput => //jsonOutput now has result of the data extraction
                  {

                  this.getInitData(jsonOutput)
                  }
              )
      }

      componentDidMount(){
        this.fetchData();
    }


    getInitData(jsonOb){
    let ob = JSON.parse(jsonOb);
    console.log(ob);

    //console.log(typeof(ob))
    //console.log(ob)
    let element;
    let index;
    //let id;
    //let name;
    //let details;
    //let c_desc;
    let newCourses = []
    for(index = 0; index<ob.length;index++){
    element = ob[index];
    let theId = element[0];
    let theDeptId = element[1];
    let theName = element[2];
    let theDetails = element[3];
    let theC_Desc = element[4];
    let theDepartment = element[5];
    let theCollege = element[6];
    newCourses.push({id: theId ,dept_id: theDeptId, name:theName,details:theDetails,c_desc:theC_Desc,department:theDepartment,college:theCollege});
    }
    //console.log(newCourses)
    this.setState({courses:newCourses});


    }
    toggle(){
    this.setState({modal:!this.state.modal});
    }

  render(){
  return (
    <div>

    <h1>Course List</h1>
    <div></div>

    <Courses courses = {this.state.courses} putter = {this.doPut}/>

    <Modal isOpen = {this.state.modal} toggle = {this.toggle}>
         <ModalHeader>
         Add Course
         </ModalHeader>
         <ModalBody>
         <div>Course Name</div>
         <div><Input type='text' placeholder="Enter Course Name" onChange={this.updateCourseName}></Input></div>
         <div>Course Description</div>
         <div><Input type='text' placeholder="Enter Course Description" onChange={this.updateCourseDescription}></Input></div>
         <div>Course Details</div>
         <div><Input type='text' placeholder="Enter Course Details" onChange={this.updateCourseDetails}></Input></div>
        <div>Department</div>
        <div>
        <select onChange = {this.updateCourseDepartment}>
        <option value = "1">Software Engineering</option>
        <option value = "2">Computer Science</option>
        <option value = "3">Computer Engineering</option>
        <option value = "4">Virology</option>
        </select>
        </div>
         </ModalBody>
         <ModalFooter>
         <Button onClick = {this.toggle}>Cancel</Button><Button onClick = {this.addCourse}>Ok!</Button>
         </ModalFooter>
         </Modal>
    <Button color = "primary" onClick = {this.toggle}>Add</Button>

    </div>
  );
}
updateCourseName = (e) =>
{
this.setState({courseName: e.target.value})
}
updateCourseDepartment = (e) =>
{
this.setState({courseDepartment: e.target.value})
//console.log(this.state.courseDepartment)
//console.log(typeof(this.state.courseDepartment))
}
updateCourseDescription= (e) =>{
this.setState({courseDescription: e.target.value})
}

updateCourseDetails = (e) =>{
this.setState({courseDetails: e.target.value})
}

addCourse(){
this.doPost(this.state.courseName,this.state.courseDetails,this.state.courseDescription,this.state.courseDepartment)



this.setState({modal:!this.state.modal,courseName:"",courseDepartment:1,courseDescription:""});
}

doPost = (thename,thedetails,description,department) => {
        //console.log(department)
        //console.log(typeof(department))
        fetch('/coursedata', {
            method: 'POST',
            body: JSON.stringify({
                name: thename,
                details: thedetails,
                c_desc: description,
                dept_id: department
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response =>{

            return response.json()
        }).then(json => {
            this.fetchData();
        });

}
doPut = (theid,thename,thedetails,description,department) => {
        //console.log(department)
        //console.log(typeof(department))
        fetch('/coursedata/' + theid, {
            method: 'PUT',
            body: JSON.stringify({
                name: thename,
                details: thedetails,
                c_desc: description,
                dept_id: department
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response =>{

            return response.json()
        }).then(json => {
            this.fetchData();
        });

}

}
export default App;
