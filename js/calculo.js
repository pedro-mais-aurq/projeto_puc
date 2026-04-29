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


document.getElementById("matriz").onclick = function () {
  location.href = "matriz.html";
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


  if (radicando < 0 || indice === 0) {
    resultado2.innerHTML = "Preencha os valores.";
    return;
  }

  let res = Math.pow(radicando, 1 / indice);
  res = res.toFixed(4);

  document.getElementById('resultadoRaiz').textContent = res;

  let symbol = "="
  if( (res**indice) != radicando){
    symbol = "≅"
  }

  resultadoRaiz.innerHTML = `<sup>${indice}</sup>√${radicando} ${symbol} ${res}`;
}

function juro() {
  let c = document.getElementById("capital").value;
  let i = document.getElementById("taxa").value;
  let t = document.getElementById("tempo").value;
  let j = document.getElementById("juro");

  if (c <= 0 || t <= 0) {
    j.innerHTML = "Preencha com valores válidos.";
    return;
  }


  let res = (c * i * t) / 100;

  j.innerHTML = `<sup>${c}*${i}*${t}</sup> / <sub>100</sub> = ${res}`;
  //document.getElementById('juro').textContent = res;
}
function montante() {
  let c = document.getElementById("capitalComposto").value;
  let i = document.getElementById("taxaComposto").value;
  let t = document.getElementById("tempoComposto").value;
  let m = document.getElementById("montante");

  if (c <= 0 || t <= 0) {
    m.innerHTML = "Preencha com valores válidos.";
    return;
  }


  let res = (c * ((1 + (i/100)) ** t));

  m.innerHTML = `${c}*(1+${i}/100)^<sup>${t}</sup> = ${res}`;
  //document.getElementById('juro').textContent = res;
}

function calcularPotencia() {
  let base = document.getElementById("base").value;
  let expoente = document.getElementById("expoente").value;

  
  
  let res = base ** expoente;
  res = res.toFixed(4);
  document.getElementById('resultado').textContent = res;
  if(base == 0 && expoente == 0){
    resultado.innerHTML = "Indefinido";
    return;
  }
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

  if (deg > 360) {
    while (deg > 360) {
      deg -= 360;
    }
  }

  if (deg < 0) {
    while (deg < 0) {
      deg += 360;
    }
  }
  let rad = (deg * Math.PI) / 180;



  let seno = Math.sin(rad);
  let cosseno = Math.cos(rad);
  let tangente = Math.tan(rad);

  seno = parseFloat(seno.toFixed(6));
  cosseno = parseFloat(cosseno.toFixed(6));
  tangente = parseFloat(tangente.toFixed(6));

  if (deg == 90 || deg == 270) {
    tangente = "Indefinido"
  }

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

  if( x <= 0 || b <= 0 || b == 1){
    alert("Base e logaritmando devem ser maior que 0. A base deve ser diferente de 1.")
    return
  }
  
  let y = formatar(Math.log(x) / Math.log(b));

  document.getElementById('logaritmo').textContent = y;

  logaritmo.innerHTML = `log<sub>${b}</sub>${x} = ${y}`;
}

function primeiroGrau() {
  let a = document.getElementById("a1").value;
  let b = document.getElementById("b1").value;

  let res = formatar((- b) / a);

  document.getElementById('res1').textContent = res;

  res1.innerHTML = `(${a})x + (${b}) = 0 <br> <p class="resultado">x = ${res}</p>`;
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
    let x = formatar((-b) / (2 * a));

    res.innerHTML = `(${a})x<sup>2</sup> + (${b}) + (${c}) = 0 <br>
      <p class = "resultado">Δ = 0<br>
      x = ${x}</p>`;

  } else if (delta > 0) {
    let x1 = formatar((-b - Math.sqrt(delta)) / (2 * a));
    let x2 = formatar((-b + Math.sqrt(delta)) / (2 * a));

    res.innerHTML = `(${a})x<sup>2</sup> + (${b})x + (${c}) = 0 <br>
     <p class = "resultado">Δ = ${delta}<br> 
     x<sub>1</sub> = ${x1} <br> 
     x<sub>2</sub> = ${x2}</p>`;
  }
}

function exponencial() {
  let b = document.getElementById("b3").value;
  let a = document.getElementById("a3").value;
  let res = document.getElementById('res3');

  if (a != 1 && a > 0 && b > 0) {
    let x = formatar(Math.log(b) / Math.log(a));

    res.innerHTML = `${a}<sup>x</sup> = ${b} <br> Log<sub>${a}</sub> ${b} = x <br> Log ${b} / Log ${a} = x <br> ${formatar(Math.log(b))} / ${formatar(Math.log(a))} = x<br>
  <p class = "resultado"> x = ${x} </p>`;

  } else if (a = 1 || a < 0) {
    res.innerHTML = `O valor de A deve ser positivo e diferente de 1`;
  }
  if (b < 0) {
    res.innerHTML = `O valor de B deve ser positivo`;
  }
}

function criacao(x) {
  let a, b, res;

  if (x == 1) {
    a = parseInt(document.getElementById("linha0").value);
    b = parseInt(document.getElementById("col0").value);
    res = document.getElementById("matriz1");
  } else {
    a = parseInt(document.getElementById("linha1").value);
    b = parseInt(document.getElementById("col1").value);
    res = document.getElementById("matriz2");
  }

  res.innerHTML = '';

  if (a <= 0 || b <= 0) {
    res.innerHTML = `<p>Coloque valores maiores que 0</p>`;
    return;
  }
  res.classList.add("matriz-grid");
  res.style.gridTemplateColumns = `repeat(${b}, 50px)`;

  for (let i = 0; i < a * b; i++) {
    res.innerHTML += `<input type="number" placeholder="0">`;
  }
}


function lerMatriz(mat) {
  const res = document.getElementById(mat); // Ou sua variável que referencia o grid

  // 1. Descobrir o número de colunas (B) através do CSS computado
  const estilos = window.getComputedStyle(res);
  const colunasTexto = estilos.gridTemplateColumns;
  // O navegador retorna algo como "50px 50px 50px"
  const colunas = colunasTexto.split(' ').filter(v => v !== '').length;

  // 2. Descobrir o número de linhas (A) com base no total de inputs
  const inputs = res.querySelectorAll('input');
  const totalInputs = inputs.length;
  const linhas = totalInputs / colunas;

  // 3. Organizar os dados em uma Matriz A x B
  const matriz = [];
  for (let i = 0; i < linhas; i++) {
    const linha = [];
    for (let j = 0; j < colunas; j++) {
      const index = i * colunas + j;
      // Pegamos o valor e convertemos para número
      linha.push(Number(inputs[index].value) || 0);
    }
    matriz.push(linha);
  }

  return matriz;
}


function matrizRes(op) {
  let result = document.getElementById("matrizResultado");
  result.innerHTML = `<h2>Preencha a matriz.</h2>`
  let mat1 = lerMatriz('matriz1')
  let mat2 = lerMatriz('matriz2')
  if (mat1.length <= 0) {
    return
  }
  let matriz = [];
  result.innerHTML = ``

  switch (op) {
    case '+':
      if (mat1.length != mat2.length || mat1[0].length != mat2[0].length) {
        result.innerHTML = `<h2>As matrizes devem ter a mesma dimensão</h2>`
        return
      }
      matriz = math.add(mat1, mat2);
      result.innerHTML += `<h2>Matriz resultado:</h2>`;
      break;
    case '-':
      if (mat1.length != mat2.length || mat1[0].length != mat2[0].length) {
        result.innerHTML = `<h2>As matrizes devem ter a mesma dimensão</h2>`
        return
      }
      matriz = math.subtract(mat1, mat2);
      result.innerHTML += `<h2>Matriz resultado:</h2>`;
      break;
    case '*':
      if (mat1[0].length != mat2.length) {
        result.innerHTML = `<h2>O tamanho de colunas da matriz A deve ser igual as linhas da matriz B.</h2>`
        return
      }
      matriz = math.multiply(mat1, mat2);
      result.innerHTML += `<h2>Matriz resultado:</h2>`;
      break;
    case 'd':
      if (mat1.length != mat1[0].length) {
        result.innerHTML = `<h2>A matriz deve ser quadrada.</h2>`
        return
      }
      matriz = math.det(mat1)
      result.innerHTML += `<h2>Determinante: </h2>`
      result.innerHTML += `${matriz}`
      return
    case 't':
      matriz = math.transpose(mat1);
      result.innerHTML += `<h2>Matriz transposta:</h2>`
      break;
    case 'i':
      if (mat1.length != mat1[0].length) {
        result.innerHTML = `<h2>A matriz deve ser quadrada.</h2>`
        return
      }
      if (math.det(mat1) == 0) {
        result.innerHTML = `<h2>Determinante não pode ser 0.</h2>`
        return
      }
      matriz = math.inv(mat1);
      result.innerHTML += `<h2>Matriz Inversa:</h2>`
      break;
  }
  matriz.forEach(row => {
    result.innerHTML += `<p>`
    row.forEach(item => {
      result.innerHTML += `[${item}]`
    });
    result.innerHTML += `</p>`
  });
}

function formatar(valor) {
  return Number(valor.toFixed(2));
}

function expressaoLog() {
  let a = document.getElementById("a4").value;
  let b = document.getElementById("b4").value;
  let x = document.getElementById("x4").value;
  let res = document.getElementById('res4');

  res.innerHTML = `${a}^<sup>${b}</sup> = ${x}`;

}
