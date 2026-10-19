(function () {
  var cfg = window.SITE || {};

  if (cfg.phone) {
    document.querySelectorAll("[data-phone]").forEach(function (a) {
      a.href = "tel:" + cfg.phone.replace(/[^\d+]/g, "");
      a.textContent = cfg.phone;
      a.hidden = false;
    });
  }

  if (cfg.facebook) {
    document.querySelectorAll("[data-facebook]").forEach(function (a) {
      a.href = cfg.facebook;
      a.rel = "noopener";
      a.hidden = false;
    });
  }

  var form = document.querySelector(".form");
  form.action = cfg.formEndpoint;
  form.querySelector("[name=_next]").value =
    location.origin + location.pathname + "?sent=1#quote";

  if (new URLSearchParams(location.search).has("sent")) {
    document.querySelector(".sent").hidden = false;
    form.hidden = true;
  }

  if (cfg.ga4) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + cfg.ga4;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", cfg.ga4);
    form.addEventListener("submit", function () {
      gtag("event", "generate_lead");
    });
  }
})();
