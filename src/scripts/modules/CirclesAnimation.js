import Snap from './snapLoader';

export const CirclesAnimation = () => {
	const s = Snap("#svg-mask");
	let circle = s.select(".circle");
	const $submit = document.getElementById('button');


	const randomRange = (min, max) => {
		return Math.floor( Math.random() * (max - min) + min);

	};

	const cloneCircle = () => {
		for (let i = 1; i < 7; i++) {
			circle.clone().attr({
				stroke: '#000',
				strokeMiterlimit: 10,
				cx: i * 5 + (Math.floor((Math.random() * 1300) + 1)),
				cy: i * 3 + (Math.floor((Math.random() * 710) + 1)),
				r: randomRange(50, 130)
			});
		}
	};
		
	window.onload = () => {
		cloneCircle();
	}


	const eventHandler = () => {
		circle = s.selectAll(".circle");

		setTimeout(() => {
			const content = document.getElementById('content');

			circle.animate({ r: 1200 }, 500, mina.easing, () => {
				circle.animate({r:0}, 1000, mina.easing, () => {
					content.classList.add("is-content-visible");
					document.querySelector(".svg-clipped").style.visibility = "hidden";	
				});
						
			});

		}, 100);
	}


	$submit.addEventListener("click", () => {
		eventHandler();
	}, false);

}

