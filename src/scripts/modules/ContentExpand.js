class ContentExpand {
	constructor() {
		this.btn = document.querySelector(".btn-expand");
		this.content = document.getElementById("content");
		this.weatherContainer = document.getElementById("weather");
		this.venuesContainer = document.getElementById("venues");
		this.container = document.querySelector('.container');
		this.expandContent();			
	}

	expandContent() {
		const that = this;
		
			this.btn.addEventListener("click", () => {
				if (that.content.classList.contains("content--expanded")) {
					that.content.classList.remove("content--expanded");
					const venuesHeight = this.venuesContainer.offsetHeight;	   
		   			this.container.style.height = venuesHeight + 130 + "px";

				} else {
					that.content.classList.add("content--expanded");
					const weatherHeight = this.weatherContainer.offsetHeight;	   
	   				this.container.style.height = weatherHeight + 130 + "px";

				}

			}, false);

	}

}

export default ContentExpand;



