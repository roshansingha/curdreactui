import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';

import AddFile from "./components/add-file.component";
import File from "./components/file.component";
import FilesList from "./components/files-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/files" className="navbar-brand">
              File System
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/files"} className="nav-link">
                  files
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/files"]} component={FilesList}/>
              <Route exact path="/add" component={AddFile}/>
              <Route path="/files/:id" component={File}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
