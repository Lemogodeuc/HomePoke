import { FC, ReactElement, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// context
import { AppContext } from "../context";

// components
import PageTitle from "../components/PageTitle";
import Offers from "../components/OfferList";
import Scrapers from "../components/ScrapingUrls";

// constants
import { APP_TITLE, PAGE_TITLE_DASHBOARD } from "../utils/constants";

// hook
import useOffers from "../hooks/useOffers";
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
  })
);

const Dashboard: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const { state } = useContext(AppContext);
  const { getAllOffers } = useOffers();
  const { getAllScrapers } = useScrapers();

  useEffect(() => {
    !state.offers.length && getAllOffers(1);
    !state.scrapers.length && getAllScrapers(1);
  }, [state]);

  return (
    <>
      <Helmet>
        <title>
          {} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <PageTitle title={PAGE_TITLE_DASHBOARD} />
        <br></br>
        <Scrapers scrapings={state.scrapers} reduce />
        <Offers offers={state.offers} reduce />
      </div>
    </>
  );
};

export default Dashboard;
