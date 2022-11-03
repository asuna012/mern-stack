import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import "./Auth.css";
import { useForm } from "../../shared/hooks/form-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoggedInMode, setIsLoggedInMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const switchModeHandler = (event) => {
    if (!isLoggedInMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoggedInMode((prevMode) => !prevMode);
  };

  const signInSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (isLoggedInMode) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again");
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong, please try again");
      }
    }
  };
  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={signInSubmitHandler}>
          {!isLoggedInMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            type="email"
            id="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please input a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            type="password"
            id="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password. Minimum of 5 characters."
            onInput={inputHandler}
          />

          <Button type="submit" disabled={!formState.isValid}>
            {isLoggedInMode ? "LOGIN" : "SIGN IN"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO
          {isLoggedInMode ? " SIGNUP" : " LOGIN"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
