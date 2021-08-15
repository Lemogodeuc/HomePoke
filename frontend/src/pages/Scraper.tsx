import { useState, useEffect, FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core/";
import ScrapinUrls from "../components/ScrapingUrls";
import ScrapDialog from "../components/ScrapDialog";
import API from "../data";

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
  const [scrapers, setScrapers] = useState([]);

  useEffect(() => {
    !scrapers.length &&
      (async () => {
        try {
          setScrapers(await API.scraper.getAllByUserId(1));
        } catch (error) {
          console.log("[getScraps] ", error);
        }
      })();
  }, [scrapers]);

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
          <ScrapDialog mode="create" />
        </Paper>
        <ScrapinUrls scrapings={scrapers} />
      </div>
    </>
  );
};

export default Scraper;
