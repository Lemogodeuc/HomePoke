import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    alignContent: "flex-start",
    marginTop: theme.spacing(5),
    "& > *": {
      // marginBottom: theme.spacing(3),
    },
  },
  field: {
    marginBottom: theme.spacing(3),
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginTop: theme.spacing(5),
  },
  visibilityIcon: {
    cursor: "pointer",
    color: "gray",
  },
}));
