import React,{useState, ChangeEvent} from 'react';
import { Grid, TextField } from '@material-ui/core'
import {UseOrcamentoContext} from '../../Context/OrcamentoContext';


const FormDependencias: React.FC = () => {
  const {orcamento,actionDispatchOrcamento} = UseOrcamentoContext();

  function handlerChangeEscopro(event:ChangeEvent<HTMLInputElement>) {
    actionDispatchOrcamento({ ...orcamento, dependencia:event.target.value });
  }

  return (
    <>
      <Grid container style={{marginTop:'1rem'}}>
       
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <br />
          <TextField label="Dependências do Projeto" value={orcamento.dependencia} onChange={handlerChangeEscopro} multiline rows={12} style={{ width: '100%' }} variant="outlined" />
        </Grid>
      </Grid>
    </>
  );
}

export default FormDependencias;