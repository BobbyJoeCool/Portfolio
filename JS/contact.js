// Contact page: builds the connect list from the shared footer links and
// sends the form through Web3Forms (https://web3forms.com), which emails it to
// contactEmail. The site has no backend, so until an access key is set the form
// falls back to opening the visitor's email app with a pre-filled message.

const contactEmail = "bob@bobbyjoecool.dev";

// Web3Forms access key for contactEmail. It is safe to publish: it can only
// send mail to the address it was created for.
const web3formsAccessKey = "a0973ea6-b38b-4d66-8774-ce532dfa9dc0";

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

	if (!web3formsAccessKey) {
		openMailto({ name, email, subject, message });
		status.textContent = "Opening your email app to send the message…";
		status.className = "contact-status success";
		return;
	}

	sendMessage(form, { name, email, subject, message });
}

// The scheme and address are fixed; visitor text only ever lands in the
// percent-encoded query string, so it can't change where the link goes.
function openMailto({ name, email, subject, message }) {
	const body = `${message}\n\n— ${name} (${email})`;
	const href =
		`mailto:${contactEmail}` +
		`?subject=${encodeURIComponent(subject)}` +
		`&body=${encodeURIComponent(body)}`;

	if (new URL(href).protocol !== "mailto:") return;

	const link = document.createElement("a");
	link.href = href;
	link.click();
}

async function sendMessage(form, fields) {
	const status = document.getElementById("contact-status");
	const button = form.querySelector('button[type="submit"]');

	button.disabled = true;
	status.textContent = "Sending…";
	status.className = "contact-status";

	try {
		const response = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				access_key: web3formsAccessKey,
				subject: `Portfolio contact: ${fields.subject}`,
				from_name: "bobbyjoecool.dev contact form",
				name: fields.name,
				email: fields.email,
				message: fields.message,
				botcheck: form.botcheck.checked,
			}),
		});
		const result = await response.json();
		if (!response.ok || !result.success) throw new Error(result.message);

		form.reset();
		form.classList.remove("submitted");
		status.textContent =
			"Thanks! Your message was sent. I'll get back to you soon.";
		status.className = "contact-status success";
	} catch {
		const fallback = document.createElement("a");
		fallback.href = `mailto:${contactEmail}`;
		fallback.textContent = contactEmail;
		status.replaceChildren(
			"Sorry, the message couldn't be sent. Please try again, or email me at ",
			fallback,
			".",
		);
		status.className = "contact-status error";
	} finally {
		button.disabled = false;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	renderContactLinks();
	document
		.getElementById("contact-form")
		?.addEventListener("submit", handleContactSubmit);
});
