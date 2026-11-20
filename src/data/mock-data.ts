import type { Course, Tcc } from "@/types"

export const heroPhoto =
  "https://images.unsplash.com/photo-1655720348590-c739c860beed?auto=format&fit=crop&w=1800&q=88"

export const mockWorks: Tcc[] = [
  {
    id: 1,
    title: "Sistema de Gestão Escolar para Instituições de Ensino Médio",
    author: "Marta Domingos",
    course: "Informática",
    year: 2024,
    advisor: "Eng. Paulo André",
    views: 1248,
    pages: 78,
    color: "#087B48",
    abstract:
      "Este trabalho apresenta o desenvolvimento de uma plataforma integrada para melhorar a gestão de dados académicos, processos administrativos e comunicação numa instituição de ensino médio.",
    keywords: ["Gestão escolar", "Sistemas de informação", "Educação"],
    contact: true,
  },
  {
    id: 2,
    title: "Plano de Marketing Digital para Pequenas Empresas Angolanas",
    author: "Edson Manuel",
    course: "Gestão Empresarial",
    year: 2024,
    advisor: "Dra. Helena Costa",
    views: 980,
    pages: 64,
    color: "#B58925",
    abstract:
      "Uma análise aplicada sobre estratégias digitais acessíveis e o seu impacto no crescimento sustentável de pequenas empresas no contexto angolano.",
    keywords: ["Marketing digital", "Empreendedorismo", "Estratégia"],
    contact: true,
  },
  {
    id: 3,
    title: "Cuidados de Enfermagem na Prevenção da Hipertensão Arterial",
    author: "Lúcia Mateus",
    course: "Enfermagem",
    year: 2023,
    advisor: "Enf. Carla José",
    views: 1524,
    pages: 82,
    color: "#2E7784",
    abstract:
      "O estudo identifica práticas de enfermagem eficazes para prevenção, educação e acompanhamento de pacientes em risco de hipertensão arterial.",
    keywords: ["Enfermagem", "Prevenção", "Hipertensão"],
    contact: false,
  },
  {
    id: 4,
    title: "Automação de Processos Contabilísticos com Ferramentas Digitais",
    author: "Isaías Pedro",
    course: "Contabilidade",
    year: 2023,
    advisor: "Msc. Tomás Bunga",
    views: 745,
    pages: 71,
    color: "#73597A",
    abstract:
      "Investigação sobre o contributo de ferramentas digitais para reduzir erros, melhorar relatórios e tornar os processos contabilísticos mais eficientes.",
    keywords: ["Contabilidade", "Automação", "Tecnologia"],
    contact: true,
  },
  {
    id: 5,
    title: "Redes de Computadores Seguras em Ambientes Académicos",
    author: "Daniel António",
    course: "Informática",
    year: 2022,
    advisor: "Eng. Paulo André",
    views: 669,
    pages: 89,
    color: "#345F79",
    abstract:
      "Proposta de uma arquitetura de rede segura, escalável e de baixo custo para instituições académicas de média dimensão.",
    keywords: ["Redes", "Cibersegurança", "Infraestrutura"],
    contact: true,
  },
  {
    id: 6,
    title: "Humanização no Atendimento em Unidades Hospitalares",
    author: "Rosa Joaquim",
    course: "Enfermagem",
    year: 2024,
    advisor: "Enf. Carla José",
    views: 1102,
    pages: 58,
    color: "#A45A5A",
    abstract:
      "Uma abordagem qualitativa sobre práticas de acolhimento e humanização no atendimento prestado por equipas de enfermagem.",
    keywords: ["Humanização", "Saúde", "Atendimento"],
    contact: true,
  },
]

export const mockCourses: Course[] = [
  { name: "Informática", count: 48, icon: "01" },
  { name: "Enfermagem", count: 36, icon: "02" },
  { name: "Gestão Empresarial", count: 31, icon: "03" },
  { name: "Contabilidade", count: 27, icon: "04" },
]
