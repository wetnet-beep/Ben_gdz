// math-operations.js - математические операции столбиком

function solveMultiplication(a, b) {
    let steps = [];
    let column = '';
    
    steps.push(`<strong>Умножение:</strong> ${a} × ${b}`);
    
    if (b < 10) {
        // Простое умножение
        column += `   ${a}\n`;
        column += `×   ${b}\n`;
        column += `———\n`;
        column += `  ${a * b}`;
        
        steps.push(`<strong>Решение:</strong> ${a} × ${b} = ${a * b}`);
    } else {
        // Умножение столбиком
        let bStr = b.toString();
        let partialProducts = [];
        
        column += `     ${a}\n`;
        column += `×    ${b}\n`;
        column += `—————\n`;
        
        for (let i = bStr.length - 1; i >= 0; i--) {
            let digit = parseInt(bStr[i]);
            let product = a * digit;
            let spaces = ' '.repeat(bStr.length - 1 - i);
            partialProducts.unshift(product);
            column += `${spaces}  ${product}\n`;
        }
        
        if (partialProducts.length > 1) {
            column += `—————\n`;
            column += `  ${a * b}`;
        }
        
        steps.push(`<strong>Промежуточные произведения:</strong>`);
        partialProducts.forEach((prod, index) => {
            steps.push(`&nbsp;&nbsp;${a} × ${bStr[bStr.length - 1 - index]} = ${prod}`);
        });
        steps.push(`<strong>Итог:</strong> ${a} × ${b} = ${a * b}`);
    }
    
    return { steps, column: column };
}

function solveDivision(a, b) {
    let steps = [];
    let column = '';
    
    steps.push(`<strong>Деление:</strong> ${a} ÷ ${b}`);
    
    let quotient = Math.floor(a / b);
    let remainder = a % b;
    
    column += ` ${a} │ ${b}\n`;
    column += `-${quotient * b} │———\n`;
    column += ` ——  │ ${quotient}\n`;
    column += `  ${remainder}`;
    
    steps.push(`<strong>Решение:</strong>`);
    steps.push(`&nbsp;&nbsp;${a} ÷ ${b} = ${quotient}`);
    steps.push(`&nbsp;&nbsp;Проверка: ${quotient} × ${b} = ${quotient * b}`);
    if (remainder > 0) {
        steps.push(`&nbsp;&nbsp;Остаток: ${remainder}`);
    }
    
    return { steps, column: column };
}

function solveDivisionWithRemainder(a, b) {
    let steps = [];
    let column = '';
    
    steps.push(`<strong>Деление с остатком:</strong> ${a} ÷ ${b}`);
    
    let quotient = Math.floor(a / b);
    let remainder = a % b;
    
    column += ` ${a} │ ${b}\n`;
    column += `-${quotient * b} │———\n`;
    column += ` ——  │ ${quotient} (ост. ${remainder})\n`;
    column += `  ${remainder}`;
    
    steps.push(`<strong>Решение:</strong>`);
    steps.push(`&nbsp;&nbsp;${a} ÷ ${b} = ${quotient} (остаток ${remainder})`);
    steps.push(`&nbsp;&nbsp;Проверка: ${quotient} × ${b} + ${remainder} = ${quotient * b + remainder}`);
    
    return { steps, column: column };
}

// Проверяем, что функции определены для оффлайн работы
if (typeof solveMultiplication === 'undefined') {
    window.solveMultiplication = solveMultiplication;
}
if (typeof solveDivision === 'undefined') {
    window.solveDivision = solveDivision;
}
if (typeof solveDivisionWithRemainder === 'undefined') {
    window.solveDivisionWithRemainder = solveDivisionWithRemainder;
}
