import { FC, ReactElement, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// API
import API from "../data";

// Types
import { Offer } from "../model/Offer.model";
import { Scrap } from "../model/Scrap.model";

// components
import PageTitle from "../components/PageTitle";
import Offers from "../components/Offers";
import Scrapers from "../components/ScrapingUrls";

// constants
import { APP_TITLE, PAGE_TITLE_DASHBOARD } from "../utils/constants";

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
          {} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <PageTitle title={PAGE_TITLE_DASHBOARD} />
        <br></br>
        <Scrapers scrapings={scrapers ? scrapers : []} reduce />
        <Offers offers={offers ? offers : []} reduce />
      </div>
    </>
  );
};

export default Dashboard;
