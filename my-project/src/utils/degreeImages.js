export const normalizeDegree = (name = "") =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();

export const degreeImages = {
  // ===== MEDICAL =====
  mbbs: "/degrees/MBBS.webp",
  bds: "/degrees/BDS.jpg",
  bams: "/degrees/BAMS.jpg",
  bhms: "/degrees/BHMS.png",
  bsms: "/degrees/BSMS.jpg",
  bums: "/degrees/BUMS.jpg",
  bnys: "/degrees/BNYS.jpg",

  // ===== ENGINEERING =====
  "artificial intelligence and data science": "/degrees/AIDS.webp",
  "artificial intelligence and machine learning":
    "/degrees/AIML.png",
  "automobile engineering": "/degrees/AUTOMOBILE_ENGINEERING.jpg",
  "biomedical engineering": "/degrees/BIOMEDICALENGINEERING.jpg",
  "biotechnology engineering": "/degrees/BIOTECHNOLOGY_ENGINEERING.webp",
  "civil engineering": "/degrees/CIVIL_ENGINEERING.webp",
  "computer science engineering": "/degrees/COMPUTER_SCIENCE.webp",
  "electrical and electronics engineering":
    "/degrees/ELECTRICAL_AND_ELECTRONICS_ENGINEERING.jpg",
  "electrical engineering": "/degrees/ELECTRICAL_ENGINEERING.webp",
  "electronics and communication engineering":
    "/degrees/ELECTRONICS_AND_COMMUNICATION_ENGINEERING.png",
  "electronics engineering": "/degrees/ELECTRONICS_ENGINEERING.jpg",
  "information technology": "/degrees/INFORMATION_TECHNOLOGY.jpg",
  "mechanical engineering": "/degrees/MECHANICAL_ENGINEERING.jpg",
  "mechatronics engineering": "/degrees/MECHTRONICS_ENGINEERING.jpg",

  //======IAS=====//
  "ba economics": "/degrees/BA_ECONOMICS.png",
  "ba history": "/degrees/BA_HISTORY.jpg",
  "ba political science": "/degrees/BA_POLITICLE_SCIENCE.webp",
  "ba public administration": "/degrees/BA_PUBLIC_ADMINSTRATION.png",

  //==========SOFTWARE DEVELOPER=============//
 bca: "/degrees/BCA.jpg",

  "be computer science": "/degrees/BE_COMPUTER_SCIENCE.png",
  "be software engineering": "/degrees/BE_SOFTWERE_ENGINEERING.jpg",

  "bsc computer science": "/degrees/B.SC_COMPUTER_SCIENCE.jpg",

  "btech artificial intelligence and data science":
    "/degrees/BTECH_AI_DS.jpg",

  "btech information technology": "/degrees/BTech_IT.webp",


  //==================TEACHER================//
 
  bed: "/degrees/B.ED.png",
  med: "/degrees/M.ED.webp",
  "bsc mathematics": "/degrees/BSC_MATHAMATICS.jpeg",
  "bsc chemistry": "/degrees/BSC_CHEMISTRY.webp",
  "bsc physics": "/degrees/BSC_PHYSICS.webp",
  "ba tamil": "/degrees/BA_TAMIL.webp",
  "ba mathematics": "/degrees/BA_MATHAMATICS.jpg",
  "ba english": "/degrees/BA_ENGLISH.webp",


  //==============BUSINESS=============//


 bcom: "/degrees/BCOM.jpg",
  "bcom accounting and finance":
    "/degrees/BCOM_ACOUNTING_FINANCE.jpg",
  mba: "/degrees/MBA.jpg",
  "mba finance": "/degrees/MBA_FINANCE.jpg",
  "mba marketing": "/degrees/MBA_MARKETING.webp",
  bba: "/degrees/BBA.jpg",
  "bba logistics": "/degrees/BBA_LOGISTICS.jpg",
  "bba retail management": "/degrees/BBA_RATAIL_MANAGEMENT.jpg",


  //=================IPS==========//
  
  "be - btech": "/degrees/BE-BTECH.jpg",


  //===========RAILWAY=========//
 iti: "/degrees/ITI.webp",
  "diploma engineering": "/degrees/DIPLOMO_ENGINEERING.webp",
  ba: "/degrees/BA.jpg",
  bsc: "/degrees/BSC.jpg",

  //==========AGRICULTURE========//

  "diploma agriculture": "/degrees/DIPLOMO_AGRICULTURE.jpg",
  "bsc horticulture": "/degrees/BSC_HARTICULTURE.webp",
  "bsc agriculture": "/degrees/BSC_AGRICULTURE.jpg",
  
  //=============ANY DEGREE============//

   "any degree": "/degrees/ANY_DEGREE.webp",


};
