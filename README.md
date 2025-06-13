README do MVP
Este guia descreve as etapas necessárias para baixar, instalar e configurar o MVP. 

1. Baixar o MVP
Acesse o repositório no GitHub.


Na branch main, baixe todos os arquivos disponíveis.



2. Instalação do Node.js
Se você ainda não possui o Node.js instalado:
Acesse nodejs.org.


Baixe a versão recomendada para sua máquina.


Siga as instruções de instalação fornecidas no site.









3. Configuração para execução de comandos npm
Para garantir que os comandos npm funcionem corretamente:
Pressione Windows + R, digite sysdm.cpl e pressione Enter para abrir as Propriedades do Sistema.


Vá até a aba Avançado e clique em Variáveis de Ambiente.


Nas variáveis de sistema:


Crie uma nova variável com o nome NODE_PATH e insira o caminho para a pasta npm (geralmente C:\Program Files\nodejs\npm).


Se necessário, edite a variável Path nas variáveis de usuário, adicione um novo valor e insira o mesmo caminho.



4. Instalação e configuração do projeto
Abra o terminal na IDE de sua preferência, execute o comando:
 npm install.
 Para instalar todas as dependências, compile os arquivos do projeto com:           npm run build.
 Isso garantirá que os arquivos do diretório src sejam transferidos para a pasta dist.



5. Configuração do Banco de Dados
5.1 MongoDB
Localize o arquivo .env na raiz do projeto e preencha as variáveis:

 MONGO_URI = <URL do driver MongoDB>
MONGO_DB_NAME = <Nome do banco MongoDB>

5.2 MySQL
No MySQL Workbench, crie um novo schema SQL.


Crie um usuário navegando em Server > Users and Privileges.


Execute os comandos abaixo no Workbench:

 GRANT ALL PRI V ILEGES ON nome_do_banco.* TO 'nome_usuario'@'host';
FLUSH PRIVILEGES;
Preencha o arquivo .env com as informações do banco:
 MYSQL_USER = <Nome do usuário>
MYSQL_PASSWORD = <Senha do usuário>
MYSQL_DATABASE = <Nome do banco>


6. Inicialização do Projeto
Após a configuração:
Execute o comando: npm run dev
Certifique-se de que o banco de dados MySQL contém as tabelas necessárias para a aplicação.



7. Configuração com Docker
No arquivo .env.production, atualize as variáveis do banco de dados conforme configurado nas etapas anteriores.


No arquivo docker-compose.yml, edite as seções:


Service backend: Ajuste DB_USER, DB_PASS e DB_NAME.


Service mysql: Ajuste image, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE e MYSQL_ROOT_PASSWORD.


Na pasta ‘database’, gere um dump do banco de dados local:

 mysqldump -u [usuário] -p [nome_do_banco] > arquivo.sql

Atualize o arquivo docker-compose.yml para incluir o dump no volume do MySQL:
 volumes:
  - ./database/<nomeBanco.sql>:/docker-entrypoint-initdb.d/<nomeBanco.sql>







8. Personalização das Portas
Caso precise alterar as portas utilizadas, modifique as referências nos seguintes arquivos:
Back-end
.env (linhas 17 e 33)


.env.production (linha 17)


docker-compose.yml (linha 9)


DockerFile.backend (linha 22)


vite.config.js (linha 12)


src/backend/main.ts (linha 41)


src/config/app.config.js (linha 9)

src/frontend/components/js/createProcess (linha 11)

src/frontend/components/js/list (linha 32, 64 e 82)

src/frontend/components/js/process (linha 81, 101, 144, 394, 414 e 433)









Front-end
.env (linha 36)


.env.production (linha 32)


docker-compose.yml (linha 26)


DockerFile.frontend (linha 29)


server.js (linha 14)


vite.config.js (linha 9)

src/backend/main.ts (linha 20)


Banco SQL
.env (linha 11)


.env.production (linha 11)


docker-compose.yml (linhas 16 e 43)



