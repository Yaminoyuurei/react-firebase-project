import { Container } from '@mui/material'
import React from 'react'

const ErrorPage = () => {
  return (
    <Container sx={{textAlign:"center"}}>
      <h1>Erreur 404</h1>
      <h3>La page demandé n'existe pas</h3>
    </Container>
  )
}

export default ErrorPage