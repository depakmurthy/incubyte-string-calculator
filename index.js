class NegativeNumberException extends Error {
    constructor(negativeNumbers) {
        super(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    }
}

function add(numbers) {
    let delimiter = ',';
    
    // Check for custom delimiter
    if (numbers.startsWith('//')) {
        const delimiterEndIndex = numbers.indexOf('\n');
        delimiter = numbers.substring(2, delimiterEndIndex);
        numbers = numbers.substring(delimiterEndIndex + 1);
    }
    
    // Replace custom delimiters and new lines with commas
    const regex = new RegExp(`[${delimiter}\n]`, 'g');
    numbers = numbers.replace(regex, ',');
    
    // Split numbers by comma
    const numArray = numbers.split(',').filter(num => num.trim() !== '');
    
    let totalSum = 0;
    const negativeNumbers = [];
    
    for (const num of numArray) {
        const value = parseInt(num, 10);
        if (isNaN(value)) {
            continue; // Skip invalid numbers
        }
        if (value < 0) {
            negativeNumbers.push(value);
        } else {
            totalSum += value;
        }
    }
    
    if (negativeNumbers.length > 0) {
        throw new NegativeNumberException(negativeNumbers);
    }
    
    return totalSum;
}

// Example usage:
console.log(add(""));           // Output: 0
console.log(add("1"));          // Output: 1
console.log(add("1,5"));        // Output: 6
console.log(add("1\n2,3"));     // Output: 6
console.log(add("//;\n1;2"));   // Output: 3

try {
    console.log(add("//|\n1|2|-3|4"));  // Should throw an exception
} catch (e) {
    console.error(e.message);   // Output: Negative numbers not allowed: -3
}
