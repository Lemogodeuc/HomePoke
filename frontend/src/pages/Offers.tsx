import { FC, ReactElement, useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

// context
import { AppContext } from "../context";

// components
import PageTitle from "../components/PageTitle";
import OfferList from "../components/OfferList";

// constants
import { APP_TITLE, PAGE_TITLE_OFFERS } from "../utils/constants";

// hook
import useOffers from "../hooks/useOffers";

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

const Offers: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const { getAllOffers } = useOffers();
  const { state } = useContext(AppContext);
  const [called, setCalled] = useState<boolean>(false);

  useEffect(() => {
    !called && getAllOffers(1) && setCalled(!called);
  }, [called, state, getAllOffers]);

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
        <OfferList offers={state.offers} />
      </div>
    </>
  );
};

export default Offers;
