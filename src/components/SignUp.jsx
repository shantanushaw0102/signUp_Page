// Signup.jsx
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px 0;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #aaa;
  border-radius: 4px;
`;

const SubmitButton = styled.input`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const SignUp = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/signup", {
          email,
          password,
          mobileNo,
          address,
          pinCode,
        })
        .then((res) => {
          if (res.data == "exist") {
            alert("User already exists");
          } else if (res.data == "notexist") {
            history("/home", { state: { id: email } });
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SignUpContainer>
      <FormContainer action="POST" method="post">
        <label>Email:</label>
        <StyledInput
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter your Email-Id"
        />

        <label>Password:</label>
        <StyledInput
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter your password"
        />

        <label>Mobile No:</label>
        <StyledInput
          type="tel"
          onChange={(e) => {
            setMobileNo(e.target.value);
          }}
          placeholder="Enter your mobile number"
        />

        <label>Address:</label>
        <StyledInput
          type="text"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="Enter your address"
        />

        <label>Pincode:</label>
        <StyledInput
          type="text"
          onChange={(e) => {
            setPinCode(e.target.value);
          }}
          placeholder="Enter your pinCode"
        />

        <SubmitButton type="submit" onClick={submit} value="Submit" />
      </FormContainer>
      <br />
      <p>OR</p>
      <Link to="/">Login Page</Link>
    </SignUpContainer>
  );
};

export default SignUp;
