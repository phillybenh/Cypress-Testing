import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./Components/Form";
import UserGrid from "./Components/UserGrid";
import * as yup from "yup";

import "./App.css";

//schema for form validation
const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup
    .string()
    .email("A valid email address is required")
    .required("An email address is required"),
  pwd: yup
    .string()
    .required("A password is required")
    .min(6, "Password must have at least 6 characters"),
  terms: yup
    .boolean()
    .oneOf([true], "Please check to agree to our terms of service")
});

function App() {
  // state for the form
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    pwd: "",
    terms: ""
  });

  //state for errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    pwd: "",
    terms: ""
  });

  // state's
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [post, setPost] = useState([]);

  const [users, setUsers] = useState([]);

  // adding a useEffect to validate w/ the schema every time formState updates
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const validateChange = event => {
    yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [event.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors
        });
      });
  };

  //event handlers
  const inputChange = event => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    };
    validateChange(event);
    setFormState(newFormData);
  };

  const formSubmit = event => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data);
        // console.log(res.data);
        // console.log("success", post);
        const newUser = {
          createdAt: res.data.createdAt,
          email: res.data.email,
          id: res.data.id,
          name: res.data.name,
          pwd: res.data.pwd,
          terms: res.data.terms
        };
        setUsers([...users, newUser]);
        console.log("users", users)

        setFormState({
          name: "",
          email: "",
          pwd: "",
          terms: ""
        });
      })
      .catch(err => {
        console.log(err.res);
      });
  };

  return (
    <div className="App">
      <Form
        formState={formState}
        inputChange={inputChange}
        formSubmit={formSubmit}
        errors={errors}
        buttonDisabled={buttonDisabled}
        post={post}
      />
      {/* {users.map(user => (
        <div key={user.id}>
          {user.name} 
        </div>
      ))} */}
      <UserGrid users={users} /> 
    </div>
  );
}

export default App;
