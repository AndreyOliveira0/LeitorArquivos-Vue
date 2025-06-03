<!-- Tela inicial -->
<script setup>
import { routerSetup } from '../js/routing.js' // adjust path if needed
import { createProcessSetup } from '../js/createProcess.js'
import "../sheets/styles.css";  // Importação do CSS externo

const { rota } = routerSetup()

const { iniciarProcesso } = createProcessSetup();
const novoProcesso = async () => {
	iniciarProcesso(
		(response) => {
			const processo = response.data;
			rota(`/process/${processo._id}`)
		},
		(error) => {
			console.error(`Erro ao iniciar processo:`, error?.message ?? error);
		}
	);
}
</script>

<template>
	<div class="telaInicial">
		<div class="caixaTelaInicial">
			<h1>Sistema Bonsae</h1>
			<div class="bg"></div>
			<br>
			<button @click="rota('/list')">Controle de Importações</button>
			<button @click="novoProcesso">Importação de Processo</button>
		</div>
	</div>
</template>