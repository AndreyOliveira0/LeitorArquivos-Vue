<script src="../js/process.js"></script>

<!-- Importação de Dados -->
<template>
	<!-- Header -->
	<div class="header">
		<img src="../images/back.png" draggable="false" @click="voltarTela()">
		<div style="display: flex; flex-direction: column; align-items: flex-start;">
			<p class="nomeDaTela">Importação de Processo</p>
			<p class="descricaoDaTela">Enviar um novo processo ao sistema.</p>
		</div>
	</div>

	<div :class="['popup', popupClasse, {'popup-animation-start': popupAnim == 'popup-animation-start'}, {'popup-animation-end': popupAnim == 'popup-animation-end'}]" @click="popupClick" v-if="popupMensagem">
		<p>{{ popupMensagem }}</p>
		<div class="popup-barra" :class="{'popup-barra-anim': popupBarraAnim}"></div>
	</div>

	<div style="margin-top: 50px;">
		<div style="display: flex; justify-content: center; align-items: center;" v-if="!carregado || (erro != null && erro.length > 0)">
			<!-- Tela de carregamento -->
			<div class="loading" v-if="!carregado">
				<p>Carregando dados do processo...</p>
				<div class="loading-circle"></div>
			</div>

			<!-- Aviso/Erro -->
			<div class="listaErro" v-else>
				<div class="caixaErro" v-if="erro != null">
					<p>⚠︎ Erro ao carregar processo:<br>{{ erro }}</p>
				</div>
			</div>
		</div>

		<div class="importacao-container" v-else>
			<div class="etapas"> <!-- Os circulos das etapas -->
				<div v-for="(etapa, index) in nomeEtapas" :key="index" :class="{etapa, etapaAtiva: index <= etapaAtual, etapaBrilho: index == etapaAtual}">
					<div class="numero" v-html="index+1"></div>
					<div v-html="nomeEtapas[index]"></div>
				</div>
			</div>

			<!-- Caixa de Upload com clique em toda a área -->
			<label v-if="etapaAtual != 0 && !processoVisualizando" class="upload-box" for="fileInput">
				<div class="icone-upload-circulo">
					<img src="../images/upload.png" class="upload-icone" />
				</div>
				<div>
					<strong>Arquivo carregado:</strong>
					<br>
					<span class="upload-texto">{{ arquivoSelecionado ? truncarNome(arquivoSelecionado.name) : 'Nenhum arquivo selecionado' }}</span>
				</div>
				<!-- Input de arquivo escondido -->
				<input
					id="fileInput"
					type="file"
					style="display: none"
					@change="uploadArquivo"
				/>
			</label>


			<!-- Etapa 1 - Período Letivo -->
			<div v-if="etapaAtual == 0" class="telaPeriodos">
				<div class="caixaErro" v-if="periodoInicio && periodoTermino && periodoInicio > periodoTermino">
					<p>O Ano Letivo do Começo não pode ser maior que do Término.</p>
				</div>

				<div style="display: flex; flex-direction: row; gap: 50px;">
					<div class="container-parent">
						<h2>Início do Ano Letivo</h2>
						<div class="inputs-container" style="width: 300px;">
							<div class="input-grupo">
								<label for="periodoInicio">Data</label>
								<input type="date" id="periodoInicio" v-model="periodoInicio" :disabled="processoVisualizando" /> <!-- Limites da Data -->
							</div>
						</div>
					</div>

					<div class="container-parent">
						<h2>Término do Ano Letivo</h2>
						<div class="inputs-container" style="width: 300px;">
							<div class="input-grupo">
								<label for="periodoTermino">Data</label>
								<input type="date" id="periodoTermino" v-model="periodoTermino" :disabled="processoVisualizando" /> <!-- Limites da Data -->
							</div>
						</div>
					</div>
				</div>
				<button class="botao-avancar" @click="proximaEtapa()" :disabled="!processoVisualizando && (!periodoInicio || !periodoTermino || periodoInicio > periodoTermino)">Avançar</button>
			</div>
			
			<!-- Etapa 2 a 5 -->
			<div v-else class="tabelaLista">
				<!-- Etapa 2 - Disciplinas -->
				<table v-if="etapaAtual == 1">
					<thead>
						<tr>
							<th>Período Letivo</th>
							<th>Disciplina</th>
							<th>Código</th>
							<th>Data de Início</th>
							<th>Data de Término</th>
							<th>Categoria</th>
							<th>Período Curricular</th>
							<th>Estado</th>
							<th>Campus</th>
							<th>Status</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(disciplina, index) in limiteDePagina(listaDisciplinas)" :key="index" :class="{'error-row': (erro = errosDisciplinas[index + paginaAtual * 5])}" >
							<td :class="{'error-cell': erro?.periodo}" class="tooltip">{{ disciplina.periodo }}<span v-if="erro?.periodo" class="tooltip-text">{{ erro.periodo }}</span></td>
							<td :class="{'error-cell': erro?.disciplina}" class="tooltip">{{ disciplina.disciplina }}<span v-if="erro?.disciplina" class="tooltip-text">{{ erro.disciplina }}</span></td>
							<td :class="{'error-cell': erro?.codigo}" class="tooltip">{{ disciplina.codigo }}<span v-if="erro?.codigo" class="tooltip-text">{{ erro.codigo }}</span></td>
							<td :class="{'error-cell': erro?.inicio}" class="tooltip">{{ formatarData(disciplina.inicio) }}<span v-if="erro?.inicio" class="tooltip-text">{{ erro.inicio }}</span></td>
							<td :class="{'error-cell': erro?.termino}" class="tooltip">{{ formatarData(disciplina.termino) }}<span v-if="erro?.termino" class="tooltip-text">{{ erro.termino }}</span></td>
							<td :class="{'error-cell': erro?.categoria}" class="tooltip">{{ disciplina.categoria }}<span v-if="erro?.categoria" class="tooltip-text">{{ erro.categoria }}</span></td>
							<td :class="{'error-cell': erro?.periodoCurricular}" class="tooltip">{{ disciplina.periodoCurricular }}<span v-if="erro?.periodoCurricular" class="tooltip-text">{{ erro.periodoCurricular }}</span></td>
							<td :class="{'error-cell': erro?.estado}" class="tooltip">{{ disciplina.estado }}<span v-if="erro?.estado" class="tooltip-text">{{ erro.estado }}</span></td>
							<td :class="{'error-cell': erro?.campus}" class="tooltip">{{ disciplina.campus }}<span v-if="erro?.campus" class="tooltip-text">{{ erro.campus }}</span></td>
							<td><span class="status" :class="disciplina.status ? disciplina.status.toLowerCase() : 'null'">{{ disciplina.status || 'Sem status' }}</span></td>
						</tr>
					</tbody>
				</table>
				
				<!-- Etapa 3 - Turmas -->
				<table v-else-if="etapaAtual == 2">
					<thead>
						<tr>
							<th>Nome da Turma</th>
							<th>Código</th>
							<th>Disciplina Associada</th>
							<th>Turno</th>
							<th>Capacidade</th>
							<th>Início das Aulas</th>
							<th>Término das Aulas</th>
							<th>Professor Responsável</th>
							<th>Status</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(turma, index) in limiteDePagina(listaTurmas)" :key="index" :class="{'error-row': (erro = errosTurmas[index + paginaAtual * 5])}">
							<td :class="{'error-cell': erro?.turma}" class="tooltip">{{ turma.turma }}<span v-if="erro?.turma" class="tooltip-text">{{ erro.turma }}</span></td>
							<td :class="{'error-cell': erro?.codigo}" class="tooltip">{{ turma.codigo }}<span v-if="erro?.codigo" class="tooltip-text">{{ erro.codigo }}</span></td>
							<td :class="{'error-cell': erro?.disciplina}" class="tooltip">{{ turma.disciplina }}<span v-if="erro?.disciplina" class="tooltip-text">{{ erro.disciplina }}</span></td>
							<td :class="{'error-cell': erro?.turno}" class="tooltip">{{ turma.turno }}<span v-if="erro?.turno" class="tooltip-text">{{ erro.turno }}</span></td>
							<td :class="{'error-cell': erro?.capacidade}" class="tooltip">{{ turma.capacidade }}<span v-if="erro?.capacidade" class="tooltip-text">{{ erro.capacidade }}</span></td>
							<td :class="{'error-cell': erro?.inicio}" class="tooltip">{{ formatarData(turma.inicio) }}<span v-if="erro?.inicio" class="tooltip-text">{{ erro.inicio }}</span></td>
							<td :class="{'error-cell': erro?.termino}" class="tooltip">{{ formatarData(turma.termino) }}<span v-if="erro?.termino" class="tooltip-text">{{ erro.termino }}</span></td>
							<td :class="{'error-cell': erro?.professor}" class="tooltip">{{ turma.professor }}<span v-if="erro?.professor" class="tooltip-text">{{ erro.professor }}</span></td>
							<td><span class="status" :class="turma.status ? turma.status.toLowerCase() : 'null'">{{ turma.status || 'Sem status' }}</span></td>
						</tr>
					</tbody>
				</table>
				
				<!-- Etapa 4 - Usuários -->
				<table v-else-if="etapaAtual == 3">
					<thead>
						<tr>
							<th>Nome Completo</th>
							<th>Matrícula</th>
							<th>E-mail</th>
							<th>Tipo</th>
							<th>Curso</th>
							<th>Data de Nascimento</th>
							<th>Data de Cadastro</th>
							<th>Contato</th>
							<th>Status</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(turma, index) in limiteDePagina(listaUsuarios)" :key="index" :class="{'error-row': (erro = errosUsuarios[index + paginaAtual * 5])}">
							<td :class="{'error-cell': erro?.nome}" class="tooltip">{{ turma.nome }}<span v-if="erro?.nome" class="tooltip-text">{{ erro.nome }}</span></td>
							<td :class="{'error-cell': erro?.matricula}" class="tooltip">{{ turma.matricula }}<span v-if="erro?.matricula" class="tooltip-text">{{ erro.matricula }}</span></td>
							<td :class="{'error-cell': erro?.email}" class="tooltip">{{ turma.email }}<span v-if="erro?.email" class="tooltip-text">{{ erro.email }}</span></td>
							<td :class="{'error-cell': erro?.tipo}" class="tooltip">{{ turma.tipo }}<span v-if="erro?.tipo" class="tooltip-text">{{ erro.tipo }}</span></td>
							<td :class="{'error-cell': erro?.curso}" class="tooltip">{{ turma.curso }}<span v-if="erro?.curso" class="tooltip-text">{{ erro.curso }}</span></td>
							<td :class="{'error-cell': erro?.nascimento}" class="tooltip">{{ formatarData(turma.nascimento) }}<span v-if="erro?.nascimento" class="tooltip-text">{{ erro.nascimento }}</span></td>
							<td :class="{'error-cell': erro?.cadastro}" class="tooltip">{{ formatarData(turma.cadastro) }}<span v-if="erro?.cadastro" class="tooltip-text">{{ erro.cadastro }}</span></td>
							<td :class="{'error-cell': erro?.contato}" class="tooltip">{{ turma.contato }}<span v-if="erro?.contato" class="tooltip-text">{{ erro.contato }}</span></td>
							<td><span class="status" :class="turma.status ? turma.status.toLowerCase() : 'null'">{{ turma.status || 'Sem status' }}</span></td>
						</tr>
					</tbody>
				</table>
				
				<!-- Etapa 5 - Vínculos -->
				<table v-else-if="etapaAtual == 4">
					<thead>
						<tr>
							<th>Nome de Usuário</th>
							<th>Matrícula</th>
							<th>Turma</th>
							<th>Disciplina</th>
							<th>Papel</th>
							<th>Data de Início</th>
							<th>Data de Término</th>
							<th>Observações</th>
							<th>Status</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(vinculo, index) in limiteDePagina(listaVinculos)" :key="index" :class="{'error-row': (erro = errosVinculos[index + paginaAtual * 5])}">
							<td :class="{'error-cell': erro?.nome}" class="tooltip">{{ vinculo.nome }}<span v-if="erro?.nome" class="tooltip-text">{{ erro.nome }}</span></td>
							<td :class="{'error-cell': erro?.matricula}" class="tooltip">{{ vinculo.matricula }}<span v-if="erro?.matricula" class="tooltip-text">{{ erro.matricula }}</span></td>
							<td :class="{'error-cell': erro?.turma}" class="tooltip">{{ vinculo.turma }}<span v-if="erro?.turma" class="tooltip-text">{{ erro.turma }}</span></td>
							<td :class="{'error-cell': erro?.disciplina}" class="tooltip">{{ vinculo.disciplina }}<span v-if="erro?.disciplina" class="tooltip-text">{{ erro.disciplina }}</span></td>
							<td :class="{'error-cell': erro?.papel}" class="tooltip">{{ vinculo.papel }}<span v-if="erro?.papel" class="tooltip-text">{{ erro.papel }}</span></td>
							<td :class="{'error-cell': erro?.inicio}" class="tooltip">{{ formatarData(vinculo.inicio) }}<span v-if="erro?.inicio" class="tooltip-text">{{ erro.inicio }}</span></td>
							<td :class="{'error-cell': erro?.termino}" class="tooltip">{{ formatarData(vinculo.termino) }}<span v-if="erro?.termino" class="tooltip-text">{{ erro.termino }}</span></td>
							<td :class="{'error-cell': erro?.obs}" class="tooltip">{{ vinculo.obs }}<span v-if="erro?.obs" class="tooltip-text">{{ erro.obs }}</span></td>
							<td><span class="status" :class="vinculo.status ? vinculo.status.toLowerCase() : 'null'">{{ vinculo.status || 'Sem status' }}</span></td>
						</tr>
					</tbody>
				</table>

				<!-- Paginação -->
				<div class="paginacao" v-if="listaAtual && Math.ceil(listaAtual.length / 10) > 1">
					<!-- Botões da esquerda -->
					<button class="paginacao" @click="mudarPagina(0)">«</button>
					<button class="paginacao" @click="mudarPagina(Math.max(0, paginaAtual - 1))">‹</button>

					<!-- Botões de páginas -->
					<button v-for="n in Math.ceil(listaAtual.length / 10)" :key="n" @click="mudarPagina(n-1)" :class="{paginacao: paginaAtual != n-1, paginacaoAtual: paginaAtual == n-1 }"> {{ n }} </button>

					<!-- Botões da direita -->
					<button class="paginacao" @click="mudarPagina(Math.min(Math.ceil(listaAtual.length / 10) - 1, paginaAtual + 1))">›</button>
					<button class="paginacao" @click="mudarPagina(Math.ceil(listaAtual.length / 10) - 1)">»</button>
				</div>
				<div style="margin-bottom: 30px;" v-else></div>
				
				<!-- Botão Avançar -->
				<div class="botao-direita">
					<!-- Etapas 1-4 -->
					<button class="botao-avancar" @click="proximaEtapa()" v-if="etapaAtual < nomeEtapas.length - 1" :disabled="(!processoVisualizando && !arquivoSelecionado) || listaAtualTemErros()">Avançar</button>

					<!-- Etapas 5 (Visualizando Processo) -->
					<button class="botao-avancar" @click="rota('/list')" v-else-if="processoVisualizando">Fechar Processo</button>
					
					<!-- Etapas 5 (Editando Processo) -->
					<button class="botao-avancar" @click="enviarProcesso" :disabled="!arquivoSelecionado || listaAtualTemErros()" v-else>Finalizar Processo</button>
				</div>
			</div>
		</div>
	</div>
</template>