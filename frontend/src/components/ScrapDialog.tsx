import { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  Icon,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@material-ui/core/";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { ScraperForm } from "../forms";
import API from "../data";

export default function ResponsiveDialog({ mode, values }: any) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const icon: any = {
    create: <Icon>addCircle</Icon>,
    edit: <EditIcon fontSize="inherit" />,
    delete: <DeleteIcon fontSize="inherit" />,
  };

  const handleDelete = async () => {
    try {
      await API.scraper.deleteOne(values.id);
      // TODO: update context with result
      handleClose();
    } catch (error) {
      console.log("[handleDelete] ", error);
    }
  };

  return (
    <div>
      {mode === "create" ? (
        <Button endIcon={icon[mode]} variant="contained" color="primary" onClick={handleClickOpen}>
          Ajouter un scraper
        </Button>
      ) : (
        <IconButton onClick={handleClickOpen}>{icon[mode]}</IconButton>
      )}
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="add-scrap">
        <DialogTitle id="add-scrap-title">
          {mode !== "delete" ? "Ajoute une URL à gratter" : "Suprimme une URL"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {mode !== "delete"
              ? "Va sur un site le site du fournisseur de données, effectue une recherche immobilière, copie l'url dans le navigateur et renseigne là dans ce formulaire."
              : "Es-tu sûr de vouloir supprimer ce scraping ?"}
          </DialogContentText>
          {mode !== "delete" && <ScraperForm handleClose={handleClose} values={values} mode={mode} />}
        </DialogContent>
        {mode === "delete" && (
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="default">
              Annuler
            </Button>
            <Button onClick={handleDelete} color="primary" variant="contained" autoFocus>
              Oui
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
