import React from "react";

export default function Form({
  formState,
  inputChange,
  formSubmit,
  errors,
  buttonDisabled,
  post
}) {
  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        type="text"
        name="name"
        value={formState.name}
        onChange={inputChange}
      />
      {errors.name.length > 0 ? (
        <p data-cy="nameError" className="error">
          {errors.name}
        </p>
      ) : null}
      <label htmlFor="email">Email: </label>
      <input
        id="email"
        type="text"
        name="email"
        value={formState.email}
        onChange={inputChange}
      />
      {errors.email.length > 0 ? (
        <p data-cy="emailError" className="error">
          {" "}
          {errors.email}
        </p>
      ) : null}{" "}
      <label htmlFor="pwd">Password: </label>
      <input
        id="pwd"
        type="text"
        name="pwd"
        value={formState.pwd}
        onChange={inputChange}
      />
      {errors.pwd.length > 0 ? (
        <p data-cy="pwdError" className="error">
          {errors.pwd}
        </p>
      ) : null}
      <input
        type="checkbox"
        name="terms"
        checked={formState.terms}
        onChange={inputChange}
      />
      <label htmlFor="terms" className="terms">
        Terms of Service
      </label>
      <button disabled={buttonDisabled}>Submit</button>
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </form>
  );
}
