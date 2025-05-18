"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
async function updateWhitelist() {
    const mongoApiUrl = process.env.MONGO_API_URL;
    const publicKey = process.env.MONGO_API_PUBLIC_KEY;
    const privateKey = process.env.MONGO_API_PRIVATE_KEY;
    const projectId = process.env.MONGO_PROJECT_ID;
    // Debug das variáveis de ambiente
    console.log('Environment Variables:');
    console.log('MONGO_API_URL:', mongoApiUrl);
    console.log('MONGO_API_PUBLIC_KEY:', publicKey);
    console.log('MONGO_API_PRIVATE_KEY:', privateKey);
    console.log('MONGO_PROJECT_ID:', projectId);
    // Criar o cabeçalho de autenticação
    const authHeader = `Basic ${Buffer.from(`${publicKey}:${privateKey}`).toString('base64')}`;
    console.log('Authorization Header:', authHeader);
    const headers = {
        Authorization: authHeader,
        'Content-Type': 'application/json',
    };
    const url = `${mongoApiUrl}/groups/${projectId}/accessList`;
    console.log('Endpoint:', url);
    try {
        const { data: currentIp } = await axios_1.default.get('https://api.ipify.org', { responseType: 'text' });
        console.log(`IP atual: ${currentIp}`);
        // Verificar se o IP já está cadastrado
        const { data: accessList } = await axios_1.default.get(url, { headers });
        console.log('Access List:', accessList);
        const ipExists = accessList.some((entry) => entry.ipAddress === currentIp);
        if (ipExists) {
            console.log('IP já cadastrado na whitelist.');
            return;
        }
        // Adicionar novo IP
        const newIp = { ipAddress: currentIp, comment: 'Atualizado automaticamente' };
        const response = await axios_1.default.post(url, [newIp], { headers });
        console.log('IP atualizado com sucesso:', response.data);
    }
    catch (error) {
        if (error.response) {
            console.error('Erro ao atualizar a whitelist (Axios):', error.response.status);
            console.error('Detalhes do erro:', error.response.data);
        }
        else {
            console.error('Erro inesperado:', error.message);
        }
    }
}
updateWhitelist();
