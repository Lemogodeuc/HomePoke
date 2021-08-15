import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    marginTop: theme.spacing(5),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
