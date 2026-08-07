// ===========================
// Mobile Navigation
// ===========================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if(nav.classList.contains("active")){
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    }else{
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});

// ===========================
// Close menu when a link is clicked
// ===========================

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});

// ===============================
// FAQ Accordion
// ===============================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = question.querySelector("i");

    question.addEventListener("click", () => {

        const isOpen = answer.style.maxHeight;

        // Close all FAQs first
        faqItems.forEach(faq => {

            const faqAnswer = faq.querySelector(".faq-answer");
            const faqIcon = faq.querySelector(".faq-question i");

            faqAnswer.style.maxHeight = null;
            faqIcon.classList.remove("fa-minus");
            faqIcon.classList.add("fa-plus");

        });

        // If it wasn't already open, open it
        if (!isOpen) {

            answer.style.maxHeight = answer.scrollHeight + "px";

            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");

        }

    });

});
// =========================
// Feedback Validation
// =========================

const feedbackForm = document.querySelector('form[name="client-feedback"]');

if (feedbackForm) {

    feedbackForm.addEventListener("submit", function (e) {

        const rating = document.querySelector('input[name="rating"]:checked');

        if (!rating) {

            e.preventDefault();

            alert("Please rate your overall experience before submitting your feedback.");

        }

    });

}