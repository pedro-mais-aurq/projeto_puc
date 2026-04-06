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

document.getElementById("graficos").onclick = function () {
  location.href = "graficos.html";
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
  let radicando = document.getElementById("radicando").value;
  let indice = document.getElementById("indice").value;


  if (radicando === 0 || indice === 0) {
    resultado2.innerHTML = "Preencha os valores.";
    return;
  }

  let res = formatar(Math.pow(radicando, 1 / indice));

  document.getElementById('resultadoRaiz').textContent = res;

  resultadoRaiz.innerHTML = `<sup>${indice}</sup>√${radicando} = ${res}`;
}

function calcularPotencia() {
  let base = document.getElementById("base").value;
  let expoente = document.getElementById("expoente").value;

  let res = formatar(base ** expoente);

  let resultado = document.getElementById('resultado');

  resultado.innerHTML = `${base}<sup>${expoente}</sup> = ${res}`;
}

function calcularTrig() {
  const input = document.getElementById('entrada');

  const valor = input.value;
  console.log("Valor digitado:", valor);

  let deg = parseFloat(valor);

  if (isNaN(deg)) {
    alert("Digite um ângulo válido!");
    return;
  }

  let rad = (deg * Math.PI) / 180;

  let seno = Math.sin(rad);
  let cosseno = Math.cos(rad);
  let tangente = Math.tan(rad);

  seno = parseFloat(seno.toFixed(6));
  cosseno = parseFloat(cosseno.toFixed(6));
  tangente = parseFloat(tangente.toFixed(6));


  atualizarResultadoTrig(seno, cosseno, tangente);

  let conta = `${deg}° → sen: ${seno}, cos: ${cosseno}, tan: ${tangente}`;
}

function atualizarResultadoTrig(seno, cosseno, tangente) {

  document.getElementById('seno').textContent = seno;
  document.getElementById('cosseno').textContent = cosseno;
  document.getElementById('tangente').textContent = tangente;
}

function calcularLogaritmo() {
  let x = document.getElementById("logaritmando").value;
  let b = document.getElementById("baseLogaritmo").value;

  let y = formatar(Math.log(x) / Math.log(b));

  document.getElementById('logaritmo').textContent = y;

  logaritmo.innerHTML = `log<sub>${b}</sub>${x} = ${y}`;
}

function primeiroGrau() {
  let a = document.getElementById("a1").value;
  let b = document.getElementById("b1").value;
  let x = document.getElementById("x1").value;

  let res = formatar((x - b) / a);

  document.getElementById('res1').textContent = res;

  res1.innerHTML = `${a}x + ${b} = ${x} <br> <span class="resultado">x = ${res}</span>`;
}

function segundoGrau() {
  let a = document.getElementById("a2").value.trim();
  let b = document.getElementById("b2").value.trim();
  let c = document.getElementById("c2").value.trim();
  let res = document.getElementById('res2');

  let delta = (b * b) - (4 * a * c);

  if (delta < 0) {
    res.innerHTML = `Delta = ${delta}, não possui raízes reais. `;

  } else if (delta == 0) {
    let x = (-b) / (2 * a);
    res = x.toFixed(2);

    res.innerHTML = `${a}x<sup>2</sup> + ${b} + ${c} = 0 <br>
    <span class = "resultado">x = ${x}`

  } else if (delta > 0) {
    let x1 = formatar((-b - Math.sqrt(delta)) / (2 * a));
    let x2 = formatar((-b + Math.sqrt(delta)) / (2 * a))  ;
    

    res.innerHTML = `${a}x<sup>2</sup> + ${b}x + ${c} = 0 <br>
     <span class = "resultado">Δ = ${delta}<br> 
     x<sub>1</sub> = ${x1} <br> 
     x<sub>2</sub> = ${x2}</span>`;
  }
}

function exponencial() {
  let b = document.getElementById("b3").value;
  let a = document.getElementById("a3").value;
  let res = document.getElementById('res3');
  console.log(a, b);
  if (a != 1 && a > 0 && b > 0) {
    let x = formatar(Math.log(b) / Math.log(a));

    res.innerHTML = `${a}<sup>${x}</sup> = ${b} <br> 
  <span class = "resultado"> x = ${x} </span>`;

  } else if (a = 1 || a < 0) {
    res.innerHTML = `O valor de A deve ser positivo e diferente de 1`;
  } 
  if (b < 0) {
    console.log("entrou no if");
    res.innerHTML = `O valor de B deve ser positivo`;
  }
}

function formatar(valor) {
  return Number(valor.toFixed(2));
}
