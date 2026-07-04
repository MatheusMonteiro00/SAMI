import 'dotenv/config';
import ping from 'ping';
import { prisma } from '../database/prisma.ts';

//função principal
export async function executarMonitoramento() {
    console.log(`\n [${new Date().toLocaleDateString()}] Checkando IPs...`)

    //Atualização na logica, agora o sistema pede ao servidor um host para fazer a verificação
    const hosts = await prisma.host.findMany();

    if (hosts.length == 0){
        console.warn("Nenhum host cadastrado. . .")
        return;
    }

    for (const host of hosts) {
        try {
            // fazendo o ping agora para o host
            const resultado = await ping.promise.probe(host.ipAddress, {timeout:2,});

            const online = resultado.alive;

            //convertendo o tempo para número pois estava dando erro de unknown ao invés de 0 
            const latencia = resultado.time == Number(resultado.time) ? resultado.time : 0;

            //realizando a consulta e dispareando info grafica
            console.log (`${host.name} ${host.ipAddress})
                  | ${online ?  '🟢 ONLINE' :'🔴 OFFLINE'} }
                  | ${latencia} ms)`);
            
            //atualiza o status
            await prisma.host.update({
                where: {
                    id: host.id,
                },
                data: {
                    status: online ? "ONLINE" : "OFFLINE",
                },
            })

            //
            await prisma.pingLog.create({
                data: {
                    hostId: host.id,
                    status: online ? 'ONLINE' :' OFFLINE',
                    latencyMs: latencia
                }
            });

        } catch (error) {
            console.error(`Erro ao monitorar ${host.name} (${host.ipAddress}): `, error);
        }
        
    }
}

