import axios from 'axios'
import { routerSetup } from './routing.js'
import { dateFunctionsSetup } from './date.js'
import { createProcessSetup } from './createProcess.js'
import "../sheets/styles.css";  // Importação do CSS externo

export default {
	data() {
		return {
			erro: null,
			carregado: false,
			processos: [],
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
				this.erro = (error?.message ?? error);
				console.error("Erro ao atualizar processos: " + this.erro);
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
					console.error(`Erro ao apagar dados do processo (ID: ${id}, schemaKey: ${schemaKey}): ` + error?.message ?? error);
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
				})
				.catch(error => {
					this.processos = [];
					console.error(`Erro ao apagar processo (ID: ${id}): `, error?.message ?? error);
				});
			}
		},

		voltarTela() {
			this.rota('/');
		},
	},
	created() {
		const { rota } = routerSetup();
		this.rota = rota;

		const { formatarData, formatarDataHora } = dateFunctionsSetup();
		this.formatarData = formatarData;
		this.formatarDataHora = formatarDataHora;

		const { iniciarProcesso } = createProcessSetup();
		this.iniciarProcesso = async() => {
			iniciarProcesso((response) => {
				const processo = response.data;
				this.abrirProcesso(processo._id);
			}, (error) => {
				console.error(`Erro ao iniciar processo:`, error?.message ?? error);
			});
		}
	}
}