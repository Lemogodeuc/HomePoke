import { ReactElement, FC } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon } from "@material-ui/core/";
import { Offer } from "../model/Offer.model";
import { DISPLAY_FEW_ITEMS } from "../utils/constants";

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
}));

interface Props {
  offers: Array<Offer | any>;
  reduce?: boolean;
}

const getTimestamp = (date: string): number => new Date(date).getTime();

const sortByDate = (a: any, b: any): number => {
  return getTimestamp(a.createdAt) - getTimestamp(b.createdAt);
};

const Offers: FC<Props> = ({ offers = [], reduce = false }): ReactElement => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="Data Grid">
        <TableHead style={{ fontWeight: "bold", color: "red" }}>
          <TableRow hover>
            <TableCell className={classes.header}>{reduce ? "Les dernières offres" : "Les offres du moment"}</TableCell>
            <TableCell className={classes.header} align="center">
              Actif
            </TableCell>
            <TableCell className={classes.header} align="center">
              Loyer
            </TableCell>
            <TableCell className={classes.header} align="center">
              Superficie&nbsp;(m2)
            </TableCell>
            <TableCell className={classes.header} align="center">
              Pièces
            </TableCell>
            <TableCell className={classes.header} align="center">
              Ville
            </TableCell>
            <TableCell className={classes.header} align="center">
              Contacté
            </TableCell>
            <TableCell className={classes.header} align="center">
              Supprimer
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers
            .sort(sortByDate)
            .filter((_, index) => (reduce ? index <= DISPLAY_FEW_ITEMS : true))
            .map((offer: Offer, index: number) => (
              <TableRow key={offer.title + index}>
                <TableCell component="th" scope="row" style={{ fontWeight: "bold" }}>
                  {offer.title}
                </TableCell>
                <TableCell align="center">{offer.active ? "oui" : "non"}</TableCell>
                <TableCell align="center">{offer.price + " €"}</TableCell>
                <TableCell align="center">{offer.surface}</TableCell>
                <TableCell align="center">{offer.rooms}</TableCell>
                <TableCell align="center">{offer.city}</TableCell>
                <TableCell align="center">
                  {offer.contacted ? (
                    <Icon style={{ color: "#26d300" }}>check</Icon>
                  ) : (
                    <Icon style={{ color: "red" }}>close</Icon>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Icon style={{ color: "gray" }}>delete</Icon>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Offers;
