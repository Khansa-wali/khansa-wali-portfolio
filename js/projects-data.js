/* =====================================================================
   PROJECT DATA — edit this file to add or update projects.
   The Portfolio page builds every card, filter, count and detail view
   from here, so you never need to touch the HTML or CSS.

   HOW TO ADD A PROJECT
   Copy one object in `projects` and fill in only what is true.
   Every field except id, title, category, overview and tech is optional:
   a field you leave out is simply not shown.

     id         unique, lowercase, no spaces (used in the page link)
     title      project name
     category   one of the category ids below
     overview   one or two sentences
     tech       list of technologies actually used
     published  false = hide the project without deleting it (default: shown)
     order      number; lower shows first (default: order in this file)
     featured   true = also appears in "Featured Projects"
     flagship   true = shown large (use for ONE project)
     status     'Completed' | 'Work in progress'   (only if accurate)
     kind       'Academic project' | 'Learning project' | 'Experiment'  (only if accurate)
     problem    the problem or motivation
     solution   the approach you took
     role       what you personally did
     features   list of main features
     approach   how you developed it
     challenges what was hard, what you learned
     images     list of screenshot paths, e.g. ['assets/img/projects/traffic-1.png']
     image      one thumbnail path (replaces the placeholder illustration)
     links      { github: 'https://github.com/Khansa-wali/REPO', demo: 'https://...' }
     visual     placeholder illustration: traffic | classify | cnn | trend | face | road | pulse | network
   ===================================================================== */
window.PORTFOLIO = {
  /* Categories match the Services page. `tab` is the short filter label. */
  categories: [
    { id: 'web',     tab: 'Web Development',      name: 'Web Development & Applications',        desc: 'Portfolio websites, web applications, frontend/backend integrated applications and interactive interfaces.', service: 'web' },
    { id: 'auto',    tab: 'Automation',           name: 'Automation & Workflow Solutions',       desc: 'Python and Excel automation, data processing scripts and workflow automation.',                              service: 'automation' },
    { id: 'data',    tab: 'Data & Dashboards',    name: 'Dashboards & Data Analytics',           desc: 'Data analysis, visualization, reporting systems and dashboard applications.',                               service: 'data' },
    { id: 'ml',      tab: 'Machine Learning',     name: 'Machine Learning',                      desc: 'Classification and regression models, predictive modelling, model training and evaluation.',                service: 'ml' },
    { id: 'vision',  tab: 'AI & Computer Vision', name: 'AI & Computer Vision',                  desc: 'Image classification, object detection, CNN-based applications and visual recognition systems.',            service: 'vision' },
    { id: 'backend', tab: 'Backend & APIs',       name: 'Backend, APIs & System Integration',    desc: 'Python backend applications, REST APIs, database-connected applications and integrated systems.',            service: 'backend' },
    { id: 'custom',  tab: 'Custom Solutions',     name: 'Custom Digital Solutions',              desc: 'Other software projects and integrated technical solutions that do not fit the other areas.',               service: 'custom' }
  ],

  projects: [
    {
      id: 'traffic-management',
      title: 'AI Intelligent Traffic Management System',
      category: 'vision',
      flagship: true,
      featured: true,
      visual: 'traffic',
      overview: 'A traffic management application that brings together vehicle detection, traffic analysis, road damage detection, prediction and emergency prioritization.',
      features: ['Vehicle detection', 'Traffic analysis', 'Road damage detection', 'Prediction', 'Emergency prioritization'],
      tech: ['Python', 'FastAPI', 'YOLOv8', 'Computer Vision']
    },
    {
      id: 'skin-disease-classification',
      title: 'Skin Disease Classification',
      category: 'vision',
      featured: true,
      visual: 'classify',
      overview: 'An image classification project exploring AI-based medical image analysis.',
      tech: ['Python', 'Deep Learning', 'Image Classification']
    },
    {
      id: 'covid-xray-cnn',
      title: 'COVID-19 X-ray Classification using CNN',
      category: 'vision',
      featured: true,
      visual: 'cnn',
      overview: 'A CNN-based image classification project.',
      tech: ['Python', 'CNN', 'Deep Learning']
    },
    {
      id: 'house-price-prediction',
      title: 'House Price Prediction',
      category: 'ml',
      featured: true,
      visual: 'trend',
      overview: 'A machine learning project involving data analysis and predictive modelling.',
      tech: ['Python', 'Machine Learning', 'Data Analysis']
    },
    {
      id: 'heart-failure-prediction',
      title: 'Heart Failure Prediction',
      category: 'ml',
      visual: 'pulse',
      overview: 'A machine learning project exploring heart failure prediction through predictive modelling.',
      tech: ['Python', 'Machine Learning']
    },
    {
      id: 'alzheimers-classification',
      title: 'Alzheimer’s Disease Classification',
      category: 'ml',
      visual: 'network',
      overview: 'A classification project related to Alzheimer’s disease.',
      tech: ['Python', 'Classification']
    },
    {
      id: 'face-mask-detection',
      title: 'Face Mask Detection using Haar Cascade',
      category: 'vision',
      visual: 'face',
      overview: 'A computer vision project that detects face masks using a Haar Cascade classifier.',
      tech: ['Python', 'Haar Cascade', 'Computer Vision']
    },
    {
      id: 'road-damage-detection',
      title: 'Road Damage Detection',
      category: 'vision',
      visual: 'road',
      overview: 'A computer vision project for detecting road damage.',
      tech: ['Python', 'Computer Vision']
    }
  ]
};
