import { ReactElement, FC } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

// components
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core/";
import CardDialog from "./OfferDialog";
import { FavoriteButton, ContactedButton, DeleteButton } from "./buttons";

// constants
import { DISPLAY_FEW_ITEMS } from "../utils/constants";

// types
import { Offer } from "../model/Offer.model";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  header: {
    color: "white",
    backgroundColor: theme.palette.grey[800],
    fontSize: "1.1em",
    fontWeight: "bold",
  },
  iconButton: {
    cursor: "pointer",
  },
}));

interface Props {
  offers: Offer[];
  reduce?: boolean;
}

const getTimestamp = (date: string): number => new Date(date).getTime();

const sortByDate = (a: any, b: any): number => {
  return getTimestamp(a.createdAt) - getTimestamp(b.createdAt);
};

const OfferList: FC<Props> = ({ offers, reduce = false }): ReactElement => {
  const classes = useStyles();
  const titles = ["Voir", "Favoris", "Actif", "Loyer", "Superficie", "Pièces", "Ville", "Contacté", "Supprimer"];

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="Data Grid">
        <TableHead style={{ fontWeight: "bold", color: "red" }}>
          <TableRow hover>
            <TableCell className={classes.header}>{reduce ? "Les dernières offres" : "Les offres du moment"}</TableCell>
            {titles.map((title) => (
              <TableCell className={classes.header} align="center">
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {offers
            .sort(sortByDate)
            .filter((offer: Offer, index: number) => (reduce ? index <= DISPLAY_FEW_ITEMS : true) && !offer.isDelete)
            .map((offer: Offer, index: number) => (
              <TableRow key={offer.title + index}>
                <TableCell component="th" scope="row" style={{ fontWeight: "bold" }}>
                  {offer.title}
                </TableCell>
                <TableCell align="center">
                  <CardDialog type="Offer" title={offer.title} description={offer.description} details={offer} />
                </TableCell>
                <TableCell align="center">
                  <FavoriteButton offer={offer} />
                </TableCell>
                <TableCell align="center">{offer.active ? "oui" : "non"}</TableCell>
                <TableCell align="center">{offer.price + " €"}</TableCell>
                <TableCell align="center">{offer.surface + " m²"}</TableCell>
                <TableCell align="center">{offer.rooms}</TableCell>
                <TableCell align="center">{offer.city}</TableCell>
                <TableCell align="center">
                  <ContactedButton offer={offer} />
                </TableCell>
                <TableCell align="center">
                  <DeleteButton offer={offer} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OfferList;
