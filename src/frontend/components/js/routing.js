import { useRouter } from 'vue-router'

export function routerSetup() {
	const router = useRouter()

	const rota = (link) => {
		router.push(link)
	}

	return { rota }
}