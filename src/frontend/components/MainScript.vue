<script src="./frontend.js"></script>

<template>
	<!-- Tela inicial -->
	<div v-if="tela == 'inicio'" class="telaInicial">
		<div class="caixaTelaInicial">
			<h1>Sistema Bonsae</h1>
			<div class="bg"></div>
			<br>
			<button @click="mudarTela('controleDados')">Controle de Importações</button>
			<button @click="iniciarProcesso">Importação de Dados</button>
		</div>
	</div>

	<div v-else>
		<!-- Header -->
		<div class="header">
			<img src="./images/back.png" draggable="false" @click="voltarTela()">
			<div style="display: flex; flex-direction: column; align-items: flex-start;">
				<p class="nomeDaTela" v-html="nomeDaTela()"></p>
				<p class="descricaoDaTela" v-html="descricaoDaTela()"></p>
			</div>

			<button v-if="tela == 'controleDados'" @click="iniciarProcesso">+ Novo Processo</button>
			</div>

		<div style="margin-top: 50px;">
			<!-- Controle de Importações -->
			<div v-if="tela == 'controleDados'" style="display: flex; justify-content: center; align-items: center;">
				<table class="tabelaDados">
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

			<!-- Importação de Dados -->
			<div v-else-if="telaEtapas.includes(tela)" class="importacao-container">
				<div class="etapas"> <!-- Os circulos das etapas -->
					<div v-for="(etapa, index) in nomeEtapas" :key="index" :class="{etapa, etapaAtiva: index <= etapaAtual, etapaBrilho: index == etapaAtual}">
						<div class="numero" v-html="index+1"></div>
						<div v-html="nomeEtapas[index]"></div>
					</div>
				</div>

				<!-- Caixa de Upload com clique em toda a área -->
				<label v-if="tela !== 'importarPeriodo' && !processoVisualizando" class="upload-box" for="fileInput">
					<div class="icone-upload-circulo">
						<img src="./images/upload.png" class="upload-icone" />
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
				<div v-if="tela == 'importarPeriodo'" class="telaPeriodos">
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
					<table v-if="tela == 'importarDisciplinas'">
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
								<td :class="{'error-cell': erro?.periodo}">{{ disciplina.periodo }}</td>
								<td :class="{'error-cell': erro?.disciplina}">{{ disciplina.disciplina }}</td>
								<td :class="{'error-cell': erro?.codigo}">{{ disciplina.codigo }}</td>
								<td :class="{'error-cell': erro?.inicio}">{{ formatarData(disciplina.inicio) }}</td>
								<td :class="{'error-cell': erro?.termino}">{{ formatarData(disciplina.termino) }}</td>
								<td :class="{'error-cell': erro?.categoria}">{{ disciplina.categoria }}</td>
								<td :class="{'error-cell': erro?.periodoCurricular}">{{ disciplina.periodoCurricular }}</td>
								<td :class="{'error-cell': erro?.estado}">{{ disciplina.estado }}</td>
								<td :class="{'error-cell': erro?.campus}">{{ disciplina.campus }}</td>
								<td><span class="status" :class="disciplina.status ? disciplina.status.toLowerCase() : 'null'">{{ disciplina.status }}</span></td>
							</tr>
						</tbody>
					</table>
					
					<!-- Etapa 3 - Turmas -->
					<table v-else-if="tela == 'importarTurmas'">
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
							<tr v-for="(turma, index) in limiteDePagina(listaTurmas)" :key="index">
								<td>{{ turma.turma }}</td>
								<td>{{ turma.codigo }}</td>
								<td>{{ turma.disciplina }}</td>
								<td>{{ turma.turno }}</td>
								<td>{{ turma.capacidade }}</td>
								<td>{{ formatarData(turma.inicio) }}</td>
								<td>{{ formatarData(turma.termino) }}</td>
								<td>{{ turma.professor }}</td>
								<td><span class="status" :class="turma.status.toLowerCase()">{{ turma.status }}</span></td>
							</tr>
						</tbody>
					</table>
					
					<!-- Etapa 4 - Usuários -->
					<table v-else-if="tela == 'importarUsuarios'">
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
							<tr v-for="(turma, index) in limiteDePagina(listaUsuarios)" :key="index">
								<td>{{ turma.nome }}</td>
								<td>{{ turma.matricula }}</td>
								<td>{{ turma.email }}</td>
								<td>{{ turma.tipo }}</td>
								<td>{{ turma.curso }}</td>
								<td>{{ formatarData(turma.nascimento) }}</td>
								<td>{{ formatarData(turma.cadastro) }}</td>
								<td>{{ turma.contato }}</td>
								<td><span class="status" :class="turma.status.toLowerCase()">{{ turma.status }}</span></td>
							</tr>
						</tbody>
					</table>
					
					<!-- Etapa 5 - Vínculos -->
					<table v-else-if="tela == 'importarVinculos'">
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
							<tr v-for="(vinculo, index) in limiteDePagina(listaVinculos)" :key="index">
								<td>{{ vinculo.nome }}</td>
								<td>{{ vinculo.matricula }}</td>
								<td>{{ vinculo.turma }}</td>
								<td>{{ vinculo.disciplina }}</td>
								<td>{{ vinculo.papel }}</td>
								<td>{{ formatarData(vinculo.inicio) }}</td>
								<td>{{ formatarData(vinculo.termino) }}</td>
								<td>{{ vinculo.obs }}</td>
								<td><span class="status" :class="vinculo.status.toLowerCase()">{{ vinculo.status }}</span></td>
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
						<button class="botao-avancar" @click="proximaEtapa()" v-if="etapaAtual < telaEtapas.length - 1" :disabled="(!processoVisualizando && !arquivoSelecionado) || listaAtualTemErros()">Avançar</button>

						<!-- Etapas 5 (Visualizando Processo) -->
						<button class="botao-avancar" @click="mudarTela('controleDados')" v-else-if="processoVisualizando">Fechar Processo</button>
						
						<!-- Etapas 5 (Editando Processo) -->
						<button class="botao-avancar" @click="finalizarProcesso()" :disabled="!arquivoSelecionado || listaAtualTemErros()" v-else>Finalizar Processo</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>