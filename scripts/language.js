/*
Handles switching between English and Swedish.
Elements with data-i18n get their text replaced,
elements with data-i18n-placeholder get their placeholder replaced.
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
        contact: "Contact Us",
        privacy: "Privacy",
        rights: "© 2026 Snabb Leverans AB. All rights reserved.",
        moving: "Moving a better tomorrow.",
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
        contact: "Kontakta oss",
        privacy: "Integritet",
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

let currentLanguage = "en";
try {
    currentLanguage = localStorage.getItem("language") || "en";
} catch (e) { }

function t(key) {
    return translations[currentLanguage][key] || key;
}

function applyTranslations() {
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll(".lang-toggle").forEach(btn => {
        btn.innerHTML = currentLanguage === "en" ? "<b>EN</b> / SV" : "EN / <b>SV</b>";
    });
}

function toggleLanguage() {
    currentLanguage = currentLanguage === "en" ? "sv" : "en";
    try {
        localStorage.setItem("language", currentLanguage);
    } catch (e) { }
    applyTranslations();
    document.dispatchEvent(new Event("languagechange"));
}

document.addEventListener("DOMContentLoaded", () => {
    applyTranslations();
    document.querySelectorAll(".lang-toggle").forEach(btn => btn.addEventListener("click", toggleLanguage));
});
