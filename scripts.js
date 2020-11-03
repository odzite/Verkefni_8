/* eslint-disable no-console */
/**
 * Verkefni 8 – Caesar dulmál með vefviðmóti
 *
 * Verður að passa _nákvæmlega_ við gefið HTML, mun annars brotna.
 * Þ.e.a.s., ekki þarf að skrifa meðhöndlun á HTML elementum sem vantar
 */

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */

function encode(str, n, alphabet = '') {
  // Skilum tómastreng ef hliðrun lengri en stafróf
  if (n > alphabet.length) {
    return '';
  }

  // Skilum tómastreng ef str er falsy
  if (!str) {
    return '';
  }

  const upper = str.toLocaleUpperCase();

  let result = '';
  for (let i = 0; i < str.length; i += 1) {
    const index = alphabet.indexOf(upper[i]);

    // Bara birta stafi sem eru ekki í stafrófi
    if (index >= 0) {
      result += alphabet[(index + n) % alphabet.length];
    }
  }
  return result;
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @param {string} alphabet Stafróf sem afkóða á út frá
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n, alphabet = '') {
  return str
    .toLocaleUpperCase()
    .split('')
    .map((s) => alphabet.indexOf(s) - n) // hliðruð staðsetning stafs
    .map((i) => ((i < 0) ? alphabet.length + i : i)) // ef i verður neikvætt, förum aftast í stafróf
    .map((i) => alphabet[i])
    .join('');
}

const Caesar = (() => {
  // Default stafróf, uppfært þegar slegið inn í "alphabet"
  let alphabet = 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ';

  // Default type, uppfært af radio input
  // let type = 'encode';

  // Default hliðrun, uppfært af "shift"
  // let shift = 3;

  function updateAlphabet(e) {
    console.log(alphabet);
    alphabet = e.target.value;
    console.log(alphabet);
  }

  function radioChanged(e) {
    console.log(`Radio value = ${e.target.value}`);
  }

  // function rangeChanged(e) {
  // console.log(`Range value = ${e.target.value}`);
  // let rangeValue = document.querySelector(".shiftValue").value;
  // rangeValue.innerHTML = rangeValue;
  // kalla get result
  // getResult();
  // }

  function shiftChanged(e) {
    console.log(`Shift value = ${e.target.value}`);
  }

  function getResult() {
    const radioValue = document.querySelector('input[name="type"]:checked').value;
    // document.getElementById("searchTxt").value;

    const shiftValue = document.querySelector('#shift').value;

    const word = document.querySelector('#input').value;

    let result = document.querySelector('.result').value;

    if (radioValue !== 'decode') {
      result = encode(word, parseInt(shiftValue, 10), alphabet);
    } else {
      result = decode(word, shiftValue, alphabet);
    }
    document.querySelector('.result').innerHTML = result;
    console.log(`svar_code = ${result}`);
    console.log(`svar_string = ${word}`);
    console.log(`svar_alphabet = ${alphabet}`);
    console.log(`svar_hliðrun = ${shiftValue}`);
  }

  // Setja event handlera á viðeigandi element
  function init(el) {
    const alphabetInputElement = el.querySelector('#alphabet');
    alphabetInputElement.addEventListener('input', updateAlphabet);

    const radios = document.querySelectorAll('input[type=radio]');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < radios.length; i++) {
      radios[i].addEventListener('change', radioChanged);
    }

    const range = document.querySelector('#shift');
    const rangeValue = document.querySelector('.shiftValue');

    range.addEventListener('change', (e) => {
      rangeValue.innerHTML = range.value;
      console.log(`${range}`);
      console.log(`range input, target = ${e.target}, value = ${e.target.value}`);
      getResult();
    });

    rangeValue.addEventListener('change', shiftChanged);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const ceasarForm = document.querySelector('.ceasar');
  Caesar.init(ceasarForm);
});
