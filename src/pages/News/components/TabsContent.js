import { TabPanel } from '@mui/lab'
import { Grid } from '@mui/material'
import React from 'react'
import Articles from './Articles'

const TabsContent = ({tabs, data}) => {
  return (
    <TabPanel value={tabs.id} index>
              <Grid container spacing={2}>
                {data.map((article) => (
                  <Grid item xs={12} md={4} key={article.pubDate}>
                    <Articles
                      article={article}
                      source={tabs.source}
                    />
                  </Grid>
                ))}
              </Grid>
          </TabPanel>
  )
}

export default TabsContent