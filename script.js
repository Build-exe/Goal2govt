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
    ["Which gas do plants absorb from the air for photosynthesis?","Oxygen","Nitrogen","Carbon dioxide","Hydrogen","Carbon dioxide"],
    ["Which planet is known as the Red Planet?","Mars","Venus","Jupiter","Saturn","Mars"],
    ["The chemical symbol for water is:","H2O","HO2","O2H","H3O","H2O"],
    ["Complete the analogy: Bird is to Sky as Fish is to __","Sand","Water","Air","Tree","Water"],
    ["If today is Monday, what day will it be after 10 days?","Wednesday","Thursday","Friday","Tuesday","Thursday"],
    ["Which of these is a prime number?","21","33","37","45","37"],
    ["The freezing point of water in Celsius is:","0","32","100","-1","0"],
    ["Who wrote the Indian National Anthem?","Bankim Chandra Chatterjee","Rabindranath Tagore","Sarojini Naidu","Subhas Chandra Bose","Rabindranath Tagore"],
    ["Find the missing number: 5, 10, 20, 40, __","60","70","80","45","80"],
    ["Which is the smallest continent by area?","Asia","Africa","Australia","Europe","Australia"],
    ["The number of sides in a hexagon is:","5","6","7","8","6"],
    ["Which organ pumps blood in the human body?","Lungs","Heart","Kidney","Liver","Heart"],
    ["The largest ocean on Earth is the:","Atlantic","Indian","Pacific","Arctic","Pacific"],
    ["If 3x = 15, then x is:","3","5","8","45","5"],
    ["Which of these is a mammal?","Shark","Frog","Whale","Crocodile","Whale"],
    ["The capital of India is:","Mumbai","Kolkata","New Delhi","Chennai","New Delhi"],
    ["Complete the series: A, C, E, G, __","H","I","J","F","I"],
    ["The sun rises in the:","North","South","East","West","East"],
    ["Which festival is known as the festival of lights?","Holi","Diwali","Eid","Baisakhi","Diwali"],
    ["1 kilometre equals:","100 metres","1000 metres","10 metres","10000 metres","1000 metres"],
    ["Which of these is a source of Vitamin C?","Rice","Orange","Milk","Wheat","Orange"],
    ["The study of plants is called:","Zoology","Botany","Geology","Biology","Botany"],
    ["If Ravi is taller than Sam, and Sam is taller than Amit, who is the shortest?","Ravi","Sam","Amit","Cannot say","Amit"],
    ["The national bird of India is the:","Peacock","Parrot","Sparrow","Eagle","Peacock"],
    ["Find the odd one out:","Triangle","Square","Circle","Cube","Cube"],
    ["Which season comes right after summer in India?","Winter","Monsoon","Spring","Autumn","Monsoon"],
    ["The value of 15% of 200 is:","20","30","25","35","30"],
    ["Which is the fastest land animal?","Lion","Cheetah","Horse","Tiger","Cheetah"],
    ["Water boils at what temperature in Celsius?","90","100","110","120","100"],
    ["Complete the analogy: Doctor is to Hospital as Teacher is to __","Shop","School","Farm","Bank","School"]
  ],
  p12: [
    ["Choose the correctly spelt word:","Recieve","Receive","Receeve","Receve","Receive"],
    ["A sum of ₹1,000 becomes ₹1,100 in one year at simple interest. The rate of interest is:","5%","10%","12%","15%","10%"],
    ["Who among the following is the ceremonial head of the Indian State?","Prime Minister","President","Chief Justice","Speaker of Lok Sabha","President"],
    ["Pointing to a photo, Rohan said, 'She is the daughter of my grandfather's only son.' Who is she to Rohan?","Mother","Sister","Aunt","Cousin","Sister"],
    ["Which of the following is a fundamental right under the Indian Constitution?","Right to Property","Right to Education","Right to Employment","Right to Free Legal Aid","Right to Education"],
    ["A boat goes 10 km downstream in 1 hour and returns in 2 hours. The speed of the boat in still water is:","5 km/h","6 km/h","7.5 km/h","10 km/h","7.5 km/h"],
    ["The HCF of 12 and 18 is:","2","3","6","9","6"],
    ["Which article of the Indian Constitution deals with the Right to Equality?","Article 14","Article 19","Article 21","Article 32","Article 14"],
    ["Synonym of 'Abundant' is:","Scarce","Plentiful","Rare","Empty","Plentiful"],
    ["A sum triples itself in 8 years at simple interest. The rate of interest is:","20%","25%","12.5%","15%","25%"],
    ["Which gas is most abundant in Earth's atmosphere?","Oxygen","Carbon Dioxide","Nitrogen","Hydrogen","Nitrogen"],
    ["The capital of Australia is:","Sydney","Melbourne","Canberra","Perth","Canberra"],
    ["If 20% of a number is 50, the number is:","200","250","300","100","250"],
    ["Antonym of 'Genuine' is:","Authentic","Real","Fake","True","Fake"],
    ["Which Five-Year Plan is associated with the early push for the Green Revolution in India?","First","Third","Fourth","Second","Third"],
    ["The Indian Parliament's lower house is called the:","Rajya Sabha","Lok Sabha","Vidhan Sabha","Vidhan Parishad","Lok Sabha"],
    ["If a train travels 300 km in 5 hours, its average speed is:","50 km/h","60 km/h","45 km/h","55 km/h","60 km/h"],
    ["The currency of Japan is the:","Yuan","Won","Yen","Ringgit","Yen"],
    ["Which vitamin deficiency causes night blindness?","Vitamin A","Vitamin B","Vitamin C","Vitamin D","Vitamin A"],
    ["Choose the correct antonym of 'Ancient':","Old","Modern","Historic","Traditional","Modern"],
    ["The first Prime Minister of India was:","Mahatma Gandhi","Jawaharlal Nehru","Sardar Patel","Rajendra Prasad","Jawaharlal Nehru"],
    ["If the perimeter of a square is 40 cm, its area is:","100 sq cm","80 sq cm","64 sq cm","120 sq cm","100 sq cm"],
    ["Which planet has the most known moons in our solar system?","Earth","Mars","Saturn","Mercury","Saturn"],
    ["The RBI's monetary policy committee primarily targets:","Fiscal deficit","Inflation","Exchange rate alone","GDP growth alone","Inflation"],
    ["Choose the correctly punctuated sentence:","Its a nice day","Its' a nice day","It is a nice day,","It's a nice day.","It's a nice day."],
    ["A can do a piece of work in 10 days, B in 15 days. Together they finish it in:","5 days","6 days","8 days","12 days","6 days"],
    ["Which Indian state has the longest coastline?","Kerala","Tamil Nadu","Gujarat","Andhra Pradesh","Gujarat"],
    ["The 42nd Amendment to the Indian Constitution added which term to the Preamble?","Sovereign","Socialist","Republic","Democratic","Socialist"],
    ["Which of these is a landlocked country?","Sri Lanka","Nepal","Bangladesh","Myanmar","Nepal"],
    ["The chemical formula for common salt is:","NaCl","KCl","CaCl2","NaOH","NaCl"],
    ["Simple interest on ₹5,000 at 8% per annum for 2 years is:","₹400","₹800","₹4,300","₹500","₹800"],
    ["Which day is celebrated as World Environment Day?","June 5","April 22","March 21","October 2","June 5"],
    ["The synonym of 'Diligent' is:","Lazy","Hardworking","Careless","Slow","Hardworking"],
    ["Which committee's recommendations are associated with GST design in India?","Chelliah Committee","Kelkar Committee","Narasimham Committee","Rangarajan Committee","Kelkar Committee"],
    ["Which of these is a fundamental right guaranteed to Indian citizens?","Right to Education","Right to Property","Right to Free Electricity","Right to Employment","Right to Education"]
  ],
  technical: [
    ["Which of these is the best conductor of electricity?","Rubber","Copper","Wood","Plastic","Copper"],
    ["The SI unit of force is the:","Joule","Newton","Watt","Pascal","Newton"],
    ["1 Horsepower is approximately equal to:","550 W","746 W","1000 W","500 W","746 W"],
    ["Find the odd one out:","Screwdriver","Hammer","Spanner","Ruler","Ruler"],
    ["A motor draws 100 W and works at 80% efficiency. Its output power is:","60 W","70 W","80 W","90 W","80 W"],
    ["Which of the following is a measuring instrument for current?","Voltmeter","Ammeter","Barometer","Thermometer","Ammeter"],
    ["Which of these tools is used to measure diameter precisely?","Ruler","Vernier Caliper","Measuring Tape","Protractor","Vernier Caliper"],
    ["The unit of electrical power is:","Volt","Ampere","Watt","Ohm","Watt"],
    ["Which material is a good electrical insulator?","Copper","Aluminium","Rubber","Iron","Rubber"],
    ["A transformer works on the principle of:","Electromagnetic Induction","Thermal Expansion","Friction","Gravity","Electromagnetic Induction"],
    ["The SI unit of pressure is:","Pascal","Newton","Joule","Watt","Pascal"],
    ["A distinctive feature of a two-stroke engine compared to a four-stroke engine is:","Camshaft","Valve Train","Port Timing","Turbocharger","Port Timing"],
    ["1 kWh of energy equals:","1000 Joules","3.6 million Joules","1 Joule","36 Joules","3.6 million Joules"],
    ["Which welding process uses a consumable electrode with shielding gas?","MIG","TIG","Gas Welding","Brazing","MIG"],
    ["Find the odd one out:","Voltmeter","Ammeter","Wattmeter","Barometer","Barometer"],
    ["A digital multimeter can measure:","Only voltage","Only current","Voltage, current and resistance","Only temperature","Voltage, current and resistance"],
    ["The working principle of a generator is based on:","Electromagnetic Induction","Thermionic Emission","Photoelectric Effect","Nuclear Fission","Electromagnetic Induction"],
    ["Which of these is a cutting tool in a lathe machine?","Chuck","Tailstock","Tool bit","Headstock","Tool bit"],
    ["The unit of thermal conductivity is measured in:","W/m\u00b7K","J/s","N\u00b7m","Pa\u00b7s","W/m\u00b7K"],
    ["In a 4-stroke engine, how many strokes make one complete cycle?","2","4","6","8","4"],
    ["Which gas is commonly used as a shielding gas in arc welding?","Oxygen","Argon","Hydrogen","Chlorine","Argon"],
    ["A fuse in an electrical circuit works on the principle of:","Magnetic effect","Heating effect of current","Chemical effect","Static electricity","Heating effect of current"],
    ["The standard voltage of a single-phase household supply in India is:","110V","220V","440V","12V","220V"],
    ["Which instrument is used to check the levelness of a surface?","Vernier caliper","Spirit level","Micrometer","Screw gauge","Spirit level"],
    ["A micrometer screw gauge typically measures to an accuracy of:","1 mm","0.1 mm","0.01 mm","1 cm","0.01 mm"],
    ["Which type of current does a household supply typically provide?","DC","AC","Both equally","Neither","AC"],
    ["The primary function of a transformer's core is to:","Store charge","Provide a low-reluctance path for magnetic flux","Generate voltage","Convert AC to DC","Provide a low-reluctance path for magnetic flux"],
    ["Which of the following is used to join two pipes permanently?","Welding","Bolting","Riveting temporarily","Clamping","Welding"],
    ["The main function of a carburetor in a petrol engine is to:","Cool the engine","Mix air and fuel","Lubricate parts","Generate spark","Mix air and fuel"],
    ["Ohm's Law states that voltage equals:","Current \u00d7 Resistance","Current \u00f7 Resistance","Current + Resistance","Current \u2212 Resistance","Current \u00d7 Resistance"],
    ["Which trade primarily deals with pipefitting and plumbing systems?","Fitter","Plumber","Turner","Machinist","Plumber"],
    ["A relay in an electrical circuit is mainly used as a:","Resistor","Switch operated by an electromagnet","Capacitor","Fuse","Switch operated by an electromagnet"],
    ["The process of hardening the surface of steel while keeping the core soft is called:","Annealing","Case hardening","Tempering","Normalizing","Case hardening"],
    ["A center punch is used in a workshop to:","Cut metal","Mark a point for drilling","Measure length","Weld joints","Mark a point for drilling"],
    ["Which of these is a common ITI trade in the electrical stream?","Wireman","Turner","Fitter","Machinist","Wireman"]
  ],
  grad: [
    ["The 'Prelims' stage of most graduate-level competitive exams mainly tests:","Descriptive writing","Objective/MCQ ability","Physical fitness","Interview skills","Objective/MCQ ability"],
    ["Which body conducts the exam for IAS, IPS and IFS recruitment?","SSC","UPSC","IBPS","State PSC","UPSC"],
    ["In banking exams, 'CRR' stands for:","Cash Reserve Ratio","Credit Rating Ratio","Cash Repayment Rate","Capital Reserve Rate","Cash Reserve Ratio"],
    ["If the ratio of two numbers is 3:5 and their sum is 96, the smaller number is:","30","36","40","48","36"],
    ["Which schedule of the Constitution deals with the allocation of seats in the Rajya Sabha?","Second Schedule","Fourth Schedule","Seventh Schedule","Ninth Schedule","Fourth Schedule"],
    ["A can finish a work in 12 days and B in 18 days. Working together, they will finish it in:","6 days","7.2 days","8 days","9 days","7.2 days"],
    ["The 'Mains' stage of most graduate-level exams is typically:","Objective only","Descriptive or in-depth","Physical","Only an interview","Descriptive or in-depth"],
    ["Which body regulates monetary policy in India?","SEBI","RBI","IRDAI","NABARD","RBI"],
    ["The Indian Constitution was adopted by the Constituent Assembly on:","26 January 1950","15 August 1947","26 November 1949","2 October 1950","26 November 1949"],
    ["If the average of 5 numbers is 20, their sum is:","100","80","25","120","100"],
    ["Which committee recommended major banking sector reforms in India in 1991?","Narasimham Committee","Chelliah Committee","Rangarajan Committee","Tarapore Committee","Narasimham Committee"],
    ["A profit of 20% on cost price means the selling price is what multiple of the cost price?","1.1","1.2","1.25","1.5","1.2"],
    ["Which writ is issued to produce a detained person before a court?","Mandamus","Habeas Corpus","Certiorari","Quo Warranto","Habeas Corpus"],
    ["A country's national income measured at current prices is called:","Real GDP","Nominal GDP","Per Capita Income","Green GDP","Nominal GDP"],
    ["Which of these is listed as a Fundamental Duty under the Indian Constitution?","Right to vote","Protect the environment","Right to property","Right to privacy","Protect the environment"],
    ["Which Article of the Indian Constitution deals with the abolition of untouchability?","Article 15","Article 17","Article 21","Article 25","Article 17"],
    ["The term 'Fiscal Deficit' refers to:","Total revenue minus total expenditure","Total expenditure minus total receipts excluding borrowings","Total imports minus exports","Total tax minus subsidies","Total expenditure minus total receipts excluding borrowings"],
    ["If the marked price of an item is ₹1,200 and a discount of 15% is given, the selling price is:","₹1,020","₹1,050","₹1,080","₹1,000","₹1,020"],
    ["Which international organisation publishes the Human Development Index?","WTO","UNDP","IMF","World Bank","UNDP"],
    ["The Governor of a state in India is appointed by the:","Prime Minister","President","Chief Minister","Chief Justice","President"],
    ["Which of these is classified as a direct tax in India?","GST","Income Tax","Excise Duty","Customs Duty","Income Tax"],
    ["A sum of money doubles itself in 8 years at simple interest. In how many years will it become four times?","16 years","20 years","24 years","32 years","24 years"],
    ["The 'Repo Rate' is the rate at which:","RBI lends to commercial banks","Commercial banks lend to RBI","RBI lends to the government only","Banks lend to each other","RBI lends to commercial banks"],
    ["Which amendment of the Indian Constitution is known as the 'Mini Constitution'?","42nd Amendment","44th Amendment","52nd Amendment","73rd Amendment","42nd Amendment"],
    ["GDP at factor cost differs from GDP at market price by the exclusion of:","Depreciation","Net indirect taxes","Net exports","Government spending","Net indirect taxes"],
    ["Which authority appoints the Chief Election Commissioner of India?","Parliament","President","Supreme Court","Prime Minister alone","President"],
    ["If a shopkeeper marks up goods by 40% and gives a discount of 20%, his net profit percentage is:","12%","16%","20%","8%","12%"],
    ["Which of these organisations regulates the securities market in India?","RBI","SEBI","IRDAI","PFRDA","SEBI"],
    ["A alone can complete a task in 20 days; B is 25% more efficient than A. B alone will take:","15 days","16 days","18 days","20 days","16 days"],
    ["The 'Multidimensional Poverty Index' considers deprivation across:","Only income","Health, education and standard of living","Only education","Only health","Health, education and standard of living"],
    ["NITI Aayog replaced which earlier body in India's planning framework?","The Finance Commission","The Planning Commission","The Election Commission","The Law Commission","The Planning Commission"],
    ["The term 'Stagflation' refers to a situation of:","High growth and low inflation","Stagnant growth with high inflation","High growth and high employment","Low inflation and high employment","Stagnant growth with high inflation"],
    ["Which of these is an example of a 'Merit Good'?","Cigarettes","Education","Alcohol","Luxury cars","Education"],
    ["Which schedule of the Indian Constitution deals with anti-defection provisions?","Eighth Schedule","Ninth Schedule","Tenth Schedule","First Schedule","Tenth Schedule"],
    ["Which of these best describes 'Disguised Unemployment'?","No job available at all","More workers than needed for a task, with no addition to output","High seasonal unemployment","Voluntary unemployment","More workers than needed for a task, with no addition to output"]
  ],
  engineering: [
    ["A GATE score can be used for admission to M.Tech and recruitment to:","Only private companies","PSUs","Only state jobs","None of these","PSUs"],
    ["Which of these is NOT a programming paradigm?","Object-oriented","Procedural","Functional","Trigonometric","Trigonometric"],
    ["The SI unit of electrical resistance is the:","Ohm","Henry","Farad","Tesla","Ohm"],
    ["In a queue data structure, insertion happens at the ___ and deletion at the ___.","Front, rear","Rear, front","Both ends","Middle","Rear, front"],
    ["Find the next term: 3, 9, 27, 81, __","162","216","243","270","243"],
    ["Which of these is a renewable source of energy?","Coal","Natural gas","Solar","Petroleum","Solar"],
    ["Which sorting algorithm has the best average-case time complexity among these?","Bubble Sort","Quick Sort","Selection Sort","Insertion Sort","Quick Sort"],
    ["The SI unit of frequency is:","Hertz","Watt","Ohm","Tesla","Hertz"],
    ["In OOP, encapsulation primarily refers to:","Inheriting properties","Bundling data and methods together","Overriding methods","Creating multiple objects","Bundling data and methods together"],
    ["Which of these is a NoSQL database?","MySQL","PostgreSQL","MongoDB","Oracle","MongoDB"],
    ["The time complexity of binary search on a sorted array is:","O(n)","O(log n)","O(n^2)","O(1)","O(log n)"],
    ["Which protocol is used to securely transfer web pages?","HTTP","FTP","HTTPS","SMTP","HTTPS"],
    ["In GATE-based PSU recruitment, a candidate's shortlist rank is primarily based on:","Interview only","GATE score","College reputation","Work experience","GATE score"],
    ["Which of these is a compiled language?","Python","JavaScript","C++","PHP","C++"],
    ["RAM stands for:","Random Access Memory","Read Access Memory","Run Access Memory","Rapid Access Memory","Random Access Memory"],
    ["Which data structure uses LIFO (Last In First Out) order?","Queue","Stack","Linked List","Tree","Stack"],
    ["The time complexity of Bubble Sort in the worst case is:","O(n)","O(n log n)","O(n^2)","O(log n)","O(n^2)"],
    ["Which of these is a primary memory type?","Hard Disk","RAM","SSD","CD-ROM","RAM"],
    ["In networking, DNS is primarily used to:","Encrypt data","Translate domain names to IP addresses","Compress files","Manage email","Translate domain names to IP addresses"],
    ["The unit of inductance is the:","Henry","Farad","Ohm","Weber","Henry"],
    ["Which normal form in database design removes transitive dependency?","1NF","2NF","3NF","BCNF","3NF"],
    ["A full adder circuit in digital electronics has how many inputs?","2","3","4","1","3"],
    ["Which of these is an example of a non-relational (NoSQL) database model?","Document store","Relational tables","SQL views","Foreign keys","Document store"],
    ["The Big-O complexity of accessing an element in an array by index is:","O(n)","O(log n)","O(1)","O(n^2)","O(1)"],
    ["Which of these is a layer of the OSI model?","Application","Compiler","Assembler","Kernel","Application"],
    ["In control systems, a system is called stable if its output:","Grows unbounded","Remains bounded for a bounded input","Oscillates infinitely","Becomes zero always","Remains bounded for a bounded input"],
    ["Which of these is used for version control in software development?","Git","Docker","Jenkins","Kubernetes","Git"],
    ["The efficiency of a Carnot engine depends only on:","The working substance","The temperatures of source and sink","The pressure","The volume","The temperatures of source and sink"],
    ["Which of these gates outputs 1 only when both inputs are 1?","OR","AND","NOR","XOR","AND"],
    ["Which of these best describes 'recursion' in programming?","A loop that never ends","A function calling itself","A variable declaration","A type of array","A function calling itself"],
    ["Which of these is a wireless communication standard?","Ethernet","Bluetooth","USB","SATA","Bluetooth"],
    ["The process of converting source code into machine code is done by a:","Linker","Compiler","Debugger","Loader","Compiler"],
    ["Which of these represents good practice in normalized relational database design?","Storing duplicate data everywhere","Reducing data redundancy","Ignoring primary keys","Avoiding foreign keys","Reducing data redundancy"],
    ["In thermodynamics, the first law is essentially a statement of:","Conservation of momentum","Conservation of energy","Conservation of mass","Entropy increase","Conservation of energy"],
    ["Which of these is an example of an object-oriented programming language?","C","Java","Assembly","Fortran","Java"]
  ]
};
function tierPool(tier){
  if (tier==="10th") return quizPools.p10;
  if (tier==="12th") return quizPools.p12;
  if (tier==="iti" || tier==="diploma") return quizPools.technical;
  if (tier==="degree") return quizPools.grad;
  return quizPools.engineering; // btech
}

/* ---------- Timed mock-exam patterns, by roadmap type ----------
   Original practice content, scaled to mirror the pacing (time
   per question) typical of that exam style — not the official
   full-length paper or leaked/real exam questions. ---------- */
const examPatterns = {
  physical:  { questionCount: 15, durationMinutes: 12, label: "Physical/GD-style Screening Test" },
  clerical:  { questionCount: 15, durationMinutes: 12, label: "Clerical Aptitude Test" },
  exam:      { questionCount: 15, durationMinutes: 12, label: "Tier-1 Style Screening Test" },
  trade:     { questionCount: 15, durationMinutes: 15, label: "Trade Theory Test" },
  technical: { questionCount: 15, durationMinutes: 18, label: "Technical Paper-1 Style Test" },
  elite:     { questionCount: 15, durationMinutes: 20, label: "Prelims/GATE Style Screening Test" }
};

/* ---------- Get the exam pattern for a job: prefer its own real
   pattern (examQ/examMin/examLabel, matching the actual real exam's
   question count and duration); fall back to a generic roadmap-type
   pattern only if a job is somehow missing those fields. ---------- */
function getExamPattern(job){
  if (job.examQ && job.examMin){
    return { questionCount: job.examQ, durationMinutes: job.examMin, label: job.examLabel || 'Exam Pattern' };
  }
  return examPatterns[job.roadmapType];
}

/* ---------- Seeded random (deterministic per job + set number, so
   "Mock Test 2" always draws the same fixed set of questions in the
   same order — a real, repeatable mock test rather than pure
   randomness every time). ---------- */
function xmur3(str){
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++){
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function(){
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}
function mulberry32(a){
  return function(){
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, seedStr){
  const seedFn = xmur3(seedStr);
  const rand = mulberry32(seedFn());
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  {tier:"10th",code:"10-01",name:"SSC MTS / Havaldar",overview:"Multi Tasking Staff (non-technical office support) and Havaldar (CBIC/CBN) roles across central government offices — one of the most accessible entry points right after Class 10.",age:"18–25 years (relaxation for reserved categories)",edu:"Passed Class 10 (Matriculation) from a recognised board",salary:"Pay Level 1, roughly ₹18,000–₹56,900 + allowances",roadmapType:"physical",examQ:90,examMin:90,examLabel:"SSC MTS Paper-1 Pattern"},
  {tier:"10th",code:"10-02",name:"SSC GD Constable",overview:"General Duty constable posts across BSF, CISF, CRPF, SSB, ITBP, Assam Rifles and the Secretariat Security Force, recruited through one common SSC exam.",age:"18–23 years (relaxation for reserved categories)",edu:"Passed Class 10 (Matriculation) from a recognised board",salary:"Pay Level 3, roughly ₹21,700–₹69,100 + allowances",roadmapType:"physical",examQ:80,examMin:60,examLabel:"SSC GD Constable Pattern"},
  {tier:"10th",code:"10-03",name:"Railway Group D",overview:"Track maintainer, helper and similar posts across Indian Railways — large-scale recruitment that regularly opens lakhs of vacancies nationwide.",age:"18–33 years (relaxation for reserved categories)",edu:"Passed Class 10 or ITI from a recognised institute",salary:"Pay Level 1, roughly ₹18,000 + railway allowances",roadmapType:"physical",examQ:100,examMin:90,examLabel:"RRB Group D CBT Pattern"},
  {tier:"10th",code:"10-04",name:"India Post GDS",overview:"Gramin Dak Sevak roles (Branch Postmaster, Assistant Branch Postmaster, Dak Sevak) that run rural post offices — selection is merit-based with no written exam.",age:"18–40 years (relaxation for reserved categories)",edu:"Passed Class 10 with local language as a subject",salary:"Time Related Continuity Allowance, roughly ₹10,000–₹14,500 + allowances",roadmapType:"clerical",examQ:50,examMin:30,examLabel:"GDS has no written exam — optional GK/aptitude practice"},
  {tier:"10th",code:"10-05",name:"Police Constable (State)",overview:"Entry-level constable posts in state police forces — one of the largest uniformed recruitment streams, run separately by each state.",age:"18–25 years (varies by state; relaxation for reserved categories)",edu:"Passed Class 10 or 12 depending on the state's notification",salary:"State pay scale, roughly ₹21,000–₹69,000 + allowances",roadmapType:"physical",examQ:100,examMin:90,examLabel:"State Police Constable Pattern (typical)"},
  {tier:"10th",code:"10-06",name:"Forest Guard",overview:"Field-level protection and patrolling duties in forest divisions — combines fieldwork with basic record-keeping.",age:"18–25/30 years depending on the state",edu:"Passed Class 10 or 12 depending on the state's notification",salary:"State pay scale, roughly ₹19,000–₹63,000 + allowances",roadmapType:"physical",examQ:100,examMin:120,examLabel:"State Forest Guard Pattern (typical)"},
  {tier:"10th",code:"10-07",name:"BSF / CISF / CRPF Constable (Tradesman)",overview:"Tradesman posts (cook, washerman, barber, tailor and similar trades) supporting central paramilitary units.",age:"18–23 years (relaxation for reserved categories)",edu:"Passed Class 10; a relevant trade certificate helps for some trades",salary:"Pay Level 1, roughly ₹18,000–₹56,900 + allowances",roadmapType:"physical",examQ:80,examMin:60,examLabel:"CAPF Tradesman Pattern (typical)"},
  {tier:"10th",code:"10-08",name:"SSB (Constable)",overview:"General Duty constable posts in the Sashastra Seema Bal, guarding India's Nepal and Bhutan borders.",age:"18–23 years (relaxation for reserved categories)",edu:"Passed Class 10 (Matriculation) from a recognised board",salary:"Pay Level 3, roughly ₹21,700–₹69,100 + allowances",roadmapType:"physical",examQ:80,examMin:60,examLabel:"SSC GD / SSB Constable Pattern"},
  {tier:"10th",code:"10-09",name:"Indian Army Agniveer (GD)",overview:"General Duty soldier under the Agnipath scheme — a four-year tenure with a defined path to permanent enrolment for top performers.",age:"17.5–21 years",edu:"Passed Class 10 with minimum aggregate marks as specified",salary:"Starts around ₹30,000/month package including allowances and Seva Nidhi corpus",roadmapType:"physical",examQ:50,examMin:60,examLabel:"Agnipath Common Entrance Exam (CEE) Pattern"},
  {tier:"10th",code:"10-10",name:"Navy SSR / MR",overview:"Senior Secondary Recruit (technical) and Matric Recruit (non-technical, e.g. cook/steward) sailor entries into the Indian Navy.",age:"17–21 years (varies by entry)",edu:"Passed Class 10 or 12 with the specified subjects, depending on the entry",salary:"Sailor pay scale, roughly ₹21,700–₹69,100 + allowances",roadmapType:"physical",examQ:50,examMin:60,examLabel:"Agnipath Navy Entrance Exam Pattern"},
  {tier:"10th",code:"10-11",name:"Air Force Agniveer",overview:"Agniveer Vayu entry into the Indian Air Force, covering technical and non-technical trades on a four-year engagement.",age:"17.5–21 years",edu:"Passed Class 10 or 12 with Maths/Science/English, depending on the trade",salary:"Starts around ₹30,000/month package including allowances and Seva Nidhi corpus",roadmapType:"physical",examQ:100,examMin:60,examLabel:"Agniveer Vayu Online Test Pattern (typical)"},
  {tier:"10th",code:"10-12",name:"ITBP / SSB Constable",overview:"General Duty and specialist constable posts in the Indo-Tibetan Border Police and Sashastra Seema Bal.",age:"18–23 years (relaxation for reserved categories)",edu:"Passed Class 10 (Matriculation) from a recognised board",salary:"Pay Level 3, roughly ₹21,700–₹69,100 + allowances",roadmapType:"physical",examQ:80,examMin:60,examLabel:"SSC GD-style Constable Pattern"},
  {tier:"10th",code:"10-13",name:"Apprentice in PSUs (BHEL, NTPC, ONGC, BEL, HAL, etc.)",overview:"Structured apprenticeship training in trades like fitter, electrician and welder inside large public-sector plants — a strong stepping stone toward a permanent technical role.",age:"18–25 years (varies by PSU)",edu:"Passed ITI in the relevant trade (Class 10 as base qualification)",salary:"Fixed monthly stipend, roughly ₹7,000–₹12,000 during training",roadmapType:"trade",examQ:100,examMin:90,examLabel:"PSU Apprentice Written Test Pattern (typical)"},
  {tier:"10th",code:"10-14",name:"State Govt. Peon / Group D Jobs",overview:"Peon, attendant and other Group D support posts in state government offices — steady entry-level government employment.",age:"18–30 years (varies by state; relaxation for reserved categories)",edu:"Passed Class 10 (some states accept Class 8) from a recognised board",salary:"State pay scale, roughly ₹15,000–₹40,000 + allowances",roadmapType:"clerical",examQ:50,examMin:60,examLabel:"State Group D Pattern (typical)"},
  {tier:"10th",code:"10-15",name:"Others (State / Central Group D Posts)",overview:"A wide catch-all of additional Class-10-level Group D posts advertised directly by state and central departments outside the major exams above.",age:"Varies by post and department",edu:"Passed Class 10 from a recognised board (minimum, varies by post)",salary:"Varies by pay level and department",roadmapType:"clerical",examQ:80,examMin:60,examLabel:"Typical Group D Pattern"},

  // ================= AFTER 12TH =================
  {tier:"12th",code:"12-01",name:"SSC CHSL (LDC, DEO, PA, SA)",overview:"Combined Higher Secondary Level exam for Lower Divisional Clerk, Data Entry Operator, Postal Assistant and Sorting Assistant posts in central ministries and departments.",age:"18–27 years (relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board",salary:"Pay Level 2–4, roughly ₹19,900–₹63,200 + allowances",roadmapType:"exam",examQ:100,examMin:60,examLabel:"SSC CHSL Tier-1 Pattern"},
  {tier:"12th",code:"12-02",name:"SSC CGL (Group B & C)",overview:"Combined Graduate Level exam for posts like Inspector, Auditor and Assistant across dozens of central departments — despite sitting on the \"12th\" route here, this exam actually requires a bachelor's degree to apply.",age:"18–32 years (varies by post; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline (this is a degree-level exam, not a 12th-pass one)",salary:"Pay Level 4–7, roughly ₹25,500–₹1,51,100 depending on the post",roadmapType:"exam",examQ:100,examMin:60,examLabel:"SSC CGL Tier-1 Pattern"},
  {tier:"12th",code:"12-03",name:"SSC Stenographer",overview:"Stenographer Grade C & D posts in central ministries and departments, testing shorthand speed alongside general aptitude.",age:"18–30 years (relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board",salary:"Pay Level 4–6, roughly ₹25,500–₹1,12,400 + allowances",roadmapType:"clerical",examQ:200,examMin:120,examLabel:"SSC Stenographer Pattern"},
  {tier:"12th",code:"12-04",name:"Railway NTPC (Undergraduate)",overview:"Non-Technical Popular Categories posts such as Commercial-cum-Ticket Clerk and Accounts Clerk, open to Class 12 pass candidates.",age:"18–33 years (relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board",salary:"Pay Level 2–3, roughly ₹19,900–₹63,200 + railway allowances",roadmapType:"exam",examQ:100,examMin:90,examLabel:"RRB NTPC CBT-1 Pattern"},
  {tier:"12th",code:"12-05",name:"Railway Group C (Various Posts)",overview:"Undergraduate-eligible technical and supervisory posts across Indian Railways zones, filled through RRB's various Group C notifications.",age:"18–33 years (relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board (some posts also need an ITI/diploma)",salary:"Pay Level 2–5, roughly ₹19,900–₹1,12,400 + railway allowances",roadmapType:"exam",examQ:100,examMin:90,examLabel:"RRB Group C Pattern (typical)"},
  {tier:"12th",code:"12-06",name:"India Post Postal Assistant / Sorting Assistant",overview:"Postal Assistant and Sorting Assistant posts handling counter services, mail sorting and record-keeping at post offices.",age:"18–27 years (relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board",salary:"Pay Level 4, roughly ₹25,500–₹81,100 + allowances",roadmapType:"clerical",examQ:100,examMin:60,examLabel:"India Post PA/SA Exam Pattern (typical)"},
  {tier:"12th",code:"12-07",name:"Bank PO (IBPS / SBI / RBI / Others)",overview:"Probationary Officer posts in public sector and central banks — a fast track into banking management. Note: this role actually requires a bachelor's degree, not just Class 12.",age:"20–30 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline (degree-level post, despite appearing on the 12th route)",salary:"Roughly ₹48,000–₹55,000 gross per month for POs, plus allowances",roadmapType:"exam",examQ:100,examMin:60,examLabel:"Bank PO Prelims Pattern"},
  {tier:"12th",code:"12-08",name:"Bank Clerk (IBPS / SBI / RRB / Others)",overview:"Clerical cadre posts handling day-to-day banking transactions and customer service at branch level.",age:"20–28 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline (most banks require a degree for clerk posts too)",salary:"Roughly ₹29,000–₹32,000 gross per month, plus allowances",roadmapType:"exam",examQ:100,examMin:60,examLabel:"Bank Clerk Prelims Pattern"},
  {tier:"12th",code:"12-09",name:"State Police Constable",overview:"State-level police constable recruitment for candidates who've completed Class 12, run independently by each state police board.",age:"18–25 years (varies by state; relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board",salary:"State pay scale, roughly ₹21,000–₹69,000 + allowances",roadmapType:"physical",examQ:100,examMin:90,examLabel:"State Police Constable Pattern (typical)"},
  {tier:"12th",code:"12-10",name:"CAPF (Assistant Commandant)",overview:"Group A gazetted officer entry into BSF, CRPF, CISF, ITBP and SSB through the UPSC CAPF exam — a degree-level post despite its placement here.",age:"20–25 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Pay Level 10, roughly ₹56,100–₹1,77,500 + allowances",roadmapType:"elite",examQ:125,examMin:120,examLabel:"UPSC CAPF Paper-2 Pattern"},
  {tier:"12th",code:"12-11",name:"UPSC CDS / AFCAT",overview:"Combined Defence Services and Air Force Common Admission Test — officer-entry routes into the Army, Navy and Air Force for graduates.",age:"19–24 years (varies by academy/entry)",edu:"Bachelor's degree (engineering degree required for some technical entries)",salary:"Officer pay scale with rank allowances after commissioning",roadmapType:"elite",examQ:120,examMin:120,examLabel:"UPSC CDS General Knowledge Paper Pattern"},
  {tier:"12th",code:"12-12",name:"Income Tax Inspector",overview:"Inspector-level posts in the Income Tax Department, recruited through the SSC CGL exam — a degree-level post.",age:"18–30 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Pay Level 7, roughly ₹44,900–₹1,42,400 + allowances",roadmapType:"exam",examQ:100,examMin:60,examLabel:"SSC CGL Tier-1 Pattern"},
  {tier:"12th",code:"12-13",name:"EPFO EO / AO",overview:"Enforcement Officer-cum-Accounts Officer posts managing India's retirement savings scheme for organised-sector workers — a degree-level post.",age:"18–30 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline (law/accounts background helps)",salary:"Pay Level 7, roughly ₹44,900–₹1,42,400 + allowances",roadmapType:"exam",examQ:120,examMin:120,examLabel:"UPSC EPFO Paper-1 Pattern (typical)"},
  {tier:"12th",code:"12-14",name:"State Govt. LDC / Junior Assistant",overview:"Lower Divisional Clerk and Junior Assistant posts in state secretariats and departments, handling routine office and file work.",age:"18–30 years (varies by state; relaxation for reserved categories)",edu:"Passed Class 12 from a recognised board",salary:"State pay scale, roughly ₹19,000–₹60,000 + allowances",roadmapType:"clerical",examQ:100,examMin:90,examLabel:"State LDC Pattern (typical)"},
  {tier:"12th",code:"12-15",name:"Others (Group B & C Posts)",overview:"A wide catch-all of additional Class-12-level Group B and C posts advertised by central and state departments outside the major exams above.",age:"Varies by post and department",edu:"Passed Class 12 from a recognised board (minimum, varies by post)",salary:"Varies by pay level and department",roadmapType:"exam",examQ:100,examMin:60,examLabel:"Typical SSC-style Pattern"},

  // ================= AFTER ITI =================
  {tier:"iti",code:"ITI-01",name:"RRB ALP (Assistant Loco Pilot)",overview:"Assistant Loco Pilot posts operating and assisting with train engines — one of the most sought-after ITI-level railway roles.",age:"18–30 years (relaxation for reserved categories)",edu:"ITI certificate in a relevant trade (or equivalent diploma) from a recognised institute",salary:"Pay Level 2, roughly ₹19,900–₹63,200 + railway allowances",roadmapType:"trade",examQ:75,examMin:60,examLabel:"RRB ALP CBT-1 Pattern"},
  {tier:"iti",code:"ITI-02",name:"RRB Technician (Grade III)",overview:"Technician Grade III posts maintaining rolling stock and railway infrastructure across various railway workshops and depots.",age:"18–30 years (relaxation for reserved categories)",edu:"ITI certificate in the relevant trade from a recognised institute",salary:"Pay Level 2, roughly ₹19,900–₹63,200 + railway allowances",roadmapType:"trade",examQ:100,examMin:90,examLabel:"RRB Technician CBT Pattern (typical)"},
  {tier:"iti",code:"ITI-03",name:"Railway Group D (ITI Quota)",overview:"Group D track maintainer and helper posts, with ITI-trade candidates given preference in some recruitment cycles.",age:"18–33 years (relaxation for reserved categories)",edu:"ITI certificate in the relevant trade (or Class 10 pass) from a recognised institute",salary:"Pay Level 1, roughly ₹18,000 + railway allowances",roadmapType:"trade",examQ:100,examMin:90,examLabel:"RRB Group D CBT Pattern"},
  {tier:"iti",code:"ITI-04",name:"DRDO Technician 'A'",overview:"Technician-grade posts supporting DRDO's defence research laboratories in trades like electronics, mechanical and instrumentation.",age:"18–28 years (relaxation for reserved categories)",edu:"ITI certificate (NCVT/SCVT) in the relevant trade",salary:"Pay Level 2, roughly ₹19,900–₹63,200 + allowances",roadmapType:"trade",examQ:150,examMin:120,examLabel:"DRDO CEPTAM Tier-1 Pattern"},
  {tier:"iti",code:"ITI-05",name:"BHEL / HAL / BEL / ONGC Technician",overview:"Technician-grade posts in major public-sector engineering and energy companies, working directly on plant and equipment maintenance.",age:"18–28 years (varies by PSU)",edu:"ITI certificate in the relevant trade from a recognised institute",salary:"PSU technician grade, roughly ₹20,000–₹45,000 + allowances",roadmapType:"trade",examQ:100,examMin:90,examLabel:"PSU Technician Written Test Pattern (typical)"},
  {tier:"iti",code:"ITI-06",name:"BSF / CRPF / CISF (Tradesman)",overview:"Skilled tradesman posts (electrician, mechanic, plumber and similar trades) supporting central armed police force units.",age:"18–25 years (relaxation for reserved categories)",edu:"ITI certificate in the relevant trade from a recognised institute",salary:"Pay Level 2, roughly ₹19,900–₹63,200 + allowances",roadmapType:"trade",examQ:80,examMin:60,examLabel:"CAPF Tradesman Pattern (typical)"},
  {tier:"iti",code:"ITI-07",name:"Indian Army Agniveer (Tech) (Trades)",overview:"Technical trade entries under the Agnipath scheme for candidates with an ITI background, covering trades like electrician and mechanic.",age:"17.5–21 years",edu:"ITI certificate in the relevant trade, alongside Class 10/12 as specified",salary:"Starts around ₹30,000/month package including allowances and Seva Nidhi corpus",roadmapType:"trade",examQ:50,examMin:60,examLabel:"Agnipath Technical CEE Pattern"},
  {tier:"iti",code:"ITI-08",name:"Indian Navy MR (Artificer Apprentice)",overview:"Artificer Apprentice entry training sailors in marine engineering trades aboard naval ships.",age:"17–20 years",edu:"Class 10/12 with Maths/Science, plus relevant ITI trade knowledge for MR",salary:"Sailor pay scale, roughly ₹21,700–₹69,100 + allowances",roadmapType:"trade",examQ:50,examMin:60,examLabel:"Agnipath Navy Entrance Exam Pattern"},
  {tier:"iti",code:"ITI-09",name:"Air Force Agniveer (Tech)",overview:"Technical trade Agniveer entry into the Indian Air Force for candidates with an ITI qualification in relevant trades.",age:"17.5–21 years",edu:"ITI certificate in the relevant trade, alongside Class 10/12 as specified",salary:"Starts around ₹30,000/month package including allowances and Seva Nidhi corpus",roadmapType:"trade",examQ:100,examMin:60,examLabel:"Agniveer Vayu Online Test Pattern (typical)"},
  {tier:"iti",code:"ITI-10",name:"State Electricity Board (Technician)",overview:"Lineman, wireman and technician posts maintaining power distribution infrastructure for state electricity boards.",age:"18–28 years (varies by state; relaxation for reserved categories)",edu:"ITI certificate in Electrician/Wireman trade from a recognised institute",salary:"State pay scale, roughly ₹20,000–₹45,000 + allowances",roadmapType:"trade",examQ:100,examMin:90,examLabel:"State Technician Pattern (typical)"},
  {tier:"iti",code:"ITI-11",name:"DMRC Maintainer",overview:"Maintainer posts keeping Delhi Metro's rolling stock, signalling and electrical systems running smoothly.",age:"18–28 years (relaxation for reserved categories)",edu:"ITI certificate in the relevant trade from a recognised institute",salary:"Roughly ₹20,000–₹40,000 + allowances",roadmapType:"trade",examQ:100,examMin:90,examLabel:"DMRC Maintainer Written Test Pattern (typical)"},
  {tier:"iti",code:"ITI-12",name:"ISRO / DRDO Technician",overview:"Technician-grade posts supporting India's space and defence research organisations in fabrication, electronics and instrumentation work.",age:"18–28 years (relaxation for reserved categories)",edu:"ITI certificate (NCVT/SCVT) in the relevant trade",salary:"Pay Level 2, roughly ₹19,900–₹63,200 + allowances",roadmapType:"trade",examQ:100,examMin:90,examLabel:"ISRO/DRDO Technician Written Test Pattern (typical)"},
  {tier:"iti",code:"ITI-13",name:"Navy Ship/Vehicle Mechanic",overview:"Mechanic trade posts maintaining naval vessels and support vehicles, recruited through Navy civilian and MR entries.",age:"18–25 years (varies by entry)",edu:"ITI certificate in Mechanic (Motor Vehicle/Diesel) trade",salary:"Roughly ₹20,000–₹45,000 + allowances",roadmapType:"trade",examQ:100,examMin:90,examLabel:"Technical Trade Test Pattern (typical)"},
  {tier:"iti",code:"ITI-14",name:"Others (PSUs / State Technician Posts)",overview:"A wide catch-all of additional ITI-level technician posts advertised directly by PSUs and state technical departments.",age:"Varies by post and department",edu:"ITI certificate in the relevant trade (minimum, varies by post)",salary:"Varies by pay level and department",roadmapType:"trade",examQ:100,examMin:90,examLabel:"Typical Technician Test Pattern"},

  // ================= AFTER DIPLOMA =================
  {tier:"diploma",code:"DIP-01",name:"SSC JE (Junior Engineer)",overview:"Junior Engineer posts (Civil, Mechanical, Electrical) across central departments like CPWD, MES and CWC, recruited through SSC's dedicated JE exam.",age:"18–32 years (relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"Pay Level 6, roughly ₹35,400–₹1,12,400 + allowances",roadmapType:"technical",examQ:200,examMin:120,examLabel:"SSC JE Paper-1 Pattern"},
  {tier:"diploma",code:"DIP-02",name:"RRB JE (Junior Engineer)",overview:"Junior Engineer posts across Indian Railways zones, covering civil, mechanical, electrical and signal disciplines.",age:"18–33 years (relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"Pay Level 6, roughly ₹35,400–₹1,12,400 + railway allowances",roadmapType:"technical",examQ:100,examMin:90,examLabel:"RRB JE CBT-1 Pattern"},
  {tier:"diploma",code:"DIP-03",name:"State JE (PWD / PHED / Electricity / Others)",overview:"Junior Engineer posts in state Public Works, water supply (PHED) and electricity departments, overseeing local infrastructure projects.",age:"18–35 years (varies by state; relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"State pay scale, roughly ₹35,000–₹80,000 + allowances",roadmapType:"technical",examQ:100,examMin:120,examLabel:"State JE Pattern (typical)"},
  {tier:"diploma",code:"DIP-04",name:"BSNL / MTNL / IOCL / HPCL Engineer",overview:"Junior/Technical Officer-level engineering posts in major public-sector telecom and oil companies.",age:"18–28 years (varies by PSU)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"PSU pay scale, roughly ₹35,000–₹90,000 + allowances",roadmapType:"technical",examQ:150,examMin:150,examLabel:"PSU Junior Engineer Written Test Pattern (typical)"},
  {tier:"diploma",code:"DIP-05",name:"DRDO / ISRO Technician / Engineer",overview:"Diploma-level engineering and technician posts supporting India's defence and space research programmes.",age:"18–28 years (relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"Pay Level 6, roughly ₹35,400–₹1,12,400 + allowances",roadmapType:"technical",examQ:150,examMin:120,examLabel:"DRDO CEPTAM / ISRO Technical Pattern (typical)"},
  {tier:"diploma",code:"DIP-06",name:"BHEL / BEL / HAL Engineer",overview:"Diploma trainee/engineer posts in major public-sector engineering and defence-manufacturing companies.",age:"18–28 years (varies by PSU)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"PSU pay scale, roughly ₹35,000–₹90,000 + allowances",roadmapType:"technical",examQ:150,examMin:150,examLabel:"PSU Engineer Trainee Written Test Pattern (typical)"},
  {tier:"diploma",code:"DIP-07",name:"DMRC Junior Engineer",overview:"Junior Engineer posts overseeing Delhi Metro's civil, electrical, signalling and mechanical systems.",age:"18–28 years (relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"Roughly ₹35,000–₹90,000 + allowances",roadmapType:"technical",examQ:100,examMin:90,examLabel:"DMRC JE Written Test Pattern (typical)"},
  {tier:"diploma",code:"DIP-08",name:"Railway Supervisor (RRB)",overview:"Supervisory posts across railway operations and maintenance, filled through RRB's diploma-level notifications.",age:"18–33 years (relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"Pay Level 5–6, roughly ₹29,200–₹1,12,400 + railway allowances",roadmapType:"technical",examQ:100,examMin:90,examLabel:"RRB Supervisor CBT Pattern (typical)"},
  {tier:"diploma",code:"DIP-09",name:"UPSSSC JE / UPPSC AE",overview:"Junior Engineer and Assistant Engineer posts in Uttar Pradesh's technical departments, recruited through UPSSSC and UPPSC respectively.",age:"18–40 years (varies by post; relaxation for reserved categories)",edu:"Diploma (for JE) or degree (for AE) in the relevant engineering discipline",salary:"State pay scale, roughly ₹35,000–₹1,00,000 + allowances",roadmapType:"technical",examQ:100,examMin:120,examLabel:"State JE/AE Pattern (typical)"},
  {tier:"diploma",code:"DIP-10",name:"State Technical Assistant",overview:"Technical Assistant posts supporting engineers in state infrastructure and utility departments.",age:"18–35 years (varies by state; relaxation for reserved categories)",edu:"Diploma (Polytechnic) in the relevant engineering discipline",salary:"State pay scale, roughly ₹29,000–₹70,000 + allowances",roadmapType:"technical",examQ:100,examMin:90,examLabel:"State Technical Assistant Pattern (typical)"},
  {tier:"diploma",code:"DIP-11",name:"Navy / Army Technical Entry (Short Service Commission)",overview:"Short Service Commission technical entry for diploma holders into the Navy and Army, leading to an officer rank after training.",age:"19–25 years (varies by entry)",edu:"Diploma in the relevant engineering discipline (degree preferred for some entries)",salary:"Officer pay scale with rank allowances after commissioning",roadmapType:"elite",examQ:100,examMin:120,examLabel:"Technical SSC Entry Written Test Pattern (typical)"},
  {tier:"diploma",code:"DIP-12",name:"Others (PSUs / State Technical Posts)",overview:"A wide catch-all of additional diploma-level technical posts advertised directly by PSUs and state departments.",age:"Varies by post and department",edu:"Diploma (Polytechnic) in the relevant engineering discipline (minimum, varies by post)",salary:"Varies by pay level and department",roadmapType:"technical",examQ:100,examMin:90,examLabel:"Typical Technical Pattern"},

  // ================= AFTER DEGREE =================
  {tier:"degree",code:"DEG-01",name:"SSC CGL (Group B & C)",overview:"Combined Graduate Level exam for posts like Inspector, Auditor, Assistant and Sub-Inspector across dozens of central departments.",age:"18–32 years (varies by post; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Pay Level 4–7, roughly ₹25,500–₹1,51,100 depending on the post",roadmapType:"exam",examQ:100,examMin:60,examLabel:"SSC CGL Tier-1 Pattern"},
  {tier:"degree",code:"DEG-02",name:"UPSC Civil Services (IAS / IPS / IFS)",overview:"India's premier civil services exam leading to the IAS, IPS, IFS and other Group A/B central services — widely regarded as the toughest and most prestigious government exam in the country.",age:"21–32 years (general category; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Pay Level 10 and above, starting around ₹56,100 + allowances, rising through the career",roadmapType:"elite",examQ:100,examMin:120,examLabel:"UPSC Prelims GS Paper-1 Pattern"},
  {tier:"degree",code:"DEG-03",name:"UPSC CAPF (Assistant Commandant)",overview:"Group A gazetted officer entry into BSF, CRPF, CISF, ITBP and SSB through the UPSC CAPF exam.",age:"20–25 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Pay Level 10, roughly ₹56,100–₹1,77,500 + allowances",roadmapType:"elite",examQ:125,examMin:120,examLabel:"UPSC CAPF Paper-2 Pattern"},
  {tier:"degree",code:"DEG-04",name:"UPSC EPFO / ESIC / Other",overview:"UPSC-conducted recruitment for senior posts in EPFO, ESIC and other central bodies, such as Enforcement Officer and Assistant Provident Fund Commissioner.",age:"21–30 years (varies by post; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline (relevant specialisation preferred for some posts)",salary:"Pay Level 7–8, roughly ₹44,900–₹1,42,400+ depending on the post",roadmapType:"exam",examQ:120,examMin:120,examLabel:"UPSC EPFO Paper-1 Pattern (typical)"},
  {tier:"degree",code:"DEG-05",name:"State PSC (Group 1 / 2 / 3 / 4)",overview:"State-level equivalent of the UPSC civil services exam, recruiting Deputy Collectors, DSPs and other senior state administrative and police officers.",age:"21–40 years (varies widely by state; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"State pay scale, roughly ₹56,100 and above depending on the post and state",roadmapType:"elite",examQ:100,examMin:120,examLabel:"State PSC Prelims Pattern (typical)"},
  {tier:"degree",code:"DEG-06",name:"Bank PO / Clerk",overview:"Probationary Officer and Clerk cadre posts in public sector and central banks, filled through IBPS, SBI and RBI recruitment exams.",age:"20–30 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Roughly ₹29,000–₹55,000 gross per month depending on the post, plus allowances",roadmapType:"exam",examQ:100,examMin:60,examLabel:"Bank Prelims Pattern"},
  {tier:"degree",code:"DEG-07",name:"Insurance AO / LIC AAO",overview:"Administrative Officer and Assistant Administrative Officer posts in public-sector insurance companies like LIC, NIACL and GIC.",age:"21–30 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Roughly ₹45,000–₹55,000 gross per month, plus allowances",roadmapType:"exam",examQ:100,examMin:60,examLabel:"Insurance/LIC Prelims Pattern (typical)"},
  {tier:"degree",code:"DEG-08",name:"Railway Group B (Various)",overview:"Graduate-level supervisory and gazetted-track posts across Indian Railways, filled through RRB's Group B notifications and promotions.",age:"18–36 years (varies by post; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"Pay Level 7–8, roughly ₹44,900–₹1,42,400 + railway allowances",roadmapType:"exam",examQ:100,examMin:90,examLabel:"RRB Group B Pattern (typical)"},
  {tier:"degree",code:"DEG-09",name:"NABARD Grade A / B",overview:"Officer-grade posts in India's apex rural development bank, covering agriculture finance, rural development and banking supervision.",age:"21–32 years (varies by grade; relaxation for reserved categories)",edu:"Bachelor's degree in any discipline (specific disciplines required for some specialist posts)",salary:"Roughly ₹58,000–₹85,000 gross per month, plus allowances",roadmapType:"exam",examQ:200,examMin:120,examLabel:"NABARD Grade A/B Prelims Pattern"},
  {tier:"degree",code:"DEG-10",name:"CDS / AFCAT (For Graduates)",overview:"Combined Defence Services and Air Force Common Admission Test — officer-entry routes into the Army, Navy and Air Force for graduates.",age:"19–24 years (varies by academy/entry)",edu:"Bachelor's degree in any discipline (engineering degree required for some technical entries)",salary:"Officer pay scale with rank allowances after commissioning",roadmapType:"elite",examQ:120,examMin:120,examLabel:"UPSC CDS General Knowledge Paper Pattern"},
  {tier:"degree",code:"DEG-11",name:"Teaching (TET / CTET / KVS / NVS / DSSSB)",overview:"Teaching posts in central and state schools, requiring a bachelor's degree plus a B.Ed and a qualifying TET/CTET score.",age:"21–35 years (varies by state/board; relaxation for reserved categories)",edu:"Bachelor's degree plus B.Ed, with a qualifying TET/CTET score",salary:"Pay Level 6–7, roughly ₹35,400–₹1,12,400 + allowances",roadmapType:"exam",examQ:150,examMin:150,examLabel:"CTET Paper-1 Pattern"},
  {tier:"degree",code:"DEG-12",name:"Police SI / Inspector (State)",overview:"Sub-Inspector and Inspector-level posts in state police forces, combining supervisory duties with active field responsibility.",age:"20–28 years (relaxation for reserved categories)",edu:"Bachelor's degree in any discipline from a recognised university",salary:"State pay scale, roughly ₹35,400–₹1,12,400 + allowances",roadmapType:"physical",examQ:100,examMin:120,examLabel:"State Police SI Pattern (typical)"},
  {tier:"degree",code:"DEG-13",name:"Others (State / Central Jobs)",overview:"A wide catch-all of additional graduate-level Group A and B posts advertised directly by ministries, PSUs and regulatory bodies.",age:"Varies by post and department",edu:"Bachelor's degree in any discipline (minimum, varies by post)",salary:"Varies by pay level and department",roadmapType:"exam",examQ:100,examMin:90,examLabel:"Typical Group A/B Pattern"},

  // ================= AFTER BTECH/BE =================
  {tier:"btech",code:"BT-01",name:"GATE → PSU Jobs (ONGC, BHEL, IOCL, NTPC, BEL, HAL, etc.)",overview:"A strong GATE score lets PSUs shortlist engineering graduates directly for Management/Engineer Trainee roles, skipping a separate PSU-specific written exam.",age:"Up to 26–30 years depending on the PSU (relaxation for reserved categories)",edu:"B.Tech / B.E. in the relevant engineering discipline",salary:"Pay Level 10, roughly ₹60,000–₹1,80,000 (CTC) + allowances",roadmapType:"elite",examQ:65,examMin:180,examLabel:"GATE Exam Pattern"},
  {tier:"btech",code:"BT-02",name:"PSUs via Direct Recruitment (TATA Power, SAIL, BPCL, etc.)",overview:"Some PSUs run their own campus placement or direct-recruitment drives for engineering graduates, separate from the GATE route.",age:"Up to 27–30 years depending on the PSU",edu:"B.Tech / B.E. in the relevant engineering discipline",salary:"PSU management trainee scale, roughly ₹50,000–₹1,50,000 (CTC) + allowances",roadmapType:"technical",examQ:150,examMin:150,examLabel:"PSU Direct Recruitment Written Test Pattern (typical)"},
  {tier:"btech",code:"BT-03",name:"SSC JE (Through GATE)",overview:"Some SSC Junior Engineer posts also accept a valid GATE score as an alternative screening route for B.Tech graduates.",age:"18–32 years (relaxation for reserved categories)",edu:"B.Tech / B.E. in the relevant engineering discipline",salary:"Pay Level 6, roughly ₹35,400–₹1,12,400 + allowances",roadmapType:"technical",examQ:200,examMin:120,examLabel:"SSC JE Paper-1 Pattern"},
  {tier:"btech",code:"BT-04",name:"DRDO Scientist 'B'",overview:"Entry-level scientist posts at DRDO's defence research labs, working on projects across missiles, electronics, materials and more.",age:"Up to 28 years (relaxation for reserved categories)",edu:"B.Tech / B.E. (or equivalent) with a strong academic record; GATE score often used for shortlisting",salary:"Pay Level 10, roughly ₹56,100–₹1,77,500 + allowances",roadmapType:"elite",examQ:150,examMin:120,examLabel:"DRDO Scientist-B Written Test Pattern (typical)"},
  {tier:"btech",code:"BT-05",name:"ISRO Scientist / Engineer 'SC'",overview:"Entry-level scientist/engineer posts at ISRO, working on India's space research, satellite and launch vehicle programmes.",age:"Up to 35 years (relaxation for reserved categories)",edu:"B.Tech / B.E. in the relevant engineering discipline with a strong academic record",salary:"Pay Level 10, roughly ₹56,100–₹1,77,500 + allowances",roadmapType:"elite",examQ:80,examMin:90,examLabel:"ISRO Scientist/Engineer Written Test Pattern (typical)"},
  {tier:"btech",code:"BT-06",name:"BARC / NPCIL Engineer",overview:"Scientific Officer and engineer posts in India's atomic energy establishments, working on nuclear power and research programmes.",age:"Up to 26 years (relaxation for reserved categories)",edu:"B.Tech / B.E. in the relevant engineering discipline (through BARC Training School or direct recruitment)",salary:"Pay Level 10, roughly ₹56,100–₹1,77,500 + allowances",roadmapType:"elite",examQ:100,examMin:150,examLabel:"BARC OGET-style Written Test Pattern (typical)"},
  {tier:"btech",code:"BT-07",name:"Indian Army (TES Entry)",overview:"Technical Entry Scheme lets Class 12 PCM students join as officer cadets and complete their engineering degree during training — B.Tech holders can also apply through direct technical entries.",age:"16.5–19.5 years for TES after Class 12 (separate norms apply for direct B.Tech entries)",edu:"Class 12 with PCM for TES; B.Tech/B.E. for direct technical graduate entries",salary:"Officer pay scale with rank allowances after commissioning",roadmapType:"physical",examQ:100,examMin:120,examLabel:"Army TES Written Test Pattern (typical)"},
  {tier:"btech",code:"BT-08",name:"Indian Navy (SSC Technical)",overview:"Short Service Commission technical entry for engineering graduates into the Indian Navy's Executive, Engineering or Electrical branches.",age:"19–25 years (varies by branch)",edu:"B.Tech / B.E. in the relevant engineering discipline",salary:"Officer pay scale with rank allowances after commissioning",roadmapType:"physical",examQ:100,examMin:120,examLabel:"Navy SSC Technical Written Test Pattern (typical)"},
  {tier:"btech",code:"BT-09",name:"Air Force (SSC Tech)",overview:"Short Service Commission technical entry for engineering graduates into the Indian Air Force's Aeronautical and other technical branches.",age:"20–26 years",edu:"B.Tech / B.E. in the relevant engineering discipline",salary:"Officer pay scale with rank allowances after commissioning",roadmapType:"physical",examQ:100,examMin:120,examLabel:"Air Force SSC Tech Written Test Pattern (typical)"},
  {tier:"btech",code:"BT-10",name:"UPSC Engineering Services (IES / ESE)",overview:"One of India's top engineering exams, recruiting Class I/II engineering officers into central departments like Railways, Roads, Telecom and Power.",age:"21–30 years (relaxation for reserved categories)",edu:"B.Tech / B.E. in Civil, Mechanical, Electrical or Electronics & Telecom engineering",salary:"Pay Level 10, roughly ₹56,100–₹1,77,500 + allowances",roadmapType:"elite",examQ:100,examMin:120,examLabel:"UPSC ESE Prelims Paper-1 Pattern"},
  {tier:"btech",code:"BT-11",name:"State Engineering Services",overview:"State-level equivalent of the UPSC Engineering Services exam, recruiting Assistant Engineers into state technical departments.",age:"21–35 years (varies by state; relaxation for reserved categories)",edu:"B.Tech / B.E. in the relevant engineering discipline",salary:"State pay scale, roughly ₹44,900–₹1,42,400 + allowances",roadmapType:"technical",examQ:100,examMin:120,examLabel:"State Engineering Services Pattern (typical)"},
  {tier:"btech",code:"BT-12",name:"Others (PSUs / Research Organizations)",overview:"A wide catch-all of additional B.Tech-level posts advertised directly by PSUs, research organisations and technical departments.",age:"Varies by post and organisation",edu:"B.Tech / B.E. in the relevant engineering discipline (minimum, varies by post)",salary:"Varies by pay level and organisation",roadmapType:"technical",examQ:100,examMin:120,examLabel:"Typical PSU Written Test Pattern"}
];

jobs.forEach(j=>{
  j.id = j.tier + "-" + j.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  j.body = getOrg(j.name).name;
  j.resources = [[getOrg(j.name).name, getOrg(j.name).url]];
});

/* ============================================================
   FULL GUIDE — After 10th tier (10-01 .. 10-15)
   Same structure as the other tiers, sourced from the
   After-10th flowchart reference docs.
   ============================================================ */
const fullGuides10 = {
  "10-01": { // SSC MTS / Havaldar
    jobWork: ["Office support duties — dispatch, filing, photocopying, peon-style errands and general assistance for MTS; watch-and-ward, patrolling and basic enforcement support for Havaldar in CBIC/CBN.","Follow departmental rules, safety procedures and supervisory instructions."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Numerical & Mathematical Ability — number system, percentages, ratio/proportion, averages, time-work, time-distance.","English/Language — grammar, vocabulary, comprehension.","Use the exact syllabus annexure in the current SSC MTS/Havaldar notice."],
    examPattern: "A two-session Computer Based Exam: Session-I covers Numerical & Mathematical Ability and Reasoning; Session-II covers General Awareness and English. The current notice controls exact marks and negative marking.",
    selection: "SSC application → Computer Based Examination → merit/selection → document verification → appointment.",
    physical: "MTS: normally no PET/PST. Havaldar vacancies have prescribed PET/PST — build fitness early if applying for Havaldar.",
    salary: "MTS is generally Pay Level-1; Havaldar is also Level-1. In-hand varies by city and deductions.",
    promotions: "Promotion follows service rules, seniority, departmental exams and vacancies — MTS/Havaldar staff can progress to higher Group C grades over a career.",
    posting: "Central Government ministries/departments/offices across locations specified in the vacancy.",
    advantages: ["One of the most accessible central government entry points right after Class 10.","No advanced technical knowledge required for the written exam.","Structured Pay Level 1 with allowances and long-term job security."],
    disadvantages: ["Very high applicant volume for a limited number of vacancies.","Havaldar posts require clearing PET/PST alongside the written exam.","Promotion pace at entry-level grades can be slow."],
    prep: ["Read the latest official SSC MTS/Havaldar notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in Maths and Reasoning before timed practice.","Solve previous-year Session-I/Session-II papers and analyze mistakes.","If applying for Havaldar, start physical training early.","Take full mocks regularly and maintain an error notebook."],
    documents: ["Class 10 marksheet/certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "10-02": { // SSC GD Constable
    jobWork: ["General duty constable work — guarding, patrolling, checkpoint duty and internal-security or border-security tasks depending on the force allotted (BSF, CISF, CRPF, SSB, ITBP, Assam Rifles).","Follow force-specific rules, safety procedures and supervisory instructions; shift and field duty is standard."],
    syllabus: ["General Knowledge/General Awareness — current affairs, polity, history, geography, science.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Elementary Mathematics — number system, percentages, ratio/proportion, averages, time-work, time-distance.","English/Hindi — grammar, vocabulary, comprehension.","Use the exact syllabus annexure in the current SSC GD notice."],
    examPattern: "Four objective sections in a single CBE: Reasoning, General Knowledge/GA, Elementary Mathematics and English/Hindi. Exact marks, duration and negative marking follow the current GD notice.",
    selection: "SSC CBE → PST/PET → medical examination → document verification → force allocation/appointment.",
    physical: "PST/PET are mandatory for shortlisted candidates; height/chest/weight/running standards vary by category, region and sex per the current notice.",
    salary: "Generally Pay Level-3 for Constable GD, plus applicable allowances; actual in-hand depends on force and posting.",
    promotions: "Promotion follows force-specific service rules, seniority, departmental exams and vacancies — constables can rise through Head Constable and senior ranks.",
    posting: "BSF, CISF, CRPF, ITBP, SSB, SSF and Assam Rifles/Rifleman vacancies as notified — postings span all of India, including border areas.",
    advantages: ["One common exam gives access to multiple central paramilitary forces.","Stable, structured uniformed government employment.","Clear promotion ladder through departmental exams."],
    disadvantages: ["Physically demanding PST/PET is a hard hurdle after the written exam.","Frequent transfers and challenging postings, including border/remote areas.","High applicant volume makes cutoffs competitive."],
    prep: ["Read the latest official SSC GD notification first.","Build a topic checklist from the official syllabus.","Start running and endurance training months in advance for PST/PET.","Solve previous-year GD papers and analyze mistakes.","Take full mocks regularly alongside physical training.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 10 marksheet/certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile certificate if required"]
  },
  "10-03": { // Railway Group D
    jobWork: ["Track maintainer, helper and similar entry-level duties supporting railway infrastructure and operations across zones and divisions.","Follow departmental rules, safety procedures and supervisory instructions; field and physically demanding work is common."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, time-work, time-distance.","General Science — basic physics, chemistry and applied science.","Use the exact Level-1 CEN syllabus annexure."],
    examPattern: "Common Level-1 subjects: Mathematics, General Intelligence & Reasoning, General Science and General Awareness/Current Affairs; exact pattern follows the current CEN.",
    selection: "RRB CBT → PET → document verification → medical examination → appointment.",
    physical: "PET normally includes running and weight-carrying standards with separate male/female criteria — build endurance well in advance.",
    salary: "Level-1 basic pay is generally ₹18,000 under the 7th CPC framework, plus applicable railway allowances; in-hand varies.",
    promotions: "Promotion follows railway service rules, seniority, departmental exams and vacancies — Group D roles can progress to Technician or supervisory grades over time.",
    posting: "Railway zones/divisions, stations, yards, tracks, workshops and depots depending on the post.",
    advantages: ["Large-scale, recurring recruitment with historically lakhs of vacancies.","Entry point into the broader railway system with long-term stability.","Structured pay level with railway allowances."],
    disadvantages: ["Physically demanding track/field work.","PET is a hard qualifying hurdle after the written exam.","High applicant volume, making cutoffs competitive."],
    prep: ["Read the latest official RRB Group D CEN notification first.","Build a topic checklist from the official syllabus.","Start running and endurance training months in advance for the PET.","Solve previous-year CBT papers and analyze mistakes.","Take full mocks regularly alongside physical training.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 10 marksheet and/or ITI/NAC certificate as applicable","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile certificate if required by the zone"]
  },
  "10-04": { // India Post GDS
    jobWork: ["Running rural post offices as Branch Postmaster, Assistant Branch Postmaster or Dak Sevak — mail delivery, savings transactions and basic postal services.","Follow Department of Posts rules and public-service procedures; often the sole postal presence in a rural area."],
    syllabus: ["No conventional written competitive examination is normally used for GDS selection.","Selection is largely based on Class 10 marksheet percentage rather than a separate test.","Optional self-preparation: basic GK, arithmetic and reasoning can help if a state circle ever introduces a screening element.","Use the exact selection process described in the current GDS engagement notice for your circle."],
    examPattern: "Normally no conventional written competitive examination — selection uses a system-generated merit list based mainly on the Class 10 marksheet.",
    selection: "Online application → system-generated merit based mainly on Class X record → shortlisting → document verification → engagement.",
    physical: "No SSC-GD-style PET; role conditions can include bicycle-riding ability, medical suitability and other declarations.",
    salary: "GDS uses TRCA/remuneration rules rather than a standard regular Central Government pay-level structure; exact TRCA depends on BPM/ABPM/Dak Sevak role and hours.",
    promotions: "Promotion follows Department of Posts service rules, seniority, departmental exams and vacancies — GDS roles can lead to regular departmental postal posts over time.",
    posting: "Branch Post Offices and postal divisions/circles, often rural or semi-urban.",
    advantages: ["No written exam — merit is based on your existing Class 10 marks.","Simple, low-cost application process compared to exam-based recruitment.","Meaningful role serving a local rural community."],
    disadvantages: ["TRCA-based remuneration is lower than a standard regular government salary.","Merit depends entirely on Class 10 percentage, so there's no way to improve your chances through later preparation.","Vacancies and their location depend heavily on the specific postal circle."],
    prep: ["Read the latest official GDS engagement notice for your state circle.","Confirm your Class 10 marksheet percentage and local-language eligibility.","Prepare all required documents (marksheet, ID, category certificate) well in advance.","Since there's no written exam, focus energy on submitting an accurate, error-free application.","Track the circle's official website for merit list and verification dates."],
    documents: ["Class 10 marksheet showing the local language as a subject","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Domicile/local-language certificate if required"]
  },
  "10-05": { // Police Constable (State)
    jobWork: ["Frontline law-and-order duties — patrolling, beat duty, traffic management and assistance in investigations under a state police force.","Follow departmental rules, safety procedures and supervisory instructions; shift duty and physically demanding work are standard."],
    syllabus: ["General Knowledge/Current Affairs — national and state-level events, polity, history, geography.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Arithmetic/Maths — number system, percentages, ratio/proportion, averages, time-work, time-distance.","Language — grammar, vocabulary, comprehension in the notified language.","Exact syllabus is state-specific — use the current state notification."],
    examPattern: "Usually General Knowledge/Current Affairs, Reasoning, Arithmetic/Maths, language and state-specific topics in a written/CBT exam; exact question count and marks are state-specific.",
    selection: "State written/CBT → PST/PET → document verification → medical/character verification → appointment, with variations by state.",
    physical: "PST/PET usually include height, chest (where applicable), running and other events; exact standards are state-specific.",
    salary: "State pay scale varies significantly (roughly ₹21,000–₹69,000); allowances and in-hand depend on state, posting and deductions.",
    promotions: "Promotion follows state police service rules, seniority, departmental exams, vacancies and performance — constables can rise through Head Constable, Assistant Sub-Inspector and beyond.",
    posting: "Districts, commissionerates, police stations, armed reserve, traffic, special units and other state-police formations.",
    advantages: ["Stable uniformed government employment with defined service rules.","Structured allowances and retirement benefits.","Clear promotion ladder through departmental exams."],
    disadvantages: ["Shift duty, field hardship and physically demanding work.","Strict physical standards to clear before the written stage matters.","Posting and transfer liability across the state."],
    prep: ["Read the latest official state police constable notification first.","Build a topic checklist from the official syllabus.","Start running, push-ups and endurance training months in advance for PST/PET.","Solve previous-year papers and analyze mistakes.","Take full mocks regularly alongside physical training.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 10 (or as specified) marksheet/certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile/local-language certificate if required"]
  },
  "10-06": { // Forest Guard
    jobWork: ["Field-level protection and patrolling in forest ranges — anti-poaching duty, boundary checks, basic record-keeping and fire-watch responsibilities.","Follow forest department rules, safety procedures and supervisory instructions; extensive fieldwork in varied terrain is standard."],
    syllabus: ["General Knowledge — current affairs, polity, history, geography.","Environment/Forestry basics — wildlife, conservation, basic ecology as prescribed.","Arithmetic/Reasoning — number system, percentages, series, coding-decoding.","Language — grammar, vocabulary, comprehension in the notified language.","State-specific GK — local geography and forest-department context per the current notice."],
    examPattern: "Common areas: General Knowledge, environment/forestry basics, arithmetic, reasoning, language and state-specific GK; exact syllabus is state-specific.",
    selection: "Written exam/CBT → physical measurement/endurance or walking test where prescribed → document/medical verification → appointment.",
    physical: "Many Forest Guard recruitments have physical standards and endurance/walking tests; exact standards are state-specific — sustained fitness matters as much as speed.",
    salary: "State Forest Department pay level varies by state; allowances and in-hand depend on posting.",
    promotions: "Promotion follows state forest department service rules, seniority, departmental exams and vacancies — Forest Guards can progress to Forester and higher supervisory grades.",
    posting: "Forest ranges, divisions, wildlife areas, protected forests and field stations — often remote and rural.",
    advantages: ["Meaningful conservation-focused fieldwork.","Stable state government employment with defined service rules.","Clear promotion path within the forest department."],
    disadvantages: ["Remote postings with limited access to amenities.","Walking/endurance tests demand sustained physical conditioning.","Fieldwork can involve exposure to wildlife and challenging terrain."],
    prep: ["Read the latest official state Forest Guard notification first.","Build a topic checklist from the official syllabus, including basic forestry/environment topics.","Build endurance through regular long-distance walking/running practice.","Solve previous-year papers and analyze mistakes.","Take full mocks regularly alongside physical training.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 10/12 marksheet as applicable","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Domicile certificate if required"]
  },
  "10-07": { // BSF/CISF/CRPF Constable (Tradesman)
    jobWork: ["Trade-specific support duties (cook, washerman, barber, tailor and similar trades) supporting central paramilitary force units.","Follow force-specific rules, safety procedures and supervisory instructions; uniformed and shift-based duty is common."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Elementary Mathematics — number system, percentages, ratio/proportion, averages, time-work, time-distance.","Language — grammar, vocabulary, comprehension.","Trade-specific assessment for the tradesman category applied for."],
    examPattern: "Typically Reasoning, GK/GA, Elementary Mathematics and language, plus a trade-specific assessment for tradesman posts.",
    selection: "Written/CBT → PST/PET and/or trade test → medical → document verification → final selection.",
    physical: "Uniformed CAPF recruitment commonly includes height/weight/chest (where applicable), running/PET and medical standards; exact figures vary by force and category.",
    salary: "Constable-level CAPF tradesman posts are commonly Pay Level-3; specifics can differ by trade and organization.",
    promotions: "Promotion follows force-specific service rules, seniority, departmental exams and vacancies — tradesmen can progress through Head Constable and senior grades.",
    posting: "All-India postings including border, industrial, internal-security, training and field locations depending on the force.",
    advantages: ["Stable uniformed government employment with defined service rules.","Structured allowances and retirement benefits.","A relevant trade skill can be a genuine advantage in selection."],
    disadvantages: ["Uniformed duty involves shift work, transfers and field hardship.","Physical standards must be cleared alongside the written exam.","All-India posting liability, including remote/border locations."],
    prep: ["Read the latest official CAPF Tradesman notification first.","Build a topic checklist from the official syllabus.","Start physical training (running, endurance) months in advance.","Solve previous-year papers and analyze mistakes.","Take full mocks regularly alongside physical training.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 10/12 marksheet as applicable","Trade certificate if relevant to the post applied for","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "10-08": { // SSB Constable
    jobWork: ["General duty constable work guarding India's Nepal and Bhutan borders — patrolling, checkpoint duty and border-security tasks.","Follow SSB rules, safety procedures and supervisory instructions; field/border duty is standard."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Elementary Mathematics — number system, percentages, ratio/proportion, averages, time-work, time-distance.","Language — grammar, vocabulary, comprehension.","Use the exact syllabus annexure in the current SSC GD/SSB notice."],
    examPattern: "Typically Reasoning, GK/GA, Elementary Mathematics and language in a single CBE, following the common SSC GD-style pattern.",
    selection: "Written/CBT → PST/PET and/or trade test → medical → document verification → final selection.",
    physical: "Uniformed CAPF recruitment commonly includes height/weight/chest (where applicable), running/PET and medical standards; exact figures vary by category.",
    salary: "Constable-level CAPF posts are commonly Pay Level-3; allowances depend on posting.",
    promotions: "Promotion follows force-specific service rules, seniority, departmental exams and vacancies — constables can rise through Head Constable and senior ranks.",
    posting: "All-India postings including border, industrial, internal-security, training and field locations.",
    advantages: ["Stable uniformed government employment with defined service rules.","Structured allowances and retirement benefits.","Clear promotion ladder through departmental exams."],
    disadvantages: ["Border postings can mean remote, challenging living conditions.","Physical standards must be cleared alongside the written exam.","Frequent transfers across border regions."],
    prep: ["Read the latest official SSB Constable notification first.","Build a topic checklist from the official syllabus.","Start physical training (running, endurance) months in advance.","Solve previous-year GD/SSB-style papers and analyze mistakes.","Take full mocks regularly alongside physical training.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 10/12 marksheet as applicable","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile certificate if required"]
  },
  "10-09": { // Indian Army Agniveer (GD)
    jobWork: ["General duty soldiering — combat readiness, field operations, guard duty and unit support tasks under the Agnipath scheme.","Follow Army rules, safety procedures and command instructions; involves field/uniformed duty and possible operational deployment."],
    syllabus: ["General Knowledge — current affairs, polity, history, geography, science.","General Science — basic physics, chemistry, biology.","Mathematics — number system, percentages, ratio/proportion, algebra, geometry.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Use the exact syllabus annexure in the current Army CEE notice."],
    examPattern: "CEE (Common Entrance Examination) for GD commonly tests General Knowledge, General Science, Maths and Reasoning; exact pattern follows the current Army notice.",
    selection: "Online registration → Common Entrance Examination → recruitment rally/physical fitness and measurement → medical → final merit, subject to the current Army notice.",
    physical: "Physical fitness tests and body measurements are central to selection; standards vary by category, region and current recruitment rules.",
    salary: "Agniveer has a distinct four-year engagement pay/Seva Nidhi structure rather than a traditional permanent-service pay progression; starts around ₹30,000/month package including allowances.",
    promotions: "Within the four-year Agniveer tenure, growth is limited to internal grading; top performers can be considered for permanent enrolment as per current Army policy.",
    posting: "Military units/training establishments as assigned; service is under the Agnipath/Agniveer framework.",
    advantages: ["Prestigious, disciplined service with strong training and allowances.","Meaningful national service with a defined four-year structure.","Possible pathway to permanent enrolment for top performers."],
    disadvantages: ["Four-year tenure structure differs from traditional permanent service.","Physically demanding training and possible field/operational postings.","Selection is highly competitive with a rigorous physical rally stage."],
    prep: ["Read the latest official Indian Army Agniveer GD notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in GK, General Science, Maths and Reasoning.","Solve previous-year CEE papers and analyze mistakes.","Start physical training (running, endurance) months in advance for the rally.","Take full mocks regularly and maintain an error notebook."],
    documents: ["Class 10 marksheet/certificate with minimum aggregate marks as specified","Photo and signature in prescribed format","Government ID","Category/EWS certificate if applicable","Domicile/local-language certificate if required"]
  },
  "10-10": { // Navy SSR/MR
    jobWork: ["Sailor duties aboard naval ships and establishments — Senior Secondary Recruit (technical) roles support machinery/systems; Matric Recruit (non-technical) roles cover cook/steward and similar support functions.","Follow Navy rules, safety procedures and command instructions; involves shipboard/uniformed duty."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, algebra, geometry.","Language — grammar, vocabulary, comprehension.","MR/SSR-specific content per the current Indian Navy notice."],
    examPattern: "MR and SSR/technical entries have different subject mixes; the current Indian Navy notice controls the exact pattern, duration and marks.",
    selection: "Online application → computer-based exam → physical fitness test → medical → merit/induction as prescribed.",
    physical: "PFT and medical standards apply; height, run, squats/push-ups/sit-ups or other events depend on the entry and current notice.",
    salary: "Agniveer Navy entries follow the applicable Agniveer pay/Seva Nidhi framework.",
    promotions: "Within the Agniveer tenure, growth is limited to internal grading; top performers can be considered for permanent enrolment as per current Navy policy.",
    posting: "Indian Navy ships, establishments, bases and training centers as allotted.",
    advantages: ["Structured naval training with strong discipline and allowances.","Exposure to shipboard systems (SSR) or valuable support-role experience (MR).","Possible pathway to permanent enrolment for top performers."],
    disadvantages: ["Shipboard duty involves long deployments away from home.","Physically demanding training and PFT standards.","Four-year Agniveer tenure structure differs from permanent service."],
    prep: ["Read the latest official Indian Navy SSR/MR notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in Maths, Reasoning and GA before timed practice.","Solve previous-year papers and analyze mistakes.","Start physical training (running, strength) months in advance for the PFT.","Take full mocks regularly and maintain an error notebook."],
    documents: ["Class 10/12 marksheet with required subjects as applicable","Photo and signature in prescribed format","Government ID","Category/EWS certificate if applicable","Domicile certificate if required"]
  },
  "10-11": { // Air Force Agniveer
    jobWork: ["Technical and non-technical trade duties supporting Air Force stations under the Agnipath scheme — maintenance, ground support, administration or specialist roles depending on the trade.","Follow Air Force rules, safety procedures and command instructions; involves uniformed/technical station duty."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Mathematics — number system, percentages, ratio/proportion, algebra, geometry.","English/Language — grammar, vocabulary, comprehension.","Science/non-science papers as prescribed by the current Agniveervayu notice."],
    examPattern: "Science and non-science papers differ; the current Agniveervayu notice controls exact subjects, duration and marks.",
    selection: "Online test → physical fitness test → adaptability/medical stages as prescribed → final enrolment list.",
    physical: "Physical fitness and medical standards apply; exact run times and other events are notification-specific.",
    salary: "Agniveervayu uses the applicable Agnipath pay/Seva Nidhi framework, starting around ₹30,000/month package including allowances.",
    promotions: "Within the Agniveer tenure, growth is limited to internal grading; top performers can be considered for permanent enrolment as per current Air Force policy.",
    posting: "Air Force stations/training establishments as assigned.",
    advantages: ["Access to both technical and non-technical trades within one force.","Structured training and discipline with strong allowances.","Possible pathway to permanent enrolment for top performers."],
    disadvantages: ["Four-year Agniveer tenure structure differs from permanent service.","Selection is competitive with a rigorous physical/adaptability stage.","Postings depend on service need, not personal preference."],
    prep: ["Read the latest official Agniveervayu notification first.","Build a topic checklist from the official syllabus (science or non-science, as applicable).","Build fundamentals in Maths, Reasoning and GA before timed practice.","Solve previous-year online test papers and analyze mistakes.","Start physical training months in advance for the fitness test.","Take full mocks regularly and maintain an error notebook."],
    documents: ["Class 10/12 marksheet with Maths/Science/English as applicable","Photo and signature in prescribed format","Government ID","Category/EWS certificate if applicable","Domicile certificate if required"]
  },
  "10-12": { // ITBP/SSB Constable
    jobWork: ["General duty and specialist constable work guarding India's high-altitude and border regions under ITBP, or the Nepal/Bhutan borders under SSB.","Follow force-specific rules, safety procedures and supervisory instructions; field/mountain duty is common for ITBP."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Elementary Mathematics — number system, percentages, ratio/proportion, averages, time-work, time-distance.","Language — grammar, vocabulary, comprehension.","Use the exact syllabus annexure in the current SSC GD-style notice."],
    examPattern: "Typically Reasoning, GK/GA, Elementary Mathematics and language, plus a trade-specific assessment for specialist tradesman posts.",
    selection: "Written/CBT → PST/PET and/or trade test → medical → document verification → final selection.",
    physical: "Uniformed CAPF recruitment commonly includes height/weight/chest (where applicable), running/PET and medical standards; exact figures vary by force and category.",
    salary: "Constable-level CAPF posts are commonly Pay Level-3; trades and organizations can differ.",
    promotions: "Promotion follows force-specific service rules, seniority, departmental exams and vacancies — constables can rise through Head Constable and senior ranks.",
    posting: "All-India postings including border, high-altitude, industrial, internal-security, training and field locations depending on force.",
    advantages: ["Stable uniformed government employment with defined service rules.","Structured allowances and retirement benefits, including high-altitude allowances for ITBP.","Clear promotion ladder through departmental exams."],
    disadvantages: ["ITBP postings can include extreme high-altitude/cold conditions.","Physical standards must be cleared alongside the written exam.","All-India posting liability, including remote/border locations."],
    prep: ["Read the latest official ITBP/SSB Constable notification first.","Build a topic checklist from the official syllabus.","Start physical training (running, endurance) months in advance.","Solve previous-year papers and analyze mistakes.","Take full mocks regularly alongside physical training.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 10/12 marksheet as applicable","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile certificate if required"]
  },
  "10-13": { // Apprentice in PSUs
    jobWork: ["Structured on-the-job training in trades like fitter, electrician and welder inside large public-sector plants (BHEL, NTPC, ONGC, BEL, HAL and similar).","Follow the PSU's safety procedures and supervisory instructions during the training period."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, time-work, time-distance.","Language — grammar, vocabulary, comprehension.","Trade-specific topics where a written test is used — check the exact PSU/trade notification."],
    examPattern: "Often no common written exam; the organization/trade notice decides whether a test, interview or pure marks-based merit is used.",
    selection: "Online application → merit/marks-based shortlisting or test/interview if prescribed → document verification → medical → apprenticeship contract.",
    physical: "Usually no PET; medical fitness may be required depending on the trade and PSU.",
    salary: "Apprentices receive a stipend rather than a regular employee salary; amount depends on apprenticeship rules and the specific organization (typically ₹7,000–₹12,000/month).",
    promotions: "This is a fixed-term training engagement, not a regular promotion-track post; strong performers sometimes get preference in later regular recruitment by the same PSU, but this isn't guaranteed.",
    posting: "Plant, refinery, workshop, project or office of the PSU/establishment offering the apprenticeship.",
    advantages: ["Hands-on trade training inside major, well-resourced public-sector plants.","A stepping stone that builds practical skills and a strong resume for future technical roles.","Simpler selection process than many other government exams (often marks-based)."],
    disadvantages: ["Stipend is lower than a regular employee's salary.","Apprenticeship is a fixed-term engagement with no automatic guarantee of a permanent job afterward.","Trade/eligibility criteria must match exactly what the PSU has notified."],
    prep: ["Read the latest official apprenticeship notification for the exact PSU and trade first.","Confirm your ITI trade certificate matches the eligibility exactly.","If a written test is used, build fundamentals from the official syllabus.","Solve previous-year papers where available and analyze mistakes.","Keep all documents (marksheets, ITI certificate, ID) ready well in advance.","Track the PSU's official apprenticeship portal for application windows."],
    documents: ["Class 10 marksheet plus ITI certificate in the relevant trade","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable"]
  },
  "10-14": { // State Govt Peon/Group D
    jobWork: ["Peon, attendant and general support duties in state government offices — file movement, basic errands and office assistance.","Follow departmental rules and supervisory instructions."],
    syllabus: ["General Knowledge/Current Affairs — national and state-level events, polity, history, geography.","Reasoning — analogy, classification, series, coding-decoding, directions.","Basic Maths — number system, percentages, ratio/proportion, averages, time-work, time-distance.","Language — grammar, vocabulary, comprehension in the notified language.","Exact syllabus is state-specific — use the current state notification."],
    examPattern: "Usually basic Maths, Reasoning, General Knowledge/Current Affairs and language; state-specific in exact question count and marks.",
    selection: "State recruitment board/department process, commonly written exam → document verification → medical/appointment.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "State Level-1/Group-D pay varies by state and department (roughly ₹15,000–₹40,000).",
    promotions: "Promotion follows state service rules, seniority, departmental exams and vacancies — Group D staff can progress to clerical/Group C grades over time.",
    posting: "State government offices, local bodies, departments and field establishments.",
    advantages: ["Accessible entry-level state government job with a straightforward syllabus.","Local/home-state postings are common.","Stable employment with defined service rules."],
    disadvantages: ["Recruitment cycles and vacancies vary widely by state.","Entry-level pay and slower promotion pace compared to higher grades.","Competition can still be intense given the low qualification bar."],
    prep: ["Read the latest official state Group D/Peon notification first.","Build a topic checklist from the official state syllabus.","Build fundamentals in basic Maths, Reasoning and language.","Solve previous-year state papers where available and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 10 (some states accept Class 8) marksheet/certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Domicile/local-language certificate if required"]
  },
  "10-15": { // Others (State/Central Group D Posts)
    jobWork: ["Cadre/posting-determined support, operational or basic technical duties depending on the exact Group D post advertised.","Follow departmental rules, safety procedures and supervisory instructions as applicable to the specific post."],
    syllabus: ["General Knowledge/Current Affairs — national and state-level events, polity, history, geography.","Reasoning — analogy, classification, series, coding-decoding, directions.","Basic Maths — number system, percentages, ratio/proportion, averages, time-work, time-distance.","Language — grammar, vocabulary, comprehension in the notified language.","Use the exact syllabus annexure in the specific recruitment notice — this is a catch-all category, so the syllabus varies widely."],
    examPattern: "Usually basic Maths, Reasoning, General Knowledge/Current Affairs and language; exact pattern is state/department-specific.",
    selection: "State recruitment board/department process, commonly written exam → document verification → medical/appointment.",
    physical: "Not applicable unless the specific recruitment notice mentions PET/PST/medical standards.",
    salary: "State Level-1/Group-D pay varies by state and department — always confirm exact figures from the applicable notification.",
    promotions: "Promotion follows the recruiting department's service rules, seniority, departmental exams, vacancies and performance.",
    posting: "Depends on the recruiting organisation, cadre, zone/circle and vacancy; transfers may apply.",
    advantages: ["Wide net of additional Class-10-level Group D posts beyond the major named exams.","Government/statutory employment structure and defined service rules where applicable.","Structured allowances and retirement benefits."],
    disadvantages: ["Because this spans many different posts, eligibility and pay vary widely — always verify the specific notice.","Competitive recruitment with uncertain notification cycles.","Promotion speed and posting quality depend heavily on the specific department."],
    prep: ["Identify the exact post and download its official notification first.","Build a topic checklist from that post's official syllabus.","Build fundamentals in basic Maths, Reasoning and language.","Solve previous-year papers for that specific post/department where available.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 10 marksheet/certificate (minimum, varies by post)","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile/local-language certificate if required"]
  }
};
jobs.forEach(j=>{
  if (fullGuides10[j.code]) j.fullGuide = fullGuides10[j.code];
});

/* ============================================================
   FULL GUIDE — After 12th tier (12-01 .. 12-15)
   Deep-dive reference content: job work, full syllabus, exam
   pattern notes, physical standards, promotions, posting,
   pros/cons, prep strategy, daily timetable and document list.
   Keyed by job code. Attached to the matching job below and
   rendered as an extra "Full Guide" tab in the job sheet.
   ============================================================ */
const fullGuides12 = {
  "12-01": { // SSC CHSL (LDC, DEO, PA, SA)
    jobWork: ["Day-to-day office administration, data entry, record keeping and public-facing counter work depending on the exact post (LDC/JSA, DEO, Postal Assistant, Sorting Assistant).","Follows departmental rules, safety procedures and supervisory instructions.","DEO posts are more computer/data-entry focused; LDC/PA/SA posts mix clerical and counter duties."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism, relationships, data interpretation.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, time-work, time-distance, algebra, geometry, data interpretation.","English/Language — grammar, vocabulary, comprehension, sentence correction.","Use the exact syllabus annexure in the current SSC CHSL notice — don't assume it matches another SSC exam."],
    examPattern: "Tier-I: Computer Based Exam covering English, General Intelligence, Quantitative Aptitude and General Awareness. Tier-II adds Mathematical Abilities, Reasoning, English, GA, Computer Knowledge and skill/typing components as prescribed. Check the official notice for exact question count, marks, duration and negative marking.",
    selection: "SSC Tier-I CBE → Tier-II CBE/skill or typing test as applicable → document verification → appointment.",
    physical: "Not applicable unless the specific notice mentions PET/PST/medical standards for a particular posting.",
    salary: "LDC/JSA, DEO and PA/SA sit at different pay levels within Pay Level 2–4; final in-hand depends on posting, DA, HRA, TA and NPS deductions.",
    promotions: "Promotion follows service rules, seniority, departmental exams, vacancies and cadre structure — typical growth moves from entry clerk/DEO roles to higher grade or supervisory posts.",
    posting: "Central Government ministries/departments/offices across India; can be urban, rural or headquarters-based with transfer liability varying by recruitment.",
    advantages: ["Stable government/statutory employment structure.","Defined allowances, leave and retirement benefits.","Structured career progression."],
    disadvantages: ["Competitive recruitment with uncertain notification cycles.","Possible transfers or workload variation by posting.","Promotion speed depends on cadre and vacancies."],
    prep: ["Read the latest official CHSL notification first.","Build a topic checklist from the official syllabus.","Strengthen fundamentals before timed practice.","Solve previous-year Tier-I/Tier-II papers and analyze mistakes.","Take regular full mocks and keep an error notebook.","If applying for DEO/typing posts, practice typing speed and accuracy in parallel.","Reserve weekly time for current affairs and revision."],
    documents: ["Educational certificates/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Domicile/local-language certificate if required"]
  },
  "12-02": { // SSC CGL (Group B & C)
    jobWork: ["Cadre/posting-determined work spanning administration, inspection, auditing or assistant-level duties across many central departments.","Follow departmental rules and supervisory instructions; some CGL posts (e.g. Inspector) involve field or verification duties."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism, data interpretation.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, time-work, time-distance, algebra, geometry, data interpretation.","English/Language — grammar, vocabulary, comprehension, sentence correction.","Use the exact syllabus annexure in the current CGL notice for post-specific components."],
    examPattern: "Tier-I covers Reasoning, General Awareness, Quantitative Aptitude and English. Tier-II has a compulsory Paper-I plus additional/qualifying papers for specified posts. Check the current notice for question count, marks, duration and negative marking.",
    selection: "SSC Tier-I → Tier-II → document verification/skill/physical standards for applicable posts → final allocation.",
    physical: "Not applicable for most CGL posts unless the specific post (e.g. Sub-Inspector categories) specifies PET/PST/medical standards.",
    salary: "CGL posts span Pay Level 4 through Level 7 and above depending on the exact post; in-hand varies with DA, HRA, TA and NPS.",
    promotions: "Promotion follows service rules, seniority, departmental exams, vacancies and cadre structure — CGL is often a strong entry point into higher Group B roles over a career.",
    posting: "Central ministries/departments across India; some posts carry all-India transfer liability.",
    advantages: ["Access to a wide range of central government departments from one exam.","Reasonable starting pay levels with allowances.","Clear tiered promotion structure in most cadres."],
    disadvantages: ["Highly competitive with large applicant pools.","Post allocation depends on rank, category and preference — not guaranteed.","Some posts carry transfer liability or field duty."],
    prep: ["Download and study the latest official CGL notification first.","Build a topic checklist from the official syllabus.","Build fundamentals before attempting timed papers.","Solve previous-year Tier-I and Tier-II papers, analyzing every mistake.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Educational certificates/marksheets (degree mandatory)","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Experience/NOC documents where required"]
  },
  "12-03": { // SSC Stenographer
    jobWork: ["Shorthand dictation, transcription and secretarial support for officers in central ministries and departments.","Follow departmental rules and confidentiality requirements for official correspondence."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","English Language/Comprehension — grammar, vocabulary, comprehension.","Shorthand and transcription practice in the chosen language, at the speed prescribed for Grade C/D."],
    examPattern: "General Intelligence & Reasoning, General Awareness and English Language/Comprehension in a computer-based exam; the stenography skill test (dictation + transcription) is qualifying.",
    selection: "SSC computer-based exam → stenography skill test → document verification → appointment.",
    physical: "Not applicable unless the specific notice mentions medical standards.",
    salary: "Grade C and Grade D carry different pay levels (roughly Pay Level 4–6); exact in-hand depends on department, city and allowances.",
    promotions: "Promotion follows service rules, seniority, departmental exams and vacancies; senior stenographers can move into higher secretarial/supervisory grades.",
    posting: "Central Government ministries, departments and attached offices, largely desk-based.",
    advantages: ["Specialised, in-demand skill (shorthand) with steady government demand.","Desk-based role with defined working hours in most postings.","Structured pay levels by grade."],
    disadvantages: ["Requires sustained shorthand speed practice, which takes time to build.","Skill test is a hard qualifying hurdle even after clearing the written exam.","Vacancies can be limited compared to larger SSC exams."],
    prep: ["Read the latest official Stenographer notification first.","Build a topic checklist from the official syllabus.","Practice shorthand dictation and transcription daily, building speed gradually.","Solve previous-year papers and analyze every mistake.","Take full mocks regularly, including timed dictation practice.","Reserve weekly time for current affairs and revision."],
    documents: ["Educational certificates/marksheets","Shorthand/typing certificate if held","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable"]
  },
  "12-04": { // Railway NTPC (UG)
    jobWork: ["Commercial-cum-Ticket Clerk, Accounts Clerk and similar non-technical roles supporting railway station and office operations.","Follow railway operating and safety procedures; some posts involve shift duty and public interaction."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism, data interpretation.","Mathematics — number system, percentages, ratio/proportion, averages, profit/loss, interest, time-work, time-distance, algebra, geometry.","Post-specific topics per the exact RRB CEN notification."],
    examPattern: "Mathematics, General Intelligence & Reasoning and General Awareness form the core CBT-1 areas; a further CBT-2/typing/aptitude stage applies for specific posts. Exact pattern varies by CEN.",
    selection: "RRB CBT stages → typing/aptitude test for applicable posts → document verification → medical.",
    physical: "Not applicable unless the specific notice mentions PET/medical standards for a particular post.",
    salary: "Pay Level 2–3 depending on the exact NTPC post; railway allowances (DA, HRA, TA) affect final in-hand.",
    promotions: "Promotion follows railway service rules, seniority, departmental exams and vacancies — clerical NTPC roles can progress into supervisory railway posts over time.",
    posting: "Railway zones/divisions, stations and offices; posting can be urban, rural or headquarters-based with transfer liability.",
    advantages: ["Large-scale, recurring recruitment across railway zones.","Structured pay levels with railway-specific allowances and travel benefits.","Clear promotion path within railway cadre."],
    disadvantages: ["Very high applicant volume, making cutoffs competitive.","Shift duty or public-facing pressure in some posts.","Posting location may not match home preference initially."],
    prep: ["Read the latest official RRB NTPC CEN notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in Maths, Reasoning and GA before timed practice.","Solve previous-year CBT papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 12 marksheet/certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile certificate if required by the zone"]
  },
  "12-05": { // Railway Group C (Various Posts)
    jobWork: ["Undergraduate-eligible technical and supervisory duties across railway zones — exact responsibilities depend on the specific post notified.","Follow railway safety and operating procedures; some posts are field/technical in nature."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Mathematics — number system, percentages, ratio/proportion, averages, profit/loss, interest, time-work, time-distance, algebra, geometry.","Post-specific/technical topics per the exact RRB notification; do not assume a similarly named post shares the same syllabus."],
    examPattern: "The exact pattern, marks, duration and negative marking are recruitment-specific — use the current official RRB notification for the final pattern.",
    selection: "Application → written/CBT or merit screening → applicable skill/physical/technical stage → document verification → medical/appointment as prescribed.",
    physical: "Not applicable unless the specific notice mentions PET/PST/medical standards for a particular post.",
    salary: "Pay Level 2–5 depending on the exact post; railway allowances (DA, HRA, TA) affect final in-hand.",
    promotions: "Promotion follows railway service rules, seniority, departmental exams, vacancies and cadre structure.",
    posting: "Depends on the recruiting zone/division and vacancy; transfers may apply.",
    advantages: ["Wide variety of posts within one recruiting body.","Structured railway pay scale and allowances.","Recurring large-scale recruitment."],
    disadvantages: ["Eligibility and syllabus vary by exact post — easy to misjudge fit without reading the notice carefully.","High competition on popular posts.","Posting/transfer liability depending on zone."],
    prep: ["Read the latest official RRB Group C notification for the exact post first.","Build a topic checklist from the official syllabus.","Build fundamentals before attempting timed papers.","Solve previous-year papers for the specific post and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 12 (or higher, if required) marksheet/certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Trade/technical certificate where applicable"]
  },
  "12-06": { // India Post Postal Assistant / Sorting Assistant
    jobWork: ["Counter services, mail sorting, record-keeping and administrative support at post offices and sorting divisions.","Follow Department of Posts rules and public-service procedures."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, time-work, time-distance.","English/Language — grammar, vocabulary, comprehension.","If recruited through SSC/another exam, follow that exam's exact syllabus rather than a generic postal pattern."],
    examPattern: "If recruited through SSC or another route, the syllabus and pattern follow that exam's notice — don't assume one generic pattern applies to all postal recruitment.",
    selection: "Recruitment-route-specific written/CBT → typing/skill test where applicable → document verification → appointment.",
    physical: "Not applicable unless the specific notice mentions PET/PST/medical standards.",
    salary: "Regular departmental posts use the applicable pay matrix (roughly Pay Level 4); exact figure depends on post and recruitment route.",
    promotions: "Promotion follows Department of Posts service rules, seniority, departmental exams and vacancies — PA/SA roles can progress to supervisory postal cadre posts.",
    posting: "Post offices, mail offices, sorting offices and postal administrative units, often within the applicant's home circle.",
    advantages: ["Stable public-service employment with defined service rules.","Local/home-circle postings are common.","Structured allowances and retirement benefits."],
    disadvantages: ["Recruitment windows and vacancies vary by circle and year.","Counter/public-facing work can be demanding during peak periods.","Career growth pace depends on circle-level vacancies."],
    prep: ["Read the latest official Postal Assistant/Sorting Assistant notification first.","Build a topic checklist from the official syllabus.","Build fundamentals before timed practice.","Solve previous-year papers relevant to the exact recruitment route.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 12 marksheet/certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Domicile/local-language certificate if required by the circle"]
  },
  "12-07": { // Bank PO
    jobWork: ["Probationary Officer training followed by branch management, credit appraisal, customer service and administrative responsibilities.","Follow bank policies, RBI guidelines and internal compliance procedures."],
    syllabus: ["General Awareness/Banking & Economy Awareness — current affairs, banking terms, economy, government schemes.","Reasoning — analogy, classification, series, coding-decoding, puzzles, syllogism, data interpretation.","Quantitative Aptitude/Data Analysis — number system, percentages, ratio/proportion, averages, profit/loss, interest, data interpretation.","English Language — grammar, vocabulary, comprehension, and a descriptive writing component in Mains.","Post-specific components (computer knowledge, descriptive test) vary by IBPS/SBI/RRB notification."],
    examPattern: "Preliminary exam (Reasoning, Quantitative Aptitude, English) followed by a Main exam (adds General/Economy/Banking Awareness, Computer Knowledge and often a descriptive component), then an interview/personality stage where applicable.",
    selection: "Preliminary exam → Main exam → interview/personality stage where applicable → final allotment.",
    physical: "Not applicable — this is a desk/office-based officer role.",
    salary: "Bank officer pay varies by bank and scale (roughly ₹48,000–₹55,000 gross per month for POs), plus DA/HRA and other allowances.",
    promotions: "Promotion follows bank service rules, seniority, internal exams, performance and vacancies — POs typically move up through Scale I to higher management scales over a career.",
    posting: "Branches and administrative offices, often within a state/zone with periodic transfers.",
    advantages: ["Strong starting pay and structured officer-scale progression.","Clear, well-documented exam pattern (Prelims/Mains/Interview).","Wide network of public-sector and regional rural banks to apply to."],
    disadvantages: ["Requires a bachelor's degree — not actually a 12th-only entry despite common perception.","High competition with a large applicant pool nationwide.","Transfers and target-driven work in some branches."],
    prep: ["Read the latest official IBPS/SBI/RRB PO notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in Quant, Reasoning and English before timed practice.","Solve previous-year Prelims/Mains papers and analyze mistakes.","Take full mocks regularly, including a timed descriptive-writing practice for Mains.","Reserve weekly time for current affairs and banking/economy awareness."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "12-08": { // Bank Clerk
    jobWork: ["Day-to-day banking transactions, customer service, cash handling and account-related administrative work at branch level.","Follow bank policies, RBI guidelines and internal compliance procedures."],
    syllabus: ["English Language — grammar, vocabulary, comprehension.","Reasoning — analogy, classification, series, coding-decoding, puzzles, syllogism.","Numerical Ability/Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, data interpretation.","General/Banking Awareness — current affairs, banking terms, government schemes.","Exact pattern varies by IBPS/SBI/RRB notification."],
    examPattern: "Prelims exam (English, Reasoning, Numerical Ability) followed by a Main exam (adds General/Banking Awareness, Computer Knowledge); pattern and weightage vary by bank/notification.",
    selection: "Prelims → Main exam → language/eligibility requirements → final allotment.",
    physical: "Not applicable — this is a desk/counter-based clerical role.",
    salary: "Clerical pay varies by bank and settlement (roughly ₹29,000–₹32,000 gross per month), plus DA/HRA and other allowances.",
    promotions: "Promotion follows bank service rules, seniority, internal/promotion exams and vacancies — clerks can move into officer cadre through internal promotion exams.",
    posting: "Bank branches and offices, often within a state/zone/circle.",
    advantages: ["Steady public-sector-style employment with defined service rules.","Clear path to officer cadre through internal promotion exams.","Structured pay scale with periodic revisions."],
    disadvantages: ["Requires a bachelor's degree for most public-sector bank clerk posts.","High competition with a large applicant pool.","Target-driven or high-footfall branches can be demanding."],
    prep: ["Read the latest official IBPS/SBI/RRB Clerk notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in English, Reasoning and Numerical Ability before timed practice.","Solve previous-year Prelims/Mains papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and banking awareness."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "12-09": { // State Police Constable
    jobWork: ["Patrolling, law-and-order duties, traffic management and general policing work under the relevant state police act.","Follow departmental rules, safety procedures and supervisory instructions; involves shift duty and physically demanding work."],
    syllabus: ["General Knowledge/Current Affairs — national and state-level events, polity, history, geography.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Arithmetic/Maths — number system, percentages, ratio/proportion, averages, time-work, time-distance.","Language — grammar, vocabulary, comprehension in the notified language.","Exact syllabus is state-specific — use the current state notification."],
    examPattern: "Usually General Knowledge/Current Affairs, Reasoning, Arithmetic/Maths, language and state-specific topics in a written/CBT exam; exact question count and marks are state-specific.",
    selection: "State written/CBT → PST/PET → document verification → medical/character verification → appointment, with variations by state.",
    physical: "PST/PET usually includes height, chest (where applicable), running and other events; exact standards vary by state.",
    salary: "State pay scale varies significantly (roughly ₹21,000–₹69,000); allowances and in-hand depend on state, posting and deductions.",
    promotions: "Promotion follows state police service rules, seniority, departmental exams, vacancies and performance — constables can rise through Head Constable, Assistant Sub-Inspector and beyond.",
    posting: "Districts, commissionerates, police stations, armed reserve, traffic and special units.",
    advantages: ["Stable uniformed government employment with defined service rules.","Structured allowances and retirement benefits.","Clear promotion ladder through departmental exams."],
    disadvantages: ["Shift duty, field hardship and physically demanding work.","Strict physical standards to clear before the written stage matters.","Posting and transfer liability across the state."],
    prep: ["Read the latest official state police constable notification first.","Build a topic checklist from the official syllabus.","Start running, push-ups and endurance training months in advance for PST/PET.","Solve previous-year papers and analyze mistakes.","Take full mocks regularly alongside physical training.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 12 (or as specified) marksheet/certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile/local-language certificate if required"]
  },
  "12-10": { // CAPF Assistant Commandant
    jobWork: ["Officer-level command, administrative and operational responsibilities within BSF, CRPF, CISF, ITBP or SSB.","Follow force-specific rules, operational protocols and command responsibilities; involves field/uniformed duty."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, algebra, geometry.","General Studies, Essay and Comprehension for Paper-II.","Use the exact UPSC CAPF syllabus annexure in the current notice."],
    examPattern: "Paper I: General Ability & Intelligence. Paper II: General Studies, Essay & Comprehension. Current UPSC notice controls exact marks and duration.",
    selection: "UPSC written exam → Physical Standards Test/Physical Efficiency Test → medical examination → interview/personality test → final merit.",
    physical: "Strict CAPF medical and physical standards including height, chest/expansion (where applicable), endurance and vision; exact figures are notification-specific.",
    salary: "Officer-level pay at Pay Level 10 (roughly ₹56,100–₹1,77,500) plus allowances, as a Central Armed Police Forces post.",
    promotions: "Promotion follows force-specific service rules, seniority, departmental exams, vacancies and performance — Assistant Commandants can rise through Deputy Commandant, Commandant and beyond.",
    posting: "All-India CAPF formations and operational/training locations.",
    advantages: ["Group A gazetted officer entry with strong pay and status.","Structured career progression within the force.","Leadership responsibility from an early stage."],
    disadvantages: ["Strict physical and medical standards to clear.","Frequent transfers and challenging field postings, including border/conflict areas.","Highly competitive selection with multiple stages."],
    prep: ["Read the latest official UPSC CAPF notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in GS and reasoning before timed practice.","Solve previous-year Paper I/II papers and analyze mistakes.","Build physical fitness early and consistently for the PST/PET.","Take full mocks regularly and maintain an error notebook."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Medical fitness documents where required"]
  },
  "12-11": { // UPSC CDS / AFCAT
    jobWork: ["Officer training followed by command, technical or administrative responsibilities in the Army, Navy or Air Force depending on entry.","Follow service-specific rules, operational protocols and command responsibilities."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude/Elementary Mathematics — number system, percentages, ratio/proportion, algebra, geometry.","English — grammar, vocabulary, comprehension.","Service-specific General Studies, professional knowledge or technical topics for AFCAT technical entries as prescribed."],
    examPattern: "CDS and AFCAT have different papers/sections; English, GK, Maths or aptitude/technical content depends on the exact entry chosen.",
    selection: "CDS: written exam → SSB interview → medical → merit. AFCAT: written exam → AFSB → medical → merit.",
    physical: "Defence medical and physical standards are mandatory; eyesight and anthropometric standards can be strict and entry-specific.",
    salary: "Officer-entry pay follows the defence service pay matrix and allowances; exact in-hand depends on rank, posting and allowances.",
    promotions: "Promotion follows defence service rules, seniority, performance and vacancies — officers progress through rank over a structured career.",
    posting: "Training academies followed by Army/Navy/Air Force postings across India.",
    advantages: ["Prestigious officer-entry route with strong career structure.","Comprehensive training, leadership development and allowances.","Clear rank-based promotion path."],
    disadvantages: ["Strict physical, medical and psychological screening (SSB/AFSB).","Frequent transfers and demanding postings, including field areas.","Long, multi-stage selection process."],
    prep: ["Read the latest official UPSC CDS/AFCAT notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in GK, Maths and English before timed practice.","Solve previous-year papers and analyze mistakes.","Prepare for the SSB/AFSB stage (group tasks, interview, psychology tests) well in advance.","Build physical fitness consistently alongside academic prep."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS certificate if applicable","Medical fitness documents where required"]
  },
  "12-12": { // Income Tax Inspector
    jobWork: ["Assessment support, verification, survey and enforcement-related duties within the Income Tax Department.","Follow departmental rules and procedures; some duties involve field verification."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, algebra, geometry.","English/Language — grammar, vocabulary, comprehension.","Follows the SSC CGL examination syllabus and structure."],
    examPattern: "Follows the SSC CGL examination structure (Tier-I and Tier-II); check the official notice for exact question count, marks, duration and negative marking.",
    selection: "SSC CGL Tier-I → Tier-II → post preference/allocation → document verification; applicable physical standards for specified inspector posts must be checked.",
    physical: "Generally not a combat/PET post; however, check the exact CGL post standards/conditions in the current notice.",
    salary: "Typically Pay Level-7 in the 7th CPC framework, plus DA/HRA/TA and applicable allowances.",
    promotions: "Promotion follows Income Tax Department service rules, seniority, departmental exams, vacancies and performance — Inspectors can rise through higher department grades over a career.",
    posting: "Income Tax offices across India; field and office duties vary by charge.",
    advantages: ["Respected central government post with strong pay level for a CGL entry.","Mix of office and field responsibility.","Clear promotion path within the department."],
    disadvantages: ["Requires clearing the competitive SSC CGL exam.","Field verification duties can involve travel and sensitive work.","Posting location depends on allocation, not always home preference."],
    prep: ["Read the latest official SSC CGL notification first.","Build a topic checklist from the official syllabus.","Build fundamentals before attempting timed papers.","Solve previous-year CGL Tier-I/Tier-II papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable"]
  },
  "12-13": { // EPFO EO/AO
    jobWork: ["Enforcement, inspection, accounts and administrative duties managing the Employees' Provident Fund scheme for organised-sector workers.","Follow EPFO rules and procedures; Enforcement Officer duties can involve field visits to establishments."],
    syllabus: ["General English — grammar, vocabulary, comprehension.","Indian Freedom Struggle, Economy, Polity and General Science.","Accountancy/Auditing/Insurance and Industrial Relations/Labour Laws.","Social Security and Computer Applications.","Current UPSC notice controls the exact syllabus if the UPSC EO/AO route is used."],
    examPattern: "If the UPSC EO/AO route is used, the syllabus generally includes General English, Indian Freedom Struggle, Economy, Polity, General Science, Accountancy/Auditing/Insurance, Industrial Relations/Labour Laws, Social Security and Computer Applications; current notice controls exact weightage.",
    selection: "Recruitment-specific written exam → interview where prescribed → document verification/appointment.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Central Government pay level (roughly Pay Level 7) varies by post; allowances and in-hand depend on posting.",
    promotions: "Promotion follows EPFO service rules, seniority, departmental exams, vacancies and performance — EOs/AOs can move into senior enforcement or accounts leadership roles.",
    posting: "EPFO regional/sub-regional offices across India.",
    advantages: ["Meaningful public-service role administering a major social-security scheme.","Structured Central Government pay level and allowances.","Mix of enforcement/field and office responsibilities."],
    disadvantages: ["Requires clearing a competitive, syllabus-heavy exam.","Enforcement Officer duties can involve travel and dealing with non-compliant employers.","Vacancies vary year to year."],
    prep: ["Read the latest official EPFO EO/AO notification first.","Build a topic checklist from the official syllabus, including labour law and accountancy topics.","Build fundamentals before attempting timed papers.","Solve previous-year papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs, especially economy and labour-law updates."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Relevant specialisation certificate if the post asks for one (law/accounts)"]
  },
  "12-14": { // State Govt LDC/Junior Assistant
    jobWork: ["Routine office administration, file handling, record keeping and correspondence in state secretariat and department offices.","Follow state departmental rules and supervisory instructions."],
    syllabus: ["Language — grammar, vocabulary, comprehension in the notified state language.","General Knowledge/Current Affairs — state and national events, polity, history, geography.","Maths — number system, percentages, ratio/proportion, averages, time-work, time-distance.","Reasoning — analogy, classification, series, coding-decoding, directions.","Computer knowledge as prescribed by the specific state notification."],
    examPattern: "Commonly language, GK/current affairs, Maths, Reasoning and computer knowledge; exact syllabus and marks are state-specific.",
    selection: "Written/CBT → typing/skill test where prescribed → document verification → appointment.",
    physical: "Not applicable unless the specific state notice mentions PET/PST/medical standards.",
    salary: "State pay level varies by department; typing/computer proficiency requirements are common for this post.",
    promotions: "Promotion follows state service rules, seniority, departmental exams, vacancies and performance — LDC/Junior Assistant roles can progress to Senior Assistant/Section Officer grades.",
    posting: "State secretariat, district offices, departments and subordinate offices.",
    advantages: ["Stable state government employment with defined service rules.","Local/home-state postings are common.","Structured promotion path within the state cadre."],
    disadvantages: ["Recruitment cycles and vacancies vary by state and department.","Typing/computer skill test can be a hurdle for some candidates.","Promotion speed depends on state-level vacancies."],
    prep: ["Read the latest official state LDC/Junior Assistant notification first.","Build a topic checklist from the official state syllabus.","Practice typing/computer skills if the post requires a skill test.","Solve previous-year state exam papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for state and national current affairs."],
    documents: ["Class 12 marksheet/certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Domicile/local-language certificate if required"]
  },
  "12-15": { // Others (Group B & C Posts)
    jobWork: ["Cadre/posting-determined administration, public service or technical duties depending on the exact post advertised.","Follow departmental rules, safety procedures and supervisory instructions as applicable to the specific post."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, algebra, geometry.","Language — grammar, vocabulary, comprehension in the notified language.","Use the exact syllabus annexure in the specific recruitment notice — this is a catch-all category, so the syllabus varies widely."],
    examPattern: "The exact pattern, marks, duration and negative marking are recruitment-specific — always use the current official notification for the final pattern.",
    selection: "Usually application → written/CBT or merit screening → applicable skill/physical/technical stage → document verification → medical/appointment as prescribed.",
    physical: "Not applicable unless the specific recruitment notice mentions PET/PST/medical standards.",
    salary: "Pay/remuneration varies by department, pay level, organisation and posting — always confirm exact figures from the applicable notification/pay rules.",
    promotions: "Promotion follows the recruiting department's service rules, seniority, departmental exams, vacancies and performance.",
    posting: "Depends on the recruiting organisation, cadre, zone/circle and vacancy; transfers may apply.",
    advantages: ["Wide net of additional Group B/C posts beyond the major named exams.","Government/statutory employment structure and defined service rules where applicable.","Structured allowances and retirement benefits."],
    disadvantages: ["Because this spans many different posts, eligibility and pay vary widely — always verify the specific notice.","Competitive recruitment with uncertain notification cycles.","Promotion speed and posting quality depend heavily on the specific department."],
    prep: ["Identify the exact post and download its official notification first.","Build a topic checklist from that post's official syllabus.","Build fundamentals before attempting timed papers.","Solve previous-year papers for that specific post/department where available.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Class 12 (or as specified) marksheet/certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile/local-language certificate if required"]
  }
};
jobs.forEach(j=>{
  if (fullGuides12[j.code]) j.fullGuide = fullGuides12[j.code];
});

/* ============================================================
   FULL GUIDE — After ITI tier (ITI-01 .. ITI-14)
   Same structure as fullGuides12, sourced from the ITI-tier
   flowchart reference docs.
   ============================================================ */
const fullGuidesITI = {
  "ITI-01": { // RRB ALP (Assistant Loco Pilot)
    jobWork: ["Operating and assisting with train engines, monitoring engine performance and following railway safety/signalling procedures.","Follow departmental rules, safety procedures and supervisory instructions; shift and roster duty is common."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism, data interpretation.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, time-work, time-distance, algebra, geometry.","Language — grammar, vocabulary, comprehension, sentence correction.","Use the exact syllabus annexure in the current RRB ALP CEN for CBT-2 technical/trade content."],
    examPattern: "CBT-1 covers Mathematics, Mental Ability/Reasoning, General Science and General Awareness. CBT-2 adds Basic Science & Engineering plus trade/technical topics as prescribed. Check the current notice for exact question count, marks and negative marking.",
    selection: "CBT-1 → CBT-2 → Computer Based Aptitude Test for ALP → document verification → medical.",
    physical: "ALP has stringent railway medical/vision standards — the exact medical category assigned is critical to final selection.",
    salary: "Typically Pay Level-2 (basic pay around ₹19,900) plus railway allowances; in-hand varies by posting.",
    promotions: "Promotion follows railway service rules, seniority, departmental exams and vacancies — ALPs can progress toward Loco Pilot and senior operating grades over a career.",
    posting: "Railway divisions, loco sheds, yards and operating sections; shift/roster duty is common.",
    advantages: ["Respected, in-demand railway technical role.","Structured pay level with railway-specific allowances.","Clear progression path toward Loco Pilot grades."],
    disadvantages: ["Very high applicant volume and multi-stage selection.","Strict medical/vision standards can disqualify otherwise strong candidates.","Shift duty and irregular hours are part of the job."],
    prep: ["Read the latest official RRB ALP CEN notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in Maths, Reasoning and Basic Science before timed practice.","Solve previous-year CBT-1/CBT-2 papers and analyze mistakes.","Get an early medical/vision check to confirm you meet railway standards.","Take full mocks regularly and maintain an error notebook."],
    documents: ["Educational certificates/marksheets (10th + ITI/diploma as applicable)","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","ITI/trade certificate"]
  },
  "ITI-02": { // RRB Technician Grade III
    jobWork: ["Maintaining rolling stock and railway infrastructure across workshops, sheds and depots.","Follow departmental rules, safety procedures and supervisory instructions for maintenance and inspection work."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism, data interpretation.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — trade theory, safety, tools/equipment and discipline-specific concepts from the current notification."],
    examPattern: "Mathematics, Reasoning, General Science, General Awareness and trade/technical subjects as applicable; exact pattern follows the current RRB Technician CEN.",
    selection: "RRB CBT → document verification → medical examination → appointment.",
    physical: "Railway medical standards apply; technical posts can have specific medical categories depending on the trade.",
    salary: "Pay level varies by Technician Grade; allowances depend on railway posting.",
    promotions: "Promotion follows railway service rules, seniority, departmental exams and vacancies — Technicians can progress to higher technical/supervisory grades.",
    posting: "Workshops, depots, sheds, stations and technical maintenance units.",
    advantages: ["Steady, recurring railway technical recruitment.","Structured pay levels with railway allowances.","Skill-based work aligned with ITI training."],
    disadvantages: ["Competitive selection with a large applicant pool.","Workshop/field conditions can be physically demanding.","Posting location may not match home preference initially."],
    prep: ["Read the latest official RRB Technician CEN notification first.","Build a topic checklist from the official syllabus.","Revise trade theory alongside Maths and Reasoning.","Solve previous-year CBT papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["10th marksheet plus ITI/diploma certificate as applicable","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Trade certificate"]
  },
  "ITI-03": { // Railway Group D (ITI Quota)
    jobWork: ["Track maintainer and helper-level duties supporting railway infrastructure, with ITI-trade candidates given preference in some cycles.","Follow departmental rules, safety procedures and supervisory instructions; field and physically demanding work is common."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, time-work, time-distance.","Language — grammar, vocabulary, comprehension.","Use the exact Level-1 CEN syllabus annexure — don't assume it matches another RRB exam."],
    examPattern: "Common Level-1 subjects: Mathematics, General Intelligence & Reasoning, General Science and General Awareness/Current Affairs; exact pattern follows the current CEN.",
    selection: "RRB CBT → PET → document verification → medical examination → appointment.",
    physical: "PET normally includes running and weight-carrying standards with separate male/female criteria — build endurance well in advance.",
    salary: "Level-1 basic pay is generally ₹18,000 under the applicable framework, plus railway allowances.",
    promotions: "Promotion follows railway service rules, seniority, departmental exams and vacancies — Group D roles can progress to Technician or supervisory grades over time.",
    posting: "Railway zones/divisions, stations, yards, tracks, workshops and depots depending on the post.",
    advantages: ["Large-scale, recurring recruitment with lakhs of vacancies historically.","Entry point into the broader railway system.","Structured pay level with railway allowances."],
    disadvantages: ["Physically demanding track/field work.","PET is a hard qualifying hurdle after the written exam.","High applicant volume, making cutoffs competitive."],
    prep: ["Read the latest official RRB Group D CEN notification first.","Build a topic checklist from the official syllabus.","Start running and endurance training months in advance for the PET.","Solve previous-year CBT papers and analyze mistakes.","Take full mocks regularly alongside physical training.","Reserve weekly time for current affairs and revision."],
    documents: ["10th marksheet and/or ITI/NAC certificate as applicable","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile certificate if required by the zone"]
  },
  "ITI-04": { // DRDO Technician A
    jobWork: ["Supporting DRDO's defence research laboratories through equipment handling, fabrication, testing or maintenance in the relevant trade.","Follow departmental rules, safety procedures and supervisory instructions in a research/lab environment."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — trade theory, safety, tools/equipment and discipline-specific concepts from the current CEPTAM notification."],
    examPattern: "General Awareness, Quantitative Aptitude, Reasoning, General Science and trade-specific questions are common areas; the current DRDO CEPTAM notice controls exact weightage.",
    selection: "DRDO recruitment process can include CBT → trade test → document verification → medical/appointment.",
    physical: "Not applicable unless the specific DRDO notice mentions PET/PST/medical standards.",
    salary: "Technician-A is generally a Level-2 technical post in recent frameworks, plus allowances.",
    promotions: "Promotion follows DRDO service rules, seniority, departmental exams and vacancies — Technicians can progress to senior technical grades over a career.",
    posting: "DRDO laboratories/establishments across India.",
    advantages: ["Work in a prestigious defence research environment.","Structured Central Government pay level and allowances.","Exposure to advanced technical/lab work beyond typical trade postings."],
    disadvantages: ["Vacancies are limited compared to railway/SSC-scale recruitment.","Trade eligibility must match the exact lab's requirement.","Postings are spread across specific DRDO establishments, not all locations."],
    prep: ["Read the latest official DRDO CEPTAM notification first.","Build a topic checklist from the official syllabus.","Revise trade theory alongside GA, Quant and Reasoning.","Solve previous-year CEPTAM papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["10th marksheet plus relevant ITI trade certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "ITI-05": { // BHEL/HAL/BEL/ONGC Technician
    jobWork: ["Plant and equipment maintenance, inspection and technical support in major public-sector engineering/energy companies.","Follow departmental rules, safety procedures and supervisory instructions on the shop floor or field site."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — trade theory, safety, tools/equipment and discipline-specific concepts from the current PSU notification."],
    examPattern: "Technical/trade subjects plus aptitude/reasoning/GK/English may be used, depending on the specific PSU's own recruitment notice.",
    selection: "Organization-specific written test/merit → trade/skill test or interview where prescribed → medical/document verification.",
    physical: "Not applicable unless the specific PSU notice mentions PET/PST/medical standards.",
    salary: "PSU technician pay/stipend varies widely by organization and whether the role is apprentice, contract or regular employee — check the specific PSU's pay structure.",
    promotions: "Promotion follows the PSU's internal service rules, seniority, departmental exams and vacancies — Technicians can progress to senior technician/supervisory grades.",
    posting: "Plants, factories, refineries, projects, workshops and field locations of the recruiting PSU.",
    advantages: ["Strong brand-name PSU employers with structured benefits.","Hands-on technical exposure aligned with ITI training.","Reasonably stable employment once regularized."],
    disadvantages: ["Pay and job security differ significantly between apprentice/contract and regular posts — read the notice carefully.","Trade/branch eligibility varies by PSU and must be matched exactly.","Plant/field postings can involve shift work or industrial hazards."],
    prep: ["Read the latest official PSU technician notification first.","Build a topic checklist from the official syllabus.","Revise trade theory alongside aptitude and reasoning.","Solve previous-year papers for that specific PSU where available.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["10th marksheet plus relevant ITI trade certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "ITI-06": { // BSF/CRPF/CISF Tradesman
    jobWork: ["Skilled tradesman duties (electrician, mechanic, plumber and similar trades) supporting central armed police force units.","Follow force-specific rules, safety procedures and supervisory instructions; uniformed and shift-based duty is common."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Elementary Mathematics — number system, percentages, ratio/proportion, averages, time-work, time-distance.","Language — grammar, vocabulary, comprehension.","Trade-specific assessment for the tradesman category applied for."],
    examPattern: "Typically Reasoning, GK/GA, Elementary Mathematics and language, plus a trade-specific assessment for tradesman posts.",
    selection: "Written/CBT → PST/PET and/or trade test → medical → document verification → final selection.",
    physical: "Uniformed CAPF recruitment commonly includes height/weight/chest (where applicable), running/PET and medical standards; exact figures vary by force and category.",
    salary: "Constable-level CAPF tradesman posts are commonly Pay Level-3; specifics can differ by trade and organization.",
    promotions: "Promotion follows force-specific service rules, seniority, departmental exams and vacancies — tradesmen can progress through Head Constable and senior technical grades.",
    posting: "All-India postings including border, industrial, internal-security, training and field locations depending on the force.",
    advantages: ["Stable uniformed government employment with defined service rules.","Structured allowances and retirement benefits.","Skill-based work aligned with ITI trade training."],
    disadvantages: ["Uniformed duty involves shift work, transfers and field hardship.","Physical standards must be cleared alongside the written exam.","All-India posting liability, including remote/border locations."],
    prep: ["Read the latest official CAPF Tradesman notification first.","Build a topic checklist from the official syllabus.","Start physical training (running, endurance) months in advance.","Solve previous-year papers and analyze mistakes.","Take full mocks regularly alongside physical training.","Reserve weekly time for current affairs and revision."],
    documents: ["10th/12th marksheet as applicable plus relevant ITI trade certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile certificate if required"]
  },
  "ITI-07": { // Indian Army Agniveer (Tech) Trades
    jobWork: ["Technical trade duties (electrician, mechanic and similar) supporting Army units under the Agnipath scheme.","Follow Army rules, safety procedures and command instructions; involves field/uniformed duty and possible operational deployment."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, time-work, time-distance, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical subjects specific to the trade applied for, per the current Army CEE notice."],
    examPattern: "CEE subjects vary by category; Technical trade entries include technical subjects alongside General Knowledge, General Science, Maths and Reasoning.",
    selection: "Online registration → Common Entrance Examination (CEE) → recruitment rally/physical fitness and measurement → medical → final merit, per the current Army notice.",
    physical: "Physical fitness tests and body measurements are central to selection; standards vary by category, region and current recruitment rules.",
    salary: "Agniveer has a distinct four-year engagement pay/Seva Nidhi structure rather than a traditional permanent-service pay progression; current Army rules control the exact figures.",
    promotions: "Within the four-year Agniveer tenure, growth is limited to internal grading; top performers can be considered for permanent enrolment as per current Army policy.",
    posting: "Military units/training establishments as assigned, under the Agnipath/Agniveer framework.",
    advantages: ["Prestigious, disciplined service with strong training and allowances.","Trade-specific technical exposure alongside military training.","Possible pathway to permanent enrolment for top performers."],
    disadvantages: ["Four-year tenure structure differs from traditional permanent service.","Physically demanding training and possible field/operational postings.","Selection is highly competitive with a rigorous physical stage."],
    prep: ["Read the latest official Indian Army Agniveer Technical notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in the relevant technical trade alongside GK/Maths/Reasoning.","Solve previous-year CEE papers and analyze mistakes.","Start physical training (running, endurance) months in advance for the rally.","Take full mocks regularly and maintain an error notebook."],
    documents: ["10th/12th marksheet plus relevant ITI trade certificate as applicable","Photo and signature in prescribed format","Government ID","Category/EWS certificate if applicable","Domicile/local-language certificate if required"]
  },
  "ITI-08": { // Indian Navy MR (Artificer Apprentice)
    jobWork: ["Training in marine engineering trades aboard naval ships and establishments, supporting shipboard machinery and systems.","Follow Navy rules, safety procedures and command instructions; involves shipboard/uniformed duty."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, time-work, time-distance, algebra, geometry.","Language — grammar, vocabulary, comprehension.","MR/SSR-specific technical/trade content per the current Indian Navy notice."],
    examPattern: "MR and SSR/technical entries have different subject mixes; the current Indian Navy notice controls the exact pattern, duration and marks.",
    selection: "Online application → computer-based exam → physical fitness test (PFT) → medical → merit/induction as prescribed.",
    physical: "PFT and medical standards apply; height, running, squats/push-ups/sit-ups or other events depend on the entry and current notice.",
    salary: "Agniveer Navy entries follow the applicable Agniveer pay/Seva Nidhi framework.",
    promotions: "Within the Agniveer tenure, growth is limited to internal grading; top performers can be considered for permanent enrolment as per current Navy policy.",
    posting: "Indian Navy ships, establishments, bases and training centers as allotted.",
    advantages: ["Structured marine engineering training with strong discipline and allowances.","Exposure to shipboard technical systems.","Possible pathway to permanent enrolment for top performers."],
    disadvantages: ["Shipboard duty involves long deployments away from home.","Physically demanding training and PFT standards.","Four-year Agniveer tenure structure differs from permanent service."],
    prep: ["Read the latest official Indian Navy MR/Artificer Apprentice notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in Maths, Reasoning and GA before timed practice.","Solve previous-year papers and analyze mistakes.","Start physical training (running, strength) months in advance for the PFT.","Take full mocks regularly and maintain an error notebook."],
    documents: ["10th/12th marksheet with required subjects as applicable","Photo and signature in prescribed format","Government ID","Category/EWS certificate if applicable","Domicile certificate if required"]
  },
  "ITI-09": { // Air Force Agniveer (Tech)
    jobWork: ["Technical trade duties maintaining aircraft, ground equipment and support systems under the Agnipath scheme.","Follow Air Force rules, safety procedures and command instructions; involves uniformed/technical station duty."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, time-work, time-distance, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Science/non-science technical papers as prescribed by the current Agniveervayu notice."],
    examPattern: "Science and non-science papers differ; the current Agniveervayu notice controls exact subjects, duration and marks.",
    selection: "Online test → physical fitness test → adaptability/medical stages as prescribed → final enrolment list.",
    physical: "Physical fitness and medical standards apply; exact run times and other events are notification-specific.",
    salary: "Agniveervayu uses the applicable Agnipath pay/Seva Nidhi framework.",
    promotions: "Within the Agniveer tenure, growth is limited to internal grading; top performers can be considered for permanent enrolment as per current Air Force policy.",
    posting: "Air Force stations/training establishments as assigned.",
    advantages: ["Technical exposure to advanced aircraft and ground systems.","Structured training and discipline with strong allowances.","Possible pathway to permanent enrolment for top performers."],
    disadvantages: ["Four-year Agniveer tenure structure differs from permanent service.","Selection is competitive with a rigorous physical/adaptability stage.","Postings depend on service need, not personal preference."],
    prep: ["Read the latest official Agniveervayu Technical notification first.","Build a topic checklist from the official syllabus (science or non-science, as applicable).","Build fundamentals in Maths, Reasoning and GA before timed practice.","Solve previous-year online test papers and analyze mistakes.","Start physical training months in advance for the fitness test.","Take full mocks regularly and maintain an error notebook."],
    documents: ["10th/12th marksheet with required subjects as applicable","Photo and signature in prescribed format","Government ID","Category/EWS certificate if applicable","Domicile certificate if required"]
  },
  "ITI-10": { // State Electricity Board Technician
    jobWork: ["Maintaining and repairing electrical distribution infrastructure — substations, lines and connections — for the state electricity board.","Follow board rules, safety procedures and supervisory instructions; fieldwork on live/high-voltage systems requires strict safety discipline."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, time-work, time-distance, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — electrical fundamentals, trade theory, safety, tools/equipment per the current board notification."],
    examPattern: "Electrical fundamentals, trade theory, safety, Maths/Reasoning and GK as specified by the current state board notice.",
    selection: "Board recruitment exam/merit → technical/skill test where prescribed → document/medical verification.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "State electricity board pay/stipend varies by post and state — check the specific board's pay structure.",
    promotions: "Promotion follows the board's service rules, seniority, departmental exams and vacancies — Technicians can progress to Lineman-in-charge, Junior Engineer or supervisory grades.",
    posting: "Substations, lines, distribution divisions, workshops and offices.",
    advantages: ["Stable state-level employment with local/home-state postings common.","Skill-based work aligned with ITI electrical training.","Structured allowances and retirement benefits."],
    disadvantages: ["Fieldwork with high-voltage systems carries inherent safety risk.","Recruitment cycles and vacancies vary by state and board.","Emergency/fault-repair duty can mean irregular hours."],
    prep: ["Read the latest official state electricity board notification first.","Build a topic checklist from the official syllabus.","Revise electrical trade theory and safety rules thoroughly.","Solve previous-year board papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["10th marksheet plus ITI certificate in the relevant electrical trade","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Domicile certificate if required"]
  },
  "ITI-11": { // DMRC Maintainer
    jobWork: ["Keeping Delhi Metro's rolling stock, signalling and electrical systems running smoothly through inspection and maintenance.","Follow DMRC rules, safety procedures and supervisory instructions; shift duty in depots/stations is common."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, time-work, time-distance, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — core trade subjects, safety, tools/equipment per the current DMRC notification."],
    examPattern: "Technical subject, Reasoning, Quantitative Aptitude and English/GK as prescribed by the current DMRC Maintainer notice.",
    selection: "DMRC recruitment may use CBT → trade/skill/medical or interview depending on the exact post.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "DMRC pay varies by cadre and whether the recruitment is regular or contract-based.",
    promotions: "Promotion follows DMRC's internal service rules, seniority, departmental exams and vacancies — Maintainers can progress to senior technician/supervisory grades.",
    posting: "Metro depots, stations, workshops, Operations Control Centres (OCCs) and maintenance sections.",
    advantages: ["Modern, well-organised metro-rail work environment.","Structured pay and benefits for regular DMRC employees.","Skill-based work aligned with ITI/technical training."],
    disadvantages: ["Shift duty, including night shifts, is common for depot/station roles.","Contract vs regular recruitment terms can differ significantly — read the notice carefully.","Vacancies and recruitment cycles depend on network expansion."],
    prep: ["Read the latest official DMRC Maintainer notification first.","Build a topic checklist from the official syllabus.","Revise trade theory alongside Reasoning and Quant.","Solve previous-year DMRC papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["10th marksheet plus relevant ITI trade certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable"]
  },
  "ITI-12": { // ISRO/DRDO Technician
    jobWork: ["Supporting India's space and defence research programmes through fabrication, electronics or instrumentation work in the relevant trade.","Follow departmental rules, safety procedures and supervisory instructions in a research/lab environment."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — trade theory, safety, tools/equipment and discipline-specific concepts per the current notification."],
    examPattern: "General Awareness, Quantitative Aptitude, Reasoning, General Science and trade-specific questions are common areas; the current ISRO/DRDO notice controls exact weightage.",
    selection: "Recruitment process can include CBT → trade test → document verification → medical/appointment.",
    physical: "Not applicable unless the specific notice mentions PET/PST/medical standards.",
    salary: "Technician-A/equivalent is generally a Level-2 technical post in recent frameworks, plus allowances.",
    promotions: "Promotion follows the organisation's service rules, seniority, departmental exams and vacancies — Technicians can progress to senior technical grades over a career.",
    posting: "ISRO/DRDO laboratories and establishments across India.",
    advantages: ["Work in a prestigious national research environment.","Structured Central Government pay level and allowances.","Exposure to advanced technical/lab work."],
    disadvantages: ["Vacancies are limited compared to railway/SSC-scale recruitment.","Trade eligibility must match the exact establishment's requirement.","Postings are spread across specific centres, not all locations."],
    prep: ["Read the latest official ISRO/DRDO technician notification first.","Build a topic checklist from the official syllabus.","Revise trade theory alongside GA, Quant and Reasoning.","Solve previous-year papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["10th marksheet plus relevant ITI trade certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "ITI-13": { // Navy Ship/Vehicle Mechanic
    jobWork: ["Maintaining naval vessels and support vehicles through mechanical inspection, repair and servicing work.","Follow departmental rules, safety procedures and supervisory instructions; dockyard/field conditions are common."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, time-work, time-distance, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — trade theory, safety, tools/equipment and discipline-specific concepts per the current notification."],
    examPattern: "Trade theory, basic Maths, Reasoning and English/GK as prescribed by the specific recruitment notice.",
    selection: "Recruitment-specific written/CBT and/or trade test → physical/medical → document verification.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Pay varies by entry type — civilian/defence trade, apprentice or Agniveer rules may apply differently.",
    promotions: "Promotion follows the recruiting organisation's service rules, seniority, departmental exams and vacancies.",
    posting: "Naval dockyards, bases, workshops and ship-support facilities.",
    advantages: ["Skill-based mechanical work aligned with ITI training.","Stable employment structure with defined service rules where applicable.","Exposure to naval/defence maintenance systems."],
    disadvantages: ["Pay and terms differ significantly between civilian, apprentice and Agniveer-style entries — read the notice carefully.","Dockyard/field conditions can involve physically demanding work.","Trade eligibility must match the exact entry's requirement."],
    prep: ["Read the latest official notification for the exact entry (civilian/defence/Agniveer) first.","Build a topic checklist from the official syllabus.","Revise trade theory alongside Maths and Reasoning.","Solve previous-year papers where available and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["10th marksheet plus relevant ITI trade certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "ITI-14": { // Others (PSUs/State Technician Posts)
    jobWork: ["Cadre/posting-determined technical duties — equipment, systems, maintenance, inspection or testing — depending on the exact post advertised.","Follow departmental rules, safety procedures and supervisory instructions as applicable to the specific post."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — trade theory, safety, tools/equipment and discipline-specific concepts; use the exact syllabus annexure in the specific recruitment notice since this is a catch-all category."],
    examPattern: "The exact pattern, marks, duration and negative marking are recruitment-specific — always use the current official notification for the final pattern.",
    selection: "Usually application → written/CBT or merit screening → applicable skill/physical/technical stage → document verification → medical/appointment as prescribed.",
    physical: "Not applicable unless the specific recruitment notice mentions PET/PST/medical standards.",
    salary: "Pay/remuneration varies by department, pay level, organisation and posting — always confirm exact figures from the applicable notification/pay rules.",
    promotions: "Promotion follows the recruiting organisation's service rules, seniority, departmental exams, vacancies and performance.",
    posting: "Depends on the recruiting organisation, cadre, zone/circle and vacancy; transfers may apply.",
    advantages: ["Wide net of additional ITI-level technician posts beyond the major named exams.","Government/PSU/statutory employment structure and defined service rules where applicable.","Structured allowances and retirement benefits."],
    disadvantages: ["Because this spans many different posts, eligibility and pay vary widely — always verify the specific notice.","Competitive recruitment with uncertain notification cycles.","Promotion speed and posting quality depend heavily on the specific department."],
    prep: ["Identify the exact post and download its official notification first.","Build a topic checklist from that post's official syllabus.","Revise trade theory alongside general aptitude subjects.","Solve previous-year papers for that specific post/department where available.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["10th marksheet plus relevant ITI trade certificate","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile/local-language certificate if required"]
  }
};
jobs.forEach(j=>{
  if (fullGuidesITI[j.code]) j.fullGuide = fullGuidesITI[j.code];
});

/* ============================================================
   FULL GUIDE — After Degree tier (DEG-01 .. DEG-13)
   Same structure as fullGuides12/fullGuidesITI, sourced from
   the After-Degree flowchart reference docs.
   ============================================================ */
const fullGuidesDEG = {
  "DEG-01": { // SSC CGL (Group B & C)
    jobWork: ["Cadre/posting-determined work spanning administration, inspection, auditing or assistant-level duties across many central departments.","Follow departmental rules and supervisory instructions; some CGL posts (e.g. Inspector) involve field or verification duties."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism, data interpretation.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, time-work, time-distance, algebra, geometry.","English/Language — grammar, vocabulary, comprehension, sentence correction.","Use the exact syllabus annexure in the current CGL notice for post-specific components."],
    examPattern: "Tier-I covers Reasoning, General Awareness, Quantitative Aptitude and English. Tier-II has a compulsory Paper-I plus additional/qualifying papers for specified posts. Check the current notice for question count, marks, duration and negative marking.",
    selection: "SSC Tier-I → Tier-II → document verification/skill/physical standards for applicable posts → final allocation.",
    physical: "Not applicable for most CGL posts unless the specific post (e.g. Sub-Inspector categories) specifies PET/PST/medical standards.",
    salary: "CGL posts span Pay Level 4 through Level 7 and above depending on the exact post; in-hand varies with DA, HRA, TA and NPS.",
    promotions: "Promotion follows service rules, seniority, departmental exams, vacancies and cadre structure — CGL is often a strong entry point into higher Group B roles over a career.",
    posting: "Central ministries/departments across India; some posts carry all-India transfer liability.",
    advantages: ["Access to a wide range of central government departments from one exam.","Reasonable starting pay levels with allowances.","Clear tiered promotion structure in most cadres."],
    disadvantages: ["Highly competitive with large applicant pools.","Post allocation depends on rank, category and preference — not guaranteed.","Some posts carry transfer liability or field duty."],
    prep: ["Download and study the latest official CGL notification first.","Build a topic checklist from the official syllabus.","Build fundamentals before attempting timed papers.","Solve previous-year Tier-I and Tier-II papers, analyzing every mistake.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Experience/NOC documents where required"]
  },
  "DEG-02": { // UPSC Civil Services (IAS/IPS/IFS)
    jobWork: ["District administration, law and order, policy implementation, foreign service or allied central/state service duties depending on the cadre allocated.","Follow departmental rules, safety procedures and supervisory instructions; district/field postings involve high public interaction and decision-making responsibility."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning and Comprehension — covered under CSAT (qualifying in Prelims).","Optional subject — a chosen subject studied in depth for the Mains written papers.","Essay and General Studies I–IV — covering society, governance, ethics, economy and more for Mains.","Use the exact UPSC syllabus and previous notifications — this is a long-cycle exam with a very wide syllabus."],
    examPattern: "Prelims: GS Paper I (merit-counting) plus a qualifying CSAT paper. Mains: Essay, GS Papers I–IV, two optional subject papers and qualifying language/English papers. Exact scheme follows the current UPSC notice.",
    selection: "UPSC Preliminary exam → Main written examination → Personality Test (interview) → final service allocation/medical.",
    physical: "Not applicable unless a specific allied service (e.g. IPS) requires PET/PST/medical standards at a later training stage.",
    salary: "IAS/IPS/IFS and allied services use officer pay levels and allowances; starting basic pay is roughly Pay Level 10 and rises through the career via promotion.",
    promotions: "Promotion follows service rules, seniority, performance and empanelment — officers rise through a structured cadre hierarchy over decades, potentially reaching top administrative or policy positions.",
    posting: "All-India/central cadre postings depending on the service and cadre allocated; district, state and central-secretariat postings are all possible over a career.",
    advantages: ["Widely regarded as India's most prestigious and influential government career.","Strong structured career progression with real decision-making authority.","Significant job security and social standing."],
    disadvantages: ["Extremely competitive — a long, multi-stage exam with a low success rate.","Preparation typically takes a year or more of sustained, full-time effort.","Frequent transfers, especially in early postings, and high public/political pressure."],
    prep: ["Build an NCERT-level foundation before moving to advanced material.","Read quality current affairs daily rather than in occasional deep dives.","Choose an optional subject aligned with genuine interest and academic strength.","Practice structured answer-writing regularly for the Mains stage.","Take Prelims mock tests seriously under timed, negative-marking conditions.","Reserve dedicated time for personality-test preparation closer to the interview stage."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Optional-subject degree/mark sheet if relevant to eligibility"]
  },
  "DEG-03": { // UPSC CAPF (Assistant Commandant)
    jobWork: ["Officer-level command, administrative and operational responsibilities within BSF, CRPF, CISF, ITBP or SSB.","Follow force-specific rules, operational protocols and command responsibilities; involves field/uniformed duty."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, algebra, geometry.","General Studies, Essay and Comprehension for Paper-II.","Use the exact UPSC CAPF syllabus annexure in the current notice."],
    examPattern: "Paper I: General Ability & Intelligence. Paper II: General Studies, Essay & Comprehension. Current UPSC notice controls exact marks and duration.",
    selection: "UPSC written exam → Physical Standards Test/Physical Efficiency Test → medical examination → interview/personality test → final merit.",
    physical: "Strict CAPF medical and physical standards including height, chest/expansion (where applicable), endurance and vision; exact figures are notification-specific.",
    salary: "Officer-level pay at Pay Level 10 (roughly ₹56,100–₹1,77,500) plus allowances, as a Central Armed Police Forces post.",
    promotions: "Promotion follows force-specific service rules, seniority, departmental exams, vacancies and performance — Assistant Commandants can rise through Deputy Commandant, Commandant and beyond.",
    posting: "All-India CAPF formations and operational/training locations.",
    advantages: ["Group A gazetted officer entry with strong pay and status.","Structured career progression within the force.","Leadership responsibility from an early stage."],
    disadvantages: ["Strict physical and medical standards to clear.","Frequent transfers and challenging field postings, including border/conflict areas.","Highly competitive selection with multiple stages."],
    prep: ["Read the latest official UPSC CAPF notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in GS and reasoning before timed practice.","Solve previous-year Paper I/II papers and analyze mistakes.","Build physical fitness early and consistently for the PST/PET.","Take full mocks regularly and maintain an error notebook."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Medical fitness documents where required"]
  },
  "DEG-04": { // UPSC EPFO/ESIC/Other
    jobWork: ["Enforcement, inspection, accounts and administrative duties in EPFO, ESIC or other central bodies recruited via UPSC or an authorised process.","Follow departmental rules and procedures; enforcement-type duties can involve field visits to establishments."],
    syllabus: ["General English — grammar, vocabulary, comprehension.","Indian Freedom Struggle, Economy, Polity and General Science.","Accountancy/Auditing/Insurance and Industrial Relations/Labour Laws.","Social Security and Computer Applications.","Current notice controls the exact syllabus for the specific post/route used."],
    examPattern: "If the UPSC EO/AO-style route is used, the syllabus generally includes General English, Indian Freedom Struggle, Economy, Polity, General Science, Accountancy/Auditing/Insurance, Industrial Relations/Labour Laws, Social Security and Computer Applications; current notice controls exact weightage.",
    selection: "Recruitment-specific written exam → interview where prescribed → document verification/appointment.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Central Government pay level varies by post; allowances and in-hand depend on posting.",
    promotions: "Promotion follows the recruiting body's service rules, seniority, departmental exams, vacancies and performance — officers can move into senior enforcement, accounts or administrative leadership roles.",
    posting: "Regional/sub-regional offices of the recruiting body across India.",
    advantages: ["Meaningful public-service roles administering major welfare/social-security schemes.","Structured Central Government pay level and allowances.","Mix of enforcement/field and office responsibilities depending on post."],
    disadvantages: ["Requires clearing a competitive, syllabus-heavy exam.","Enforcement-type duties can involve travel and dealing with non-compliant entities.","Vacancies vary year to year and by specific post."],
    prep: ["Read the latest official notification for the exact post/route first.","Build a topic checklist from the official syllabus, including labour law and accountancy topics where relevant.","Build fundamentals before attempting timed papers.","Solve previous-year papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs, especially economy and labour-law updates."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Relevant specialisation certificate if the post asks for one (law/accounts)"]
  },
  "DEG-05": { // State PSC (Group 1/2/3/4)
    jobWork: ["Administrative, revenue, police or allied state-service duties depending on the group and post allocated.","Follow state departmental rules, safety procedures and supervisory instructions; higher groups involve more decision-making and public responsibility."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, algebra, geometry.","Language — grammar, vocabulary, comprehension in the notified state language.","State-specific — state history/geography/economy/current affairs and optional/technical papers as prescribed."],
    examPattern: "State-specific General Studies, aptitude, language, state history/geography/economy/current affairs and optional/technical papers where applicable; exact scheme is state-specific.",
    selection: "Prelims → Mains → interview where prescribed → certificate verification → allocation.",
    physical: "Not applicable unless the specific state notice mentions PET/PST/medical standards (relevant for some Group 4/allied posts).",
    salary: "Varies by state service and group — check the specific state's pay matrix.",
    promotions: "Promotion follows state service rules, seniority, departmental exams, vacancies and performance — officers progress through the state administrative hierarchy over a career.",
    posting: "State departments, districts, secretariat, revenue, police and allied services.",
    advantages: ["State-level equivalent of the UPSC path with strong local relevance and standing.","Structured career progression within the state cadre.","Wide variety of groups/posts to target based on strength."],
    disadvantages: ["Highly competitive, especially for Group 1 posts.","State-specific syllabus and language requirements demand focused, localized preparation.","Posting and transfer liability across the state."],
    prep: ["Read the latest official State PSC notification for the exact group first.","Build a topic checklist from the official state syllabus.","Build strong state-specific GK alongside national General Studies.","Solve previous-year state PSC papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for state and national current affairs."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Domicile/local-language certificate if required"]
  },
  "DEG-06": { // Bank PO/Clerk
    jobWork: ["Probationary Officer or Clerk-cadre duties — credit appraisal, customer service, cash handling and account-related administrative work depending on the post.","Follow bank policies, RBI guidelines and internal compliance procedures."],
    syllabus: ["General/Banking Awareness — current affairs, banking terms, economy, government schemes.","Reasoning — analogy, classification, series, coding-decoding, puzzles, syllogism, data interpretation.","Quantitative Aptitude/Data Analysis — number system, percentages, ratio/proportion, averages, profit/loss, interest, data interpretation.","English Language — grammar, vocabulary, comprehension, and a descriptive component for PO Mains.","Post-specific components (computer knowledge, descriptive test) vary by IBPS/SBI/RRB notification."],
    examPattern: "Preliminary exam (Reasoning, Quantitative Aptitude, English) followed by a Main exam (adds General/Economy/Banking Awareness, Computer Knowledge and a descriptive component for PO), then an interview/personality stage where applicable.",
    selection: "Preliminary exam → Main exam → interview/personality stage where applicable → final allotment.",
    physical: "Not applicable — this is a desk/office-based role.",
    salary: "Bank officer/clerical pay varies by bank and scale (POs roughly ₹48,000–₹55,000 gross per month; Clerks roughly ₹29,000–₹32,000), plus DA/HRA and other allowances.",
    promotions: "Promotion follows bank service rules, seniority, internal exams, performance and vacancies — POs progress through officer scales, and Clerks can move into officer cadre via internal promotion exams.",
    posting: "Branches and administrative offices, often within a state/zone with periodic transfers.",
    advantages: ["Strong starting pay for POs and a clear promotion path for Clerks.","Well-documented exam pattern (Prelims/Mains/Interview).","Wide network of public-sector and regional rural banks to apply to."],
    disadvantages: ["Requires a bachelor's degree.","High competition with a large applicant pool nationwide.","Transfers and target-driven work in some branches."],
    prep: ["Read the latest official IBPS/SBI/RRB notification for the exact post first.","Build a topic checklist from the official syllabus.","Build fundamentals in Quant, Reasoning and English before timed practice.","Solve previous-year Prelims/Mains papers and analyze mistakes.","For PO, practice timed descriptive writing for the Mains stage.","Reserve weekly time for current affairs and banking/economy awareness."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "DEG-07": { // Insurance AO/LIC AAO
    jobWork: ["Administrative and operational duties in public-sector insurance companies — policy processing, claims oversight, branch/divisional administration and compliance.","Follow company policies, IRDAI guidelines and internal procedures."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, puzzles, syllogism, data interpretation.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, data interpretation.","English/Language — grammar, vocabulary, comprehension, descriptive writing where applicable.","Specialist/Insurance Awareness — insurance-sector terms, products and regulatory basics as prescribed by the recruiting body."],
    examPattern: "Reasoning, Quantitative Aptitude, English, General/Insurance Awareness and specialist/descriptive papers as applicable; exact scheme varies by insurer.",
    selection: "Prelims → Mains → interview where applicable → medical/document verification.",
    physical: "Not applicable — this is a desk/office-based role.",
    salary: "Officer-scale insurance remuneration varies by organization and settlement (roughly ₹45,000–₹55,000 gross per month), plus allowances.",
    promotions: "Promotion follows company service rules, seniority, internal exams, performance and vacancies — AOs/AAOs progress through officer grades over a career.",
    posting: "Branches, divisional offices, regional offices and administrative units.",
    advantages: ["Stable public-sector-style employment with strong officer-scale pay.","Structured career progression within the insurance sector.","Broad range of divisional and regional postings."],
    disadvantages: ["Requires a bachelor's degree (some specialist streams need professional degrees).","High competition with a large applicant pool.","Transfers between divisional/regional offices are common."],
    prep: ["Read the latest official Insurance AO/LIC AAO notification first.","Build a topic checklist from the official syllabus, including insurance awareness.","Build fundamentals in Quant, Reasoning and English before timed practice.","Solve previous-year Prelims/Mains papers and analyze mistakes.","Practice descriptive writing if the Mains includes one.","Reserve weekly time for current affairs and insurance-sector updates."],
    documents: ["Bachelor's degree certificate/marksheets (professional degree for specialist streams)","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable"]
  },
  "DEG-08": { // Railway Group B (Various)
    jobWork: ["Graduate-level supervisory and gazetted-track duties across Indian Railways, depending on the specific post and department.","Follow railway operating and safety procedures; some posts carry supervisory or administrative responsibility over field staff."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism, data interpretation.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Post-specific topics per the exact RRB Group B notification — do not assume it matches another RRB exam."],
    examPattern: "The exact pattern, marks, duration and negative marking are recruitment-specific — use the current official RRB Group B notification for the final pattern.",
    selection: "Usually application → written/CBT or merit screening → applicable skill/physical/technical stage → document verification → medical/appointment as prescribed.",
    physical: "Not applicable unless the specific notice mentions PET/PST/medical standards for a particular post.",
    salary: "Pay Level 7–8 depending on the exact post; railway allowances (DA, HRA, TA) affect final in-hand.",
    promotions: "Promotion follows railway service rules, seniority, departmental exams, vacancies and cadre structure — Group B roles often come from promotion within the railway cadre as well as direct recruitment.",
    posting: "Depends on the recruiting zone/division and vacancy; transfers may apply.",
    advantages: ["Supervisory/gazetted-level responsibility within a large, stable organisation.","Structured railway pay scale and allowances.","Clear promotion path within the railway hierarchy."],
    disadvantages: ["Vacancies for direct-recruitment Group B posts can be limited compared to Group C.","Eligibility and syllabus vary by exact post — read the notice carefully.","Posting/transfer liability depending on zone."],
    prep: ["Read the latest official RRB Group B notification for the exact post first.","Build a topic checklist from the official syllabus.","Build fundamentals before attempting timed papers.","Solve previous-year papers for the specific post and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "DEG-09": { // NABARD Grade A/B
    jobWork: ["Officer-grade duties in agriculture finance, rural development and banking supervision at India's apex rural development bank.","Follow NABARD policies, RBI/regulatory guidelines and internal procedures; some roles involve field visits to rural/banking institutions."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, puzzles, syllogism, data interpretation.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, data interpretation.","English/Language — grammar, vocabulary, comprehension.","Specialist — economics, agriculture, rural development, finance or other subjects as prescribed for specialist posts."],
    examPattern: "The exact pattern, marks, duration and negative marking are recruitment-specific — use the current official NABARD notification for the final pattern (typically Prelims → Mains → interview).",
    selection: "Usually application → Prelims → Mains → interview → document verification/appointment as prescribed.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Roughly ₹58,000–₹85,000 gross per month depending on grade, plus allowances.",
    promotions: "Promotion follows NABARD's internal service rules, seniority, departmental exams, vacancies and performance — Grade A/B officers can progress to senior management grades over a career.",
    posting: "NABARD regional/head offices across India.",
    advantages: ["Strong starting pay with a prestigious apex-bank employer.","Meaningful work supporting rural development and agriculture finance.","Structured officer-grade career progression."],
    disadvantages: ["Highly competitive with a syllabus-heavy, specialist-oriented exam.","Specific disciplines are required for some specialist posts, narrowing eligibility.","Vacancies are limited compared to larger banking exams."],
    prep: ["Read the latest official NABARD Grade A/B notification first.","Build a topic checklist from the official syllabus, including economics/agriculture where relevant.","Build fundamentals in Quant, Reasoning and English before timed practice.","Solve previous-year Prelims/Mains papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs, especially rural economy and agriculture."],
    documents: ["Bachelor's degree certificate/marksheets (specific discipline for specialist posts)","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable"]
  },
  "DEG-10": { // CDS/AFCAT (For Graduates)
    jobWork: ["Officer training followed by command, technical or administrative responsibilities in the Army, Navy or Air Force depending on entry.","Follow service-specific rules, operational protocols and command responsibilities."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude/Elementary Mathematics — number system, percentages, ratio/proportion, algebra, geometry.","English — grammar, vocabulary, comprehension.","Service-specific General Studies, professional knowledge or technical topics for AFCAT technical entries as prescribed."],
    examPattern: "CDS and AFCAT have different papers/sections; English, GK, Maths or aptitude/technical content depends on the exact entry chosen.",
    selection: "CDS: written exam → SSB interview → medical → merit. AFCAT: written exam → AFSB → medical → merit.",
    physical: "Defence medical and physical standards are mandatory; eyesight and anthropometric standards can be strict and entry-specific.",
    salary: "Officer-entry pay follows the defence service pay matrix and allowances; exact in-hand depends on rank, posting and allowances.",
    promotions: "Promotion follows defence service rules, seniority, performance and vacancies — officers progress through rank over a structured career.",
    posting: "Training academies followed by Army/Navy/Air Force postings across India.",
    advantages: ["Prestigious officer-entry route with strong career structure.","Comprehensive training, leadership development and allowances.","Clear rank-based promotion path."],
    disadvantages: ["Strict physical, medical and psychological screening (SSB/AFSB).","Frequent transfers and demanding postings, including field areas.","Long, multi-stage selection process."],
    prep: ["Read the latest official UPSC CDS/AFCAT notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in GK, Maths and English before timed practice.","Solve previous-year papers and analyze mistakes.","Prepare for the SSB/AFSB stage (group tasks, interview, psychology tests) well in advance.","Build physical fitness consistently alongside academic prep."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS certificate if applicable","Medical fitness documents where required"]
  },
  "DEG-11": { // Teaching (TET/CTET/KVS/NVS/DSSSB)
    jobWork: ["Classroom teaching, lesson planning, student assessment and school administrative duties depending on the level and subject taught.","Follow school/board rules, curriculum guidelines and supervisory instructions."],
    syllabus: ["Child Development & Pedagogy — teaching methods, learning theory, classroom management.","Language — grammar, vocabulary, comprehension in the language(s) of instruction.","Mathematics/EVS or subject-specific content depending on the level and post applied for.","General Awareness — current affairs, education policy and government schemes where included.","Use the exact syllabus annexure in the current TET/CTET/KVS/NVS/DSSSB notice — content varies significantly by level and recruiting body."],
    examPattern: "Child Development & Pedagogy, language, Maths/EVS or subject-specific content depending on teacher level (Primary/TGT/PGT) and recruiting body.",
    selection: "Eligibility test/TET where applicable → recruitment written exam → skill/demo/interview where prescribed → document verification.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Teacher pay varies by organization and post; government school pay can be at structured pay levels (roughly Pay Level 6–7) with allowances.",
    promotions: "Promotion follows service rules, seniority, departmental exams, vacancies and performance — teachers can progress to Head Teacher, Principal or subject-coordinator roles.",
    posting: "Schools across the relevant state/central school network (KVS, NVS or state education department).",
    advantages: ["Meaningful, socially respected career shaping students' education.","Structured government pay levels with school holidays/vacation benefits.","Multiple recruiting bodies (KVS, NVS, DSSSB, state boards) widen opportunities."],
    disadvantages: ["Requires clearing a qualifying TET/CTET before applying to most posts.","B.Ed and subject-specific eligibility can be restrictive depending on the level.","Posting location may be rural or remote depending on the recruiting body."],
    prep: ["Read the latest official TET/CTET/KVS/NVS/DSSSB notification first.","Build a topic checklist from the official syllabus, including Child Development & Pedagogy.","Build fundamentals in the subject/level you intend to teach.","Solve previous-year papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and education-policy updates."],
    documents: ["Bachelor's degree certificate plus B.Ed certificate as applicable","TET/CTET qualifying certificate/scorecard","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable"]
  },
  "DEG-12": { // Police SI/Inspector (State)
    jobWork: ["Supervisory law-and-order duties, investigation oversight and field command responsibility within a state police force.","Follow departmental rules, safety procedures and supervisory instructions; involves shift duty, field command and physically demanding work."],
    syllabus: ["General Studies/GK — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude/Maths — number system, percentages, ratio/proportion, averages, time-work, time-distance.","Language — grammar, vocabulary, comprehension in the notified language.","State-specific topics per the current state SI/Inspector notification."],
    examPattern: "General Studies/GK, Reasoning, Maths, language and state-specific topics in a written/CBT exam; exact question count and marks are state-specific.",
    selection: "Written/CBT → PST/PET → Mains/interview where applicable → medical/document verification.",
    physical: "Height/chest/weight and running/endurance requirements vary by state and category — exact standards are notification-specific.",
    salary: "State SI pay scale varies (roughly Pay Level 6–7); officer-level allowances depend on the state.",
    promotions: "Promotion follows state police service rules, seniority, departmental exams, vacancies and performance — SIs/Inspectors can rise through DySP and senior command ranks.",
    posting: "Police stations, subdivisions, district/special units and field formations.",
    advantages: ["Supervisory/officer-level entry into state police with strong pay and status.","Structured allowances and retirement benefits.","Clear promotion ladder through departmental exams."],
    disadvantages: ["Shift duty, field hardship and high-pressure investigative responsibility.","Strict physical standards to clear alongside the written stage.","Posting and transfer liability across the state."],
    prep: ["Read the latest official state SI/Inspector notification first.","Build a topic checklist from the official syllabus.","Start physical training (running, endurance) months in advance for PST/PET.","Solve previous-year papers and analyze mistakes.","Take full mocks regularly alongside physical training.","Reserve weekly time for current affairs and revision."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile/local-language certificate if required"]
  },
  "DEG-13": { // Others (State/Central Jobs)
    jobWork: ["Cadre/posting-determined administration, public service or technical duties depending on the exact post advertised.","Follow departmental rules, safety procedures and supervisory instructions as applicable to the specific post."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, profit/loss, interest, algebra, geometry.","Language — grammar, vocabulary, comprehension in the notified language.","Use the exact syllabus annexure in the specific recruitment notice — this is a catch-all category, so the syllabus varies widely."],
    examPattern: "The exact pattern, marks, duration and negative marking are recruitment-specific — always use the current official notification for the final pattern.",
    selection: "Usually application → written/CBT or merit screening → applicable skill/physical/technical stage → document verification → medical/appointment as prescribed.",
    physical: "Not applicable unless the specific recruitment notice mentions PET/PST/medical standards.",
    salary: "Pay/remuneration varies by department, pay level, organisation and posting — always confirm exact figures from the applicable notification/pay rules.",
    promotions: "Promotion follows the recruiting department's service rules, seniority, departmental exams, vacancies and performance.",
    posting: "Depends on the recruiting organisation, cadre, zone/circle and vacancy; transfers may apply.",
    advantages: ["Wide net of additional graduate-level Group A/B posts beyond the major named exams.","Government/statutory employment structure and defined service rules where applicable.","Structured allowances and retirement benefits."],
    disadvantages: ["Because this spans many different posts, eligibility and pay vary widely — always verify the specific notice.","Competitive recruitment with uncertain notification cycles.","Promotion speed and posting quality depend heavily on the specific department."],
    prep: ["Identify the exact post and download its official notification first.","Build a topic checklist from that post's official syllabus.","Build fundamentals before attempting timed papers.","Solve previous-year papers for that specific post/department where available.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Bachelor's degree certificate/marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile/local-language certificate if required"]
  }
};
jobs.forEach(j=>{
  if (fullGuidesDEG[j.code]) j.fullGuide = fullGuidesDEG[j.code];
});

/* ============================================================
   FULL GUIDE — After Diploma tier (DIP-01 .. DIP-12)
   Same structure as fullGuides12/fullGuidesITI/fullGuidesDEG,
   sourced from the After-Diploma flowchart reference docs.
   ============================================================ */
const fullGuidesDIP = {
  "DIP-01": { // SSC JE (Junior Engineer)
    jobWork: ["Junior Engineer duties — site inspection, quality checks, estimation, supervision of works and technical documentation across Civil, Mechanical or Electrical disciplines.","Follow departmental rules, safety procedures and supervisory instructions; site visits and field inspection are common."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","General Engineering (Paper-I) — basic engineering concepts across disciplines.","Detailed Civil/Electrical/Mechanical engineering syllabus (Paper-II) as per the branch applied for.","Use the exact SSC JE syllabus annexure — Paper-II content differs significantly by engineering branch."],
    examPattern: "Paper-I: Reasoning, General Awareness and General Engineering (CBT). Paper-II: detailed Civil/Electrical/Mechanical engineering syllabus, also computer-based. Check the current notice for question count, marks, duration and negative marking.",
    selection: "SSC Paper-I CBT → Paper-II objective technical exam → document verification; post-specific standards where applicable.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Typically Pay Level-6, basic pay around ₹35,400 under the 7th CPC framework, plus allowances.",
    promotions: "Promotion follows service rules, seniority, departmental exams, vacancies and cadre structure — JEs can progress to Assistant Engineer and higher technical/supervisory grades.",
    posting: "Central Government engineering departments such as CPWD, CWC, MES and other notified organizations.",
    advantages: ["Respected technical entry into central government engineering departments.","Structured Pay Level 6 with allowances.","Clear promotion path toward Assistant Engineer roles."],
    disadvantages: ["Two-stage technical exam demands strong branch-specific engineering knowledge.","Site/field inspection duties can involve travel.","Vacancies vary year to year by department and branch."],
    prep: ["Read the latest official SSC JE notification first.","Build a topic checklist from the official syllabus for both papers.","Build fundamentals in General Engineering before deep-diving into your branch's Paper-II syllabus.","Solve previous-year Paper-I/Paper-II papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Diploma/degree certificate in the relevant engineering discipline","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "DIP-02": { // RRB JE (Junior Engineer)
    jobWork: ["Junior Engineer duties across civil, mechanical, electrical and signal disciplines, covering inspection, maintenance oversight and technical documentation for railway infrastructure.","Follow railway operating and safety procedures; some posts involve field/site visits."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, algebra, geometry.","General Science — basic physics, chemistry and applied science.","Technical — core subjects/trade theory and discipline-specific engineering concepts per the current CEN."],
    examPattern: "CBT-1: Mathematics, Reasoning, General Awareness, General Science. CBT-2 includes technical abilities specific to the engineering discipline plus other common sections.",
    selection: "CBT-1 → CBT-2 → document verification → medical.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Typically Pay Level-6 with basic pay around ₹35,400 under the relevant framework; railway allowances vary by posting.",
    promotions: "Promotion follows railway service rules, seniority, departmental exams and vacancies — JEs can progress to Senior Section Engineer and higher technical/supervisory grades.",
    posting: "Railway workshops, divisions, projects, maintenance and engineering offices.",
    advantages: ["Recurring, large-scale railway technical recruitment.","Structured Pay Level 6 with railway-specific allowances.","Clear promotion path within the railway engineering cadre."],
    disadvantages: ["Two-stage CBT exam demands both general aptitude and strong technical knowledge.","High applicant volume, making cutoffs competitive.","Posting location may not match home preference initially."],
    prep: ["Read the latest official RRB JE CEN notification first.","Build a topic checklist from the official syllabus for both CBT stages.","Build fundamentals in Maths, Reasoning and General Science before technical practice.","Solve previous-year CBT-1/CBT-2 papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Diploma/degree certificate in the relevant engineering discipline","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "DIP-03": { // State JE (PWD/PHED/Electricity/Others)
    jobWork: ["Junior Engineer duties overseeing local infrastructure projects — roads, water supply, irrigation or electricity distribution depending on the department.","Follow state departmental rules, safety procedures and supervisory instructions; site inspection is common."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, algebra, geometry.","Language — grammar, vocabulary, comprehension in the notified state language.","Technical — core engineering subjects for the specific department (PWD/PHED/Electricity) per the current notification."],
    examPattern: "Technical engineering content plus general aptitude/GK/language according to the state commission/board conducting the exam.",
    selection: "State written exam/CBT → document verification → medical/appointment; interview only if prescribed.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "State JE pay varies by department and state — check the specific state's pay matrix.",
    promotions: "Promotion follows state service rules, seniority, departmental exams and vacancies — JEs can progress to Assistant Engineer and higher grades within the department.",
    posting: "PWD, PHED, irrigation, electricity, municipal and other engineering departments.",
    advantages: ["Local/home-state postings are common.","Meaningful infrastructure work with visible community impact.","Structured state pay scale and allowances."],
    disadvantages: ["Recruitment cycles and vacancies vary widely by state and department.","Field inspection duties can involve site visits in varied conditions.","Syllabus and pattern differ by state — requires state-specific preparation."],
    prep: ["Read the latest official state JE notification for the exact department first.","Build a topic checklist from the official state syllabus.","Build fundamentals in your engineering branch alongside GK and Reasoning.","Solve previous-year state JE papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Diploma/degree certificate in the relevant engineering branch","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Domicile/local-language certificate if required"]
  },
  "DIP-04": { // BSNL/MTNL/IOCL/HPCL Engineer
    jobWork: ["Junior/Technical Officer-level engineering duties in telecom or oil-and-gas PSUs — network maintenance, plant operations, technical support or project engineering depending on the organization.","Follow company rules, safety procedures and supervisory instructions in plant/field settings."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — core engineering subjects for the specific discipline/organization per the current notification."],
    examPattern: "Technical discipline content plus aptitude/English/GK if the organization uses a written test; some PSUs also use GATE score or a merit route.",
    selection: "Organization-specific exam/CBT, interview or GATE/merit route → document verification → medical.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Varies substantially between diploma technical roles, engineer roles, apprentices and regular officer cadres — check the specific PSU's pay structure.",
    promotions: "Promotion follows the PSU's internal service rules, seniority, departmental exams and vacancies — engineers can progress to senior technical/managerial grades.",
    posting: "Plants, telecom units, depots, refineries, projects and offices.",
    advantages: ["Strong brand-name PSU employers with structured benefits.","Technical exposure to large-scale telecom/energy infrastructure.","Reasonably stable employment once regularized."],
    disadvantages: ["Pay and job security differ significantly between apprentice/contract and regular posts.","Selection route (CBT vs GATE vs merit) varies by PSU and can change between cycles.","Plant/field postings can involve shift work or industrial hazards."],
    prep: ["Read the latest official notification for the specific PSU and post first.","Build a topic checklist from the official syllabus.","Build fundamentals in your engineering discipline alongside aptitude subjects.","Solve previous-year papers for that specific PSU where available.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Diploma/degree certificate in the relevant engineering/technical branch","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "DIP-05": { // DRDO/ISRO Technician/Engineer
    jobWork: ["Engineering/technical support for India's defence and space research programmes — testing, fabrication, instrumentation or project engineering depending on the exact post and qualification level.","Follow departmental rules, safety procedures and supervisory instructions in a research/lab environment."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — discipline-specific engineering syllabus (for Scientist/Engineer posts) or trade/technical content (for Technician posts) per the current notification."],
    examPattern: "Technician-level posts: trade/technical content plus basic aptitude. Scientist/Engineer-level posts: discipline-specific engineering syllabus. Current notice controls exact weightage.",
    selection: "Written test → skill test for technician posts, or interview for scientist/engineer posts, depending on the recruitment.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "DRDO/ISRO regular posts use Government pay levels and allowances; exact level depends on the post applied for.",
    promotions: "Promotion follows the organisation's service rules, seniority, departmental exams and vacancies — engineers/technicians can progress to senior technical or scientific grades.",
    posting: "DRDO laboratories or ISRO centres, launch facilities and project sites across India.",
    advantages: ["Work in a prestigious national research environment.","Structured Central Government pay level and allowances.","Exposure to advanced engineering/research work."],
    disadvantages: ["Vacancies are limited compared to railway/SSC-scale recruitment.","Eligibility and post level (Technician vs Engineer) must be matched exactly to your qualification.","Postings are spread across specific establishments, not all locations."],
    prep: ["Read the latest official DRDO/ISRO notification for the exact post first.","Build a topic checklist from the official syllabus.","Build fundamentals in your engineering discipline alongside GA and Reasoning.","Solve previous-year papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Diploma/degree certificate in the relevant engineering discipline","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "DIP-06": { // BHEL/BEL/HAL Engineer
    jobWork: ["Diploma trainee/engineer duties in plant operations, equipment maintenance and technical support at major public-sector engineering and defence-manufacturing companies.","Follow company rules, safety procedures and supervisory instructions on the shop floor or field site."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — core engineering subjects for the discipline applied for, per the current PSU notification."],
    examPattern: "Technical/trade subjects plus aptitude/reasoning/GK/English may be used, depending on the specific PSU's own recruitment notice.",
    selection: "Organization-specific written test/merit → trade/skill test or interview where prescribed → medical/document verification.",
    physical: "Not applicable unless the specific PSU notice mentions PET/PST/medical standards.",
    salary: "PSU pay/stipend varies widely by organization and whether the role is apprentice, contract or regular employee — check the specific PSU's pay structure.",
    promotions: "Promotion follows the PSU's internal service rules, seniority, departmental exams and vacancies — engineers can progress to senior technical/managerial grades.",
    posting: "Plants, factories, refineries, projects, workshops and field locations of the recruiting PSU.",
    advantages: ["Strong brand-name PSU employers with structured benefits.","Hands-on engineering exposure aligned with diploma training.","Reasonably stable employment once regularized."],
    disadvantages: ["Pay and job security differ significantly between apprentice/contract and regular posts — read the notice carefully.","Discipline/branch eligibility varies by PSU and must be matched exactly.","Plant/field postings can involve shift work or industrial hazards."],
    prep: ["Read the latest official PSU engineer trainee notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in your engineering discipline alongside aptitude and reasoning.","Solve previous-year papers for that specific PSU where available.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Diploma/degree certificate in the relevant engineering discipline","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "DIP-07": { // DMRC Junior Engineer
    jobWork: ["Junior Engineer duties overseeing Delhi Metro's civil, electrical, signalling or mechanical systems — inspection, maintenance oversight and technical documentation.","Follow DMRC rules, safety procedures and supervisory instructions; shift duty in depots/stations is common."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — core engineering subjects for the discipline applied for, per the current DMRC notification."],
    examPattern: "Technical subject, Reasoning, Quantitative Aptitude and English/GK as prescribed by the current DMRC JE notice.",
    selection: "DMRC recruitment may use CBT → trade/skill/medical or interview depending on the exact post.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "DMRC pay varies by cadre and whether the recruitment is regular or contract-based.",
    promotions: "Promotion follows DMRC's internal service rules, seniority, departmental exams and vacancies — JEs can progress to senior engineer/supervisory grades.",
    posting: "Metro depots, stations, workshops, Operations Control Centres (OCCs) and maintenance sections.",
    advantages: ["Modern, well-organised metro-rail work environment.","Structured pay and benefits for regular DMRC employees.","Engineering exposure aligned with diploma training."],
    disadvantages: ["Shift duty, including night shifts, is common for depot/station roles.","Contract vs regular recruitment terms can differ significantly — read the notice carefully.","Vacancies and recruitment cycles depend on network expansion."],
    prep: ["Read the latest official DMRC JE notification first.","Build a topic checklist from the official syllabus.","Build fundamentals in your engineering discipline alongside Reasoning and Quant.","Solve previous-year DMRC papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Diploma/degree certificate in the relevant engineering discipline","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable"]
  },
  "DIP-08": { // Railway Supervisor (RRB)
    jobWork: ["Supervisory duties across railway operations and maintenance — overseeing staff, work quality and safety compliance depending on the exact post.","Follow railway operating and safety procedures; supervisory posts often carry responsibility for a team or section."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Post-specific technical/operational subjects per the current RRB notification — use the exact syllabus annexure since supervisor posts vary widely."],
    examPattern: "Post-specific technical/operational subjects plus Maths, Reasoning, General Awareness and Science where prescribed; exact pattern depends on the CEN.",
    selection: "RRB CBT(s) → document verification → medical; exact stages depend on the CEN.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Pay level varies by the specific supervisor post — check the current CEN for exact figures.",
    promotions: "Promotion follows railway service rules, seniority, departmental exams and vacancies — supervisors can progress to senior operational/managerial grades.",
    posting: "Railway divisions, stations, yards, depots, workshops and offices.",
    advantages: ["Supervisory responsibility within a large, stable organisation.","Structured railway pay scale and allowances.","Clear promotion path within the railway hierarchy."],
    disadvantages: ["Eligibility and syllabus vary significantly by the exact supervisor post — read the notice carefully.","Field/operational responsibility can mean irregular hours.","Posting/transfer liability depending on zone."],
    prep: ["Read the latest official RRB Supervisor notification for the exact post first.","Build a topic checklist from the official syllabus.","Build fundamentals before attempting timed papers.","Solve previous-year papers for the specific post and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Diploma/degree and/or technical/operational credentials as specified","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "DIP-09": { // UPSSSC JE/UPPSC AE
    jobWork: ["Junior Engineer or Assistant Engineer duties in Uttar Pradesh's technical departments — site inspection, estimation, supervision of works and technical documentation.","Follow departmental rules, safety procedures and supervisory instructions; field/site visits are common."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","General Engineering (Paper-I) — basic engineering concepts across disciplines.","Detailed Civil/Electrical/Mechanical engineering syllabus (Paper-II) as per the branch applied for.","Use the exact syllabus annexure in the current UPSSSC/UPPSC notice — content differs by post (JE vs AE) and branch."],
    examPattern: "Paper-I: Reasoning, General Awareness and General Engineering. Paper-II: detailed Civil/Electrical/Mechanical engineering syllabus. Check the current notice for question count, marks, duration and negative marking.",
    selection: "SSC-style Paper-I CBT → Paper-II objective technical exam → document verification; post-specific standards where applicable.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Typically Pay Level-6, basic pay ₹35,400 under the 7th CPC framework, plus allowances.",
    promotions: "Promotion follows service rules, seniority, departmental exams, vacancies and cadre structure — JEs/AEs can progress to higher engineering grades within UP state departments.",
    posting: "Uttar Pradesh state technical departments (PWD, irrigation, electricity and similar).",
    advantages: ["Strong state-level technical career with clear pay structure.","Local (UP-based) postings are common.","Two recruiting bodies (UPSSSC for JE, UPPSC for AE) widen opportunities."],
    disadvantages: ["Two-stage technical exam demands strong branch-specific engineering knowledge.","JE (diploma) and AE (degree) eligibility differ — check which post you qualify for.","Site/field inspection duties can involve travel."],
    prep: ["Read the latest official UPSSSC JE / UPPSC AE notification for the exact post first.","Build a topic checklist from the official syllabus for both papers.","Build fundamentals in General Engineering before deep-diving into your branch's Paper-II syllabus.","Solve previous-year Paper-I/Paper-II papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Diploma certificate (for JE) or degree certificate (for AE) in the relevant engineering discipline","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Domicile certificate if required"]
  },
  "DIP-10": { // State Technical Assistant
    jobWork: ["Technical support duties assisting engineers in state infrastructure and utility departments — data collection, site assistance, documentation and basic technical checks.","Follow departmental rules, safety procedures and supervisory instructions."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, algebra, geometry.","Language — grammar, vocabulary, comprehension in the notified state language.","Technical — core subjects/trade theory for the specific discipline per the current state notification."],
    examPattern: "Technical subject plus aptitude/GK/language according to the recruiting state body.",
    selection: "Written/CBT/merit → technical or skill test where applicable → document/medical verification.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "State/organization-specific — check the exact department's pay matrix.",
    promotions: "Promotion follows state service rules, seniority, departmental exams and vacancies — Technical Assistants can progress to Junior Engineer or higher technical grades.",
    posting: "Technical departments, laboratories, field offices and projects.",
    advantages: ["Entry point into state technical departments with a path to engineering roles.","Local/home-state postings are common.","Structured allowances and retirement benefits."],
    disadvantages: ["Eligibility (diploma/degree/ITI) and pay vary widely by state and organization.","Recruitment cycles and vacancies depend on the specific department.","Assisting role may have slower promotion pace than direct JE entry."],
    prep: ["Read the latest official state Technical Assistant notification first.","Build a topic checklist from the official syllabus.","Revise your technical discipline alongside GK and Reasoning.","Solve previous-year papers where available and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Diploma/degree/ITI certificate as applicable","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Domicile certificate if required"]
  },
  "DIP-11": { // Navy/Army Technical Entry (SSC)
    jobWork: ["Technical training followed by command, engineering or administrative responsibilities in the Navy or Army, depending on the entry and branch.","Follow service-specific rules, operational protocols and command responsibilities; involves uniformed/field duty."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — core engineering subjects for the discipline/entry applied for, per the current notification."],
    examPattern: "Some entries are merit/shortlisting based (using academic record); others use an entrance examination. Check the entry-specific notice for exact subjects and marks.",
    selection: "Application → shortlisting → SSB/selection board → medical → merit/training, depending on the entry.",
    physical: "Defence medical and physical standards apply; eyesight and anthropometric standards can be strict and entry-specific.",
    salary: "Officer/technical trainee pay depends on the entry and commissioning terms; follows the defence service pay matrix once commissioned.",
    promotions: "Promotion follows defence service rules, seniority, performance and vacancies — officers progress through rank over a structured career.",
    posting: "Defence academies followed by service postings across India.",
    advantages: ["Prestigious officer-entry route combining technical training with military service.","Comprehensive training, leadership development and allowances.","Clear rank-based promotion path after commissioning."],
    disadvantages: ["Strict physical, medical and psychological screening (SSB).","Frequent transfers and demanding postings, including field/sea deployment.","Long, multi-stage selection process with strict eligibility windows."],
    prep: ["Read the latest official Navy/Army Technical Entry notification for the exact entry first.","Build a topic checklist from the official syllabus if a written exam applies.","Build fundamentals in your engineering discipline alongside GK and Reasoning.","Prepare for the SSB stage (group tasks, interview, psychology tests) well in advance.","Build physical fitness consistently alongside academic prep.","Solve previous-year papers where available and analyze mistakes."],
    documents: ["10+2/diploma/engineering certificates as applicable to the entry","Photo and signature in prescribed format","Government ID","Category/EWS certificate if applicable","Medical fitness documents where required"]
  },
  "DIP-12": { // Others (PSUs/State Technical Posts)
    jobWork: ["Cadre/posting-determined technical duties — equipment, systems, maintenance, inspection or testing — depending on the exact post advertised.","Follow departmental rules, safety procedures and supervisory instructions as applicable to the specific post."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Technical — core subjects/trade theory and discipline-specific concepts; use the exact syllabus annexure in the specific recruitment notice since this is a catch-all category."],
    examPattern: "The exact pattern, marks, duration and negative marking are recruitment-specific — always use the current official notification for the final pattern.",
    selection: "Usually application → written/CBT or merit screening → applicable skill/physical/technical stage → document verification → medical/appointment as prescribed.",
    physical: "Not applicable unless the specific recruitment notice mentions PET/PST/medical standards.",
    salary: "Pay/remuneration varies by department, pay level, organisation and posting — always confirm exact figures from the applicable notification/pay rules.",
    promotions: "Promotion follows the recruiting organisation's service rules, seniority, departmental exams, vacancies and performance.",
    posting: "Depends on the recruiting organisation, cadre, zone/circle and vacancy; transfers may apply.",
    advantages: ["Wide net of additional diploma-level technical posts beyond the major named exams.","Government/PSU/statutory employment structure and defined service rules where applicable.","Structured allowances and retirement benefits."],
    disadvantages: ["Because this spans many different posts, eligibility and pay vary widely — always verify the specific notice.","Competitive recruitment with uncertain notification cycles.","Promotion speed and posting quality depend heavily on the specific department."],
    prep: ["Identify the exact post and download its official notification first.","Build a topic checklist from that post's official syllabus.","Revise your technical discipline alongside general aptitude subjects.","Solve previous-year papers for that specific post/department where available.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["Diploma/degree/ITI certificate as applicable","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable","Domicile/local-language certificate if required"]
  }
};
jobs.forEach(j=>{
  if (fullGuidesDIP[j.code]) j.fullGuide = fullGuidesDIP[j.code];
});

/* ============================================================
   FULL GUIDE — After B.Tech tier (BT-01 .. BT-12)
   Same structure as the other tiers, sourced from the
   After-BTech flowchart reference docs.
   ============================================================ */
const fullGuidesBT = {
  "BT-01": { // GATE → PSU Jobs
    jobWork: ["Management/Engineer Trainee duties in major PSUs (ONGC, BHEL, IOCL, NTPC, BEL, HAL and similar) — plant operations, project engineering, maintenance and technical leadership after structured training.","Follow the PSU's safety procedures and supervisory instructions; postings can involve plant/field responsibility."],
    syllabus: ["The GATE syllabus for your engineering discipline is the core preparation — this route uses your GATE score directly for PSU shortlisting.","General Awareness — current affairs relevant to the PSU sector (energy, power, oil & gas) can help at the interview stage.","Discipline fundamentals — thermodynamics, strength of materials, electrical machines or equivalent core subjects depending on branch.","Use the exact PSU-specific interview/GD syllabus notes where the organisation publishes them alongside the GATE cutoff notice."],
    examPattern: "No separate PSU written exam in most cases — a valid GATE score in the notified discipline is used directly for shortlisting, followed by a PSU-specific interview/GD stage.",
    selection: "GATE score-based shortlisting → PSU interview/GD → document verification → medical → appointment as Management/Engineer Trainee.",
    physical: "Not applicable unless the specific PSU notice mentions PET/PST/medical standards for a particular post.",
    salary: "Pay Level 10 equivalent, roughly ₹60,000–₹1,80,000 CTC depending on the PSU, plus allowances.",
    promotions: "Promotion follows the PSU's internal service rules, seniority, performance appraisals and vacancies — trainees progress through executive grades (E1, E2...) over a career.",
    posting: "PSU plants, refineries, power stations, offices and project sites across India.",
    advantages: ["One GATE exam opens shortlisting at multiple major PSUs simultaneously.","Strong starting CTC and structured executive-grade career progression.","No separate PSU-specific written exam to prepare for in most cases."],
    disadvantages: ["Requires a strong GATE rank/score, which demands months of dedicated preparation.","PSU-wise cutoffs and vacancy numbers vary significantly year to year.","Postings can involve remote plant/field locations, especially early in the career."],
    prep: ["Build a full GATE-level foundation in your engineering discipline over 6–12 months.","Solve previous-year GATE papers by topic and analyze every mistake.","Track each target PSU's previous-year GATE cutoffs to gauge your required score.","Prepare for the PSU interview/GD stage separately — technical fundamentals plus current sector awareness.","Take full-length GATE mocks regularly under timed conditions.","Reserve time closer to results for PSU-specific application and interview prep."],
    documents: ["B.Tech/B.E. degree certificate and marksheets","GATE scorecard","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "BT-02": { // PSUs via Direct Recruitment
    jobWork: ["Management/Engineer Trainee duties at PSUs running their own direct-recruitment or campus drives (TATA Power, SAIL, BPCL and similar) — plant operations, project engineering and technical leadership.","Follow the PSU's safety procedures and supervisory instructions; postings can involve plant/field responsibility."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science, government schemes.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, algebra, geometry.","English/Language — grammar, vocabulary, comprehension.","Technical — core engineering subjects for the discipline applied for, per the specific PSU's own notification."],
    examPattern: "Technical discipline content plus aptitude/English/GK if a written exam is used; some PSUs also run campus placement drives with their own test/GD/interview format.",
    selection: "Direct PSU recruitment may use a written test, GATE, interview, group discussion, skill test or pure campus-placement merit — the exact route is PSU-specific.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Varies by PSU and grade; regular executive/non-executive pay (roughly ₹50,000–₹1,50,000 CTC) differs from apprentice/contract pay.",
    promotions: "Promotion follows the PSU's internal service rules, seniority, performance appraisals and vacancies — trainees progress through executive grades over a career.",
    posting: "Plants, projects, offices and field locations of the recruiting PSU.",
    advantages: ["Access to PSUs that don't use the GATE route, widening your options.","Some PSUs recruit via campus placement, which can be less competitive than GATE-based shortlisting.","Strong brand-name employers with structured executive-grade progression."],
    disadvantages: ["Selection route (written test vs GATE vs campus placement) varies by PSU and can change between recruitment cycles.","Vacancies are often smaller and less predictable than the major GATE-route PSUs.","Plant/field postings can involve shift work or industrial hazards."],
    prep: ["Identify each target PSU's exact recruitment route (test/GATE/campus) from its latest notification.","Build fundamentals in your engineering discipline alongside aptitude and reasoning.","Solve previous-year papers for that specific PSU where available.","Practice group discussion and interview skills, since many PSUs weigh these heavily.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["B.Tech/B.E. degree certificate and marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "BT-03": { // SSC JE (Through GATE)
    jobWork: ["Junior Engineer duties — site inspection, quality checks, estimation, supervision of works and technical documentation across Civil, Mechanical or Electrical disciplines in central departments (CPWD, CWC, MES and similar).","Follow departmental rules, safety procedures and supervisory instructions; site visits and field inspection are common."],
    syllabus: ["The GATE syllabus for your engineering discipline can substitute for Paper-II in some SSC JE cycles that accept a valid GATE score.","General Awareness — current affairs, polity, economy, history, geography, science, government schemes (for the common Paper-I).","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism (for Paper-I).","General Engineering (Paper-I) — basic engineering concepts across disciplines.","Use the exact SSC JE notice each cycle, since GATE-based screening availability can change year to year."],
    examPattern: "Paper-I: Reasoning, General Awareness and General Engineering (CBT). Where the GATE route applies, a valid GATE score can be used in place of the detailed Paper-II technical exam — check the current notice.",
    selection: "SSC Paper-I CBT → Paper-II objective technical exam (or GATE score where applicable) → document verification; post-specific standards where applicable.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Typically Pay Level-6, basic pay around ₹35,400 under the 7th CPC framework, plus allowances.",
    promotions: "Promotion follows service rules, seniority, departmental exams, vacancies and cadre structure — JEs can progress to Assistant Engineer and higher technical/supervisory grades.",
    posting: "Central Government engineering departments such as CPWD, CWC, MES and other notified organizations.",
    advantages: ["A strong GATE score can simplify or substitute for the technical Paper-II in eligible cycles.","Respected technical entry into central government engineering departments.","Clear promotion path toward Assistant Engineer roles."],
    disadvantages: ["Whether GATE-based screening is available depends on the specific year's notice — always verify before relying on it.","Site/field inspection duties can involve travel.","Vacancies vary year to year by department and branch."],
    prep: ["Read the latest official SSC JE notification first to confirm whether the GATE route applies this cycle.","Build a topic checklist from the official syllabus for Paper-I (and Paper-II if GATE isn't accepted).","Build fundamentals in General Engineering and your GATE discipline.","Solve previous-year Paper-I papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["B.Tech/B.E. degree certificate in the relevant engineering discipline","GATE scorecard if applying through the GATE route","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "BT-04": { // DRDO Scientist B
    jobWork: ["Scientist-level research and development work at DRDO's defence research laboratories — projects spanning missiles, electronics, materials, aeronautics and more depending on the lab and discipline.","Follow departmental rules, safety procedures and supervisory instructions in a research/lab environment."],
    syllabus: ["The GATE syllabus for your engineering discipline is the core technical preparation, since GATE score is often used for shortlisting.","General Awareness — current affairs relevant to defence and technology can help at the interview stage.","Discipline fundamentals — core subjects matching your B.Tech branch and the DRDO lab's focus area.","Use the exact RAC (Recruitment & Assessment Centre) notice for the current cycle's exact process."],
    examPattern: "GATE score is typically used for shortlisting; the discipline syllabus tested is the standard GATE syllabus for that branch.",
    selection: "GATE-based shortlisting → personal interview → final merit/medical as prescribed by RAC (DRDO's Recruitment & Assessment Centre).",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Scientist 'B' is an officer-level Central Government scientific post; pay level around ₹56,100–₹1,77,500 (Level 10) plus allowances.",
    promotions: "Promotion follows DRDO service rules, seniority, departmental exams, vacancies and performance — Scientists progress through Scientist 'C', 'D' and higher grades over a research career.",
    posting: "DRDO laboratories and establishments across India.",
    advantages: ["Prestigious defence research career with meaningful, cutting-edge project work.","Strong officer-level pay and Central Government benefits.","Clear scientist-grade promotion path over a long-term research career."],
    disadvantages: ["Requires a very strong GATE score/rank in a competitive process.","Vacancies are limited compared to larger PSU or SSC-scale recruitment.","Lab/project posting is assigned, not always matching personal location preference."],
    prep: ["Build a full GATE-level foundation in your engineering discipline over 6–12 months.","Solve previous-year GATE papers by topic and analyze every mistake.","Track DRDO's previous-year GATE cutoffs for Scientist 'B' in your discipline.","Prepare for the personal interview stage — technical depth plus awareness of DRDO's work areas.","Take full-length GATE mocks regularly under timed conditions.","Reserve time closer to results for interview-specific preparation."],
    documents: ["B.Tech/B.E. degree certificate (first class) and marksheets","GATE scorecard","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "BT-05": { // ISRO Scientist/Engineer SC
    jobWork: ["Scientist/Engineer-level work on India's space research, satellite and launch vehicle programmes at ISRO centres.","Follow departmental rules, safety procedures and supervisory instructions in a research/lab/launch-facility environment."],
    syllabus: ["ISRO's own discipline-specific written test syllabus — closely aligned to core engineering subjects but with ISRO-specific weightage, not identical to the standard GATE pattern.","Discipline fundamentals — core subjects matching your B.Tech branch (mechanical, electronics, computer science and similar).","General aptitude/reasoning components where included in the specific year's notice.","Use the exact ISRO Centralised Recruitment Board (ICRB) notice for the current cycle's syllabus."],
    examPattern: "ISRO written test (discipline-specific engineering syllabus) → interview for scientist/engineer posts; exact pattern and marks follow the current ICRB notice.",
    selection: "ISRO written test → interview for scientist/engineer posts (technician posts use a written test plus skill test instead).",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "ISRO regular Scientist/Engineer 'SC' posts use Government pay levels (roughly Level 10, ₹56,100–₹1,77,500) plus allowances.",
    promotions: "Promotion follows ISRO service rules, seniority, departmental exams, vacancies and performance — Engineers/Scientists progress through 'SD', 'SE' and higher grades over a career.",
    posting: "ISRO centres, launch facilities, laboratories and project sites across India.",
    advantages: ["Work on India's flagship space programmes with strong national significance.","Structured Central Government pay level and allowances.","Clear scientist/engineer-grade promotion path over a long-term career."],
    disadvantages: ["ISRO's own written test is a separate, discipline-specific exam requiring dedicated preparation beyond just GATE.","Vacancies are limited compared to larger PSU or SSC-scale recruitment.","Posting is spread across specific ISRO centres, not all locations."],
    prep: ["Read the latest official ISRO ICRB notification first.","Build a topic checklist from ISRO's discipline-specific syllabus, not just the GATE syllabus.","Build fundamentals in your engineering discipline thoroughly.","Solve previous-year ISRO written test papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Prepare for the interview stage with a strong grasp of your discipline's fundamentals."],
    documents: ["B.Tech/B.E. degree certificate (strong academic record) and marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "BT-06": { // BARC/NPCIL Engineer
    jobWork: ["Scientific Officer and engineer work in India's atomic energy establishments — nuclear power plant engineering, reactor operations, research and safety systems.","Follow departmental rules, strict safety procedures and supervisory instructions in a nuclear research/plant environment."],
    syllabus: ["Engineering discipline fundamentals matching your B.Tech branch — core subjects tested via written exam, GATE or institute-specific selection depending on the route.","General Awareness and aptitude components where included in the specific route's notice.","BARC Training School route — a structured one-year training programme with its own selection/orientation content.","Use the exact BARC/NPCIL notice for the current cycle's exact process (OGET, GATE-based, or institute-specific)."],
    examPattern: "Engineering discipline fundamentals and aptitude/technical content according to the recruitment route used (BARC OGET-style written exam, GATE shortlisting, or institute-specific selection).",
    selection: "Written/online exam and/or GATE shortlisting → interview → medical/document verification; BARC Training School route adds a one-year training period before final placement.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "Scientific/engineering officer pay (roughly Level 10, ₹56,100–₹1,77,500) varies by organization and training/appointment scheme, plus allowances.",
    promotions: "Promotion follows BARC/NPCIL service rules, seniority, departmental exams, vacancies and performance — Scientific Officers progress through senior grades over a long-term career.",
    posting: "Nuclear research, power plant, reactor, engineering and project sites across India.",
    advantages: ["Work in India's strategic nuclear energy and research programmes.","Strong officer-level pay and Central Government benefits.","BARC Training School route includes comprehensive structured training."],
    disadvantages: ["Selection route (OGET vs GATE vs institute-specific) varies and demands checking the exact current notice.","Nuclear facility postings carry strict safety and security protocols.","Vacancies are limited compared to larger PSU or SSC-scale recruitment."],
    prep: ["Read the latest official BARC/NPCIL notification to confirm the exact selection route this cycle.","Build a topic checklist from the official syllabus for your route.","Build fundamentals in your engineering discipline thoroughly.","Solve previous-year OGET or route-specific papers where available and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Prepare for the interview stage with strong discipline fundamentals."],
    documents: ["B.Tech/B.E. degree certificate in the notified branch and marksheets","GATE scorecard if applying through the GATE route","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "BT-07": { // Indian Army TES Entry
    jobWork: ["Officer training combined with completing an engineering degree during service (for Class 12 PCM entrants) or direct technical officer duties (for B.Tech graduates through separate technical entries) in Army engineering/technical branches.","Follow Army rules, safety procedures and command instructions; involves uniformed/field duty."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, algebra, geometry.","Language — grammar, vocabulary, comprehension.","TES route may use JEE Main-based shortlisting instead of a separate written syllabus; SSB assesses officer potential rather than academic content."],
    examPattern: "The current TES route may use JEE Main-based shortlisting for Class 12 entrants; SSB assesses officer potential (group tasks, interview, psychology tests) rather than a conventional written syllabus.",
    selection: "Application/shortlisting (JEE Main-based for TES) → SSB → medical → merit → training (engineering degree completed during service for TES).",
    physical: "Army medical and physical standards apply; eyesight and anthropometric standards can be strict and entry-specific.",
    salary: "Officer cadet/training pay applies during training; commissioned officer pay follows Army rules once commissioned.",
    promotions: "Promotion follows Army service rules, seniority, performance and vacancies — officers progress through rank over a structured career.",
    posting: "Training academies followed by Army engineering/technical postings.",
    advantages: ["TES lets you earn a fully-funded engineering degree while training as an officer.","Prestigious officer-entry route with strong career structure and leadership development.","Clear rank-based promotion path after commissioning."],
    disadvantages: ["Strict physical, medical and psychological screening (SSB).","TES entry age window is narrow (16.5–19.5 years) — B.Tech holders typically use separate technical-graduate entries instead.","Frequent transfers and demanding postings, including field areas."],
    prep: ["Read the latest official Indian Army TES/technical-entry notification for the exact scheme first.","If applying via TES, prepare for JEE Main-based shortlisting alongside Class 12 studies.","If applying as a B.Tech graduate, check the specific technical-entry scheme's eligibility and process.","Prepare for the SSB stage (group tasks, interview, psychology tests) well in advance.","Build physical fitness consistently alongside academic prep.","Solve previous-year papers where available and analyze mistakes."],
    documents: ["Class 12 marksheet with PCM (for TES) or B.Tech/B.E. degree certificate (for graduate technical entries)","Photo and signature in prescribed format","Government ID","Category/EWS certificate if applicable","Medical fitness documents where required"]
  },
  "BT-08": { // Indian Navy SSC Technical
    jobWork: ["Short Service Commission officer duties in the Navy's Executive, Engineering or Electrical branches — technical management of ships, systems and equipment.","Follow Navy rules, safety procedures and command instructions; involves shipboard/uniformed duty."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Usually no separate written exam; shortlisting is largely based on your B.Tech academic record, with SSB central to selection."],
    examPattern: "Usually no separate written exam; shortlisting and SSB are central to selection rather than a conventional written syllabus.",
    selection: "Application → shortlisting (based on academic record) → SSB → medical → merit → training/commission.",
    physical: "Navy medical and physical standards are strict and branch-specific; eyesight and anthropometric standards matter.",
    salary: "Officer entry uses defence officer pay and allowances after commissioning; training-stage terms depend on entry.",
    promotions: "Promotion follows Navy service rules, seniority, performance and vacancies — SSC officers can extend service or move toward permanent commission depending on policy and performance.",
    posting: "Defence training establishments, ships/bases/stations and technical units.",
    advantages: ["Prestigious short-service officer entry using your existing B.Tech qualification directly.","No lengthy separate written exam — shortlisting is largely academic-record based.","Strong technical leadership exposure aboard naval vessels and systems."],
    disadvantages: ["Strict physical, medical and psychological screening (SSB).","Short Service Commission has a defined tenure, not automatic permanent service.","Frequent transfers and demanding postings, including long sea deployments."],
    prep: ["Read the latest official Indian Navy SSC Technical notification for the exact branch first.","Ensure your B.Tech academic record meets the shortlisting criteria.","Prepare thoroughly for the SSB stage (group tasks, interview, psychology tests).","Build physical fitness consistently ahead of the SSB and subsequent training.","Research the specific branch (Executive/Engineering/Electrical) to align your application.","Reach out to previous candidates or coaching resources for SSB-specific preparation if needed."],
    documents: ["B.Tech/B.E. degree certificate in the notified discipline and marksheets","Photo and signature in prescribed format","Government ID","Category/EWS certificate if applicable","Medical fitness documents where required"]
  },
  "BT-09": { // Air Force SSC Tech
    jobWork: ["Short Service Commission officer duties in the Air Force's Aeronautical Engineering (Mechanical/Electronics) or other technical branches — maintenance oversight, technical management of aircraft and systems.","Follow Air Force rules, safety procedures and command instructions; involves uniformed/technical station duty."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Usually no separate written exam; shortlisting is largely based on your B.Tech academic record, with SSB central to selection."],
    examPattern: "Usually no separate written exam; shortlisting and SSB are central to selection rather than a conventional written syllabus.",
    selection: "Application → shortlisting (based on academic record) → SSB → medical → merit → training/commission.",
    physical: "Air Force medical and physical standards are strict and branch-specific; eyesight and anthropometric standards matter.",
    salary: "Officer entry uses defence officer pay and allowances after commissioning; training-stage terms depend on entry.",
    promotions: "Promotion follows Air Force service rules, seniority, performance and vacancies — SSC officers can extend service or move toward permanent commission depending on policy and performance.",
    posting: "Defence training establishments, air force stations and technical units.",
    advantages: ["Prestigious short-service officer entry using your existing B.Tech qualification directly.","No lengthy separate written exam — shortlisting is largely academic-record based.","Strong technical leadership exposure managing advanced aircraft and ground systems."],
    disadvantages: ["Strict physical, medical and psychological screening (SSB).","Short Service Commission has a defined tenure, not automatic permanent service.","Frequent transfers and demanding technical-station postings."],
    prep: ["Read the latest official Air Force SSC Tech notification for the exact branch first.","Ensure your B.Tech academic record meets the shortlisting criteria.","Prepare thoroughly for the SSB stage (group tasks, interview, psychology tests).","Build physical fitness consistently ahead of the SSB and subsequent training.","Research the specific technical branch to align your application.","Reach out to previous candidates or coaching resources for SSB-specific preparation if needed."],
    documents: ["B.Tech/B.E. degree certificate in the notified discipline and marksheets","Photo and signature in prescribed format","Government ID","Category/EWS certificate if applicable","Medical fitness documents where required"]
  },
  "BT-10": { // UPSC Engineering Services (IES/ESE)
    jobWork: ["Class I/II engineering officer duties across central departments like Railways, Roads, Telecom and Power — technical planning, execution and supervision of major infrastructure projects.","Follow departmental rules, safety procedures and supervisory instructions; postings carry significant technical and administrative responsibility."],
    syllabus: ["General Studies & Engineering Aptitude — current affairs, ethics, general engineering principles for Prelims Paper-I.","Engineering discipline paper — Civil, Mechanical, Electrical or Electronics & Telecom, for Prelims Paper-II.","Two conventional (descriptive) papers in the chosen engineering discipline for Mains.","Use the exact UPSC ESE syllabus annexure for your discipline — content is extensive and discipline-specific."],
    examPattern: "Prelims: General Studies & Engineering Aptitude (Paper-I) plus an Engineering discipline paper (Paper-II). Mains: two conventional/descriptive papers in the chosen discipline. Followed by a Personality Test.",
    selection: "UPSC Preliminary → Main engineering papers (descriptive) → Personality Test → final merit.",
    physical: "Not applicable unless a specific allied service requires PET/PST/medical standards.",
    salary: "Group A engineering officer pay (roughly Level 10, ₹56,100–₹1,77,500) with central allowances; service/cadre determines further progression.",
    promotions: "Promotion follows service rules, seniority, departmental exams, vacancies and performance — ESE officers progress through the engineering service hierarchy, potentially reaching senior policy/leadership positions.",
    posting: "Railways, CPWD, defence, telecom, roads, water and other engineering services depending on cadre allocated.",
    advantages: ["One of India's most prestigious engineering-officer entry exams.","Strong Group A pay and structured career progression.","Wide range of central engineering services/cadres to be allocated to."],
    disadvantages: ["Extremely competitive with a long, multi-stage exam and low success rate.","Mains uses descriptive/conventional papers demanding strong writing and depth of knowledge.","Preparation typically takes 8–12+ months of sustained, focused effort."],
    prep: ["Build strong fundamentals in your engineering discipline from standard textbooks before attempting the ESE-specific syllabus.","Practice conventional/descriptive answer-writing regularly for Mains, not just objective practice.","Solve previous-year Prelims and Mains papers and analyze mistakes carefully.","Take Prelims mock tests seriously under timed, negative-marking conditions.","Stay updated on current affairs relevant to engineering and infrastructure policy.","Reserve dedicated time for Personality Test preparation closer to the interview stage."],
    documents: ["B.Tech/B.E. degree certificate in the eligible branch and marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  },
  "BT-11": { // State Engineering Services
    jobWork: ["Assistant Engineer duties in state technical departments — planning, supervision and execution of state infrastructure projects (roads, water, irrigation, electricity and similar).","Follow state departmental rules, safety procedures and supervisory instructions; site inspection and project oversight are common."],
    syllabus: ["General Studies & Engineering Aptitude — current affairs, ethics, general engineering principles for Prelims-style papers.","Engineering discipline paper — Civil, Mechanical, Electrical or the relevant branch, per the state's own scheme.","Conventional/descriptive engineering papers for the Mains-equivalent stage where the state follows a UPSC-style structure.","Use the exact state PSC/board syllabus annexure — structure and weightage vary significantly by state."],
    examPattern: "Prelims: General Studies & Engineering Aptitude plus an Engineering discipline paper. Mains: two conventional papers in the chosen engineering discipline, where the state follows a UPSC-style structure; exact pattern is state-specific.",
    selection: "State written exam (Prelims → Mains where applicable) → Personality Test/interview where prescribed → document verification → final merit.",
    physical: "Not applicable unless the recruitment notice specifies PET/PST/medical standards.",
    salary: "State pay scale (roughly ₹44,900–₹1,42,400) with allowances; varies by state and cadre.",
    promotions: "Promotion follows state service rules, seniority, departmental exams, vacancies and performance — Assistant Engineers progress to Executive Engineer and higher grades within the state cadre.",
    posting: "State PWD, irrigation, electricity, water and other engineering departments across the state.",
    advantages: ["State-level equivalent of UPSC ESE with strong local relevance and standing.","Structured career progression within the state engineering cadre.","Local/home-state postings are common."],
    disadvantages: ["Highly competitive, particularly for well-known states with strong candidate pools.","Syllabus, pattern and exam structure vary significantly by state, demanding state-specific preparation.","Posting and transfer liability across the state."],
    prep: ["Read the latest official state engineering services notification for the exact state and discipline first.","Build strong fundamentals in your engineering discipline from standard textbooks.","Practice conventional/descriptive answer-writing if the state follows a Mains-style structure.","Solve previous-year state papers and analyze mistakes.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for state and national current affairs."],
    documents: ["B.Tech/B.E. degree certificate in the eligible branch and marksheets","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD certificate if applicable","Domicile certificate if required"]
  },
  "BT-12": { // Others (PSUs/Research Organizations)
    jobWork: ["Cadre/posting-determined engineering, research or technical duties depending on the exact post advertised by the PSU or research organisation.","Follow departmental rules, safety procedures and supervisory instructions as applicable to the specific post."],
    syllabus: ["General Awareness — current affairs, polity, economy, history, geography, science.","Reasoning — analogy, classification, series, coding-decoding, directions, syllogism.","Quantitative Aptitude — number system, percentages, ratio/proportion, averages, algebra, geometry.","Language — grammar, vocabulary, comprehension.","Discipline-specific technical syllabus — use the exact syllabus annexure in the specific recruitment notice since this is a catch-all category."],
    examPattern: "Discipline-specific technical syllabus plus aptitude where prescribed; exact pattern, marks and duration are recruitment-specific — always use the current official notification.",
    selection: "Organization-specific written test, GATE score, NET, interview or skill test — the exact route varies by organisation and post.",
    physical: "Not applicable unless the specific recruitment notice mentions PET/PST/medical standards.",
    salary: "Organization-specific scientific/engineering pay and allowances — always confirm exact figures from the applicable notification.",
    promotions: "Promotion follows the recruiting organisation's service rules, seniority, departmental exams, vacancies and performance.",
    posting: "Laboratories, research centres, project sites and technical establishments.",
    advantages: ["Wide net of additional B.Tech-level scientist/engineer posts beyond the major named exams.","Government/PSU/statutory employment structure and defined service rules where applicable.","Structured allowances and retirement benefits."],
    disadvantages: ["Because this spans many different posts, eligibility and selection route vary widely — always verify the specific notice.","Competitive recruitment with uncertain notification cycles.","Promotion speed and posting quality depend heavily on the specific organisation."],
    prep: ["Identify the exact post and download its official notification first.","Confirm whether the route uses GATE, NET, a written test or direct interview.","Build fundamentals in your engineering discipline alongside general aptitude subjects.","Solve previous-year papers for that specific post/organisation where available.","Take full mocks regularly and maintain an error notebook.","Reserve weekly time for current affairs and revision."],
    documents: ["B.Tech/B.E. degree certificate (or PG/professional qualification as required) and marksheets","GATE/NET scorecard if applicable","Photo and signature in prescribed format","Government ID","Category/EWS/PwBD/Ex-serviceman certificate if applicable"]
  }
};
jobs.forEach(j=>{
  if (fullGuidesBT[j.code]) j.fullGuide = fullGuidesBT[j.code];
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
 * opts: { fullscreen?: boolean }
 */
function openSheet({ title, code, color, tierLabel, tabs, fullscreen }){
  lastFocused = document.activeElement;
  sheetHead.style.background = color;
  sheetCode.textContent = code || '';
  sheetCode.style.display = code ? '' : 'none';
  sheetTitle.textContent = title;
  sheetTier.textContent = tierLabel || '';

  overlay.classList.toggle('fullscreen', !!fullscreen);

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
  overlay.classList.remove('fullscreen');
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
      ...(job.fullGuide ? [{ key:'fullguide', label:'Full Guide', render:(el)=>renderFullGuide(el, job.fullGuide) }] : []),
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

/* ---------- Full Guide rendering (deep-dive tab, when a job has fullGuide data) ---------- */
function renderFullGuide(panel, g){
  const list = (arr)=> `<ul class="stage-list">${arr.map(x=>`<li>${x}</li>`).join('')}</ul>`;
  const orderedList = (arr)=> `<ol class="road-map">${arr.map((x,i)=>`<li><span class="rm-num">${i+1}</span><div class="rm-body"><p>${x}</p></div></li>`).join('')}</ol>`;
  panel.innerHTML = `
    <h4>Job Work</h4>
    ${list(g.jobWork)}
    <h4>Complete Syllabus</h4>
    ${list(g.syllabus)}
    <h4>Exam Pattern & Marks</h4>
    <p class="overview-text">${g.examPattern}</p>
    <h4>Recruitment / Selection Process</h4>
    <p class="overview-text">${g.selection}</p>
    <h4>Physical Requirements</h4>
    <p class="overview-text">${g.physical}</p>
    <h4>Salary + Approx. In-Hand</h4>
    <p class="overview-text">${g.salary}</p>
    <h4>Promotions & Career Growth</h4>
    <p class="overview-text">${g.promotions}</p>
    <h4>Posting / Work Location</h4>
    <p class="overview-text">${g.posting}</p>
    <h4>Advantages</h4>
    ${list(g.advantages)}
    <h4>Disadvantages</h4>
    ${list(g.disadvantages)}
    <h4>Preparation Strategy</h4>
    ${orderedList(g.prep)}
    <h4>Document Checklist</h4>
    ${list(g.documents)}
    <div class="note-box">This is a structured reference built from a career-flowchart source. Eligibility, age, vacancies, syllabus, selection stages, pay and physical standards can change — the latest official recruitment notification is the final authority.</div>
  `;
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
const userPapers = [
 { title: "SSC-CGL-T-I-Similar-Paper-12-Sep-2025-S1-English.pdf", url: "https://drive.google.com/file/d/1z6cl35kcrfTMso-FK4zSuYxVmHI3IFwZ/view?usp=drive_link" },
   { title: "SSC-CGL-QUESTION-PAPER-13-Aug-2021-Shift-1-English", url: "https://drive.google.com/file/d/1hV2ljDa0cQ3a2d3PXcrbAoELy3eVR3Hb/view?usp=sharing" },
   { title: "SSC-CGL-Tier-1-Question-Paper-English_09_09_2024", url: "https://drive.google.com/file/d/1oQ0pve3M2Q7E3QplLPaQrVwQYVJXhlTM/view?usp=drive_link" },
   { title: "SSC-CGL-Tier-1-Question-Paper_14_07_2023", url: "https://drive.google.com/file/d/1RTFsKH_e484xoSb4bzxLnIKmG3gML9ko/view?usp=drive_link" },
   { title: "RRB-NTPC-CBT-I-Question-Paper_16-03-2026_S1-2", url: "https://drive.google.com/file/d/10CS_4iE9muDNDEI6308GKJWhaMdXtjsB/view?usp=drive_link" },
   { title: "RRB-NTPC-2025-CBT-I-Question-Paper_16-03-2026_S1-2", url: "https://drive.google.com/file/d/1sepu-w6TBAh5Wa2FrWi-PbnibQDkqhfm/view?usp=drive_link" },
   { title: "RRB-NTPC-2019-CBT-1-Question-Paper-1", url: "https://drive.google.com/file/d/1rz-8ZhN2V8kJtg2Dw2XElOxG96whdmCZ/view?usp=drive_link" },
   { title: "RRB-NTPC-2019-CBT-1-Question-Paper-1", url: "https://drive.google.com/file/d/195FMkB-SgoNwae9NEnBjv9LSjH4YEVqa/view?usp=drive_link" },
   { title: "RRB-NTPC-2019-01_04_2021_-10_30-am-to-12_00-Paper-1", url: "https://drive.google.com/file/d/1CrU4c_Tfm43DBGEeX7qlr-m08uEphWI7/view?usp=drive_link" },
];

/* ============================================================
   YOUR OWN E-BOOKS & GUIDES — Google Drive / OneDrive links
   Add one entry per e-book here: { title, url }.
   Same idea as userPapers above — send me links and titles,
   or edit this array yourself.
   ============================================================ */
const userEbooks = [
  // { title: "General Studies Complete Guide", url: "https://drive.google.com/file/d/XXXXXXXX/view?usp=sharing" },
];

/* ---------- Shared search-filtered list renderer ---------- */
function renderSearchableList(panel, items, opts){
  const { searchPlaceholder, emptyMessage, itemLabel } = opts;
  panel.innerHTML = `
    <div class="doc-search-wrap">
      <input type="text" class="doc-search" id="${panel.id}-search" placeholder="${searchPlaceholder}" autocomplete="off">
    </div>
    <ul class="stage-list" id="${panel.id}-list"></ul>
    <p class="doc-empty" id="${panel.id}-empty" style="display:none;">${emptyMessage}</p>
  `;
  const listEl = panel.querySelector(`#${panel.id}-list`);
  const emptyEl = panel.querySelector(`#${panel.id}-empty`);
  const searchEl = panel.querySelector(`#${panel.id}-search`);

  function draw(filter){
    const f = filter.trim().toLowerCase();
    const filtered = items.filter(it => it.title.toLowerCase().includes(f));
    if (filtered.length === 0){
      listEl.innerHTML = '';
      emptyEl.style.display = 'block';
      emptyEl.textContent = items.length === 0 ? emptyMessage : `No ${itemLabel} match "${filter}".`;
    } else {
      emptyEl.style.display = 'none';
      listEl.innerHTML = filtered.map(it=>`<li><b>${it.title}</b><p><a href="${it.url}" target="_blank" rel="noopener">Open / Download</a></p></li>`).join('');
    }
  }
  searchEl.addEventListener('input', ()=> draw(searchEl.value));
  draw('');
}

/* ============================================================
   PREVIOUS YEAR PAPERS — grouped by exam body, official links
   ============================================================ */
function openPreviousPapers(){
  openSheet({
    title:'Previous Year Papers',
    code:'OFFICIAL SOURCES ONLY',
    color:'#1565c0',
    tierLabel:'Exam Preparation Dashboard',
    fullscreen: true,
    tabs:[
      {
        key:'uploaded', label:'Your Uploaded Papers', render:(el)=>{
          renderSearchableList(el, userPapers, {
            searchPlaceholder:'Search your uploaded papers (e.g. "SSC CGL 2023")…',
            emptyMessage:'No papers uploaded yet.',
            itemLabel:'papers'
          });
        }
      },
      {
        key:'official', label:'Official Sources', html:`
          <p class="overview-text">Always download official previous year papers from the recruiting body's own site — third-party PDFs can be outdated, mislabelled or simply wrong.</p>
          <ul class="stage-list">
            <li><b>SSC (CGL, CHSL, MTS, GD, JE, Stenographer)</b><p>Official papers/answer-key portal: <a href="https://ssc.gov.in/for-candidates/previous-year-question-paper" target="_blank" rel="noopener">ssc.gov.in — Previous Year Question Paper</a></p></li>
            <li><b>UPSC (Civil Services, CDS, NDA, CAPF, Engineering Services)</b><p>Official archive: <a href="https://upsc.gov.in/examinations/previous-question-papers" target="_blank" rel="noopener">upsc.gov.in — Previous Question Papers</a></p></li>
            <li><b>Railway / RRB (NTPC, Group D, ALP, JE)</b><p>Official portal: <a href="https://rrb.indianrailways.gov.in" target="_blank" rel="noopener">rrb.indianrailways.gov.in</a> — response sheets and answer keys are posted under each CEN notification after the exam, not as a standing archive.</p></li>
            <li><b>Banking (IBPS PO/Clerk, SBI, RBI)</b><p>Official sites: <a href="https://www.ibps.in" target="_blank" rel="noopener">ibps.in</a>, <a href="https://sbi.co.in/web/careers" target="_blank" rel="noopener">sbi.co.in/web/careers</a>, <a href="https://opportunities.rbi.org.in" target="_blank" rel="noopener">opportunities.rbi.org.in</a> — these exams are fully computer-based and full papers usually aren't released; only your own response sheet/scorecard is provided post-exam.</p></li>
            <li><b>State PSC / State Police / Other State Exams</b><p>No single national archive exists — each state commission publishes its own. Start at <a href="https://www.ncs.gov.in" target="_blank" rel="noopener">ncs.gov.in</a> (National Career Service) to find the right state board.</p></li>
          </ul>
          <div class="note-box">If a body doesn't publicly release full papers (common for CBT-based exams), your best substitute is the response sheet you can download from your own login after the exam, plus the official syllabus/exam-pattern PDF in the same notification.</div>
        `
      }
    ]
  });
}

/* ============================================================
   E-BOOKS & GUIDES
   ============================================================ */
function openEbooks(){
  openSheet({
    title:'E-Books & Guides',
    code:'STUDY MATERIAL',
    color:'#1565c0',
    tierLabel:'Exam Preparation Dashboard',
    fullscreen: true,
    tabs:[
      {
        key:'ebooks', label:'Your Uploaded E-Books', render:(el)=>{
          renderSearchableList(el, userEbooks, {
            searchPlaceholder:'Search your e-books & guides (e.g. "General Studies")…',
            emptyMessage:'No e-books uploaded yet. Send me your Google Drive/OneDrive links and titles and I\'ll add them to the userEbooks list in script.js.',
            itemLabel:'e-books'
          });
        }
      }
    ]
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
    fullscreen: true,
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

  // E-Books & Guides card
  const ebooksCard = document.getElementById('card-ebooks');
  if (ebooksCard) ebooksCard.addEventListener('click', openEbooks);
});

try{
  var count = parseInt(localStorage.getItem('g2g_visit_count') || '0', 10) + 1;
  localStorage.setItem('g2g_visit_count', count);
}catch(e){}

/* ============================================================
   AUTH SYSTEM (client-side demo)
   Stored only in this browser's localStorage — there is no
   server or database here, so this is NOT secure real
   authentication. It's enough to gate a feature per-browser
   for a static site; a production version would need a real
   backend to store accounts and verify passwords safely.
   ============================================================ */
const AUTH_USERS_KEY = 'g2g_users';
const AUTH_SESSION_KEY = 'g2g_session';

function getUsers(){
  try{ return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '[]'); }
  catch(e){ return []; }
}
function saveUsers(users){
  try{ localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users)); }catch(e){}
}
function getCurrentUser(){
  const email = localStorage.getItem(AUTH_SESSION_KEY);
  if (!email) return null;
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}
function setSession(email){
  try{ localStorage.setItem(AUTH_SESSION_KEY, email); }catch(e){}
}
function clearSession(){
  try{ localStorage.removeItem(AUTH_SESSION_KEY); }catch(e){}
}
// Simple obfuscation only — NOT cryptographic security.
function obfuscate(str){
  try{ return btoa(unescape(encodeURIComponent(str))); }catch(e){ return str; }
}

function signUp(name, email, password){
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())){
    return { ok:false, error:'An account with this email already exists — try logging in instead.' };
  }
  users.push({ name: name.trim(), email: email.trim(), passHash: obfuscate(password) });
  saveUsers(users);
  setSession(email.trim());
  return { ok:true };
}
function logIn(email, password){
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  if (!user) return { ok:false, error:'No account found with this email. Try signing up.' };
  if (user.passHash !== obfuscate(password)) return { ok:false, error:'Incorrect password.' };
  setSession(user.email);
  return { ok:true };
}
function logOut(){
  clearSession();
  refreshAuthUI();
}

function refreshAuthUI(){
  const user = getCurrentUser();
  const authBtn = document.getElementById('authBtn');
  const signupBtn = document.getElementById('signupBtn');
  const userMenu = document.getElementById('userMenu');
  const mockLocked = document.getElementById('mockLocked');
  const mockUnlocked = document.getElementById('mockUnlocked');
  const mockWelcome = document.getElementById('mockWelcome');

  if (user){
    authBtn.textContent = 'Hi, ' + user.name.split(' ')[0] + ' ▾';
    if (signupBtn) signupBtn.style.display = 'none';
    if (mockLocked) mockLocked.style.display = 'none';
    if (mockUnlocked) mockUnlocked.style.display = 'block';
    if (mockWelcome) mockWelcome.textContent = `Signed in as ${user.name}. Pick a qualification and an exam/job role below, then start your timed mock exam.`;
  } else {
    authBtn.textContent = 'Sign In';
    if (signupBtn) signupBtn.style.display = '';
    userMenu.classList.remove('open');
    if (mockLocked) mockLocked.style.display = 'block';
    if (mockUnlocked) mockUnlocked.style.display = 'none';
  }
}

/* ---------- Auth modal wiring ---------- */
const authOverlay = document.getElementById('authOverlay');
document.body.appendChild(authOverlay);

function openAuthModal(defaultTab){
  document.getElementById('loginError').textContent = '';
  document.getElementById('signupError').textContent = '';
  document.querySelectorAll('.auth-tab-btn').forEach(b=>b.classList.remove('active'));
  const tab = defaultTab || 'login';
  document.querySelector(`.auth-tab-btn[data-authtab="${tab}"]`).classList.add('active');
  document.getElementById('loginForm').style.display = tab === 'login' ? 'flex' : 'none';
  document.getElementById('signupForm').style.display = tab === 'signup' ? 'flex' : 'none';
  authOverlay.classList.add('open');
  lockBackgroundScroll();
}
function closeAuthModal(){
  authOverlay.classList.remove('open');
  unlockBackgroundScroll();
}
document.getElementById('authCloseBtn').addEventListener('click', closeAuthModal);
authOverlay.addEventListener('click', (e)=>{ if (e.target === authOverlay) closeAuthModal(); });

document.querySelectorAll('.auth-tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.auth-tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.authtab;
    document.getElementById('loginForm').style.display = tab === 'login' ? 'flex' : 'none';
    document.getElementById('signupForm').style.display = tab === 'signup' ? 'flex' : 'none';
  });
});

document.getElementById('loginForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const res = logIn(email, password);
  const errEl = document.getElementById('loginError');
  if (!res.ok){ errEl.textContent = res.error; return; }
  errEl.textContent = '';
  closeAuthModal();
  refreshAuthUI();
});

document.getElementById('signupForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirm').value;
  const errEl = document.getElementById('signupError');
  if (password.length < 6){ errEl.textContent = 'Password must be at least 6 characters.'; return; }
  if (password !== confirm){ errEl.textContent = 'Passwords do not match.'; return; }
  const res = signUp(name, email, password);
  if (!res.ok){ errEl.textContent = res.error; return; }
  errEl.textContent = '';
  closeAuthModal();
  refreshAuthUI();
});

document.getElementById('authBtn').addEventListener('click', ()=>{
  if (getCurrentUser()){
    document.getElementById('userMenu').classList.toggle('open');
  } else {
    openAuthModal('login');
  }
});
document.getElementById('signupBtn').addEventListener('click', ()=> openAuthModal('signup'));
document.getElementById('logoutBtn').addEventListener('click', ()=>{
  logOut();
});
document.addEventListener('click', (e)=>{
  const authArea = document.getElementById('authArea');
  if (authArea && !authArea.contains(e.target)){
    document.getElementById('userMenu').classList.remove('open');
  }
});

const mockSignupCta = document.getElementById('mockSignupCta');
if (mockSignupCta) mockSignupCta.addEventListener('click', ()=> openAuthModal('signup'));

/* ============================================================
   TIMED MOCK EXAM — qualification + job/exam selectors
   ============================================================ */
const mockTierSelect = document.getElementById('mockTierSelect');
const mockJobSelect = document.getElementById('mockJobSelect');
const mockPatternBox = document.getElementById('mockPatternBox');
const mockSetRow = document.getElementById('mockSetRow');

if (mockTierSelect){
  Object.keys(tierMeta).forEach(tier=>{
    const opt = document.createElement('option');
    opt.value = tier;
    opt.textContent = tierMeta[tier].label;
    mockTierSelect.appendChild(opt);
  });

  function populateMockJobs(){
    const tier = mockTierSelect.value;
    mockJobSelect.innerHTML = '';
    jobs.filter(j=>j.tier===tier).forEach(job=>{
      const opt = document.createElement('option');
      opt.value = job.id;
      opt.textContent = job.name;
      mockJobSelect.appendChild(opt);
    });
    updateMockPatternBox();
  }
  function updateMockPatternBox(){
    const job = jobs.find(j=>j.id===mockJobSelect.value);
    if (!job) return;
    const pattern = getExamPattern(job);
    const poolSize = tierPool(job.tier).length;
    const repeatNote = pattern.questionCount > poolSize
      ? ` Our original question bank has ${poolSize} per category, so on longer papers some questions repeat within a single attempt — each Mock Test set is shuffled differently.`
      : '';
    mockPatternBox.innerHTML = `<b>${pattern.label}</b> &middot; ${pattern.questionCount} questions &middot; ${pattern.durationMinutes} minutes &middot; recruiting body: ${job.body}<br>${repeatNote}`;
  }
  mockTierSelect.addEventListener('change', populateMockJobs);
  mockJobSelect.addEventListener('change', updateMockPatternBox);
  populateMockJobs();

  [1,2,3].forEach(setNum=>{
    const btn = document.createElement('button');
    btn.className = 'mock-cta mock-set-btn';
    btn.textContent = `Mock Test ${setNum}`;
    btn.addEventListener('click', ()=>{
      if (!getCurrentUser()){ openAuthModal('login'); return; }
      const job = jobs.find(j=>j.id===mockJobSelect.value);
      if (job) startTimedExam(job, setNum);
    });
    mockSetRow.appendChild(btn);
  });
}

/* ---------- Timed exam-taking engine (separate from the casual practice quiz) ---------- */
const examOverlay = document.getElementById('examOverlay');
document.body.appendChild(examOverlay);
const examJobTitle = document.getElementById('examJobTitle');
const examProgress = document.getElementById('examProgress');
const examTimerEl = document.getElementById('examTimer');
const examBody = document.getElementById('examBody');

let examState = null; // { job, pattern, setNum, questions:[{text,choices,correct}], answers:[], current, secondsLeft, timerId }

function buildExamQuestions(tier, count, seedStr){
  const pool = tierPool(tier);
  const rounds = [];
  let remaining = count;
  let pass = 0;
  while (remaining > 0){
    const shuffled = seededShuffle(pool, seedStr + '-pass' + pass);
    const take = Math.min(remaining, shuffled.length);
    rounds.push(...shuffled.slice(0, take));
    remaining -= take;
    pass++;
  }
  return rounds.map((q, idx)=>{
    const [text, ...opts] = q;
    const correct = opts[opts.length-1];
    const choices = seededShuffle(opts.slice(0,4), seedStr + '-opts' + idx);
    return { text, choices, correct };
  });
}

function startTimedExam(job, setNum){
  const pattern = getExamPattern(job);
  const seedStr = job.id + '-set' + setNum;
  const questions = buildExamQuestions(job.tier, pattern.questionCount, seedStr);
  examState = {
    job, pattern, setNum, questions,
    answers: new Array(questions.length).fill(null),
    current: 0,
    secondsLeft: pattern.durationMinutes * 60,
    timerId: null,
    submitted: false
  };
  examJobTitle.textContent = job.name + ` — Mock Test ${setNum}`;
  examOverlay.classList.add('open');
  lockBackgroundScroll();
  renderExamQuestion();
  examState.timerId = setInterval(tickExamTimer, 1000);
  updateExamTimerDisplay();
}

function tickExamTimer(){
  if (!examState || examState.submitted) return;
  examState.secondsLeft--;
  updateExamTimerDisplay();
  if (examState.secondsLeft <= 0){
    submitExam(true);
  }
}
function updateExamTimerDisplay(){
  const s = Math.max(0, examState.secondsLeft);
  const mm = String(Math.floor(s/60)).padStart(2,'0');
  const ss = String(s%60).padStart(2,'0');
  examTimerEl.textContent = `${mm}:${ss}`;
  examTimerEl.classList.toggle('low-time', s <= 60);
}

function renderExamQuestion(){
  const { questions, current, answers } = examState;
  const q = questions[current];
  examProgress.textContent = `Question ${current+1} of ${questions.length}`;

  const dots = questions.map((_,i)=>{
    const cls = ['exam-qdot'];
    if (i === current) cls.push('current');
    if (answers[i] !== null) cls.push('answered');
    return `<div class="${cls.join(' ')}" data-qi="${i}">${i+1}</div>`;
  }).join('');

  examBody.innerHTML = `
    <div class="exam-qgrid">${dots}</div>
    <div class="exam-q-text">${current+1}. ${q.text}</div>
    <div class="exam-opts">
      ${q.choices.map(c=>`
        <label class="exam-opt${answers[current]===c ? ' selected':''}">
          <input type="radio" name="examq" value="${c.replace(/"/g,'&quot;')}" ${answers[current]===c?'checked':''}>
          <span>${c}</span>
        </label>
      `).join('')}
    </div>
    <div class="exam-nav-row">
      <button class="exam-nav-btn" id="examPrevBtn" ${current===0?'disabled':''}>Previous</button>
      ${current === questions.length-1
        ? `<button class="exam-nav-btn submit" id="examSubmitBtn">Submit Exam</button>`
        : `<button class="exam-nav-btn submit" id="examNextBtn">Next</button>`}
    </div>
  `;

  examBody.querySelectorAll('.exam-opt input').forEach(inp=>{
    inp.addEventListener('change', ()=>{
      examState.answers[current] = inp.value;
      renderExamQuestion();
    });
  });
  examBody.querySelectorAll('.exam-qdot').forEach(dot=>{
    dot.addEventListener('click', ()=>{
      examState.current = parseInt(dot.dataset.qi, 10);
      renderExamQuestion();
    });
  });
  const prevBtn = document.getElementById('examPrevBtn');
  if (prevBtn) prevBtn.addEventListener('click', ()=>{ examState.current--; renderExamQuestion(); });
  const nextBtn = document.getElementById('examNextBtn');
  if (nextBtn) nextBtn.addEventListener('click', ()=>{ examState.current++; renderExamQuestion(); });
  const submitBtn = document.getElementById('examSubmitBtn');
  if (submitBtn) submitBtn.addEventListener('click', ()=> submitExam(false));
}

function submitExam(timeUp){
  if (!examState || examState.submitted) return;
  examState.submitted = true;
  clearInterval(examState.timerId);

  const { questions, answers, pattern } = examState;
  let score = 0;
  questions.forEach((q,i)=>{ if (answers[i] === q.correct) score++; });
  const timeUsed = pattern.durationMinutes*60 - Math.max(0, examState.secondsLeft);
  const mm = String(Math.floor(timeUsed/60)).padStart(2,'0');
  const ss = String(timeUsed%60).padStart(2,'0');

  examProgress.textContent = 'Result';
  examTimerEl.textContent = timeUp ? "TIME'S UP" : `${mm}:${ss}`;

  examBody.innerHTML = `
    <div class="exam-result-score">
      <div class="big">${score} / ${questions.length}</div>
      <div class="sub">${pattern.label} &middot; time used ${mm}:${ss} of ${pattern.durationMinutes}:00${timeUp ? ' (auto-submitted — time ran out)' : ''}</div>
    </div>
    <div id="examReviewList"></div>
    <div class="exam-nav-row">
      <button class="exam-nav-btn" id="examCloseResultBtn">Close</button>
      <button class="exam-nav-btn submit" id="examRetryBtn">Retry This Exam</button>
    </div>
  `;
  const reviewList = document.getElementById('examReviewList');
  reviewList.innerHTML = questions.map((q,i)=>{
    const yourAnswer = answers[i] || '(not answered)';
    const isCorrect = answers[i] === q.correct;
    return `
      <div class="exam-review-item">
        <div class="rq">${i+1}. ${q.text}</div>
        <div class="ra ${isCorrect ? 'correct' : 'wrong'}">Your answer: ${yourAnswer}</div>
        ${!isCorrect ? `<div class="ra correct">Correct answer: ${q.correct}</div>` : ''}
      </div>
    `;
  }).join('');

  document.getElementById('examCloseResultBtn').addEventListener('click', closeExamOverlay);
  document.getElementById('examRetryBtn').addEventListener('click', ()=>{
    startTimedExam(examState.job, examState.setNum);
  });
}

function closeExamOverlay(){
  if (examState && examState.timerId) clearInterval(examState.timerId);
  examState = null;
  examOverlay.classList.remove('open');
  unlockBackgroundScroll();
}
document.getElementById('examCloseBtn').addEventListener('click', ()=>{
  if (examState && !examState.submitted){
    const ok = confirm('Leave the exam now? Your progress on this attempt will be lost.');
    if (!ok) return;
  }
  closeExamOverlay();
});
examOverlay.addEventListener('click', (e)=>{
  if (e.target === examOverlay && examState && examState.submitted){
    closeExamOverlay();
  }
});

refreshAuthUI();
