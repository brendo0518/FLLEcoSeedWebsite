/* EcoSeed forms: validation, and honest submission handling.
   Nothing is sent unless SITE.formEndpoint is set. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var cfgBox = document.querySelector("[data-config-notice]");
  if (cfgBox && S.formEndpoint) cfgBox.hidden = true;

  function setErr(field, msg) {
    var wrap = field.closest(".field");
    var err = wrap && wrap.querySelector(".err");
    if (wrap) wrap.classList.toggle("invalid", !!msg);
    if (err) err.textContent = msg || "";
    field.setAttribute("aria-invalid", msg ? "true" : "false");
  }

  function validateField(el) {
    var v = (el.value || "").trim();
    var label = el.getAttribute("data-label") || "This field";
    if (el.required && !v) return label + " is required.";
    if (v && el.type === "email" && !EMAIL.test(v)) return "Enter an email address like name@example.org.";
    var min = parseInt(el.getAttribute("data-min"), 10);
    if (min && v && v.length < min) return label + " needs at least " + min + " characters.";
    return "";
  }

  function show(box, kind, html) {
    box.className = "status-box " + kind;
    box.innerHTML = html;
    box.hidden = false;
    box.focus && box.focus();
  }

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    var box = form.querySelector(".form-status");
    var kind = form.getAttribute("data-form");
    var fields = form.querySelectorAll("input[type=text],input[type=email],select,textarea");

    fields.forEach(function (el) {
      el.addEventListener("blur", function () { setErr(el, validateField(el)); });
      el.addEventListener("input", function () { if (el.getAttribute("aria-invalid") === "true") setErr(el, validateField(el)); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var first = null;
      fields.forEach(function (el) {
        var m = validateField(el);
        setErr(el, m);
        if (m && !first) first = el;
      });
      if (kind === "survey") {
        /* Survey needs at least one answer so empty submissions are not sent. */
        var any = Array.prototype.some.call(form.elements, function (el) {
          if (el.name === "form_type" || !el.name) return false;
          if (el.type === "checkbox" || el.type === "radio") return el.checked && el.name !== "may_quote";
          return (el.value || "").trim() && el.name !== "name" && el.name !== "organisation" && el.name !== "email";
        });
        if (!any) { show(box, "bad", "<p>Answer at least one question before submitting.</p>"); return; }
      }
      if (first) {
        show(box, "bad", "<p>Please fix the highlighted fields and try again.</p>");
        first.focus();
        return;
      }

      if (!S.formEndpoint) {
        show(box, "warn",
          "<p><strong>Not sent.</strong> Your entries passed the checks, but this website has no submission destination set up yet, so nothing was transmitted anywhere.</p>" +
          "<p>Team: set <code>formEndpoint</code> in <code>assets/config.js</code> to turn this form on.</p>");
        return;
      }

      var data = new FormData(form);
      data.append("form_type", kind);
      var submit = form.querySelector("[type=submit]");
      submit.disabled = true;
      show(box, "", "<p>Sending…</p>");
      fetch(S.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          form.reset();
          fields.forEach(function (el) { setErr(el, ""); });
          show(box, "ok", "<p><strong>Thank you.</strong> Your " + (kind === "survey" ? "feedback" : "message") + " was submitted to the team.</p>");
        })
        .catch(function () {
          show(box, "bad", "<p><strong>Not sent.</strong> The submission did not go through. Please try again later or contact the team another way.</p>");
        })
        .then(function () { submit.disabled = false; });
    });
  });

  /* Contact email shown as text, never as an auto-sent action */
  var em = document.querySelector("[data-contact-email]");
  if (em) {
    if (S.contactEmail) { em.textContent = S.contactEmail; }
    else { em.textContent = "[Add a shared team or school email in assets/config.js]"; em.className = "ph"; }
  }
})();
