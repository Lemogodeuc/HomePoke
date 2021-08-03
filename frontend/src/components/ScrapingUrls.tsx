import { ReactElement, FC } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Icon,
} from "@material-ui/core/";
import Scrap from "../model/Scrap.model";
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
  scrapings: Array<Scrap | any>;
  reduce?: boolean;
}

const getTimestamp = (date: string): number => new Date(date).getTime();

const sortByDate = (a: any, b: any): number => {
  return getTimestamp(a.createdAt) - getTimestamp(b.createdAt);
};

const getStatus = (status: string) => {
  const colors: any = {
    active: "green",
    warning: "orange",
    inactive: "red",
  };

  return <Icon style={{ color: colors[status] }}>circle</Icon>;
};

const getAction = (status: string, severity: number) => {
  const isErrored = severity === 3;
  const isActive = status !== "inactive";
  const isWarning = status === "warning";
  const variant = isActive && isWarning ? "contained" : "outlined";
  const label = isActive ? "Désactiver" : "Activer";
  return (
    <Button variant={variant} disabled={isErrored}>
      {label}
    </Button>
  );
};

const getFrequency = (interval: number) => {
  return interval / 1000 / 60 + " minutes";
};

const Scrapings: FC<Props> = ({ scrapings = [], reduce }): ReactElement => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="Data Grid">
        <TableHead style={{ fontWeight: "bold", color: "red" }}>
          <TableRow hover>
            <TableCell className={classes.header}>Scrapings enregistrés</TableCell>
            <TableCell className={classes.header} align="center">
              Status
            </TableCell>
            <TableCell className={classes.header} align="center">
              Action
            </TableCell>
            <TableCell className={classes.header} align="center">
              Fournisseur
            </TableCell>
            <TableCell className={classes.header} align="center">
              Fréquence
            </TableCell>
            <TableCell className={classes.header} align="center">
              Erreur
            </TableCell>
            <TableCell className={classes.header} align="center">
              Modifier
            </TableCell>
            <TableCell className={classes.header} align="center">
              Supprimer
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scrapings
            .sort(sortByDate)
            .filter((_, index) => (reduce ? index <= DISPLAY_FEW_ITEMS : true))
            .map((scrap: Scrap, index: number) => (
              <TableRow key={scrap.title + index}>
                <TableCell component="th" scope="row" style={{ fontWeight: "bold" }}>
                  {scrap.title}
                </TableCell>
                <TableCell align="center">{getStatus(scrap.status)}</TableCell>
                <TableCell align="center">{getAction(scrap.status, scrap.severity)}</TableCell>
                <TableCell align="center">{scrap.provider}</TableCell>
                <TableCell align="center">{getFrequency(scrap.pollInterval)}</TableCell>
                <TableCell align="center">{scrap.error ? scrap.error : "Aucune"}</TableCell>
                <TableCell align="center">
                  <Icon style={{ color: "gray" }}>edit</Icon>
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

export default Scrapings;
