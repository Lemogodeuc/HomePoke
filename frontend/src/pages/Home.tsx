import { FC, ReactElement, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "../components/Card";
import { Offer } from "../model/Offer.model";
import { Scrap } from "../model/Scrap.model";

// API
import API from "../data";

// components
import PageTitle from "../components/PageTitle";
import Scrapers from "../components/ScrapingUrls";

// constants
import { APP_TITLE, PAGE_TITLE_HOME } from "../utils/constants";

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
  const [offers, setOffers] = useState<null | Offer[]>(null);
  const [scrapers, setScrapers] = useState<null | Scrap[]>(null);

  const getAllOffers = async () => {
    try {
      const data = await API.offer.getAllByUserId(1);
      setOffers(data);
      console.log("[offers] ", data);
    } catch (error) {
      console.log("[getAllOffers] ", error);
    }
  };

  const getAllScrapers = async () => {
    try {
      const data = await API.scraper.getAllByUserId(1);
      setScrapers(data);
    } catch (error) {
      console.log("[getAllScrapers] ", error);
    }
  };

  useEffect(() => {
    !offers && getAllOffers();
    !scrapers && getAllScrapers();
  }, [offers, scrapers]);

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
          {offers?.map((offer: Offer, index: number) => index <= 5 && <Card content={offer} />)}
          <Scrapers scrapings={scrapers || []} reduce />
        </div>
      </div>
    </>
  );
};

export default Home;
