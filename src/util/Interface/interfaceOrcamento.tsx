import {ReactNode} from 'react';

export interface IOrcamentoFinal {
  titulo: string,
  escopro: string,
  dependencia: string,
  cronogramaEntrega: string,
  condicoesComerciais: string,
  condicoesGerais: string,
  EmailPara:string,
  valorHora: number,
  tempoAlteracaoHora: number,
  tempoAlteracaoDia: number,
  responsavelAlteracao: string,
  cargaHoraria: number,
  ValorFinal:number  
}

export interface IOrcamentoProvider {
  orcamento: IOrcamentoFinal,
  actionDispatchOrcamento:(newOrc:IOrcamentoFinal)=>void,
}

//Recebe props genericas
export interface IOrcamentoProps {
  children: ReactNode,
}