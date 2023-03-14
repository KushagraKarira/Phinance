function getBalanceSheet() {
  const companySymbol = document.getElementById("companySymbol").value;
  const apiKey = "5b38085c4451c128b9b0919a0dffab8f";
  const url = `https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/${companySymbol}?apikey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract the latest balance sheet data
      const balanceSheet = data.financials[data.financials.length - 1];

      // Create a new table element
      const table = document.createElement("table");

      // Create the header row
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `
        <th>Item</th>
        <th>Value</th>
      `;
      table.appendChild(headerRow);

      // Create rows for each balance sheet item
      for (const item in balanceSheet) {
        if (item !== "date") {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${item}</td>
            <td>${balanceSheet[item]}</td>
          `;
          table.appendChild(row);
        }
      }

      // Replace any existing table with the new one
      const existingTable = document.getElementById("balanceSheet");
      existingTable.replaceWith(table);
    })
    .catch(error => {
      console.error(error);
      alert("Error getting balance sheet data. Please check the company symbol and API key.");
    });
}

