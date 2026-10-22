/*
  modals.js - opens and closes the pop-up windows in the footer of index.html
  and status.html:
  "Terms of Use", "Privacy" and "Contact Us".

  WHAT IS A MODAL?
  ----------------
  A modal is a small window that opens on top of the page. The rest of the
  page is covered by a dark, see-through layer (the "backdrop"), so the user
  focuses on the pop-up until they close it.

  HOW IT WORKS HERE
  -----------------
  The three modals are already written in index.html, but they start hidden
  with style="display: none". To SHOW one we set display to "flex" (flex is
  also what centers the white box in the middle of the screen). To HIDE it
  again we set display back to "none".

  Each footer button has an id (termsLink, privacyLink, contactLink) and each
  modal has a matching id (termsModal, privacyModal, contactModal).
*/

// Wait until the whole HTML has been read, so all the elements below exist.
document.addEventListener("DOMContentLoaded", () => {
    // Find the three footer buttons...
    const termsLink = document.getElementById("termsLink");
    const privacyLink = document.getElementById("privacyLink");
    const contactLink = document.getElementById("contactLink");

    // ...and the three pop-up windows they open.
    const termsModal = document.getElementById("termsModal");
    const privacyModal = document.getElementById("privacyModal");
    const contactModal = document.getElementById("contactModal");

    /*
      getElementById returns null if the element does not exist on the page.
      The "if (termsLink && termsModal)" checks make sure BOTH were found
      before we use them. Without the check, a page that is missing one of
      them would crash with an error like "Cannot read properties of null".
    */
    if (termsLink && termsModal) {
        termsLink.addEventListener("click", event => {
            // preventDefault() stops the element's normal click behavior
            // (useful if the button is ever changed back to an <a href="#"> link,
            // which would otherwise jump to the top of the page).
            event.preventDefault();
            termsModal.style.display = "flex"; // show the pop-up
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

    /*
      Close with the "×" button.
      All three close buttons share the class "modal-close", so
      querySelectorAll finds them all and forEach gives each one a click
      listener. Only one modal can be open at a time, so the simplest thing
      is to hide all three.
    */
    document.querySelectorAll(".modal-close").forEach(btn => {
        btn.addEventListener("click", () => {
            if (termsModal) termsModal.style.display = "none";
            if (privacyModal) privacyModal.style.display = "none";
            if (contactModal) contactModal.style.display = "none";
        });
    });

    /*
      Close by clicking the dark backdrop around the white box.
      event.target is the element that was actually clicked. The modal element
      itself IS the dark backdrop, and the white box is a child inside it.
      So if the target is the modal itself, the user clicked outside the box.
      Clicks inside the white box have the box (or its text) as target and
      are ignored.
    */
    window.addEventListener("click", event => {
        if (event.target === termsModal) termsModal.style.display = "none";
        if (event.target === privacyModal) privacyModal.style.display = "none";
        if (event.target === contactModal) contactModal.style.display = "none";
    });
});
