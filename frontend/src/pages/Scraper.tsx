import { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper, IconButton } from "@material-ui/core/";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ScrapinUrls from "../components/ScrapingUrls";

// components
import PageTitle from "../components/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_SCRAPER } from "../utils/constants";

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    addScrap: {
      margin: theme.spacing(3, 0),
      padding: theme.spacing(3),
    },
  })
);

const Scraper: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const mock = [
    {
      title: "Appart BAB - T2 - 700€",
      status: "active",
      provider: "Leboncoin",
      error: null,
      severity: 0,
      interval: 900000,
    },
    {
      title: "Appart bidart",
      status: "warning",
      provider: "Orpi",
      error: "Parsing issues",
      severity: 1,
      interval: 1800000,
    },
    {
      title: "Appart ustaritz",
      status: "inactive",
      provider: "Seloger",
      error: 403,
      severity: 3,
      interval: 3600000,
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_SCRAPER} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <PageTitle title={PAGE_TITLE_SCRAPER} />
        <Paper className={classes.addScrap} square>
        <IconButton color="primary" component="span">
          <AddCircleIcon  />
        </IconButton>
        </Paper>
        <ScrapinUrls scrapings={mock} />
      </div>
    </>
  );
};

export default Scraper;
