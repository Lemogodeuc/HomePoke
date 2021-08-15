import { useState } from "react";

// Mui components
import {
  Button,
  Icon,
  CardMedia,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  useMediaQuery,
} from "@material-ui/core/";
import { useTheme, makeStyles, Theme, createStyles } from "@material-ui/core/styles";

// Icoins
import RoomIcon from "@material-ui/icons/Room";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

// Components
import Details from "./Details";

// APÏ
import API from "../data";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      cursor: "pointer",
      paddingTop: "56.25%", // 16:9
    },
    image: {
      paddingTop: "56.25%", // 16:9
      margin: theme.spacing(0.5),
    },
    buttons: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

const OfferDialog = ({ type, image, title, description, details }: any) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async (offerId: number, action: string, value: boolean) => {
    API.offer.updateOne(offerId, action, value);
  };

  return (
    <div>
      {type === "Card" ? (
        <CardMedia className={classes.media} image={image} title={title} onClick={handleClickOpen} />
      ) : (
        <Icon color="primary" style={{ cursor: "pointer" }} onClick={handleClickOpen}>
          visibility
        </Icon>
      )}
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="add-scrap">
        <DialogTitle id="add-scrap-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <DialogActions className={classes.buttons}>
            <Button
              endIcon={<DeleteIcon />}
              onClick={() => handleUpdate(details.id, "delete", true)}
              variant="outlined"
              style={{ borderColor: "red" }}
            >
              Supprimer
            </Button>
            <Button
              endIcon={details.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={() => handleUpdate(details.id, "favorite", !details.isContacted)}
              variant={details.isFavorite ? "contained" : "outlined"}
              color="default"
            >
              Favoris
            </Button>
            <Button
              endIcon={details.isContacted ? <DoneIcon /> : <ClearIcon />}
              onClick={() => handleUpdate(details.id, "contacted", !details.isContacted)}
              variant={details.isContacted ? "contained" : "outlined"}
              color="default"
            >
              Contacté
            </Button>
          </DialogActions>
          <Details items={details} />
          {details.imageUrls.map((image: string) => (
            <CardMedia className={classes.image} image={image} title={title} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Fermer
          </Button>
          <Link href={details.location} target="_blank" rel="noreferrer">
            <Button endIcon={<RoomIcon />} color="primary" variant="contained">
              Voir sur la carte
            </Button>
          </Link>
          <Link href={details.url} target="_blank" rel="noreferrer">
            <Button endIcon={<OpenInNewIcon />} color="primary" variant="contained">
              Voir sur le site
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default OfferDialog;
