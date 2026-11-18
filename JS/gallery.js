// Featured project screenshots: clicking a thumbnail opens it full size in a
// <dialog>, with previous/next through that project's screenshots.
// Keyboard: Esc closes (native to <dialog>), Left/Right arrows step through.

(function () {
	const lightbox = document.getElementById("lightbox");
	if (!lightbox) return;

	const image = lightbox.querySelector("img");
	const caption = lightbox.querySelector("figcaption");
	const prevButton = lightbox.querySelector(".lightbox-nav.prev");
	const nextButton = lightbox.querySelector(".lightbox-nav.next");

	let thumbs = [];
	let index = 0;

	function show(i) {
		index = (i + thumbs.length) % thumbs.length;
		const thumb = thumbs[index];
		image.src = thumb.dataset.full;
		image.alt = thumb.querySelector("img").alt;
		caption.textContent = `${thumb.dataset.caption} (${index + 1} of ${thumbs.length})`;
	}

	function open(thumb) {
		thumbs = [...thumb.closest(".project-gallery").querySelectorAll(".gallery-thumb")];
		const single = thumbs.length < 2;
		prevButton.hidden = single;
		nextButton.hidden = single;
		show(thumbs.indexOf(thumb));
		lightbox.showModal();
	}

	document.querySelectorAll(".gallery-thumb").forEach((thumb) => {
		thumb.addEventListener("click", () => open(thumb));
	});

	prevButton.addEventListener("click", () => show(index - 1));
	nextButton.addEventListener("click", () => show(index + 1));
	lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());

	// Clicking the dark backdrop (the dialog itself, not its contents) closes it
	lightbox.addEventListener("click", (event) => {
		if (event.target === lightbox) lightbox.close();
	});

	lightbox.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft") show(index - 1);
		if (event.key === "ArrowRight") show(index + 1);
	});

	// Return focus to the page and drop the large image when closed
	lightbox.addEventListener("close", () => {
		thumbs[index]?.focus();
		image.removeAttribute("src");
	});
})();

// Silent demo videos: each <figure class="demo-video" data-src="..."> stays
// hidden until its video file actually loads, so a slot with no file yet
// shows nothing.
document.querySelectorAll(".demo-video[data-src]").forEach((figure) => {
	const video = document.createElement("video");
	video.muted = true;
	video.loop = true;
	video.playsInline = true;
	video.controls = true;
	video.preload = "metadata";
	video.setAttribute("aria-label", figure.querySelector("figcaption")?.textContent || "Demo video");
	video.addEventListener("loadedmetadata", () => {
		figure.hidden = false;
	});
	video.src = figure.dataset.src;
	figure.prepend(video);
});
