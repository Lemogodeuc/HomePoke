import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import OfferDialog from "./OfferDialog";
import CardMenu from "./CardMenu";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 350,
      margin: theme.spacing(2),
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: blue[500],
    },
    cardContent: {
      display: "flex",
      justifyContent: "space-between",
    },
    paper: {
      padding: theme.spacing(3),
      maxWidth: "50%",
    },
    table: {
      maxWidth: "50%",
    },
  })
);

export default function RecipeReviewCard({ content }: any) {
  const classes = useStyles();
  const { title, excerpt, description, imageUrls, publicationDate, ...rest } = content;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Tooltip title={rest.ownerType === "private" ? "Particulier" : "Agence"} arrow placement="top">
            <Avatar aria-label="recipe" className={classes.avatar}>
              {rest.ownerType === "private" ? "P" : "A"}
            </Avatar>
          </Tooltip>
        }
        action={<CardMenu offer={content} />}
        title={title}
        subheader={new Date(publicationDate).toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      />
      <OfferDialog type="Card" image={imageUrls[0]} title={title} description={description} details={rest} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {excerpt}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
