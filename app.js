/* SWIFTT TOPUP — lojik sit la (pri yo nan config.js, pa isit la) */
const currentGame = document.body.dataset.game || null;
let selected = null;

function fmt(n){ return n.toLocaleString("fr-FR").replace(/,/g," ") + " Goud"; }

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
    d.onclick = () => { selected = { kind: "pack", index: i }; render(); updateSummary(); };
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
  sum.innerHTML = "Lòd ou : <b>" + g.name + " — " + (p.amount ? p.amount + " (" + p.label + ")" : p.label) + "</b> — <b>" + fmt(p.price) + "</b>" + (id ? "<br>Player ID : <b>" + id.replace(/</g,"&lt;") + "</b>" : "<br><span style='color:#0a84ff'>Mete Player ID ou anwo a.</span>");
  btn.disabled = !id;
}

function orderWhatsApp(){
  const p = currentPack();
  const idEl = document.getElementById("player-id");
  const id = idEl ? idEl.value.trim() : "";
  if(!p || !id) return;
  const g = GAMES[currentGame];
  const packText = p.amount ? p.amount + " (" + p.label + ")" : p.label;
  const msg = "Bonjou SWIFTT TOPUP! Mwen vle fè yon top-up:\n\nJwèt: " + g.name + "\nPakè: " + packText + "\nPri: " + fmt(p.price) + "\nPlayer ID mwen: " + id + "\n\nMwen pral peye sou MonCash (" + MONCASH_NUMBER + ") epi mwen voye prèv la. Mèsi!";
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

const pid = document.getElementById("player-id");
if(pid) pid.addEventListener("input", updateSummary);
render();
