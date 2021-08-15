import { ReactElement, FC } from "react";
import { withStyles, Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Table, TableCell, TableContainer, TableRow, Paper } from "@material-ui/core/";
import { Offer } from "../model/Offer.model";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  table: {
    width: "50%",
  },
  header: {
    color: "white",
    backgroundColor: theme.palette.grey[800],
    fontSize: "1.1em",
    fontWeight: "bold",
  },
}));

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

interface Props {
  items: Offer;
}

const Details: FC<Props> = ({ items }): ReactElement => {
  const classes = useStyles();

  const left = [
    { Actif: items.active ? "Oui" : "Non" },
    { Prix: items.price + "€" },
    { "Charges incluses": items.includingCharges ? "Oui" : "Non" },
    { Surface: items.surface + " m2" },
    { Pièces: items.rooms },
    { Meublé: items.furnished ? "Oui" : "Non" },
    { "Les +": items.assets ? items.assets : "-" },
  ];

  const right = [
    { Energie: items.energy ? items.energy : "-" },
    { GES: items.ges ? items.ges : "-" },
    { Ville: items.city },
    { Contacté: items.isContacted ? "Oui" : "Non" },
    { Source: items.ownerType === "private" ? "Particulier" : "Agence" },
    { Propriétaire: items.ownerName },
    { Type: items.type },
  ];

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="Data Grid" className={classes.table}>
        {left.map((row) => {
          const item = Object.entries(row)[0];
          return (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row" style={{ fontWeight: "bold" }}>
                {item[0]}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item[1]}
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </Table>
      <Table aria-label="Data Grid" className={classes.table}>
        {right.map((row) => {
          const item = Object.entries(row)[0];
          return (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row" style={{ fontWeight: "bold" }}>
                {item[0]}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {item[1]}
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </Table>
    </TableContainer>
  );
};

export default Details;
