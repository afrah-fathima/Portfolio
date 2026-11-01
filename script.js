
/* ============================================================
   AFRAH FATHIMA — PREMIUM PROFESSIONAL PORTFOLIO
   Complete JavaScript
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* ========================================================
       1. TYPING ANIMATION
    ======================================================== */

    const typingText = document.getElementById("typing-text");

    if (typingText) {

        const roles = [
            "Full Stack Developer",
            "Software Developer",
            "Web Developer",
            "Frontend Developer",
            "Backend Developer",
            "PHP Developer",
            "Laravel Developer",
            "Python Developer",
            "Problem Solver",
            "Technology Enthusiast"
        ];

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeRole() {

            const currentRole = roles[roleIndex];

            typingText.textContent = currentRole.substring(
                0,
                characterIndex
            );

            if (!deleting) {

                characterIndex++;

                if (characterIndex > currentRole.length) {

                    deleting = true;

                    setTimeout(typeRole, 1400);

                    return;
                }

            } else {

                characterIndex--;

                if (characterIndex < 0) {

                    characterIndex = 0;
                    deleting = false;

                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            setTimeout(
                typeRole,
                deleting ? 45 : 90
            );
        }

        typeRole();
    }


    /* ========================================================
       2. SCROLL PROGRESS BAR
    ======================================================== */

    const progressBar = document.createElement("div");

    progressBar.id = "scrollProgress";

    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(
            90deg,
            #b89563,
            #e5c99b
        );
        z-index: 999999;
        transition: width 0.1s linear;
    `;

    document.body.appendChild(progressBar);

    function updateProgress() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage = documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

        progressBar.style.width = percentage + "%";
    }

    window.addEventListener("scroll", updateProgress, {
        passive: true
    });

    updateProgress();


    /* ========================================================
       3. SCROLL REVEAL ANIMATIONS
    ======================================================== */

    const revealElements = document.querySelectorAll(`
        .section-heading,
        .about-text,
        .about-image,
        .education-card,
        .experience-card,
        .skill-category,
        .project-card,
        .certificate-card,
        .contact-info,
        .contact-form
    `);

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("active");
        });
    }


    /* ========================================================
       4. INDIVIDUAL SKILL DESCRIPTION POPUP
       Uses your actual HTML:
       .skill-tag
       data-title
       data-description
    ======================================================== */

    const skillButtons = document.querySelectorAll(
        "#skills .skill-tag"
    );

    if (skillButtons.length > 0) {

        const tooltip = document.createElement("div");

        tooltip.className = "skill-tooltip";

        tooltip.setAttribute("role", "tooltip");

        tooltip.innerHTML = `
            <h4 class="skill-tooltip-title"></h4>

            <p class="skill-tooltip-description"></p>

            <span class="skill-tooltip-label">
                TECHNICAL EXPERTISE
            </span>
        `;

        document.body.appendChild(tooltip);

        const tooltipTitle = tooltip.querySelector(
            ".skill-tooltip-title"
        );

        const tooltipDescription = tooltip.querySelector(
            ".skill-tooltip-description"
        );

        let activeSkill = null;

        let hideTimer = null;

        function positionSkillTooltip(button) {

            const rect = button.getBoundingClientRect();

            const tooltipWidth = Math.min(
                340,
                window.innerWidth - 30
            );

            tooltip.style.width = tooltipWidth + "px";

            tooltip.style.left = "15px";
            tooltip.style.top = "10px";

            const tooltipHeight = tooltip.offsetHeight;

            let left =
                rect.left +
                rect.width / 2 -
                tooltipWidth / 2;

            left = Math.max(
                15,
                Math.min(
                    left,
                    window.innerWidth - tooltipWidth - 15
                )
            );

            let top = rect.top - tooltipHeight - 12;

            if (top < 10) {
                top = rect.bottom + 12;
            }

            top = Math.min(
                top,
                window.innerHeight - tooltipHeight - 10
            );

            top = Math.max(10, top);

            tooltip.style.left = left + "px";
            tooltip.style.top = top + "px";
        }

        function showSkill(button) {

            clearTimeout(hideTimer);

            const skillName = button.dataset.title;
            const skillDescription = button.dataset.description;

            if (!skillName || !skillDescription) {
                return;
            }

            if (activeSkill && activeSkill !== button) {
                activeSkill.classList.remove("skill-selected");
            }

            activeSkill = button;

            tooltipTitle.textContent = skillName;

            tooltipDescription.textContent = skillDescription;

            button.classList.add("skill-selected");

            tooltip.classList.add("visible");

            positionSkillTooltip(button);
        }

        function hideSkill(button) {

            if (activeSkill !== button) {
                return;
            }

            clearTimeout(hideTimer);

            hideTimer = setTimeout(function () {

                if (activeSkill === button) {

                    button.classList.remove("skill-selected");

                    tooltip.classList.remove("visible");

                    activeSkill = null;
                }

            }, 100);
        }

        skillButtons.forEach(button => {

            button.setAttribute(
                "aria-describedby",
                "skill-description-tooltip"
            );

            button.setAttribute(
                "aria-label",
                button.dataset.title +
                ": " +
                button.dataset.description
            );

            // Desktop hover
            button.addEventListener("mouseenter", function () {
                showSkill(button);
            });

            button.addEventListener("mouseleave", function () {
                hideSkill(button);
            });

            // Keyboard support
            button.addEventListener("focus", function () {
                showSkill(button);
            });

            button.addEventListener("blur", function () {
                hideSkill(button);
            });

            // Mobile tap
            button.addEventListener("click", function (event) {

                event.stopPropagation();

                if (activeSkill === button) {

                    button.classList.remove("skill-selected");

                    tooltip.classList.remove("visible");

                    activeSkill = null;

                } else {

                    showSkill(button);
                }

            });

        });

        tooltip.id = "skill-description-tooltip";

        // Hide popup when clicking elsewhere
        document.addEventListener("click", function (event) {

            if (!event.target.closest("#skills .skill-tag")) {

                if (activeSkill) {
                    activeSkill.classList.remove("skill-selected");
                }

                tooltip.classList.remove("visible");

                activeSkill = null;
            }

        });

        // Reposition while scrolling
        window.addEventListener("scroll", function () {

            if (activeSkill) {
                positionSkillTooltip(activeSkill);
            }

        }, { passive: true });

        window.addEventListener("resize", function () {

            if (activeSkill) {
                positionSkillTooltip(activeSkill);
            }

        });

    }


    /* ========================================================
       5. ACTIVE NAVIGATION HIGHLIGHT
    ======================================================== */

    const navigationLinks = document.querySelectorAll(
        'header nav a[href^="#"], nav a[href^="#"], .nav-links a[href^="#"]'
    );

    const sections = document.querySelectorAll(
        "section[id]"
    );

    if ("IntersectionObserver" in window) {

        const navigationObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        navigationLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                "#" + currentId
                            ) {

                                link.classList.add("active");
                            }

                        });

                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {
            navigationObserver.observe(section);
        });
    }


    /* ========================================================
       6. SMOOTH SCROLLING
    ======================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement =
                document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: reducedMotion ? "auto" : "smooth",
                    block: "start"
                });

            }

        });

    });


    /* ========================================================
       7. MOBILE NAVIGATION MENU
    ======================================================== */

    const navigation = document.querySelector(
        "header nav, nav"
    );

    if (navigation) {

        let navigationList = navigation.querySelector(
            ".nav-links, ul"
        );

        if (navigationList) {

            let menuButton = navigation.querySelector(
                ".mobile-menu-toggle"
            );

            if (!menuButton) {

                menuButton = document.createElement("button");

                menuButton.className = "mobile-menu-toggle";

                menuButton.type = "button";

                menuButton.innerHTML = "&#9776;";

                menuButton.setAttribute(
                    "aria-label",
                    "Toggle navigation menu"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                navigation.appendChild(menuButton);
            }

            const menuStyle = document.createElement("style");

            menuStyle.textContent = `
                .mobile-menu-toggle {
                    display: none;
                    border: none;
                    background: transparent;
                    color: #172b4d;
                    font-size: 27px;
                    cursor: pointer;
                    padding: 8px 12px;
                }

                @media(max-width:768px) {

                    .mobile-menu-toggle {
                        display: block;
                    }

                    nav .nav-links,
                    nav ul {
                        display: none !important;
                        flex-direction: column;
                        width: 100%;
                        padding: 20px;
                        gap: 18px;
                        background: #ffffff;
                        border-radius: 12px;
                        box-shadow: 0 10px 30px rgba(0,0,0,.08);
                    }

                    nav .nav-links.mobile-open,
                    nav ul.mobile-open {
                        display: flex !important;
                    }

                    nav {
                        flex-wrap: wrap;
                    }
                }
            `;

            document.head.appendChild(menuStyle);

            menuButton.addEventListener("click", function () {

                const isOpen =
                    navigationList.classList.toggle("mobile-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                menuButton.innerHTML = isOpen
                    ? "&times;"
                    : "&#9776;";

            });

            navigationList.querySelectorAll("a").forEach(link => {

                link.addEventListener("click", function () {

                    navigationList.classList.remove("mobile-open");

                    menuButton.innerHTML = "&#9776;";

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });

            });
        }
    }


    /* ========================================================
       8. PROJECT CARD HOVER EFFECTS
    ======================================================== */

    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    projectCards.forEach(card => {

        card.addEventListener("mouseenter", function () {
            card.classList.add("project-hover");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("project-hover");
        });

    });


    /* ========================================================
       9. CERTIFICATE PDF PREVIEW MODAL
    ======================================================== */

    const modal = document.getElementById("portfolioModal");

    const modalTitle = document.getElementById("modalTitle");

    const modalBody = document.getElementById("modalBody");

    const closeModalButton =
        document.getElementById("closeModal");

    const certificateButtons = document.querySelectorAll(
        ".certificate-btn"
    );

    function openCertificate(button) {

        if (!modal || !modalTitle || !modalBody) {
            return;
        }

        const file =
            button.dataset.file ||
            button.getAttribute("href");

        const certificateTitle =
            button.dataset.title ||
            button.closest(".certificate-card")
                ?.querySelector("h3")?.textContent ||
            "Certificate";

        if (!file) return;

        const pdfFrame = document.createElement("iframe");

        pdfFrame.src = file + "#toolbar=1&navpanes=0";

        pdfFrame.title = certificateTitle;

        pdfFrame.style.cssText = `
            width: 100%;
            height: 70vh;
            border: none;
            border-radius: 8px;
        `;

        modalTitle.textContent = certificateTitle;

        modalBody.replaceChildren(pdfFrame);

        modal.classList.add("active");

        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        if (closeModalButton) {
            closeModalButton.focus();
        }
    }

    certificateButtons.forEach(button => {

        button.addEventListener("click", function (event) {

            const file =
                this.dataset.file ||
                this.getAttribute("href");

            if (!file) return;

            if (
                !file.toLowerCase()
                    .split("#")[0]
                    .endsWith(".pdf")
            ) {
                return;
            }

            event.preventDefault();

            openCertificate(this);

        });

    });

    function closeCertificateModal() {

        if (!modal) return;

        modal.classList.remove("active");

        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (modalBody) {
            modalBody.replaceChildren();
        }
    }

    if (closeModalButton) {

        closeModalButton.addEventListener(
            "click",
            closeCertificateModal
        );
    }

    if (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {
                closeCertificateModal();
            }

        });
    }


    /* ========================================================
       10. ESCAPE KEY SUPPORT
    ======================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeCertificateModal();

            const tooltip =
                document.querySelector(".skill-tooltip");

            if (tooltip) {
                tooltip.classList.remove("visible");
            }

            document.querySelectorAll(
                ".skill-tag.skill-selected"
            ).forEach(button => {
                button.classList.remove("skill-selected");
            });
        }

    });


    /* ========================================================
       11. BACK TO TOP BUTTON
    ======================================================== */

    const backToTop = document.createElement("button");

    backToTop.id = "backToTop";

    backToTop.innerHTML = "&#8593;";

    backToTop.type = "button";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    backToTop.style.cssText = `
        position: fixed;
        right: 25px;
        bottom: 25px;
        width: 48px;
        height: 48px;
        border: none;
        border-radius: 50%;
        background: #172b4d;
        color: #ffffff;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(0,0,0,.15);
        opacity: 0;
        visibility: hidden;
        transform: translateY(15px);
        transition: all .3s ease;
        z-index: 999;
    `;

    document.body.appendChild(backToTop);

    function toggleBackToTop() {

        if (window.scrollY > 400) {

            backToTop.style.opacity = "1";

            backToTop.style.visibility = "visible";

            backToTop.style.transform = "translateY(0)";

        } else {

            backToTop.style.opacity = "0";

            backToTop.style.visibility = "hidden";

            backToTop.style.transform = "translateY(15px)";
        }
    }

    window.addEventListener("scroll", toggleBackToTop, {
        passive: true
    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth"
        });

    });


    /* ========================================================
       12. CONTACT FORM VALIDATION
    ======================================================== */

    const contactForm = document.querySelector(
        ".contact-form"
    );

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            const nameInput = contactForm.querySelector(
                '[name="name"], #name'
            );

            const emailInput = contactForm.querySelector(
                '[name="email"], #email'
            );

            const messageInput = contactForm.querySelector(
                '[name="message"], #message'
            );

            if (nameInput && !nameInput.value.trim()) {

                event.preventDefault();

                alert("Please enter your name.");

                nameInput.focus();

                return;
            }

            if (
                emailInput &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    emailInput.value.trim()
                )
            ) {

                event.preventDefault();

                alert("Please enter a valid email address.");

                emailInput.focus();

                return;
            }

            if (messageInput && !messageInput.value.trim()) {

                event.preventDefault();

                alert("Please enter your message.");

                messageInput.focus();

                return;
            }

        });

    }


    /* ========================================================
       13. BUTTON HOVER ANIMATIONS
    ======================================================== */

    document.querySelectorAll(
        ".btn, .project-btn, .certificate-btn"
    ).forEach(button => {

        button.addEventListener("mouseenter", function () {
            this.classList.add("button-hover");
        });

        button.addEventListener("mouseleave", function () {
            this.classList.remove("button-hover");
        });

    });


    /* ========================================================
       14. IMAGE LOADING EFFECTS
    ======================================================== */

    document.querySelectorAll("img").forEach(image => {

        function markLoaded() {
            image.classList.add("image-loaded");
        }

        function markError() {
            image.classList.add("image-error");
        }

        image.addEventListener("load", markLoaded);

        image.addEventListener("error", markError);

        if (image.complete) {

            if (image.naturalWidth > 0) {
                markLoaded();
            } else {
                markError();
            }
        }

    });


    /* ========================================================
       15. AUTOMATIC FOOTER YEAR
    ======================================================== */

    const footerYear = document.querySelector(
        "#footerYear, .footer-year"
    );

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    /* ========================================================
       16. ADDITIONAL INTERACTION STYLES
    ======================================================== */

    const extraStyles = document.createElement("style");

    extraStyles.textContent = `

        .project-card {
            transition:
                transform .35s ease,
                box-shadow .35s ease;
        }

        .project-card.project-hover {
            transform: translateY(-7px);
            box-shadow: 0 18px 40px rgba(23,43,77,.13);
        }

        .button-hover {
            transform: translateY(-3px);
        }

        .image-loaded {
            animation: portfolioImageFade .6s ease;
        }

        @keyframes portfolioImageFade {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        .skill-tag {
            transition: all .3s ease;
        }

        @media (prefers-reduced-motion: reduce) {

            *,
            *::before,
            *::after {
                scroll-behavior: auto !important;
                animation-duration: .01ms !important;
                transition-duration: .01ms !important;
            }

        }

    `;

    document.head.appendChild(extraStyles);


    /* ========================================================
       17. INITIALIZE PORTFOLIO
    ======================================================== */

    document.body.classList.add("portfolio-ready");

    console.log(
        "Afrah Fathima Portfolio: All interactive features initialized."
    );

});
