import { useEffect, FC, ReactElement, useContext } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core/";
import ScrapinUrls from "../components/ScrapingUrls";
import ScrapDialog from "../components/ScrapDialog";

// context
import { AppContext } from "../context";

// components
import PageTitle from "../components/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_SCRAPER } from "../utils/constants";

// hook
import useScrapers from "../hooks/useScrapers";

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
  const { getAllScrapers } = useScrapers();
  const { state } = useContext(AppContext);

  useEffect(() => {
    !state.scrapers.length && getAllScrapers(1);
  }, [state, getAllScrapers]);

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
        <ScrapinUrls scrapings={state.scrapers} />
      </div>
    </>
  );
};

export default Scraper;
