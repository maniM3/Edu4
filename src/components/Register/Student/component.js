import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SimpleStorageContract from "../../../contracts/SimpleStorage.json";
import RegFactoryContract from "../../../contracts/RegistrationAndCertificateContractFactory.json";
import getWeb3 from "../../../utils/getWeb3";

import Uppernav from "../../UpperNav/component";
import Carousel from "../../Carousel/component";
import "./student.css";
class student extends Component {
  /* ################ Ethereum ############# */

  constructor(props) {
    super(props);
    this.state = {
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
      instance: null,

      sname: null,
      phone: null,
      emailID: null
    };
  }
  /*state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    instance: null,

    sname: null,
    phone: null,
    emailID: null
  }; */

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = RegFactoryContract.networks[networkId];
      const instance = new web3.eth.Contract(
        RegFactoryContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  /*runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    const resp = await contract.methods
      .createStudent("XYooptyUKZ", 5, "gyu")
      .send({ from: accounts[0], gas: 230000 });

    console.log(resp);
    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.getS().call();
    // console.log(response);

    // Update state with the result.
    // this.setState({ storageValue: response });
  }; */
  /* ############# Ethereum Ends ############# */

  handleSubmit = event => {
    var sname = this.state.sname;
    var phone = this.state.phone;
    var emailID = this.state.emailID;
    event.preventDefault();
    const { accounts, contract } = this.state;
    contract.methods
      .createStudent(sname, phone, emailID)
      .send({ from: accounts[0], gas: 230000 })
      .then(function(result) {
        console.log(result);
      })
      .catch(function(e) {
        console.log(e);
      });

    var sname = this.state.sname;
    // var sname = document.getElementById("sname").value;
    console.log("Value of sname is ", sname);
  };

  handleInputChange = event => {
    event.preventDefault();
    console.log(event);
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
      //  sname: event.target.value
    });
  };

  /* handleSubmit = event => {
    event.preventDefault();
    const { accounts, contract } = this.state;
    contract.methods
      .createStudent("JSR", 98, "hyi")
      .send({ from: accounts[0], gas: 130000 })
      .then(function(result) {
        console.log(result);
        console.log(event.target[0].value);
        /* contract.methods
          .getS()
          .call()
          .then(function(result) {
            console.log(result); */
  /*  })
      .catch(function(e) {
        console.log(e);
      });
  };  */

  /* constructor(props) {
    super(props);
    this.state = {
      name: null,
      mother: null,
      phone: null,
      email: null,
      regNo: null,
      yearOfJoining: null,
      yearOfPassing: null,
      web3: null, 
      accounts: null, 
      contract: null
    };
  } */

  render() {
    return (
      <div>
        <Uppernav />
        <Carousel />

        <div className="container">
          <div className="stud">
            <h2 className="h">Student Registration form</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-user" />
                </span>
                <input
                  id="sname"
                  type="text"
                  className="form-control"
                  name="sname"
                  placeholder="Full Name"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-user" />
                </span>
                <input
                  id="mother"
                  type="text"
                  className="form-control"
                  name="mother"
                  placeholder="Mother's Name"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-phone" />
                </span>
                <input
                  id="phone"
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Mobile Number"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />

              <div className="input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-envelope" />
                </span>
                <input
                  id="emailID"
                  type="email"
                  className="form-control"
                  name="emailID"
                  placeholder="Email ID"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />

              <div className="input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-education" />
                </span>
                <input
                  id="regNo"
                  type="text"
                  className="form-control"
                  name="regNo"
                  placeholder="Undergraduation Registration Number"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-education" />
                </span>
                <input
                  id="yearOfJoining"
                  type="text"
                  className="form-control"
                  name="yearOfJoining"
                  placeholder="Year of Joining"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-education" />
                </span>
                <input
                  id="yearOfPassing"
                  type="text"
                  className="form-control"
                  name="yearOfPassing"
                  placeholder="Year of Passing"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default student;
