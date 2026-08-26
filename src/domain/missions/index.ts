import type { MissionId, MissionDefinition } from '../types';
import { COMBINED_MISSION } from './combinedMission';
import { CULTURE_CENTER_MISSION } from './cultureCenterMission';
import { HEALTH_SUPPORT_MISSION } from './healthSupportMission';
import { LIBRARY_MISSION } from './libraryMission';

export const MISSIONS: Record<MissionId, MissionDefinition> = {
  'bookmaru-library': LIBRARY_MISSION,
  'health-help-center': HEALTH_SUPPORT_MISSION,
  'living-culture-center': CULTURE_CENTER_MISSION,
  'combined-review': COMBINED_MISSION,
};
export { COMBINED_MISSION, CULTURE_CENTER_MISSION, HEALTH_SUPPORT_MISSION, LIBRARY_MISSION };
