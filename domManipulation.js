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

export function clearFields() {
    document.getElementById("jsonInput").value = '';
    document.getElementById("csvTableContainer").innerHTML = '';
    document.getElementById("message").textContent = '';
}
