export function showMessage(message) {
    document.getElementById("message").textContent = message;
}

export function createCsvTable(jsonData, keys, csvTableContainer) {
    // Limpar conteúdo anterior da tabela, se houver
    csvTableContainer.innerHTML = '';

    // Criar tabela
    const table = document.createElement('table');

    // Caso o JSON tenha um array de objetos, cria um cabeçalho
    const headerRow = table.insertRow();
    keys.forEach(key => {
        const cell = headerRow.insertCell();
        cell.textContent = key;
    });

    // Dados da tabela
    jsonData.forEach(row => {
        const dataRow = table.insertRow();
        keys.forEach(key => {
            const cell = dataRow.insertCell();
            cell.textContent = row[key] !== undefined ? row[key] : ''; // Preenche células vazias com ''
        });
    });

    // Adicionar a tabela ao contêiner
    csvTableContainer.appendChild(table);
}

export function saveCsvFile(jsonData, keys) {
    // Gerar string CSV a partir do JSON
    const csvRows = [];
    csvRows.push(keys.join(';')); // Cabeçalho

    jsonData.forEach(row => {
        const values = keys.map(key => {
            const value = key.split('.').reduce((acc, cur) => (acc && acc[cur] !== undefined ? acc[cur] : ''), row);
            return `"${String(value).replace(/"/g, '""')}"`; // Escapar aspas duplas
        });
        csvRows.push(values.join(';'));
    });

    const csvContent = csvRows.join('\n');

    // Criar link para download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);

    link.click(); // Simula o clique no link
    document.body.removeChild(link); // Remove o link do DOM
}


export function clearFields() {
    document.getElementById("jsonInput").value = '';
    document.getElementById("csvTableContainer").innerHTML = '';
    document.getElementById("message").textContent = '';
}
