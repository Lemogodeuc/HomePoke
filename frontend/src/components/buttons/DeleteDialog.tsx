import { FC, ReactElement } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Button,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Icon,
} from "@material-ui/core/";

// hook
import useOffers from "../../hooks/useOffers";
import useScrapers from "../../hooks/useScrapers";
import useStyles from "./styles";

type Target = "offer" | "scraper";

interface Props {
  handleOpen: any;
  isOpen: boolean;
  entity: Target;
  object: any;
  values?: any;
}

const ResponsiveDialog: FC<Props> = ({ isOpen, handleOpen, entity, object, values }): ReactElement => {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { updateOffer } = useOffers();
  const { deleteScraper } = useScrapers();
  const target = { offer: "cette offre ?", scraper: "cette URL ?" };

  const handleDelete = async () => {
    switch (entity) {
      case "offer":
        console.log("[offer delete] ", object.id);
        updateOffer(object.id, "delete", true);
        break;
      case "scraper":
        deleteScraper(object.id);
        break;
      default:
        break;
    }
    handleOpen();
  };

  return (
    <div>
      <Icon className={classes.iconButton} onClick={handleOpen}>
        delete
      </Icon>
      <Dialog fullScreen={fullScreen} open={isOpen} onClose={handleOpen} aria-labelledby="add-scrap">
        <DialogTitle id="add-scrap-title">Attention !</DialogTitle>
        <DialogContent>
          <DialogContentText>{"Es-tu bien sûr de vouloir supprimer " + target[entity]}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen} color="default">
            Annuler
          </Button>
          <Button onClick={handleDelete} className={classes.deleteButton} variant="outlined">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResponsiveDialog;
