document.addEventListener("DOMContentLoaded", function() {
    const countryFilterInput = document.getElementById('countryFilter');
    const companyFilterInput = document.getElementById('companyFilter');
    const table = document.querySelector('.table tbody');
    
    // Event-Listener für die Filterfelder hinzufügen
    countryFilterInput.addEventListener('input', filterTable);
    companyFilterInput.addEventListener('input', filterTable);

    function filterTable() {
        const countryFilter = countryFilterInput.value.toLowerCase();
        const companyFilter = companyFilterInput.value.toLowerCase();
        const rows = table.getElementsByTagName('tr');

        for (let row of rows) {
            const countryCell = row.getElementsByTagName('td')[0].textContent.toLowerCase();
            const companyCell = row.getElementsByTagName('td')[1].textContent.toLowerCase();
            
            // Zeile anzeigen, wenn beide Filter übereinstimmen
            if (countryCell.includes(countryFilter) && companyCell.includes(companyFilter)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }

    // Sortierfunktion für die Spaltenköpfe
    const headers = document.querySelectorAll('.table thead th');
    headers.forEach((header, index) => {
        header.addEventListener('click', () => sortTable(index));
    });

    function sortTable(columnIndex) {
        const rows = Array.from(table.getElementsByTagName('tr'));
        const isNumeric = columnIndex === 2; // CO2-Emissionen sind numerisch
        const currentSortOrder = headers[columnIndex].getAttribute('data-sort-order') === 'asc' ? 'desc' : 'asc';

        rows.sort((a, b) => {
            const cellA = a.getElementsByTagName('td')[columnIndex].textContent.trim();
            const cellB = b.getElementsByTagName('td')[columnIndex].textContent.trim();

            // Vergleiche Zahlen oder Text
            if (isNumeric) {
                const numA = parseFloat(cellA.replace(/[^0-9.,]/g, '').replace(',', '.'));
                const numB = parseFloat(cellB.replace(/[^0-9.,]/g, '').replace(',', '.'));
                return currentSortOrder === 'asc' ? numA - numB : numB - numA;
            } else {
                return currentSortOrder === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
            }
        });

        // Sortierte Reihen zurück in die Tabelle einfügen
        rows.forEach(row => table.appendChild(row));

        // Sortierrichtung speichern
        headers[columnIndex].setAttribute('data-sort-order', currentSortOrder);
    }
});
