export interface IDiagnostic {
  createdAt: string;
  updatedAt: string;
  alturaInferior: number;
  alturaInferiorMm: number;
  alturaFInfR1: number;
  alturaFInfR5: number;
  biotipo: string;
  cajaDental: string;
  dxIIoIII: string;
  ejeIncisivoSupDx: string;
  ejeIncisivoInfDx: string;
  longMandR1: number;
  longMandR2: number;
  longMandR3: number;
  longMandR4: number;
  planoDeOclusion: string;
  segMolarInfDx: string;
  relacionEsqueletica: string;
  relacionEsqueleticaMm: number;
  tendenciaVertical: string;
  sum1a1Inf: number;
  sum1a1Sup: number;
  sum1a1Sup75: number;
  sum1a1Sup75Red: number;
  sum1a1SupKorkhause: number;
  diferencia4_4: number;
  diferencia6_6: number;
  diferenciaLongAnt: number;
  distancia4_4: number;
  distancia6_6: number;
  distanciaLongAnt: number;
  discrepancia: string;
  expansion: IExpansion;
}
interface IExpansion {
  korkhause: ExpansionItem;
  korkhauseMod: ExpansionItem;
  mordidaCruzada: ExpansionItem;
  apinAnterior: ExpansionItem;
}
interface ExpansionItem {
  turns: number;
  selected: boolean;
}