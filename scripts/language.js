/*
  language.js - switches the text on the page between English and Swedish.
  It is loaded on every page (index.html, status.html and help.html).
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

  The keys are roughly grouped by page: start page first, then the help page
  (keys starting with "help"), the footer and pop-ups, and the status page.
  Each line is   key: "text",   and the comma between lines is required.
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
        slogan: "Delivering to Your Closest Pickup Point",
        help: "Help",
        helpTitle: "How can we help?",
        helpIntro: "Find quick answers about tracking a package with Snabb Leverans.",
        helpTrackTitle: "Track a package",
        helpTrackText: "Go to the home page, enter your Order ID, then select Track. Choose one of the sample IDs shown below the search field to try the demo.",
        helpOrderIdTitle: "Where can I find my Order ID?",
        helpOrderIdText: "Use the Order ID provided with your shipment. This demo accepts the sample IDs listed on the home page.",
        helpNotFoundTitle: "My Order ID was not found",
        helpNotFoundText: "Check that you entered the ID correctly. The demo only displays packages included in its sample data; an ID that is not listed there will not return a result.",
        helpStatusesTitle: "What do the tracking statuses mean?",
        helpWarehouseTitle: "In Warehouse",
        helpWarehouseText: "The package is being prepared or stored at a warehouse.",
        helpPickedUpTitle: "Picked Up",
        helpPickedUpText: "The carrier has collected the package from the sender.",
        helpTransitTitle: "In Transit",
        helpTransitText: "The package is moving through the delivery network.",
        helpCollectionTitle: "At Collection Point",
        helpCollectionText: "The package has reached a collection point. Check the carrier's instructions for pickup details.",
        helpEstimateTitle: "Is the estimated delivery time guaranteed?",
        helpEstimateText: "No. It is an estimate shown with the sample package data and may change.",
        helpDemoNote: "This project is a demonstration. Its package records are sample data, not live shipment updates.",
        helpHome: "Back to tracking",
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
        closest: "Lagret",
        inTransit: "På väg",
        outForDelivery: "Ute för leverans",
        delivered: "Levererat",
        slogan: "Leverans till din närmaste utlämningsplats",
        help: "Hjälp",
        helpTitle: "Hur kan vi hjälpa dig?",
        helpIntro: "Här hittar du snabba svar om hur du spårar ett paket med Snabb Leverans.",
        helpTrackTitle: "Spåra ett paket",
        helpTrackText: "Gå till startsidan, ange ditt order-ID och välj Spåra. Testa demon med ett av exempel-ID:na under sökfältet.",
        helpOrderIdTitle: "Var hittar jag mitt order-ID?",
        helpOrderIdText: "Använd order-ID:t som hör till din försändelse. Den här demon godtar exempel-ID:na som visas på startsidan.",
        helpNotFoundTitle: "Mitt order-ID hittades inte",
        helpNotFoundText: "Kontrollera att du har skrivit in ID:t rätt. Demoversionen visar bara paket som finns i dess exempeldata; ID:n som saknas där ger inget resultat.",
        helpStatusesTitle: "Vad betyder spårningsstatusarna?",
        helpWarehouseTitle: "På lager",
        helpWarehouseText: "Paketet förbereds eller förvaras på ett lager.",
        helpPickedUpTitle: "Upphämtat",
        helpPickedUpText: "Transportören har hämtat paketet från avsändaren.",
        helpTransitTitle: "På väg",
        helpTransitText: "Paketet transporteras genom leveransnätverket.",
        helpCollectionTitle: "Vid utlämningsställe",
        helpCollectionText: "Paketet har kommit fram till ett utlämningsställe. Se transportörens instruktioner för information om hämtning.",
        helpEstimateTitle: "Är den beräknade leveranstiden garanterad?",
        helpEstimateText: "Nej. Det är en uppskattning som visas med exempelpaketets data och den kan ändras.",
        helpDemoNote: "Projektet är en demonstration. Paketuppgifterna är exempeldata, inte direkta leveransuppdateringar.",
        helpHome: "Tillbaka till spårning",
        terms: "Användarvillkor",
        termsTitle: "Användarvillkor",       
        contact: "Kontakta oss",
        contactDetailsTitle: "Kontaktuppgifter",
        privacy: "Integritet",
        privacyTitle: "Integritetspolicy",
        rights: "© 2026 Snabb Leverans AB. Alla rättigheter förbehållna.",
        moving: "Vi levererar en bättre morgondag.",
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
  between the pages.

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
