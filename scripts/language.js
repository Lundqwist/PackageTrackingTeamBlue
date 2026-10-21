/*
Handles switching between English and Swedish.
Elements with data-i18n get their text replaced,
elements with data-i18n-placeholder get their placeholder replaced.
*/

/*
  HOW TRANSLATION WORKS HERE
  --------------------------
  "i18n" is a common short name for "internationalization"
  (i + 18 letters + n).

  In the HTML we mark text that should be translated with an attribute:
      <span data-i18n="track">Track</span>
  "track" is a KEY. Below we have one object per language that maps each key
  to the text in that language. When the language changes we loop over every
  marked element and swap in the right text.

  To add a new text: give the element a data-i18n="myKey" attribute and add
  "myKey" to BOTH the en and sv objects below.
*/
const translations = {
    en: {
        tagline: "Fast. Reliable. Everywhere.",
        trackTitle1: "Track Your",
        trackTitle2: "Package",
        heroText: "Enter your Order ID below to display delivery status and track progress on our interactive map.",
        enterOrderId: "Enter Order ID",
        track: "Track",
        tryIds: "Try a sample ID:",
        closest: "Closest to You",
        inTransit: "In Transit",
        outForDelivery: "Out for Delivery",
        delivered: "Delivered",
        slogan: "From Your Nearest Hub to Your Door",
        help: "Help",
        terms: "Terms of Use",
        termsTitle: "Terms of Use",
        contact: "Contact Us",
        contactDetailsTitle: "Contact Details",
        privacy: "Privacy",
        privacyTitle: "Privacy Policy",
        rights: "© 2026 Snabb Leverans AB. All rights reserved.",
        moving: "Delivering a better tomorrow.",
        home: "Home",
        orderTitle1: "Order",
        orderTitle2: "Status",
        statusText: "Track your package in real-time",
        orderId: "Order ID",
        eta: "Estimated Delivery Time",
        currentLocation: "Current Location",
        recipient: "Recipient",
        sender: "From",
        warehouse: "In Warehouse",
        pickedUp: "Picked Up",
        collectionPoint: "At Collection Point",
        notFound: "No package found with that Order ID.",
        loadError: "Could not load package data. Open the site through a local web server (e.g. VS Code Live Server)."
    },
    sv: {
        tagline: "Snabbt. Pålitligt. Överallt.",
        trackTitle1: "Spåra ditt",
        trackTitle2: "paket",
        heroText: "Ange ditt order-ID nedan för att se leveransstatus och följa paketet på vår interaktiva karta.",
        enterOrderId: "Ange order-ID",
        track: "Spåra",
        tryIds: "Testa ett exempel-ID:",
        closest: "Närmast dig",
        inTransit: "På väg",
        outForDelivery: "Ute för leverans",
        delivered: "Levererat",
        slogan: "Från närmaste terminal till din dörr",
        help: "Hjälp",
        terms: "Användarvillkor",
        termsTitle: "Användarvillkor",       
        contact: "Kontakta oss",
        contactDetailsTitle: "Kontaktuppgifter",
        privacy: "Integritet",
        privacyTitle: "Integritetspolicy",
        rights: "© 2026 Snabb Leverans AB. Alla rättigheter förbehållna.",
        moving: "Mot en bättre morgondag.",
        home: "Hem",
        orderTitle1: "Order",
        orderTitle2: "status",
        statusText: "Följ ditt paket i realtid",
        orderId: "Order-ID",
        eta: "Beräknad leveranstid",
        currentLocation: "Nuvarande plats",
        recipient: "Mottagare",
        sender: "Avsändare",
        warehouse: "På lager",
        pickedUp: "Upphämtat",
        collectionPoint: "Vid utlämningsställe",
        notFound: "Inget paket hittades med det order-ID:t.",
        loadError: "Kunde inte ladda paketdata. Öppna sidan via en lokal webbserver (t.ex. VS Code Live Server)."
    }
};

/*
  The language the user picked is remembered in localStorage, a small
  key/value storage in the browser that survives page reloads and moving
  between index.html and status.html.

  It is wrapped in try/catch because some browsers (e.g. private mode or
  strict privacy settings) throw an error when you use localStorage.
  An empty catch block means "if it fails, ignore it and keep English".
*/
let currentLanguage = "en";
try {
    currentLanguage = localStorage.getItem("language") || "en";
} catch (e) { }

// t() = "translate". Returns the text for a key in the current language.
// If a key is missing we return the key itself, so mistakes are easy to spot.
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Updates all marked elements on the page to the current language.
function applyTranslations() {
    // Tells the browser (and screen readers) which language the page is in.
    document.documentElement.lang = currentLanguage;

    // querySelectorAll finds every element matching a CSS selector.
    // "[data-i18n]" means "any element that has a data-i18n attribute".
    // The attribute data-i18n="track" is read in JavaScript as el.dataset.i18n.
    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });

    // Placeholders (the grey hint text inside inputs) are attributes, not
    // text content, so they need their own loop.
    // Note: data-i18n-placeholder becomes dataset.i18nPlaceholder (camelCase).
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    // Make the active language bold on the EN / SV button.
    document.querySelectorAll(".lang-toggle").forEach(btn => {
        btn.innerHTML = currentLanguage === "en" ? "<b>EN</b> / SV" : "EN / <b>SV</b>";
    });
}

// Switches between en and sv when the EN / SV button is clicked.
function toggleLanguage() {
    // The "? :" is the ternary operator: condition ? valueIfTrue : valueIfFalse
    currentLanguage = currentLanguage === "en" ? "sv" : "en";
    try {
        localStorage.setItem("language", currentLanguage);
    } catch (e) { }
    applyTranslations();

    // Send out our own custom event so other scripts on the page can react.
    // For example, the pages listen for "languagechange" to re-translate
    // error messages that were written by JavaScript.
    document.dispatchEvent(new Event("languagechange"));
}

// DOMContentLoaded fires when the HTML has been read and all elements exist.
// We must wait for it, otherwise querySelectorAll would find nothing.
document.addEventListener("DOMContentLoaded", () => {
    applyTranslations();
    document.querySelectorAll(".lang-toggle").forEach(btn => btn.addEventListener("click", toggleLanguage));
});
