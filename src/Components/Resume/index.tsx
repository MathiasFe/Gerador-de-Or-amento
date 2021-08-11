import React,{ChangeEvent} from 'react';
import { UseOrcamentoContext } from '../../Context/OrcamentoContext';
import { Grid, TextField, Snackbar } from '@material-ui/core';
import { useCallback } from 'react';

const Resume: React.FC = () => {
  const { orcamento,actionDispatchOrcamento } = UseOrcamentoContext();
  
  function handlerChangeResponsavel(event:ChangeEvent<HTMLInputElement>) {
      actionDispatchOrcamento({...orcamento,responsavelAlteracao:event.target.value})
  }

  const handlerChangeEmailPara = useCallback((event:ChangeEvent<HTMLInputElement>) => {
    actionDispatchOrcamento({ ...orcamento, EmailPara: event.target.value });
  },[]);

  
  return (
    <>
      <Grid container style={{ marginTop: '1rem' }} spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
          <br />
          <TextField label="Responsavel pelo Orçamento" value={orcamento.responsavelAlteracao} onChange={handlerChangeResponsavel} style={{ width: '100%' }} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <br />
          <TextField label="Email será enviado para:" value={orcamento.EmailPara} onChange={handlerChangeEmailPara} style={{ width: '100%' }} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <br />
          <TextField label="Titulo" value={orcamento.titulo} disabled style={{ width: '100%' }} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <br />
          <TextField label="Valor Final do Orçamento" value={`R$: ${orcamento.ValorFinal}`} disabled style={{ width: '100%' }} variant="outlined" />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4}>
          <br />
          <TextField label="Carga Horaria" value={`${orcamento.cargaHoraria} Horas por dia`} disabled style={{ width: '100%' }} variant="outlined" />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4}>
          <br />
          <TextField label="Tempo Alteração em Dia" value={orcamento.tempoAlteracaoDia} disabled style={{ width: '100%' }} variant="outlined" />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4}>
          <br />
          <TextField label="Tempo Alteração em Horas" value={orcamento.tempoAlteracaoHora} disabled style={{ width: '100%' }} variant="outlined" />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4}>
          <br />
          <TextField label="Valor do Orçamento por Hora" value={`R$: ${orcamento.valorHora}`} disabled style={{ width: '100%' }} variant="outlined" />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <br />
          <TextField label="Escopro" value={orcamento.escopro} disabled multiline rows={12} style={{ width: '100%' }} variant="outlined" />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <br />
          <TextField label="Dependência" value={orcamento.dependencia} disabled multiline rows={12} style={{ width: '100%' }} variant="outlined" />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <br />
          <TextField label="Condições Comerciais" value={orcamento.condicoesComerciais} disabled multiline rows={12} style={{ width: '100%' }} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <br />
          <TextField label="Condições de Entrega" value={orcamento.cronogramaEntrega} disabled multiline rows={12} style={{ width: '100%' }} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <br />
          <TextField label="Condições Gerais" value={orcamento.condicoesGerais} disabled multiline rows={12} style={{ width: '100%' }} variant="outlined" />
        </Grid>
      </Grid>
    </>
  );
}

export default Resume;