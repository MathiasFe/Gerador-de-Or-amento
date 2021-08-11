import React, { useState, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Stepper, Step, StepLabel, Button } from '@material-ui/core'
import Logo from "../../util/Logo/logo";
import { OrcamentoContext, UseOrcamentoContext } from "../../Context/OrcamentoContext";
import url from '../../util/UrlApi';
import axios from 'axios';
import Input from '../../Components/Forms/input';

function getStep() {
  return ['Escopo', 'Dependências', 'Cronograma', 'Condições Comerciais', 'Condições gerais', 'resume']
}

const GerarOrcamento: React.FC = () => {
  const { orcamento, actionDispatchOrcamento } = UseOrcamentoContext();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getStep();

  function handlerChange(event: ChangeEvent<HTMLInputElement>) {
    if (/[0-9]/g.test(event.target.value) && !/[a-z]/gi.test(event.target.value))
      actionDispatchOrcamento({ ...orcamento, [event.target.name]: parseFloat(event.target.value) });
    else
      actionDispatchOrcamento({ ...orcamento, [event.target.name]: event.target.value });
  }

  const handlerNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handlerBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  useEffect(() => {
    if (orcamento.cargaHoraria)
      actionDispatchOrcamento({...orcamento,tempoAlteracaoDia: (orcamento.tempoAlteracaoHora / orcamento.cargaHoraria)})

  }, [orcamento.tempoAlteracaoHora, orcamento.cargaHoraria])

  useEffect(() => {
    if (orcamento.valorHora) {
      let valorFinal = orcamento.valorHora * orcamento.tempoAlteracaoHora;

      actionDispatchOrcamento({ ...orcamento,ValorFinal: valorFinal })
    }
  }, [orcamento.valorHora])

  function handlerFinalizarForm() {
    let data = {
      "titulo": `${orcamento.titulo}`,
      "escopro": "" + orcamento.escopro,
      "dependencia": "" + orcamento.dependencia,
      "cronogramaEntrega": "" + orcamento.cronogramaEntrega,
      "condicoesComerciais": "" + orcamento.condicoesComerciais,
      "condicoesGerais": "" + orcamento.condicoesGerais,
      "valorHora": "" + orcamento.valorHora.toString(),
      "tempoAlteracaoHora": "" + orcamento.tempoAlteracaoHora.toString(),
      "tempoAlteracaoDia": "" + orcamento.tempoAlteracaoDia.toString(),
      "responsavelAlteracao": "" + orcamento.responsavelAlteracao,
      "cargaHoraria": "" + orcamento.cargaHoraria.toString(),
      "valorFinal": "" + orcamento.ValorFinal.toString(),
      "EmailPara": "" + orcamento.EmailPara,
    }

    axios.post(`${url}/dispatchEmail`, data).then(res => { console.log(res.data) });


  }

  return (
    <>
      <Logo><Link to="/"></Link></Logo>
      <Container maxWidth="lg">
        <Grid container justify="center" spacing={0} >
          <Grid item md={12} lg={12}>
            <Stepper activeStep={activeStep} alternativeLabel style={{ backgroundColor: 'transparent' }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item md={12} lg={12}>
            {
              activeStep === 0 ?
                <div>

                  <Grid container style={{ marginTop: '1rem' }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Input
                        name="titulo"
                        label="Titulo do Orçamento"
                        value={orcamento.titulo}
                        onChange={handlerChange}
                        multiline={false}
                        rows={1}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <br />
                      <Input
                        name="escopro"
                        label="Escopro da Alteração"
                        value={orcamento.escopro}
                        onChange={handlerChange}
                        multiline={true}
                        rows={12}
                        
                      />
                    </Grid>
                  </Grid>
                </div>
                :
                activeStep === 1 ?
                  <div>
                    <Grid container style={{ marginTop: '1rem' }}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <br />
                        <Input
                          name="dependencia"
                          label="Dependências do Projeto"
                          value={orcamento.dependencia}
                          onChange={handlerChange}
                          multiline={true}
                          rows={12}
                          required
                        />
                      </Grid>
                    </Grid>
                  </div>
                  :
                  activeStep === 2 ?
                    <div>
                      <Grid container style={{ marginTop: '1rem' }} spacing={3}>
                        <Grid item xs={12} sm={12} md={6} lg={6} >
                          <br />
                          <Input
                            name="tempoAlteracaoHora"
                            label="Tempo estimado em horas"
                            value={orcamento.tempoAlteracaoHora.toString()}
                            onChange={handlerChange}
                            multiline={false}
                            rows={1}
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} >
                          <br />
                          <Input
                            name="cargaHoraria"
                            label="Carga Horária de Trabalho por dia"
                            value={orcamento.cargaHoraria.toString()}
                            onChange={handlerChange}
                            multiline={false}
                            rows={1}
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <br />
                          <Input
                            name="tempoAlteracaoDia"
                            label="Tempo estimado em Dias"
                            value={orcamento.tempoAlteracaoDia.toString()}
                            onChange={handlerChange}
                            multiline={false}
                            rows={1}
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <br />
                          <Input
                            name="cronogramaEntrega"
                            label="Cronograma de Entrega"
                            value={orcamento.cronogramaEntrega}
                            onChange={handlerChange}
                            multiline={true}
                            rows={12}
                            required
                          />
                        </Grid>
                      </Grid>
                    </div>

                    :
                    activeStep === 3 ?
                      <div>
                        <Grid container style={{ marginTop: '1rem' }} spacing={2}>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <br />
                            <Input
                              name="valorHora"
                              label="Valor da Hora"
                              value={orcamento.valorHora.toString()}
                              onChange={handlerChange}
                              multiline={false}
                              rows={1}
                              type="number"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <br />
                            <Input
                              name="valorFinal"
                              label="Valor Total do Orçamento"
                              value={orcamento.ValorFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                              onChange={handlerChange}
                              multiline={false}
                              rows={1}
                              disabled
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <br />
                            <Input
                              name="condicoesComerciais"
                              label="Condições Comerciais"
                              value={orcamento.condicoesComerciais}
                              onChange={handlerChange}
                              multiline={true}
                              rows={12}
                              required
                            />
                          </Grid>
                        </Grid>
                      </div>
                      :
                      activeStep === 4 ?
                        <div>
                          <Grid container style={{ marginTop: '1rem' }} spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <br />
                              <Input
                                name="condicoesGerais"
                                label="Condições Gerais"
                                value={orcamento.condicoesGerais}
                                onChange={handlerChange}
                                multiline={true}
                                rows={12}
                                required
                              />
                              <Grid />
                            </Grid>
                          </Grid>
                        </div>
                        :
                        <div>
                          <Grid container style={{ marginTop: '1rem' }} spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <br />
                              <Input
                                name="responsavelAlteracao"
                                label="Responsavel pelo Orçamento"
                                value={orcamento.responsavelAlteracao}
                                onChange={handlerChange}
                                multiline={false}
                                rows={1}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <br />
                              <Input
                                name="EmailPara"
                                label="Email será enviado para:"
                                value={orcamento.responsavelAlteracao}
                                onChange={handlerChange}
                                multiline={false}
                                rows={1}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <br />
                              <Input
                                name="titulo"
                                label="Titulo"
                                value={orcamento.titulo}
                                onChange={handlerChange}
                                multiline={false}
                                rows={1}
                                disabled={true}

                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <br />
                              <Input
                                name="ValorFinal"
                                label="Valor Final do Orçamento"
                                value={orcamento.ValorFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                onChange={handlerChange}
                                multiline={false}
                                rows={1}
                                disabled={true}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <br />
                              <Input
                                name="cargaHoraria"
                                label="Carga Horaria"
                                value={`${orcamento.cargaHoraria} Horas por dia`}
                                onChange={handlerChange}
                                multiline={false}
                                rows={1}
                                disabled={true}
                              />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <br />
                              <Input
                                name="tempoAlteracaoDia"
                                label="Tempo Alteração em Dia"
                                value={orcamento.tempoAlteracaoDia.toString()}
                                onChange={handlerChange}
                                multiline={false}
                                rows={1}
                                disabled={true}
                              />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <br />
                              <Input
                                name="tempoAlteracaoHora"
                                label="Tempo Alteração em Hora"
                                value={orcamento.tempoAlteracaoHora}
                                onChange={handlerChange}
                                multiline={false}
                                rows={1}
                                disabled={true}
                              />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} lg={4}>
                              <br />
                              <Input
                                name="tempoAlteracaoHora"
                                label="Valor do Orçamento por Hora"
                                value={orcamento.valorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                onChange={handlerChange}
                                multiline={false}
                                rows={1}
                                disabled={true}
                              />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <br />
                              <Input
                                name="Escopro"
                                label="Escopro"
                                value={orcamento.escopro}
                                onChange={handlerChange}
                                multiline={false}
                                rows={1}
                                disabled={true}
                              />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <br />
                              <Input
                                name="Dependência"
                                label="Dependência"
                                value={orcamento.dependencia}
                                onChange={handlerChange}
                                multiline={true}
                                rows={12}
                                disabled={true}
                              />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <br />
                              <Input
                                name="condicoesComerciais"
                                label="Condições Comerciais"
                                value={orcamento.condicoesComerciais}
                                onChange={handlerChange}
                                multiline={true}
                                rows={12}
                                disabled={true}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <br />
                              <Input
                                name="cronogramaEntrega"
                                label="Condições de Entrega"
                                value={orcamento.cronogramaEntrega}
                                onChange={handlerChange}
                                multiline={true}
                                rows={12}
                                disabled={true}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <br />
                              <Input
                                name="condicoesGerais"
                                label="Condições Gerais"
                                value={orcamento.condicoesGerais}
                                onChange={handlerChange}
                                multiline={true}
                                rows={12}
                                disabled={true}
                              />
                            </Grid>
                          </Grid>
                        </div>
            }
            <br />

          </Grid>
          <Grid item xs={6} sm={6} md={1} lg={1}>
            {activeStep > 0 &&
              <Button variant="contained" color="primary" onClick={handlerBack} >Voltar</Button>
            }
          </Grid>
          <Grid item xs={6} sm={6} md={1} lg={1}>
            {
              activeStep == steps.length - 1 ?
                <Button variant="contained" color="secondary" onClick={handlerFinalizarForm} >Finalizar</Button>
                :
                <Button variant="contained" color="secondary" onClick={handlerNext} >Proximo</Button>
            }
          </Grid>
        </Grid>
        <br />
      </Container>
    </>
  );
}

export default GerarOrcamento;