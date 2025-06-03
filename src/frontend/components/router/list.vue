<script src="../js/list.js"></script>

<!-- Controle de Importações -->
<template>
	<!-- Header -->
	<div class="header">
		<img src="../images/back.png" draggable="false" @click="voltarTela()">
		<div style="display: flex; flex-direction: column; align-items: flex-start;">
			<p class="nomeDaTela">Controle de Importações</p>
			<p class="descricaoDaTela">Gerenciar processos enviados.</p>
		</div>

		<button @click="iniciarProcesso">+ Novo Processo</button>
	</div>

	<div :class="['popup', popupClasse, {'popup-animation-start': popupAnim == 'popup-animation-start'}, {'popup-animation-end': popupAnim == 'popup-animation-end'}]" @click="popupClick" v-if="popupMensagem">
		<p>{{ popupMensagem }}</p>
		<div class="popup-barra" :class="{'popup-barra-anim': popupBarraAnim}"></div>
	</div>

	<div style="margin-top: 50px;">
		<div style="display: flex; justify-content: center; align-items: center;">
			<!-- Tela de carregamento -->
			<div class="loading" v-if="!carregado">
				<p>Carregando processos...</p>
				<div class="loading-circle"></div>
			</div>

			<!-- Aviso/Erro -->
			<div class="listaErro" v-else-if="(erro != null && erro.length > 0) || processos.length == 0">
				<div class="caixaErro" v-if="erro">
					<p>⚠︎ Erro ao carregar processos:<br>{{ erro }}</p>
				</div>

				<div class="caixaAviso" v-else>
					<p>ⓘ Nenhum processo encontrado.</p>
				</div>
			</div>
			
			<!-- Tabela Carregada com Sucesso -->
			<table class="tabelaDados" v-else>
				<thead>
					<tr>
						<th>ID do Processo</th>
						<th>Início do Período Letivo</th>
						<th>Término do Período Letivo</th>
						<th>Início do Envio</th>
						<th>Término do Envio</th>
						<th>Status do Envio</th>
						<th>Ações</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="(processo, id) in processos" :key="id">
						<td v-html="processo._id"></td>
						<td v-html="processo.periodoInicio ? formatarData(processo.periodoInicio) : '---'"></td>
						<td v-html="processo.periodoTermino ? formatarData(processo.periodoTermino) : '---'"></td>
						<td v-html="formatarDataHora(processo.envioInicio)"></td>
						<td v-html="processo.envioTermino ? formatarDataHora(processo.envioTermino) : '---'"></td>
						<td style="padding: 0;" v-if="processo.status">
							<p v-html="processo.status" class="processoStatus" :class="{statusAndamento: processo.status.toLowerCase() == 'em andamento', statusConcluido: processo.status.toLowerCase() == 'concluído'}"></p>
						</td>

						<!-- Botões para "Em andamento"-->
						<td v-if="processo.status && processo.status.toLowerCase() == 'em andamento'" >
							<div class="processoAcoes">
								<button class="botaoAcao botaoCinza" @click="abrirProcesso(processo._id)">Editar</button>
								<button class="botaoAcao botaoVermelho" @click="cancelarProcesso(processo._id)">Cancelar</button>
							</div>
						</td>
						<!-- Botões para "Concluído"-->
						<td v-else-if="processo.status && processo.status.toLowerCase() == 'concluído'">
							<div class="processoAcoes">
								<button class="botaoAcao" style="width: 150px;" @click="abrirProcesso(processo._id)">Visualizar</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>