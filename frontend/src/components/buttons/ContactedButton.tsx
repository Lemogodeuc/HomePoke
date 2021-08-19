import { ReactElement, FC } from "react";

// icons
import { Icon } from "@material-ui/core/";
import useStyles from "./styles";

// hook
import useOffers from "../../hooks/useOffers";

// types
import { Offer } from "../../model/Offer.model";

interface Props {
  offer: Offer;
}

const ContactedButton: FC<Props> = ({ offer }): ReactElement => {
  const { updateOffer } = useOffers();
  const classes = useStyles();

  return offer.isContacted ? (
    <Icon
      className={classes.iconButton}
      style={{ color: "#26d300" }}
      onClick={() => updateOffer(offer.id, "contacted", !offer.isContacted)}
    >
      check
    </Icon>
  ) : (
    <Icon className={classes.iconButton} onClick={() => updateOffer(offer.id, "contacted", !offer.isContacted)}>
      close
    </Icon>
  );
};

export default ContactedButton;
