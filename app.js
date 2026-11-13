/* SWIFTT TOPUP — lojik sit la (pri yo nan config.js, pa isit la) */
const currentGame = document.body.dataset.game || null;
let selected = null;
let payMethod = "MonCash";

function fmt(n){ const g = currentGame ? GAMES[currentGame] : null; const cur = (g && g.currency) ? g.currency : "Goud"; return n.toLocaleString("fr-FR").replace(/,/g," ") + " " + cur; }

function render(){
  if(!currentGame) return;
  const g = GAMES[currentGame];
  const grid = document.getElementById("pack-grid");
  if(!grid) return;
  grid.innerHTML = "";
  g.packs.forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "pack" + (selected && selected.index === i && selected.kind === "pack" ? " sel" : "");
    d.innerHTML = '<div class="amt">' + p.amount + '</div><div class="lbl">' + p.label + '</div><div class="pr">' + fmt(p.price) + '</div>';
    d.onclick = () => { selected = { kind: "pack", index: i }; render();
updatePayLine(); updateSummary(); };
    grid.appendChild(d);
  });
  const ex = document.getElementById("extras");
  if(ex){
    ex.innerHTML = "";
    if(g.extras.length){
      const h = document.createElement("h3"); h.textContent = g.extrasTitle; ex.appendChild(h);
      const eg = document.createElement("div"); eg.className = "grid";
      g.extras.forEach((p, i) => {
        const d = document.createElement("div");
        d.className = "pack" + (selected && selected.index === i && selected.kind === "extra" ? " sel" : "");
        d.innerHTML = '<div class="amt" style="font-size:17px">' + p.label + '</div><div class="pr">' + fmt(p.price) + '</div>';
        d.onclick = () => { selected = { kind: "extra", index: i }; render(); updateSummary(); };
        eg.appendChild(d);
      });
      ex.appendChild(eg);
    }
  }
}

function currentPack(){
  if(!selected || !currentGame) return null;
  const g = GAMES[currentGame];
  return selected.kind === "pack" ? g.packs[selected.index] : g.extras[selected.index];
}

function updateSummary(){
  const btn = document.getElementById("btn-order");
  const sum = document.getElementById("summary");
  if(!btn || !sum) return;
  const idEl = document.getElementById("player-id");
  const id = idEl ? idEl.value.trim() : "";
  const p = currentPack();
  if(!p){ sum.innerHTML = "Chwazi yon pakè anwo a pou wè rezime lòd ou."; btn.disabled = true; return; }
  const g = GAMES[currentGame];
  sum.innerHTML = "Lòd ou : <b>" + g.name + " — " + (p.amount ? p.amount + " (" + p.label + ")" : p.label) + "</b> — <b>" + fmt(p.price) + "</b>" + (id ? "<br>Player ID : <b>" + id.replace(/</g,"&lt;") + "</b>" : "<br><span style='color:#0a84ff'>Mete Player ID ou anwo a.</span>") + "<br>Peman : <b>" + payMethod + "</b>";
  btn.disabled = !id;
}

function orderWhatsApp(){
  const p = currentPack();
  const idEl = document.getElementById("player-id");
  const id = idEl ? idEl.value.trim() : "";
  if(!p || !id) return;
  const g = GAMES[currentGame];
  const packText = p.amount ? p.amount + " (" + p.label + ")" : p.label;
  const payText = payMethod === "Binance" ? "Mwen pral peye sou Binance (UID: " + BINANCE_UID + ") epi mwen voye prèv la. Mèsi!" : payMethod === "USDT" ? "Mwen pral peye an USDT sou Binance Pay epi mwen voye prèv la. Mèsi!" : "Mwen pral peye sou MonCash (" + MONCASH_NUMBER + ") epi mwen voye prèv la. Mèsi!";
  const msg = "Bonjou SWIFTT TOPUP! Mwen vle fè yon top-up:\n\nJwèt: " + g.name + "\nPakè: " + packText + "\nPri: " + fmt(p.price) + "\nPlayer ID mwen: " + id + "\nMwayen peman: " + payMethod + "\n\n" + payText;
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg), "_blank");
}

function copyMonCash(e){
  if(e) e.preventDefault();
  const num = MONCASH_NUMBER.replace(/\s/g,"");
  if(navigator.clipboard){
    navigator.clipboard.writeText(num).then(() => {
      if(e && e.target){ e.target.textContent = "Kopye ✓"; setTimeout(() => { e.target.textContent = "Kopye"; }, 1500); }
    });
  }
}

function setPayMethod(m){
  payMethod = m;
  const mc = document.getElementById("pm-moncash");
  const bn = document.getElementById("pm-binance");
  if(mc) mc.classList.toggle("sel", m === "MonCash");
  if(bn) bn.classList.toggle("sel", m === "Binance");
  const us = document.getElementById("pm-usdt");
  if(us) us.classList.toggle("sel", m === "USDT");
  updatePayLine();
  updateSummary();
}

function updatePayLine(){
  const el = document.getElementById("pay-line");
  if(!el) return;
  if(payMethod === "Binance"){
    el.innerHTML = 'Peman : <b>Binance — ' + BINANCE_NAME + '</b><br>UID : <b>' + BINANCE_UID + '</b><button class="copy" onclick="copyBinance(event)">Kopye</button><br>Voye prèv peman an nan konvèsasyon WhatsApp la.';
  } else if(payMethod === "USDT"){
    el.innerHTML = 'Peman : <b>USDT — Binance Pay</b><br>Eskane kòd QR a sou paj Peman an.<button class="copy" onclick="copyUSDT(event)">Kopye lyen an</button><br>Voye prèv peman an nan konvèsasyon WhatsApp la.';
  } else {
    el.innerHTML = 'Peman : <b>MonCash ' + MONCASH_NUMBER + '</b><button class="copy" onclick="copyMonCash(event)">Kopye</button><br>Voye prèv peman an nan konvèsasyon WhatsApp la.';
  }
}

function copyBinance(e){
  if(e) e.preventDefault();
  if(navigator.clipboard){
    navigator.clipboard.writeText(BINANCE_UID).then(() => {
      if(e && e.target){ e.target.textContent = "Kopye \u2713"; setTimeout(() => { e.target.textContent = "Kopye"; }, 1500); }
    });
  }
}

const pid = document.getElementById("player-id");
if(pid) pid.addEventListener("input", updateSummary);
render();

function copyUSDT(e){
  if(e) e.preventDefault();
  if(navigator.clipboard){
    navigator.clipboard.writeText(USDT_LINK).then(() => {
      if(e && e.target){ e.target.textContent = "Kopye \u2713"; setTimeout(() => { e.target.textContent = "Kopye lyen an"; }, 1500); }
    });
  }
}
