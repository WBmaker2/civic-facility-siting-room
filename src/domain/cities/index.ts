import type { CityId, CityScenario } from '../types';
import { MARU_CITY } from './maruCity';
import { MULBIT_CITY } from './mulbitCity';

export const CITIES: Record<CityId, CityScenario> = { mulbit: MULBIT_CITY, maru: MARU_CITY };
export { MARU_CITY, MULBIT_CITY };
export { validateCity } from './validateCity';
