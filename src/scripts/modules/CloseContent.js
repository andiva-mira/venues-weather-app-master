class CloseContent {

	constructor() {
		this.closeBtn = document.querySelector('.btn-close');
		this.content = document.getElementById('content');
		this.container = document.querySelector('.container');
		this.svgClipped = document.querySelector('.svg-clipped');
		this.input = document.getElementById('city');
		this.weather = document.getElementById('weather');
		this.venues = document.getElementById('venues');
		this.location = document.getElementById('location');
		this.destination = document.getElementById('destination');
		this.closeContentPanel();
	}

	closeContentPanel() {
		this.closeBtn.addEventListener('click', (event) => {
			event.preventDefault();

			// reverse the reveal: fade the container out and slide the
			// panels back before hiding, matching the .container/.content
			// transition timings used to show them
			this.container.style.opacity = 0;
			this.content.classList.remove('is-content-visible', 'content--expanded');

			setTimeout(() => {
				this.container.style.display = "none";
				this.container.style.height = "";
				this.svgClipped.style.visibility = "visible";

				this.weather.innerHTML = "";
				this.venues.innerHTML = "";
				this.location.innerHTML = "";
				this.destination.innerHTML = "";
				this.input.value = "";
			}, 400);
		}, false);
	}

}

export default CloseContent;
