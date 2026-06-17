// ── TRAPEZOID MF (fixed: handles flat edges correctly) ──
function trapMF(x, a, b, c, d) {
  if (x <= a) return (a === b) ? 1 : 0;
  if (x >= d) return (c === d) ? 1 : 0;
  if (x >= b && x <= c) return 1;
  if (x > a && x < b) return (x - a) / (b - a);
  if (x > c && x < d) return (d - x) / (d - c);
  return 0;
}

// ── FUZZY SETS ──
const SETS = {
  umur: {
    Muda:   [20, 20, 35, 45],
    Dewasa: [35, 45, 55, 65],
    Tua:    [55, 65, 75, 75],
  },
  bmi: {
    Rendah: [15, 15, 18.5, 23],
    Sedang: [18.5, 23, 27.5, 30],
    Tinggi: [27.5, 30, 40, 40],
  },
  gula: {
    Normal: [70, 70, 90, 100],
    Pra:    [95, 105, 125, 135],
    Tinggi: [126, 140, 200, 200],
  },
  aktivitas: {
    Rendah: [0, 0, 60, 150],
    Sedang: [90, 150, 210, 270],
    Tinggi: [240, 300, 300, 300],
  },
};

function fuzzify(variable, value) {
  const result = {};
  for (const [name, p] of Object.entries(SETS[variable])) {
    result[name] = parseFloat(trapMF(value, p[0], p[1], p[2], p[3]).toFixed(4));
  }
  return result;
}

// ── 32 RULES ──
const RULES = [
  {id:'R1',  cond:[{v:'gula',a:'Normal'},{v:'bmi',a:'Rendah'}], z:10},
  {id:'R2',  cond:[{v:'gula',a:'Normal'},{v:'bmi',a:'Sedang'}], z:25},
  {id:'R3',  cond:[{v:'gula',a:'Normal'},{v:'bmi',a:'Tinggi'}], z:45},
  {id:'R4',  cond:[{v:'gula',a:'Pra'},   {v:'bmi',a:'Rendah'}], z:35},
  {id:'R5',  cond:[{v:'gula',a:'Pra'},   {v:'bmi',a:'Sedang'}], z:55},
  {id:'R6',  cond:[{v:'gula',a:'Pra'},   {v:'bmi',a:'Tinggi'}], z:75},
  {id:'R7',  cond:[{v:'gula',a:'Tinggi'},{v:'bmi',a:'Rendah'}], z:70},
  {id:'R8',  cond:[{v:'gula',a:'Tinggi'},{v:'bmi',a:'Sedang'}], z:85},
  {id:'R9',  cond:[{v:'gula',a:'Tinggi'},{v:'bmi',a:'Tinggi'}], z:95},
  {id:'R10', cond:[{v:'gula',a:'Pra'},   {v:'aktivitas',a:'Tinggi'}], z:45},
  {id:'R11', cond:[{v:'gula',a:'Pra'},   {v:'aktivitas',a:'Rendah'}], z:70},
  {id:'R12', cond:[{v:'gula',a:'Normal'},{v:'bmi',a:'Tinggi'},{v:'aktivitas',a:'Rendah'}], z:60},
  {id:'R13', cond:[{v:'gula',a:'Tinggi'},{v:'aktivitas',a:'Tinggi'}], z:85},
  {id:'R14', cond:[{v:'gula',a:'Normal'},{v:'bmi',a:'Rendah'},{v:'aktivitas',a:'Tinggi'}], z:5},
  {id:'R15', cond:[{v:'umur',a:'Tua'},   {v:'gula',a:'Normal'},{v:'bmi',a:'Sedang'}], z:45},
  {id:'R16', cond:[{v:'umur',a:'Tua'},   {v:'gula',a:'Pra'}], z:75},
  {id:'R17', cond:[{v:'umur',a:'Tua'},   {v:'bmi',a:'Tinggi'}], z:70},
  {id:'R18', cond:[{v:'umur',a:'Muda'},  {v:'gula',a:'Normal'},{v:'bmi',a:'Rendah'},{v:'aktivitas',a:'Tinggi'}], z:5},
  {id:'R19', cond:[{v:'umur',a:'Dewasa'},{v:'gula',a:'Pra'},   {v:'bmi',a:'Sedang'}], z:60},
  {id:'R20', cond:[{v:'umur',a:'Tua'},   {v:'gula',a:'Tinggi'}], z:95},
  {id:'R21', cond:[{v:'gula',a:'Tinggi'},{v:'bmi',a:'Tinggi'},{v:'aktivitas',a:'Rendah'}], z:98},
  {id:'R22', cond:[{v:'umur',a:'Tua'},   {v:'bmi',a:'Tinggi'},{v:'aktivitas',a:'Rendah'}], z:85},
  {id:'R23', cond:[{v:'gula',a:'Normal'},{v:'bmi',a:'Rendah'},{v:'aktivitas',a:'Sedang'}], z:15},
  {id:'R24', cond:[{v:'gula',a:'Normal'},{v:'bmi',a:'Sedang'},{v:'aktivitas',a:'Sedang'}], z:30},
  {id:'R25', cond:[{v:'gula',a:'Normal'},{v:'bmi',a:'Tinggi'},{v:'aktivitas',a:'Sedang'}], z:50},
  {id:'R26', cond:[{v:'gula',a:'Pra'},   {v:'aktivitas',a:'Sedang'}], z:60},
  {id:'R27', cond:[{v:'gula',a:'Tinggi'},{v:'aktivitas',a:'Sedang'}], z:90},
  {id:'R28', cond:[{v:'umur',a:'Muda'},  {v:'gula',a:'Normal'},{v:'bmi',a:'Rendah'},{v:'aktivitas',a:'Sedang'}], z:10},
  {id:'R29', cond:[{v:'umur',a:'Dewasa'},{v:'gula',a:'Pra'},   {v:'bmi',a:'Sedang'},{v:'aktivitas',a:'Sedang'}], z:65},
  {id:'R30', cond:[{v:'umur',a:'Tua'},   {v:'bmi',a:'Tinggi'},{v:'aktivitas',a:'Sedang'}], z:78},
  {id:'R31', cond:[{v:'umur',a:'Tua'},   {v:'gula',a:'Pra'},   {v:'aktivitas',a:'Sedang'}], z:78},
  {id:'R32', cond:[{v:'umur',a:'Tua'},   {v:'gula',a:'Tinggi'},{v:'aktivitas',a:'Sedang'}], z:96},
];

// ── INFERENCE ──
function inferSugeno(fz) {
  const fired = [];
  for (const rule of RULES) {
    let alpha = 1;
    for (const c of rule.cond) {
      alpha = Math.min(alpha, fz[c.v][c.a] ?? 0);
    }
    if (alpha > 0) fired.push({...rule, alpha});
  }
  const sumAZ = fired.reduce((s,r) => s + r.alpha * r.z, 0);
  const sumA  = fired.reduce((s,r) => s + r.alpha, 0);
  const score = sumA > 0 ? sumAZ / sumA : 0;
  return {score: Math.min(100, Math.max(0, score)), fired, sumAZ, sumA};
}

// ── CATEGORY ──
function getCategory(score) {
  if (score < 35) return {label:'Risiko Rendah', cls:'rendah',
    desc:'Kondisi Anda menunjukkan risiko diabetes yang rendah. Pertahankan gaya hidup sehat.',
    recs:['Pertahankan pola makan seimbang','Lanjutkan aktivitas fisik rutin','Lakukan pemeriksaan tahunan sebagai langkah preventif']};
  if (score < 65) return {label:'Risiko Sedang', cls:'sedang',
    desc:'Terdapat beberapa faktor risiko yang perlu diperhatikan. Segera lakukan perubahan gaya hidup.',
    recs:['Kurangi asupan gula dan karbohidrat sederhana','Tingkatkan aktivitas fisik minimal 150 menit/minggu','Konsultasikan hasil ini kepada dokter','Pantau gula darah secara berkala']};
  return {label:'Risiko Tinggi', cls:'tinggi',
    desc:'Faktor risiko diabetes Anda tergolong tinggi. Segera lakukan konsultasi medis.',
    recs:['Segera konsultasi dengan dokter atau ahli endokrinologi','Lakukan tes HbA1c dan tes toleransi glukosa','Mulai program diet terapeutik dengan ahli gizi','Monitor tekanan darah dan kolesterol secara rutin']};
}

// ── UPDATE MEMBERSHIP BARS ──
const MB_KEYS = {
  umur:     ['Muda','Dewasa','Tua'],
  bmi:      ['Rendah','Sedang','Tinggi'],
  gula:     ['Normal','Pra','Tinggi'],
  aktivitas:['Rendah','Sedang','Tinggi'],
};
const MB_IDS = {
  umur:     ['muda','dewasa','tua'],
  bmi:      ['rendah','sedang','tinggi'],
  gula:     ['normal','pra','tinggi'],
  aktivitas:['rendah','sedang','tinggi'],
};

function updateMB(variable, value) {
  const fz = fuzzify(variable, value);
  MB_KEYS[variable].forEach((name, i) => {
    const id = MB_IDS[variable][i];
    const mu = fz[name];
    document.getElementById(variable+'-'+id+'-fill').style.width = (mu*100)+'%';
    document.getElementById(variable+'-'+id+'-val').textContent  = mu.toFixed(2);
  });
}

// ── GAUGE ──
const ARC = 251.2;
function updateGauge(score) {
  const fill   = document.getElementById('gaugeFill');
  const needle = document.getElementById('gaugeNeedle');
  const scEl   = document.getElementById('gaugeScore');
  const lbEl   = document.getElementById('gaugeLabel');
  const offset = ARC - (score / 100) * ARC;
  fill.style.strokeDashoffset = offset;
  const deg = -90 + (score / 100) * 180;
  needle.setAttribute('transform', 'rotate('+deg+',100,100)');
  scEl.textContent = score > 0 ? score.toFixed(1) : '—';
  const colorMap = {rendah:'#22d3a0', sedang:'#f59e0b', tinggi:'#ef4444'};
  if (score > 0) {
    const cat = getCategory(score);
    scEl.style.color = colorMap[cat.cls];
    lbEl.textContent = cat.label;
  }
}

// ── SLIDER SYNC ──
function syncSlider(id) {
  const v = parseFloat(document.getElementById(id+'Slider').value);
  document.getElementById(id).value = v;
  updateMB(id, v);
}
function syncNum(id) {
  const v = parseFloat(document.getElementById(id).value);
  const sl = document.getElementById(id+'Slider');
  if (sl) sl.value = v;
  updateMB(id, v);
}

// ── RENDER RULES ──
function renderRules(firedIds) {
  const vLabel = {umur:'Umur', bmi:'BMI', gula:'GulaDarah', aktivitas:'Aktivitas'};
  document.getElementById('rulesGrid').innerHTML = RULES.map(r => {
    const condStr = r.cond.map(c => vLabel[c.v]+'='+c.a).join(' AND ');
    const fired   = firedIds.includes(r.id);
    return '<div class="rule-item '+(fired?'fired':'')+'"><span class="rule-num">'+r.id+'</span> IF '+condStr+' THEN z=<span class="rule-z">'+r.z+'</span></div>';
  }).join('');
}

// ── MAIN HITUNG ──
function hitung() {
  const umur      = parseFloat(document.getElementById('umur').value);
  const bmi       = parseFloat(document.getElementById('bmi').value);
  const gula      = parseFloat(document.getElementById('gula').value);
  const aktivitas = parseFloat(document.getElementById('aktivitas').value);

  if ([umur,bmi,gula,aktivitas].some(isNaN)) {
    alert('Mohon isi semua nilai input terlebih dahulu.');
    return;
  }

  const fzUmur      = fuzzify('umur', umur);
  const fzBMI       = fuzzify('bmi', bmi);
  const fzGula      = fuzzify('gula', gula);
  const fzAktivitas = fuzzify('aktivitas', aktivitas);
  const fz = {umur:fzUmur, bmi:fzBMI, gula:fzGula, aktivitas:fzAktivitas};

  const {score, fired, sumAZ, sumA} = inferSugeno(fz);
  const cat = getCategory(score);
  const colorMap = {rendah:'#22d3a0', sedang:'#f59e0b', tinggi:'#ef4444'};

  updateGauge(score);

  // Show result card
  const rc = document.getElementById('resultCard');
  rc.style.display = 'block';

  document.getElementById('resultScore').textContent = score.toFixed(2);
  document.getElementById('resultScore').style.color = colorMap[cat.cls];

  const badge = document.getElementById('catBadge');
  badge.textContent = cat.label;
  badge.className = 'cat-badge '+cat.cls;
  document.getElementById('catDesc').textContent = cat.desc;

  // FUZZIFICATION TABLE
  const rows = [
    ['Umur', umur, 'tahun', fzUmur],
    ['BMI', bmi, 'kg/m²', fzBMI],
    ['Gula Darah', gula, 'mg/dL', fzGula],
    ['Aktivitas', aktivitas, 'mnt/mg', fzAktivitas],
  ];
  let fuzzHtml = '<table><thead><tr><th>Variabel</th><th>Nilai</th><th>Himpunan</th><th>Derajat Keanggotaan (μ)</th></tr></thead><tbody>';
  rows.forEach(([label, val, unit, fzObj]) => {
    const entries = Object.entries(fzObj).filter(([,mu]) => mu > 0);
    if (entries.length === 0) {
      fuzzHtml += '<tr><td class="name">'+label+'</td><td class="val">'+val+' '+unit+'</td><td colspan="2" style="color:var(--red)">Di luar rentang himpunan</td></tr>';
    } else {
      entries.forEach(([name, mu], i) => {
        fuzzHtml += '<tr>';
        if (i === 0) fuzzHtml += '<td class="name">'+label+'</td><td class="val">'+val+' <span style="color:var(--text-dim)">'+unit+'</span></td>';
        else         fuzzHtml += '<td></td><td></td>';
        fuzzHtml += '<td>'+name+'</td><td class="val">'+mu.toFixed(4)+'</td></tr>';
      });
    }
  });
  fuzzHtml += '</tbody></table>';
  document.getElementById('fuzzResult').innerHTML = fuzzHtml;

  // RULES TABLE
  const vLabel = {umur:'Umur', bmi:'BMI', gula:'GulaDarah', aktivitas:'Aktivitas'};
  let ruleHtml = '';
  if (fired.length === 0) {
    ruleHtml = '<p style="color:var(--red)">Tidak ada aturan aktif. Periksa nilai input.</p>';
  } else {
    ruleHtml = '<table><thead><tr><th>Rule</th><th>Kondisi</th><th>α (firing strength)</th><th>z (output)</th><th>α × z</th></tr></thead><tbody>';
    fired.forEach(r => {
      const cStr = r.cond.map(c => vLabel[c.v]+'='+c.a).join(' ∧ ');
      ruleHtml += '<tr><td class="val">'+r.id+'</td><td>'+cStr+'</td><td class="val">'+r.alpha.toFixed(4)+'</td><td class="val">'+r.z+'</td><td class="val">'+(r.alpha*r.z).toFixed(4)+'</td></tr>';
    });
    ruleHtml += '</tbody></table>';
  }
  document.getElementById('ruleResult').innerHTML = ruleHtml;

  // DEFUZZ
  document.getElementById('defuzzResult').innerHTML =
    '<table><tbody>'+
    '<tr><td class="name">Jumlah Aturan Aktif</td><td class="val">'+fired.length+' rules</td></tr>'+
    '<tr><td class="name">Σ (α × z)</td><td class="val">'+sumAZ.toFixed(4)+'</td></tr>'+
    '<tr><td class="name">Σ α</td><td class="val">'+sumA.toFixed(4)+'</td></tr>'+
    '<tr><td class="name" style="padding-top:12px;border-top:1px solid var(--border)"><strong style="color:var(--text-primary)">z* = Weighted Average</strong></td>'+
    '<td class="val" style="padding-top:12px;border-top:1px solid var(--border);font-size:18px"><strong>'+score.toFixed(4)+'</strong></td></tr>'+
    '<tr><td colspan="2" style="font-size:11px;color:var(--text-dim);padding-top:4px">z* = '+sumAZ.toFixed(2)+' / '+sumA.toFixed(2)+' = '+score.toFixed(4)+'</td></tr>'+
    '</tbody></table>';

  // REKOMENDASI
  document.getElementById('rekomendasi').innerHTML =
    '<div class="rec-title">💡 Rekomendasi</div>'+
    '<ul class="rec-list">'+cat.recs.map(r=>'<li>'+r+'</li>').join('')+'</ul>';

  // UPDATE RULES HIGHLIGHT
  renderRules(fired.map(r => r.id));

  rc.scrollIntoView({behavior:'smooth', block:'start'});
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', function() {
  ['umur','bmi','gula','aktivitas'].forEach(v => {
    updateMB(v, parseFloat(document.getElementById(v).value));
  });
  renderRules([]);
  document.getElementById('hitungBtn').addEventListener('click', hitung);
});