export function errorHandlerSetup() {
	const errorHandler = (erro) => {
		switch(erro) {
			case "Network Error":
				return "Conexão não estabelecida";
		}
		return erro;
	}

	return { errorHandler }
}