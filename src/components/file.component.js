import React, { Component } from "react";
import FileDataService from "../services/file.service";

export default class File extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getFile = this.getFile.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);

    this.state = {
      currentFile: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getFile(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentFile: {
          ...prevState.currentFile,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentFile: {
        ...prevState.currentFile,
        description: description
      }
    }));
  }

  getFile(id) {
    FileDataService.get(id)
      .then(response => {
        this.setState({
          currentFile: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentFile.id,
      title: this.state.currentFile.title,
      description: this.state.currentFile.description,
      published: status
    };

    FileDataService.update(this.state.currentFile.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentFile: {
            ...prevState.currentFile,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFile() {
    FileDataService.update(
      this.state.currentFile.id,
      this.state.currentFile
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The file was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteFile() {    
    FileDataService.delete(this.state.currentFile.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/files')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentFile } = this.state;

    return (
      <div>
        {currentFile ? (
          <div className="edit-form">
            <h4>File</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentFile.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentFile.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentFile.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentFile.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteFile}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateFile}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a File...</p>
          </div>
        )}
      </div>
    );
  }
}