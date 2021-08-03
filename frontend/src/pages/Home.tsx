import { FC, ReactElement, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Offer } from "../model/Offer.model"
import Scrap from "../model/Scrap.model"

// components
import PageTitle from "../components/PageTitle";
import Offers from "../components/Offers";
// import Scrapers from "../components/ScrapingUrls";

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
  })
);

const Home: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const [offers, setOffers] = useState<null | Offer[]>(null);
  const [scrapers, setScrapers] = useState<null | Scrap[]>(null);

  const getAllOffers = async () => {
   try {
    const { data: offersData } = await axios.get(BASE_URL + "/offers/profile/1");
    setOffers(offersData);
   } catch (error) {  
    console.log("[getAllOffers] ", error);
   } 
  }
  
  const getAllScrapers = async () => {
   try {
    const { data: scrapersData } = await axios.get(BASE_URL + "/scrapers/profile/1");
    // console.log('[scrapersData] ', scrapersData);
    setScrapers(scrapersData);
   } catch (error) {  
    console.log("[getAllScrapers] ", error);
   } 
  }

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
        {/* <Scrapers scrapings={scrapers || []} reduce /> */}
        <Offers offers={offers || []} reduce />
      </div>
    </>
  );
};

export default Home;
