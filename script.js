function convertJsonToCsv() {
    const jsonInput = document.getElementById("jsonInput").value;
    const messageDiv = document.getElementById("message");
    const csvTableContainer = document.getElementById("csvTableContainer");

    // Limpar mensagem de erro
    messageDiv.textContent = '';

    // Verificar se o campo JSON está vazio ou contém apenas espaços
    if (!jsonInput.trim()) {
        // trim remove os espaços em branco da frente e de trás da string
        // se a string for {} , esse if não será executado
        // se a string for "", o if será executado
        messageDiv.textContent = 'Por favor, cole um JSON válido!';
        return;
    }

    let jsonData;
    try {
        // Tentar analisar o JSON
        jsonData = JSON.parse(jsonInput);

        // Verifica se o JSON é vazio
        if (Object.keys(jsonData).length === 0) {
            throw new Error("JSON vazio. Insira um JSON com dados.");
        }

        
        // Caso o JSON seja um objeto, converte para um array com um único objeto
        if (typeof jsonData === 'object' && !Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        // Verificar se o JSON é um array (pode ser um array de objetos ou valores)
        if (!Array.isArray(jsonData)) {
            throw new Error('O JSON deve ser um array ou um objeto.');
        }
    } catch (e) {
        // Se houver erro, exibir mensagem de erro detalhada
        messageDiv.textContent = `Erro: dados inválidos. Informe um JSON.`
        console.log(`Erro: ${e.message}`);
        return;
    }

    // Limpar conteúdo anterior da tabela, se houver
    csvTableContainer.innerHTML = '';

    // Criar tabela
    const table = document.createElement('table');

    // Caso o JSON tenha um array de objetos, cria um cabeçalho
    const headerRow = table.insertRow();
    const keys = getKeys(jsonData);
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

// Função para obter todas as chaves únicas, incluindo aninhadas
function getKeys(data) {
    const keys = new Set();

    data.forEach(item => {
        // Para cada item no array, percorre as chaves (inclusão de chaves aninhadas)
        function extractKeys(obj, prefix = '') {
            if (typeof obj === 'object' && obj !== null) {
                Object.keys(obj).forEach(key => {
                    const newKey = prefix ? `${prefix}.${key}` : key;
                    keys.add(newKey);
                    extractKeys(obj[key], newKey); // Recursão para chaves aninhadas
                });
            } else {
                keys.add(prefix);
            }
        }

        extractKeys(item); // Chama a função para cada item
    });

    return Array.from(keys);
}

function clearFields() {
    document.getElementById("jsonInput").value = '';
    document.getElementById("csvTableContainer").innerHTML = '';
    document.getElementById("message").textContent = '';
}
