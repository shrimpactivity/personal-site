const ITEM_RATES = {
  2: 1/2500,
  3: 1/2000,
  4: 1/1350,
  5: 1/810,
  6: 1/765,
  7: 1/720,
  8: 1/630,
  9: 1/540
}

const PET_RATES = {
  6: 1/1000,
  7: 1/750,
  8: 1/500,
  9: 1/250
}

function getCompletionsFromInputs() {
  const inputElements = document.getElementsByClassName("level-input");
  const completions = {};
  Object.keys(inputElements).forEach((inputIndex) => {
    const level = Number(inputIndex) + 2;
    const element = inputElements[inputIndex];
    completions[level] = element.value ? Number(element.value) : 0;
  })
  return completions;
}

function calculateItemChance(inverseItemChances, excludeLevels=[]) {
  const totalInverseChance = Object.keys(inverseItemChances).reduce((product, level) => {
    const exclude = excludeLevels.indexOf(Number(level)) !== -1;
    if (exclude) {
      return product;
    }
    return product * inverseItemChances[level];
  }, 1);
  return 1 - totalInverseChance;
}

function calculateTotal(clothChance, staffChance, bootsChance) {
  return 1 - ((1 - clothChance) * (1 - staffChance) * (1 - bootsChance));
}

function formatPercent(num) {
  num = Math.round(num * 10000) / 100;
  return `${num}%`
}

function calculate() {
  const completions = getCompletionsFromInputs();

  const inverseItemChances = {}
  const inversePetChances = {}
  Object.keys(completions).forEach(level => {
    const count = completions[level] || 0;
    const itemRate = ITEM_RATES[level] || 0;
    const petRate = PET_RATES[level] || 0;
    inverseItemChances[level] = (1 - itemRate) ** count;
    inversePetChances[level] = (1 - petRate) ** count;
  });


  const clothChance = calculateItemChance(inverseItemChances);
  const staffChance = calculateItemChance(inverseItemChances, [2]);
  const bootsChance = calculateItemChance(inverseItemChances, [2, 3]);
  const petChance = calculateItemChance(inversePetChances, [2, 3, 4, 5]);

  document.getElementById('cloth-result').innerText = formatPercent(clothChance);
  document.getElementById('staff-result').innerText = formatPercent(staffChance);
  document.getElementById('boots-result').innerText = formatPercent(bootsChance);
  document.getElementById('pet-result').innerText = formatPercent(petChance);
  document.getElementById('total-result').innerText = formatPercent(calculateTotal(clothChance, staffChance, bootsChance))

}

function main() {
  const form = document.getElementById("calc-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculate();
  })
}

document.addEventListener("DOMContentLoaded", main);