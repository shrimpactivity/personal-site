const POINTS_PER_RAID = 50000;
const TOTAL_POINTS_PER_PURPLE = 867600;

const POINTS_PER_ITEM = {
    sapphire: 3304.69,
    emerald: 2487.56,
    ruby: 4248.09,
    diamond: 8928.57,
    deathRune: 630.76,
    bloodRune: 560.48,
    soulRune: 350.19
};

const POINTS_PER_PURPLE = {
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

function calcTotalPoints(itemCounts) {
    const points = []
    Object.keys(itemCounts).forEach(item => {
        const count = itemCounts[item];
        if (count !== null && count !== "") {
            points.push(count * POINTS_PER_ITEM[item]);
        }
    })

    if (points.length === 0) return 0;
    const avg = Math.round(points.reduce((acc, val) => acc + val, 0) / points.length)
    return avg;
}

function calcTotalPointsFromPurples(purples) {
    return purples * TOTAL_POINTS_PER_PURPLE
}

function calcExpectedItems(totalPoints) {
    let result = {}
    Object.keys(POINTS_PER_PURPLE).forEach(item => {
        const expected = totalPoints / POINTS_PER_PURPLE[item]
        result[item] = round(expected, 2);
    });

    return result;
}

function calcItemRates() {
    const result = {};
    Object.keys(POINTS_PER_PURPLE).forEach(item => {
        result[item] = POINTS_PER_RAID / POINTS_PER_PURPLE[item]
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
    return Math.floor(totalPoints / TOTAL_POINTS_PER_PURPLE)
}

function showResults(points) {
    const expected = calcExpectedItems(points);
    const chances = calcItemChances(points);
    const items = calcTotalItems(points)

    document.getElementById("total-points").innerText = points.toLocaleString();
    document.getElementById("total-items").innerText = items.toLocaleString();

    const tbody = document.getElementById("results-body");
    tbody.innerHTML = Object.keys(POINTS_PER_PURPLE).map(item => `
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

function toggleRuneFields() {
    document.getElementById("rune-fields-container").toggleAttribute("hidden")
}

function main() {
  const gemForm = document.getElementById("gem-form");
  gemForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const itemCounts = {
        sapphire: document.getElementById("sapphire-input").value,
        emerald: document.getElementById("emerald-input").value,
        ruby: document.getElementById("ruby-input").value,
        diamond: document.getElementById("diamond-input").value,
        deathRune: document.getElementById("death-input").value,
        bloodRune: document.getElementById("blood-input").value,
        soulRune: document.getElementById("soul-input").value
    }
    const totalPoints = calcTotalPoints(itemCounts)

    showResults(totalPoints);
  })

  const purplesForm = document.getElementById("purples-form");
  purplesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const purples = document.getElementById("purples-input").value;
    const totalPoints = calcTotalPointsFromPurples(purples)
    showResults(totalPoints);
  })

  document.getElementById("purples-link").addEventListener("click", (event) => {
    event.preventDefault();
    showPurplesForm();
  })

  document.getElementById("gems-link").addEventListener("click", (event) => {
    event.preventDefault();
    showGemForm();
  })

  document.getElementById("toggle-rune-fields").addEventListener("click", (event) => {
    toggleRuneFields();
  })

  const recalculateBtn = document.getElementById("recalculate-btn");
  recalculateBtn.addEventListener("click", showInputForm);
}

document.addEventListener("DOMContentLoaded", main);