/* EcoSeed testing dashboard. LOCAL ONLY: results live in this browser's storage, not on a server. */
(function () {
  "use strict";
  var root = document.getElementById("tester");
  if (!root) return;
  var KEY = "ecoseed-tests-v1";
  var rows = [];

  function load() { try { var r = JSON.parse(localStorage.getItem(KEY) || "[]"); if (Array.isArray(r)) rows = r.filter(function (x) { return x && typeof x.trials === "number"; }); } catch (e) { rows = []; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(rows)); } catch (e) { /* storage unavailable: results stay for this visit only */ } }

  var form = document.getElementById("test-form");
  var nameEl = document.getElementById("t-name"), trialsEl = document.getElementById("t-trials"), okEl = document.getElementById("t-ok"), notesEl = document.getElementById("t-notes");
  var statusEl = document.getElementById("t-status");
  var tbody = document.getElementById("t-body");
  var emptyEl = document.getElementById("t-empty"), dataEl = document.getElementById("t-data");
  var sumEl = document.getElementById("t-summary");
  var chartEl = document.getElementById("t-chart");
  var csvEl = document.getElementById("t-csv");

  function pct(r) { return r.trials > 0 ? (r.success / r.trials) * 100 : 0; }
  function fmt(n) { return (Math.round(n * 10) / 10).toString(); }

  function setErr(el, msg) {
    var wrap = el.closest(".field"), err = wrap.querySelector(".err");
    wrap.classList.toggle("invalid", !!msg); err.textContent = msg || ""; el.setAttribute("aria-invalid", msg ? "true" : "false");
  }

  function validate() {
    var ok = true;
    var name = nameEl.value.trim(), trials = Number(trialsEl.value), succ = Number(okEl.value);
    if (!name) { setErr(nameEl, "Enter a test name."); ok = false; } else setErr(nameEl, "");
    if (trialsEl.value === "" || !Number.isInteger(trials) || trials < 1) { setErr(trialsEl, "Enter a whole number of trials, 1 or more."); ok = false; } else setErr(trialsEl, "");
    if (okEl.value === "" || !Number.isInteger(succ) || succ < 0) { setErr(okEl, "Enter a whole number, 0 or more."); ok = false; }
    else if (ok && succ > trials) { setErr(okEl, "Successful releases cannot be more than the number of trials."); ok = false; }
    else setErr(okEl, "");
    return ok;
  }

  function tag(text, cls) { var s = document.createElement("span"); s.className = "tag " + cls; s.textContent = text; return s; }

  function render() {
    var has = rows.length > 0;
    emptyEl.hidden = has; dataEl.hidden = !has;
    csvEl.value = toCSV();
    if (!has) return;

    var T = 0, Sx = 0;
    rows.forEach(function (r) { T += r.trials; Sx += r.success; });
    var overall = T ? (Sx / T) * 100 : 0;
    sumEl.innerHTML = "";
    [["Tests logged", rows.length], ["Total trials", T], ["Successful releases", Sx]].forEach(function (p) {
      var d = document.createElement("div"); d.className = "stat";
      d.innerHTML = '<div class="num"></div><div class="lab"></div>';
      d.firstChild.textContent = p[1]; d.lastChild.textContent = p[0]; sumEl.appendChild(d);
    });
    var o = document.createElement("div"); o.className = "stat";
    o.innerHTML = '<div class="num"></div><div class="lab">Overall success rate</div><div class="meter" role="meter" aria-valuemin="0" aria-valuemax="100"><span></span></div>';
    o.querySelector(".num").textContent = fmt(overall) + "%";
    var m = o.querySelector(".meter"); m.setAttribute("aria-valuenow", fmt(overall)); m.setAttribute("aria-label", "Overall success rate"); m.style.marginTop = "10px";
    m.firstChild.style.width = overall + "%";
    sumEl.appendChild(o);

    tbody.innerHTML = "";
    rows.forEach(function (r, i) {
      var tr = document.createElement("tr");
      var c1 = document.createElement("td"); c1.textContent = r.name; tr.appendChild(c1);
      var c2 = document.createElement("td"); c2.className = "num"; c2.textContent = r.trials; tr.appendChild(c2);
      var c3 = document.createElement("td"); c3.className = "num"; c3.textContent = r.success; tr.appendChild(c3);
      var c4 = document.createElement("td"); c4.className = "rate-cell";
      var rate = pct(r);
      c4.innerHTML = '<strong></strong><div class="meter" role="meter" aria-valuemin="0" aria-valuemax="100"><span></span></div>';
      c4.querySelector("strong").textContent = fmt(rate) + "%";
      var mm = c4.querySelector(".meter"); mm.setAttribute("aria-valuenow", fmt(rate)); mm.setAttribute("aria-label", "Success rate for " + r.name); mm.firstChild.style.width = rate + "%";
      tr.appendChild(c4);
      var c5 = document.createElement("td"); c5.textContent = r.notes || "—"; tr.appendChild(c5);
      var c6 = document.createElement("td");
      var del = document.createElement("button"); del.type = "button"; del.className = "btn btn-ghost btn-sm"; del.textContent = "Remove";
      del.setAttribute("aria-label", "Remove test " + r.name);
      del.addEventListener("click", function () { rows.splice(i, 1); save(); render(); });
      c6.appendChild(del); tr.appendChild(c6);
      tbody.appendChild(tr);
    });
    drawChart();
  }

  function drawChart() {
    var NS = "http://www.w3.org/2000/svg";
    var rowH = 40, left = 170, right = 56, top = 14, bottom = 36, W = 640;
    var H = top + rows.length * rowH + bottom, plotW = W - left - right;
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H); svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Bar chart of success rate for each test, from 0 to 100 percent");
    svg.style.width = "100%"; svg.style.height = "auto";
    function el(n, a, t) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); if (t != null) e.textContent = t; svg.appendChild(e); return e; }
    [0, 25, 50, 75, 100].forEach(function (v) {
      var x = left + (v / 100) * plotW;
      el("line", { x1: x, x2: x, y1: top, y2: H - bottom, stroke: "var(--line)", "stroke-width": 1 });
      el("text", { x: x, y: H - bottom + 20, "text-anchor": "middle", fill: "var(--muted)", "font-size": 12 }, v + "%");
    });
    rows.forEach(function (r, i) {
      var y = top + i * rowH + 8, rate = pct(r), w = (rate / 100) * plotW;
      var nm = r.name.length > 24 ? r.name.slice(0, 23) + "…" : r.name;
      var t = el("text", { x: left - 10, y: y + 15, "text-anchor": "end", fill: "var(--ink)", "font-size": 13 }, nm);
      var ti = document.createElementNS(NS, "title"); ti.textContent = r.name; t.appendChild(ti);
      el("rect", { x: left, y: y, width: plotW, height: 22, rx: 5, fill: "var(--surface-2)" });
      if (w > 0) el("rect", { x: left, y: y, width: w, height: 22, rx: 5, fill: "var(--leaf)" });
      el("text", { x: left + plotW + 8, y: y + 16, fill: "var(--ink)", "font-size": 13, "font-weight": 700 }, fmt(rate) + "%");
    });
    chartEl.innerHTML = ""; chartEl.appendChild(svg);
  }

  function csvCell(v) { v = String(v == null ? "" : v); if (/^[=+\-@]/.test(v)) v = "'" + v; return '"' + v.replace(/"/g, '""') + '"'; }
  function toCSV() {
    var out = ["Test name,Trials,Successful releases,Success rate (%),Observations,Date added"];
    rows.forEach(function (r) { out.push([csvCell(r.name), r.trials, r.success, fmt(pct(r)), csvCell(r.notes), csvCell(r.date)].join(",")); });
    return out.join("\n");
  }

  function say(kind, msg) { statusEl.className = "status-box " + kind; statusEl.textContent = msg; statusEl.hidden = !msg; }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) { say("bad", "Fix the highlighted fields to add this test."); return; }
    rows.push({ name: nameEl.value.trim().slice(0, 80), trials: Number(trialsEl.value), success: Number(okEl.value), notes: notesEl.value.trim().slice(0, 500), date: new Date().toISOString().slice(0, 10), example: false });
    save(); form.reset(); say("ok", "Test added. Saved in this browser only."); render(); nameEl.focus();
  });

  document.getElementById("t-example").addEventListener("click", function () {
    if (rows.some(function (r) { return r.example; })) { say("warn", "Example rows are already loaded."); return; }
    [["EXAMPLE: release test A", 10, 7, "Example only. Replace with real data."], ["EXAMPLE: release test B", 10, 9, "Example only. Replace with real data."]].forEach(function (x) {
      rows.push({ name: x[0], trials: x[1], success: x[2], notes: x[3], date: "", example: true });
    });
    save(); say("warn", "Example rows added. They are not real results. Remove them before you present."); render();
  });

  document.getElementById("t-clear").addEventListener("click", function () {
    if (!rows.length) return;
    var b = this;
    if (b.getAttribute("data-armed") !== "1") { b.setAttribute("data-armed", "1"); b.textContent = "Press again to clear all"; setTimeout(function () { b.removeAttribute("data-armed"); b.textContent = "Clear all"; }, 4000); return; }
    rows = []; save(); b.removeAttribute("data-armed"); b.textContent = "Clear all"; say("", ""); render();
  });

  document.getElementById("t-copy").addEventListener("click", function () {
    var text = toCSV();
    function fallback() { csvEl.closest("details").open = true; csvEl.focus(); csvEl.select(); say("warn", "Copy was blocked. The CSV is selected, press Ctrl+C or Cmd+C."); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { say("ok", "CSV copied. Paste it into a spreadsheet."); }, fallback);
    } else fallback();
  });

  load(); render();
})();
