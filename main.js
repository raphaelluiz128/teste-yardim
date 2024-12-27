import { getKeys } from './utils.js';
import { clearFields, showMessage, createCsvTable, saveCsvFile } from './domManipulation.js';

let currentKeys = null;
let jsonData = null;

export function convertJsonToCsv() {
    const jsonInput = document.getElementById("jsonInput").value;
    const messageDiv = document.getElementById("message");
    const csvTableContainer = document.getElementById("csvTableContainer");

    // Limpar mensagem de erro
    messageDiv.textContent = '';

    // Verificar se o campo JSON está vazio ou contém apenas espaços
    if (!jsonInput.trim()) {
        showMessage('Por favor, cole um JSON válido!');
        return;
    }

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
        showMessage('Erro: dados inválidos. Informe um JSON.');
        console.log(`Erro: ${e.message}`);
        return;
    }
    currentKeys = getKeys(jsonData);
    // Criar e exibir a tabela
    createCsvTable(jsonData, currentKeys, csvTableContainer);
}

// Evento para salvar o CSV
document.getElementById("saveButton").addEventListener("click", () => {
    if (jsonData && currentKeys) {
        saveCsvFile(jsonData, currentKeys);
    } else {
        showMessage('Nenhum CSV foi gerado para salvar!', 'error');
    }
});

document.getElementById("convertButton").addEventListener("click", convertJsonToCsv);
document.getElementById("clearButton").addEventListener("click", clearFields);
