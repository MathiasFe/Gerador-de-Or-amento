import React, { useState, ChangeEvent, useEffect } from 'react';
import { Grid, TextField, Snackbar } from '@material-ui/core';
import { UseOrcamentoContext } from '../../Context/OrcamentoContext';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FormCronograma: React.FC = () => {
  const { orcamento, actionDispatchOrcamento } = UseOrcamentoContext();
  const [tempoAlteracaoHora, setTempoAlteracaoHora] = useState(orcamento.tempoAlteracaoHora.toString());
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [tempoAlteracaoDia, setTempoAlteracaoDia] = useState(orcamento.tempoAlteracaoDia.toString());
  const [cargaHoraria, setCargaHorari] = useState(orcamento.cargaHoraria.toString());

  function handlerChangeCronograma(event: ChangeEvent<HTMLInputElement>) {
    actionDispatchOrcamento({ ...orcamento, cronogramaEntrega:event.target.value });
  }

  function handlerChangeHora(event: ChangeEvent<HTMLInputElement>) {
    if (validaNumber(event.target.value)) {
      return;
    }
    setTempoAlteracaoHora(event.target.value)
  }

  function handlerChangeCargaHoraria(event: ChangeEvent<HTMLInputElement>) {
    if (validaNumber(event.target.value)) {
      return;
    }
    setCargaHorari(event.target.value);
  }

  useEffect(() => {
    let hora = parseFloat(tempoAlteracaoHora);
    let horarioTrabalhado = parseFloat(cargaHoraria);
    let dia = 0;
    let calculoAux = "";

    if (hora > 0 && horarioTrabalhado > 0)
      calculoAux = `${hora / horarioTrabalhado}.${(hora % horarioTrabalhado)}`

    dia = parseFloat(calculoAux);

    if (dia < 1)
      dia = 1;
    
    let arrayString = calculoAux.split('.');

    setTempoAlteracaoDia(`${arrayString[0]??0} ${parseFloat(arrayString[0]) > 1 ? "dias" : "dia"} e ${arrayString[1]??0} horas`);
    actionDispatchOrcamento({ ...orcamento, cargaHoraria:horarioTrabalhado, tempoAlteracaoHora:hora, tempoAlteracaoDia: dia });
  }, [tempoAlteracaoHora, cargaHoraria])

  function validaNumber(value: string) {
    const regex = /[a-zÀ-ü]/gi;
    if (regex.test(value)) {
      setMessage("Inserir somente números no campo Horas")
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
      <Grid container style={{ marginTop: '1rem' }} spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6} >
          <br />
          <TextField label="Tempo estimado em horas" value={tempoAlteracaoHora} onChange={handlerChangeHora} style={{ width: '100%' }} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} >
          <br />
          <TextField label="Carga Horária de Trabalho por dia" value={cargaHoraria} onChange={handlerChangeCargaHoraria} style={{ width: '100%' }} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <br />
          <TextField label="Tempo estimado em Dias" value={tempoAlteracaoDia} disabled style={{ width: '100%' }} variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <br />
          <TextField label="Cronograma de Entrega" value={orcamento.cronogramaEntrega} onChange={handlerChangeCronograma} multiline rows={12} style={{ width: '100%' }} variant="outlined" />
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

export default FormCronograma;