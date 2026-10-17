
/* =====================================
   HOMECARE
   SCRIPT.JS
===================================== */

"use strict";

/* 1. AUTOMATIC FOOTER YEAR */
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* 2. SCROLL REVEAL ANIMATIONS */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Fallback for older browsers
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* 3. HOMECARE WHATSAPP CONTACT FORM */

// Replace this placeholder with your official
// business WhatsApp number, including country code.
// India example format: 91 followed by 10 digits.
// Do not include +, spaces, or hyphens.
const HOMECARE_WHATSAPP = "91XXXXXXXXXX";

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const name = document
      .getElementById("contactName")
      .value.trim();

    const phone = document
      .getElementById("contactPhone")
      .value.trim();

    const service = document
      .getElementById("contactService")
      .value;

    const message = document
      .getElementById("contactMessage")
      .value.trim();

    // Validate the Indian 10-digit mobile number
    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    // Prevent accidental use of the placeholder number
    if (!/^\d{10,15}$/.test(HOMECARE_WHATSAPP)) {
      alert(
        "HomeCare WhatsApp number is not configured yet. Please contact the website administrator."
      );
      return;
    }

    const whatsappMessage = [
      "Hello HomeCare! 💚",
      "",
      "I would like to enquire about your services.",
      "",
      "Name: " + name,
      "Phone: " + phone,
      "Service: " + service,
      "Message: " + (message || "No additional message"),
      "",
      "Please contact me regarding this enquiry."
    ].join("\n");

    const whatsappURL =
      "https://wa.me/+918374625736" +
      HOMECARE_WHATSAPP +
      "?text=" +
      encodeURIComponent(whatsappMessage);

    // Opens WhatsApp with a pre-filled message.
    // The user must press Send inside WhatsApp.
    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    // Fallback if the browser blocks the new tab
    if (!whatsappWindow) {
      window.location.href = whatsappURL;
    }
  });
}
