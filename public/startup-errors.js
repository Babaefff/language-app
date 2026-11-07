// Shown only if the app fails to start (kept as a file so the Content-Security-Policy can forbid inline scripts).
// If the app fails to start, show the reason instead of a blank page.
(function () {
  function show(msg) {
    var root = document.getElementById('root');
    if (!root || root.childElementCount) return;
    root.innerHTML =
      '<div style="max-width:640px;margin:40px auto;padding:20px;font:15px/1.5 system-ui;border:1px solid #c8102e;border-radius:12px;background:#fff;color:#222">' +
      '<h2 style="margin:0 0 8px">Hablo could not start</h2><p>Please copy this message and send it to the developer:</p>' +
      '<pre style="white-space:pre-wrap;word-break:break-word;background:#f5f0ea;padding:12px;border-radius:8px"></pre></div>';
    root.querySelector('pre').textContent = msg + '\n\n' + navigator.userAgent;
  }
  window.addEventListener('error', function (e) { show(String(e.error && e.error.stack || e.message)); });
  window.addEventListener('unhandledrejection', function (e) { show(String(e.reason && e.reason.stack || e.reason)); });
})();
