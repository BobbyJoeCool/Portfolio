/*
Masonry layout for card grids (any element with class "masonry-grid").
Cards keep their natural height and pack upward into the next open spot, so a
short card never leaves a gap beside a tall one. The grid uses 1px rows; each
card spans as many rows as its height plus the gap, which keeps the reading
order left to right. Without JavaScript the grid stays the plain flex rows.
*/
(function () {
	if (!("ResizeObserver" in window)) return;

	document.querySelectorAll(".masonry-grid").forEach((grid) => {
		grid.classList.add("masonry");

		let queued = false;

		function layout() {
			queued = false;
			const gap = parseFloat(getComputedStyle(grid).columnGap) || 0;
			for (const card of grid.children) {
				card.style.gridRowEnd = "span " + Math.ceil(card.offsetHeight + gap);
			}
		}

		function queueLayout() {
			if (queued) return;
			queued = true;
			requestAnimationFrame(layout);
		}

		const observer = new ResizeObserver(queueLayout);
		observer.observe(grid);
		for (const card of grid.children) observer.observe(card);

		layout();
	});
})();
