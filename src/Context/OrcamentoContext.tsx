import React, { createContext, ReactNode, useContext, useState } from 'react';
import * as IOrcamento from '../util/Interface/interfaceOrcamento';


const initialOrc = {
  titulo: "",
  escopro: "",
  dependencia: "",
  cronogramaEntrega: "",
  condicoesComerciais: "",
  condicoesGerais: "",
  EmailPara:"",
  valorHora: 0.00,
  tempoAlteracaoHora: 0,
  tempoAlteracaoDia: 0,
  responsavelAlteracao: "",
  cargaHoraria: 0,
  ValorFinal:0,
}


export const OrcamentoContext = createContext({} as IOrcamento.IOrcamentoProvider);

export function OrcamentoProvider({ children }: IOrcamento.IOrcamentoProps) {
  const [orcamento, setOrcamento] = useState<IOrcamento.IOrcamentoFinal>(initialOrc);

  function actionDispatchOrcamento(newOrc:IOrcamento.IOrcamentoFinal) {
    setOrcamento(newOrc);
  }


  return (
    <OrcamentoContext.Provider value={{ orcamento,actionDispatchOrcamento }} >
      {children}
    </OrcamentoContext.Provider>
  )
}

export const UseOrcamentoContext = () => useContext(OrcamentoContext);