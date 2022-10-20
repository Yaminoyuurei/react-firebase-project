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
  const checkString = (item)=>{
      let result = item.replace(/&#xE9;/gi,"é")
      result = result.replace(/&#xA0;/gi," ")
      result = result.replace(/&nbsp;/gi," ")
      result = result.replace(/&#x2019;/gi,"'")
      result = result.replace(/&#xE0;/gi, "à")
      result = result.replace(/&#xE8;/gi,"è")
      result = result.replace(/&#xC9;/gi,"É")
      result = result.replace(/&#xE7;/gi,"ç")
      result = result.replace(/&#x153;/gi,"œ")
      result = result.replace(/&#xEA;/gi,"ê")
      result = result.replace(/&#xF4;/gi,"ô")
      result = result.replace(/&#xC2;/gi,"Â")
      result = result.replace(/&#xC0;/gi,"À")
      result = result.replace(/&#xF9;/gi,"ù")
      result = result.replace(/&#xFB;/gi,"û")     
      return result
  }
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={article.enclosure["@_url"]}
        alt={article.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {checkString(article.title)}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          {checkString(article.description)}
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
