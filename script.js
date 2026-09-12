// ================================
// ELEMENTOS PRINCIPAIS
// ================================

const header =
  document.querySelector('.header');

const toggle =
  document.querySelector('.nav-toggle');

const menu =
  document.querySelector('.nav-menu');

const navLinks =
  document.querySelectorAll('.nav-menu a');

const languageSelector =
  document.getElementById(
    'language-selector'
  );

const backToTop =
  document.getElementById(
    'back-to-top'
  );



// ================================
// MENU AO ROLAR
// ================================

window.addEventListener(
  'scroll',
  () => {

    if (header) {

      header.classList.toggle(
        'scrolled',
        window.scrollY > 30
      );

    }

  }
);



// ================================
// MENU MOBILE
// ================================

if (
  toggle &&
  menu
) {

  toggle.addEventListener(
    'click',
    () => {

      const isOpen =
        menu.classList.toggle(
          'open'
        );


      toggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

    }
  );

}



// Fecha o menu depois que
// o usuário escolhe uma opção

navLinks.forEach(
  link => {

    link.addEventListener(
      'click',
      () => {

        if (menu) {

          menu.classList.remove(
            'open'
          );

        }


        if (toggle) {

          toggle.setAttribute(
            'aria-expanded',
            'false'
          );

        }

      }
    );

  }
);



// ================================
// ANIMAÇÕES AO ROLAR
// ================================

const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add(
                'visible'
              );


            revealObserver
              .unobserve(
                entry.target
              );

          }

        }
      );

    },

    {
      threshold: 0.12
    }

  );



document
  .querySelectorAll(
    '.reveal'
  )
  .forEach(
    element => {

      revealObserver.observe(
        element
      );

    }
  );



// ================================
// CONTADORES
// ================================

const counters =
  document.querySelectorAll(
    '.counter'
  );


let countersStarted =
  false;



function animateCounters() {

  if (
    countersStarted
  ) {

    return;

  }


  countersStarted =
    true;



  counters.forEach(
    counter => {


      const target =
        Number(
          counter.dataset.target ||
          0
        );


      const duration =
        850;


      const start =
        performance.now();



      function frame(now) {


        const progress =
          Math.min(

            (
              now -
              start
            ) /
            duration,

            1

          );


        const value =
          Math.round(

            target *

            (
              1 -

              Math.pow(
                1 -
                progress,
                3
              )

            )

          );


        counter.textContent =
          value;


        if (
          progress < 1
        ) {

          requestAnimationFrame(
            frame
          );

        }

      }


      requestAnimationFrame(
        frame
      );

    }
  );

}



// ================================
// ATIVA CONTADORES
// ================================

const stats =
  document.querySelector(
    '.stats-grid'
  );


if (stats) {


  const statsObserver =
    new IntersectionObserver(

      entries => {


        if (
          entries[0]
            .isIntersecting
        ) {

          animateCounters();


          statsObserver
            .disconnect();

        }

      },

      {
        threshold:
          0.4
      }

    );


  statsObserver.observe(
    stats
  );

}



// ================================
// ANO AUTOMÁTICO
// ================================

const year =
  document.getElementById(
    'year'
  );


if (year) {

  year.textContent =
    new Date()
      .getFullYear();

}



// ================================
// REPOSITÓRIOS DO GITHUB
// ================================

fetch(
  'https://api.github.com/users/GiovaniVitor1'
)

  .then(
    response =>

      response.ok
        ? response.json()
        : Promise.reject()
  )

  .then(
    data => {


      const repoCount =
        document.getElementById(
          'repo-count'
        );


      if (
        repoCount &&
        typeof data.public_repos ===
        'number'
      ) {


        repoCount.dataset.target =
          data.public_repos;


        if (
          countersStarted
        ) {

          repoCount.textContent =
            data.public_repos;

        }

      }

    }
  )

  .catch(
    () => {

      // Mantém o valor padrão
      // caso a API esteja indisponível.

    }
  );



// ================================
// VOLTAR AO TOPO
// ================================

if (backToTop) {


  backToTop.addEventListener(
    'click',
    event => {


      event.preventDefault();


      window.scrollTo({

        top: 0,

        behavior: 'smooth'

      });

    }
  );

}



// ================================
// TRADUÇÕES
// ================================

const translations = {



  // ============================
  // PORTUGUÊS
  // ============================

  pt: {


    'nav.home':
      'Início',

    'nav.about':
      'Sobre',

    'nav.skills':
      'Habilidades',

    'nav.projects':
      'Projetos',

    'nav.education':
      'Formação',

    'nav.contact':
      'Contato',



    'hero.available':
      'Disponível para novas oportunidades',

    'hero.hello':
      'Olá, eu sou',

    'hero.role':
      'Analista de Dados & Desenvolvedor',

    'hero.description':
      'Transformo dados em informações úteis e ideias em soluções. Desenvolvo projetos de análise de dados, visualização e desenvolvimento de software.',

    'hero.projectsButton':
      'Ver projetos',

    'hero.status':
      'Dados & Desenvolvimento',

    'hero.float1':
      'Análise & Automação',

    'hero.float2':
      'Dados & Insights',



    'stats.projects':
      'Projetos em destaque',

    'stats.repos':
      'Repositórios públicos',

    'stats.techs':
      'Tecnologias e ferramentas',

    'stats.focus':
      'Foco em evolução',



    'about.label':
      'Sobre mim',

    'about.title':
      'Construindo uma carreira orientada por dados.',

    'about.p1':
      'Sou estudante de Análise e Desenvolvimento de Sistemas pela UNINTER, com formação complementar em Análise de Dados. Tenho direcionado meus estudos e projetos para análise de dados, visualização, bancos de dados, machine learning e desenvolvimento back-end.',

    'about.p2':
      'Minha trajetória prática inclui dashboards, testes A/B, análises estatísticas, consultas SQL, modelos de machine learning e APIs REST. Busco oportunidades onde eu possa unir raciocínio analítico, tecnologia e aprendizado contínuo para resolver problemas reais.',



    'skills.label':
      'Linguagens e tecnologias',

    'skills.title':
      'Ferramentas que uso para construir soluções.',

    'skills.side':
      'Da exploração dos dados à entrega de dashboards, modelos e aplicações.',

    'skills.powerbi':
      'Dashboards e indicadores',

    'skills.tableau':
      'Visualização e storytelling',

    'skills.html':
      'Estruturação de páginas web',

    'skills.css':
      'Layouts responsivos e interfaces',

    'skills.js':
      'Interatividade e lógica no front-end',

    'skills.spring':
      'APIs REST e integração com banco',

    'skills.git':
      'Versionamento e publicação de projetos',

    'skills.ml':
      'Regressão, classificação e clustering',



    'projects.label':
      'Projetos',

    'projects.title':
      'Projetos que colocam meus conhecimentos em prática.',

    'projects.all':
      'Todos os repositórios ↗',

    'projects.organizing':
      'Repositório em organização',



    'project1.type':
      'Análise de Dados',

    'project1.title':
      'Eficiência dos Operadores',

    'project1.description':
      'Análise de desempenho de operadores com preparação de dados, métricas e dashboard interativo no Tableau.',

    'project1.link':
      'Ver dashboard ↗',



    'project2.description':
      'API REST para gerenciamento de clientes, produtos e pedidos, com persistência em MySQL e testes via Postman.',



    'project3.type':
      'Estatística',

    'project3.title':
      'Funil & Teste A/A/B',

    'project3.description':
      'Análise de funil de conversão e testes estatísticos para avaliar alterações no aplicativo e apoiar decisões de produto.',

    'project3.tag':
      'Estatística',



    'project4.type':
      'Banco de Dados',

    'project4.title':
      'Análise de Base de Livros',

    'project4.description':
      'Consultas SQL para explorar livros, editoras, autores, avaliações e indicadores de engajamento em banco relacional.',

    'project4.tag':
      'Análise',



    'education.label':
      'Formação',

    'education.title':
      'Aprendizado contínuo, com prática.',

    'education.description':
      'Minha formação combina desenvolvimento de software, análise de dados e projetos aplicados.',

    'education.degreeType':
      'Graduação',

    'education.degree':
      'Análise e Desenvolvimento de Sistemas',

    'education.degreeDesc':
      'Fundamentos de programação, desenvolvimento web, banco de dados, engenharia de software e back-end.',

    'education.extraType':
      'Formação complementar',

    'education.data':
      'Análise de Dados',

    'education.tripleten':
      'Bootcamp TripleTen',

    'education.dataDesc':
      'Python, SQL, estatística, visualização, Tableau, Power BI, testes A/B, métricas de negócio e machine learning.',

    'education.practiceType':
      'Prática',

    'education.practice':
      'Projetos de Portfólio',

    'education.practiceDesc':
      'Desenvolvimento contínuo de projetos para demonstrar habilidades técnicas e capacidade de resolver problemas.',



    'contact.label':
      'Contato',

    'contact.title':
      'Vamos construir algo com dados e tecnologia?',

    'contact.description':
      'Estou aberto a oportunidades em Análise de Dados e Desenvolvimento.',

    'contact.linkedin':
      'Falar pelo LinkedIn',

    'contact.emailButton':
      'Enviar e-mail',

    'contact.whatsappButton':
      'Falar pelo WhatsApp',

    'contact.github':
      'Ver GitHub',

    'contact.cv':
      'Baixar currículo',



    'footer.text':
      'Desenvolvido para meu portfólio profissional.',

    'footer.back':
      'Voltar ao topo'

  },



  // ============================
  // INGLÊS
  // ============================

  en: {


    'nav.home':
      'Home',

    'nav.about':
      'About',

    'nav.skills':
      'Skills',

    'nav.projects':
      'Projects',

    'nav.education':
      'Education',

    'nav.contact':
      'Contact',



    'hero.available':
      'Open to new opportunities',

    'hero.hello':
      'Hi, I am',

    'hero.role':
      'Data Analyst & Developer',

    'hero.description':
      'I turn data into useful information and ideas into solutions. I build projects in data analysis, visualization and software development.',

    'hero.projectsButton':
      'View projects',

    'hero.status':
      'Data & Development',

    'hero.float1':
      'Analysis & Automation',

    'hero.float2':
      'Data & Insights',



    'stats.projects':
      'Featured projects',

    'stats.repos':
      'Public repositories',

    'stats.techs':
      'Technologies and tools',

    'stats.focus':
      'Focus on growth',



    'about.label':
      'About me',

    'about.title':
      'Building a data-driven career.',

    'about.p1':
      'I am studying Systems Analysis and Development at UNINTER, with additional training in Data Analysis. I focus my studies and projects on data analysis, visualization, databases, machine learning and back-end development.',

    'about.p2':
      'My hands-on experience includes dashboards, A/B tests, statistical analyses, SQL queries, machine learning models and REST APIs. I am looking for opportunities where I can combine analytical thinking, technology and continuous learning to solve real problems.',



    'skills.label':
      'Languages and technologies',

    'skills.title':
      'Tools I use to build solutions.',

    'skills.side':
      'From data exploration to dashboards, models and applications.',

    'skills.powerbi':
      'Dashboards and indicators',

    'skills.tableau':
      'Visualization and storytelling',

    'skills.html':
      'Web page structure',

    'skills.css':
      'Responsive layouts and interfaces',

    'skills.js':
      'Front-end interactivity and logic',

    'skills.spring':
      'REST APIs and database integration',

    'skills.git':
      'Version control and project publishing',

    'skills.ml':
      'Regression, classification and clustering',



    'projects.label':
      'Projects',

    'projects.title':
      'Projects that put my knowledge into practice.',

    'projects.all':
      'All repositories ↗',

    'projects.organizing':
      'Repository being organized',



    'project1.type':
      'Data Analysis',

    'project1.title':
      'Operator Efficiency',

    'project1.description':
      'Operator performance analysis with data preparation, metrics and an interactive Tableau dashboard.',

    'project1.link':
      'View dashboard ↗',



    'project2.description':
      'REST API for managing customers, products and orders, with MySQL persistence and Postman testing.',



    'project3.type':
      'Statistics',

    'project3.title':
      'Funnel & A/A/B Test',

    'project3.description':
      'Conversion funnel analysis and statistical tests to evaluate app changes and support product decisions.',

    'project3.tag':
      'Statistics',



    'project4.type':
      'Database',

    'project4.title':
      'Book Database Analysis',

    'project4.description':
      'SQL queries to explore books, publishers, authors, ratings and engagement indicators in a relational database.',

    'project4.tag':
      'Analysis',



    'education.label':
      'Education',

    'education.title':
      'Continuous learning through practice.',

    'education.description':
      'My education combines software development, data analysis and applied projects.',

    'education.degreeType':
      'Degree',

    'education.degree':
      'Systems Analysis and Development',

    'education.degreeDesc':
      'Programming fundamentals, web development, databases, software engineering and back-end development.',

    'education.extraType':
      'Additional training',

    'education.data':
      'Data Analysis',

    'education.tripleten':
      'TripleTen Bootcamp',

    'education.dataDesc':
      'Python, SQL, statistics, visualization, Tableau, Power BI, A/B testing, business metrics and machine learning.',

    'education.practiceType':
      'Practice',

    'education.practice':
      'Portfolio Projects',

    'education.practiceDesc':
      'Continuous project development to demonstrate technical skills and problem-solving ability.',



    'contact.label':
      'Contact',

    'contact.title':
      'Shall we build something with data and technology?',

    'contact.description':
      'I am open to opportunities in Data Analysis and Development.',

    'contact.linkedin':
      'Contact me on LinkedIn',

    'contact.emailButton':
      'Send email',

    'contact.whatsappButton':
      'Message on WhatsApp',

    'contact.github':
      'View GitHub',

    'contact.cv':
      'Download résumé',



    'footer.text':
      'Built for my professional portfolio.',

    'footer.back':
      'Back to top'

  }

};



// ================================
// APLICA O IDIOMA
// ================================

function applyLanguage(lang) {


  const dictionary =
    translations[lang] ||
    translations.pt;



  document
    .querySelectorAll(
      '[data-i18n]'
    )
    .forEach(
      element => {


        const key =
          element.dataset.i18n;


        if (
          dictionary[key]
        ) {

          element.textContent =
            dictionary[key];

        }

      }
    );



  // Idioma do documento

  document.documentElement.lang =
    lang === 'en'
      ? 'en'
      : 'pt-BR';



  // Título do navegador

  document.title =
    lang === 'en'

      ? 'Giovani Vitor | Data Analyst & Developer'

      : 'Giovani Vitor | Analista de Dados & Desenvolvedor';



  // Descrição SEO

  const metaDescription =
    document.getElementById(
      'meta-description'
    );


  if (
    metaDescription
  ) {


    metaDescription.setAttribute(

      'content',

      lang === 'en'

        ? 'Giovani Vitor portfolio — Data Analyst and Developer.'

        : 'Portfólio de Giovani Vitor — Analista de Dados e Desenvolvedor.'

    );

  }



  // Atualiza seletor

  if (
    languageSelector
  ) {

    languageSelector.value =
      lang;

  }



  // ============================
  // CURRÍCULO CONFORME IDIOMA
  // ============================

  const cvButton =
    document.querySelector(
      '[data-cv-pt]'
    );


  if (
    cvButton
  ) {


    const cvPath =
      lang === 'en'

        ? cvButton.dataset.cvEn

        : cvButton.dataset.cvPt;



    cvButton.setAttribute(
      'href',
      cvPath
    );


    cvButton.setAttribute(

      'download',

      lang === 'en'

        ? 'Giovani_Vitor_Resume_EN.pdf'

        : 'Curriculo_Giovani_Vitor.pdf'

    );

  }



  // Salva preferência

  localStorage.setItem(
    'portfolio-language',
    lang
  );

}



// ================================
// ALTERAÇÃO MANUAL DO IDIOMA
// ================================

if (
  languageSelector
) {


  languageSelector.addEventListener(

    'change',

    event => {

      applyLanguage(
        event.target.value
      );

    }

  );

}



// ================================
// IDIOMA INICIAL
// ================================

const savedLanguage =
  localStorage.getItem(
    'portfolio-language'
  );


const browserLanguage =

  navigator.language &&

  navigator.language
    .toLowerCase()
    .startsWith(
      'pt'
    )

    ? 'pt'

    : 'en';



applyLanguage(

  savedLanguage ||
  browserLanguage

);