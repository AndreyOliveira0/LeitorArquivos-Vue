import axios from 'axios'

export function createProcessSetup() {
	const iniciarProcesso = async (sucesso, erro) => {
		await axios.post("http://localhost:8080/Process", {
			envioInicio: new Date(),
		}, {'Content-Type': 'application/json'})
		.then(response => {
			if(sucesso) sucesso(response);
		})
		.catch(error => {
			if(erro) erro(response);
		});
	}

	return { iniciarProcesso }
}