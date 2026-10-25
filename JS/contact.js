// Contact page: builds the connect list from the shared footer links
// and turns the form into a pre-filled email (the site has no backend).

const contactEmail = "rbreutzmann@my365.bellevue.edu";

function renderContactLinks() {
	const list = document.getElementById("contact-links");
	if (!list) return;

	list.innerHTML = footerLinks
		.map((link) => {
			const external = link.href.startsWith("http");
			return `
        <li>
          <a href="${link.href}" class="contact-link" ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
            <img src="${link.img}" alt="" />
            <span>${link.alt}</span>
          </a>
        </li>`;
		})
		.join("");
}

function handleContactSubmit(event) {
	event.preventDefault();
	const form = event.target;
	const status = document.getElementById("contact-status");

	if (!form.checkValidity()) {
		form.classList.add("submitted");
		status.textContent = "Please fill out every field with a valid email.";
		status.className = "contact-status error";
		return;
	}

	const name = form.name.value.trim();
	const email = form.email.value.trim();
	const subject = form.subject.value.trim();
	const message = form.message.value.trim();
	const body = `${message}\n\n— ${name} (${email})`;

	window.location.href =
		`mailto:${contactEmail}` +
		`?subject=${encodeURIComponent(subject)}` +
		`&body=${encodeURIComponent(body)}`;

	status.textContent = "Opening your email app to send the message…";
	status.className = "contact-status success";
}

document.addEventListener("DOMContentLoaded", () => {
	renderContactLinks();
	document
		.getElementById("contact-form")
		?.addEventListener("submit", handleContactSubmit);
});
