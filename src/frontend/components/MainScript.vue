<script src="./frontend.js"></script>

<template>
	<!-- Tela inicial -->
	<div v-if="tela == 'inicio'" class="telaInicial">
		<div class="caixaTelaInicial">
			<h1>Sistema Bonsae</h1>
			<div class="bg"></div>
			<br>
			<button @click="mudarTela('controleDados')">Controle de Importações</button>
			<button @click="mudarTela('importarPeriodo')">Importação de Dados</button>
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

			<button v-if="tela == 'controleDados'" @click="mudarTela('importarPeriodo')">+ Novo Processo</button>
			</div>

		<div style="margin-top: 50px;">
			<!-- Controle de Importações -->
			<div v-if="tela == 'controleDados'" style="display: flex; justify-content: center; align-items: center;">
				<table class="tabelaDados">
					<thead>
						<tr>
							<th>ID do Processo</th>
							<th>Período Letivo</th>
							<th>Data de Início</th>
							<th>Data de Término</th>
							<th>Status do Envio</th>
							<th>Ações</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(processo, id) in processos" :key="id">
							<td v-html="processo.id"></td>
							<td v-html="processo.periodo"></td>
							<td v-html="processo.inicio"></td>
							<td v-html="processo.termino"></td>
							<td style="padding: 0;">
								<p v-html="processo.status" class="processoStatus" :class="{statusAndamento: processo.status.toLowerCase() == 'em andamento', statusConcluido: processo.status.toLowerCase() == 'concluído'}"></p>
							</td>
						
							<!-- Botões para "Em andamento"-->
								<td v-if="processo.status.toLowerCase() == 'em andamento'" >
									<div class="processoAcoes">
										<button class="botaoAcao botaoCinza">Editar</button>
										<button class="botaoAcao botaoVermelho">Cancelar</button>
									</div>
								</td>
								<!-- Botões para "Concluído"-->
								<td v-else-if="processo.status.toLowerCase() == 'concluído'">
									<div class="processoAcoes">
										<button class="botaoAcao">Visualizar</button>
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
				<label v-if="tela !== 'importarPeriodo'" class="upload-box" for="fileInput">
					<div class="icone-upload-circulo">
						<img src="./images/upload.png" class="upload-icone" />
					</div>
					<div>
						<strong>Arquivo carregado:</strong>
						<span>{{ arquivoSelecionado ? truncarNome(arquivoSelecionado.name) : 'Nenhum arquivo selecionado' }}</span>
					</div>
					<div v-if="mensagem" :style="{ color: mensagemCor }">
						{{ mensagem }}
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
				<div v-if="tela == 'importarPeriodo'">
					<div class="inputs-container">
						<div class="input-grupo">
							<label for="anoLetivo">Ano Letivo</label>
							<input type="number" id="anoLetivo" v-model="anoLetivo" min="2000" max="3000" /> <!-- Limites do Ano seletivo -->
						</div>

						<div class="input-grupo">
							<label for="periodo">Período</label>
							<input type="number" id="periodo" v-model="periodo" min="1" max="99" /> <!-- Limites do Perido -->
						</div>
					</div>
					<button class="botao-avancar" @click="proximaEtapa()">Avançar</button>
				</div>
				
				<!-- Etapa 2 a 5 -->
				<div v-else class="">
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
							<tr v-for="(disciplina, index) in limiteDePagina(listaDisciplinas)" :key="index">
								<td :class="{ 'error-cell': isInvalid(disciplina.periodo, 'perido') }">{{ disciplina.periodo }}</td>
								<td :class="{ 'error-cell': isInvalid(disciplina.disciplina, 'disciplina') }">{{ disciplina.disciplina }}</td>
								<td :class="{ 'error-cell': isInvalid(disciplina.codigo, 'codigo') }">{{ disciplina.codigo }}</td>
								<td :class="{ 'error-cell': isInvalid(disciplina.inicio, 'inicio') }">{{ disciplina.inicio }}</td>
								<td :class="{ 'error-cell': isInvalid(disciplina.termino, 'termino') }">{{ disciplina.termino }}</td>
								<td :class="{ 'error-cell': isInvalid(disciplina.categoria, 'categoria') }">{{ disciplina.categoria }}</td>
								<td :class="{ 'error-cell': isInvalid(disciplina.periodoCurricular, 'peridoCurricular') }">{{ disciplina.periodoCurricular }}</td>
								<td :class="{ 'error-cell': isInvalid(disciplina.estado, 'estado') }">{{ disciplina.estado }}</td>
								<td :class="{ 'error-cell': isInvalid(disciplina.campus, 'campus') }">{{ disciplina.campus }}</td>
								<td><span class="status" :class="disciplina.status.toLowerCase()">{{ disciplina.status }}</span></td>
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
								<td :class="{ 'error-cell': isInvalid(turma.turma, 'turma') }">{{ turma.turma }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.codigo, 'codigo') }">{{ turma.codigo }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.disciplina, 'disciplina') }">{{ turma.disciplina }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.turno, 'turno') }">{{ turma.turno }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.capacidade, 'capacidade') }">{{ turma.capacidade }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.inicio, 'inicio') }">{{ turma.inicio }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.termino, 'termino') }">{{ turma.termino }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.professor, 'professor') }">{{ turma.professor }}</td>
								<td ><span class="status" :class="turma.status.toLowerCase()">{{ turma.status }}</span></td>
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
								<td :class="{ 'error-cell': isInvalid(turma.nome, 'nome') }">{{ turma.nome }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.matricula, 'matricula') }">{{ turma.matricula }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.email, 'email') }">{{ turma.email }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.tipo, 'tipo') }">{{ turma.tipo }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.curso, 'curso') }">{{ turma.curso }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.nascimento, 'nascimento') }">{{ turma.nascimento }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.cadastro, 'cadastro') }">{{ turma.cadastro }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.contato, 'contato') }">{{ turma.contato }}</td>
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
							<tr v-for="(turma, index) in limiteDePagina(listaVinculos)" :key="index">
								<td :class="{ 'error-cell': isInvalid(turma.nome, 'nome') }">{{ turma.nome }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.matricula, 'matricula') }">{{ turma.matricula }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.turma, 'turma') }">{{ turma.turma }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.disciplina, 'disciplina') }">{{ turma.disciplina }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.papel, 'papel') }">{{ turma.papel }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.inicio, 'inicio') }">{{ turma.inicio }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.termino, 'termino') }">{{ turma.termino }}</td>
								<td :class="{ 'error-cell': isInvalid(turma.obs, 'obs') }">{{ turma.obs }}</td>
								<td><span class="status" :class="turma.status.toLowerCase()">{{ turma.status }}</span></td>
							</tr>
						</tbody>
					</table>

					<!-- Paginação -->
					<div class="paginacao">
						<!-- Botões da esquerda -->
						<button class="paginacao" @click="mudarPagina(0)">«</button>
						<button class="paginacao" @click="mudarPagina(Math.max(0, paginaAtual - 1))">‹</button>

						<!-- Botões de páginas -->
						<button v-for="n in Math.ceil(listaAtual.length / 5)" :key="n" @click="mudarPagina(n-1)" :class="{paginacao: paginaAtual != n-1, paginacaoAtual: paginaAtual == n-1 }"> {{ n }} </button>

						<!-- Botões da direita -->
						<button class="paginacao" @click="mudarPagina(Math.min(Math.ceil(listaAtual.length / 5) - 1, paginaAtual + 1))">›</button>
						<button class="paginacao" @click="mudarPagina(Math.ceil(listaAtual.length / 5) - 1)">»</button>
					</div>
					
					<!-- Botão Avançar -->
					<div class="botao-direita">
						<button class="botao-avancar" @click="proximaEtapa()">Avançar</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
