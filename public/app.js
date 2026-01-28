// 1. FUNÇÃO DE NAVEGAÇÃO (MUITO IMPORTANTE)
function showTab(tabId) {
    // Esconde todas as seções
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active');
    });

    // Remove destaque de todos os botões do menu
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostra a seção clicada
    document.getElementById(tabId).classList.add('active');

    // Destaca o botão clicado
    event.currentTarget.classList.add('active');
}

// 2. INICIALIZAÇÃO DOS GRÁFICOS
document.addEventListener('DOMContentLoaded', () => {
    const chartOptions = { responsive: true, maintainAspectRatio: false };

    // --- GRÁFICOS VISÃO GERAL ---
    new Chart(document.getElementById('chartGeral1'), {
        type: 'line',
        data: { labels: ['00h','06h','12h','18h','23h'], datasets: [{ label: 'Pacientes', data: [15, 10, 55, 40, 20], borderColor: '#3b82f6', tension: 0.4 }] },
        options: chartOptions
    });
    new Chart(document.getElementById('chartGeral2'), {
        type: 'doughnut',
        data: { labels: ['Unimed','SUS','Bradesco'], datasets: [{ data: [45, 30, 25], backgroundColor: ['#0f172a','#3b82f6','#94a3b8'] }] },
        options: chartOptions
    });

    // --- GRÁFICOS LEITOS ---
    new Chart(document.getElementById('chartLeitos1'), {
        type: 'bar',
        data: { labels: ['UTI','Enf','Ped','Obs'], datasets: [{ label: '% Ocupação', data: [98, 85, 40, 60], backgroundColor: '#1e293b' }] },
        options: chartOptions
    });
    new Chart(document.getElementById('chartLeitos2'), {
        type: 'bar',
        indexAxis: 'y',
        data: { labels: ['Cardio','Ortop','Geral'], datasets: [{ label: 'Dias de Permanência', data: [8, 4, 3], backgroundColor: '#3b82f6' }] },
        options: chartOptions
    });

    // --- GRÁFICO PREDIÇÃO (RADAR) ---
    new Chart(document.getElementById('chartIA'), {
        type: 'radar',
        data: {
            labels: ['Idade', 'Histórico', 'Comorbidade', 'Gravidade', 'Urgência'],
            datasets: [{ label: 'Impacto no Risco', data: [70, 90, 85, 60, 75], borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.2)' }]
        },
        options: chartOptions
    });

    // --- GRÁFICOS FINANCEIRO ---
    new Chart(document.getElementById('chartFin1'), {
        type: 'line',
        data: { 
            labels: ['Jan','Fev','Mar','Abr'], 
            datasets: [
                { label: 'Receita (M)', data: [2.0, 2.2, 2.1, 2.5], borderColor: '#10b981' },
                { label: 'Glosas (K)', data: [0.1, 0.2, 0.15, 0.18], borderColor: '#ef4444' }
            ] 
        },
        options: chartOptions
    });
    new Chart(document.getElementById('chartFin2'), {
        type: 'pie',
        data: { labels: ['Erro Cadastro','Falta Autorização','Prazos'], datasets: [{ data: [55, 30, 15], backgroundColor: ['#0f172a','#3b82f6','#cbd5e1'] }] },
        options: chartOptions
    });
});

// 3. LÓGICA DO SIMULADOR DE IA
function executarIA() {
    const idade = document.getElementById('idade').value;
    const consultas = document.getElementById('consultas').value;
    const doenca = document.getElementById('doenca').value;

    // Cálculo simulado de risco (regressão logística conceitual)
    let score = (idade * 0.15) + (consultas * 12) + (doenca * 20);
    score = Math.min(Math.max(score, 5), 99).toFixed(1);

    const valTxt = document.getElementById('risk-value');
    const bar = document.getElementById('risk-bar-fill');

    valTxt.innerText = score + "%";
    bar.style.width = score + "%";

    // Mudar cor conforme gravidade
    if(score > 70) bar.style.background = "#ef4444";
    else if(score > 40) bar.style.background = "#f59e0b";
    else bar.style.background = "#10b981";
}