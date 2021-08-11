import React, { useState, ChangeEvent } from 'react';
import { Grid, TextField } from '@material-ui/core'
import { UseOrcamentoContext } from '../../Context/OrcamentoContext';

const FormScopro: React.FC = () => {
  const { orcamento, actionDispatchOrcamento } = UseOrcamentoContext();

  function handlerChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    actionDispatchOrcamento({ ...orcamento, titulo:event.target.value });
  }

  function handlerChangeEscopro(event: ChangeEvent<HTMLInputElement>) {
    actionDispatchOrcamento({ ...orcamento, escopro:event.target.value });
  }


  return (
    <Grid container style={{marginTop:'1rem'}}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <TextField value={orcamento.titulo} label="Titulo do orçamento" onChange={handlerChangeTitle} style={{width:'100%'}}></TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <br/>
        <TextField value={orcamento.escopro} label="Escopro da Alteração" onChange={handlerChangeEscopro} multiline rows={12} style={{width:'100%'}} variant="outlined" />
      </Grid>
    </Grid>
  );
}

export default FormScopro;