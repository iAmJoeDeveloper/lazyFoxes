import { registerImage } from './lazy'

const API = 'https://randomfox.ca/floof/'
const container = document.getElementById('app')
const addButton = document.querySelector('button#addImage')
const clearButton = document.querySelector('button#clearDom')
globalThis.loadedFoxes = 0

//get image
const getImage = async () => {
	try {
		const response = await fetch(API)
		const responseJSON = await response.json()
		const url = responseJSON.image

		return url
	} catch (error) {
		console.log(`We have a error ${error}`)
	}
}

const createImageNode = async (url) => {
	const box = document.createElement('div')
	box.className = 'p-4 fox'

	const img = document.createElement('img')
	img.className = 'mx-auto'
	img.width = '320'
	img.dataset.src = url

	const shadow = document.createElement('div')
	shadow.className = 'bg-gray-300'
	shadow.style.minHeight = '100px'
	shadow.style.display = 'inline-block'

	shadow.appendChild(img)
	box.appendChild(shadow)

	//Adding Elements to App
	container.appendChild(box)

	return shadow
}

//counter function
export const counter = (loadedFoxes) => {
	let foxesAdded = document.querySelectorAll('div.fox')
	console.log(`⚪ ${foxesAdded.length} Images has been added`)
	console.log(`🟣 ${loadedFoxes} has been loaded`)
	console.log('---------------------------------')
}

//add button
const action = async () => {
	const newImage = await getImage()
	const element = await createImageNode(newImage)
	registerImage(element)
	//Execute counter function
	counter(loadedFoxes)
}

// Clear DOM
const cleaner = () => {
	//const zorros =
	document.querySelectorAll('div.fox').forEach((e) => e.remove())
	// zorros.forEach((zorro) => {
	// 	zorro.remove()
	// })

	//Reiniciamos el acumulado de Zorros cargados
	loadedFoxes = 0
	//Execute counter function
	counter(loadedFoxes)
}

addButton.addEventListener('click', action)
clearButton.addEventListener('click', cleaner)
