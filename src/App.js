import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import { Student } from './Student';
import { Classroom } from './Classroom';
import { Teacher } from './Teacher';
import { Subject } from './Subject';
import { AllocateSubjects } from './AllocateSubjects';
import { AllocateClassrooms } from './AllocateClassrooms';

import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="App container">

      <nav className='navbar navbar-expand-sm bg-light navbar-dark'>

        <ul className='navbar -nav'>

          <li className="nav-item- m-1"><NavLink className="btn btn-light btn-outline-primary" to="/student">Students</NavLink></li>
          <li className="nav-item- m-1"><NavLink className="btn btn-light btn-outline-primary" to="/classroom">Classrooms</NavLink></li>
          <li className="nav-item- m-1"><NavLink className="btn btn-light btn-outline-primary" to="/teacher">Teachers</NavLink></li>
          <li className="nav-item- m-1"><NavLink className="btn btn-light btn-outline-primary" to="/subject">Subject</NavLink></li>
          <li className="nav-item- m-1"><NavLink className="btn btn-light btn-outline-primary" to="/allocate-subjects">Allocate Subjects</NavLink></li>
          <li className="nav-item- m-1"><NavLink className="btn btn-light btn-outline-primary" to="/allocate-classrooms">Allocate Classrooms</NavLink></li>
        </ul>

      </nav>

      <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/student' component={Student}/>
        <Route path='/classroom' component={Classroom}/>
        <Route path='/teacher' component={Teacher}/>
        <Route path='/subject' component={Subject}/>
        <Route path='/allocate-subjects' component={AllocateSubjects}/>
        <Route path='/allocate-classrooms' component={AllocateClassrooms}/>

      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
