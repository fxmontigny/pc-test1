// vars
const nbImage = 10,
	carousel = document.getElementById('carousel'),
	imageWidth = carousel.offsetWidth,
	imageHeight = carousel.offsetHeight;

// genere une div avec une image
function createDiv(id) {
	const div = document.createElement('div');
	div.className = 'carousel-cell';
	div.style.backgroundImage =
		'url(https://picsum.photos/' +
		imageWidth +
		'/' +
		imageHeight +
		'/?image=' +
		id +
		')';
	carousel.appendChild(div);
}

// avec les id choisir des images
function findImages(idList) {
	const tabLength = idList.length;

	for (let i = 0; i < nbImage; i++) {
		const number = getRandomInt(tabLength - 1);
		createDiv(idList[number]);
	}
}

// get random number
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

// init flickity
function initFlickity() {
	new Flickity(carousel, {
		// options
		cellAlign: 'left',
		lazyLoad: true,
		contain: true
	});
}

function initAxios() {
	axios
		.get('https://picsum.photos/list')
		.then(function(response) {
			console.log(response);
			const datas = response.data,
				idList = [];
			datas.map(function(imageFromPicsum) {
				idList.push(imageFromPicsum.id);
			});

			findImages(idList);
			initFlickity();
		})
		.catch(function(error) {
			console.log(error);
		});
}

// start
initAxios();
