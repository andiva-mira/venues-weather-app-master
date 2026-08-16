import Snap from './snapLoader';

class ShapesAnimation {
	constructor(canvas, color) {
		this.canvas = Snap(canvas);
		this.color = color;
		this.cloneSvgShapes();
		this.fadeInSvgShape();
	}


	cloneSvgShapes() {
		const that = this;

		// a new ShapesAnimation runs on every search; without clearing
		// clones left over from a previous run, selectAll("svg") below
		// would re-clone those clones too, growing the canvas
		// exponentially (30 -> 300 -> 3000+ elements) across repeat searches
		this.canvas.selectAll("svg").forEach((item) => {
			if (/-\d+$/.test(item.attr("id") || "")) {
				item.remove();
			}
		});

		const svg = this.canvas.selectAll("svg");
		let clonedItem;
		let clonedItemPaths;


		svg.forEach((item,index) => {
			const svgId = item.attr("id");

			//set the stroke color to the original svg images
			let paths = item.selectAll("path");
			paths.attr({
				stroke: that.color
			});

			// clone svg 9 times
			for (let i = 0; i < 9; i++) {

				clonedItem = item.clone();
				clonedItemPaths = clonedItem.selectAll("path");

				clonedItem.attr({
					id: `${svgId}-${i + 1}`,
					class: `${svgId} ${svgId}--${i + 1}`				
				});

				clonedItemPaths.attr({
					stroke: that.color,
					strokeOpacity: 0
				});

			}

		});

	}


	fadeInSvgShape() {
		const svg = this.canvas.selectAll("svg");

		const randomRange = (min, max) => {
			return Math.floor( Math.random() * (max - min) + min);

		};
		
		svg.forEach((item, index) => {
			let paths = item.selectAll("path");
			let group = item.g(paths);
			const bbox = item.getBBox();


			setTimeout(() => {
				paths.animate({strokeOpacity: .5}, 1000, mina.bounce, () => {

					const animateShapes = () => {
						// once a previous search's clone has been removed
						// from the DOM (see cloneSvgShapes), stop this loop
						// instead of animating a detached node forever
						if (!item.node.isConnected) return;

						item.animate({transform: `T${randomRange(50,850)}, ${randomRange(25,50)}`}, 40000, mina.linear, () => {
							if (!item.node.isConnected) return;
							item.animate({transform:`T${bbox.x},${bbox.y}`}, 40000, mina.linear, animateShapes);

						});
					};

					animateShapes();

				});
			}, 2000); 
		});

	}

}


export default ShapesAnimation;