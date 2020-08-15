import React from 'react';
import { post } from 'axios';
import { toast } from 'react-toastify';

class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(response => {
      console.log(response.data);
    });
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  async fileUpload(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          authorization: this.props.token,
        },
      };
      const fileUploaded = await post(this.props.url, formData, config);
      toast.success('File is Uploaded Succesfully');
      return fileUploaded;
    } catch (err) {
      toast.error('Check your connection');
    }
  }

  render() {
    return (
      <>
        <form style={this.props.style}>
          <h1 style={{ paddingBottom: '1rem' }}>File Upload</h1>
          <input type="file" className="inputFile" onChange={this.onChange} />
          <span onClick={this.onFormSubmit} type="submit" className="upload">
            Upload
          </span>
        </form>
        <style jsx>{`
          .upload {
            float: right;
            text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
            font-size: 2rem;
            cursor: pointer;
            color: #d7d7f3;
          }
          .upload:hover {
            transform: scale(1.1);
          }
          .inputFile {
            text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
            font-size: 1rem;
            cursor: pointer;
            color: #d7d7f3;
          }
        `}</style>
      </>
    );
  }
}

export default SimpleReactFileUpload;
