/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Text } from "office-ui-fabric-react";

import Card from "../../components/card";
import LoginPageWrapper from "./style";
import LoginForm from "./form";

const LoginPage: React.FunctionComponent = React.memo(() => {
  return (
    <LoginPageWrapper>
      <Card width="450px">
        <Text
          variant="xxLarge"
          css={theme => ({
            color: theme.palette.themePrimary,
            textAlign: "center",
            marginBottom: "15px"
          })}
        >
          Remote NLog Viewer
        </Text>
        <LoginForm />
      </Card>
    </LoginPageWrapper>
  );
});

export default LoginPage;
