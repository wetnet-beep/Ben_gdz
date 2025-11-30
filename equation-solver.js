// equation-solver.js - отдельный файл для решения уравнений

function solveMathEquation(equation) {
    let steps = [];
    let eq = equation.replace(/\s/g, '').replace(/,/g, '.');
    let [left, right] = eq.split('=');
    
    steps.push(`<strong>1. Исходное уравнение:</strong> ${equation}`);
    
    // ВЫЧИСЛЯЕМ ПРАВУЮ ЧАСТЬ
    let rightValue = eval(right);
    steps.push(`<strong>2. Вычисляем правую часть:</strong> ${right} = ${rightValue}`);
    
    // ВЫЧИСЛЯЕМ ЛЕВУЮ ЧАСТЬ БЕЗ X (константы)
    let leftWithoutX = left.replace(/x/g, '0');
    let constantValue = eval(leftWithoutX);
    steps.push(`<strong>3. Вычисляем постоянную часть слева:</strong> ${leftWithoutX} = ${constantValue}`);
    
    // НАХОДИМ КОЭФФИЦИЕНТ ПРИ X
    let xCoefficient = 0;
    
    // Заменяем все числа на 0, чтобы найти x-термы
    let xTerms = left.match(/([-+]?[\d.]*)x/g) || [];
    
    for (let term of xTerms) {
        let coeff = term.replace('x', '');
        if (coeff === '' || coeff === '+') {
            xCoefficient += 1;
        } else if (coeff === '-') {
            xCoefficient -= 1;
        } else {
            xCoefficient += parseFloat(coeff);
        }
    }
    
    steps.push(`<strong>4. Находим коэффициент при x:</strong> ${xCoefficient}`);
    
    // РЕШАЕМ УРАВНЕНИЕ
    // Формат: xCoefficient * x + constantValue = rightValue
    // => xCoefficient * x = rightValue - constantValue
    // => x = (rightValue - constantValue) / xCoefficient
    
    let xValue = (rightValue - constantValue) / xCoefficient;
    
    steps.push(`<strong>5. Решаем уравнение:</strong>`);
    steps.push(`&nbsp;&nbsp;${xCoefficient}x + ${constantValue} = ${rightValue}`);
    steps.push(`&nbsp;&nbsp;${xCoefficient}x = ${rightValue} - ${constantValue}`);
    steps.push(`&nbsp;&nbsp;${xCoefficient}x = ${rightValue - constantValue}`);
    steps.push(`&nbsp;&nbsp;x = ${rightValue - constantValue} / ${xCoefficient}`);
    steps.push(`<strong>6. Ответ:</strong> x = ${xValue}`);
    
    return { steps, solution: xValue };
}

// Проверяем, что функция определена для оффлайн работы
if (typeof solveMathEquation === 'undefined') {
    window.solveMathEquation = solveMathEquation;
      }
