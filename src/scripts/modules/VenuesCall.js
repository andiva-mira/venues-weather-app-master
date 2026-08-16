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
	const $sectionTitle = document.querySelector('.content-right-inner .sectiontitle');

	// get date
	function getDate() {
		var now = new Date();
		var todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
		return todayUTC.toISOString().slice(0, 10).replace(/-/g, '');
	}

	// today's date
	let date = getDate();
	date = date.slice(0, 10);


	// AJAX function - resolves to { ok: true, data } or { ok: false, message }
	async function getVenues() {
		const city = $input.value.trim();

		if (!city) {
			return { ok: false, message: 'Please enter a location to search.' };
		}

		const urlToFetch = `${url}${encodeURIComponent(city)}&limit=8&client_id=${clientId}&client_secret=${clientSecret}&v=${date}`;

		try {
			let response = await fetch(urlToFetch);
			if (!response.ok) throw new Error('Request failed!');

			let jsonResponse = await response.json();
			let groups = jsonResponse.response && jsonResponse.response.groups;
			let venues = (groups && groups[0] && groups[0].items) ? groups[0].items.map(venueItem => venueItem.venue) : [];

			if (!venues.length) {
				return { ok: false, message: `We couldn't find any attractions for "${city}". Please check the spelling and try again.` };
			}

			return { ok: true, data: venues };
		} catch (error) {
			console.log(error);
			return { ok: false, message: 'Something went wrong fetching attractions. Please try again.' };
		}
	}

	// Render function
	function renderVenues(venues) {
		venues.map((venue, index) => {
			// Foursquare omits address/city/country entirely for some
			// venues rather than returning an empty string, so guard each
			// one instead of interpolating them straight into the markup
			const venueAddress = venue.location.address ? `<h3>Address:</h3><p>${venue.location.address}</p>` : '';
			const venueCity = venue.location.city ? `<p> ${venue.location.city}</p>` : '';
			const venueCountry = venue.location.country ? `<p> ${venue.location.country}</p>` : '';

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
								${venueAddress}
								${venueCity}
								${venueCountry}
							</div>
						</div>
					</div>
				</div>`;
			$venues.innerHTML += venueContent;
		});

		const destinationCity = venues[0].location.city || $input.value.trim();
		const destinationCountry = venues[0].location.country;
		$destination.innerHTML = destinationCountry ? `${destinationCity}, ${destinationCountry}` : destinationCity;
		$sectionTitle.style.display = "";
	}

	function renderError(message) {
		$venues.innerHTML = `<p class="search-message">${message}</p>`;
		$destination.innerHTML = "";
		$sectionTitle.style.display = "none";
	}

	function searchVenue() {
		$venues.innerHTML = "";
		$destination.innerHTML = ' ';

		getVenues().then(result => {
			if (result.ok) {
				renderVenues(result.data);
			} else {
				renderError(result.message);
			}
		}).then(() => {
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