(function () {
  // お知らせ：「すべて見る」で過去分を展開
  var news = document.getElementById('news');
  var more = document.getElementById('news-more');
  more.addEventListener('click', function () {
    var open = news.classList.toggle('open');
    more.setAttribute('aria-expanded', open ? 'true' : 'false');
    more.textContent = open ? '閉じる ↑' : 'すべて見る →';
  });

  // 街並み：ビル＝サーバー、灯った窓＝稼働中のプロセス
  var svg = document.getElementById('city');
  var NS = 'http://www.w3.org/2000/svg';
  var seed = 7;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  var x = 0, parts = [];
  while (x < 1200) {
    var w = 40 + Math.floor(rnd() * 60);
    var h = 50 + Math.floor(rnd() * 150);
    var y = 220 - h;
    parts.push('<rect x="' + x + '" y="' + y + '" width="' + (w - 4) + '" height="' + h + '" fill="var(--tower)"/>');
    for (var wy = y + 12; wy < 210; wy += 14) {
      for (var wx = x + 8; wx < x + w - 12; wx += 12) {
        if (rnd() < 0.28) parts.push('<rect class="win" x="' + wx + '" y="' + wy + '" width="5" height="7" fill="var(--window)" opacity="' + (0.55 + rnd() * 0.45).toFixed(2) + '"/>');
      }
    }
    if (h > 170) parts.push('<rect x="' + (x + w / 2 - 3) + '" y="' + (y - 18) + '" width="2" height="18" fill="var(--tower)"/><circle class="beacon" cx="' + (x + w / 2 - 2) + '" cy="' + (y - 20) + '" r="3.5" fill="var(--beacon)"/>');
    x += w;
  }
  svg.innerHTML = parts.join('');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    var wins = svg.querySelectorAll('.win');
    var beacons = svg.querySelectorAll('.beacon');
    var on = true;
    setInterval(function () {
      var el = wins[Math.floor(Math.random() * wins.length)];
      if (el) el.setAttribute('opacity', el.getAttribute('opacity') === '0' ? '0.9' : '0');
    }, 400);
    setInterval(function () {
      on = !on;
      beacons.forEach(function (b) { b.setAttribute('opacity', on ? '1' : '0.25'); });
    }, 1000);
  }

  // フォーム：送信先はないので、入力チェックのみ行う
  var form = document.getElementById('cf');
  var msg = document.getElementById('cf-msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('cf-name').value.trim();
    var email = document.getElementById('cf-email').value.trim();
    var body = document.getElementById('cf-body').value.trim();
    if (!name || !body) { msg.textContent = 'お名前と内容を入力してください。'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = 'メールアドレスの形式を確認してください。'; return; }
    msg.textContent = '入力内容に問題はありません。これはデモのため、実際には送信されません。';
  });
})();
