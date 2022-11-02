import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CircularProgress,
} from "@mui/material";
import {
  Form,
  required,
  TextInput,
  useTranslate,
  useLogin,
  useNotify,
} from "react-admin";

import Box from "@mui/material/Box";
import { loginPreCheck } from "./utils";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const translate = useTranslate();

  const notify = useNotify();
  const login = useLogin();
  const location = useLocation();
  const handleSubmit = async (auth: FormValues) => {
    //@ts-ignore
    const isCorrect = await loginPreCheck(auth?.username, auth?.password);
    if (isCorrect) {
      setLoading(true);
      login(
        auth,
        location.state ? (location.state as any).nextPathname : "/"
      ).catch((error: Error) => {
        setLoading(false);
        notify(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
              ? "ra.auth.sign_in_error"
              : error.message,
          {
            type: "warning",
            messageArgs: {
              _:
                typeof error === "string"
                  ? error
                  : error && error.message
                    ? error.message
                    : undefined,
            },
          }
        );
      });
    } else {
      notify(`Invalid Credentials`, { type: "error" });
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Card sx={{ minWidth: 300, marginTop: "6em" }}>
          <Box
            sx={{
              margin: "1em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            SAMARTH LOGO
          </Box>
          <Box
            sx={{
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              color: (theme) => theme.palette.grey[900],
              fontWeight: 600,
            }}
          >
            Welcome to Samarth Admin
          </Box>
          <Box sx={{ padding: "0 1em 1em 1em" }}>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                autoFocus
                source="username"
                label={translate("ra.auth.username")}
                disabled={loading}
                validate={required()}
                fullWidth
              />
            </Box>
            <Box sx={{ marginTop: "1em" }}>
              <TextInput
                source="password"
                label={translate("ra.auth.password")}
                type="password"
                disabled={loading}
                validate={required()}
                fullWidth
              />
            </Box>
          </Box>
          <CardActions sx={{ padding: "0 1em 1em 1em" }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading && <CircularProgress size={25} thickness={2} />}
              {translate("ra.auth.sign_in")}
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Form>
  );
};

Login.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default Login;

interface FormValues {
  username?: string;
  password?: string;
}
