document.addEventListener("DOMContentLoaded", function () {


    /* =========================================================
       RTL / LTR
    ========================================================= */

    const rtlBtn = document.getElementById("rtlBtn");
    const mobileRtlBtn = document.getElementById("mobileRtlBtn");


    function updateRtlButtons(isRTL) {

        if (rtlBtn) {
            rtlBtn.textContent = isRTL ? "LTR" : "RTL";
        }

        if (mobileRtlBtn) {
            mobileRtlBtn.textContent = isRTL ? "LTR" : "RTL";
        }

    }


    function setDirection(isRTL) {

        document.documentElement.setAttribute(
            "dir",
            isRTL ? "rtl" : "ltr"
        );

        document.body.classList.toggle(
            "rtl",
            isRTL
        );

        localStorage.setItem(
            "direction",
            isRTL ? "rtl" : "ltr"
        );

        updateRtlButtons(isRTL);

    }


    const savedDirection =
        localStorage.getItem("direction");

    setDirection(
        savedDirection === "rtl"
    );


    function toggleDirection() {

        const isCurrentlyRTL =
            document.documentElement.getAttribute("dir") === "rtl";

        setDirection(
            !isCurrentlyRTL
        );

    }


    if (rtlBtn) {

        rtlBtn.addEventListener(
            "click",
            toggleDirection
        );

    }


    if (mobileRtlBtn) {

        mobileRtlBtn.addEventListener(
            "click",
            toggleDirection
        );

    }



    /* =========================================================
       DARK / LIGHT THEME
    ========================================================= */

    const themeBtns =
        document.querySelectorAll(".theme-btn");


    function updateThemeIcons(isDark) {

        themeBtns.forEach(function (button) {

            const icon =
                button.querySelector("i");

            if (!icon) return;


            if (isDark) {

                icon.classList.remove(
                    "fa-moon"
                );

                icon.classList.add(
                    "fa-sun"
                );

            } else {

                icon.classList.remove(
                    "fa-sun"
                );

                icon.classList.add(
                    "fa-moon"
                );

            }

        });

    }


    const savedTheme =
        localStorage.getItem("theme");


    const isDarkSaved =
        savedTheme === "dark";


    document.body.classList.toggle(
        "dark-mode",
        isDarkSaved
    );


    updateThemeIcons(
        isDarkSaved
    );


    themeBtns.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const isDark =
                    document.body.classList.toggle(
                        "dark-mode"
                    );


                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );


                updateThemeIcons(
                    isDark
                );

            }
        );

    });



    /* =========================================================
       CURRENT PAGE ACTIVE NAVIGATION
    ========================================================= */

    let currentPage =
        window.location.pathname.split("/").pop();


    /*
       If URL is just:
       /
       or
       empty
       treat it as index.html
    */

    if (
        currentPage === "" ||
        currentPage === "/"
    ) {
        currentPage = "index.html";
    }


    /* =========================================================
       DESKTOP NAVIGATION ACTIVE
    ========================================================= */

    const desktopNavLinks =
        document.querySelectorAll(
            ".nav-menu .nav-link"
        );


    const desktopDropdownLinks =
        document.querySelectorAll(
            ".dropdown-menu a"
        );


    /* Remove old active classes */

    desktopNavLinks.forEach(function (link) {

        link.classList.remove(
            "active"
        );

    });


    desktopDropdownLinks.forEach(function (link) {

        link.classList.remove(
            "active"
        );

    });


    let isHomePage = false;


    /* Check normal navigation links */

    desktopNavLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (href === currentPage) {

            link.classList.add(
                "active"
            );

        }

    });


    /* Check Home dropdown links */

    desktopDropdownLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (href === currentPage) {

            link.classList.add(
                "active"
            );

            isHomePage = true;

        }

    });


    /*
       If Home 1 or Home 2 is active,
       make main Home link active too.
    */

    if (isHomePage) {

        const homeLink =
            document.querySelector(
                ".home-link"
            );


        if (homeLink) {

            homeLink.classList.add(
                "active"
            );

        }

    }



    /* =========================================================
       MOBILE MENU
    ========================================================= */

    const hamburgerBtn =
        document.getElementById(
            "hamburgerBtn"
        );


    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    function closeMobileMenu() {

        if (!mobileMenu) return;


        mobileMenu.classList.remove(
            "show"
        );


        if (hamburgerBtn) {

            hamburgerBtn.setAttribute(
                "aria-expanded",
                "false"
            );


            hamburgerBtn.setAttribute(
                "aria-label",
                "Open menu"
            );


            const icon =
                hamburgerBtn.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }


    if (
        hamburgerBtn &&
        mobileMenu
    ) {

        hamburgerBtn.addEventListener(
            "click",
            function () {

                const isOpen =
                    mobileMenu.classList.toggle(
                        "show"
                    );


                hamburgerBtn.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                hamburgerBtn.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close menu"
                        : "Open menu"
                );


                const icon =
                    hamburgerBtn.querySelector("i");


                if (icon) {

                    if (isOpen) {

                        icon.classList.remove(
                            "fa-bars"
                        );

                        icon.classList.add(
                            "fa-xmark"
                        );

                    } else {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }
        );


        /* =========================================
           MOBILE NORMAL LINKS
        ========================================= */

        const mobileLinks =
            mobileMenu.querySelectorAll(
                "a"
            );


        mobileLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMobileMenu();

                }
            );

        });

    }



    /* =========================================================
       MOBILE HOME DROPDOWN
    ========================================================= */

    const mobileHomeToggle =
        document.getElementById(
            "mobileHomeToggle"
        );


    const mobileHomeDropdown =
        document.getElementById(
            "mobileHomeDropdown"
        );


    if (
        mobileHomeToggle &&
        mobileHomeDropdown
    ) {

        mobileHomeToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    mobileHomeDropdown.classList.toggle(
                        "show"
                    );


                mobileHomeToggle.classList.toggle(
                    "open",
                    isOpen
                );

            }
        );

    }



    /* =========================================================
       MOBILE ACTIVE PAGE
    ========================================================= */

    const mobileMenuLinks =
        document.querySelectorAll(
            ".mobile-menu a"
        );


    mobileMenuLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (href === currentPage) {

            link.classList.add(
                "active"
            );

        }

    });



    /* =========================================================
       MOBILE HOME ACTIVE
    ========================================================= */

    if (isHomePage) {

        if (mobileHomeToggle) {

            mobileHomeToggle.classList.add(
                "active"
            );

        }


        /*
           Automatically open Home dropdown
           when Home 1 or Home 2 is current page
        */

        if (mobileHomeDropdown) {

            mobileHomeDropdown.classList.add(
                "show"
            );

        }


        if (mobileHomeToggle) {

            mobileHomeToggle.classList.add(
                "open"
            );

        }

    }



    /* =========================================================
       CLOSE MOBILE MENU ON RESIZE
    ========================================================= */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 768) {

                closeMobileMenu();

            }

        }
    );

});


    /* =========================================================
       ABOUT IMAGE REVEAL
    ========================================================= */

    const aboutImage =
        document.querySelector(".about-image");


    if (aboutImage && "IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            aboutImage.classList.add("show");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.2
                }
            );

        observer.observe(aboutImage);

    }



    /* =========================================================
       HERO SLIDER
    ========================================================= */

    const heroSlides =
        document.querySelectorAll(".hero-slide");

    const heroCurrent =
        document.querySelector(".hero-current");


    if (heroSlides.length > 1) {

        let heroIndex = 0;


        function changeHeroSlide() {

            heroSlides[heroIndex].classList.remove("active");


            heroIndex++;


            if (heroIndex >= heroSlides.length) {
                heroIndex = 0;
            }


            heroSlides[heroIndex].classList.add("active");


            if (heroCurrent) {

                heroCurrent.textContent =
                    String(heroIndex + 1).padStart(2, "0");

            }

        }


        setInterval(changeHeroSlide, 6000);

    }



    /* =========================================================
       LUCIDE ICONS
    ========================================================= */

    if (
        typeof lucide !== "undefined" &&
        typeof lucide.createIcons === "function"
    ) {

        lucide.createIcons();

    }



    /* =========================================================
       TESTIMONIAL SLIDER
    ========================================================= */

    const testimonialSlides =
        document.querySelectorAll(".testimonial-slide");

    const testimonialDots =
        document.querySelectorAll(".testimonial-dot");

    const testimonialPrev =
        document.querySelector(".testimonial-prev");

    const testimonialNext =
        document.querySelector(".testimonial-next");


    if (testimonialSlides.length > 0) {

        let testimonialIndex = 0;
        let testimonialAutoSlide;


        function showTestimonial(index) {

            if (index >= testimonialSlides.length) {

                testimonialIndex = 0;

            } else if (index < 0) {

                testimonialIndex =
                    testimonialSlides.length - 1;

            } else {

                testimonialIndex = index;

            }


            testimonialSlides.forEach(
                function (slide, i) {

                    slide.classList.toggle(
                        "active",
                        i === testimonialIndex
                    );

                }
            );


            testimonialDots.forEach(
                function (dot, i) {

                    dot.classList.toggle(
                        "active",
                        i === testimonialIndex
                    );

                }
            );

        }


        function nextTestimonial() {

            showTestimonial(
                testimonialIndex + 1
            );

        }


        function prevTestimonial() {

            showTestimonial(
                testimonialIndex - 1
            );

        }


        function startTestimonialAutoSlide() {

            testimonialAutoSlide =
                setInterval(
                    nextTestimonial,
                    6000
                );

        }


        function resetTestimonialAutoSlide() {

            clearInterval(
                testimonialAutoSlide
            );

            startTestimonialAutoSlide();

        }


        if (testimonialNext) {

            testimonialNext.addEventListener(
                "click",
                function () {

                    nextTestimonial();
                    resetTestimonialAutoSlide();

                }
            );

        }


        if (testimonialPrev) {

            testimonialPrev.addEventListener(
                "click",
                function () {

                    prevTestimonial();
                    resetTestimonialAutoSlide();

                }
            );

        }


        testimonialDots.forEach(
            function (dot, index) {

                dot.addEventListener(
                    "click",
                    function () {

                        showTestimonial(index);

                        resetTestimonialAutoSlide();

                    }
                );

            }
        );


        showTestimonial(0);

        startTestimonialAutoSlide();

    }



    /* =========================================================
       ARCHITECTURE IMAGE SLIDER
    ========================================================= */

    const architectureSlides =
        document.querySelectorAll(".architecture-slide");

    const architectureNext =
        document.querySelector(".architecture-next");

    const architecturePrev =
        document.querySelector(".architecture-prev");

    const architectureCurrent =
        document.querySelector(".architecture-current");


    if (architectureSlides.length > 0) {

        let architectureIndex = 0;
        let architectureAutoSlide;


        function showArchitectureSlide(index) {

            architectureSlides.forEach(
                function (slide) {

                    slide.classList.remove("active");

                }
            );


            architectureIndex =
                (index + architectureSlides.length)
                % architectureSlides.length;


            architectureSlides[
                architectureIndex
            ].classList.add("active");


            if (architectureCurrent) {

                architectureCurrent.textContent =
                    String(
                        architectureIndex + 1
                    ).padStart(2, "0");

            }

        }


        function nextArchitectureSlide() {

            showArchitectureSlide(
                architectureIndex + 1
            );

        }


        function prevArchitectureSlide() {

            showArchitectureSlide(
                architectureIndex - 1
            );

        }


        function startArchitectureAutoSlide() {

            architectureAutoSlide =
                setInterval(
                    nextArchitectureSlide,
                    5000
                );

        }


        function resetArchitectureAutoSlide() {

            clearInterval(
                architectureAutoSlide
            );

            startArchitectureAutoSlide();

        }


        if (architectureNext) {

            architectureNext.addEventListener(
                "click",
                function () {

                    nextArchitectureSlide();

                    resetArchitectureAutoSlide();

                }
            );

        }


        if (architecturePrev) {

            architecturePrev.addEventListener(
                "click",
                function () {

                    prevArchitectureSlide();

                    resetArchitectureAutoSlide();

                }
            );

        }


        showArchitectureSlide(0);

        startArchitectureAutoSlide();

    }



    /* =========================================================
       FAQ ACCORDION
       ONLY ONE FAQ OPEN AT A TIME
    ========================================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");


    if (faqItems.length > 0) {

        faqItems.forEach(function (item) {

            const question =
                item.querySelector(".faq-question");


            if (!question) return;


            question.addEventListener(
                "click",
                function () {

                    const isActive =
                        item.classList.contains("active");


                    /* Close all */
                    faqItems.forEach(
                        function (otherItem) {

                            otherItem.classList.remove(
                                "active"
                            );

                        }
                    );


                    /* Open clicked item */
                    if (!isActive) {

                        item.classList.add("active");

                    }

                }
            );

        });

    }

  document.addEventListener("DOMContentLoaded", function () {
        lucide.createIcons();
    });