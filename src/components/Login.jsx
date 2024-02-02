// Login.jsx
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
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

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/", {
          email,
          password,
        })
        .then((res) => {
          if (res.data == "exist") {
            history("/home", { state: { id: email } });
          } else if (res.data == "notexist") {
            alert("User have not Sign Up");
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
    <LoginContainer>
      <FormContainer action="POST" method="post">
        <label>Email:</label>
        <StyledInput
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email-Id"
        />

        <label>Password:</label>
        <StyledInput
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />

        <SubmitButton type="submit" onClick={submit} value="Submit" />
      </FormContainer>
      <br />
      <p>OR</p>
      <Link to="/signup">SignUp Page</Link>
    </LoginContainer>
  );
};

export default Login;
