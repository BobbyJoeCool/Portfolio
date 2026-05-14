const navLinks = [
	{ href: "index.html", label: "Home" },
	{ href: "about.html", label: "About" },
	{ href: "#", label: "Work" },
	{ href: "education.html", label: "Education" },
	{ href: "projects.html", label: "Projects" },
	{ href: "#", label: "Community" },
	{ href: "#", label: "Contact" },
];

const footerLinks = [
	{
		href: "mailto:rbreutzmann@my365.bellevue.edu",
		img: "Assets/icons/Email.png",
		alt: "Email",
	},
	{
		href: "https://github.com/BobbyJoeCool",
		img: "Assets/icons/GitHub.png",
		alt: "GitHub",
	},
	{
		href: "https://www.linkedin.com/in/robert-breutzmann-8a6b81164",
		img: "Assets/icons/LinkedIn.png",
		alt: "LinkedIn",
	},
	{
		href: "https://www.facebook.com/bobslenscraft",
		img: "Assets/icons/Facebook.png",
		alt: "Facebook",
	},
	{
		href: "https://www.instagram.com/robertbreutzmann/",
		img: "Assets/icons/Instagram.png",
		alt: "Instagram",
	},
	{
		href: "https://www.threads.com/@robertbreutzmann",
		img: "Assets/icons/Threads.png",
		alt: "Threads",
	},
	{
		href: "https://bsky.app/profile/bobbyjoecool.bsky.social",
		img: "Assets/icons/BlueSky.png",
		alt: "BlueSky",
	},
	{
		href: "https://discord.com/users/BobyJoeCool",
		img: "Assets/icons/Discord.png",
		alt: "Discord",
	},
];

function getCurrentPageName() {
	const path = window.location.pathname.replace(/\\/g, "/");
	const page = path.substring(path.lastIndexOf("/") + 1);
	return page === "" ? "index.html" : page;
}

function renderHeader() {
	const currentPage = getCurrentPageName();
	return `
    <header>
      <nav>
        ${navLinks
					.map(
						(link) => `
              <a href="${link.href}" class="${link.href === currentPage ? "active" : ""}">
                ${link.label}
              </a>`,
					)
					.join("")}
      </nav>
    </header>
  `;
}

function renderFooter() {
	return `
    <footer>
      <p>© 2026 Robert Breutzmann</p>
      <p>
        ${footerLinks
					.map(
						(link) => `
              <a href="${link.href}" target="${link.href.startsWith("http") ? "_blank" : "_self"}" rel="${link.href.startsWith("http") ? "noopener noreferrer" : ""}">
                <img src="${link.img}" alt="${link.alt}" />
              </a>`,
					)
					.join("")}
      </p>
    </footer>
  `;
}

function injectPageShell() {
	const headerContainer = document.getElementById("site-header");
	const footerContainer = document.getElementById("site-footer");

	if (headerContainer) {
		headerContainer.innerHTML = renderHeader();
	}

	if (footerContainer) {
		footerContainer.innerHTML = renderFooter();
	}
}

document.addEventListener("DOMContentLoaded", injectPageShell);
