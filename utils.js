export function getKeys(data) {
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
