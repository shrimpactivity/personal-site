const POINTS_PER_RAID = 50000;
const POINTS_PER_PURPLE = 867600;

const POINTS_PER_GEM = {
    sapphire: 3304.693,
    emerald: 2487.562,
    ruby: 4248.088,
    diamond: 8928.571
};

const POINTS_PER_ITEM = {
    "Arcane": 2993000.0,
    "Dex": 2993000.0,
    "Dragon Hunter Crossbow": 14964500.0,
    "Twisted Buckler": 14964500.0,
    "Dinh's Bulwark": 19952500.0,
    "Ancestral Hat": 19952500.0,
    "Ancestral Robe Top": 19952500.0,
    "Ancestral Robe Bottom": 19952500.0,
    "Dragon Claws": 19952500.0,
    "Elder Maul": 29929000.0,
    "Kodai": 29929000.0,
    "Twisted Bow": 29929000.0,
    "Olmlet": 46000000.0
};

function round(num, i=0) {
    return Math.round(num * (10 ** i)) / (10 ** i)
}

function formatPercent(num) {
    return `${round(num * 100, 2)}%`;
}

function calcTotalPoints(sapphire, emerald, ruby, diamond) {
    const totals = [
        sapphire * POINTS_PER_GEM.sapphire,
        emerald * POINTS_PER_GEM.emerald,
        ruby * POINTS_PER_GEM.ruby,
        diamond * POINTS_PER_GEM.diamond
    ]
    const avg = Math.round(totals.reduce((acc, val) => acc + val, 0) / totals.length)
    return avg;
}

function calcTotalPointsFromPurples(purples) {
    return purples * POINTS_PER_PURPLE
}

function calcExpectedItems(totalPoints) {
    let result = {}
    Object.keys(POINTS_PER_ITEM).forEach(item => {
        const expected = totalPoints / POINTS_PER_ITEM[item]
        result[item] = round(expected, 2);
    });

    return result;
}

function calcItemRates() {
    const result = {};
    Object.keys(POINTS_PER_ITEM).forEach(item => {
        result[item] = POINTS_PER_RAID / POINTS_PER_ITEM[item]
    })

    return result;
}

function calcItemChances(totalPoints) {
    const rolls = Math.round(totalPoints / POINTS_PER_RAID);
    const rates = calcItemRates();
    
    const result = {};
    Object.keys(rates).forEach(item => {
        result[item] = 1 - ((1 - rates[item]) ** rolls)
    })

    return result;
}

function calcTotalItems(totalPoints) {
    return Math.floor(totalPoints / POINTS_PER_PURPLE)
}

function showResults(points) {
    const expected = calcExpectedItems(points);
    const chances = calcItemChances(points);
    const items = calcTotalItems(points)

    document.getElementById("total-points").innerText = points.toLocaleString();
    document.getElementById("total-items").innerText = items.toLocaleString();

    const tbody = document.getElementById("results-body");
    tbody.innerHTML = Object.keys(POINTS_PER_ITEM).map(item => `
        <tr>
            <td>${item}</td>
            <td class="result">${formatPercent(chances[item])}</td>
            <td class="result">${round(expected[item], 2)}</td>
        </tr>
    `).join("");

    document.getElementById("input-section").hidden = true;
    document.getElementById("results").hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showInputForm() {
    document.getElementById("results").hidden = true;
    document.getElementById("input-section").hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showGemForm() {
    document.getElementById("gem-form").hidden = false;
    document.getElementById("gem-footnote").hidden = false;
    document.getElementById("gem-instruction").hidden = false;
    document.getElementById("purples-form").hidden = true;
    document.getElementById("purples-footnote").hidden = true;
    document.getElementById("purples-instruction").hidden = true;
}

function showPurplesForm() {
    document.getElementById("gem-form").hidden = true;
    document.getElementById("gem-footnote").hidden = true;
    document.getElementById("gem-instruction").hidden = true;
    document.getElementById("purples-form").hidden = false;
    document.getElementById("purples-footnote").hidden = false;
    document.getElementById("purples-instruction").hidden = false;
}

function main() {
  const gemForm = document.getElementById("gem-form");
  gemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const sapphires = document.getElementById("sapphire-input").value;
    const emeralds = document.getElementById("emerald-input").value;
    const rubies = document.getElementById("ruby-input").value;
    const diamonds = document.getElementById("diamond-input").value;
    showResults(calcTotalPoints(sapphires, emeralds, rubies, diamonds));
  })

  const purplesForm = document.getElementById("purples-form");
  purplesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const purples = document.getElementById("purples-input").value;
    showResults(calcTotalPointsFromPurples(purples));
  })

  document.getElementById("purples-link").addEventListener("click", (event) => {
    event.preventDefault();
    showPurplesForm();
  })

  document.getElementById("gems-link").addEventListener("click", (event) => {
    event.preventDefault();
    showGemForm();
  })

  const recalculateBtn = document.getElementById("recalculate-btn");
  recalculateBtn.addEventListener("click", showInputForm);
}

document.addEventListener("DOMContentLoaded", main);