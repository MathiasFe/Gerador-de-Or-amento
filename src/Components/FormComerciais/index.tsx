import React, { useState, ChangeEvent, useEffect } from 'react';
import { UseOrcamentoContext } from '../../Context/OrcamentoContext';
import { Grid, TextField, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FormComerciais: React.FC = () => {
  const { orcamento, actionDispatchOrcamento } = UseOrcamentoContext();
  const [valorHora, setValorHora] = useState(orcamento.valorHora.toString());
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  function handlerChangeValorHora(event: ChangeEvent<HTMLInputElement>) {
    if (validaNumber(event.target.value))
      return;
    setValorHora(event.target.value);
  }

  useEffect(() => {
    if (valorHora) {
      let valorFinal = ((parseFloat(valorHora)) * orcamento.tempoAlteracaoHora);
    
      actionDispatchOrcamento({ ...orcamento, valorHora: (parseFloat(valorHora)), ValorFinal: valorFinal })
    }
  }, [valorHora])

  function handlerChangeCondicoesComerciais(event: ChangeEvent<HTMLInputElement>) {
    actionDispatchOrcamento({ ...orcamento, condicoesComerciais: event.target.value });
  }

  function validaNumber(value: string) {
    const regex = /[a-zÀ-ü]/gi;
    if (regex.test(value)) {
      setMessage("Inserir somente números no campo de valor hora")
      setOpen(true);
      return true;
    }
    return false;
  }


  function handleClose() {
    setOpen(false)
    setMessage('');
  }

  return (
    <>
      <Grid container style={{ marginTop: '1rem' }} spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <br />
          <TextField label="Valor da Hora" value={valorHora} onChange={handlerChangeValorHora} style={{ width: '100%' }} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <br />
          <TextField label="Valor Total do Orçamento" value={`R$ ${orcamento.ValorFinal ?? 0}`} disabled style={{ width: '100%' }} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <br />
          <TextField label="Condições Comerciais" value={orcamento.condicoesComerciais} onChange={handlerChangeCondicoesComerciais} multiline rows={12} style={{ width: '100%' }} variant="outlined" />
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="error" onClose={handleClose}>{message}</Alert>
          </Snackbar>

        </Grid>
      </Grid>
    </>
  );
}

export default FormComerciais;