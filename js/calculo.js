let numeroAtual = '0';
let numeroGuardado = null;
let operacao = null;
let acabouDeCalcular = false;
let historico = []
const display = document.getElementById('valor');
const expressao = document.getElementById('expressao');

function insert(num) {

  if (acabouDeCalcular) {
    numeroAtual = '0';
    acabouDeCalcular = false;
  }

  if (num === '.') {
    if (numeroAtual.includes('.')) return;

    if (numeroAtual === '0') {
      numeroAtual = '0.';
    } else {
      numeroAtual += '.';
    }
  }
  else {
    if (numeroAtual === '0') {
      numeroAtual = num;
    } else {
      numeroAtual += num;
    }
  }

  atualizarDisplay();
}

document.getElementById("inicial").onclick = function () {
  location.href = "index.html";
};

document.getElementById("avancada").onclick = function () {
  location.href = "avancada.html";
};

document.getElementById("log").onclick = function () {
  location.href = "log.html";
};

document.getElementById("equacao").onclick = function () {
  location.href = "equacao.html";
};

document.getElementById("IA").onclick = function () {
  location.href = "IA.html";
};

function atualizarDisplay() {
  document.getElementById('valor').textContent = numeroAtual;
}

function limpar() {
  numeroAtual = '0';
  numeroGuardado = null;
  operacao = null;
  acabouDeCalcular = false;

  atualizarDisplay();

  expressao.textContent = '';
}

function apagar() {
  if (numeroAtual.length > 1) {
    numeroAtual = numeroAtual.slice(0, -1);
  } else {
    numeroAtual = '0';
  }

  atualizarDisplay();
}

function escolherOperacao(op) {
  numeroGuardado = parseFloat(numeroAtual);
  operacao = op;
  numeroAtual = '0';

  expressao.textContent = numeroGuardado + ' ' + op;
  atualizarDisplay();
}
function atualizarHistorico() {
  const div = document.getElementById('historico');

  div.innerHTML = '';

  historico.forEach(item => {
    const linha = document.createElement('p');
    linha.textContent = item;
    div.appendChild(linha);
  });
}
function calcular() {
  if (operacao === null || numeroGuardado === null) return;

  let a = numeroGuardado;
  let b = parseFloat(numeroAtual);
  let resultado;

  switch (operacao) {
    case '+': resultado = a + b; break;
    case '-': resultado = a - b; break;
    case '×': resultado = a * b; break;
    case '÷': resultado = b !== 0 ? a / b : 'Erro'; break;
    case '%': resultado = a * (b / 100); break;
    case '^': resultado = a ** b; break;
  }

  let conta = `${a} ${operacao} ${b} = ${resultado}`;
  historico.push(conta);
  atualizarHistorico();

  numeroAtual = resultado.toString();
  operacao = null;
  numeroGuardado = null;
  acabouDeCalcular = true;
  atualizarDisplay();
}

function raiz() {
  let num = parseFloat(numeroAtual);
  let res;

  res = Math.sqrt(num);

  let conta = `SQRT ${num} = ${res}`;
  historico.push(conta);
  atualizarHistorico();

  numeroAtual = res.toString();
  operacao = null;
  numeroGuardado = null;
  acabouDeCalcular = true;
  atualizarDisplay();
}

function trig(op) {
  let deg = parseFloat(numeroAtual);
  let num = (deg * Math.PI) / 180;
  let res;
  switch (op) {
    case 'sin': res = Math.round(Math.sin(num)); break;
    case 'cos': res = Math.cos(num); break;
    case 'tan': res = (Math.sin(num) / Math.cos(num)); break;
  }


  let conta = `${op} ${deg} = ${res}`;
  historico.push(conta);
  atualizarHistorico();

  numeroAtual = res.toString();
  operacao = null;
  numeroGuardado = null;
  acabouDeCalcular = true;
  atualizarDisplay();
}

function logaritmo() {
  let expoente = document.getElementById("expoente");
  let base = document.getElementById("base");

  let res = 
}
