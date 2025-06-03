<!-- Tela inicial -->
<script src="../js/home.js"></script>

<template>
	<div class="telaInicial">
		<div :class="['popup', popupClasse, {'popup-animation-start': popupAnim == 'popup-animation-start'}, {'popup-animation-end': popupAnim == 'popup-animation-end'}]" @click="popupClick" v-if="popupMensagem">
			<p>{{ popupMensagem }}</p>
			<div class="popup-barra" :class="{'popup-barra-anim': popupBarraAnim}"></div>
		</div>

		<div class="caixaTelaInicial">
			<h1>Sistema Bonsae</h1>
			<div class="bg"></div>
			<br>
			<button @click="rota('/list')">Controle de Importações</button>
			<button @click="novoProcesso">Importação de Processo</button>
		</div>
	</div>
</template>