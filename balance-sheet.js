const form = document.querySelector('form');
const tbody = document.querySelector('tbody');
const errorContainer = document.querySelector('.error-container');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const ticker = event.target.elements.ticker.value.toUpperCase();

  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker}&apikey=YOUR_API_KEY`);

    if (response.status === 200) {
      const data = await response.json();

      // Clear existing rows from table
      tbody.innerHTML = '';

      // Loop through balance sheet items and add rows to table
      for (const [item, value] of Object.entries(data.annualReports[0])) {
        if (item !== 'fiscalDateEnding') {
          const row = document.createElement('tr');
          const itemCell = document.createElement('td');
          itemCell.textContent = item;
          const valueCell = document.createElement('td');
          valueCell.textContent = value;
          row.appendChild(itemCell);
          row.appendChild(valueCell);
          tbody.appendChild(row);
        }
      }

      // Hide error message if previously displayed
      errorContainer.style.display = 'none';
    } else {
      throw new Error('API request failed');
    }
  } catch (error) {
    console.error(error);

    // Display error message
    errorContainer.textContent = `Error: ${error.message}`;
    errorContainer.style.display = 'block';
  }
});
