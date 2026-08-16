import ForecastPanels from './ForecastPanels';
import ShapesAnimation from './ShapesAnimation';
import sunRaw from '../../images/icons/sun.svg?raw';
import cloudRaw from '../../images/icons/cloud.svg?raw';
import cloudPairRaw from '../../images/icons/cloud-pair.svg?raw';

// these icon svgs ship with no baked-in stroke color (they're normally
// colored at runtime by ShapesAnimation's snapsvg calls) - since they're
// used here as plain <img> sources instead, inject a visible stroke.
const colorizeIcon = (svgText, color = '#ffffff') =>
	`data:image/svg+xml,${encodeURIComponent(svgText.replace('<svg', `<svg stroke="${color}"`))}`;

const sunIcon = colorizeIcon(sunRaw);
const cloudIcon = colorizeIcon(cloudRaw);
const cloudPairIcon = colorizeIcon(cloudPairRaw);

export const ForecastApiCall = () => {

	// Open-Meteo APIs - free, keyless (https://open-meteo.com)
	const geocodeUrl = 'https://geocoding-api.open-meteo.com/v1/search';
	const forecastUrl = 'https://api.open-meteo.com/v1/forecast';

	// Page Elements
	const $input = document.getElementById('city');
	const $submit = document.getElementById('button');
	const $container = document.querySelector('.container');
	const $weather = document.getElementById("weather");
	const $location = document.getElementById('location');
	const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	// WMO weather codes -> description/icon, see https://open-meteo.com/en/docs
	const weatherCodeMap = {
		0: { text: 'Clear sky', icon: sunIcon },
		1: { text: 'Mainly clear', icon: sunIcon },
		2: { text: 'Partly cloudy', icon: cloudIcon },
		3: { text: 'Overcast', icon: cloudIcon },
		45: { text: 'Fog', icon: cloudIcon },
		48: { text: 'Depositing rime fog', icon: cloudIcon },
		51: { text: 'Light drizzle', icon: cloudPairIcon },
		53: { text: 'Moderate drizzle', icon: cloudPairIcon },
		55: { text: 'Dense drizzle', icon: cloudPairIcon },
		56: { text: 'Light freezing drizzle', icon: cloudPairIcon },
		57: { text: 'Dense freezing drizzle', icon: cloudPairIcon },
		61: { text: 'Slight rain', icon: cloudPairIcon },
		63: { text: 'Moderate rain', icon: cloudPairIcon },
		65: { text: 'Heavy rain', icon: cloudPairIcon },
		66: { text: 'Light freezing rain', icon: cloudPairIcon },
		67: { text: 'Heavy freezing rain', icon: cloudPairIcon },
		71: { text: 'Slight snow fall', icon: cloudPairIcon },
		73: { text: 'Moderate snow fall', icon: cloudPairIcon },
		75: { text: 'Heavy snow fall', icon: cloudPairIcon },
		77: { text: 'Snow grains', icon: cloudPairIcon },
		80: { text: 'Slight rain showers', icon: cloudPairIcon },
		81: { text: 'Moderate rain showers', icon: cloudPairIcon },
		82: { text: 'Violent rain showers', icon: cloudPairIcon },
		85: { text: 'Slight snow showers', icon: cloudPairIcon },
		86: { text: 'Heavy snow showers', icon: cloudPairIcon },
		95: { text: 'Thunderstorm', icon: cloudPairIcon },
		96: { text: 'Thunderstorm with slight hail', icon: cloudPairIcon },
		99: { text: 'Thunderstorm with heavy hail', icon: cloudPairIcon }
	};

	const describeWeather = (code) => weatherCodeMap[code] || { text: 'Unknown', icon: cloudIcon };

	// Open-Meteo returns local ISO datetimes like "2026-08-16T06:12"
	const formatTime = (isoDateTime) => (isoDateTime || '').split('T')[1] || '';

	// AJAX function
	async function getForecast() {
		const userInput = $input.value;

		try {
			const geoResponse = await fetch(`${geocodeUrl}?name=${encodeURIComponent(userInput)}&count=1&language=en&format=json`);
			if (!geoResponse.ok) throw new Error('Geocoding request failed!');
			const geoJson = await geoResponse.json();
			if (!geoJson.results || !geoJson.results.length) throw new Error('Location not found!');
			const place = geoJson.results[0];

			const params = new URLSearchParams({
				latitude: place.latitude,
				longitude: place.longitude,
				daily: 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset',
				timezone: 'auto',
				forecast_days: 7
			});

			let response = await fetch(`${forecastUrl}?${params}`);
			if (response.ok) {
				let jsonResponse = await response.json();
				let days = jsonResponse.daily.time.map((date, index) => ({
					date,
					day: {
						condition: describeWeather(jsonResponse.daily.weathercode[index]),
						maxtemp_c: Math.round(jsonResponse.daily.temperature_2m_max[index]),
						mintemp_c: Math.round(jsonResponse.daily.temperature_2m_min[index])
					},
					astro: {
						sunrise: formatTime(jsonResponse.daily.sunrise[index]),
						sunset: formatTime(jsonResponse.daily.sunset[index])
					}
				}));
				let location = { name: [place.name, place.admin1, place.country].filter(Boolean).join(', ') };
				let weatherData = [days, location];
				return weatherData;
			}
			throw new Error('Request failed!');
		} catch (error) {
			console.log(error);
		}
	}

	const renderForecast = (weatherData) => {
		weatherData[0].map((item, index) => {
			const weekDayDate = new Date(item.date);
			const weekDay = weekDayDate.getDay();

			let weatherContent =
					`<div class="weather-container">
						<div class="weather">
							<div class="weather-face weather-face--front">
								<div class="weather-face--front---inner">
									<h2>${weekDays[weekDay]}</h2>
									<h3>${item.date.replace(/-/g, '/')}</h3>
									<p>${item.day.condition.text}</p>
									<img src="${item.day.condition.icon}" class="weathericon" />
								</div>
							</div>
							<div class="weather-face weather-face--back">
								<div class="weather-face--back---inner">
									<p> High: ${item.day.maxtemp_c} &deg;C </p>
									<p> Low: ${item.day.mintemp_c} &deg;C</p>
									<p> Sunrise: ${item.astro.sunrise} </p>
									<p> Sunset: ${item.astro.sunset} </p>
								</div>
							</div>
						</div>
					</div>`;

			$weather.innerHTML += weatherContent;
		});

		$location.innerHTML = `${weatherData[1].name}`;
	}

	// display content on submit
	const searchWeather = () => {
		$weather.innerHTML = "";

		getForecast().then(weatherData => renderForecast(weatherData)).then(() => {
			$container.style.display = "block";
			$container.style.opacity = 1;
			new ForecastPanels();
			new ShapesAnimation("#contentLeftCanvas", "#b05261");
		});

	}

	$submit.addEventListener('click', searchWeather, false);

}
