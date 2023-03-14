function getBalanceSheet() {
  const companySymbol = document.getElementById("companySymbol").value;
  const url = `https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/${companySymbol}?apikey=5b38085c4451c128b9b0919a0dffab8f`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const balanceSheet = data.financials[0];

      // Create a new table element
      const table = document.createElement("table");

      // Create the header row
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `
        <th>Date</th>
        <th>Cash and Equivalents</th>
        <th>Short-term Investments</th>
        <th>Accounts Receivable</th>
        <th>Total Current Assets</th>
        <th>Property, Plant and Equipment Net</th>
        <th>Long-term Investments</th>
        <th>Goodwill and Intangible Assets</th>
        <th>Total Assets</th>
        <th>Current Liabilities</th>
        <th>Long-term Debt</th>
        <th>Total Liabilities</th>
        <th>Common Stock</th>
        <th>Retained Earnings</th>
        <th>Treasury Stock</th>
        <th>Shareholders Equity</th>
        <th>Net Tangible Assets</th>
      `;
      table.appendChild(headerRow);

      // Create a row for the balance sheet data
      const balanceSheetRow = document.createElement("tr");
      balanceSheetRow.innerHTML = `
        <td>${balanceSheet.date}</td>
        <td>${balanceSheet.cashAndShortTermInvestments}</td>
        <td>${balanceSheet.shortTermInvestments}</td>
        <td>${balanceSheet.accountsReceivable}</td>
        <td>${balanceSheet.totalCurrentAssets}</td>
        <td>${balanceSheet.propertyPlantEquipmentNet}</td>
        <td>${balanceSheet.longTermInvestments}</td>
        <td>${balanceSheet.goodwillAndIntangibleAssets}</td>
        <td>${balanceSheet.totalAssets}</td>
        <td>${balanceSheet.currentLiabilities}</td>
        <td>${balanceSheet.longTermDebt}</td>
        <td>${balanceSheet.totalLiabilities}</td>
        <td>${balanceSheet.commonStock}</td>
        <td>${balanceSheet.retainedEarnings}</td>
        <td>${balanceSheet.treasuryStock}</td>
        <td>${balanceSheet.shareholderEquity}</td>
        <td>${balanceSheet.netTangibleAssets}</td>
      `;
      table.appendChild(balanceSheetRow);

      // Replace any existing table with the new one
      const existingTable = document.getElementById("balanceSheet");
      existingTable.replaceWith(table);
    })
    .catch(error => {
      console.error(error);
      alert("Error getting balance sheet data. Please check the company symbol and API key.");
    });
}

