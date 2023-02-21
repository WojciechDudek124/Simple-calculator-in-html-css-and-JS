const previousNumber = document.querySelector('.previousNumber p');

const currentNumber = document.querySelector('.currentNumber');

const mathSign = document.querySelector('.mathSign');

const clearButton = document.querySelector('.clear');

const operatorsButtons = document.querySelectorAll('.operator');

const numbersButtons = document.querySelectorAll('.number');

const equalsButtons = document.querySelector('.equals');

const historyCalculator = document.querySelector('.history');

const historyBtn = document.querySelector('.history-btn');


let result = '';

const displayNumbers = (number) => {
  if (number === '.' && currentNumber.innerHTML.includes('.')) return
  if (number === '.' && currentNumber.innerHTML === '') return currentNumber.innerHTML = '.0'

  currentNumber.innerHTML += number;
}

function operate () {
  if (currentNumber.innerHTML === '' && this.textContent === '-' ) {
    currentNumber.innerHTML = '-'
    return;
  }
  else if (currentNumber.innerHTML === '') {
    return
  }
    
  if ( mathSign !== ''){
    showResult()
  }

  previousNumber.innerHTML = currentNumber.innerHTML;
  mathSign.innerHTML = this.textContent;
  currentNumber.innerHTML = '';
}

function showResult () {
  if (previousNumber.innerHTML === '' || currentNumber.innerHTML === '') {
    return;
  }

  let a =Number(currentNumber.innerHTML);
  let b = Number(previousNumber.innerHTML);
  let operate = mathSign.innerHTML;

  switch (operate) {
    case '+' :
      result = a + b;
      break;
    case '-':
      result = b-a;
      break;
    case 'x':
      result = a*b;
      break;
    case '/':
      result = b/a; 
      break;
    case '2^':
      result = b**a;
      break;
  }

  addToHistory();
  historyBtn.classList.add('active');
  currentNumber.innerHTML = result;
  previousNumber.innerHTML = '';
  mathSign.innerHTML ='';
}

function addToHistory() {
  const newHistoryItem = document.createElement('li');
  newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result}`;
  newHistoryItem.classList.add('history-item');
  historyCalculator.appendChild(newHistoryItem);
}

function clearScreen () {
  result = '';
  currentNumber.innerHTML = '';
  previousNumber.innerHTML = '';
  mathSign.innerHTML = '';
}

function clearHistory () {
  historyCalculator.textContent = '';
}

clearButton.addEventListener('click', clearScreen);
operatorsButtons.forEach((operator) => operator.addEventListener('click', operate));
numbersButtons.forEach((number) => {
  number.addEventListener('click', () => {
  displayNumbers(number.innerText)
  })
});
equalsButtons.addEventListener('click', showResult);
historyBtn.addEventListener('click', clearHistory)