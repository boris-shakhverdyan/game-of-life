import { PROGRAM_RUN } from "../app/Services/Program/constant.js";
import { TPROGRAM } from "../app/Services/Program/types.js";
import { TSeasons } from "../app/Services/Season/types.js";

export const PORT = 3000;
export const DEFAULT_PROGRAM_STATUS: TPROGRAM = PROGRAM_RUN;
export const DEBUG_MODE = false;
export const START_SEASON: TSeasons = "Summer";
export const AUTO_SEASON: boolean = true;
export const SEASON_CHANGE_RATE: number = 10;
