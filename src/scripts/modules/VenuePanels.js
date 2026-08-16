class VenuePanels {

	constructor() {
		//this.venueEls = Array.from(document.querySelectorAll(".venue"));
		this.venueEls = [...(document.querySelectorAll(".venue"))];
		this.flipVenuePanel();
	}

	flipVenuePanel() {
		this.venueEls.forEach((item, idex) => {
			item.addEventListener("click", function() {
				this.classList.toggle("venue--flipped");
				//console.log(this);
			});
		});

	}

}

export default VenuePanels;