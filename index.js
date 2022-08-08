const grid = document.querySelector('.grid')
let currentShooterIndex = 202
const width = 15
let invadersId
let laserId
let direction = 1
let goingRight = true
let aliensRemoved = []
let results = 0
const resultDisplay = document.querySelector('.score')
for (let i = 0; i < 225; i++){
	const square = document.createElement('div')
	grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))


const alienInvaders = [
	0,1,2,3,4,5,6,7,8,9,
	15,16,17,18,19,20,21,22,23,24,
	30,31,32,33,34,35,36,37,38,39
]

function draw() {
	for (let i = 0; i < alienInvaders.length; i++){
		if(!aliensRemoved.includes(i)){
			squares[alienInvaders[i]].classList.add('invader')
	    }
	}
}

function removeInvador() {
	for (let i = 0; i < alienInvaders.length; i++){
		squares[alienInvaders[i]].classList.remove('invader')

	}
}

draw()

squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e){
	squares[currentShooterIndex].classList.remove('shooter')
	switch(e.key){
		case 'ArrowLeft':
			if(currentShooterIndex % width !== 0) currentShooterIndex -= 1
			break
		case 'ArrowRight':
			if(currentShooterIndex % width < width -1) currentShooterIndex += 1
			break
	}

	squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

function moveInvadors() {
	const leftEdge = alienInvaders[0] % width === 0
	const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
	removeInvador()

	if(rightEdge && goingRight) {
		for (var i = 0; i < alienInvaders.length; i++) {
		alienInvaders[i] += width - 1
		direction = -1
		goingRight = false
		}
	}

	if(leftEdge && !goingRight) {
		for (var i = 0; i < alienInvaders.length; i++) {
		alienInvaders[i] += width - 1
		direction = 1
		goingRight = true
		}
	}

	for (var i = 0; i < alienInvaders.length; i++) {
		alienInvaders[i] += direction
	}

	draw()

	if (squares[currentShooterIndex].classList.contains('invader','shooter')) {
		grid.classList.add('gameover')
		clearInterval(invadersId)
		resultDisplay.innerHTML = 0
		document.removeEventListener('keydown',shoot)
		squares[currentShooterIndex].classList.remove('shooter')
		document.removeEventListener('keydown',moveShooter)
	}

	for (var i = 0; i < alienInvaders.length; i++) {
		if (alienInvaders[i]>squares.length) {
			grid.classList.add('gameover')
			clearInterval(invadersId)
			resultDisplay.innerHTML = 0
			document.removeEventListener('keydown',shoot)
			squares[currentShooterIndex].classList.remove('shooter')
			document.removeEventListener('keydown',moveShooter)
		}
	}

	if (aliensRemoved.length === alienInvaders.length){
		grid.classList.add('win')
		clearInterval(invadersId)
	}
}

invadersId=setInterval(moveInvadors, 400)

function shoot(e) {
	let laserId
	let currentLaserIndex = currentShooterIndex
	function moveLaser() {
		squares[currentLaserIndex].classList.remove('laser')
		currentLaserIndex -= width
		squares[currentLaserIndex].classList.add('laser')

		if(squares[currentLaserIndex].classList.contains('invader')){
			squares[currentLaserIndex].classList.remove('invader')
			squares[currentLaserIndex].classList.remove('laser')
			squares[currentLaserIndex].classList.add('boom')

			setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
			clearInterval(laserId)

			const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
			aliensRemoved.push(alienRemoved)
			results++
			resultDisplay.innerHTML = results
		}

	}

	switch(e.key) {
		case 'ArrowUp':
			laserId = setInterval(moveLaser, 100)
	}
}

document.addEventListener('keydown',shoot)