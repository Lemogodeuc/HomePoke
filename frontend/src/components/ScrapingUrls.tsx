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
import ScrapDialog from "./ScrapDialog";
import { Scraper } from "../model/Scrap.model";
import { DISPLAY_FEW_ITEMS } from "../utils/constants";
import useScrapers from "../hooks/useScrapers";

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
  scrapings: Array<Scraper | any>;
  reduce?: boolean;
}

const getTimestamp = (date: string): number => new Date(date).getTime();

const sortByDate = (a: any, b: any): number => {
  return getTimestamp(a.createdAt) - getTimestamp(b.createdAt);
};

const getFrequency = (interval: number) => {
  const minutes = interval !== 0 ? interval / 1000 / 60 : null;
  const hours = minutes && minutes > 60 ? minutes / 60 : null;
  const days = hours && hours > 24 ? hours / 24 : null;

  return (
    (days && days + " jours") || (hours && hours + " heures") || (minutes && minutes + " minutes") || "1 seule fois"
  );
};

const Scrapings: FC<Props> = ({ scrapings = [], reduce }): ReactElement => {
  const classes = useStyles();
  const { toogleScraper } = useScrapers();

  const getAction = (active: boolean, scraperId: number, value: boolean) => {
    const variant = active ? "outlined" : "contained";
    const label = active ? "Désactiver" : "Activer";
    const color = !active ? "primary" : "inherit";
    return (
      <Button
        fullWidth
        color={color}
        variant={variant}
        disabled={false}
        onClick={() => toogleScraper(scraperId, value)}
      >
        {label}
      </Button>
    );
  };

  const titles = [
    "Scrapings enregistrés",
    "Status",
    "Action",
    "Fournisseur",
    "Fréquence",
    "Erreur",
    "Modifier",
    "Supprimer",
  ];

  console.log("[scrapings] ", scrapings);

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table} aria-label="Data Grid">
        <TableHead style={{ fontWeight: "bold", color: "red" }}>
          <TableRow hover>
            {titles.map((title: string, index: number) => (
              <TableCell className={classes.header} align={index === 0 ? "left" : "center"}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {scrapings
            .sort((a, b) => b.id - a.id)
            .filter((_, index) => (reduce ? index <= DISPLAY_FEW_ITEMS : true))
            .map((scrap: Scraper, index: number) => (
              <TableRow key={scrap.title + index}>
                <TableCell component="th" scope="row" style={{ fontWeight: "bold" }}>
                  {scrap.title}
                </TableCell>
                <TableCell align="center">
                  {<Icon style={{ color: scrap.active ? "green" : "red" }}>circle</Icon>}
                </TableCell>
                <TableCell align="center">{getAction(scrap.active, scrap.id, !scrap.active)}</TableCell>
                <TableCell align="center">{scrap.providerId}</TableCell>
                <TableCell align="center">{getFrequency(scrap.pollInterval)}</TableCell>
                <TableCell align="center">{scrap.lastError ? scrap.lastError : "Aucune"}</TableCell>
                <TableCell align="center">
                  <ScrapDialog mode="edit" values={scrap} />
                </TableCell>
                <TableCell align="center">
                  <ScrapDialog mode="delete" values={scrap} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Scrapings;
