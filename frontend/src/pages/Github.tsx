import { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core/";
import GitHubIcon from '@material-ui/icons/GitHub';

// components
import PageTitle from "../components/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_GITHUB } from "../utils/constants";

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
      justifyContent: "center",
      margin: theme.spacing(3, 0),
      padding: theme.spacing(3),
    },
  })
);

const Settings: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_GITHUB} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <PageTitle title={PAGE_TITLE_GITHUB} />
        <Paper className={classes.content} square>
        <Button variant="contained" startIcon={<GitHubIcon  />} target="_blank" color="default" href="https://github.com/Lemogodeuc">
           Quentin Lemogodeuc
        </Button>
        </Paper>
      </div>
    </>
  );
};

export default Settings;
