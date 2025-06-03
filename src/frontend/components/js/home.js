import { routerSetup } from '../js/routing.js' // adjust path if needed
import { createProcessSetup } from '../js/createProcess.js'
import { errorHandlerSetup } from './errorHandler.js'
import "../sheets/styles.css";  // Importação do CSS externo


export default {
	data() {
		return {
			/* popup */
			popupMensagem: "Popup Teste",
			popupClasse: "",
			popupClicavel: false,
			popupAnim: "",
			popupBarraAnim: "",
			popupTimeout: null
		}
	},
	methods: {
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

		const { errorHandler } = errorHandlerSetup();
		this.errorHandler = errorHandler;

		const { iniciarProcesso } = createProcessSetup();
		this.novoProcesso = () => {
			this.popup("Criando processo, aguarde...");
			iniciarProcesso(
				(response) => {
					const processo = response.data;
					rota(`/process/${processo._id}`)
				},
				(error) => {
					let erro = this.errorHandler(error?.message ?? error);
					console.error(`Erro ao iniciar processo: ` + erro);
					this.popup("Erro: " + erro, "erro");
				}
			);
		}
	}
}