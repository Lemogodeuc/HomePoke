import { FC, ReactElement, useState, MouseEvent } from "react";

// Mui components
import { withStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import { MenuProps } from "@material-ui/core/Menu";

// icons
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DoneIcon from "@material-ui/icons/Done";
import ShareIcon from "@material-ui/icons/Share";
import ClearIcon from "@material-ui/icons/Clear";

// APÏ
import API from "../data";

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
  offerId: number;
  isFavorite: boolean;
  isContacted: boolean;
}

const CardMenu: FC<Props> = ({ offerId, isFavorite, isContacted }): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = async (offerId: number, action: string, value: boolean) => {
    API.offer.updateOne(offerId, action, value);
  };

  return (
    <div>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem onClick={() => handleUpdate(offerId, "favorite", !isFavorite)}>
          <ListItemIcon>
            {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText primary="Favoris" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleUpdate(offerId, "contacted", !isContacted)}>
          <ListItemIcon>{isContacted ? <DoneIcon fontSize="small" /> : <ClearIcon fontSize="small" />}</ListItemIcon>
          <ListItemText primary="Contacté" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Partager" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleUpdate(offerId, "delete", true)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Supprimer" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default CardMenu;
