import {
    Col, Button, Card, CardBody, CardTitle, Input, CardText, Modal, ModalBody, ModalHeader, ModalFooter,Row,Table
} from 'reactstrap';
import React from 'react';
import './App.css';

/*
<Modal isOpen = {this.state.modal} toggle = {this.toggle}>
         <ModalHeader>
         {name}
         </ModalHeader>
         <ModalBody>
         {details}
         </ModalBody>
         <ModalFooter>
         {c_desc}
         <Button onClick = {this.toggle}>Ok, I got it!</Button>
         </ModalFooter>
         </Modal>
*/
//import info from './information.png'


class Courses extends React.Component {
constructor(props){
super(props)
this.state = {modal:false,CourseID:"",CourseName:"",CourseDetails:"",CourseDescription:"",CourseDepartment:"1",CourseCollege:"", newName:"",newDetails:"",newDescription:"",newDepartment:"1"}
this.toggle = this.toggle.bind(this);
this.courseToggle = this.courseToggle.bind(this);
this.confirm = this.confirm.bind(this);

}

updateCourseName = (e) =>
{
this.setState({newName: e.target.value})
}
updateCourseDepartment = (e) =>
{

this.setState({newDepartment: e.target.value})
//console.log(this.state.courseDepartment)
//console.log(typeof(this.state.courseDepartment))
}
updateCourseDescription= (e) =>{
this.setState({newDescription: e.target.value})
}

updateCourseDetails = (e) =>{
this.setState({newDetails: e.target.value})
}



render(){
return(
<>
<Modal isOpen = {this.state.modal} toggle = {this.toggle}>
         <ModalHeader>
         Edit Course
         </ModalHeader>
         <ModalBody>
         <div>Course Name</div>
         <div><Input type='text' defaultValue={this.state.CourseName} onChange={this.updateCourseName}></Input></div>
         <div>Course Description</div>
         <div><Input type='text' defaultValue={this.state.CourseDescription} onChange={this.updateCourseDescription}></Input></div>
         <div>Course Details</div>
         <div><Input type='text' defaultValue={this.state.CourseDetails} onChange={this.updateCourseDetails}></Input></div>
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
         <Button onClick = {this.toggle}>Cancel</Button>
         <Button color = "primary" onClick = {this.confirm}>Confirm</Button>
         </ModalFooter>
         </Modal>

<Table>
<thead>
<tr>
<th></th>
<th>name</th>
<th>description</th>
<th>details</th>
<th>department</th>
<th>college</th>
</tr>
{this.renderTableData(this.props.courses)}
</thead>

</Table>
</>

)
}

courseToggle(id,cname,cdetails,cdesc,cdepartment,ccollege)
{
//console.log(cname)
this.setState({CourseID:id,CourseName:cname,CourseDetails:cdetails,CourseDescription:cdesc,CourseDepartment:cdepartment,CourseCollege:ccollege,modal:!this.state.modal,newName:cname,newDepartment:"1",newDetails:cdetails,newDescription:cdesc});
}
toggle(){
    this.setState({modal:!this.state.modal});
    }
    confirm(){
    this.props.putter(this.state.CourseID,this.state.newName,this.state.newDetails,this.state.newDescription,this.state.newDepartment);
    this.setState({modal:!this.state.modal,newDepartment:"", newName:"",newDetails:"",newDepartment:"1",newDescription:""});
    }

renderTableData(array) {
      return array.map((course, index) => {
         const {id, name, details,c_desc,dept_id,department,college} = course //destructuring
         return (
            <tr>
            <Button onClick = {() => this.courseToggle(id,name,details,c_desc,department,college)}>Edit</Button>
               <td>{name}</td>
               <td>{c_desc}</td>
               <td>{details}</td>
               <td>{department}</td>
               <td>{college}</td>
            </tr>
         )
      })
   }


}

export default Courses;