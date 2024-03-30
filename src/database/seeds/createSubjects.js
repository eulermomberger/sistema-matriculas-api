exports.seed = async (knex) => {
  await knex('subjects').del();
  await knex('subjects').insert([
    { name: 'Programação Front-end' },
    { name: 'Programação Back-end' },
    { name: 'Laboratório I' },
    { name: 'Laboratório II' },
    { name: 'Programação I' },
    { name: 'Programação II' },
    { name: 'Comércio Eletrônico' },
    { name: 'Trabalho de Conclusão I' },
    { name: 'Trabalho de Conclusão II' },
    { name: 'Governança e Gestão de Tecnologia da Informação' },
    { name: 'Modelagem e Otimização de Sistemas Produtivos' },
    { name: 'Projeto Aplicado: Prática Profissional' },
    { name: 'Ciência de Dados e Big Data' },
    { name: 'Laboratório de Funções Organizacionais I' },
    { name: 'Laboratório de Funções Organizacionais II' },
    { name: 'Tecnologias para Inteligência Competitiva' },
  ]);
};
