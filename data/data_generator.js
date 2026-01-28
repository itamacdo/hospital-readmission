// data_generator.js
export const gerarDadosHospitalares = () => {
    const alas = ['Cardiologia', 'Neurologia', 'Oncologia'];
    return alas.map(ala => ({
        nome: ala,
        pacientes: Math.floor(Math.random() * 50),
        riscoMedio: Math.random().toFixed(2)
    }));
};