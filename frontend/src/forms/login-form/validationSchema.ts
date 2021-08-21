import * as yup from "yup";

// export default yup.object({
//   firstname: yup.string().min(2, "2 caractères minimum").required("Tu as oublié de renseigner l'adresse email"),
//   lastname: yup.string().min(2, "2 caractères minimum").required("Tu as oublié de renseigner l'adresse email"),
//   email: yup.string().email("L'adresse email semble incorrecte").required("Tu as oublié de renseigner l'adresse email"),
//   password: yup.string().min(5).required("Tu as oublié de renseigner le mot de passe"),
//   passwordRepeat: yup
//     .string()
//     .min(5)
//     .oneOf([yup.ref("password"), null], "Les mots de passe sont différents")
//     .required("Tu as oublié de répéter le mot de passe"),
// });

export const loginValidationSchema = yup.object({
  email: yup.string().email("L'adresse email semble incorrecte").required("Tu as oublié de renseigner l'adresse email"),
  password: yup.string().min(5).required("Tu as oublié de renseigner le mot de passe"),
});

export const registerValidationSchema = yup.object({
  firstname: yup.string().min(2, "2 caractères minimum").required("Tu as oublié de renseigner l'adresse email"),
  lastname: yup.string().min(2, "2 caractères minimum").required("Tu as oublié de renseigner l'adresse email"),
  email: yup.string().email("L'adresse email semble incorrecte").required("Tu as oublié de renseigner l'adresse email"),
  password: yup.string().min(5).required("Tu as oublié de renseigner le mot de passe"),
  passwordRepeat: yup
    .string()
    .min(5)
    .oneOf([yup.ref("password"), null], "Les mots de passe sont différents")
    .required("Tu as oublié de répéter le mot de passe"),
});
