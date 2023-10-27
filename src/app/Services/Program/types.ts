import { PROGRAM_GAMEOVER, PROGRAM_RUN, PROGRAM_STOP } from "./constant.js";

export type TPROGRAM = typeof PROGRAM_RUN | typeof PROGRAM_STOP | typeof PROGRAM_GAMEOVER;
