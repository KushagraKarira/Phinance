const url = "https://openexchangerates.org/api/latest.json?app_id=e2b801d9e8d847c18918fe90710678f4";

// Function to fetch the latest exchange rates data
async function fetchExchangeRates() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to update the exchange rate in the selected cell
async function updateExchangeRate(firstCode, secondCode) {
  const exchangeRates = await fetchExchangeRates();
  const firstRate = exchangeRates.rates[firstCode];
  const secondRate = exchangeRates.rates[secondCode];
  const exchangeRate = secondRate / firstRate;
  const selectedCell = document.querySelector(".selected");
  selectedCell.innerHTML = exchangeRate.toFixed(4);
}

// Add a click event listener to all the cells
const cells = document.querySelectorAll("td");
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    // If the cell is already selected, remove the selection
    if (cell.classList.contains("selected")) {
      cell.classList.remove("selected");
      cell.innerHTML = cell.dataset.code;
    } else {
      // Otherwise, select the cell and show the currency code
      cell.classList.add("selected");
      cell.innerHTML = cell.dataset.code;
      // If two cells are selected, update the exchange rate
      const selectedCells = document.querySelectorAll(".selected");
      if (selectedCells.length === 2) {
        const firstCode = selectedCells[0].dataset.code;
        const secondCode = selectedCells[1].dataset.code;
        updateExchangeRate(firstCode, secondCode);
      }
    }
  });
});
