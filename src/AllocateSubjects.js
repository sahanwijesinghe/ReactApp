import React, { Component } from "react";
import { variables } from "./Variables.js";

export class AllocateSubjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherList: ["Nimal", "Kamal", "Sunimal"],
      selectedTeacher: "",
      subjectList: ["Maths", "English", "Science"],
      selectedSubject: "",
    };
  }

  changeTeacher = (e) => {
    this.setState({ selectedTeacher: e.target.value });
  };

  changeSubject = (e) => {
    this.setState({ selectedSubject: e.target.value });
  };

  allocateTeacher() {
    console.log(
      "Teacher: " +
        this.state.selectedTeacher +
        ", Subject: " +
        this.state.selectedSubject
    );
  }

  render() {
    const { teacherList, subjectList } = this.state;

    return (
      <div>
        <div sm={12} className="border-label">
          <div className="border-label-span">Teachers Details</div>
          <label>
            Teacher
            <select className="drop-down" onChange={this.changeTeacher}>
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
              {subjectList.map((val, i) => (
                <option key={i} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="btn btn-success allocate-button"
            onClick={() => this.allocateTeacher()}
          >
            Allocate
          </button>
        </div>
      </div>
    );
  }
}
