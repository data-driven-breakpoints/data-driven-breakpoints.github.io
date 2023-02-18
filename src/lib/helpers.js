const fitRect = function (inner, outer) {
	// returns scale and translate for fitting the inner rectangle
	// into the outer rectangle, centered at maximum size possible
	// inner = [width, height]
	// outer = [width, height]
	let innerAR = inner[0] / inner[1];
	let outerAR = outer[0] / outer[1];
	let s, t;
	if (innerAR > outerAR) {
		s = outer[0] / inner[0];
		t = [0, (outer[1] - s * inner[1]) / 2];
	} else {
		s = outer[1] / inner[1];
		t = [(outer[0] - s * inner[0]) / 2, 0];
	}
	return { s, t };
};

const getAreaSize = function (feature, path) {
	// Find the size of the largest polygon in sq px
	// Source: https://observablehq.com/d/47c257e62a34b61d
	const geometry = feature.geometry;
	if (geometry.type === 'Polygon') {
		return path.area(feature);
	} else {
		let largestPolygon = {},
			largestArea = 0;
		geometry.coordinates.forEach((coordinates) => {
			const polygon = { type: 'Polygon', coordinates },
				area = path.area(polygon);
			if (area > largestArea) {
				largestPolygon = polygon;
				largestArea = area;
			}
		});
		return path.area(largestPolygon);
	}
};

export { fitRect, getAreaSize };
