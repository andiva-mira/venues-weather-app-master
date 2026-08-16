class ForecastPanels {

	constructor() {
		//this.weatherEls = Array.from(document.querySelectorAll(".weather"));
		this.weatherEls = [...(document.querySelectorAll(".weather"))];
		this.flipWeatherPanel();
	}

	flipWeatherPanel() {
		this.weatherEls.forEach((item, idex) => {
			item.addEventListener("click", function() {
				this.classList.toggle("weather--flipped");
				// console.log(this);
			});
		});
	}

}

export default ForecastPanels;

