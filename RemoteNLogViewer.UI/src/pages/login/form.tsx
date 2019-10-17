/** @jsx jsx */
import React, { useCallback, useState } from "react";
import { jsx } from "@emotion/core";
import {
  TextField,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  IStackTokens,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
import { FormikProps, FormikErrors, Form, Formik, FormikActions } from "formik";
import { useHistory } from "react-router";

import http from "../../infra/http";

const verticalGapStackTokens: IStackTokens = {
  childrenGap: 16
};

type LoginFormValues = {
  username: string;
  password: string;
};

const LoginForm: React.FunctionComponent = React.memo(() => {
  const [visibleMessageBarError, setVisibleMessageBarError] = useState(false);
  const { push } = useHistory();

  const handleValidate = useCallback((values: LoginFormValues) => {
    let errors: FormikErrors<LoginFormValues> = {};
    if (!values.username) {
      errors.username = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  }, []);

  const handleSubmit = useCallback(
    async (
      { username, password }: LoginFormValues,
      { setSubmitting }: FormikActions<LoginFormValues>
    ) => {
      try {
        const response = await http.post("/api/v1/logs/login", {
          username,
          password
        });

        sessionStorage.setItem("token", response.data.access_token);
        sessionStorage.setItem("userName", username);
        sessionStorage.setItem("displayName", response.data.displayName);

        setSubmitting(false);
        push("/viewer");
      } catch (error) {
        setSubmitting(false);
        setVisibleMessageBarError(true);
      }
    },
    [push]
  );

  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      validate={handleValidate}
      onSubmit={handleSubmit}
      render={({
        handleBlur,
        handleChange,
        touched,
        errors,
        values,
        isSubmitting,
        isValid
      }: FormikProps<LoginFormValues>) => (
        <Form>
          <Stack tokens={verticalGapStackTokens}>
            <TextField
              label="Username"
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={
                touched.username && errors.username
                  ? errors.username
                  : undefined
              }
            />
            <TextField
              label="Password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
            />
            <PrimaryButton
              primary
              css={{ width: "100%", height: "48px", marginTop: "20px" }}
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              {isSubmitting ? <Spinner size={SpinnerSize.medium} /> : "Login"}
            </PrimaryButton>
            {visibleMessageBarError && (
              <MessageBar messageBarType={MessageBarType.error}>
                Unable to create authentication token
              </MessageBar>
            )}
          </Stack>
        </Form>
      )}
    />
  );
});

export default LoginForm;
