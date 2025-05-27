
import axios from 'axios';
import * as XLSX from "xlsx"; // Usado para o suporte a arquivos do Excel
import "./sheets/styles.css";  // Importação do CSS externo
import { isNumber } from 'class-validator';

export default {
	data() {
		return {
			REGEX_ALPHANUMERIC: /^[A-Za-z0-9]+$/,
			REGEX_NO_SYMBOLS: /^[\p{L}0-9 ]+$/u,
			JSONHeaders: {'Content-Type': 'application/json'},
			formatos: [".csv", ".xlsx", ".json"],
			arquivoCarregado: null,
			arquivoSelecionado: null,
			tela: "inicio",
			_historicoTelas: [], //Usado para o botão de voltar

			processos: [], // Informações de processos já carregados para o Controle de Importações
			processoAtual: null, //Processo carregado para edição
			processoVisualizando: false, //Evita edição do processo atual

			// Para a importação de dados:
			telaEtapas: ["importarPeriodo", "importarDisciplinas", "importarTurmas", "importarUsuarios", "importarVinculos"],
			nomeEtapas: ["Período Letivo", "Disciplinas", "Turmas", "Usuários", "Vínculos"],
			etapaAtual: 0,
			
			paginaAtual: 0, //Para a paginação

			// Etapa 1 - Ano Letivo
			anoLetivoInicio: new Date().getFullYear(),
			periodoInicio: 1,

			anoLetivoTermino: new Date().getFullYear(),
			periodoTermino: 2,

			// Etapa 2 - Disciplinas
			arquivoDisciplinas: null,
			listaDisciplinas: [],
			errosDisciplinas: [],

			// Etapa 3 - Turmas
			arquivoTurmas: null,
			listaTurmas: [],
			errosTurmas: [],

			// Etapa 4 - Usuarios
			arquivoUsuarios: null,
			listaUsuarios: [],
			errosUsuarios: [],

			// Etapa 5 - Vínculos
			arquivoVinculos: null,
			listaVinculos: [],
			errosVinculos: []
		}
	},
	mounted() {
		this.atualizarProcessos();
	},
	watch: {
		tela() {
			this.atualizarPaginacao();
		}
	},
	computed: {
		listaAtual() {
			switch(this.tela) {
				case "importarDisciplinas":
					return this.listaDisciplinas;
				case "importarTurmas":
					return this.listaTurmas;
				case "importarUsuarios":
					return this.listaUsuarios;
				case "importarVinculos":
					return this.listaVinculos;
			};
			return null;
		}
	},
	methods: {
		// Processos
		async abrirProcesso(id) {
			const JSONHeaders = this.JSONHeaders;
			const url = `http://localhost:8080/Process/Get/${id}`;
			await axios.get(url, JSONHeaders)
			.then(async response => {
				const processo = response.data;
				if(processo) {
					this.processoAtual = response.data;
					const periodoInicio = this.processoAtual.periodoInicio?.trim() ?? "";
					const periodoTermino = this.processoAtual.periodoTermino?.trim() ?? "";

					// Início de Período detectado, carregando dado vindo do banco
					if(periodoInicio) {
						const split = periodoInicio.split("/");
						if(split?.length == 2) {
							this.anoLetivoInicio = parseInt(split[0])
							this.periodoInicio = parseInt(split[1])
						}
					}
					// Término de Período detectado, carregando dado vindo do banco
					if(periodoTermino) {
						const split = periodoTermino.split("/");
						if(split?.length == 2) {
							this.anoLetivoTermino = parseInt(split[0])
							this.periodoTermino = parseInt(split[1])
						}
					}

					let etapa = 0;
					if(periodoInicio && periodoTermino) {
						etapa++;
					}
					
					this.arquivoDisciplinas = null;
					this.listaDisciplinas = [];
					this.errosDisciplinas = [];

					this.arquivoTurmas = null;
					this.listaTurmas = [];
					this.errosTurmas = [];

					this.arquivoUsuarios = null;
					this.listaUsuarios = [];
					this.errosUsuarios = [];

					this.arquivoVinculos = null;
					this.listaVinculos = [];
					this.errosVinculos = [];

					this.processoVisualizando = (this.processoAtual.inicio <= this.processoAtual.termino);
					if(this.processoVisualizando) {
						const id = this.processoAtual._id;
						async function pegarLista(schemaKey) {
							try {
								const response = await axios.get(`http://localhost:8080/${schemaKey}/GetByProcess/${id}`, JSONHeaders);
								console.log(`Dados recebidos (schemaKey: ${schemaKey}): `, response.data?.length ?? 0);
								return response.data ?? [];
							} catch (error) {
								console.error(`Erro ao receber dados (schemaKey: ${schemaKey}):`, error?.message ?? error);
								return [];
							}
						}

						this.listaDisciplinas = await pegarLista("Discipline");
						this.listaTurmas = await pegarLista("Class");
						this.listaUsuarios = await pegarLista("User");
						this.listaVinculos = await pegarLista("Bond");
						etapa = this.telaEtapas.length-1;
					}
					for (let i = 0 ; i <= etapa ; i++) {
						this.mudarTela(this.telaEtapas[i]);
					}
				}
				else console.error(`Erro ao abrir processo (ID: ${id}): Dado vazio.`);
			})
			.catch(error => {
				this.processos = [];
				console.error(`Erro ao abrir processo (ID: ${id}): `, error?.message ?? error);
			});
		},
		async iniciarProcesso() {
			const response = await axios.post("http://localhost:8080/Process/Post", {
				periodoInicio: "",
				periodoTermino: "",
				inicio: new Date(),
				termino: new Date(0)
			}, this.JSONHeaders)
			.then(response => {
				const processo = response.data;
				processo.status = (processo.inicio >= processo.termino) ? "Em andamento" : "Concluído";

				this.processoVisualizando = false;
				this.arquivoDisciplinas = false;
				this.processoAtual = processo;
				this.processos.push(processo);
				this.mudarTela("importarPeriodo");
			})
			.catch(error => {
				console.error(`Erro ao iniciar processo: `, error?.message ?? error);
			});
		},
		async cancelarProcesso(id) {
			let semErros = true;
			const JSONHeaders = this.JSONHeaders;
			async function deletarRelacionados(schemaKey) {
				if(!semErros) return;

				await axios.delete(`http://localhost:8080/${schemaKey}/DeleteByProcess/${id}`, JSONHeaders)
				.then(response => {
					console.log(`Foram deletados ${response.data.deletedCount} dados (schemaKey: ${schemaKey})`);
				})
				.catch(error => {
					console.error(`Erro ao apagar dados do processo (ID: ${id}, schemaKey: ${schemaKey}): ` + error?.message ?? error);
					semErros = false;
				});
			}

			await deletarRelacionados("Discipline");
			await deletarRelacionados("Class");
			await deletarRelacionados("User");
			await deletarRelacionados("Bond");

			if(semErros) {
				await axios.delete(`http://localhost:8080/Process/Delete/${id}`, this.JSONHeaders)
				.then(response => {
					this.processos = [];
					this.atualizarProcessos();
				})
				.catch(error => {
					this.processos = [];
					console.error(`Erro ao apagar processo (ID: ${id}): `, error?.message ?? error);
				});
			}
		},

		// Telas
		mudarTela(tela, historico = true) {
			if(historico) {
				this._historicoTelas.push(this.tela);
			}
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
					this.atualizarProcessos();
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
			if(this.etapaAtual == this.telaEtapas.indexOf("importarPeriodo")) {
				this.processoAtual.periodoInicio = `${this.anoLetivoInicio}/${this.periodoInicio}`;
				this.processoAtual.periodoTermino = `${this.anoLetivoTermino}/${this.periodoTermino}`;
				axios.put(`http://localhost:8080/Process/Put/${this.processoAtual._id}`, {
					periodoInicio: this.processoAtual.periodoInicio,
					periodoTermino: this.processoAtual.periodoTermino,
					inicio: this.processoAtual.inicio,
					termino: this.processoAtual.termino
				}, this.JSONHeaders);
			}
			this.mudarTela(this.telaEtapas[this.etapaAtual+1]);
		},
		async finalizarProcesso() {
			if(await this.enviarBDPressionado()) {
				this.mudarTela("controleDados");
			}
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
			let min = Math.floor(this.paginaAtual * 10);
			return lista.slice(min, min + 10);
		},

		//Modificar
		async enviarBDPressionado() {
			console.log("Enviando para o banco de dados...");
			if (this.arquivoSelecionado) {
				let semErros = true;
				const JSONHeaders = this.JSONHeaders;
				async function enviarBulk(data, schemaKey) {
					if(!semErros) return;

					await axios.post(`http://localhost:8080/${schemaKey}/PostBulk`, data, JSONHeaders)
					.then(response => {
						console.log(`Enviado com sucesso (schemaKey: ${schemaKey})`);
					})
					.catch(error => {
						console.error(`Erro no PostBulk (schemaKey: ${schemaKey}): `, error?.message ?? error);
						semErros = false;
					});
				}

				await enviarBulk(this.listaDisciplinas, "Discipline");
				await enviarBulk(this.listaTurmas, "Class");
				await enviarBulk(this.listaUsuarios, "User");
				await enviarBulk(this.listaVinculos, "Bond");
				console.log(`Upload de dados realizado com sucesso, criando processo!`);

				if(semErros) {
					const processo = await axios.put(`http://localhost:8080/Process/Put/${this.processoAtual._id}`, {
						periodoInicio: this.processoAtual.periodoInicio,
						periodoTermino: this.processoAtual.periodoTermino,
						inicio: this.processoAtual.inicio,
						termino: new Date()
					})
					.then(response => {
						console.log("Processo enviado! Voltando a tela de Controle de Importações...");
						this.processos = [];
						this.mudarTela("controleDados");

						this.processoAtual = null;

						this.arquivoDisciplinas = null;
						this.listaDisciplinas = [];
						this.errosDisciplinas = [];

						this.arquivoTurmas = null;
						this.listaTurmas = [];
						this.errosTurmas = [];

						this.arquivoUsuarios = null;
						this.listaUsuarios = [];
						this.errosUsuarios = [];

						this.arquivoVinculos = null;
						this.listaVinculos = [];
						this.errosVinculos = [];
					})
					.catch(error => {
						console.error(`Erro ao atualizar processo (ID: ${this.processoAtual._id}): `, error?.message ?? error);
					});
					return true;
				}
				else {
					async function deletarRelacionados(schemaKey) {
						await axios.delete(`http://localhost:8080/${schemaKey}/DeleteByProcess/${this.processoAtual._id}`, JSONHeaders)
						.then(response => {
							console.log(`Foram deletados ${response.data.deletedCount} dados (schemaKey: ${schemaKey})`);
						})
						.catch(error => {
							console.error(`Erro ao apagar dados do processo (ID: ${this.processoAtual._id}, schemaKey: ${schemaKey}): ` + error?.message ?? error);
						});
					}

					await deletarRelacionados("Discipline");
					await deletarRelacionados("Class");
					await deletarRelacionados("User");
					await deletarRelacionados("Bond");
					return true;
				}
			} else {
				console.log("Nenhum dado para enviar.");
			}
			return false;
		},

		// Armazena arquivo selecionado e salva no cache
		async uploadArquivo(event) {
			const input = event.target;
			const file = input.files[0];
		
			if (!file) {
				console.log("Nenhum arquivo selecionado.");
				return;
			}
		
			const fileName = file.name;
			const fileExtension = fileName.split(".").pop().toLowerCase();
		
			if (!this.formatos.includes("." + fileExtension)) {
				console.log(`Formato inválido! Permitidos: ${this.formatos.join(", ")}`);
				return;
			}

			//Converte .XLSX/.CSV para JSON
			function formatacao(str) {
				return str ? str.normalize("NFD").replace(/[\u0300-\u036f-_\s]/g, "").trim().toLowerCase() : null;
			}
			
			function converter(renomear, planilha) {
				renomear = new Map(Object.entries(renomear).map(([chave, valor]) => [formatacao(chave), valor]));

				return planilha.map(obj => Object.fromEntries(Object.entries(obj).map(function([chave, valor]) {
					//console.log(chave, valor);
					if(chave == "processId") return [chave, valor];
					chave = formatacao(chave);
					return [renomear.get(chave) || chave, valor];
				})));
			}

			switch(fileExtension) {
				case "xlsx":
					const arrayBuffer = await file.arrayBuffer();
					const workbook = XLSX.read(arrayBuffer, { type: "array", cellText: true, cellDates: true });
					for (const planilhaNome of workbook.SheetNames) {
						const id = this.processoAtual._id;
						const planilha = XLSX.utils.sheet_to_json(workbook.Sheets[planilhaNome]).map(item => ({ ...item, processId: id }));
						switch(formatacao(planilhaNome).toLowerCase()) {
							case "disciplinas":
							case "disciplina":
								this.arquivoDisciplinas = file;
								this.listaDisciplinas = converter({"Periodo Letivo": "periodo", "Data de Inicio": "inicio", "Data de Termino": "termino", "Periodo Curricular": "periodoCurricular"}, planilha);
								this.validarDisciplinas();
								break;
							case "turmas":
							case "turma":
								this.arquivoTurmas = file;
								this.listaTurmas = converter({"Nome da Turma": "turma", "Disciplina Associada": "disciplina", "Inicio das Aulas": "inicio", "Termino das Aulas": "termino", "Professor Responsavel": "professor"}, planilha);
								this.validarTurmas();
								break;
							case "usuarios":
							case "usuario":
								this.arquivoUsuarios = file;
								this.listaUsuarios = converter({"Nome Completo": "nome", "Data de Nascimento": "nascimento", "Data de Cadastro": "cadastro", "Periodo Curricular": "periodoCurricular"}, planilha);
								this.validarUsuarios();
								break;
							case "vinculos":
							case "vinculo":
								this.arquivoVinculos = file;
								this.listaVinculos = converter({"Nome de Usuario": "nome", "Data de Inicio": "inicio", "Data de Termino": "termino", "Observacoes": "obs"}, planilha);
								this.validarVinculos();
								break;
							default:
								console.error(`Planilha desconhecida no arquivo: "${planilhaNome}"`);
						}
					}
					break;
				case "csv":
					break;
			}
			this.paginaAtual = 0;
			this.atualizarPaginacao();
		},

		async atualizarProcessos() {
			const url = `http://localhost:8080/Process/Get`;
			axios.get(url, this.JSONHeaders)
			.then(response => {
				console.log("Processos recebidos:", response.data?.length ?? 0);
				if (response.data && response.data.length > 0) {
					this.processos = response.data;
					for (let processo of this.processos) {
						processo.status = (processo.inicio >= processo.termino) ? "Em andamento" : "Concluído";
					}
				}
				else this.processos = [];
			})
			.catch(error => {
				this.processos = [];
				console.error("Erro ao atualizar processos:", error?.message ?? error);
			});
		},

		atualizarPaginacao() {
			switch(this.tela) {
				case "importarDisciplinas":
					this.arquivoSelecionado = this.arquivoDisciplinas;
					break;
				case "importarTurmas":
					this.arquivoSelecionado = this.arquivoTurmas;
					break;
				case "importarUsuarios":
					this.arquivoSelecionado = this.arquivoUsuarios;
					break;
				case "importarVinculos":
					this.arquivoSelecionado = this.arquivoVinculos;
					break;
				default:
					this.arquivoSelecionado = null;
			}
		},

		formatarData(data) {
			const d = new Date(data);
			if(isNaN(d)) return `--/--/--`;

			const dia = String(d.getDate()).padStart(2, '0');
			const mes = String(d.getMonth() + 1).padStart(2, '0'); // Janeiro = 0
			const ano = d.getFullYear();
			return `${dia}/${mes}/${ano}`;
		},
		formatarDataHora(dataHora) {
			const d = new Date(dataHora);
			const dia = String(d.getDate()).padStart(2, '0');
			const mes = String(d.getMonth() + 1).padStart(2, '0'); // Janeiro = 0
			const ano = d.getFullYear();

			const horas = String(d.getHours()).padStart(2, '0');
			const minutos = String(d.getMinutes()).padStart(2, '0');

			return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
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

		/* Validação de erros */
		validarDisciplinas() {
			let algumErro = false;
			this.errosDisciplinas = [];
			for (let linha of this.listaDisciplinas) {
				let erros = {
					periodo: this.validaString("Período", linha.periodo),
					disciplina: this.validaString("Disciplina", linha.disciplina, this.REGEX_NO_SYMBOLS),
					codigo: this.validaString("Código", linha.codigo, this.REGEX_ALPHANUMERIC),
					inicio: this.validaDate("Data de Início", linha.inicio),
					termino: this.validaDate("Data de Término", linha.termino),
					categoria: this.validaString("Categoria", linha.categoria, this.REGEX_NO_SYMBOLS),
					periodoCurricular: this.validaNumero("Período Curricular", linha.periodoCurricular, 0),
					estado: this.validaString("Estado", linha.estado, this.REGEX_ALPHANUMERIC),
					campus: this.validaString("Campus", linha.campus, this.REGEX_NO_SYMBOLS),
				}

				let temErros = false;
				for (const [k, v] of Object.entries(erros)) {
					if(v) {
						algumErro = true;
						temErros = true;
						break;
					}
				}

				//console.log(erros);
				if(temErros) {
					this.errosDisciplinas.push(erros);
				}
				else this.errosDisciplinas.push(null);
			}

			if(algumErro) {
				if(this.etapaAtual > this.telaEtapas.indexOf("importarDisciplinas")) {
					this.mudarTela("importarDisciplinas");
				}
			}
			else this.errosDisciplinas = [];
		},

		validarTurmas() {
			this.errosTurmas = [];
		},

		validarUsuarios() {
			this.errosUsuarios = [];
		},

		validarVinculos() {
			this.errosVinculos = [];
		},

		// null = sem erros
		validaString(campo, str = "", regex = null) {
			str = (str ?? "").toString().trim();
			if(!str || str.length == 0) {
				return `${campo} está vazio.`
			}

			if(regex && !str.match(regex)) {
				if(regex === this.REGEX_ALPHANUMERIC)
					return `${campo} deve conter apenas apenas caracteres alfanuméricos.`;
				else if(regex === this.REGEX_NO_SYMBOLS) {
					return `${campo} deve conter apenas letras, números e espaços.`;
				}
				else
					return `${campo} não está de acordo.`;
			}
			return null;
		},
		validaDate(campo, date) {
			if(isNaN(date) || !date instanceof Date) {
				return `${campo} não é uma data válida.`;
			}
			return null;
		},
		validaNumero(campo, n, min = null, max = null) {
			if(isNaN(n)) {
				return `${campo} está vazio.`;
			}
			if(!Number.isInteger(n)) {
				return `${campo} não aceita valores decimais.`;
			}
			if(min && n < min) {
				return `${campo} tem como valor mínimo: ${min}`;
			}
			if(max && n > max) {
				return `${campo} tem como valor máximo: ${max}`;
			}
			return null;
		},

		listaAtualTemErros() {
			switch(this.telaEtapas[this.etapaAtual]) {
				case "importarDisciplinas":
					return this.errosDisciplinas.length > 0;
				case "importarTurmas":
					return this.errosTurmas.length > 0;
				case "importarUsuarios":
					return this.errosUsuarios.length > 0;
				case "importarVinculos":
					return this.errosVinculos.length > 0;
			}
			return false;
		}
	}
}