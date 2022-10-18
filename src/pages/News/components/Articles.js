import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const Articles = ({article, source}) => {
  const goto = () => {
    window.open(article.link, "_blank");
  };
  return (
    <Card sx={{cursor:"pointer"}} onClick={goto}>
      <CardMedia
        component="img"
        height="140"
        image={article.enclosure["@_url"]?article.enclosure["@_url"]:""}
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
        <Typography variant="body2" component="div" color="text.secondary">
          {source}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Articles;
