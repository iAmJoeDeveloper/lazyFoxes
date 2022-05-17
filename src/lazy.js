import { counter } from './index'

const isIntersecting = (entry) => {
	return entry.isIntersecting //True si esta dentro de la pantalla
}

const loadImage = (entry) => {
	//Observer nos manda Entry como parametro cuando ejecuta acción
	const container = entry.target //aqui trae un container
	const img = container.querySelector('img')
	const url = img.dataset.src

	//habilitamos la url de la imagen para mostrarla
	img.src = url

	//Print counter log
	loadedFoxes++
	counter(loadedFoxes)

	// unslisten la imagen - deja de registrarla
	observer.unobserve(container)
}

const observer = new IntersectionObserver((entries) => {
	entries.filter(isIntersecting).forEach(loadImage)
})

export const registerImage = (imagen) => {
	observer.observe(imagen)
}
