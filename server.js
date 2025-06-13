const express = require('express');
const path = require('path');
const app = express();

// Servindo os arquivos estáticos gerados pelo Vite
app.use(express.static(path.join(__dirname, 'dist', 'frontend')));

// Serve o index.html para qualquer rota não encontrada
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'frontend', 'index.html'));
});

// Porta padrão (3000 ou o valor configurado no ambiente)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Frontend rodando na porta ${PORT}`));
