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
            
            //convertendo o tempo para número pois estava dando erro de unknown ao invés de 0 
            const latencia = resultado.time == Number(resultado.time) ? resultado.time : 0;
            

            
            //const latencia = resultado.time !== 'unknown' ? Number(resultado.time) : 0;

            console.log (
                `Host: ${ip} | Status: ${online ? '🟢 ONLINE' :'🔴 OFFLINE' } (Tempo: ${latencia} ms)`
            );

            const host = await prisma.host.findUnique({
            where: { ipAddress: ip }
            });  

            if (!host) {
                console.warn(`Host não cadastrado no banco: ${ip}`);
                continue;
                }

            await prisma.host.update({
                where: { id: host.id },
                data: { status: online ? "ONLINE" : "OFFLINE", }
                });

            await prisma.pingLog.create({
            data: {
                hostId: host.id,
                status: online ? "ONLINE" : "OFFLINE",
                latencyMs: Number(latencia),
  }
});
        } catch (error) {
            console.error(`Erro ao pingar o IP ${ip}: `, error);
        }
        
    }
}
const DEZ_SEGUNDOS = 10 * 1000;
setInterval(executarMonitoramento, DEZ_SEGUNDOS);

executarMonitoramento();