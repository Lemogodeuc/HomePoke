import * as yup from "yup";

export default yup.object({
  title: yup.string().min(3, "au moins 3 caractères").required("L'url est obligatoire"),
  url: yup
    .string()
    .url("l'url est invalide")
    .required("L'url est obligatoire")
    .test(
      "hostvalidation",
      'cette url ne pointe pas sur la section "immobilier" de leboncoin.fr',
      (value: string | undefined): boolean =>
        !!value && value.startsWith(`https://www.leboncoin.fr/recherche?category=10`)
    ),
  frequency: yup.number().required("Il faut une valeur pour la fréquence"),
});
