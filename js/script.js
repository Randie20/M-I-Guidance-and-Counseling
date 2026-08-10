document.addEventListener("DOMContentLoaded", function () {

    /* ===========================
       MOBILE NAVIGATION
    =========================== */

    const menuBtn = document.getElementById("menuBtn");
    const mainNav = document.getElementById("mainNav");

    if (menuBtn && mainNav) {

        menuBtn.addEventListener("click", function () {

            const isOpen = mainNav.classList.toggle("active");

            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );
            }
        });


        /* Close menu after clicking a link */

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("active");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });


        /* Close menu when clicking outside */

        document.addEventListener("click", function (event) {

            if (
                !mainNav.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                mainNav.classList.remove("active");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }


    /* ===========================
       FAQ ACCORDION
    =========================== */

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const faqItem =
                question.closest(".faq-item");

            const answer =
                faqItem.querySelector(".faq-answer");

            const icon =
                question.querySelector("i");

            const isOpen =
                faqItem.classList.contains("active");


            /* Close other FAQ items */

            document
                .querySelectorAll(".faq-item")
                .forEach(function (item) {

                    item.classList.remove("active");

                    const itemAnswer =
                        item.querySelector(".faq-answer");

                    if (itemAnswer) {
                        itemAnswer.style.maxHeight = null;
                    }
                });


            /* Reset icons */

            document
                .querySelectorAll(".faq-question i")
                .forEach(function (item) {

                    item.classList.remove("fa-minus");
                    item.classList.add("fa-plus");
                });


            /* Open selected item */

            if (!isOpen) {

                faqItem.classList.add("active");

                if (answer) {
                    answer.style.maxHeight =
                        answer.scrollHeight + "px";
                }

                if (icon) {
                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-minus");
                }
            }
        });
    });


    /* ===========================
       DATE VALIDATION
    =========================== */

    const dateInput =
        document.querySelector('input[name="date"]');

    if (dateInput) {

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(today.getMonth() + 1)
                .padStart(2, "0");

        const day =
            String(today.getDate())
                .padStart(2, "0");

        dateInput.min =
            `${year}-${month}-${day}`;
    }


    /* ===========================
       SESSION RATE SELECTION
    =========================== */

    const rateButtons =
        document.querySelectorAll(".rate-card-button");

    const sessionType =
        document.getElementById("sessionType");

    const sessionPrice =
        document.getElementById("sessionPrice");

    const selectedSessionInfo =
        document.getElementById("bookingSessionInfo");

    const selectedPriceInfo =
        document.getElementById("bookingPriceInfo");

    const rateCards =
        document.querySelectorAll(".rate-card");


    /*
     * Updates the booking form whenever
     * a counselling session is selected.
     */

    function updateSelectedSession(
        session,
        price
    ) {

        /* Update hidden/form fields */

        if (sessionType) {
            sessionType.value = session;
        }

        if (sessionPrice) {
            sessionPrice.value = price;
        }


        /* Update booking information */

        if (selectedSessionInfo) {
            selectedSessionInfo.textContent =
                session;
        }

        if (selectedPriceInfo) {
            selectedPriceInfo.textContent =
                `KES ${Number(price).toLocaleString()}`;
        }


        /* Remove previous selected state */

        rateCards.forEach(function (card) {
            card.classList.remove("selected");
        });


        /* Highlight selected rate card */

        const selectedButton =
            Array.from(rateButtons).find(
                function (button) {
                    return (
                        button.dataset.session ===
                        session
                    );
                }
            );


        if (selectedButton) {

            const selectedCard =
                selectedButton.closest(".rate-card");

            if (selectedCard) {
                selectedCard.classList.add("selected");
            }
        }
    }


    /* ===========================
       RATE CARD BUTTONS
    =========================== */

    rateButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const session =
                    button.dataset.session;

                const price =
                    button.dataset.price;


                updateSelectedSession(
                    session,
                    price
                );


                /*
                 * Move the user to the
                 * booking form after
                 * selecting a session.
                 */

                const bookingSection =
                    document.getElementById("booking");

                if (bookingSection) {

                    bookingSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        );
    });


    /* ===========================
       SESSION DROPDOWN
    =========================== */

    if (sessionType) {

        sessionType.addEventListener(
            "change",
            function () {

                const session =
                    sessionType.value;

                let price = "";


                if (
                    session ===
                    "Zoom Therapy Session"
                ) {
                    price = "1500";
                }


                if (
                    session ===
                    "House Call Counselling Session"
                ) {
                    price = "3000";
                }


                if (session) {

                    updateSelectedSession(
                        session,
                        price
                    );

                } else {

                    if (sessionPrice) {
                        sessionPrice.value = "";
                    }

                    if (selectedSessionInfo) {
                        selectedSessionInfo.textContent =
                            "Choose a session above";
                    }

                    if (selectedPriceInfo) {
                        selectedPriceInfo.textContent =
                            "Select a session to see the fee";
                    }

                    rateCards.forEach(function (card) {
                        card.classList.remove("selected");
                    });
                }
            }
        );
    }


    /* ===========================
       SMOOTH SCROLLING
    =========================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                }
            );
        });

});