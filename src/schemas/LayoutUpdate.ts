import { PageDSL } from '../types';

export interface LayoutUpdate {
  dsl: PageDSL;
  lastSuccessfulWrite: number;
}
