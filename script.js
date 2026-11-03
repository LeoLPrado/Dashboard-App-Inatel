function openMenu() {
  document.getElementById("menu_aba").style.display = "block"; 
}

function closeMenu() {
  document.getElementById("menu_aba").style.display = "none";    
}

function temaLim() {
    document.documentElement.style.setProperty('--cor-click', '#38184C');
    document.documentElement.style.setProperty('--cor-sombra', '#9b0a59');
    document.documentElement.style.setProperty('--cor-text', 'black');
    document.documentElement.style.setProperty('--cor-back1', '#CEF09D');
    document.documentElement.style.setProperty('--cor-back2', '#4f6a93');
    document.documentElement.style.setProperty('--md-sys-color-primary', '#38184C');
}

function temaInatel() {
    document.documentElement.style.setProperty('--cor-click', '#126ae2');
    document.documentElement.style.setProperty('--cor-sombra', '#0a599b');
    document.documentElement.style.setProperty('--cor-text', 'black');
    document.documentElement.style.setProperty('--cor-back1', '#edf2f4');
    document.documentElement.style.setProperty('--cor-back2', '#6a937a');
    document.documentElement.style.setProperty('--md-sys-color-primary', '#126ae2');
}

function temaDark() {
    const cores = {
        '--cor-click': '#CEF09D',
        '--cor-sombra': '#9b0a59',
        '--cor-text': 'black', /* Modificado para o texto ficar visível no modo dark */
        '--cor-back1': '#38184C',
        '--cor-back2': '#4f6a93',
        '--md-sys-color-primary': '#CEF09D'
    };

    for (const [variavel, valor] of Object.entries(cores)) {
        document.documentElement.style.setProperty(variavel, valor);
    }
}

const eventos = [
    {
        id: 1,
        title: 'Semana do Software 2025',
        date: '12/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'tech',
        description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 2,
        title: 'Workshop de IoT',
        date: '12/01',
        time: '08:00',
        location: 'Laboratório CS&I',
        type: 'tech',
        description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 3,
        title: 'Festa dos Alunos 2025',
        date: '18/05',
        time: '19:00',
        location: 'Área Esportiva',
        type: 'cultural',
        description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 4,
        title: 'Feira de Oportunidades',
        date: '04/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'academic',
        description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
    }
];

const carousel = document.querySelector('.carousel');

function createCards() {
    eventos.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
            </div>
        `;
        carousel.appendChild(card);
    });
}

let index = 0;
function nextCard() {
    index = (index + 1) % eventos.length;
    updateCarousel();
}

function prevCard() {
    index = (index - 1 + eventos.length) % eventos.length;
    updateCarousel();
}

function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

document.getElementById('nextBtn').addEventListener('click', nextCard);
document.getElementById('prevBtn').addEventListener('click', prevCard);

setInterval(nextCard, 5000);

let startX;
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
});

createCards();

// Componente Aulas
class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); 
    this.aulas = [
      { id: 1, disciplina: 'S05 - Interface Homem-máquina', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: false, prova: '12/05', frequencia: '10/25', nota: '10' },
      { id: 2, disciplina: 'E01 - Circuitos Elétricos em Corrente Contínua', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: true, prova: '12/05', frequencia: '10/25', nota: '5' },
      { id: 3, disciplina: 'M02 - Álgebra e Geometria Analítica', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: true, prova: '12/05', frequencia: '10/25', nota: '7' }
    ];
    this.hoje = "ter"; 
  }

  connectedCallback() {
    this.render(); 
  }

  render() {
    const aulasDia = this.aulas.filter(a => a.data === this.hoje); 
    this.shadowRoot.innerHTML = `
      <style>
      .comp-aula {
        position: relative;
        background-color: white;
        padding: 15px;
        margin: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      }
      .titulo_aula {
        font-family: "Arimo", sans-serif;
        font-weight: bold;
        font-size: 15px;
        color: var(--cor-text);
        padding: 0 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p {
        font-family: "Arimo", sans-serif;
        font-size: 11px;
        color: var(--cor-text);
        line-height: 1.5;
        padding: 0 5px;
      }
      .lables { display: flex; }
      .lable-prova { background-color: var(--prova); padding: 7px 15px; margin-bottom: 10px; border-radius: 500px; text-align: center; }
      .lable-frequencia { background-color: var(--frequencia); padding: 7px 15px; margin-right: 10px; border-radius: 500px; }
      .lable-nota { background-color: var(--prova); padding: 7px 15px; margin-right: 10px; border-radius: 500px; }
      .lable-nota-vermelho { background-color: red; padding: 7px 15px; margin-right: 10px; border-radius: 500px; }
      .lable-nota-laranja { background-color: yellow; padding: 7px 15px; margin-right: 10px; border-radius: 500px; color: black; }
      .lable-nota-verde { background-color: green; padding: 7px 15px; margin-right: 10px; border-radius: 500px; }
      .p_lable { font-family: "Arimo", sans-serif; font-size: 11px; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      </style>
      <div>
        ${aulasDia.map(a => {
          let provaDisplay = a.prova_alert ? '' : 'display: none;';
          return `
            <div class="comp-aula">
              <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
              <div class="lables">
                <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                <div class="lable-nota p_lable">CR: <b>${a.nota}</b></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}
customElements.define('aulas-component', AulasComponent);

// RESERVA ARMÁRIO
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

let tipoSelecionado = null;

document.querySelectorAll('.tipo').forEach(div => {
  div.addEventListener('click', () => {
    document.querySelectorAll('.tipo').forEach(d => d.classList.remove('selected'));
    div.classList.add('selected');
    tipoSelecionado = div.dataset.value;
  });
});

function reservarArmario() {
  const resultado = document.getElementById("resultado");
  const armarioNumero = document.getElementById("armarioNumero");

  if (!tipoSelecionado) {
    resultado.innerText = "Por favor, selecione um tipo de armário antes de reservar.";
    armarioNumero.style.display = "none";
    return;
  }

  let armariosDisponiveis = armarios.filter(a => 
    a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel
  );

  if (armariosDisponiveis.length === 0) {
    resultado.innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    armarioNumero.style.display = "none";
    return;
  }

  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
  armarioEmprestado.status = false;

  let dataReserva = new Date();
  armarioEmprestado.dataReserva = dataReserva.toLocaleString("pt-BR");

  let dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);
  armarioEmprestado.dataEntrega = dataEntrega.toLocaleString("pt-BR");

  usuario.pendencia = true;

  armarioNumero.innerText = `Armário Nº ${armarioEmprestado.id}`;
  armarioNumero.style.display = "block";

  resultado.innerText = 
    `Data da reserva: ${armarioEmprestado.dataReserva}\n` +
    `Data de entrega: ${armarioEmprestado.dataEntrega}`;
}

// Cor da nota
function corDaNota(nota) {
  if (nota < 6) return "red";
  if (nota < 8) return "orange";
  return "green";                // nota >= 8
}

const componente = document.querySelector("aulas-component");

componente.shadowRoot.querySelectorAll(".lable-nota").forEach(div => {
  const nota = parseFloat(div.querySelector("b").textContent.replace(",", "."));
  div.style.backgroundColor = corDaNota(nota);
});

// MERCADO DE TRABALHO
const AREAS = [
  "Desenvolvimento web", "Back end", "Front end", "Dados", "DevOps", "QA",
  "Mobile", "UX/UI Design", "Segurança da informação", "Cloud",
  "Inteligência artificial", "Embarcados e IoT", "Redes e telecomunicações",
  "Suporte de TI", "Banco de dados", "Gestão de produtos e projetos"
];
const MODALIDADES = ["Híbrido", "Presencial", "Remoto"];
const CHAVE_CANDIDATURAS = "candidaturas_mercado_trabalho";

let vagas = [];
let erroCarga = false;
let vagaAtual = null;
let curriculoAnexado = null;
let telaAtual = "tela_home";
let historico = [];
const filtros = { areas: [], modalidades: [], recentes: false };

function fmtDia(iso) {
  return `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;
}

function fmtDataHora(iso) {
  return new Date(iso).toLocaleString("pt-BR");
}

function esc(texto) {
  return String(texto).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function vagaEncerrada(v) {
  return new Date(`${v.prazo}T23:59:59`) < new Date();
}

function totalCandidaturas() {
  return vagas.filter(v => v.candidatada).length;
}

function lerCandidaturasSalvas() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_CANDIDATURAS) || "{}");
  } catch (erro) {
    return {};
  }
}

function salvarCandidatura(v) {
  try {
    const salvas = lerCandidaturasSalvas();
    salvas[v.id] = { dataCandidatura: v.dataCandidatura, curriculo: v.curriculo };
    localStorage.setItem(CHAVE_CANDIDATURAS, JSON.stringify(salvas));
  } catch (erro) {
    /* sem armazenamento disponível: a candidatura vale só nesta sessão */
  }
}

async function carregarVagas() {
  try {
    const resposta = await fetch("vagas.json");
    if (!resposta.ok) throw new Error(resposta.status);
    vagas = await resposta.json();
    const salvas = lerCandidaturasSalvas();
    vagas.forEach(v => {
      if (salvas[v.id]) {
        v.candidatada = true;
        v.dataCandidatura = salvas[v.id].dataCandidatura;
        v.curriculo = salvas[v.id].curriculo;
      }
    });
  } catch (erro) {
    vagas = [];
    erroCarga = true;
  }
  atualizarMercado();
}

function atualizarMercado() {
  const abertas = vagas.filter(v => !vagaEncerrada(v)).length;
  document.getElementById("mercado_total").textContent = erroCarga
    ? "Vagas indisponíveis no momento."
    : `${abertas} ${abertas === 1 ? "vaga de estágio e júnior disponível" : "vagas de estágio e júnior disponíveis"}`;
  document.querySelectorAll(".rotulo_minhas").forEach(b => {
    b.textContent = `Minhas candidaturas (${totalCandidaturas()})`;
  });
  renderLista();
}

//Navegação entre telas
function mostrarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.style.display = "none");
  document.getElementById(id).style.display = "block";
  telaAtual = id;
  if (id === "tela_vagas") renderLista();
  if (id === "tela_detalhe") renderDetalhe();
  if (id === "tela_candidaturas") renderCandidaturas();
  window.scrollTo(0, 0);
}

function irPara(id) {
  if (id === telaAtual) return;
  historico.push(telaAtual);
  mostrarTela(id);
}

function voltar() {
  mostrarTela(historico.pop() || "tela_home");
}

function abrirVagas() { irPara("tela_vagas"); }
function abrirCandidaturas() { irPara("tela_candidaturas"); }

//Filtros 
function criarOpcoes(idLista, itens) {
  document.getElementById(idLista).innerHTML = itens.map(item =>
    `<label class="opcao"><input type="checkbox" value="${item}" onchange="atualizarFiltros()"> ${item}</label>`
  ).join("");
}

function alternarLista(id) {
  ["lista_area", "lista_modalidade"].forEach(l => {
    const lista = document.getElementById(l);
    const abrir = l === id && lista.style.display === "none";
    lista.style.display = abrir ? "block" : "none";
    document.getElementById(l === "lista_area" ? "btn_area" : "btn_modalidade")
      .setAttribute("aria-expanded", abrir);
  });
}

function alternarRecentes() {
  filtros.recentes = !filtros.recentes;
  atualizarBotoesFiltro();
  renderLista();
}

function atualizarFiltros() {
  filtros.areas = [...document.querySelectorAll("#lista_area input:checked")].map(i => i.value);
  filtros.modalidades = [...document.querySelectorAll("#lista_modalidade input:checked")].map(i => i.value);
  atualizarBotoesFiltro();
  renderLista();
}

function atualizarBotoesFiltro() {
  const nArea = filtros.areas.length;
  const nModalidade = filtros.modalidades.length;
  const btnArea = document.getElementById("btn_area");
  const btnModalidade = document.getElementById("btn_modalidade");
  btnArea.textContent = nArea ? `Área (${nArea}) ▾` : "Área ▾";
  btnModalidade.textContent = nModalidade ? `Modalidade (${nModalidade}) ▾` : "Modalidade ▾";
  btnArea.classList.toggle("selected", nArea > 0);
  btnModalidade.classList.toggle("selected", nModalidade > 0);
  document.getElementById("btn_recentes").classList.toggle("selected", filtros.recentes);
}

function limparFiltros() {
  document.querySelectorAll("#lista_area input, #lista_modalidade input").forEach(i => i.checked = false);
  filtros.recentes = false;
  atualizarFiltros();
}

function vagasFiltradas() {
  const lista = vagas.filter(v =>
    (!filtros.areas.length || filtros.areas.includes(v.area)) &&
    (!filtros.modalidades.length || filtros.modalidades.includes(v.modalidade))
  );
  lista.sort(filtros.recentes
    ? (a, b) => b.publicadaEm.localeCompare(a.publicadaEm) || a.id - b.id
    : (a, b) => a.id - b.id);
  return lista;
}

// Lista de vagas
function barraStatusVaga(v) {
  if (v.candidatada) return `<div class="pill_topo pill_verde p_lable">JÁ CANDIDATOU-SE</div>`;
  if (vagaEncerrada(v)) return `<div class="pill_topo pill_vermelho p_lable">INSCRIÇÕES ENCERRADAS</div>`;
  return "";
}

function pilulasVaga(v) {
  return `<div class="lables_vaga">
      <div class="pill_vaga p_lable">${v.area}</div>
      <div class="pill_vaga p_lable">${v.nivel}</div>
      <div class="pill_vaga p_lable">${v.modalidade}</div>
    </div>`;
}

function cardVaga(v) {
  return `<div class="container card_vaga" role="button" tabindex="0" onclick="abrirVaga(${v.id})">
    ${barraStatusVaga(v)}
    <div class="titulo_aula quebra">${v.cargo}</div>
    <p>${v.empresa} · ${v.local}</p>
    <p>Inscrições até <b>${fmtDia(v.prazo)}</b> · Publicada em <b>${fmtDia(v.publicadaEm)}</b></p>
    ${pilulasVaga(v)}
  </div>`;
}

function renderLista() {
  const lista = vagasFiltradas();
  document.getElementById("contagem").textContent =
    `${lista.length} ${lista.length === 1 ? "vaga encontrada" : "vagas encontradas"}`;
  const destino = document.getElementById("lista_vagas");
  if (erroCarga) {
    destino.innerHTML = `<div class="container"><p>Não foi possível carregar o arquivo vagas.json. Abra o projeto por um servidor local (por exemplo, a extensão Live Server do VS Code).</p></div>`;
    return;
  }
  destino.innerHTML = lista.length
    ? lista.map(cardVaga).join("")
    : `<div class="container"><p>Nenhuma vaga encontrada para os filtros selecionados.</p></div>`;
}

//Detalhe da vaga
function abrirVaga(id) {
  vagaAtual = vagas.find(v => v.id === id);
  if (vagaAtual) irPara("tela_detalhe");
}

function renderDetalhe() {
  const v = vagaAtual;
  let feedback = "";
  let acao = "";
  if (v.candidatada) {
    feedback = `<div class="container">
      <div class="pill_topo pill_verde p_lable">CANDIDATURA ENVIADA</div>
      <p>Você se candidatou a esta vaga em <b>${fmtDataHora(v.dataCandidatura)}</b>, com o currículo <b>${esc(v.curriculo)}</b>.</p>
      <p>Fique atento ao e-mail e ao WhatsApp caso a empresa entre em contato. Não é possível se candidatar novamente a esta vaga.</p>
    </div>`;
  } else if (vagaEncerrada(v)) {
    acao = `<div class="container"><div class="pill_topo pill_vermelho p_lable">INSCRIÇÕES ENCERRADAS</div></div>`;
  } else {
    acao = `<div class="container">
      <div class="tipo-container">
        <div class="tipo_res p_lable" role="button" tabindex="0" onclick="abrirCandidatura()">Candidatar-se</div>
      </div>
    </div>`;
  }

  document.getElementById("conteudo_detalhe").innerHTML = `
    ${feedback}
    <div class="container">
      <div class="titulo_aula quebra">${v.cargo}</div>
      <p>${v.empresa} · ${v.local}</p>
      <p>Inscrições até <b>${fmtDia(v.prazo)}</b> · Publicada em <b>${fmtDia(v.publicadaEm)}</b></p>
      ${pilulasVaga(v)}
    </div>
    <div class="container">
      <h2 class="titulo_aula">Descrição da vaga</h2>
      <p>${v.descricao}</p>
      <h3>Responsabilidades</h3>
      <ul class="lista_det">${v.responsabilidades.map(i => `<li>${i}</li>`).join("")}</ul>
      <h3>Requisitos</h3>
      <ul class="lista_det">${v.requisitos.map(i => `<li>${i}</li>`).join("")}</ul>
    </div>
    ${acao}`;
}

//Candidatura
function abrirCandidatura() {
  if (!vagaAtual || vagaAtual.candidatada || vagaEncerrada(vagaAtual)) return;
  curriculoAnexado = null;
  ["cand_nome", "cand_email", "cand_telefone", "cand_pdf"].forEach(id => document.getElementById(id).value = "");
  document.getElementById("cand_cargo").textContent = vagaAtual.cargo;
  document.getElementById("cand_empresa").textContent = `${vagaAtual.empresa} · ${vagaAtual.local}`;
  document.getElementById("cand_msg").textContent = "";
  document.getElementById("cand_form").style.display = "block";
  document.getElementById("cand_resultado").style.display = "none";
  document.getElementById("tela_candidatura").classList.remove("com_barra_inferior");
  trancarFormulario(false);
  renderCurriculo();
  irPara("tela_candidatura");
}

function renderCurriculo() {
  const anexado = curriculoAnexado !== null;
  document.getElementById("cand_sem_arquivo").style.display = anexado ? "none" : "block";
  document.getElementById("cand_arquivo").style.display = anexado ? "flex" : "none";
  document.getElementById("cand_arquivo_nome").textContent = anexado ? curriculoAnexado.name : "";
  const botao = document.getElementById("btn_anexar");
  botao.classList.toggle("desativado", anexado);
  botao.setAttribute("aria-disabled", anexado);
}

function anexarCurriculo() {
  if (curriculoAnexado) return; // só 1 PDF: remova o atual (X) para anexar outro
  document.getElementById("cand_pdf").click();
}

function removerCurriculo() {
  curriculoAnexado = null;
  document.getElementById("cand_pdf").value = "";
  renderCurriculo();
}

document.getElementById("cand_pdf").addEventListener("change", e => {
  const arquivo = e.target.files[0];
  const mensagem = document.getElementById("cand_msg");
  if (!arquivo) return;
  if (arquivo.type !== "application/pdf" && !arquivo.name.toLowerCase().endsWith(".pdf")) {
    e.target.value = "";
    mensagem.textContent = "Por favor, anexe apenas um arquivo em PDF.";
    return;
  }
  curriculoAnexado = arquivo;
  mensagem.textContent = "";
  renderCurriculo();
});

function enviarCandidatura() {
  const v = vagaAtual;
  const mensagem = document.getElementById("cand_msg");
  const nome = document.getElementById("cand_nome").value.trim();
  const email = document.getElementById("cand_email").value.trim();
  const telefone = document.getElementById("cand_telefone").value.replace(/\D/g, "");

  if (!v || v.candidatada) {
    mensagem.textContent = "Você já se candidatou a esta vaga.";
    return;
  }
  if (vagaEncerrada(v)) {
    mensagem.textContent = "As inscrições para esta vaga foram encerradas.";
    return;
  }
  if (nome.length < 3) {
    mensagem.textContent = "Por favor, informe seu nome completo.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mensagem.textContent = "Por favor, informe um e-mail válido.";
    return;
  }
  if (telefone.length < 10) {
    mensagem.textContent = "Por favor, informe um telefone válido, com DDD.";
    return;
  }
  if (!curriculoAnexado) {
    mensagem.textContent = "Por favor, anexe seu currículo em PDF antes de enviar.";
    return;
  }

  v.candidatada = true;
  v.dataCandidatura = new Date().toISOString();
  v.curriculo = curriculoAnexado.name;
  salvarCandidatura(v);

  mensagem.textContent = "";
  trancarFormulario(true);
  document.getElementById("cand_sucesso_texto").textContent =
    `Enviada em ${fmtDataHora(v.dataCandidatura)}. Fique atento ao e-mail e ao WhatsApp caso a empresa entre em contato.`;
  document.getElementById("cand_resultado").style.display = "block";
  document.getElementById("tela_candidatura").classList.add("com_barra_inferior");
  atualizarMercado();
}

// Depois do envio o formulário fica só para consulta
function trancarFormulario(trancar) {
  document.getElementById("cand_form").classList.toggle("travado", trancar);
  ["cand_nome", "cand_email", "cand_telefone"].forEach(id => document.getElementById(id).disabled = trancar);
}

// Depois do envio os botoes levam para outras telas sem voltar ao formulário
function verCandidaturasAposEnvio() {
  historico = ["tela_home", "tela_vagas"];
  mostrarTela("tela_candidaturas");
}

function voltarParaVagas() {
  historico = ["tela_home"];
  mostrarTela("tela_vagas");
}

//Minhas candidaturas (da mais recente para a mais antiga)
function renderCandidaturas() {
  const lista = vagas
    .filter(v => v.candidatada)
    .sort((a, b) => new Date(b.dataCandidatura) - new Date(a.dataCandidatura));

  document.getElementById("cand_total").textContent = `Total de candidaturas: ${lista.length}`;
  document.getElementById("lista_candidaturas").innerHTML = lista.length
    ? lista.map(v => {
        const encerrada = vagaEncerrada(v);
        return `<div class="container card_vaga" role="button" tabindex="0" onclick="abrirVaga(${v.id})">
          <div class="pill_topo ${encerrada ? "pill_vermelho" : ""} p_lable">${encerrada ? "ENCERRADA" : "ENVIADA"}</div>
          <div class="titulo_aula quebra">${v.cargo}</div>
          <p>${v.empresa} · ${v.local}</p>
          <p>Candidatura enviada em <b>${fmtDataHora(v.dataCandidatura)}</b></p>
        </div>`;
      }).join("")
    : `<div class="container"><p>Você ainda não se candidatou a nenhuma vaga.</p></div>`;
}

//Inicializacao
criarOpcoes("lista_area", AREAS);
criarOpcoes("lista_modalidade", MODALIDADES);
carregarVagas();