import express from 'express'
import { prisma } from '../src/database/prisma.ts'

const app  = express()

app.use(express.json())

app.get('/api/hosts', async function (req, res) {

    try {
        let hosts = await prisma.host.findMany();

        if (hosts.length === 0) {
            console.log(" Banco vazio. Cadastrando o primeiro host de teste...");
            
            await prisma.host.create({
                data: {
                    name: 'Google DNS',
                    ipAddress: '8.8.8.8',
                    status: 'UNKNOWN'
                }
            });
            hosts = await prisma.host.findMany();
        }

        res.json(hosts);

    } catch (error) {
        console.error("Erro interno do Prisma:", error);

        res.status(500).json({ 
            error: 'Erro ao consultar ou popular os hosts no banco',
            detalhes: error instanceof Error ? error.message : error 
        });
    }
});

app.listen(3000,()=>{
    console.log(`Servidor rodando em http://localhost:3000`)
})