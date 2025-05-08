
import axios from 'axios';
import * as XLSX from "xlsx"; // Usado para o suporte a arquivos do Excel
import "./styles.css";  // Importação do CSS externo

export default {
	data() {
		return {
			formatos: [".csv", ".xlsx", ".json",],
			arquivoCarregado: null,
			arquivoSelecionado: null,
			mensagem: null,
			mensagemCor: "gray",
			arquivosArmazenados: new Map(),
			tela: "inicio",
			_historicoTelas: [], //Usado para o botão de voltar

			// Informações de processos já carregados para o Controle de Importações
			processos: [
				{
					id: "arquivo-3.csv",
					periodo: "2025/1",
					inicio: "8/24/2025 - 16:59",
					termino: "15/6/2025 - 22:30",
					status: "Em andamento"
				},
				{
					id: "arquivo-2.csv",
					periodo: "2025/1",
					inicio: "17/8/2024 - 19:09",
					termino: "7/12/2024 - 22:30",
					status: "Concluído"
				},
				{
					id: "arquivo-1.csv",
					periodo: "2024/2",
					inicio: "9/2/2024 - 16:59",
					termino: "11/6/2024 - 22:30",
					status: "Concluído"
				}
			],

			// Para a importação de dados:
			telaEtapas: ["importarPeriodo", "importarDisciplinas", "importarTurmas", "importarUsuarios", "importarVinculos"],
			nomeEtapas: ["Período Letivo", "Disciplinas", "Turmas", "Usuários", "Vínculos"],
			etapaAtual: 0,
			listaAtual: null,
			
			paginaAtual: 0, //Para a paginação

			// Etapa 2 - Disciplinas
			listaDisciplinas: [
				{
					periodo: "2025/1",
					disciplina: "Banco de Dados",
					codigo: 3,
					inicio: "2025-02-10",
					termino: "2025-06-30",
					categoria: "Obrigatória",
					periodoCurricular: 3,
					estado: "Ativa",
					campus: "Campus Central",
					status: "Pendente"
				},
				{
					periodo: "2025/1",
					disciplina: "Estrutura de Dados",
					codigo: 4,
					inicio: "2025-02-10",
					termino: "2025-06-30",
					categoria: "Obrigatória",
					periodoCurricular: 2,
					estado: "Ativa",
					campus: "Campus Leste",
					status: "Pendente"
				},
				{
					periodo: "2025/1",
					disciplina: "Redes de Computadores",
					codigo: 5,
					inicio: "2025-02-10",
					termino: "2025-06-30",
					categoria: "Obrigatória",
					periodoCurricular: 4,
					estado: "Ativa",
					campus: "Campus Central",
					status: "Pendente"
				},
				{
					periodo: "2025/1",
					disciplina: "Inteligência Artificial",
					codigo: 6,
					inicio: "2025-02-17",
					termino: "2025-06-25",
					categoria: "Optativa",
					periodoCurricular: 6,
					estado: "Ativa",
					campus: "Campus Oeste",
					status: "Pendente"
				},
				{
					periodo: "2025/1",
					disciplina: "Desenvolvimento Web",
					codigo: 7,
					inicio: "2025-02-12",
					termino: "2025-06-28",
					categoria: "Obrigatória",
					periodoCurricular: 3,
					estado: "Ativa",
					campus: "Campus Sul",
					status: "Pendente"
				},
				{
					periodo: "2025/1",
					disciplina: "Empreendedorismo em TI",
					codigo: 8,
					inicio: "2025-02-15",
					termino: "2025-06-30",
					categoria: "Optativa",
					periodoCurricular: 5,
					estado: "Ativa",
					campus: "Campus Norte",
					status: "Pendente"
				},
				{
					periodo: "2025/1",
					disciplina: "Segurança da Informação",
					codigo: 9,
					inicio: "2025-02-11",
					termino: "2025-06-29",
					categoria: "Obrigatória",
					periodoCurricular: 5,
					estado: "Ativa",
					campus: "Campus Central",
					status: "Pendente"
				}
			],

			// Etapa 3 - Turmas
			listaTurmas: [
				{
					turma: "Turma A",
					codigo: "T001",
					disciplina: "Cálculo 1",
					turno: "Manhã",
					capacidade: 40,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. Ricardo Luiz",
					status: "Pendente"
				},
				{
					turma: "Turma A",
					codigo: "T001",
					disciplina: "Cálculo 1",
					turno: "Manhã",
					capacidade: 40,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. Ricardo Luiz",
					status: "Pendente"
				  },
				  {
					turma: "Turma E",
					codigo: "T002",
					disciplina: "Física 1",
					turno: "Tarde",
					capacidade: 35,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. Ana Paula",
					status: "Confirmado"
				  },
				  {
					turma: "Turma C",
					codigo: "T003",
					disciplina: "Química Geral",
					turno: "Noite",
					capacidade: 30,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. João Carlos",
					status: "Pendente"
				  },
				  {
					turma: "Turma D",
					codigo: "T004",
					disciplina: "Álgebra Linear",
					turno: "Manhã",
					capacidade: 40,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. Fernanda Lima",
					status: "Cancelado"
				  },
				  {
					turma: "Turma A",
					codigo: "T005",
					disciplina: "História da Arte",
					turno: "Tarde",
					capacidade: 25,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. Marcos Vieira",
					status: "Confirmado"
				  },
				  {
					turma: "Turma B",
					codigo: "T006",
					disciplina: "Geometria Analítica",
					turno: "Noite",
					capacidade: 35,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. Juliana Reis",
					status: "Pendente"
				  },
				  {
					turma: "Turma B",
					codigo: "T007",
					disciplina: "Literatura Brasileira",
					turno: "Manhã",
					capacidade: 45,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. Carlos Mendes",
					status: "Confirmado"
				  },
				  {
					turma: "Turma E",
					codigo: "T008",
					disciplina: "Programação I",
					turno: "Tarde",
					capacidade: 40,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. Bianca Souza",
					status: "Pendente"
				  },
				  {
					turma: "Turma D",
					codigo: "T009",
					disciplina: "Introdução à Economia",
					turno: "Noite",
					capacidade: 30,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. Daniel Costa",
					status: "Confirmado"
				  },
				  {
					turma: "Turma C",
					codigo: "T010",
					disciplina: "Sociologia",
					turno: "Manhã",
					capacidade: 50,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. Helena Braga",
					status: "Pendente"
				  },
				  {
					turma: "Turma A",
					codigo: "T011",
					disciplina: "Estatística I",
					turno: "Tarde",
					capacidade: 38,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. Roberto Teixeira",
					status: "Confirmado"
				  },
				  {
					turma: "Turma B",
					codigo: "T012",
					disciplina: "Biologia Celular",
					turno: "Noite",
					capacidade: 32,
					inicio: "04/03/2025",
					termino: "28/06/2025",
					professor: "Prof. Letícia Barros",
					status: "Cancelado"
				  }
			],

			// Etapa 4 - Usuarios
			listaUsuarios: [
				{
					nome: "Lucas Santos",
					matricula: "20251234",
					email: "lucas.santos@email.com",
					curso: "Arquitetura de Computadores",
					tipo: "Aluo",
					nascimento: "04/08/2025",
					cadastro: "28/06/2025",
					contato: "(11) 91234-5678",
					status: "Pendente"
				},
				{
					nome: "Rafael Lima",
					matricula: "20251234",
					email: "rafalima@email.com",
					curso: "Lógica de Programação",
					tipo: "Aluno",
					nascimento: "04/03/2025",
					cadastro: "28/06/2025",
					contato: "(21) 99876-5432",
					status: "Finalizado"
				},
				{
					nome: "Júlia Silva",
					matricula: "20249876",
					email: "ju.silva@email.com",
					curso: "Arquitetura de Computadores",
					tipo: "Aluno",
					nascimento: "04/03/2025",
					cadastro: "28/06/2025",
					contato: "(31) 98765-4321",
					status: "Finalizado"
				},
				{
					nome: "Emanoele Silveira",
					matricula: "20254985",
					email: "ju.silva@email.com",
					tipo: "Professor",
					curso: "Sistemas Operacionais",
					nascimento: "04/03/2025",
					cadastro: "28/06/2025",
					contato: "(41) 91234-0000",
					status: "Pendente"
				},
				{
					nome: "Kaique Souza",
					matricula: "25236254",
					email: "kaique.souza@email.com",
					curso: "Redes de Computadores",
					tipo: "Aluno",
					nascimento: "04/03/2025",
					cadastro: "28/06/2025",
					contato: "(85) 99888-1122",
					status: "Pendente"
				},
				{
					nome: "Herbert Menezes",
					matricula: "20242565",
					email: "herbert.menezes@email.com",
					curso: "Segurança da Informação",
					tipo: "Professor",
					nascimento: "04/03/2025",
					cadastro: "28/06/2025",
					contato: "(61) 93456-7890",
					status: "Pendente"
				}
			],

			// Etapa 5 - Vínculos
			listaVinculos: [
				{
					nome: "Lucas Santos",
					matricula: "20251234",
					turma: "Turma C",
					disciplina: "Arquitetura de Computadores",
					papel: "Mentor",
					inicio: "04/03/2025",
					termino: "28/06/2025",
					obs: 1,
					status: "Pendente"
				},
				{
					nome: "Rafael Lima",
					matricula: "20251234",
					turma: "Turma C",
					disciplina: "Lógica de Programação",
					papel: "Mentor",
					inicio: "04/03/2025",
					termino: "28/06/2025",
					obs: 3,
					status: "Finalizado"
				},
				{
					nome: "Júlia Silva",
					matricula: "20249876",
					turma: "Turma C",
					disciplina: "Arquitetura de Computadores",
					papel: "Mentor",
					inicio: "04/03/2025",
					termino: "28/06/2025",
					obs: 2,
					status: "Finalizado"
				},
				{
					nome: "Emanoele Silveira",
					matricula: "20254985",
					turma: "Turma B",
					disciplina: "Sistemas Operacionais",
					papel: "Estagiário",
					inicio: "04/03/2025",
					termino: "28/06/2025",
					obs: 1,
					status: "Pendente"
				},
				{
					nome: "Kaique Souza",
					matricula: "25236254",
					turma: "Turma B",
					disciplina: "Redes de Computadores",
					papel: "Estagiário",
					inicio: "04/03/2025",
					termino: "28/06/2025",
					obs: 2,
					status: "Pendente"
				},
				{
					nome: "Herbert Menezes",
					matricula: "20242565",
					turma: "Turma B",
					disciplina: "Segurança da Informação",
					papel: "Estagiário",
					inicio: "04/03/2025",
					termino: "28/06/2025",
					obs: 0,
					status: "Pendente"
				}
			]
		}
	},
	watch: {
		tela(value)	{
			switch(value) {
				case "importarDisciplinas":
					this.listaAtual = this.listaDisciplinas;
					break;
				case "importarTurmas":
					this.listaAtual = this.listaTurmas;
					break;
				case "importarUsuarios":
					this.listaAtual = this.listaUsuarios;
					break;
				case "importarVinculos":
					this.listaAtual = this.listaVinculos;
					break;
				default:
					this.listaAtual = null;
			}
		}
	},
	mounted() {
		// carrega como array e converte para map
		const arquivosSalvos = localStorage.getItem("arquivosArmazenados");
		if(arquivosSalvos) {
			JSON.parse(arquivosSalvos).forEach(element => {
				this.arquivosArmazenados.set(element.name, element.content);
				//console.log(`Encontrado: "${element.name}", tamanho: ${element.content.length}`);
			});
		}
	},
	methods: {
		// Telas
		mudarTela(tela, historico = true) {
			if(historico) {
				this._historicoTelas.push(this.tela);
			}
			this.mensagem = null;
			this.mensagemCor = "gray";
			this.arquivoSelecionado = null;
			this.tela = tela;
			this.paginaAtual = 0;
			this.etapaAtual = this.telaEtapas.indexOf(tela);

			let tituloDaPagina = "Página sem nome";
			switch(this.tela) {
				case "inicio":
					tituloDaPagina = "Página Inicial";
					break;
				case "controleDados":
					tituloDaPagina = "Controle de Importações";
					break;
				case "importarPeriodo":
				case "importarDisciplinas":
				case "importarTurmas":
				case "importarUsuarios":
				case "importarVinculos":
					tituloDaPagina = "Novo Processo";
					break;
			}
			document.title = "Sistema Bonsae - " + tituloDaPagina;
		},
		voltarTela() {
			// Botão voltar não deve adicionar a tela ao histórico para evitar loop de telas
			this.mudarTela(this._historicoTelas.pop(), false);
		},

		proximaEtapa() {
			this.mudarTela(this.telaEtapas[this.etapaAtual+1]);
		},

		nomeDaTela() {
			switch(this.tela) {
				case "controleDados":
					return "Controle de Importação";
				case "importarPeriodo":
				case "importarDisciplinas":
				case "importarTurmas":
				case "importarUsuarios":
				case "importarVinculos":
					return "Importação de Dados";
				default:
					return "Tela sem nome";
			}
		},

		descricaoDaTela() {
			switch(this.tela) {
				case "controleDados":
					return "Gerenciar arquivos enviados.";
				case "importarPeriodo":
				case "importarDisciplinas":
				case "importarTurmas":
				case "importarUsuarios":
				case "importarVinculos":
					return "Enviar arquivos ao banco de dados.";
				default:
					return "Tela sem descrição.";
			}
		},

		// Paginação
		mudarPagina(num) {
			this.paginaAtual = num;
		},
		limiteDePagina(lista) {
			let min = Math.floor(this.paginaAtual * 5);
			return lista.slice(min, min + 5);
		},

		//Modificar
		arquivoEnviado(event) {
			const file = event.target.files[0];
			if (!file) return;

			const fileExtension = file.name.split(".").pop();
			if(this.formatos.includes("." + fileExtension.toLowerCase())) {
				this.arquivoSelecionado = file;
			}
		},
		enviarBDPressionado(event){
			console.log("Botão pressionado");
			this.mensagem = "Enviando para o banco de dados...";
			this.mensagemCor = "blue"; 
			this.enviarBDSelecionado = true; 

			if (this.arquivoSelecionado) {
				console.log("Condição Verificada");
				try {
					this.enviarDadosParaBD(this.arquivoSelecionado);
					this.mensagem = "Dados enviados com sucesso!";
					this.mensagemCor = "green"; 
				} catch (error) {
					this.mensagem = "Erro ao enviar dados.";
					this.mensagemCor = "red"; 
				}
			} else {
				this.mensagem = "Nenhum dado para enviar.";
				this.mensagemCor = "orange";
			}
		},

		// Armazena arquivo selecionado e salva no cache
		uploadArquivo(event) {
			const input = event.target;
			const file = input.files[0];
			const LIMITE_ARQUIVO_MB = 10;
			const LIMITE_ARQUIVO_BYTES = LIMITE_ARQUIVO_MB * 1024 * 1024;
		
			if (!file) {
				this.mensagem = "Nenhum arquivo selecionado.";
				this.mensagemCor = "gray";
				return;
			}
		
			const fileName = file.name;
			const fileExtension = "." + fileName.split(".").pop().toLowerCase();
		
			if (!this.formatos.includes(fileExtension)) {
				this.mensagem = `Formato inválido! Permitidos: ${this.formatos.join(", ")}`;
				this.mensagemCor = "red";
				this.arquivoSelecionado = null;
				input.value = "";
				return;
			}

			if (file.size > LIMITE_ARQUIVO_BYTES) {
				const tamanhoMB = (file.size / (1024 * 1024)).toFixed(2);
				this.mensagem = `Arquivo muito grande (${tamanhoMB} MB). O limite é ${LIMITE_ARQUIVO_MB} MB.`;
				this.mensagemCor = "red";
				this.arquivoSelecionado = null;
				input.value = "";
				return;
			}
		
			this.arquivoSelecionado = file;
			this.mensagem = `Arquivo "${fileName}" selecionado com sucesso.`;
			this.mensagemCor = "green";
		
			input.value = "";

			const reader = new FileReader();
			if(fileExtension.toLowerCase() == "xlsx") {
				// Salva XLSX como Base64 para evitar corrupção de dados
				reader.onload = () => {
					const readerResult = new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), "");
					this.arquivosArmazenados.set(fileName, btoa(readerResult));
					this.mensagem = `Arquivo "${fileName}" ${acao} com sucesso!`;
					this.mensagemCor = "green";
					this.salvar();
				}
				reader.readAsArrayBuffer(file);
			} else {
				reader.onload = () => {
					this.arquivosArmazenados.set(fileName, reader.result);
					this.mensagem = `Arquivo "${fileName}" ${acao} com sucesso!`;
					this.mensagemCor = "green";
					this.salvar();
				}
				reader.readAsText(file);
			}
		},

		// Apaga arquivo selecionado depois de confirmação
		apagarArquivo(event) {
			this.arquivosArmazenados.delete(this.arquivoCarregado);
			this.arquivoCarregado = null;
			this.salvar();
		},

		// Faz parse do(s) arquivo(s) selecionado(s) e o(s) representa em forma de <li> e <ul>
		visualizarArquivo(event) {
			let data = "";
			// Suporte a JSON
			let jsonNum = 1;
			function recursivaJson(subdata) {
				if (Array.isArray(subdata)) {
					data += "<ul>";
					subdata.forEach((element) => {
						if(typeof element === "object") {
							data += `<li>#${jsonNum}:`;
							recursivaJson(element);
							data += "</li>";
							jsonNum++;
						}
						else {
							recursivaJson(element);
						}
					});
					data += "</ul>";
				} else if (typeof subdata === "object") {
					Object.entries(subdata).forEach(([key, value]) => {
						data += "<ul><li>";
						if(Array.isArray(value) || typeof value === "object")
						{
							data += `${key}:`;
							recursivaJson(value);
						}
						else data += `${key}: ${value}`;
						data += "</li></ul>";
					});
				} else {
					data += `<li>${subdata}</li>`;
				}
			}

			// Suporte a .XLSX e .CSV
			function visualizarPlanilha(linhas) {
				data += "<ul>";
				const nomeColunas = linhas[0].split(";");
				for (let i = 1 ; i < linhas.length ; i++) {
					let dados = linhas[i].split(";");
					if(dados.length <= 1 && dados[0] == "") continue;

					data += `<li>#${i}:<ul>`;
					for (let j = 0 ; j < dados.length ; j++) {
						data += `<li>${nomeColunas[j]}: ${dados[j]}</li>`;
					}
					data += "</ul></li>";
				}
				data += "</ul>";
			}

			// Carregar único arquivo ou lista
			let primeiro = true;
			function _carregar(content, name) {
				if(!primeiro) data += "<br>";
				data += `<li><strong>${name}</strong>`;
				switch(name.split('.').pop().toLowerCase()) {
					case "json": {
						recursivaJson(JSON.parse(content));
						jsonNum = 1;
						break;
					}
					case "xlsx": {
						// Converte Planilha XLSX para uma planilha simples CSV
						try {
							// Converte planilha salva em Base64 de volta para ArrayBuffer
							const binaryStr = atob(content);
							const len = binaryStr.length;
							const bytes = new Uint8Array(len);
							for (let i = 0; i < len; i++) {
								bytes[i] = binaryStr.charCodeAt(i);
							}
							const workbook = XLSX.read(bytes, { type: "array", cellText: true, cellDates: true });
							const primeiraPlanilha = workbook.SheetNames[0];

							const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[primeiraPlanilha], { header: 1 });
							const csv = jsonData.map(row => row.join(";"));
							visualizarPlanilha(csv);
						} catch (erro) {
							console.error("Erro ao converter XLSX para CSV:", erro);
						}
						break;
					}
					case "csv": {
						visualizarPlanilha(content.replace('\r\n', '\n').split('\n'));
						break;
					}
				}
				data += "</li>";
				primeiro = false;
			}

			if(this.arquivoCarregado == "*")
				this.arquivosArmazenados.forEach(_carregar);
			else
				_carregar(this.arquivosArmazenados.get(this.arquivoCarregado), this.arquivoCarregado);
			return data
		},

		// Salva arquivos armazenados no cache
		salvar() {
			// converte map para array e salva
			const arquivos = Array.from(this.arquivosArmazenados, ([name, content]) => ({ name, content }));
			localStorage.setItem("arquivosArmazenados", JSON.stringify(arquivos));
		},

		truncarNome(nome) {
			const limite = 30;
			if (nome.length <= limite) return nome;
		
			const partes = nome.split(".");
			const extensao = partes.length > 1 ? "." + partes.pop() : "";
			const base = partes.join(".");
			const truncado = base.slice(0, limite - extensao.length - 5); // "....ext"
			return `${truncado}....${extensao}`;
		},
		
	
		// Função para validar e enviar arquivo para a API
		enviarDadosParaBD(file) {			
			if (!file) {
				this.mensagem = "Operação cancelada.";
				return;
			}

			const fileName = file.name;
			const fileExtension = fileName.split(".").pop().toLowerCase();
			if (!this.formatos.includes("." + fileExtension)) {
				this.mensagem = "Este formato de arquivo não é permitido! Use apenas: " + this.formatos.join(", ");
				return;
			}

			this.arquivoSelecionado = file; // Usa diretamente a variável `file`
			this.enviarArquivo();  // Descomente se for chamar a função logo após a validação
		},

		async enviarArquivo() {
			if (!this.arquivoSelecionado) {
				this.mensagem = "Nenhum arquivo selecionado.";
				return;
			}

			const formData = new FormData();
			formData.append("file", this.arquivoSelecionado);

			try {
				const response = await axios.post("http://localhost:8080/api/files/upload", formData, {
					
					headers: {
						"Content-Type": "multipart/form-data",
					}
					
				});

				// Verificar a resposta
				console.log(response); // Para debug
				this.mensagem = `Upload realizado com sucesso! ${response.data}`; // Ajuste conforme a resposta esperada

			} catch (error) {
			console.error("Erro no upload 1 :", error);

			// Trate o erro
			this.mensagem = error.response
				? `Erro no upload 2: ${error.response.data.message || "Erro desconhecido"}`
				: "Erro na conexão com o servidor.";
			}
		},

		//Validador de Conteudo Tabela
		isInvalid(field, keym) {
			const value = typeof field === 'string' ? field.trim() : field;
		  
			// Validadores básicos por tipo
			const isOnlyLetters = v => !/^[A-Za-zÀ-ÿ\s]+$/.test(v);
			const isValidDate = v => !/^\d{4}-\d{2}-\d{2}$/.test(v) || isNaN(Date.parse(v));
			const isPositiveNumber = v => isNaN(Number(v)) || Number(v) <= 0;
		  
			// Validadores específicos
			const validators = {
			  // STRINGS puras (sem números ou símbolos)
			  nome: isOnlyLetters,
			  curso: isOnlyLetters,
			  campus: isOnlyLetters,
			  nomeTurma: isOnlyLetters,
			  professorResponsavel: isOnlyLetters,
			  nomeUsuario: isOnlyLetters,
			  turma: isOnlyLetters,
			  papel: isOnlyLetters,
			  tipo: isOnlyLetters,
			  categoria: isOnlyLetters,
			  estado: isOnlyLetters,
			  status: isOnlyLetters,
			  turno: isOnlyLetters,
		  
			  // DATES
			  dataInicio: isValidDate,
			  dataTermino: isValidDate,
			  dataNascimento: isValidDate,
			  dataCadastro: isValidDate,
			  inicioAulas: isValidDate,
			  terminoAulas: isValidDate,
			  dataInicioVinculo: isValidDate,
			  dataTerminoVinculo: isValidDate,
		  
			  // NUMBERS
			  capacidade: isPositiveNumber,
			  cargaHoraria: isPositiveNumber,
			  periodoCurricular: isPositiveNumber,
			  observacoes: isPositiveNumber,
		  
			  // CAMPOS COM REGEX ESPECÍFICOS
			  codigo: v => !/^[A-Za-z0-9]+$/.test(String(v).trim()),
			  disciplina: v => !/^[A-Za-zÀ-ÿ0-9\s]+$/.test(v),
			  email: v => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim()),
			  telefone: v => !/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(String(v).trim()),
			  semestre: v => !/^\d{4}\.\d$/.test(String(v).trim()),
			  matricula: v => {
				const str = String(v).trim();
				return !/^\d{6,12}$/.test(str); // Aceita 6 a 12 dígitos numéricos
			  },			  
			  contato: v => {
				const str = String(v).trim();
				const isTel = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(str);
				const isMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
				return !(isTel || isMail);
			  },
			};
		  
			return validators[key] ? validators[key](value) : false;
		  }		  													
	}
}