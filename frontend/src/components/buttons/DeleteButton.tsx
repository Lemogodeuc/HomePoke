import { ReactElement, FC, useState } from "react";

// components
import { withStyles } from "@material-ui/core/styles";
import Dialog from "./DeleteDialog";
import { MenuItem, ListItemText, ListItemIcon } from "@material-ui/core";

// types
import { Offer } from "../../model/Offer.model";
import { Scraper } from "../../model/Scrap.model";

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
  offer?: Offer;
  scraper?: Scraper;
  isListItem?: boolean;
}

const DeleteButton: FC<Props> = ({ offer, scraper, isListItem = false }): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const entity = offer ? "offer" : "scraper";
  const object = offer ? offer : scraper;

  return isListItem ? (
    <StyledMenuItem onClick={handleOpen}>
      <ListItemIcon>
        <Dialog entity={entity} object={object} isOpen={isOpen} handleOpen={handleOpen} />
      </ListItemIcon>
      <ListItemText primary="Supprimer" />
    </StyledMenuItem>
  ) : (
    <Dialog entity={entity} object={object} isOpen={isOpen} handleOpen={handleOpen} />
  );
};

export default DeleteButton;
