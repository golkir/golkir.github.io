// Distill renders equations inside the shadow DOM of <d-math>, so page CSS cannot reach them.
// Inject the theme text colour and centred display-math layout into each shadow root. Kept outside the ready handler below
// so an error there cannot skip it.
(function () {
  var recolorMath = function () {
    document.querySelectorAll("d-math").forEach(function (math) {
      if (!math.shadowRoot || math.shadowRoot.querySelector("style[data-theme-color]")) return;
      var style = document.createElement("style");
      style.setAttribute("data-theme-color", "");
      style.textContent =
        ".katex, .katex * { color: var(--global-text-color) !important; }" +
        ".katex-display { text-align: center !important; margin: 0.5em 0 !important; padding: 8px 0 !important; overflow-x: auto; overflow-y: hidden; }";
      math.shadowRoot.appendChild(style);
    });
  };
  document.addEventListener("DOMContentLoaded", recolorMath);
  window.addEventListener("load", recolorMath);
  new MutationObserver(recolorMath).observe(document.documentElement, { childList: true, subtree: true });
  recolorMath();
})();

$(document).ready(function () {
  // Override styles of the footnotes.
  document.querySelectorAll("d-footnote").forEach(function (footnote) {
    footnote.shadowRoot.querySelector("sup > span").setAttribute("style", "color: var(--global-theme-color);");
    footnote.shadowRoot
      .querySelector("d-hover-box")
      .shadowRoot.querySelector("style")
      .sheet.insertRule(".panel {background-color: var(--global-bg-color) !important;}");
    footnote.shadowRoot
      .querySelector("d-hover-box")
      .shadowRoot.querySelector("style")
      .sheet.insertRule(".panel {border-color: var(--global-divider-color) !important;}");
  });
  // Override styles of the citations.
  document.querySelectorAll("d-cite").forEach(function (cite) {
    cite.shadowRoot.querySelector("div > span").setAttribute("style", "color: var(--global-theme-color);");
    cite.shadowRoot.querySelector("style").sheet.insertRule("ul li a {color: var(--global-text-color) !important; text-decoration: none;}");
    cite.shadowRoot.querySelector("style").sheet.insertRule("ul li a:hover {color: var(--global-theme-color) !important;}");
    cite.shadowRoot
      .querySelector("d-hover-box")
      .shadowRoot.querySelector("style")
      .sheet.insertRule(".panel {background-color: var(--global-bg-color) !important;}");
    cite.shadowRoot
      .querySelector("d-hover-box")
      .shadowRoot.querySelector("style")
      .sheet.insertRule(".panel {border-color: var(--global-divider-color) !important;}");
  });
});
