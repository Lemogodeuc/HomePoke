import { FC, ReactElement, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

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

const scrapMock = [
  {
    title: "Appart BAB - T2 - 700€",
    status: "active",
    provider: "Leboncoin",
    error: null,
    severity: 0,
    pollInterval: 900000,
  },
  {
    title: "Appart bidart",
    status: "warning",
    provider: "Orpi",
    error: "Parsing issues",
    severity: 1,
    pollInterval: 1800000,
  },
  {
    title: "Appart ustaritz",
    status: "inactive",
    provider: "Seloger",
    error: 403,
    severity: 3,
    pollInterval: 3600000,
  },
];

const Dashboard: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const [offers, setOffers] = useState([{}]);

  useEffect(() => {
    const getAllOffers = async () => {
      try {
        const { data } = await axios.get(BASE_URL + "/offers/profile/1");
        setOffers(data);
      } catch (error) {
        console.log("[error] ", error);
      }
    };

    offers.length && !Object.keys(offers[0]).length && getAllOffers();
  }, [offers]);

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
        <Scrapers scrapings={scrapMock} reduce />
        <Offers offers={offers} reduce />
      </div>
    </>
  );
};

export default Dashboard;
