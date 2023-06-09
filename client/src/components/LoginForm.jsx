import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { AuthFormConfig } from "../config/auth-form.validation.js";
import { TextField } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthActions from "../redux/auth/authOperations.js";

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const isErrorAuth = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  return (
    <Box>
      <Formik
        onSubmit={(values) =>
          dispatch(
            AuthActions.signin({
              email: values.email.toLocaleLowerCase(),
              password: values.password,
            })
          )
        }
        initialValues={AuthFormConfig.initialValuesLogin}
        validationSchema={AuthFormConfig.loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              disabled={isLoading}
              style={{ height: "60px" }}
            />

            <FormControl variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={Boolean(touched.password && errors.password)}
              >
                Password
              </InputLabel>
              <OutlinedInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.password && errors.password)}
                disabled={isLoading}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                error={Boolean(touched.password && errors.password)}
                sx={{
                  visibility:
                    touched.password && errors.password ? "visible" : "hidden",
                  height: "12px",
                }}
              >
                {errors.password}
              </FormHelperText>
            </FormControl>

            <LoadingButton
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
              loadingPosition="center"
              type="submit"
              sx={{
                margin: "0 auto 1rem auto",
                padding: "0.25rem 4rem",
                fontSize: "0.9rem",
                color: "#fff",
              }}
            >
              <span>Sign In</span>
            </LoadingButton>
          </form>
        )}
      </Formik>

      <Box>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              textDecoration: "none",
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
          >
            "Don't have an account? Sign Up here."
          </Typography>
        </Link>
        {isErrorAuth && (
          <Typography sx={{ textAlign: "right", color: "red" }}>
            {isErrorAuth}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
