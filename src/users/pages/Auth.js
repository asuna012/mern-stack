import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormElements/Input";
import "./Auth.css";
import { useForm } from "../../shared/hooks/form-hook";
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

  const signInSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <Card className="authentication">
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
  );
};

export default Auth;
