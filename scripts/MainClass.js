import gens from './Gens.js';
import methods from './Methods.js';

export default class Main {
  constructor(gen = 8) {
    this._genSelector = document.getElementById('genSelect');
    this._methodSelector = document.getElementById('methodSelect');
    this._chromaRow = document.getElementById('chromaCharmRow');
    this._chromaCb = document.getElementById('chromaCharmCb');
    this._meetingsForm = document.getElementById('meetingsForm');
    this._probaForm = document.getElementById('probaForm');
    this._meetingsInput = document.getElementById('meetingsInput');
    this._probaInput = document.getElementById('probaInput');
    this._resultRow = document.getElementById('resultRow');
    this._genSelector.addEventListener('change',({target: { value }}) => this.genSelected(value));
    this._methodSelector.addEventListener('change', ({target: { value }}) => this.methodSelected(value));
    this._meetingsForm.addEventListener('submit', event => {
      event.preventDefault();
      this.computeMeetings(this._meetingsInput.value);
    });
    this._probaForm.addEventListener('submit', event => {
      event.preventDefault();
      this.computeProba(this._probaInput.value);
    });
    this.genSelected(gen);
  }

  _computeMeetingsValue(value) {
    const g = this.generatorFinalSum();
    let temp = 0;
    for (let i = 0; i < value; ++i) {
      temp = g.next().value;
    }

    return temp;
  }

  computeMeetings(meetings) {
    const val = this._computeMeetingsValue(meetings);
    this.displayMessage(`On ${meetings} meetings, you will have ${val*100}% to have found a shiny.`);
  }

  get chromaCharm() {
    return this._chromaCb.checked;
  }

  _computeProbaValue(value) {
    const g = this.generatorFinalSum();
    let i = 0;
    for (const val of g) {
      ++i;
      if (val >= value) {
        return [i, val];
      }
    }
  }

  computeProba(proba) {
    const [val, finalProba] = this._computeProbaValue(proba / 100);
    this.displayMessage(`You will need to find ${val} pokemons to have ${proba}% chance to find your shiny (${finalProba * 100}% probability exactly).`)
  }

  static *generatorProbaSum(generatorProba) {
    let value = 1;
    for (const val of generatorProba) {
      value *= (1 - val);
      yield 1 - value;
    }
  }

  *generatorFinalSum() {
    yield * this.constructor.generatorProbaSum(this.method.probability(this.genNumber, this.chromaCharm));
  }

  displayMessage(message, error = false) {
    if (error) {
      this._resultRow.classList.add('text-danger');
    } else {
      this._resultRow.classList.remove('text-danger');
    }

    this._resultRow.innerText = message;
  }

  genSelected(value) {
    this.genNumber = Number(value);
    this.gen = gens[this.genNumber];
    const oldMethod = this._methodSelector.value;
    this._methodSelector.innerHTML = '';

    if (this.gen.chromaCharm) {
      this._chromaRow.classList.remove('d-none');
    } else {
      this._chromaRow.classList.add('d-none');
      this._chromaCb.checked = false;
    }

    for (const method of this.gen.methods) {
      const opt = document.createElement('option');
      opt.value = method;
      opt.innerText = methods[method].label;
      this._methodSelector.append(opt);
      if (opt.value === oldMethod) {
        opt.selected = true;
      }
    }

    this.methodSelected(this._methodSelector.value);
  }

  methodSelected(value) {
    this.method = methods[value];
    console.log(this.method);
  }
}
