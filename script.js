/* ============================================================
   Goal2Govt — main script
   - Government Jobs by Qualification (6 tiers, ~81 posts)
   - Software Developer / Civil Services / Nursing Career detail
   - Banking & Finance / Engineering & IT / Healthcare overviews
   - Career Tips
   All open through one generic tabbed-sheet modal engine.
   ============================================================ */

const tierMeta = {
  "10th":    { label:"After 10th (SSC/Matric)", color:"#2F7D4F" },
  "12th":    { label:"After 12th (Intermediate)", color:"#1F5FA8" },
  "iti":     { label:"After ITI (Trade Certificate)", color:"#8A5A00" },
  "diploma": { label:"After Diploma (Polytechnic)", color:"#6A4C93" },
  "degree":  { label:"After Degree (Graduate)", color:"#C1442E" },
  "btech":   { label:"After BTech / BE (Engineering)", color:"#0F7173" }
};

/* ---------- Road map templates (5-step journey), by roadmap type ---------- */
const roadmaps = {
  physical: [
    ["Track the notification","Watch the recruiting body's site and set a reminder — application windows are usually short."],
    ["Confirm eligibility","Check age limit, education proof and physical standards (height, chest, PET distance) before you apply."],
    ["Build fitness from day one","Start running, push-ups and endurance work months in advance — this is where most candidates lose marks."],
    ["Prepare the written paper","Cover general knowledge, basic reasoning and elementary maths alongside your fitness routine."],
    ["Clear PET/PST, medical and verification","Pass the physical test, get a medical clearance and carry originals + photocopies of every certificate."]
  ],
  clerical: [
    ["Track the notification","Follow the department's recruitment page and note the exact application dates."],
    ["Confirm eligibility","Check the required qualification, age limit and any typing/computer-skill requirement."],
    ["Build speed and accuracy","Practice typing and basic computer operations if the post needs a skill test."],
    ["Prepare the written test","Focus on English, reasoning, numerical ability and general awareness."],
    ["Clear the skill test and verification","Sit the typing/skill test, then complete document verification and joining formalities."]
  ],
  exam: [
    ["Track the exam calendar","Most of these exams run in tiers (Tier 1/Prelims, Tier 2/Mains) on a yearly cycle — mark every date."],
    ["Apply carefully","Fill the form accurately; a small error in category or post preference can cost you later."],
    ["Prepare tier by tier","Tier 1: quant, reasoning, English, general awareness. Tier 2/Mains: deeper, sometimes descriptive or post-specific."],
    ["Drill with full mock tests","Take timed mock papers weekly, then spend real time reviewing every wrong answer, not just the score."],
    ["Clear skill test/interview and merit list","Complete any typing/skill test or interview, then track your result through document verification."]
  ],
  trade: [
    ["Track apprenticeship/technician notifications","PSUs, railways and defence services post openings for specific ITI trades — follow them closely."],
    ["Confirm trade eligibility","Make sure your ITI trade and marks match what the specific employer is asking for."],
    ["Revise trade theory and basic aptitude","Refresh your NCVT/SCVT trade syllabus and practice simple reasoning and arithmetic."],
    ["Sit the written/skill-based selection","Selection is usually a written test plus a trade/skill test — some add a short interview."],
    ["Complete verification and join","Verify certificates, complete medical checks (for uniformed trades) and begin training or duty."]
  ],
  technical: [
    ["Track recruitment notifications","Follow SSC JE, RRB JE, state PWD/electricity boards and PSU career pages for openings in your branch."],
    ["Confirm eligibility","Check that your diploma/degree branch, marks and age match the specific post's requirements."],
    ["Prepare Paper-1 fundamentals","Revise general engineering, reasoning, general awareness and your core technical subjects."],
    ["Practice Paper-2 / descriptive questions","For posts with a second stage, practice long-answer and numerical problems in your branch."],
    ["Clear interview and verification","Attend the interview (where applicable) and complete document/medical verification before joining."]
  ],
  elite: [
    ["Map the syllabus early","These are long-cycle exams — read the full syllabus and previous notifications before you start."],
    ["Build your foundation","NCERT-level basics plus standard reference books and a daily current-affairs habit, sustained for months."],
    ["Master the objective stage","Drill MCQs and full-length mock tests for the prelim/GATE stage, with strict timing and negative-marking awareness."],
    ["Train for the descriptive/technical stage","Practice answer-writing or core-subject problem solving, with regular feedback and revision."],
    ["Prepare for interview/SSB","Work on communication, current affairs and, for defence/PSU entries, technical and personality rounds."]
  ]
};

/* ---------- Exam-stage summaries (3 items), by roadmap type ---------- */
const stagesByType = {
  physical: [["Written / Computer Based Test","Objective paper on general knowledge, reasoning and basic maths."],["Physical Efficiency Test (PET) / Physical Standard Test (PST)","Running, height/chest and other physical standards for the post."],["Medical Examination & Document Verification","Fitness check plus verification of age, education and category certificates."]],
  clerical: [["Written / Computer Based Test","Objective paper on English, reasoning, numerical ability and general awareness."],["Skill / Typing Test (where applicable)","Typing speed or computer proficiency test for clerical posts."],["Document Verification","Certificates and eligibility proofs are checked before appointment."]],
  exam: [["Tier-1 / Prelims","Objective screening exam on quant, reasoning, English and general awareness."],["Tier-2 / Mains","Deeper paper, sometimes descriptive or post-specific."],["Skill Test / Interview & Verification","Typing/skill test or interview followed by document verification."]],
  trade: [["Written / Computer Based Test","Objective paper testing trade theory and basic aptitude."],["Trade / Skill Test","Practical test in your ITI trade."],["Document Verification","ITI certificate, marksheet and category proof are checked."]],
  technical: [["Paper-1 (Objective)","General engineering plus core-branch objective paper."],["Paper-2 (Conventional, where applicable)","Descriptive paper for select posts."],["Interview & Document Verification","Personal interview (for some posts) followed by certificate verification."]],
  elite: [["Prelims / Screening (or GATE Score)","Objective screening exam or your GATE score, depending on the exam."],["Mains / Descriptive Stage","In-depth written papers or specialisation-based evaluation."],["Interview / Personality Test (or SSB)","Final interview or SSB-style assessment before the merit list."]]
};

/* ---------- Practice quiz pools ---------- */
const quizPools = {
  p10: [
    ["Find the next number in the series: 2, 4, 8, 16, __","24","30","32","36","32"],
    ["Which part of the Indian Constitution lists Fundamental Duties?","Part III","Part IV-A","Part V","Part VI","Part IV-A"],
    ["If A is the brother of B, and B is the sister of C, how is A related to C?","Father","Brother","Uncle","Cousin","Brother"],
    ["The longest river in India is the:","Godavari","Ganga","Brahmaputra","Yamuna","Ganga"],
    ["A train 100 m long crosses a pole in 10 seconds. Its speed is:","10 m/s","36 km/h","Both A and B","5 m/s","Both A and B"],
    ["Which gas do plants absorb from the air for photosynthesis?","Oxygen","Nitrogen","Carbon dioxide","Hydrogen","Carbon dioxide"]
  ],
  p12: [
    ["Choose the correctly spelt word:","Recieve","Receive","Receeve","Receve","Receive"],
    ["A sum of ₹1,000 becomes ₹1,100 in one year at simple interest. The rate of interest is:","5%","10%","12%","15%","10%"],
    ["Who among the following is the ceremonial head of the Indian State?","Prime Minister","President","Chief Justice","Speaker of Lok Sabha","President"],
    ["Pointing to a photo, Rohan said, 'She is the daughter of my grandfather's only son.' Who is she to Rohan?","Mother","Sister","Aunt","Cousin","Sister"],
    ["Which of the following is a fundamental right under the Indian Constitution?","Right to Property","Right to Education","Right to Employment","Right to Free Legal Aid","Right to Education"],
    ["A boat goes 10 km downstream in 1 hour and returns in 2 hours. The speed of the boat in still water is:","5 km/h","6 km/h","7.5 km/h","10 km/h","7.5 km/h"]
  ],
  technical: [
    ["Which of these is the best conductor of electricity?","Rubber","Copper","Wood","Plastic","Copper"],
    ["The SI unit of force is the:","Joule","Newton","Watt","Pascal","Newton"],
    ["1 Horsepower is approximately equal to:","550 W","746 W","1000 W","500 W","746 W"],
    ["Find the odd one out:","Screwdriver","Hammer","Spanner","Ruler","Ruler"],
    ["A motor draws 100 W and works at 80% efficiency. Its output power is:","60 W","70 W","80 W","90 W","80 W"],
    ["Which of the following is a measuring instrument for current?","Voltmeter","Ammeter","Barometer","Thermometer","Ammeter"]
  ],
  grad: [
    ["The 'Prelims' stage of most graduate-level competitive exams mainly tests:","Descriptive writing","Objective/MCQ ability","Physical fitness","Interview skills","Objective/MCQ ability"],
    ["Which body conducts the exam for IAS, IPS and IFS recruitment?","SSC","UPSC","IBPS","State PSC","UPSC"],
    ["In banking exams, 'CRR' stands for:","Cash Reserve Ratio","Credit Rating Ratio","Cash Repayment Rate","Capital Reserve Rate","Cash Reserve Ratio"],
    ["If the ratio of two numbers is 3:5 and their sum is 96, the smaller number is:","30","36","40","48","36"],
    ["Which schedule of the Constitution deals with the allocation of seats in the Rajya Sabha?","Second Schedule","Fourth Schedule","Seventh Schedule","Ninth Schedule","Fourth Schedule"],
    ["A can finish a work in 12 days and B in 18 days. Working together, they will finish it in:","6 days","7.2 days","8 days","9 days","7.2 days"]
  ],
  engineering: [
    ["A GATE score can be used for admission to M.Tech and recruitment to:","Only private companies","PSUs","Only state jobs","None of these","PSUs"],
    ["Which of these is NOT a programming paradigm?","Object-oriented","Procedural","Functional","Trigonometric","Trigonometric"],
    ["The SI unit of electrical resistance is the:","Ohm","Henry","Farad","Tesla","Ohm"],
    ["In a queue data structure, insertion happens at the ___ and deletion at the ___.","Front, rear","Rear, front","Both ends","Middle","Rear, front"],
    ["Find the next term: 3, 9, 27, 81, __","162","216","243","270","243"],
    ["Which of these is a renewable source of energy?","Coal","Natural gas","Solar","Petroleum","Solar"]
  ]
};
function tierPool(tier){
  if (tier==="10th") return quizPools.p10;
  if (tier==="12th") return quizPools.p12;
  if (tier==="iti" || tier==="diploma") return quizPools.technical;
  if (tier==="degree") return quizPools.grad;
  return quizPools.engineering; // btech
}

/* ---------- Official recruiting-body lookup (verified direct links) ---------- */
const orgLookup = [
  ["GDS","India Post GDS Recruitment Portal","https://indiapostgdsonline.gov.in"],
  ["India Post","Department of Posts","https://www.indiapost.gov.in"],
  ["AFCAT","Indian Air Force (AFCAT)","https://afcat.cdac.in"],
  ["Air Force Agniveer","Agnipath Vayu (Indian Air Force)","https://agnipathvayu.cdac.in"],
  ["Air Force","Indian Air Force","https://indianairforce.nic.in"],
  ["CDS","UPSC (CDS Exam)","https://upsc.gov.in"],
  ["UPSC","UPSC","https://upsc.gov.in"],
  ["SSC","Staff Selection Commission (SSC)","https://ssc.gov.in"],
  ["IBPS","IBPS","https://www.ibps.in"],
  ["SBI","State Bank of India Careers","https://sbi.co.in/web/careers"],
  ["RBI","Reserve Bank of India","https://opportunities.rbi.org.in"],
  ["Railway","Indian Railways / RRB (Unified Portal)","https://rrb.indianrailways.gov.in"],
  ["RRB","Railway Recruitment Board (Unified Portal)","https://rrb.indianrailways.gov.in"],
  ["RRC","Railway Recruitment Cell","https://indianrailways.gov.in"],
  ["BSF","BSF Recruitment","https://rectt.bsf.gov.in"],
  ["CISF","CISF Recruitment","https://cisfrectt.cisf.gov.in"],
  ["CRPF","CRPF","https://crpf.gov.in"],
  ["ITBP","ITBP Recruitment","https://recruitment.itbpolice.nic.in"],
  ["SSB","Sashastra Seema Bal Recruitment","https://ssbrectt.gov.in"],
  ["Army","Indian Army (Join Indian Army)","https://joinindianarmy.nic.in"],
  ["Navy","Indian Navy (Join Indian Navy)","https://joinindiannavy.gov.in"],
  ["DRDO Scientist","DRDO Recruitment & Assessment Centre (RAC)","https://rac.gov.in"],
  ["DRDO","DRDO","https://drdo.gov.in"],
  ["ISRO","ISRO Careers","https://www.isro.gov.in/Careers.html"],
  ["BARC","Bhabha Atomic Research Centre","https://www.barc.gov.in"],
  ["NPCIL","NPCIL Careers","https://www.npcilcareers.co.in"],
  ["BHEL","BHEL Careers","https://careers.bhel.in"],
  ["ONGC","ONGC Careers","https://ongcindia.com/web/eng/career"],
  ["NTPC","NTPC","https://ntpc.co.in"],
  ["BEL","Bharat Electronics Limited","https://bel-india.in/job-notifications"],
  ["HAL","Hindustan Aeronautics Limited","https://hal-india.co.in"],
  ["IOCL","Indian Oil Corporation Careers","https://www.iocl.com/pages/careers-overview"],
  ["HPCL","Hindustan Petroleum","https://www.hindustanpetroleum.com"],
  ["BPCL","Bharat Petroleum","https://www.bharatpetroleum.com"],
  ["SAIL","Steel Authority of India","https://sail.co.in"],
  ["MTNL","MTNL","https://www.mtnl.in"],
  ["BSNL","BSNL","https://www.bsnl.co.in"],
  ["DMRC","Delhi Metro Rail Corporation","https://www.delhimetrorail.com"],
  ["EPFO","EPFO","https://www.epfindia.gov.in"],
  ["NABARD","NABARD","https://www.nabard.org"],
  ["Insurance","LIC of India","https://licindia.in/careers"],
  ["LIC","LIC of India","https://licindia.in/careers"],
  ["GATE","GATE Official Portal (host institute rotates yearly)","https://gate2027.iitm.ac.in"],
  ["Teaching","CTET","https://ctet.nic.in"],
  ["TET","CTET / State TET Board","https://ctet.nic.in"],
  ["KVS","Kendriya Vidyalaya Sangathan","https://kvsangathan.nic.in"],
  ["NVS","Navodaya Vidyalaya Samiti","https://navodaya.gov.in"],
  ["DSSSB","DSSSB","https://dsssb.delhi.gov.in"],
  ["Income Tax","Income Tax Department","https://incometaxindia.gov.in"],
  ["UPSSSC","UPSSSC","https://upsssc.gov.in"],
  ["UPPSC","UPPSC","https://uppsc.up.nic.in"],
  ["State PSC","National Career Service (state PSC directory)","https://www.ncs.gov.in"],
  ["State JE","National Career Service (state PWD directory)","https://www.ncs.gov.in"],
  ["Engineering Services","UPSC (Engineering Services)","https://upsc.gov.in"],
  ["Apprentice","National Apprenticeship Training Scheme","https://mhrdnats.gov.in"],
  ["Forest Guard","National Career Service","https://www.ncs.gov.in"],
  ["Police","National Career Service","https://www.ncs.gov.in"],
  ["Electricity Board","National Career Service","https://www.ncs.gov.in"],
  ["Peon","National Career Service","https://www.ncs.gov.in"]
];
function getOrg(name){
  for (const [kw,orgName,url] of orgLookup){
    if (name.toLowerCase().includes(kw.toLowerCase())) return {name:orgName, url};
  }
  return {name:"National Career Service (Govt. Jobs Portal)", url:"https://www.ncs.gov.in"};
}

/* ---------- Government job dataset (built from the flow-chart image) ---------- */
const jobs = [
  // ================= AFTER 10TH =================
  {tier:"10th",code:"10-01",name:"SSC MTS / Havaldar",overview:"Multi Tasking Staff (non-technical office support) and Havaldar (CBIC/CBN) roles across central government offices — one of the most accessible entry points right after Class 10.",age:"18–25 years (relaxation for reserved categories)",edu:"Passed Class 10 (Matriculation) from a recognised board",salary:"Pay Level 1, roughly ₹18,000–₹56,900 + allowances",roadmapType:"physical"},
  {tier:"10th",code:"10-02",name:"SSC GD Constable",overview:"General Duty constable posts across BSF, CISF, CRPF, SSB, ITBP, Assam Rifles and the Secretariat Security Force, recruited through one common SSC exam.",age:"18–23 years (relaxation for reserved categories)",edu:"Passed Class 10 (Matriculation) from a recognised board",salary:"Pay Level 3, roughly ₹21,700–₹69,100 + allowances",roadmapType:"physical"},
  {tier:"10th",code:"10-03",name:"Railway Group D",overview:"Track maintainer, helper and similar posts across Indian Railways — large-scale recruitment that regularly opens lakhs of vacancies nationwide.",age:"18–33 years (relaxation for reserved categories)",edu:"Passed Class 10 or ITI from a recognised institute",salary:"Pay Level 1, roughly ₹18,000 + railway allowances",roadmapType:"physical"},
  {tier:"10th",code:"10-04",name:"India Post GDS",overview:"Gramin Dak Sevak roles (Branch Postmaster, Assistant Branch Postmaster, Dak Sevak) that run rural post offices — selection is merit-based with no written exam.",age:"18–40 years (relaxation for reserved categories)",edu:"Passed Class 10 with local language as a subject",salary:"Time Related Continuity Allowance, roughly ₹10,000–₹14,500 + allowances",roadmapType:"clerical"},
  {tier:"10th",code:"10-05",name:"Police Constable (State)",overview:"Entry-level constable posts in state police forces — one of the largest uniformed recruitment streams, run separately by each state.",age:"18–25 years (varies by state; relaxation for reserved categories)",edu:"Passed Class 10 or 12 depending on the state's notification",salary:"State pay scale, roughly ₹21,000–₹69,000 + allowances",roadmapType:"physical"},
  {tier:"10th",code:"10-06",name:"Forest Guard",overview:"Field-level protection and patrolling duties in forest divisions — combines fieldwork with basic record-keeping.",age:"18–25/30 years depending on the state",edu:"Passed Class 10 or 12 depending on the state's notification",salary:"State pay scale, roughly ₹19,000–₹63,000 + allowances",roadmapType:"physical"},
  {tier:"10th",code:"10-07",name:"BSF / CISF / CRPF Constable (Tradesman)",overview:"Tradesman posts (cook, washerman, barber, tailor and similar trades) supporting central paramilitary units.",age:"18–23 years (relaxation for reserved categories)",edu:"Passed Class 10; a relevant trade certificate helps for some trades",salary:"Pay Level 1, roughly ₹18,000–₹56,900 + allowances",roadmapType:"physical"},
  {tier:"10th",code:"10-08",name:"SSB (Constable)",overview:"General Duty constable posts in the Sashastra Seema Bal, guarding India's Nepal and Bhutan borders.",age:"18–23 years (relaxation for reserved categories)",edu:"Passed Class 10 (Matriculation) from a recognised board",salary:"Pay Level 3, roughly ₹21,700–₹69,100 + allowances",roadmapType:"physical"},
  {tier:"10th",code:"10-09",name:"Indian Army Agniveer (GD)",overview:"General Duty soldier under the Agnipath scheme — a four-year tenure with a defined path to permanent enrolment for top performers.",age:"17.5–21 years",edu:"Passed Class 10 with minimum aggregate marks as specified",salary:"Starts around ₹30,000/month package including allowances and Seva Nidhi corpus",roadmapType:"physical"},
  {tier:"10th",code:"10-10",name:"Navy SSR / MR",overview:"Senior Secondary Recruit (technical) and Matric Recruit (non-technical, e.g. cook/steward) sailor entries into the Indian Navy.",age:"17–21 years (varies by entry)",edu:"Passed Class 10 or 12 with the specified subjects, depending on the entry",salary:"Sailor pay scale, roughly ₹21,700–₹69,100 + allowances",roadmapType:"physical"},
  {tier:"10th",code:"10-11",name:"Air Force Agniveer",overview:"Agniveer Vayu entry into the Indian Air Force, covering technical and non-technical trades on a four-year engagement.",age:"17.5–21 years",edu:"Passed Class 10 or 12 with Maths/Science/English, depending on the trade",salary:"Starts around ₹30,000/month package including allowances and Seva Nidhi corpus",roadmapType:"physical"},
  {tier:"10th",code:"10-12",name:"ITBP / SSB Constable",overview:"General Duty and specialist constable posts in the Indo-Tibetan Border Police and Sashastra Seema Bal.",age:"18–23 years (relaxation for reserved categories)",edu:"Passed Class 10 (Matriculation) from a recognised board",salary:"Pay Level 3, roughly ₹21,700–₹69,100 + allowances",roadmapType:"physical"},
  {tier:"10th",code:"10-13",name:"Apprentice in PSUs (BHEL, NTPC, ONGC, BEL, HAL, etc.)",overview:"Structured apprenticeship training in trades like fitter, electrician and welder inside large public-sector plants — a strong stepping stone toward a permanent technical role.",age:"18–25 years (varies by PSU)",edu:"Passed ITI in the relevant trade (Class 10 as base qualification)",salary:"Fixed monthly stipend, roughly ₹7,000–₹12,000 during training",roadmapType:"trade"},
  {tier:"10th",code:"10-14",name:"State Govt. Peon / Group D Jobs",overview:"Peon, attendant and other Group D support posts in state government offices — steady entry-level government employment.",age:"18–30 years (varies by state; relaxation for reserved categories)",edu:"Passed Class 10 (some states accept Class 8) from a recognised board",salary:"State pay scale, roughly ₹15,000–₹40,000 + allowances",roadmapType:"clerical"},
  {tier:"10th",code:"10-15",name:"Others (State / Central Group D Posts)",overview:"A wide catch-all of additional Class-10-level Group D posts advertised directly by state and central departments outside the major exams above.",age:"Varies by post and department",edu:"Passed Class 10 from a recognised board (minimum, varies by post)",salary:"Varies by pay level and department",roadmapType:"clerical"},

  // ================= AFTER 12TH =================
  {tier:"12th",code:"12-01",name:"SSC CHSL (LDC, DEO, PA, SA)",overview:"Combined Higher Secondary Level exam for Lower Divisional Clerk, Data Entry Operator, Postal Assistant and Sorting Assistant posts in central ministries and departments.",age:"18–27 years (relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board",salary:"Pay Level 2–4, roughly ₹19,900–₹63,200 + allowances",roadmapType:"exam"},
  {tier:"12th",code:"12-02",name:"SSC CGL (Group B & C)",overview:"Combined Graduate Level exam for posts like Inspector, Auditor and Assistant across dozens of central departments — despite sitting on the \"12th\" route here, this exam actually requires a bachelor's degree to apply.",age:"18–32 years (varies by post; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline (this is a degree-level exam, not a 12th-pass one)",salary:"Pay Level 4–7, roughly ₹25,500–₹1,51,100 depending on the post",roadmapType:"exam"},
  {tier:"12th",code:"12-03",name:"SSC Stenographer",overview:"Stenographer Grade C & D posts in central ministries and departments, testing shorthand speed alongside general aptitude.",age:"18–30 years (relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board",salary:"Pay Level 4–6, roughly ₹25,500–₹1,12,400 + allowances",roadmapType:"clerical"},
  {tier:"12th",code:"12-04",name:"Railway NTPC (Undergraduate)",overview:"Non-Technical Popular Categories posts such as Commercial-cum-Ticket Clerk and Accounts Clerk, open to Class 12 pass candidates.",age:"18–33 years (relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board",salary:"Pay Level 2–3, roughly ₹19,900–₹63,200 + railway allowances",roadmapType:"exam"},
  {tier:"12th",code:"12-05",name:"Railway Group C (Various Posts)",overview:"Undergraduate-eligible technical and supervisory posts across Indian Railways zones, filled through RRB's various Group C notifications.",age:"18–33 years (relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board (some posts also need an ITI/diploma)",salary:"Pay Level 2–5, roughly ₹19,900–₹1,12,400 + railway allowances",roadmapType:"exam"},
  {tier:"12th",code:"12-06",name:"India Post Postal Assistant / Sorting Assistant",overview:"Postal Assistant and Sorting Assistant posts handling counter services, mail sorting and record-keeping at post offices.",age:"18–27 years (relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board",salary:"Pay Level 4, roughly ₹25,500–₹81,100 + allowances",roadmapType:"clerical"},
  {tier:"12th",code:"12-07",name:"Bank PO (IBPS / SBI / RBI / Others)",overview:"Probationary Officer posts in public sector and central banks — a fast track into banking management. Note: this role actually requires a bachelor's degree, not just Class 12.",age:"20–30 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline (degree-level post, despite appearing on the 12th route)",salary:"Roughly ₹48,000–₹55,000 gross per month for POs, plus allowances",roadmapType:"exam"},
  {tier:"12th",code:"12-08",name:"Bank Clerk (IBPS / SBI / RRB / Others)",overview:"Clerical cadre posts handling day-to-day banking transactions and customer service at branch level.",age:"20–28 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline (most banks require a degree for clerk posts too)",salary:"Roughly ₹29,000–₹32,000 gross per month, plus allowances",roadmapType:"exam"},
  {tier:"12th",code:"12-09",name:"State Police Constable",overview:"State-level police constable recruitment for candidates who've completed Class 12, run independently by each state police board.",age:"18–25 years (varies by state; relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board",salary:"State pay scale, roughly ₹21,000–₹69,000 + allowances",roadmapType:"physical"},
  {tier:"12th",code:"12-10",name:"CAPF (Assistant Commandant)",overview:"Group A gazetted officer entry into BSF, CRPF, CISF, ITBP and SSB through the UPSC CAPF exam — a degree-level post despite its placement here.",age:"20–25 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Pay Level 10, roughly ₹56,100–₹1,77,500 + allowances",roadmapType:"elite"},
  {tier:"12th",code:"12-11",name:"UPSC CDS / AFCAT",overview:"Combined Defence Services and Air Force Common Admission Test — officer-entry routes into the Army, Navy and Air Force for graduates.",age:"19–24 years (varies by academy/entry)",edu:"Bachelor's degree (engineering degree required for some technical entries)",salary:"Officer pay scale with rank allowances after commissioning",roadmapType:"elite"},
  {tier:"12th",code:"12-12",name:"Income Tax Inspector",overview:"Inspector-level posts in the Income Tax Department, recruited through the SSC CGL exam — a degree-level post.",age:"18–30 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Pay Level 7, roughly ₹44,900–₹1,42,400 + allowances",roadmapType:"exam"},
  {tier:"12th",code:"12-13",name:"EPFO EO / AO",overview:"Enforcement Officer-cum-Accounts Officer posts managing India's retirement savings scheme for organised-sector workers — a degree-level post.",age:"18–30 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline (law/accounts background helps)",salary:"Pay Level 7, roughly ₹44,900–₹1,42,400 + allowances",roadmapType:"exam"},
  {tier:"12th",code:"12-14",name:"State Govt. LDC / Junior Assistant",overview:"Lower Divisional Clerk and Junior Assistant posts in state secretariats and departments, handling routine office and file work.",age:"18–30 years (varies by state; relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board",salary:"State pay scale, roughly ₹19,000–₹60,000 + allowances",roadmapType:"clerical"},
  {tier:"12th",code:"12-15",name:"Others (Group B & C Posts)",overview:"A wide catch-all of additional Class-12-level Group B and C posts advertised by central and state departments outside the major exams above.",age:"Varies by post and department",edu:"Passed Class 12 from a recognised board (minimum, varies by post)",salary:"Varies by pay level and department",roadmapType:"exam"},

  // ================= AFTER ITI =================
  {tier:"iti",code:"ITI-01",name:"RRB ALP (Assistant Loco Pilot)",overview:"Assistant Loco Pilot posts operating and assisting with train engines — one of the most sought-after ITI-level railway roles.",age:"18–30 years (relaxation for reserved categories)",edu:"ITI certificate in a relevant trade (or equivalent diploma) from a recognised institute",salary:"Pay Level 2, roughly ₹19,900–₹63,200 + railway allowances",roadmapType:"trade"},
  {tier:"iti",code:"ITI-02",name:"RRB Technician (Grade III)",overview:"Technician Grade III posts maintaining rolling stock and railway infrastructure across various railway workshops and depots.",age:"18–30 years (relaxation for reserved categories)",edu:"ITI certificate in the relevant trade from a recognised institute",salary:"Pay Level 2, roughly ₹19,900–₹63,200 + railway allowances",roadmapType:"trade"},
  {tier:"iti",code:"ITI-03",name:"Railway Group D (ITI Quota)",overview:"Group D track maintainer and helper posts, with ITI-trade candidates given preference in some recruitment cycles.",age:"18–33 years (relaxation for reserved categories)",edu:"ITI certificate in the relevant trade (or Class 10 pass) from a recognised institute",salary:"Pay Level 1, roughly ₹18,000 + railway allowances",roadmapType:"trade"},
  {tier:"iti",code:"ITI-04",name:"DRDO Technician 'A'",overview:"Technician-grade posts supporting DRDO's defence research laboratories in trades like electronics, mechanical and instrumentation.",age:"18–28 years (relaxation for reserved categories)",edu:"ITI certificate (NCVT/SCVT) in the relevant trade",salary:"Pay Level 2, roughly ₹19,900–₹63,200 + allowances",roadmapType:"trade"},
  {tier:"iti",code:"ITI-05",name:"BHEL / HAL / BEL / ONGC Technician",overview:"Technician-grade posts in major public-sector engineering and energy companies, working directly on plant and equipment maintenance.",age:"18–28 years (varies by PSU)",edu:"ITI certificate in the relevant trade from a recognised institute",salary:"PSU technician grade, roughly ₹20,000–₹45,000 + allowances",roadmapType:"trade"},
  {tier:"iti",code:"ITI-06",name:"BSF / CRPF / CISF (Tradesman)",overview:"Skilled tradesman posts (electrician, mechanic, plumber and similar trades) supporting central armed police force units.",age:"18–25 years (relaxation for reserved categories)",edu:"ITI certificate in the relevant trade from a recognised institute",salary:"Pay Level 2, roughly ₹19,900–₹63,200 + allowances",roadmapType:"trade"},
  {tier:"iti",code:"ITI-07",name:"Indian Army Agniveer (Tech) (Trades)",overview:"Technical trade entries under the Agnipath scheme for candidates with an ITI background, covering trades like electrician and mechanic.",age:"17.5–21 years",edu:"ITI certificate in the relevant trade, alongside Class 10/12 as specified",salary:"Starts around ₹30,000/month package including allowances and Seva Nidhi corpus",roadmapType:"trade"},
  {tier:"iti",code:"ITI-08",name:"Indian Navy MR (Artificer Apprentice)",overview:"Artificer Apprentice entry training sailors in marine engineering trades aboard naval ships.",age:"17–20 years",edu:"Class 10/12 with Maths/Science, plus relevant ITI trade knowledge for MR",salary:"Sailor pay scale, roughly ₹21,700–₹69,100 + allowances",roadmapType:"trade"},
  {tier:"iti",code:"ITI-09",name:"Air Force Agniveer (Tech)",overview:"Technical trade Agniveer entry into the Indian Air Force for candidates with an ITI qualification in relevant trades.",age:"17.5–21 years",edu:"ITI certificate in the relevant trade, alongside Class 10/12 as specified",salary:"Starts around ₹30,000/month package including allowances and Seva Nidhi corpus",roadmapType:"trade"},
  {tier:"iti",code:"ITI-10",name:"State Electricity Board (Technician)",overview:"Lineman, wireman and technician posts maintaining power distribution infrastructure for state electricity boards.",age:"18–28 years (varies by state; relaxation for reserved categories)",edu:"ITI certificate in Electrician/Wireman trade from a recognised institute",salary:"State pay scale, roughly ₹20,000–₹45,000 + allowances",roadmapType:"trade"},
  {tier:"iti",code:"ITI-11",name:"DMRC Maintainer",overview:"Maintainer posts keeping Delhi Metro's rolling stock, signalling and electrical systems running smoothly.",age:"18–28 years (relaxation for reserved categories)",edu:"ITI certificate in the relevant trade from a recognised institute",salary:"Roughly ₹20,000–₹40,000 + allowances",roadmapType:"trade"},
  {tier:"iti",code:"ITI-12",name:"ISRO / DRDO Technician",overview:"Technician-grade posts supporting India's space and defence research organisations in fabrication, electronics and instrumentation work.",age:"18–28 years (relaxation for reserved categories)",edu:"ITI certificate (NCVT/SCVT) in the relevant trade",salary:"Pay Level 2, roughly ₹19,900–₹63,200 + allowances",roadmapType:"trade"},
  {tier:"iti",code:"ITI-13",name:"Navy Ship/Vehicle Mechanic",overview:"Mechanic trade posts maintaining naval vessels and support vehicles, recruited through Navy civilian and MR entries.",age:"18–25 years (varies by entry)",edu:"ITI certificate in Mechanic (Motor Vehicle/Diesel) trade",salary:"Roughly ₹20,000–₹45,000 + allowances",roadmapType:"trade"},
  {tier:"iti",code:"ITI-14",name:"Others (PSUs / State Technician Posts)",overview:"A wide catch-all of additional ITI-level technician posts advertised directly by PSUs and state technical departments.",age:"Varies by post and department",edu:"ITI certificate in the relevant trade (minimum, varies by post)",salary:"Varies by pay level and department",roadmapType:"trade"},

  // ================= AFTER DIPLOMA =================
  {tier:"diploma",code:"DIP-01",name:"SSC JE (Junior Engineer)",overview:"Junior Engineer posts (Civil, Mechanical, Electrical) across central departments like CPWD, MES and CWC, recruited through SSC's dedicated JE exam.",age:"18–32 years (relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"Pay Level 6, roughly ₹35,400–₹1,12,400 + allowances",roadmapType:"technical"},
  {tier:"diploma",code:"DIP-02",name:"RRB JE (Junior Engineer)",overview:"Junior Engineer posts across Indian Railways zones, covering civil, mechanical, electrical and signal disciplines.",age:"18–33 years (relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"Pay Level 6, roughly ₹35,400–₹1,12,400 + railway allowances",roadmapType:"technical"},
  {tier:"diploma",code:"DIP-03",name:"State JE (PWD / PHED / Electricity / Others)",overview:"Junior Engineer posts in state Public Works, water supply (PHED) and electricity departments, overseeing local infrastructure projects.",age:"18–35 years (varies by state; relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"State pay scale, roughly ₹35,000–₹80,000 + allowances",roadmapType:"technical"},
  {tier:"diploma",code:"DIP-04",name:"BSNL / MTNL / IOCL / HPCL Engineer",overview:"Junior/Technical Officer-level engineering posts in major public-sector telecom and oil companies.",age:"18–28 years (varies by PSU)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"PSU pay scale, roughly ₹35,000–₹90,000 + allowances",roadmapType:"technical"},
  {tier:"diploma",code:"DIP-05",name:"DRDO / ISRO Technician / Engineer",overview:"Diploma-level engineering and technician posts supporting India's defence and space research programmes.",age:"18–28 years (relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"Pay Level 6, roughly ₹35,400–₹1,12,400 + allowances",roadmapType:"technical"},
  {tier:"diploma",code:"DIP-06",name:"BHEL / BEL / HAL Engineer",overview:"Diploma trainee/engineer posts in major public-sector engineering and defence-manufacturing companies.",age:"18–28 years (varies by PSU)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"PSU pay scale, roughly ₹35,000–₹90,000 + allowances",roadmapType:"technical"},
  {tier:"diploma",code:"DIP-07",name:"DMRC Junior Engineer",overview:"Junior Engineer posts overseeing Delhi Metro's civil, electrical, signalling and mechanical systems.",age:"18–28 years (relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"Roughly ₹35,000–₹90,000 + allowances",roadmapType:"technical"},
  {tier:"diploma",code:"DIP-08",name:"Railway Supervisor (RRB)",overview:"Supervisory posts across railway operations and maintenance, filled through RRB's diploma-level notifications.",age:"18–33 years (relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"Pay Level 5–6, roughly ₹29,200–₹1,12,400 + railway allowances",roadmapType:"technical"},
  {tier:"diploma",code:"DIP-09",name:"UPSSSC JE / UPPSC AE",overview:"Junior Engineer and Assistant Engineer posts in Uttar Pradesh's technical departments, recruited through UPSSSC and UPPSC respectively.",age:"18–40 years (varies by post; relaxation for reserved categories)",edu:"Diploma (for JE) or degree (for AE) in the relevant engineering discipline",salary:"State pay scale, roughly ₹35,000–₹1,00,000 + allowances",roadmapType:"technical"},
  {tier:"diploma",code:"DIP-10",name:"State Technical Assistant",overview:"Technical Assistant posts supporting engineers in state infrastructure and utility departments.",age:"18–35 years (varies by state; relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"State pay scale, roughly ₹29,000–₹70,000 + allowances",roadmapType:"technical"},
  {tier:"diploma",code:"DIP-11",name:"Navy / Army Technical Entry (Short Service Commission)",overview:"Short Service Commission technical entry for diploma holders into the Navy and Army, leading to an officer rank after training.",age:"19–25 years (varies by entry)",edu:"Diploma in the relevant engineering discipline (degree preferred for some entries)",salary:"Officer pay scale with rank allowances after commissioning",roadmapType:"elite"},
  {tier:"diploma",code:"DIP-12",name:"Others (PSUs / State Technical Posts)",overview:"A wide catch-all of additional diploma-level technical posts advertised directly by PSUs and state departments.",age:"Varies by post and department",edu:"Diploma (Polytechnic) in the relevant engineering discipline (minimum, varies by post)",salary:"Varies by pay level and department",roadmapType:"technical"},

  // ================= AFTER DEGREE =================
  {tier:"degree",code:"DEG-01",name:"SSC CGL (Group B & C)",overview:"Combined Graduate Level exam for posts like Inspector, Auditor, Assistant and Sub-Inspector across dozens of central departments.",age:"18–32 years (varies by post; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Pay Level 4–7, roughly ₹25,500–₹1,51,100 depending on the post",roadmapType:"exam"},
  {tier:"degree",code:"DEG-02",name:"UPSC Civil Services (IAS / IPS / IFS)",overview:"India's premier civil services exam leading to the IAS, IPS, IFS and other Group A/B central services — widely regarded as the toughest and most prestigious government exam in the country.",age:"21–32 years (general category; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Pay Level 10 and above, starting around ₹56,100 + allowances, rising through the career",roadmapType:"elite"},
  {tier:"degree",code:"DEG-03",name:"UPSC CAPF (Assistant Commandant)",overview:"Group A gazetted officer entry into BSF, CRPF, CISF, ITBP and SSB through the UPSC CAPF exam.",age:"20–25 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Pay Level 10, roughly ₹56,100–₹1,77,500 + allowances",roadmapType:"elite"},
  {tier:"degree",code:"DEG-04",name:"UPSC EPFO / ESIC / Other",overview:"UPSC-conducted recruitment for senior posts in EPFO, ESIC and other central bodies, such as Enforcement Officer and Assistant Provident Fund Commissioner.",age:"21–30 years (varies by post; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline (relevant specialisation preferred for some posts)",salary:"Pay Level 7–8, roughly ₹44,900–₹1,42,400+ depending on the post",roadmapType:"exam"},
  {tier:"degree",code:"DEG-05",name:"State PSC (Group 1 / 2 / 3 / 4)",overview:"State-level equivalent of the UPSC civil services exam, recruiting Deputy Collectors, DSPs and other senior state administrative and police officers.",age:"21–40 years (varies widely by state; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"State pay scale, roughly ₹56,100 and above depending on the post and state",roadmapType:"elite"},
  {tier:"degree",code:"DEG-06",name:"Bank PO / Clerk",overview:"Probationary Officer and Clerk cadre posts in public sector and central banks, filled through IBPS, SBI and RBI recruitment exams.",age:"20–30 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Roughly ₹29,000–₹55,000 gross per month depending on the post, plus allowances",roadmapType:"exam"},
  {tier:"degree",code:"DEG-07",name:"Insurance AO / LIC AAO",overview:"Administrative Officer and Assistant Administrative Officer posts in public-sector insurance companies like LIC, NIACL and GIC.",age:"21–30 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Roughly ₹45,000–₹55,000 gross per month, plus allowances",roadmapType:"exam"},
  {tier:"degree",code:"DEG-08",name:"Railway Group B (Various)",overview:"Graduate-level supervisory and gazetted-track posts across Indian Railways, filled through RRB's Group B notifications and promotions.",age:"18–36 years (varies by post; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Pay Level 7–8, roughly ₹44,900–₹1,42,400 + railway allowances",roadmapType:"exam"},
  {tier:"degree",code:"DEG-09",name:"NABARD Grade A / B",overview:"Officer-grade posts in India's apex rural development bank, covering agriculture finance, rural development and banking supervision.",age:"21–32 years (varies by grade; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline (specific disciplines required for some specialist posts)",salary:"Roughly ₹58,000–₹85,000 gross per month, plus allowances",roadmapType:"exam"},
  {tier:"degree",code:"DEG-10",name:"CDS / AFCAT (For Graduates)",overview:"Combined Defence Services and Air Force Common Admission Test — officer-entry routes into the Army, Navy and Air Force for graduates.",age:"19–24 years (varies by academy/entry)",edu:"Bachelor's degree in any discipline (engineering degree required for some technical entries)",salary:"Officer pay scale with rank allowances after commissioning",roadmapType:"elite"},
  {tier:"degree",code:"DEG-11",name:"Teaching (TET / CTET / KVS / NVS / DSSSB)",overview:"Teaching posts in central and state schools, requiring a bachelor's degree plus a B.Ed and a qualifying TET/CTET score.",age:"21–35 years (varies by state/board; relaxation for reserved categories)",edu:"Bachelor's degree plus B.Ed, with a qualifying TET/CTET score",salary:"Pay Level 6–7, roughly ₹35,400–₹1,12,400 + allowances",roadmapType:"exam"},
  {tier:"degree",code:"DEG-12",name:"Police SI / Inspector (State)",overview:"Sub-Inspector and Inspector-level posts in state police forces, combining supervisory duties with active field responsibility.",age:"20–28 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"State pay scale, roughly ₹35,400–₹1,12,400 + allowances",roadmapType:"physical"},
  {tier:"degree",code:"DEG-13",name:"Others (State / Central Jobs)",overview:"A wide catch-all of additional graduate-level Group A and B posts advertised directly by ministries, PSUs and regulatory bodies.",age:"Varies by post and department",edu:"Bachelor's degree in any discipline (minimum, varies by post)",salary:"Varies by pay level and department",roadmapType:"exam"},

  // ================= AFTER BTECH/BE =================
  {tier:"btech",code:"BT-01",name:"GATE → PSU Jobs (ONGC, BHEL, IOCL, NTPC, BEL, HAL, etc.)",overview:"A strong GATE score lets PSUs shortlist engineering graduates directly for Management/Engineer Trainee roles, skipping a separate PSU-specific written exam.",age:"Up to 26–30 years depending on the PSU (relaxation for reserved categories)",edu:"B.Tech / B.E. in the relevant engineering discipline",salary:"Pay Level 10, roughly ₹60,000–₹1,80,000 (CTC) + allowances",roadmapType:"elite"},
  {tier:"btech",code:"BT-02",name:"PSUs via Direct Recruitment (TATA Power, SAIL, BPCL, etc.)",overview:"Some PSUs run their own campus placement or direct-recruitment drives for engineering graduates, separate from the GATE route.",age:"Up to 27–30 years depending on the PSU",edu:"B.Tech / B.E. in the relevant engineering discipline",salary:"PSU management trainee scale, roughly ₹50,000–₹1,50,000 (CTC) + allowances",roadmapType:"technical"},
  {tier:"btech",code:"BT-03",name:"SSC JE (Through GATE)",overview:"Some SSC Junior Engineer posts also accept a valid GATE score as an alternative screening route for B.Tech graduates.",age:"18–32 years (relaxation for reserved categories)",edu:"B.Tech / B.E. in the relevant engineering discipline",salary:"Pay Level 6, roughly ₹35,400–₹1,12,400 + allowances",roadmapType:"technical"},
  {tier:"btech",code:"BT-04",name:"DRDO Scientist 'B'",overview:"Entry-level scientist posts at DRDO's defence research labs, working on projects across missiles, electronics, materials and more.",age:"Up to 28 years (relaxation for reserved categories)",edu:"B.Tech / B.E. (or equivalent) with a strong academic record; GATE score often used for shortlisting",salary:"Pay Level 10, roughly ₹56,100–₹1,77,500 + allowances",roadmapType:"elite"},
  {tier:"btech",code:"BT-05",name:"ISRO Scientist / Engineer 'SC'",overview:"Entry-level scientist/engineer posts at ISRO, working on India's space research, satellite and launch vehicle programmes.",age:"Up to 35 years (relaxation for reserved categories)",edu:"B.Tech / B.E. in the relevant engineering discipline with a strong academic record",salary:"Pay Level 10, roughly ₹56,100–₹1,77,500 + allowances",roadmapType:"elite"},
  {tier:"btech",code:"BT-06",name:"BARC / NPCIL Engineer",overview:"Scientific Officer and engineer posts in India's atomic energy establishments, working on nuclear power and research programmes.",age:"Up to 26 years (relaxation for reserved categories)",edu:"B.Tech / B.E. in the relevant engineering discipline (through BARC Training School or direct recruitment)",salary:"Pay Level 10, roughly ₹56,100–₹1,77,500 + allowances",roadmapType:"elite"},
  {tier:"btech",code:"BT-07",name:"Indian Army (TES Entry)",overview:"Technical Entry Scheme lets Class 12 PCM students join as officer cadets and complete their engineering degree during training — B.Tech holders can also apply through direct technical entries.",age:"16.5–19.5 years for TES after Class 12 (separate norms apply for direct B.Tech entries)",edu:"Class 12 with PCM for TES; B.Tech/B.E. for direct technical graduate entries",salary:"Officer pay scale with rank allowances after commissioning",roadmapType:"physical"},
  {tier:"btech",code:"BT-08",name:"Indian Navy (SSC Technical)",overview:"Short Service Commission technical entry for engineering graduates into the Indian Navy's Executive, Engineering or Electrical branches.",age:"19–25 years (varies by branch)",edu:"B.Tech / B.E. in the relevant engineering discipline",salary:"Officer pay scale with rank allowances after commissioning",roadmapType:"physical"},
  {tier:"btech",code:"BT-09",name:"Air Force (SSC Tech)",overview:"Short Service Commission technical entry for engineering graduates into the Indian Air Force's Aeronautical and other technical branches.",age:"20–26 years",edu:"B.Tech / B.E. in the relevant engineering discipline",salary:"Officer pay scale with rank allowances after commissioning",roadmapType:"physical"},
  {tier:"btech",code:"BT-10",name:"UPSC Engineering Services (IES / ESE)",overview:"One of India's top engineering exams, recruiting Class I/II engineering officers into central departments like Railways, Roads, Telecom and Power.",age:"21–30 years (relaxation for reserved categories)",edu:"B.Tech / B.E. in Civil, Mechanical, Electrical or Electronics & Telecom engineering",salary:"Pay Level 10, roughly ₹56,100–₹1,77,500 + allowances",roadmapType:"elite"},
  {tier:"btech",code:"BT-11",name:"State Engineering Services",overview:"State-level equivalent of the UPSC Engineering Services exam, recruiting Assistant Engineers into state technical departments.",age:"21–35 years (varies by state; relaxation for reserved categories)",edu:"B.Tech / B.E. in the relevant engineering discipline",salary:"State pay scale, roughly ₹44,900–₹1,42,400 + allowances",roadmapType:"technical"},
  {tier:"btech",code:"BT-12",name:"Others (PSUs / Research Organizations)",overview:"A wide catch-all of additional B.Tech-level posts advertised directly by PSUs, research organisations and technical departments.",age:"Varies by post and organisation",edu:"B.Tech / B.E. in the relevant engineering discipline (minimum, varies by post)",salary:"Varies by pay level and organisation",roadmapType:"technical"}
];

jobs.forEach(j=>{
  j.id = j.tier + "-" + j.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  j.body = getOrg(j.name).name;
  j.resources = [[getOrg(j.name).name, getOrg(j.name).url]];
});

/* ============================================================
   GENERIC MODAL ENGINE — one tabbed sheet reused for:
   government jobs, roadmap-card careers, category overviews,
   and the career tips panel.
   ============================================================ */
const overlay = document.getElementById('overlay');
document.body.appendChild(overlay);
const sheetHead = document.getElementById('sheetHead');
const sheetCode = document.getElementById('sheetCode');
const sheetTitle = document.getElementById('sheetTitle');
const sheetTier = document.getElementById('sheetTier');
const sectionTabsEl = document.querySelector('.section-tabs');
const sheetBodyEl = document.querySelector('.sheet-body');
let lastFocused = null;

/**
 * tabs: [{key, label, html?, render?(panelEl)}]
 */
function openSheet({ title, code, color, tierLabel, tabs }){
  lastFocused = document.activeElement;
  sheetHead.style.background = color;
  sheetCode.textContent = code || '';
  sheetCode.style.display = code ? '' : 'none';
  sheetTitle.textContent = title;
  sheetTier.textContent = tierLabel || '';

  sectionTabsEl.innerHTML = '';
  sheetBodyEl.innerHTML = '';

  tabs.forEach((tab, i)=>{
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (i===0 ? ' active' : '');
    btn.dataset.tab = tab.key;
    btn.textContent = tab.label;
    btn.addEventListener('click', ()=>{
      sectionTabsEl.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      sheetBodyEl.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      document.getElementById('panel-'+tab.key).classList.add('active');
    });
    sectionTabsEl.appendChild(btn);

    const panel = document.createElement('div');
    panel.className = 'tab-panel' + (i===0 ? ' active' : '');
    panel.id = 'panel-'+tab.key;
    sheetBodyEl.appendChild(panel);
    if (tab.render) tab.render(panel);
    else panel.innerHTML = tab.html || '';
  });

  overlay.classList.add('open');
  lockBackgroundScroll();
  const sheetEl = overlay.querySelector('.sheet');
  if (sheetEl) sheetEl.scrollTop = 0;
  document.getElementById('closeBtn').focus();
}

let scrollLockY = 0;
function lockBackgroundScroll(){
  scrollLockY = window.scrollY || window.pageYOffset || 0;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollLockY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
}
function unlockBackgroundScroll(){
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollLockY);
}
function closeOverlay(){
  overlay.classList.remove('open');
  unlockBackgroundScroll();
  if (lastFocused) lastFocused.focus();
}
document.getElementById('closeBtn').addEventListener('click', closeOverlay);
overlay.addEventListener('click', (e)=>{ if (e.target === overlay) closeOverlay(); });
document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay(); });

/* ---------- Government job detail (uses openSheet) ---------- */
function openJob(id){
  const job = jobs.find(j=>j.id===id);
  if (!job) return;
  const meta = tierMeta[job.tier];

  openSheet({
    title: job.name,
    code: job.code + ' · ' + job.body,
    color: meta.color,
    tierLabel: meta.label,
    tabs: [
      { key:'overview', label:'Overview', html:`
        <p class="overview-text">${job.overview}</p>
        <dl class="kv">
          <dt>Recruiting body</dt><dd>${job.body}</dd>
          <dt>Typical salary</dt><dd>${job.salary}</dd>
        </dl>
        <div class="note-box">Salary bands, vacancy numbers and exam patterns are revised often — always confirm current figures on the official notification before applying.</div>
      `},
      { key:'eligibility', label:'Eligibility', html:`
        <dl class="kv">
          <dt>Age limit</dt><dd>${job.age}</dd>
          <dt>Education</dt><dd>${job.edu}</dd>
        </dl>
        <div class="note-box">Age relaxation usually applies for SC/ST/OBC/PwBD/ex-servicemen categories as per government rules — check the specific notification for exact figures.</div>
      `},
      { key:'exam', label:'Exam Stages', html:`
        <ul class="stage-list">
          ${stagesByType[job.roadmapType].map(s=>`<li><b>${s[0]}</b><p>${s[1]}</p></li>`).join('')}
        </ul>
      `},
      { key:'roadmap', label:'Road Map', html:`
        <ol class="road-map">
          ${roadmaps[job.roadmapType].map((r,i)=>`<li><span class="rm-num">${i+1}</span><div class="rm-body"><b>${r[0]}</b><p>${r[1]}</p></div></li>`).join('')}
        </ol>
      `},
      { key:'quiz', label:'Practice Quiz', render:(el)=>renderQuiz(el, job.tier, job.name) },
      { key:'resources', label:'Official Links', html:`
        <div class="resources">
          <ul>
            ${job.resources.map(r=>`<li><a href="${r[1]}" target="_blank" rel="noopener">${r[0]}</a></li>`).join('')}
          </ul>
          <div class="note-box">This links to the recruiting body's real official portal. For genuine previous-year question papers, always download them from there — that guarantees accuracy and the latest pattern.</div>
        </div>
      `}
    ]
  });
}

/* ---------- Quiz rendering (shared) ---------- */
function shuffle(arr){
  const a = arr.slice();
  for (let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
function renderQuiz(panel, tier, label){
  const pool = tierPool(tier);
  function build(){
    const questions = shuffle(pool).slice(0,5).map(q=>{
      const [text, ...opts] = q;
      const correct = opts[opts.length-1];
      const choices = shuffle(opts.slice(0,4));
      return {text, choices, correct};
    });
    panel.innerHTML = `
      <div class="quiz-head">
        <p>A short practice set at the right difficulty level for ${label}. This is original practice material, not an official paper — treat it as a warm-up.</p>
        <button class="quiz-restart" id="restartQuiz">New set</button>
      </div>
      <form id="quizForm">
        ${questions.map((q,qi)=>`
          <div class="q-block" data-qi="${qi}" data-correct="${q.correct.replace(/"/g,'&quot;')}">
            <div class="q-text">${qi+1}. ${q.text}</div>
            <div class="q-opts">
              ${q.choices.map((c)=>`
                <label class="q-opt">
                  <input type="radio" name="q${qi}" value="${c.replace(/"/g,'&quot;')}">
                  <span>${c}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}
        <button type="submit" class="submit-quiz">Check my score</button>
      </form>
      <div class="quiz-score" id="quizScore"></div>
    `;
    document.getElementById('restartQuiz').addEventListener('click', build);
    document.getElementById('quizForm').addEventListener('submit', (e)=>{
      e.preventDefault();
      let score = 0;
      const blocks = panel.querySelectorAll('.q-block');
      blocks.forEach(b=>{
        const correct = b.dataset.correct;
        const selected = b.querySelector('input:checked');
        b.querySelectorAll('.q-opt').forEach(opt=>{
          const val = opt.querySelector('input').value;
          if (val === correct) opt.classList.add('correct');
          else if (selected && val === selected.value) opt.classList.add('wrong');
        });
        if (selected && selected.value === correct) score++;
      });
      const scoreBox = document.getElementById('quizScore');
      scoreBox.textContent = `Score: ${score} / ${blocks.length}`;
      scoreBox.classList.add('show');
    });
  }
  build();
}

/* ============================================================
   ROADMAP CARDS — Software Developer / Civil Services / Nursing
   ============================================================ */
function openRoadmapCard(kind){
  if (kind === 'software-developer'){
    openSheet({
      title:'Software Developer',
      code:'CAREER PATH',
      color:'#1565c0',
      tierLabel:'Technology & Product Roles',
      tabs:[
        { key:'overview', label:'Overview', html:`
          <p class="overview-text">Software Developers design, build, test and maintain applications and systems — one of the most in-demand and well-paying career paths today, spanning startups, IT services firms, product companies and government tech roles (NIC, C-DAC, PSU IT wings).</p>
          <div class="note-box">Unlike most posts on this site, this is a private/tech-sector career path rather than a single government exam — entry is mostly through skills, projects and interviews rather than one recruitment notification.</div>
        `},
        { key:'skills', label:'Skills & Qualifications', html:`
          <ul class="stage-list">
            <li><b>Programming Languages</b><p>Solid grounding in at least one language (Python, Java, JavaScript, C++) and comfort picking up others.</p></li>
            <li><b>Data Structures & Algorithms</b><p>Arrays, linked lists, trees, graphs, sorting/searching — the core of most technical interviews.</p></li>
            <li><b>Databases & Version Control</b><p>Working knowledge of SQL/NoSQL databases and Git for collaborative development.</p></li>
            <li><b>Formal Qualification</b><p>B.Tech/BCA/MCA or equivalent is the common route; a strong project portfolio can substitute in some hiring pipelines.</p></li>
          </ul>
        `},
        { key:'steps', label:'Steps to Become', html:`
          <ol class="road-map">
            <li><span class="rm-num">1</span><div class="rm-body"><b>Learn programming fundamentals & DSA</b><p>Build a solid base before specialising in any framework or stack.</p></div></li>
            <li><span class="rm-num">2</span><div class="rm-body"><b>Build projects and a portfolio</b><p>Ship a few real projects on GitHub — this matters more than certificates alone.</p></div></li>
            <li><span class="rm-num">3</span><div class="rm-body"><b>Learn a framework/stack</b><p>Pick a lane — web, mobile, backend or data — and go deep rather than staying shallow across all of them.</p></div></li>
            <li><span class="rm-num">4</span><div class="rm-body"><b>Apply for internships</b><p>Real-world experience, even unpaid or short-term, significantly improves your first full-time offer.</p></div></li>
            <li><span class="rm-num">5</span><div class="rm-body"><b>Practice technical interviews</b><p>DSA rounds plus basic system-design questions are standard at most product and services companies.</p></div></li>
            <li><span class="rm-num">6</span><div class="rm-body"><b>Keep learning after placement</b><p>Tools, frameworks and best practices change fast — continuous learning is part of the job.</p></div></li>
          </ol>
        `}
      ]
    });
    return;
  }

  if (kind === 'civil-services'){
    openSheet({
      title:'Civil Services',
      code:'CAREER PATH',
      color:'#C1442E',
      tierLabel:'UPSC & State Administrative Services',
      tabs:[
        { key:'eligibility', label:'Eligibility Criteria', html:`
          <ul class="stage-list">
            <li><b>Education</b><p>Bachelor's degree in any discipline from a recognised university (final-year students can apply provisionally).</p></li>
            <li><b>Age</b><p>21–32 years for the general category, with relaxation for OBC/SC/ST/PwBD/ex-servicemen as per government norms.</p></li>
            <li><b>Citizenship & attempts</b><p>Indian citizenship required; the number of permitted attempts depends on your category.</p></li>
          </ul>
        `},
        { key:'exam', label:'Exam Stages', html:`
          <ul class="stage-list">
            <li><b>Preliminary Exam</b><p>Two objective papers — General Studies and CSAT (qualifying only).</p></li>
            <li><b>Main Exam</b><p>Nine descriptive papers, including an optional subject, essay and language papers.</p></li>
            <li><b>Personality Test (Interview)</b><p>A board interview assessing personality, awareness and suitability for public service.</p></li>
          </ul>
        `},
        { key:'prep', label:'Preparation Tips', html:`
          <ul class="stage-list">
            <li><b>Build an NCERT-level foundation first</b><p>Don't jump to advanced material before the basics are solid.</p></li>
            <li><b>Read current affairs daily</b><p>A quality newspaper or news source, read consistently, matters more than occasional deep dives.</p></li>
            <li><b>Choose your optional subject carefully</b><p>Pick one aligned with your academic strength and genuine interest, not just perceived scoring potential.</p></li>
            <li><b>Practice answer-writing regularly</b><p>Mains success depends heavily on structured, practiced writing — not just knowledge.</p></li>
            <li><b>Take prelims mock tests seriously</b><p>Timed practice under negative marking builds the temperament the real exam demands.</p></li>
          </ul>
        `}
      ]
    });
    return;
  }

  if (kind === 'nursing-career'){
    openSheet({
      title:'Nursing Career',
      code:'CAREER PATH',
      color:'#2F7D4F',
      tierLabel:'Healthcare & Clinical Services',
      tabs:[
        { key:'qualifications', label:'Qualifications', html:`
          <ul class="stage-list">
            <li><b>ANM (Auxiliary Nurse Midwifery)</b><p>2-year diploma — the entry-level qualification for community and rural health roles.</p></li>
            <li><b>GNM (General Nursing and Midwifery)</b><p>3-year diploma after Class 12 — the traditional route into staff nurse roles.</p></li>
            <li><b>B.Sc Nursing</b><p>4-year degree after Class 12 with Physics, Chemistry, Biology — the preferred qualification for most hospital and government recruitment today.</p></li>
          </ul>
        `},
        { key:'certification', label:'Certification Exams', html:`
          <ul class="stage-list">
            <li><b>Nursing Council Registration</b><p>State Nursing Council / Indian Nursing Council registration is mandatory to practice as a nurse in India.</p></li>
            <li><b>NORCET</b><p>National Organisation for Central Recruitment for common entrance test — the main route into AIIMS and central government staff nurse posts.</p></li>
            <li><b>ESIC / Railway / State Health Department exams</b><p>Additional recruitment exams run by individual departments for staff nurse and nursing officer posts.</p></li>
          </ul>
        `},
        { key:'career', label:'Career Path', html:`
          <ol class="road-map">
            <li><span class="rm-num">1</span><div class="rm-body"><b>Staff Nurse</b><p>Entry-level clinical role in a hospital, clinic or community health setting.</p></div></li>
            <li><span class="rm-num">2</span><div class="rm-body"><b>Senior Nursing Officer / Ward In-charge</b><p>Supervisory responsibility over a ward or unit after a few years of experience.</p></div></li>
            <li><span class="rm-num">3</span><div class="rm-body"><b>Nursing Superintendent / Matron</b><p>Senior administrative nursing leadership across a hospital or department.</p></div></li>
            <li><span class="rm-num">4</span><div class="rm-body"><b>Specialisation or further study</b><p>ICU, OT or community health specialisation, or an M.Sc Nursing for teaching and advanced clinical practice roles.</p></div></li>
          </ol>
        `}
      ]
    });
    return;
  }
}

/* ============================================================
   EXPLORE YOUR CAREER OPTIONS — category overviews
   ============================================================ */
function openCategoryOverview(kind){
  const content = {
    'banking-finance': {
      title:'Banking & Finance',
      color:'#1565c0',
      html:`
        <p class="overview-text">Banking & Finance careers in the government space include Probationary Officers and Clerks in public-sector banks (SBI, and IBPS-affiliated PSU banks), Reserve Bank of India Grade B officers, NABARD Grade A/B officers, LIC/GIC Administrative Officers, and similar regulatory/financial-sector roles.</p>
        <div class="note-box">These roles combine strong job security with structured pay scales. Most are entered through a written exam (Prelims + Mains) followed by an interview — see the "Bank PO", "Bank Clerk" and "NABARD" entries under Government Jobs by Qualification for full detail pages.</div>
      `
    },
    'engineering-it': {
      title:'Engineering & IT',
      color:'#0F7173',
      html:`
        <p class="overview-text">Engineering & IT careers span both government and private-sector paths: GATE-based PSU recruitment (ONGC, BHEL, NTPC, IOCL and more), SSC/RRB Junior Engineer posts, UPSC Engineering Services, DRDO/ISRO scientist roles — and, on the private side, Software Developer, Systems Engineer and IT Analyst roles at product and services companies.</p>
        <div class="note-box">A B.Tech/B.E. or diploma in the relevant discipline is the usual entry qualification, with GATE or a company-specific test as the typical gateway. See the "After Diploma" and "After BTech / BE" tabs under Government Jobs by Qualification, or open the Software Developer card above for the private-sector tech path.</div>
      `
    },
    'healthcare-careers': {
      title:'Healthcare Careers',
      color:'#2F7D4F',
      html:`
        <p class="overview-text">Healthcare careers include Staff Nurse and ANM/GNM roles, Medical Officer posts in government hospitals and PSU dispensaries, AIIMS/ESIC/Railway recruitment for paramedical staff, and allied health roles like lab technicians and pharmacists.</p>
        <div class="note-box">Most clinical roles require a recognised nursing/medical/paramedical qualification plus registration with the relevant state or national council, and entry is usually through a written exam followed by a merit list or interview. See the Nursing Career card above for the full qualification-to-career path.</div>
      `
    }
  };
  const c = content[kind];
  if (!c) return;
  openSheet({
    title: c.title,
    code: 'CAREER CATEGORY',
    color: c.color,
    tierLabel: 'Explore Your Career Options',
    tabs: [{ key:'overview', label:'Overview', html:c.html }]
  });
}

/* ============================================================
   YOUR OWN UPLOADED PAPERS — Google Drive / OneDrive links
   Add one entry per paper here: { title, url }.
   Just send me the links and titles and I'll fill this in for
   you — or edit this array yourself, it's plain JavaScript.
   ============================================================ */
/*const userPapers = [
   { title: "SSC-CGL-QUESTION-PAPER-13-Aug-2021-Shift-1-English_clean", url: "https://1drv.ms/b/c/a286cf94575cb02f/IQArQV72PdOBQIxKaz6YjkvNAbW7dLPYGqJQbpUW8Y14Quw?e=y0qN0Z" },
   { title: "SSC-CGL-Tier-1-Question-Paper_14_07_2023", url: "https://1drv.ms/b/c/a286cf94575cb02f/IQCxtjjR9CyzRqmEM3heSQRxAX1sKVCKt3LeYa7CaYHYa4Q?e=tYuNqN" },
];/*

/* ============================================================
   PREVIOUS YEAR PAPERS — grouped by exam body, official links
   ============================================================ */
function openPreviousPapers(){
  openSheet({
    title:'Previous Year Papers',
    code:'OFFICIAL SOURCES ONLY',
    color:'#1565c0',
    tierLabel:'Exam Preparation Dashboard',
    tabs:[{
      key:'papers', label:'Previous Year Papers', html:`
        ${userPapers.length ? `
        const userPapers = [
        { title: "SSC-CGL-QUESTION-PAPER-13-Aug-2021-Shift-1-English_clean", url: "https://1drv.ms/b/c/a286cf94575cb02f/IQArQV72PdOBQIxKaz6YjkvNAbW7dLPYGqJQbpUW8Y14Quw?e=y0qN0Z" },
        { title: "SSC-CGL-Tier-1-Question-Paper_14_07_2023", url: "https://1drv.ms/b/c/a286cf94575cb02f/IQCxtjjR9CyzRqmEM3heSQRxAX1sKVCKt3LeYa7CaYHYa4Q?e=tYuNqN" }
        ];
          <div class="note-box" style="background:#1E3A2A;border-color:#2F7D4F;color:#B7E4C7;">Available Papers</div>
          <ul class="stage-list">
            ${userPapers.map(p=>`<li><b>${p.title}</b><p><a href="${p.url}" target="_blank" rel="noopener">Open PDF</a></p></li>`).join('')}
          </ul>
        ` : ''}

      `
    }]
  });
}

/* ============================================================
   CAREER TIPS
   ============================================================ */
function openCareerTips(){
  openSheet({
    title:'Career Tips',
    code:'EXPERT ADVICE',
    color:'#0d3b7a',
    tierLabel:'Exam Preparation Dashboard',
    tabs:[{
      key:'tips', label:'Career Tips', html:`
        <ul class="stage-list">
          <li><b>Set a daily routine and stick to it</b><p>Consistency beats occasional long study marathons, especially over a multi-month preparation cycle.</p></li>
          <li><b>Read current affairs every day</b><p>A quality newspaper or news app, read daily, is essential preparation for almost every competitive exam.</p></li>
          <li><b>Take timed mock tests regularly</b><p>Then spend real time reviewing every wrong answer — that review is where the actual learning happens.</p></li>
          <li><b>Keep documents organised early</b><p>Scan certificates, ID proofs and category documents into one folder well before any verification stage.</p></li>
          <li><b>Track official notifications directly</b><p>Check the recruiting body's own website weekly rather than relying only on third-party job portals.</p></li>
          <li><b>Keep a simple, updated resume</b><p>Useful even for exams that don't ask for one yet — interviews often come faster than expected.</p></li>
          <li><b>Practice interviews out loud</b><p>Say your answers, don't just think them — speaking clearly under pressure is a separate skill from knowing the material.</p></li>
          <li><b>Build fitness in early if your post needs it</b><p>For PET/PST-based posts, start running and basic conditioning months in advance, not the week before.</p></li>
          <li><b>Revise consistently rather than chasing new material</b><p>Repetition of what you already have beats constantly adding new sources close to the exam.</p></li>
          <li><b>Take breaks seriously</b><p>Burnout slows preparation far more than an occasional planned day off ever will.</p></li>
        </ul>
      `
    }]
  });
}

/* ============================================================
   Wire up the page
   ============================================================ */
const tabsEl = document.getElementById('qualTabs');
const listEl = document.getElementById('jobList');
const tierKeys = Object.keys(tierMeta);

function renderJobs(tier){
  listEl.innerHTML = '';
  jobs.filter(j=>j.tier===tier).forEach(job=>{
    const chip = document.createElement('div');
    chip.className = 'job-chip';
    chip.innerHTML = `<span>${job.name}</span><span class="chip-arrow">›</span>`;
    chip.onclick = ()=> openJob(job.id);
    listEl.appendChild(chip);
  });
}
tierKeys.forEach((tier,i)=>{
  const tab = document.createElement('div');
  tab.className = 'qual-tab' + (i===0 ? ' active' : '');
  tab.textContent = tierMeta[tier].label;
  tab.onclick = ()=>{
    document.querySelectorAll('.qual-tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    renderJobs(tier);
  };
  tabsEl.appendChild(tab);
});
renderJobs(tierKeys[0]);

document.addEventListener('DOMContentLoaded', ()=>{
  // Explore Your Career Options cards
  const govCard = document.getElementById('card-government-jobs');
  if (govCard) govCard.addEventListener('click', ()=>{
    document.getElementById('explorer-section').scrollIntoView({behavior:'smooth'});
  });
  const bankCard = document.getElementById('card-banking-finance');
  if (bankCard) bankCard.addEventListener('click', ()=> openCategoryOverview('banking-finance'));
  const engCard = document.getElementById('card-engineering-it');
  if (engCard) engCard.addEventListener('click', ()=> openCategoryOverview('engineering-it'));
  const healthCard = document.getElementById('card-healthcare-careers');
  if (healthCard) healthCard.addEventListener('click', ()=> openCategoryOverview('healthcare-careers'));

  // Your Career Roadmap cards
  const sdBtn = document.getElementById('btn-software-developer');
  if (sdBtn) sdBtn.addEventListener('click', ()=> openRoadmapCard('software-developer'));
  const csBtn = document.getElementById('btn-civil-services');
  if (csBtn) csBtn.addEventListener('click', ()=> openRoadmapCard('civil-services'));
  const nurseBtn = document.getElementById('btn-nursing-career');
  if (nurseBtn) nurseBtn.addEventListener('click', ()=> openRoadmapCard('nursing-career'));

  // Career Tips card
  const tipsCard = document.getElementById('card-career-tips');
  if (tipsCard) tipsCard.addEventListener('click', openCareerTips);

  // Previous Year Papers card
  const papersCard = document.getElementById('card-previous-papers');
  if (papersCard) papersCard.addEventListener('click', openPreviousPapers);
});

try{
  var count = parseInt(localStorage.getItem('g2g_visit_count') || '0', 10) + 1;
  localStorage.setItem('g2g_visit_count', count);
}catch(e){}
