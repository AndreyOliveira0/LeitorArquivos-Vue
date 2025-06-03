import axios from 'axios'

export function createProcessSetup() {
	const iniciarProcesso = async (sucesso, erro) => {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => {
			controller.abort();
		}, 10000);

		try {
			const response = await axios.post("http://localhost:8080/Process", {
				envioInicio: new Date(),
			}, { signal: controller.signal, headers: { 'Content-Type': 'application/json' }});
			
			clearTimeout(timeoutId);
			if (sucesso) sucesso(response);
		} catch (error) {
			clearTimeout(timeoutId);
			if (error.name === 'CanceledError' || axios.isCancel?.(error)) {
				error = "Tempo máximo de resposta excedido";
			}
			if (erro) erro(error);
		}
	}

	return { iniciarProcesso }
}