import { Queue } from "bullmq";
import createClient from "../redis/createClient.js";
import { PERFORMANCE_QUEUE, POPULATE_QUEUE } from "../util/consts.js";

export const PopulateQueue = new Queue(POPULATE_QUEUE, {
  connection: createClient(),
});

export const PerformanceQueue = new Queue(PERFORMANCE_QUEUE, {
  connection: createClient(),
});
