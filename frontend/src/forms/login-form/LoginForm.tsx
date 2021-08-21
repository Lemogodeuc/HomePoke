import { FC, ReactElement, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useFormik } from "formik";

import useStyles from "./styles";
import initValues from "./initValues";
import { loginValidationSchema, registerValidationSchema } from "./validationSchema";

// icons
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// hook
import useUsers from "../../hooks/useUsers";

// types
import { UserLogin, UserRegister } from "../../model/User.model";

const LoginForm: FC<{ type: "login" | "register" }> = ({ type }): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, registerUser } = useUsers();
  const classes = useStyles();

  const validateButton = {
    login: "Je me connecte",
    register: "Je m'inscris",
  };

  const formik = useFormik({
    initialValues: initValues(type),
    validationSchema: type === "login" ? loginValidationSchema : registerValidationSchema,
    onSubmit: async (values: UserLogin) => {
      try {
        if (values.passwordRepeat) {
          delete values.passwordRepeat;
        }
        type === "login" ? loginUser(values) : registerUser(values as UserRegister);
      } catch (error) {
        console.log("[error] ", error);
      }
    },
  });

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      {type === "register" && (
        <>
          <TextField
            className={classes.field}
            required
            fullWidth
            type="string"
            id="firstname"
            label="Prénom"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
          <TextField
            className={classes.field}
            required
            fullWidth
            type="string"
            id="lastname"
            label="Nom"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
          />
        </>
      )}
      <TextField
        className={classes.field}
        required
        fullWidth
        type="email"
        id="email"
        label="Adresse email"
        placeholder="ex: contact@homepoke.com"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={
          (formik.touched.email && formik.errors.email) ||
          (type === "register" && "Elle servira à t'envoyer les emails des nouvelles offres")
        }
      />
      <TextField
        className={classes.field}
        required
        fullWidth
        type={showPassword ? "string" : "password"}
        id="password"
        label="Mot de passe"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        InputProps={{
          endAdornment: showPassword ? (
            <Visibility
              fontSize="small"
              className={classes.visibilityIcon}
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <VisibilityOff
              fontSize="small"
              className={classes.visibilityIcon}
              onClick={() => setShowPassword(!showPassword)}
            />
          ),
        }}
      />
      {type === "register" && (
        <TextField
          className={classes.field}
          required
          fullWidth
          type={showPassword ? "string" : "password"}
          id="passwordRepeat"
          label="Répète le mot de passe"
          value={formik.values.passwordRepeat}
          onChange={formik.handleChange}
          error={formik.touched.passwordRepeat && Boolean(formik.errors.passwordRepeat)}
          helperText={formik.touched.passwordRepeat && formik.errors.passwordRepeat}
        />
      )}

      <div className={classes.actions}>
        {type === "login" && (
          <Button variant="text" color="default">
            Mot de passe oublié ?
          </Button>
        )}
        <Button variant="contained" color="primary" type="submit" style={{ marginLeft: "auto" }}>
          {validateButton[type]}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
