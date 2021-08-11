import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../util/Logo/logo';
import { Grid, makeStyles, Theme, Typography, Button } from '@material-ui/core'
import HomeStyles from './makeStyles';

const Home: React.FC = () => {
  const useStyles = HomeStyles();

  return (
    <>
      <Grid container spacing={2} className={useStyles.container}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={useStyles.container_logo} >
          <Logo />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{zIndex:3}}>
          <Typography className={useStyles.title}>Crie orçamentos para <br/>  
            seus clientes de Forma<br/>
            <span>Rápida</span> e <span>Pratica</span>.</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}  className={useStyles.container_Button}>
          <Link to="/GerarOrcamento"><Button variant="contained" color="secondary">Gerar Orçamento</Button></Link>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;