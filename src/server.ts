import 'dotenv/config';
import ping from 'ping';
import { prisma } from './database/prisma.js';


//função principal
async function executarMonitoramento() {
    console.log(`\n [${new Date().toLocaleDateString()}] Checkando IPs...`)

    //ip de testee, o 8888 é do google e o outro acho que não existe
    const ipsParaTeste = ['8.8.8.8','192.168.254.254']

    for (const ip of ipsParaTeste) {
        try {
            // fazendo o ping para o IP
            const resultado = await ping.promise.probe(ip, {timeout: 2});
            const online = resultado.alive;

            console.log(`Host: ${ip} | Status: ${online ? '🟢 ONLINE' :'🔴 OFFLINE' } (Tempo: ${resultado.time} ms)`);
        } catch (error) {
            console.error(`Erro ao pingar o IP ${ip}: `, error);
        }
    }
}
const DEZ_SEGUNDOS = 10 * 1000;
setInterval(executarMonitoramento, DEZ_SEGUNDOS);

executarMonitoramento();