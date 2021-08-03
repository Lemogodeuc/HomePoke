import { FC, ReactElement, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Offers from "../components/Offers";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

// components
import PageTitle from "../components/PageTitle";

// constants
import { APP_TITLE, PAGE_TITLE_OFFERS } from "../utils/constants";

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
        <PageTitle title={PAGE_TITLE_OFFERS} />
        <br></br>
        <Offers offers={offers} />
      </div>
    </>
  );
};

export default Dashboard;
