const url = "https://openexchangerates.org/api/latest.json?app_id=e2b801d9e8d847c18918fe90710678f4";

let selectedCells = [];

// Function to fetch the latest exchange rates data
async function fetchExchangeRates() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to update the exchange rate in the selected cells
async function updateExchangeRates() {
  const exchangeRates = await fetchExchangeRates();
  const rates = exchangeRates.rates;

  for (let i = 0; i < selectedCells.length - 1; i++) {
    const firstCode = selectedCells[i].dataset.code;
    const secondCode = selectedCells[i+1].dataset.code;
    const firstRate = rates[firstCode];
    const secondRate = rates[secondCode];
    const exchangeRate = secondRate / firstRate;
    selectedCells[i].innerHTML = exchangeRate.toFixed(4);
  }
}

// Add a click event listener to all the cells
const cells = document.querySelectorAll("td");
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    // If the cell is already selected, remove the selection
    if (cell.classList.contains("selected")) {
      cell.classList.remove("selected");
      cell.innerHTML = cell.dataset.code;
      const index = selectedCells.indexOf(cell);
      selectedCells.splice(index, 1);
      // If a cell is deselected, update the exchange rates
      updateExchangeRates();
    } else {
      // Otherwise, select the cell and show the currency code
      cell.classList.add("selected");
      cell.innerHTML = cell.dataset.code;
      selectedCells.push(cell);
      // If two cells are selected, update the exchange rates
      if (selectedCells.length > 1) {
        updateExchangeRates();
      }
    }
  });
});

