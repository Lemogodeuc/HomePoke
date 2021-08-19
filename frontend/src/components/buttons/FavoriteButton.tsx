import { ReactElement, FC } from "react";

// icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import useStyles from "./styles";

// hook
import useOffers from "../../hooks/useOffers";

// types
import { Offer } from "../../model/Offer.model";

interface Props {
  offer: Offer;
}

const FavoriteButton: FC<Props> = ({ offer }): ReactElement => {
  const { updateOffer } = useOffers();
  const classes = useStyles();

  return offer.isFavorite ? (
    <FavoriteIcon
      className={classes.iconButton}
      onClick={() => updateOffer(offer.id, "favorite", !offer.isFavorite)}
      style={{ color: "red" }}
    />
  ) : (
    <FavoriteBorderIcon
      className={classes.iconButton}
      onClick={() => updateOffer(offer.id, "favorite", !offer.isFavorite)}
    />
  );
};

export default FavoriteButton;
