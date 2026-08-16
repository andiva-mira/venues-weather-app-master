import Snap from './snapLoader';

// modified from http://svg.dabbles.info/snaptut-loadmulti
class SvgLoad {
	constructor(canvas, list) {
		this.canvas = Snap(canvas); // id  of svg container 
		this.list = list; // array of img paths
		this.svgList = [];
		this.loadSvgList();
	}

	loadSvgList() {
		const $this = this; // keep reference to "this"
		this.list.map((item, index) => {
			Snap.load(item, function(itemFragment) {
				item = itemFragment;
				$this.svgList.push(item);
				$this.canvas.append($this.svgList[index]);
			});
		});
	}
}

export default SvgLoad;