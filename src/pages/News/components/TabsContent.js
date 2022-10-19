import { TabPanel } from '@mui/lab'
import {ImageList, ImageListItem} from '@mui/material'
import React from 'react'
import Articles from './Articles'
import style from "./muiImageList.css"

const TabsContent = ({tabs, data}) => {
  return (
    <TabPanel value={tabs.id} >
              <ImageList variant='masonry' gap={8}>
                {data.map((article) => (
                  <ImageListItem key={article.pubDate}>
                    <Articles
                      article={article}
                      source={tabs.source}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
          </TabPanel>
  )
}

export default TabsContent