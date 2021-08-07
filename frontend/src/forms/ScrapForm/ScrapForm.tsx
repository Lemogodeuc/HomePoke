import { FC, ReactElement, useState } from "react";
import { Button, TextField, InputLabel, MenuItem, FormHelperText, FormControl, Select } from "@material-ui/core";
import { MINUTE, HOUR, DAY } from "../../utils/constants";
import { useFormik } from "formik";
import { ScrapFormValues, Scrap } from "../../model/Scrap.model";
import useStyles from "./styles";
import initValues from "./initValues";
import validationSchema from "./validationSchema";
import API from "../../data";

const ScrapForm: FC<{ handleClose: any; values?: Scrap; mode: string }> = ({
  handleClose,
  values = {},
  mode,
}): ReactElement => {
  const classes = useStyles();
  const [active, setActive] = useState({
    status: true,
    helperText: "Fournisseur pas encore disponible",
  });

  const formik = useFormik({
    initialValues: initValues(values),
    validationSchema,
    onSubmit: async (values: ScrapFormValues) => {
      try {
        mode === "create" ? await API.scraper.createOne(1, values) : await API.scraper.updateOne(values);
        // TODO: update context with result
        handleClose();
      } catch (error) {
        console.log("[error] ", error);
      }
    },
  });

  const handleChangeDisabled = (event: any) => {
    const isValid = event.target.value === "leboncoin.fr";
    setActive({
      status: isValid,
      helperText: isValid ? "" : "Fournisseur pas encore disponible",
    });
    formik.handleChange(event);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <TextField
        required
        fullWidth
        type="string"
        id="title"
        label="Titre"
        value={formik.values.title}
        onChange={formik.handleChange}
        onFocus={() => formik.setFieldValue("title", "")}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <FormControl className={classes.formControl} fullWidth>
        <InputLabel id="data-provider">Fournisseur de données</InputLabel>
        <Select
          labelId="select-data-provider-label"
          id="data-provider"
          name="provider"
          value={formik.values.provider}
          onChange={handleChangeDisabled}
        >
          <MenuItem value={"leboncoin.fr"}>leboncoin.fr</MenuItem>
          <MenuItem value={"orpi.fr"}>orpi.fr</MenuItem>
          <MenuItem value={"seloger.fr"}>seloger.fr</MenuItem>
        </Select>
        <FormHelperText>{active.helperText}</FormHelperText>
      </FormControl>
      <TextField
        required
        fullWidth
        type="string"
        id="url"
        label="URL"
        value={formik.values.url}
        disabled={!active.status}
        onChange={formik.handleChange}
        onFocus={() => formik.setFieldValue("url", "")}
        error={formik.touched.url && Boolean(formik.errors.url)}
        helperText={formik.touched.url && formik.errors.url}
      />
      <FormControl className={classes.formControl} fullWidth disabled={!active.status}>
        <InputLabel id="frequency">Fréquence des requêtes</InputLabel>
        <Select
          labelId="select-frequency-label"
          id="frequency"
          name="frequency"
          value={formik.values.frequency}
          onChange={formik.handleChange}
        >
          <MenuItem value={0}>1 seule fois</MenuItem>
          <MenuItem value={MINUTE * 15}>tous les quarts d'heure</MenuItem>
          <MenuItem value={MINUTE * 30}>toutes les demies heures</MenuItem>
          <MenuItem value={HOUR}>toutes les heures</MenuItem>
          <MenuItem value={HOUR * 12}>toutes les 12 heures</MenuItem>
          <MenuItem value={DAY}>tout les jours</MenuItem>
          <MenuItem value={DAY * 7}>toutes les semaines</MenuItem>
        </Select>
        <FormHelperText>
          Si tu as plusieurs scrapers actifs, mieux vaut choisir une fréquence plus espacée pour éviter de te faire
          blacklister.
        </FormHelperText>
      </FormControl>
      <Button onClick={handleClose} color="default" variant="outlined" className={classes.button} fullWidth>
        Annuler
      </Button>
      <Button variant="contained" color="primary" type="submit" disabled={!active.status}>
        Valider
      </Button>
    </form>
  );
};

export default ScrapForm;
