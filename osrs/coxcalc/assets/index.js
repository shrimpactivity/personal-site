const POINTS_PER_RAID = 50000;

const POINTS_PER_RUNE = {
    death: 630.756,
    blood: 560.475,
    soul: 350.189
};

const POINTS_PER_REWARD = {
    "Arcane": 2993000.0,
    "Dex": 2993000.0,
    "Dragon Hunter Crossbow": 14964500.0,
    "Twisted Buckler": 14964500.0,
    "Dinh's Bulwark": 19952500.0,
    "Ancestral Hat": 19952500.0,
    "Ancestral Top": 19952500.0,
    "Ancestral Bottom": 19952500.0,
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

function calcTotalPoints(deaths, bloods, souls) {
    const totals = [
        deaths * POINTS_PER_RUNE.death,
        bloods * POINTS_PER_RUNE.blood,
        souls * POINTS_PER_RUNE.soul
    ]
    const avg = Math.round(totals.reduce((acc, val) => acc + val, 0) / totals.length)
    return avg;
}

function calcTotalPointsFromPurples(purples) {
    return purples * 867600
}

function calcExpectedItems(totalPoints) {
    let result = {}
    Object.keys(POINTS_PER_REWARD).forEach(item => {
        const expected = totalPoints / POINTS_PER_REWARD[item]
        result[item] = round(expected, 2);
    });

    return result;
}

function calcItemRates() {
    const result = {};
    Object.keys(POINTS_PER_REWARD).forEach(item => {
        result[item] = POINTS_PER_RAID / POINTS_PER_REWARD[item]
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
    return Math.floor(totalPoints / 867600.0)
}

function showResults(points) {
    const expected = calcExpectedItems(points);
    const chances = calcItemChances(points);
    const items = calcTotalItems(points)

    document.getElementById("total-points").innerText = points.toLocaleString();
    document.getElementById("total-items").innerText = items.toLocaleString();

    const tbody = document.getElementById("results-body");
    tbody.innerHTML = Object.keys(POINTS_PER_REWARD).map(item => `
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

function showRuneForm() {
    document.getElementById("calc-form").hidden = false;
    document.getElementById("rune-footnote").hidden = false;
    document.getElementById("rune-instruction").hidden = false;
    document.getElementById("purples-form").hidden = true;
    document.getElementById("purples-footnote").hidden = true;
    document.getElementById("purples-instruction").hidden = true;
}

function showPurplesForm() {
    document.getElementById("calc-form").hidden = true;
    document.getElementById("rune-footnote").hidden = true;
    document.getElementById("rune-instruction").hidden = true;
    document.getElementById("purples-form").hidden = false;
    document.getElementById("purples-footnote").hidden = false;
    document.getElementById("purples-instruction").hidden = false;
}

function main() {
  const calcForm = document.getElementById("calc-form");
  calcForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const deaths = document.getElementById("death-input").value;
    const bloods = document.getElementById("blood-input").value;
    const souls = document.getElementById("soul-input").value;
    showResults(calcTotalPoints(deaths, bloods, souls));
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

  document.getElementById("runes-link").addEventListener("click", (event) => {
    event.preventDefault();
    showRuneForm();
  })

  const recalculateBtn = document.getElementById("recalculate-btn");
  recalculateBtn.addEventListener("click", showInputForm);
}

document.addEventListener("DOMContentLoaded", main);