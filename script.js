let currentPage =
    window.location.pathname.split("/").pop();

if (
    currentPage === "" ||
    currentPage === "/"
) {
    currentPage = "index.html";
}

const desktopNavLinks =
    document.querySelectorAll(
        ".nav-menu .nav-link"
    );

const desktopDropdownLinks =
    document.querySelectorAll(
        ".dropdown-menu a"
    );

desktopNavLinks.forEach(function (link) {
    link.classList.remove("active");
});

desktopDropdownLinks.forEach(function (link) {
    link.classList.remove("active");
});

let isHomePage = false;

desktopNavLinks.forEach(function (link) {
    const href =
        link.getAttribute("href");

    if (href === currentPage) {
        link.classList.add("active");
    }
});

desktopDropdownLinks.forEach(function (link) {
    const href =
        link.getAttribute("href");

    if (href === currentPage) {
        link.classList.add("active");
        isHomePage = true;
    }
});

if (isHomePage) {
    const homeLink =
        document.querySelector(
            ".home-link"
        );

    if (homeLink) {
        homeLink.classList.add("active");
    }
}