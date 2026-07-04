import { executarMonitoramento } from "./services/monitor.service.ts";

const DEZ_SEGUNDOS = 10 * 1000;

executarMonitoramento();
setInterval(executarMonitoramento, DEZ_SEGUNDOS);

