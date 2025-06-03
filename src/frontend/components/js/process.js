import axios from 'axios'
import { routerSetup } from './routing.js'
import { dateFunctionsSetup } from './date.js'
import { errorHandlerSetup } from './errorHandler.js'
import { useRoute } from 'vue-router'
import * as XLSX from "xlsx"; // Usado para o suporte a arquivos do Excel
import "../sheets/styles.css";  // Importação do CSS externo

export default {
	data() {
		return {
			erro: null,
			carregado: false,

			REGEX_ALPHANUMERIC: /^[A-Za-z0-9]+$/,
			REGEX_NO_SYMBOLS: /^[\p{L}0-9 ]+$/u,
			formatos: [".csv", ".xlsx", ".json"],
			arquivoSelecionado: null,

			processoAtual: null, //Processo carregado para edição
			processoVisualizando: false, //Evita edição do processo atual

			nomeEtapas: ["Período Letivo", "Disciplinas", "Turmas", "Usuários", "Vínculos"],
			etapaAtual: 0,
			paginaAtual: 0, //Para a paginação

			/* popup */
			popupMensagem: "Popup Teste",
			popupClasse: "",
			popupClicavel: false,
			popupAnim: "",
			popupBarraAnim: "",
			popupTimeout: null,

			// Etapa 1 - Ano Letivo
			periodoInicio: null,
			periodoTermino: null,

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
	computed: {
		listaAtual() {
			switch(this.etapaAtual) {
				case 1:
					return this.listaDisciplinas;
				case 2:
					return this.listaTurmas;
				case 3:
					return this.listaUsuarios;
				case 4:
					return this.listaVinculos;
			};
			return null;
		}
	},
	mounted() {
		const route = useRoute()
		const id = route.params.id;

		this.erro = null;
		this.carregado = false;
		const url = `http://localhost:8080/Process/${id}`;
		axios.get(url, {'Content-Type': 'application/json'})
		.then(async response => {
			const processo = response.data;
			if(processo) {
				this.processoAtual = processo;

				// Etapa 1
				this.periodoInicio = this.processoAtual.periodoInicio ? this.dateYMD(this.processoAtual.periodoInicio) : null;
				this.periodoTermino = this.processoAtual.periodoInicio ? this.dateYMD(this.processoAtual.periodoTermino) : null;

				let etapa = 0;
				if(this.periodoInicio && this.periodoTermino) {
					etapa++;
				}

				this.processoVisualizando = !!(this.processoAtual.envioTermino);
				if(this.processoVisualizando) {
					async function pegarLista(schemaKey) {
						try {
							const response = await axios.get(`http://localhost:8080/${schemaKey}/GetByProcess/${id}`, {'Content-Type': 'application/json'});
							console.log(`Dados recebidos (schemaKey: ${schemaKey}): `, response.data?.length ?? 0);
							return response.data ?? [];
						} catch (error) {
							let erro = this.errorHandler(error?.message ?? error);
							console.error(`Erro ao receber dados (schemaKey: ${schemaKey}): ` + erro);
							this.popup("Erro: " + erro, "erro");
							return [];
						}
					}

					this.listaDisciplinas = await pegarLista("Discipline");
					this.listaTurmas = await pegarLista("Class");
					this.listaUsuarios = await pegarLista("User");
					this.listaVinculos = await pegarLista("Bond");
					etapa = this.nomeEtapas.length-1;
				}
				this.etapaAtual = etapa;
			}
			else {
				console.error(`Erro ao carregar processo (ID: ${id}): Dado vazio.`);
				this.popup("Erro: Resposta vazia");
			}
			this.carregado = true;
		})
		.catch(error => {
			this.erro = this.errorHandler(error?.message ?? error);
			this.carregado = true;
			console.error(`Erro ao carregar processo (ID: ${id}): ` + this.erro);
			this.popup("Erro: " + this.erro, "erro");
		});
	},
	watch: {
		etapaAtual() {
			this.atualizarPaginacao();
		}
	},
	methods: {
		proximaEtapa() {
			if(this.etapaAtual == 0) {
				this.processoAtual.periodoInicio = this.periodoInicio;
				this.processoAtual.periodoTermino = this.periodoTermino;
				axios.put(`http://localhost:8080/Process/${this.processoAtual._id}`, {
					periodoInicio: this.processoAtual.periodoInicio,
					periodoTermino: this.processoAtual.periodoTermino,
					envioInicio: this.processoAtual.envioInicio,
					envioTermino: this.processoAtual.envioTermino
				}, {'Content-Type': 'application/json'});
			}
			this.etapaAtual++;
		},
		voltarTela() {
			if(this.etapaAtual > 0) {
				this.etapaAtual--;
			}
			else this.rota('/list');
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
				this.popup("Formato de planilha enviada é inválida!", "erro");
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

			let maiorEtapa = 1;
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
								maiorEtapa = Math.max(2, maiorEtapa);
								break;
							case "usuarios":
							case "usuario":
								this.arquivoUsuarios = file;
								this.listaUsuarios = converter({"Nome Completo": "nome", "Data de Nascimento": "nascimento", "Data de Cadastro": "cadastro", "Periodo Curricular": "periodoCurricular"}, planilha);
								this.validarUsuarios();
								maiorEtapa = Math.max(3, maiorEtapa);
								break;
							case "vinculos":
							case "vinculo":
								this.arquivoVinculos = file;
								this.listaVinculos = converter({"Nome de Usuario": "nome", "Data de Inicio": "inicio", "Data de Termino": "termino", "Observacoes": "obs"}, planilha);
								this.validarVinculos();
								maiorEtapa = Math.max(4, maiorEtapa);
								break;
							default:
								console.log(`Planilha desconhecida no arquivo: "${planilhaNome}"`);
								this.popup(`Planilha desconhecida no arquivo: "${planilhaNome}"`);
						}
					}
					break;
				case "csv":
					break;
			}

			if(this.etapaAtual > maiorEtapa) {
				this.etapaAtual = maiorEtapa;
			}
			this.atualizarPaginacao();
		},
		

		// Envio do Processo
		async enviarProcesso() {
			this.popup("Enviando processo, aguarde...");
			if (this.arquivoSelecionado) {
				let semErros = true;
				async function enviarBulk(data, schemaKey) {
					if(!semErros) return;

					await axios.post(`http://localhost:8080/${schemaKey}/PostBulk`, data, {'Content-Type': 'application/json'})
					.then(response => {
						console.log(`Enviado com sucesso (schemaKey: ${schemaKey})`);
					})
					.catch(error => {
						let erro = this.errorHandler(error?.message ?? error);
						console.error(`Erro no PostBulk (schemaKey: ${schemaKey}): ${erro}`);
						this.popup("Erro: " + erro, "erro");
						semErros = false;
					});
				}

				await enviarBulk(this.listaDisciplinas, "Discipline");
				await enviarBulk(this.listaTurmas, "Class");
				await enviarBulk(this.listaUsuarios, "User");
				await enviarBulk(this.listaVinculos, "Bond");
				console.log(`Upload de dados realizado com sucesso, atualizando processo!`);
				this.popup("Dados do processo enviados!");

				if(semErros) {
					const processo = await axios.put(`http://localhost:8080/Process/${this.processoAtual._id}`, {
						periodoInicio: this.processoAtual.periodoInicio,
						periodoTermino: this.processoAtual.periodoTermino,
						envioInicio: this.processoAtual.envioInicio,
						envioTermino: new Date()
					})
					.then(response => {
						console.log("Processo enviado! Voltando a tela de Controle de Importações...");
						this.rota("/list");
					})
					.catch(error => {
						let erro = this.errorHandler(error?.message ?? error);
						console.error(`Erro ao atualizar processo (ID: ${this.processoAtual._id}): ${erro}`);
						this.popup("Erro: " + erro, "erro");
					});
					return true;
				}
				else {
					async function deletarRelacionados(schemaKey) {
						await axios.delete(`http://localhost:8080/${schemaKey}/DeleteByProcess/${this.processoAtual._id}`, {'Content-Type': 'application/json'})
						.then(response => {
							console.log(`Foram deletados ${response.data.deletedCount} dados (schemaKey: ${schemaKey})`);
						})
						.catch(error => {
							let erro = this.errorHandler(error?.message ?? error);
							console.error(`Erro ao apagar dados do processo (ID: ${this.processoAtual._id}, schemaKey: ${schemaKey}): ${erro}`);
							this.popup("Erro: " + erro, "erro");
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

		truncarNome(nome) {
			const limite = 30;
			if (nome.length <= limite) return nome;
		
			const partes = nome.split(".");
			const extensao = partes.length > 1 ? "." + partes.pop() : "";
			const base = partes.join(".");
			const truncado = base.slice(0, limite - extensao.length - 5); // "....ext"
			return `${truncado}....${extensao}`;
		},
		
		// Paginação
		atualizarPaginacao() {
			switch(this.etapaAtual) {
				case 1:
					this.arquivoSelecionado = this.arquivoDisciplinas;
					break;
				case 2:
					this.arquivoSelecionado = this.arquivoTurmas;
					break;
				case 3:
					this.arquivoSelecionado = this.arquivoUsuarios;
					break;
				case 4:
					this.arquivoSelecionado = this.arquivoVinculos;
					break;
				default:
					this.arquivoSelecionado = null;
			}
		},
		mudarPagina(num) {
			this.paginaAtual = num;
		},
		limiteDePagina(lista) {
			let min = Math.floor(this.paginaAtual * 10);
			return lista.slice(min, min + 10);
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
				if(this.etapaAtual > 1) {
					this.etapaAtual = 1;
				}
			}
			else this.errosDisciplinas = [];
		},

		validarTurmas() {
			let algumErro = false;
			this.errosTurmas = [];
			for (let linha of this.listaTurmas) {
				let erros = {
					turma: this.validaString("Turma", linha.turma, this.REGEX_NO_SYMBOLS),
					disciplina: this.validaString("Disciplina", linha.disciplina, this.REGEX_NO_SYMBOLS),
					codigo: this.validaString("Código", linha.codigo, this.REGEX_ALPHANUMERIC),
					turno: this.validaString("Turno", linha.turno, this.REGEX_NO_SYMBOLS),
					capacidade: this.validaNumero("Capacidade", linha.capacidade, 1),
					inicio: this.validaDate("Data de Início", linha.inicio),
					termino: this.validaDate("Data de Término", linha.termino),
					professor: this.validaString("Professor", linha.professor, this.REGEX_NO_SYMBOLS),
				};

				let temErros = false;
				for (const [k, v] of Object.entries(erros)) {
					if(v) {
						algumErro = true;
						temErros = true;
						break;
					}
				}

				if (temErros) {
					this.errosTurmas.push(erros);
				} else {
					this.errosTurmas.push(null);
				}
			}

			if(algumErro) {
				if(this.etapaAtual > 2) {
					this.etapaAtual = 2;
				}
			}
			else this.errosTurmas = [];
		},

		validarUsuarios() {
			let algumErro = false;
			this.errosUsuarios = [];
			for (let linha of this.listaUsuarios) {
				let erros = {
					nome: this.validaString("Nome", linha.nome, this.REGEX_NO_SYMBOLS),
					matricula: this.validaString("Matrícula", linha.matricula, this.REGEX_ALPHANUMERIC),
					email: this.validaString("Email", linha.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/),
					tipo: this.validaString("Tipo", linha.tipo, this.REGEX_NO_SYMBOLS),
					curso: this.validaString("Curso", linha.curso, this.REGEX_NO_SYMBOLS),
					contato: this.validaString("Contato", linha.contato, /^[0-9 ()-]+$/),
					nascimento: this.validaDate("Data de Nascimento", linha.nascimento),
					cadastro: this.validaDate("Data de Cadastro", linha.cadastro),
				};

				let temErros = false;
				for (const [k, v] of Object.entries(erros)) {
					if(v) {
						algumErro = true;
						temErros = true;
						break;
					}
				}

				if (temErros) {
					this.errosUsuarios.push(erros);
				} else {
					this.errosUsuarios.push(null);
				}
			}

			if(algumErro) {
				if(this.etapaAtual > 3) {
					this.etapaAtual = 3;
				}
			}
			else this.errosUsuarios = [];
		},

		validarVinculos() {
			let algumErro = false;
			this.errosVinculos = [];
			for (let linha of this.listaVinculos) {
				let erros = {
					nome: this.validaString("Nome", linha.nome, this.REGEX_NO_SYMBOLS),
					matricula: this.validaString("Matrícula", linha.matricula, this.REGEX_ALPHANUMERIC),
					turma: this.validaString("Turma", linha.turma, this.REGEX_NO_SYMBOLS),
					disciplina: this.validaString("Disciplina", linha.disciplina, this.REGEX_NO_SYMBOLS),
					papel: this.validaString("Papel", linha.papel, this.REGEX_NO_SYMBOLS),
					inicio: this.validaDate("Data de Início", linha.inicio),
					termino: this.validaDate("Data de Término", linha.termino),
					obs: linha.obs ? this.validaString("Observações", linha.obs) : null,
				};

				let temErros = false;
				for (const [k, v] of Object.entries(erros)) {
					if(v) {
						algumErro = true;
						temErros = true;
						break;
					}
				}

				if (temErros) {
					this.errosVinculos.push(erros);
				} else {
					this.errosVinculos.push(null);
				}
			}

			if(algumErro) {
				if(this.etapaAtual > 4) {
					this.etapaAtual = 4;
				}
			}
			else this.errosVinculos = [];
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
			switch(this.etapaAtual) {
				case 1:
					return this.errosDisciplinas.length > 0;
				case 2:
					return this.errosTurmas.length > 0;
				case 3:
					return this.errosUsuarios.length > 0;
				case 4:
					return this.errosVinculos.length > 0;
			}
			return false;
		},
		
		/* Popup */
		popupClick() {
			if(!this.popupClicavel) return;

			this.popupAnim = "popup-animation-end";
			clearTimeout(this.popupTimeout);
			this.popupClicavel = false;
		},
		popup(mensagem, tipo = "") {
			this.popupMensagem = mensagem;
			this.popupClasse = tipo;
			this.popupBarraAnim = "";
			this.popupClicavel = true;
			this.popupAnim = "";
			setTimeout(() => {this.popupAnim = "popup-animation-start"}, 5);

			if(this.popupTimeout) clearTimeout(this.popupTimeout);
			this.popupTimeout = setTimeout(this.popupClick, 10000);
			setTimeout(() => {this.popupBarraAnim = "popup-barra-anim"}, 5);
		}
	},
	created() {
		const { rota } = routerSetup();
		this.rota = rota;

		const { formatarData, formatarDataHora, dateYMD} = dateFunctionsSetup();
		this.formatarData = formatarData;
		this.formatarDataHora = formatarDataHora;
		this.dateYMD = dateYMD;

		const { errorHandler } = errorHandlerSetup();
		this.errorHandler = errorHandler;
	}
}