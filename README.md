# 📘 README do MVP

> Este guia descreve as etapas para baixar, instalar, configurar e executar o MVP localmente.

---

## 1. 🔽 Baixando o Projeto

Acesse o repositório no GitHub e, na branch `main`, baixe todos os arquivos do projeto.

---

## 2. 🧩 Instalando o Node.js

> Se ainda não possui o Node.js instalado, [acesse o site oficial](https://nodejs.org) e baixe a versão recomendada para sua máquina.

Siga as instruções fornecidas no site para concluir a instalação.

---

## 3. ⚙️ Configuração das Variáveis de Ambiente do Sistema (Windows)

Para garantir o funcionamento adequado dos comandos `npm`:

1. Pressione `Win + R`, digite `sysdm.cpl` e pressione Enter.
2. Vá até a aba **Avançado** e clique em **Variáveis de Ambiente**.
3. Em **Variáveis do sistema**:
   - Crie uma nova variável chamada `NODE_PATH` com o caminho para a pasta de instalação do npm (geralmente:  
     `C:\Program Files\nodejs\npm`).
4. Em **Variáveis de usuário**, edite a variável `Path` e adicione esse mesmo caminho.

---

## 4. 📦 Instalando e Configurando o Projeto

1. Abra o terminal na IDE de sua preferência.
2. Execute:

```bash
npm install
npm run build
```

Esses comandos instalarão as dependências e compilarão os arquivos do diretório `src` para a pasta `dist`.

---

## 5. 🛢️ Configuração do Banco de Dados

### 🔹 MongoDB

1. Localize o arquivo `.env` na raiz do projeto.
2. Preencha as variáveis:

```env
MONGO_URI = <URL do driver MongoDB>
MONGO_DB_NAME = <Nome do banco MongoDB>
```

---

### 🔸 MySQL

1. No **MySQL Workbench**, crie um novo *schema*.
2. Navegue até `Server > Users and Privileges` para criar um novo usuário.
3. Execute:

```sql
GRANT ALL PRIVILEGES ON nome_do_banco.* TO 'nome_usuario'@'host';
FLUSH PRIVILEGES;
```

4. No arquivo `.env`, preencha:

```env
MYSQL_USER = <Nome do usuário>
MYSQL_PASSWORD = <Senha do usuário>
MYSQL_DATABASE = <Nome do banco>
```

---

## 6. ▶️ Inicializando o Projeto

Após todas as configurações, execute:

```bash
npm run dev
```

> Certifique-se de que o banco de dados MySQL esteja populado com as tabelas necessárias.

---

## 7. 🐳 Configuração com Docker

1. No arquivo `.env.production`, atualize as variáveis de banco conforme necessário.
2. No `docker-compose.yml`, edite os serviços:

- **`backend`**:
  - Variáveis: `DB_USER`, `DB_PASS`, `DB_NAME`
- **`mysql`**:
  - Propriedades: `image`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_ROOT_PASSWORD`

3. Gere um dump do banco local:

```bash
mysqldump -u [usuario] -p [nome_do_banco] > ./database/nomeBanco.sql
```

4. No `docker-compose.yml`, adicione:

```yaml
volumes:
  - ./database/nomeBanco.sql:/docker-entrypoint-initdb.d/nomeBanco.sql
```

---

## 8. ⚙️ Personalização de Portas

### 🔧 Back-end
Verifique e, se necessário, edite as seguintes linhas:

- `.env` → Linhas **17 e 33**
- `.env.production` → Linha **17**
- `docker-compose.yml` → Linha **9**
- `Dockerfile.backend` → Linha **22**
- `vite.config.js` → Linha **12**
- `src/backend/main.ts` → Linha **41**
- `src/config/app.config.js` → Linha **9**
- `src/frontend/components/js/createProcess` → Linha **11**
- `src/frontend/components/js/list` → Linhas **32, 64, 82**
- `src/frontend/components/js/process` → Linhas **81, 101, 144, 394, 414, 433**

### 🎨 Front-end
- `.env` → Linha **36**
- `.env.production` → Linha **32**
- `docker-compose.yml` → Linha **26**
- `Dockerfile.frontend` → Linha **29**
- `server.js` → Linha **14**
- `vite.config.js` → Linha **9**
- `src/backend/main.ts` → Linha **20**

### 🗄️ Banco SQL
- `.env` → Linha **11**
- `.env.production` → Linha **11**
- `docker-compose.yml` → Linhas **16 e 43**
