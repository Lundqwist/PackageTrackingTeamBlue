// Handles popup modals for Terms of Use, Privacy Policy, and Contact Us.

document.addEventListener("DOMContentLoaded", () => {
    const termsLink = document.getElementById("termsLink");
    const privacyLink = document.getElementById("privacyLink");
    const contactLink = document.getElementById("contactLink");

    const termsModal = document.getElementById("termsModal");
    const privacyModal = document.getElementById("privacyModal");
    const contactModal = document.getElementById("contactModal");

    if (termsLink && termsModal) {
        termsLink.addEventListener("click", event => {
            event.preventDefault();
            termsModal.style.display = "flex";
        });
    }

    if (privacyLink && privacyModal) {
        privacyLink.addEventListener("click", event => {
            event.preventDefault();
            privacyModal.style.display = "flex";
        });
    }

    if (contactLink && contactModal) {
        contactLink.addEventListener("click", event => {
            event.preventDefault();
            contactModal.style.display = "flex";
        });
    }

    // Close modals via 'X' button
    document.querySelectorAll(".modal-close").forEach(btn => {
        btn.addEventListener("click", () => {
            if (termsModal) termsModal.style.display = "none";
            if (privacyModal) privacyModal.style.display = "none";
            if (contactModal) contactModal.style.display = "none";
        });
    });

    // Close modal when clicking on the dark backdrop outside the box
    window.addEventListener("click", event => {
        if (event.target === termsModal) termsModal.style.display = "none";
        if (event.target === privacyModal) privacyModal.style.display = "none";
        if (event.target === contactModal) contactModal.style.display = "none";
    });
});