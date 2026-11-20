insert into public.courses (name, count, icon) values
  ('Informática', 48, '01'),
  ('Enfermagem', 36, '02'),
  ('Gestão Empresarial', 31, '03'),
  ('Contabilidade', 27, '04')
on conflict (name) do update set count = excluded.count, icon = excluded.icon;

insert into public.works
  (title, author, course, year, advisor, views, pages, color, abstract, keywords, contact)
values
  ('Sistema de Gestão Escolar para Instituições de Ensino Médio', 'Marta Domingos', 'Informática', 2024, 'Eng. Paulo André', 1248, 78, '#087B48', 'Este trabalho apresenta o desenvolvimento de uma plataforma integrada para melhorar a gestão de dados académicos, processos administrativos e comunicação numa instituição de ensino médio.', array['Gestão escolar', 'Sistemas de informação', 'Educação'], true),
  ('Plano de Marketing Digital para Pequenas Empresas Angolanas', 'Edson Manuel', 'Gestão Empresarial', 2024, 'Dra. Helena Costa', 980, 64, '#B58925', 'Uma análise aplicada sobre estratégias digitais acessíveis e o seu impacto no crescimento sustentável de pequenas empresas no contexto angolano.', array['Marketing digital', 'Empreendedorismo', 'Estratégia'], true),
  ('Cuidados de Enfermagem na Prevenção da Hipertensão Arterial', 'Lúcia Mateus', 'Enfermagem', 2023, 'Enf. Carla José', 1524, 82, '#2E7784', 'O estudo identifica práticas de enfermagem eficazes para prevenção, educação e acompanhamento de pacientes em risco de hipertensão arterial.', array['Enfermagem', 'Prevenção', 'Hipertensão'], false),
  ('Automação de Processos Contabilísticos com Ferramentas Digitais', 'Isaías Pedro', 'Contabilidade', 2023, 'Msc. Tomás Bunga', 745, 71, '#73597A', 'Investigação sobre o contributo de ferramentas digitais para reduzir erros, melhorar relatórios e tornar os processos contabilísticos mais eficientes.', array['Contabilidade', 'Automação', 'Tecnologia'], true),
  ('Redes de Computadores Seguras em Ambientes Académicos', 'Daniel António', 'Informática', 2022, 'Eng. Paulo André', 669, 89, '#345F79', 'Proposta de uma arquitetura de rede segura, escalável e de baixo custo para instituições académicas de média dimensão.', array['Redes', 'Cibersegurança', 'Infraestrutura'], true),
  ('Humanização no Atendimento em Unidades Hospitalares', 'Rosa Joaquim', 'Enfermagem', 2024, 'Enf. Carla José', 1102, 58, '#A45A5A', 'Uma abordagem qualitativa sobre práticas de acolhimento e humanização no atendimento prestado por equipas de enfermagem.', array['Humanização', 'Saúde', 'Atendimento'], true)
on conflict (title) do update set
  author = excluded.author,
  course = excluded.course,
  year = excluded.year,
  advisor = excluded.advisor,
  views = excluded.views,
  pages = excluded.pages,
  color = excluded.color,
  abstract = excluded.abstract,
  keywords = excluded.keywords,
  contact = excluded.contact;
