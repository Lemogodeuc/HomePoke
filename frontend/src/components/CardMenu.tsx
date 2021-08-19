import { FC, ReactElement, useState, MouseEvent } from "react";

// components
import { withStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import { MenuProps } from "@material-ui/core/Menu";
import { FavoriteButton, ContactedButton, DeleteButton } from "./buttons";

// icons
import MoreVertIcon from "@material-ui/icons/MoreVert";

// hook
import useOffers from "../hooks/useOffers";

// types
import { Offer } from "../model/Offer.model";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

interface Props {
  offer: Offer;
}

const CardMenu: FC<Props> = ({ offer }): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { updateOffer } = useOffers();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem onClick={() => updateOffer(offer.id, "favorite", !offer.isFavorite)}>
          <ListItemIcon>
            <FavoriteButton offer={offer} />
          </ListItemIcon>
          <ListItemText primary="Favoris" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => updateOffer(offer.id, "contacted", !offer.isContacted)}>
          <ListItemIcon>
            <ContactedButton offer={offer} />
          </ListItemIcon>
          <ListItemText primary="Contacté" />
        </StyledMenuItem>
        <DeleteButton offer={offer} isListItem={true} />
      </StyledMenu>
    </div>
  );
};

export default CardMenu;
