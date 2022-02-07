import React, { Component } from "react";
import { variables } from "./Variables.js";

export class AllocateSubjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherList: [],
      selectedTeacher: "",
      subjectList: [],
      selectedSubject: "",
      allocateSubjects:[]
    };
  }

  refreshList(){
    fetch(variables.API_URL + "Teacher/TeacherList")
    .then(response => response.json())
    .then(data=>{
        this.setState({teacherList:data});
    });

    fetch(variables.API_URL + "Subject/SubjectList")
    .then(response => response.json())
    .then(data=>{
        this.setState({subjectList:data});
    });

  }

  componentDidMount(){
    this.refreshList();
  }


  changeTeacher = (e) => {
    this.setState({ selectedTeacher: e.target.value });

    fetch(variables.API_URL+'Teacher/TeacherSubjectList/'+e.target.value.split(' ').join('-'))
    .then(response => response.json())
    .then(data=>{
        this.setState({allocateSubjects:data});
    });
  };

  changeSubject = (e) => {
    this.setState({ selectedSubject: e.target.value });
  };

  allocateSubject(selectedTeacher, selectedSubject) {

    fetch(variables.API_URL+'Teacher/AllocateSubject/'+selectedTeacher.split(' ').join('-')+'/'+selectedSubject,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
      })
      .then(res=>res.json())
      .then((result)=>{
          alert(result);

          fetch(variables.API_URL+'Teacher/TeacherSubjectList/'+selectedTeacher.split(' ').join('-'))
          .then(response => response.json())
          .then(data=>{
              this.setState({allocateSubjects:data});
          });
      
       
      },(error)=>{
          alert('Failed');
      });   

        
  }

  deallocateSubject(selectedTeacher, selectedSubject){
    if(window.confirm('Are you sure?')){
    fetch(variables.API_URL+'Teacher/DeallocateSubject/'+selectedTeacher.split(' ').join('-')+'/'+selectedSubject,{
        method:'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then((result)=>{
        alert(result);

        fetch(variables.API_URL+'Teacher/TeacherSubjectList/'+selectedTeacher.split(' ').join('-'))
        .then(response => response.json())
        .then(data=>{
            this.setState({allocateSubjects:data});
        });
  },(error)=>{
        alert('Failed');
    })
    }
  }




  render() {
    const { 
      teacherList, 
      subjectList ,
      allocateSubjects,
      selectedTeacher,
      selectedSubject

    } = this.state;


    return (
      <div>
        <div sm={12} className="border-label">
          <div className="border-label-span">Teachers Details</div>
          <label>
            Teacher
            <select className="drop-down" onChange={this.changeTeacher}>
              <option selected>-- Select Teacher --</option>
              {teacherList.map((val, i) => (
                <option key={i} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div sm={12} className="border-label" style={{ marginTop: "35px" }}>
          <div className="border-label-span">Allocated Subjects</div>
          <label>
            Subject
            <select className="drop-down" onChange={this.changeSubject}>
            <option selected>-- Select Subject --</option>
              {subjectList.map((val, i) => (
                <option key={i} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="btn btn-success allocate-button" onClick={() => this.allocateSubject(selectedTeacher, selectedSubject)}>Allocate</button>
        </div>
        <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Subjects</th>
                        <th>Action</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {allocateSubjects.map(item=>
                        <tr key={item.SubjectId}>
                            <td>{item.SubjectName}</td>
                            <td><button type="button" className="btn btn-success deallocate-button" onClick={() => this.deallocateSubject(selectedTeacher,item.SubjectId)}>Deallocate</button></td>
                        </tr>)}
                </tbody>
                </table>
      </div>
    );
  }
}
