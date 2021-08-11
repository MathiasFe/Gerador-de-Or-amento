import React, { ChangeEvent } from 'react';
import { UseOrcamentoContext } from '../../Context/OrcamentoContext';
import { Grid, TextField, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const FormGerais: React.FC = () => {
  const { orcamento, actionDispatchOrcamento } = UseOrcamentoContext();

  function handlerChangeCondicoesGerais(event: ChangeEvent<HTMLInputElement>) {
    actionDispatchOrcamento({ ...orcamento, condicoesGerais: event.target.value });
  }

  return (
    <>
      <Grid container style={{ marginTop: '1rem' }} spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <br />
          <TextField label="Condições Gerais" value={orcamento.condicoesGerais} onChange={handlerChangeCondicoesGerais} multiline rows={12} style={{ width: '100%' }} variant="outlined" />
          <Grid />
        </Grid>
      </Grid>
    </>
  );
}

export default FormGerais;