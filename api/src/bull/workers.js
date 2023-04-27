import { Worker } from "bullmq";
import { POPULATE_QUEUE } from "../util/consts.js";
import { generatePerformance } from "../business-logic/kpis/generatePerformance.js";

export const PopulateWorker = new Worker(POPULATE_QUEUE, populate);

export const PerformanceWorker = new Worker(
  PERFORMANCE_QUEUE,
  generatePerformance
);
