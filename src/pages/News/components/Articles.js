import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const Articles = ({ article, image}) => {
  const Goto = () => {
    window.open(article.link, "_blank");
  };
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={Goto}>
          Lire
        </Button>
        <Typography variant="body2" component="div" color="text.secondary">
          test
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Articles;
