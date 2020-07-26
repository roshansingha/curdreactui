import React, { Component } from "react";
import FileDataService from "../services/file.service";
import { Link } from "react-router-dom";

export default class FilesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveFiles = this.retrieveFiles.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFile = this.setActiveFile.bind(this);
    this.removeAllFiles = this.removeAllFiles.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      files: [],
      currentFile: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveFiles();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveFiles() {
    FileDataService.getAll()
      .then(response => {
        this.setState({
          files: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveFiles();
    this.setState({
      currentFile: null,
      currentIndex: -1
    });
  }

  setActiveFile(file, index) {
    this.setState({
      currentFile: file,
      currentIndex: index
    });
  }

  removeAllFiles() {
    FileDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    FileDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          files: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, files, currentFile, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Files List</h4>

          <ul className="list-group">
            {files &&
              files.map((file, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFile(file, index)}
                  key={index}
                >
                  {file.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllFiles}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentFile ? (
            <div>
              <h4>File</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentFile.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentFile.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentFile.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/files/" + currentFile.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a File...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}