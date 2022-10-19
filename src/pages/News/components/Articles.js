import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from "react";

const Articles = ({ article, source }) => {
  const goto = () => {
    window.open(article.link, "_blank");
  }
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={article.enclosure["@_url"]}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          {article.description}
        </Typography><br/>
          <Typography variant="subtitle2" component="div" color="text.secondary" align="right">
            {source}
          </Typography>
      </CardContent>
      <CardActions>
           <Tooltip title="Voir l'article">
          <IconButton onClick={goto}>
            <VisibilityIcon/>
          </IconButton>
           </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Articles;
