import Snap from './snapLoader';

export function WheelAnimation() {

	const s = Snap("#london-eye");
	
	Snap.load("../images/wheel2.svg", onSvgLoaded);

	function onSvgLoaded(svgFragment) {
		const wheel = svgFragment.select("svg");
		const cabins = wheel.select("#cabins");
		const bbox = cabins.getBBox();

		function rotateWheel() {
			cabins.transform( "s1" + "r0," + bbox.cx + ',' + bbox.cy + "t0");
			cabins.animate({ transform: "s1" + "r360," + bbox.cx + ',' + bbox.cy + "t0" }, 1000, mina.linear, rotateWheel);

		}

		rotateWheel();

		s.append(svgFragment);
		
	}


}