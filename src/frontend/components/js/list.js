import axios from 'axios'
import { routerSetup } from './routing.js'
import { dateFunctionsSetup } from './date.js'
import { createProcessSetup } from './createProcess.js'
import { errorHandlerSetup } from './errorHandler.js'
import "../sheets/styles.css";  // Importação do CSS externo

export default {
	data() {
		return {
			erro: null,
			carregado: false,
			processos: [],

			/* popup */
			popupMensagem: "Popup Teste",
			popupClasse: "",
			popupClicavel: false,
			popupAnim: "",
			popupBarraAnim: "",
			popupTimeout: null
		}
	},
	mounted() {
		this.atualizarProcessos();
	},
	methods: {
		async atualizarProcessos() {
			this.erro = null;
			this.carregado = false;

			const url = `http://localhost:8080/Process`;
			await axios.get(url)
			.then(response => {
				console.log("Processos recebidos:", response.data?.length ?? 0);
				if (response.data && response.data.length > 0) {
					this.processos = response.data;
					for (let processo of this.processos) {
						processo.status = processo.envioTermino ? "Concluído" : "Em andamento";
					}
				} else {
					this.processos = [];
				}
				this.carregado = true;
			})
			.catch(error => {
				this.processos = [];
				this.carregado = true;
				this.erro = this.errorHandler(error?.message ?? error);
				console.error("Erro ao atualizar processos: " + this.erro);
				this.popup("Erro: " + this.erro, "erro");
			})
		},

		abrirProcesso(id) {
			this.rota(`/process/${id}`);
		},

		async cancelarProcesso(id) {
			let semErros = true;
			async function deletarRelacionados(schemaKey) {
				if(!semErros) return;

				await axios.delete(`http://localhost:8080/${schemaKey}/DeleteByProcess/${id}`, {'Content-Type': 'application/json'})
				.then(response => {
					console.log(`Foram deletados ${response.data.deletedCount} dados (schemaKey: ${schemaKey})`);
				})
				.catch(error => {
					let erro = this.errorHandler(error?.message ?? error);
					console.error(`Erro ao apagar dados do processo (ID: ${id}, schemaKey: ${schemaKey}): ` + erro);
					this.popup("Erro: " + erro, "erro");
					semErros = false;
				});
			}

			await deletarRelacionados("Discipline");
			await deletarRelacionados("Class");
			await deletarRelacionados("User");
			await deletarRelacionados("Bond");

			if(semErros) {
				await axios.delete(`http://localhost:8080/Process/${id}`, {'Content-Type': 'application/json'})
				.then(response => {
					this.processos = [];
					this.atualizarProcessos();
					this.popup("Processo apagado com sucesso!");
				})
				.catch(error => {
					this.processos = [];

					let erro = this.errorHandler(error?.message ?? error);
					console.error(`Erro ao apagar processo (ID: ${id}): ` + erro);
					this.popup("Erro: " + erro, "erro");
				});
			}
		},

		voltarTela() {
			this.rota('/');
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

		const { formatarData, formatarDataHora } = dateFunctionsSetup();
		this.formatarData = formatarData;
		this.formatarDataHora = formatarDataHora;

		const { errorHandler } = errorHandlerSetup();
		this.errorHandler = errorHandler;

		const { iniciarProcesso } = createProcessSetup();
		this.iniciarProcesso = () => {
			this.popup("Criando processo, aguarde...");
			iniciarProcesso((response) => {
				const processo = response.data;
				this.abrirProcesso(processo._id);
			}, (error) => {
				let erro = this.errorHandler(error?.message ?? error);
				console.error(`Erro ao iniciar processo: ` + erro);
				this.popup("Erro: " + erro, "erro");
			});
		}
	}
}