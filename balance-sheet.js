const form = document.querySelector('form');
const tbody = document.querySelector('tbody');
const errorContainer = document.querySelector('.error-container');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const ticker = event.target.elements.ticker.value.toUpperCase();

  try {
    const response = await fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-balance-sheet?symbol=${ticker}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "0153f2df24msh7f34b10b0f36dc8p1435e0jsncd9de0d2aa61"
      }
    });

    if (response.status === 200) {
      const data = await response.json();

      // Clear existing rows from table
      tbody.innerHTML = '';

      // Loop through balance sheet items and add rows to table
      for (const item of data.balanceSheetHistory.balanceSheetStatements[0].balanceSheetStatements) {
        const row = document.createElement('tr');
        const itemCell = document.createElement('td');
        itemCell.textContent = item.shortName;
        const valueCell = document.createElement('td');
        valueCell.textContent = item.longFmtValue;
        row.appendChild(itemCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
      }

      // Hide error message if previously displayed
      errorContainer.style.display = 'none';
    } else {
      throw new Error('API Request failed');
    }
  } catch (error) {
    console.error(error);

    // Display error message
    errorContainer.textContent = `Error: ${error.message}`;
    errorContainer.style.display = 'block';
  }
});

