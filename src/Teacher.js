import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Teacher extends Component{

    constructor(props){
        super(props);

        this.state={
            students:[],
            classrooms:[],
            teachers:[],
            subjects:[],
            modalTitle:"",
            TeacherId:0,
            FirstName:"",
            LastName:"",
            ContactNo:"",
            EmailAddress:"",
            ClassroomName:""
        }
    }

    refreshList(){

        fetch(variables.API_URL+'student')
        .then(response=>response.json())
        .then(data=>{
            this.setState({students:data});
        });

        fetch(variables.API_URL+'teacher')
        .then(response=>response.json())
        .then(data=>{
            this.setState({teachers:data});
        });

        fetch(variables.API_URL+'classroom')
        .then(response=>response.json())
        .then(data=>{
            this.setState({classrooms:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeFirstName =(e)=>{
        this.setState({FirstName:e.target.value});
    }
    changeLastName =(e)=>{
        this.setState({LastName:e.target.value});
    }
    changeContactNo =(e)=>{
        this.setState({ContactNo:e.target.value});
    }

    changeEmailAddress =(e)=>{
        this.setState({EmailAddress:e.target.value});
    }
    // changeClassroomName =(e)=>{
    //     this.setState({ClassroomName:e.target.value});
    // }

    addClick(){
        this.setState({
            modalTitle:"Add Teacher",
            TeacherId:0,
            FirstName:"",
            LastName:"",
            ContactNo:"",
            EmailAddress:"",
            // ClassroomName:""
        });
    }
    editClick(teacher){
        this.setState({
            modalTitle:"Edit Teacher",
            TeacherId:teacher.TeacherId,
            FirstName:teacher.FirstName,
            LastName:teacher.LastName,
            ContactNo:teacher.ContactNo,
            // ClassroomName:teacher.ClassroomName
        });
    }

    createClick(){
        fetch(variables.API_URL+'teacher',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                FirstName:this.state.FirstName,
                LastName:this.state.LastName,
                ContactNo:this.state.ContactNo,
                EmailAddress:this.state.EmailAddress,
                // ClassroomName:this.state.ClassroomName
                })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'teacher',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                TeacherId:this.state.TeacherId,
                FirstName:this.state.FirstName,
                LastName:this.state.LastName,
                ContactNo:this.state.ContactNo,
                EmailAddress:this.state.EmailAddress,
                // ClassroomName:this.state.ClassroomName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'teacher/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const {
            classrooms,
            teachers,
            modalTitle,
            TeacherId,
            FirstName,
            LastName,
            ContactNo,
            EmailAddress
            // ClassroomName
        }=this.state;

        return(
                <div>

                    <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.addClick()}>
                        Add Teacher
                    </button>
                    <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact No</th>
                        <th>Email Address</th>
                        {/* <th>Classroom</th> */}
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                        {teachers.map(teacher=>
                            <tr key={teacher.TeacherId}>
                                <td>{teacher.FirstName}</td>
                                <td>{teacher.LastName}</td>
                                <td>{teacher.ContactNo}</td>
                                <td>{teacher.EmailAddress}</td>
                                {/* <td>{teacher.ClassroomName}</td> */}
                                <td>
                                <button type="button"
                                className="btn btn-light mr-1"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={()=>this.editClick(teacher)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>

                                <button type="button"
                                className="btn btn-light mr-1"
                                onClick={()=>this.deleteClick(teacher.TeacherId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>

                                </td>
                            </tr>
                            )}
                    </tbody>
                    </table>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">First Name</span>
                                    <input type="text" className="form-control"
                                    value={FirstName}
                                    onChange={this.changeFirstName}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Last Name</span>
                                    <input type="text" className="form-control"
                                    value={LastName}
                                    onChange={this.changeLastName}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Contact No</span>
                                    <input type="text" className="form-control"
                                    value={ContactNo}
                                    onChange={this.changeContactNo}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Email Address</span>
                                    <input type="text" className="form-control"
                                    value={EmailAddress}
                                    onChange={this.changeEmailAddress}/>
                                </div>


                                {/* <div className="input-group mb-3">
                                    <span className="input-group-text">Classroom Name</span>
                                    <select className="form-select"
                                    onChange={this.changeClassroomName}
                                    value={ClassroomName}>
                                        {classrooms.map(room=><option key={room.ClassroomId}>
                                            {room.ClassroomName}
                                        </option>)}
                                    </select>
                                </div> */}


                                {TeacherId==0?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={()=>this.createClick()}
                                        >Add
                                    </button>
                                :null}

                                {TeacherId!=0?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={()=>this.updateClick()}
                                        >Update
                                    </button>
                                :null}
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}