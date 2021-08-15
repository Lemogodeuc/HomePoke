import { FC, ReactElement, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Offer } from "../model/Offer.model";

// components
import PageTitle from "../components/PageTitle";
import Offers from "../components/Offers";

// API
import API from "../data";

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
  const [offers, setOffers] = useState<null | Offer[]>(null);

  const getAllOffers = async () => {
    try {
      const data = await API.offer.getAllByUserId(1);
      console.log("[data] ", data);
      setOffers(data);
    } catch (error) {
      console.log("[getAllOffers] ", error);
    }
  };

  useEffect(() => {
    !offers && getAllOffers();
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
        <Offers offers={offers ? offers : []} />
      </div>
    </>
  );
};

export default Dashboard;
