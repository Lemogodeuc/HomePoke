import { FC, ReactElement, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "../components/Card";
import PageTitle from "../components/PageTitle";
import Scrapers from "../components/ScrapingUrls";

// context
import { AppContext } from "../context";

// hook
import useOffers from "../hooks/useOffers";
import useScrapers from "../hooks/useScrapers";

// constants
import { APP_TITLE, PAGE_TITLE_HOME, DISPLAY_FEW_ITEMS } from "../utils/constants";

// types
import { Offer } from "../model/Offer.model";

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
    },
  })
);

const Home: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const { state } = useContext(AppContext);
  const { getAllOffers } = useOffers();
  const { getAllScrapers } = useScrapers();

  useEffect(() => {
    console.log("[state] ", state);
    !state.offers.length && getAllOffers();
    !state.scrapers && getAllScrapers();
  }, [state]);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <br></br>
      <div className={classes.root}>
        <PageTitle title={PAGE_TITLE_HOME} />
        <br></br>
        <div className={classes.content}>
          {state.offers.map((offer: Offer, index: number) => index <= DISPLAY_FEW_ITEMS && <Card content={offer} />)}
          <Scrapers scrapings={state.scrapers} reduce />
        </div>
      </div>
    </>
  );
};

export default Home;
