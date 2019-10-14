import * as React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { print_state, print_city } from '../../helpers/index';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        gender: '',
        state: '',
        city: '',
        address: '',
        notes: '',
        values: [],
        loading: false,
        submitSuccess: false,
        stateSelectedIndex: 0,
        errors: {}
    }
  }

  handleValidation() {
    let { first_name, last_name, email, phone, gender, state, city } = this.state;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!first_name){
      formIsValid = false;
      errors["first_name"] = "First Name Cannot be empty";
    }

    if(typeof first_name !== "undefined"){
      if(!first_name.match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["first_name"] = "First Name Only letters";
      }        
    }

    if(!last_name){
      formIsValid = false;
      errors["last_name"] = "Last Name Cannot be empty";
    }

    //Email
    if(!email){
      formIsValid = false;
      errors["email"] = "Email Cannot be empty";
    }

    if(typeof email !== "undefined"){
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
   } 

    if(!phone){
      formIsValid = false;
      errors["phone"] = "Phone number Cannot be empty";
    }

    if(typeof phone !== "undefined"){
      const filter = /^((\+[1-9]{1,4}[ -]*)|(\([0-9]{2,3}\)[ -]*)|([0-9]{2,4})[ -]*)*?[0-9]{3,4}?[ -]*[0-9]{3,4}?$/;

      if (filter.test(parseInt(phone))) {
        if(phone.length !== 10){
          formIsValid = false;
          errors["phone"] = "Please put 10  digit mobile number";
        }
      } else {
        errors["phone"] = "Not a valid mobile number";
        formIsValid = false;
      }       
    } 

    if(!gender){
      formIsValid = false;
      errors["gender"] = "Select gender";
    }

    if(!state){
      formIsValid = false;
      errors["state"] = "Select state";
    }

    if(!city){
      formIsValid = false;
      errors["city"] = "Select city";
    }

   this.setState({errors: errors});

   if(errors) document.documentElement.scrollTop = 0;

   return formIsValid;
}

  processFormSubmission = e => {
    e.preventDefault();

    if(!this.handleValidation()) return;

    this.setState({ loading: true });

    const formData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone: this.state.phone,
      gender: this.state.gender,
      state: this.state.state,
      city: this.state.city,
      address: this.state.address,
      notes: this.state.notes,
    }

    console.log(formData)

    this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

    axios.post(`http://localhost:2828/contacts`, formData).then(data => [
      setTimeout(() => {
        this.props.history.push('/');
      }, 100)
    ]);
  }

  handleInputChanges = e => {
    e.preventDefault();
    let newState = {
      [e.currentTarget.name]: e.currentTarget.value
    }
    if(e.target.name === 'state') {
      newState['stateSelectedIndex'] = e.target.selectedIndex;
    }
    this.setState(newState);
  }

  render() {
    const { submitSuccess, loading, errors } = this.state;
    return (
      <div>
        <div className={"col-md-12 form-wrapper"}>
          <h2> Create Contact </h2>
          {!submitSuccess && (
            <div className="alert alert-info" role="alert">
              Fill the form below to create a new contact
            </div>
          )}

          {submitSuccess && (
            <div className="alert alert-success" role="alert">
              The new contact was successfully created!
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            Object.keys(errors).map(error => {
              return (
                <div key={error} className="alert alert-danger" role="alert">
                  {errors[error]}
                </div>
              )
            })
          )}

          <form id={"create-contact-form"} onSubmit={this.processFormSubmission} noValidate={true}>
            <div className="form-group col-md-12">
              <label htmlFor="first_name"> First Name </label>
              <input type="text" id="first_name" onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter first name" />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="last_name"> Last Name </label>
              <input type="text" id="last_name" onChange={(e) => this.handleInputChanges(e)} name="last_name" className="form-control" placeholder="Enter last name" />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="email"> Email </label>
              <input type="email" id="email" onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter email address" />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="phone"> Phone </label>
              <input type="text" id="phone" onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter phone number" />
            </div>

            <div className="form-group col-md-12">
              <div className="mb-2"> Gender </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" onChange={(e) => this.handleInputChanges(e)} name="gender" id="inlineRadio1" value="Male" />
                <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" onChange={(e) => this.handleInputChanges(e)} name="gender" id="inlineRadio2" value="Female" />
                <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
              </div>
            </div>

            <div className="form-group col-md-12">
              <div className="mb-2"> State </div>
              <select className="form-control" name="state" onChange={(e) => this.handleInputChanges(e)}>
                {print_state()}
              </select>
            </div>

            <div className="form-group col-md-12">
              <div className="mb-2"> City </div>
              <select className="form-control" name="city" onChange={(e) => this.handleInputChanges(e)}>
                {print_city(this.state.stateSelectedIndex)}
              </select>
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="address"> Address </label>
              <input type="text" id="address" onChange={(e) => this.handleInputChanges(e)} name="address" className="form-control" placeholder="Enter address" />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="notes"> Notes </label>
              <textarea id="notes" onChange={(e) => this.handleInputChanges(e)} name="notes" className="form-control" placeholder="Enter Description"></textarea>
            </div>

            <div className="form-group col-md-4 pull-right">
              <button className="btn btn-success" type="submit">
                Create Contact
              </button>
              {loading &&
                <span className="fa fa-circle-o-notch fa-spin" />
              }
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Create)