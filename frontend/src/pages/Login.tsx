import { FC, ReactElement, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Container, Box, Typography, Divider, Paper } from "@material-ui/core";
import PageTitle from "../components/PageTitle";

// form
import { LoginForm } from "../forms";

// context
// import { AppContext } from "../context";

// hook
// import useOffers from "../hooks/useOffers";

// constants
import { APP_TITLE, PAGE_TITLE_LOGIN } from "../utils/constants";

// types
// import { Offer } from "../model/Offer.model";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    content: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: theme.spacing(3),
    },
    bloc: {
      width: "45%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      padding: theme.spacing(3),
    },
  })
);

const Login: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  // const { state } = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_LOGIN} | {APP_TITLE}
        </title>
      </Helmet>
      <br></br>
      <Container maxWidth="md" className={classes.root}>
        <PageTitle title={PAGE_TITLE_LOGIN} />
        <br></br>
        <Paper className={classes.content} square>
          <Box className={classes.bloc}>
            <Typography variant="h5" color="secondary">
              Connexion
            </Typography>
            <LoginForm type="login" />
          </Box>
          <Divider flexItem orientation="vertical" variant="fullWidth" />
          <Box className={classes.bloc} style={{ backgroundColor: "#edf6ff" }}>
            <Typography variant="h5" color="secondary">
              Inscription
            </Typography>
            <LoginForm type="register" />
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
