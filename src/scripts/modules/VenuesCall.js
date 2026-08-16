import VenuePanels from './VenuePanels';
import ShapesAnimation from './ShapesAnimation';

export function VenuesApiCall() {

	// Foursquare API Info
	const clientId = 'JLK3ZOVKVGBRNJYLLNFWSQOLASRBMHLTNGRHJTA4FJQ4PQZS';
	const clientSecret = 'ZEHOJMFPWT303HSHJB3EFEFWPGXRIJJFY5JDH0CXJRAHBVCP';
	const url = 'https://api.foursquare.com/v2/venues/explore?near=';

	// Page Elements
	const $input = document.getElementById('city');
	const $submit = document.getElementById('button');
	const $destination = document.getElementById('destination');
	const $container = document.querySelector('.container');
	const $venues = document.getElementById('venues');
	
	// get date
	function getDate() {
		var now = new Date();
		var todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
		return todayUTC.toISOString().slice(0, 10).replace(/-/g, '');
	}

	// today's date
	let date = getDate();
	date = date.slice(0,10);


	// AJAX function
	async function getVenues() {
		const city = $input.value;
		const urlToFetch = `${url}${city}&limit=8&client_id=${clientId}&client_secret=${clientSecret}&v=${date}`;

		try {
			let response = await fetch(urlToFetch);
			if (response.ok) {
				let jsonResponse = await response.json();
				console.log(jsonResponse);
				let venues = jsonResponse.response.groups[0].items.map(venueItem => venueItem.venue);
				console.log(venues);
				return venues;
			} 
			throw new Error('Request failed!');
		} catch (error) {
			console.log(error);
		}
	}

	// Render function
	function renderVenues(venues) {
		venues.map((venue, index) => {
			const venueAddress = (venue.location.address) ? (`<p>${venue.location.address}</p>`) : `<p></p>`;

			let venueContent =
				`<div class="venue-container">
					<div class="venue">
						<div class="venue-face venue-face--front">
							<div class="venue-face--front---inner">
								<h2>${venue.name}</h2>
							 	<h3> 
								 	<span>Type of Attraction: </span>
									<span>${venue.categories[0].pluralName}</span>
								</h3>
							</div>
						</div>
						<div class="venue-face venue-face--back">
							<div class="venue-face--back---inner">
								<h3>Address:</h3>
								${venueAddress}
								<p> ${venue.location.city}</p>
								<p> ${venue.location.country}</p>
							</div>
						</div>
					</div>
				</div>`;
			$venues.innerHTML += venueContent;
		});

		$destination.innerHTML = `${venues[0].location.city}`;
	}


	function searchVenue() {
		$venues.innerHTML = "";
		$destination.innerHTML = ' ';

		getVenues().then(venues => renderVenues(venues)).then(() => {
			$container.style.display = "block";
			$container.style.opacity = 1;
			const venuesHeight = $venues.offsetHeight;
			$container.style.height = venuesHeight + 130 + "px";
			new VenuePanels();
			new ShapesAnimation("#contentRightCanvas", " #783a6c");
		});
	}

	$submit.addEventListener('click', searchVenue, false);

}