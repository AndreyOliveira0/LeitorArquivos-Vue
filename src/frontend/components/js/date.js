export function dateFunctionsSetup() {
	const formatarData = (data) => {
		const d = new Date(data);
		if(isNaN(d)) return `--/--/--`;

		const dia = String(d.getUTCDate()).padStart(2, '0');
		const mes = String(d.getUTCMonth() + 1).padStart(2, '0'); // Janeiro = 0
		const ano = d.getUTCFullYear();
		return `${dia}/${mes}/${ano}`;
	}
	const formatarDataHora = (dataHora) => {
		const d = new Date(dataHora);
		const dia = String(d.getDate()).padStart(2, '0');
		const mes = String(d.getMonth() + 1).padStart(2, '0'); // Janeiro = 0
		const ano = d.getFullYear();

		const horas = String(d.getHours()).padStart(2, '0');
		const minutos = String(d.getMinutes()).padStart(2, '0');

		return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
	}
	const dateYMD = (date) => {
		const d = new Date(date);
		const dia = String(d.getUTCDate()).padStart(2, '0');
		const mes = String(d.getUTCMonth() + 1).padStart(2, '0'); // Janeiro = 0
		const ano = d.getUTCFullYear();
		return `${ano}-${mes}-${dia}`;
	}
	return { formatarData, formatarDataHora, dateYMD}
}