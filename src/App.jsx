import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Activity, 
  ShoppingCart, 
  User, 
  Phone, 
  MapPin, 
  Mail, 
  Plus, 
  Minus, 
  Trash2, 
  Search, 
  Sparkles, 
  Database, 
  TrendingUp, 
  Send, 
  Check, 
  CheckCircle, 
  AlertCircle, 
  Map, 
  Settings, 
  Layers, 
  ChevronRight, 
  Info, 
  Lock,
  ArrowRight,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

// Bilingual Translations Dictionary (English, Dari/Persian, Pashto)
const TRANSLATIONS = {
  en: {
    brandName: "CURE NET",
    brandSub: "Pharmaceuticals",
    persianName: "کیور نیت فارمسوتیکل",
    home: "Home",
    products: "Products",
    symptomChecker: "AI Symptom Checker",
    contactUs: "Contact Us",
    adminPanel: "Admin Panel",
    dashboard: "Dashboard",
    tagline: "Next Generation Healthcare in Afghanistan",
    description: "Cure Net Pharmaceuticals stands at the cutting-edge of medical production in Afghanistan. We manufacture premium quality syrups, suspensions, supplements, and essential pediatric drops. Delivering securely across all 34 provinces with high-accuracy GPS tracking.",
    browseBtn: "Browse Medicines",
    diagnosticsBtn: "Run AI Diagnostics",
    exploreNewBtn: "Explore Our New Products",
    newProducts: "New Products",
    newArrivals: "New Arrivals (Last 7 Days)",
    subscribeTitle: "Subscribe to Product Alerts",
    subscribeDesc: "Receive automated instant email notifications whenever we launch certified new medical formulations.",
    subscribePlaceholder: "Enter your active email address...",
    subscribeBtn: "Subscribe",
    mophTitle: "MoPH Certified",
    mophDesc: "High Standard Manufacturing",
    whyChoose: "Why Choose Cure Net",
    whyDesc: "We combine advanced lab engineering with regional logistics to deliver elite medical coverage across Afghanistan."
  },
  da: {
    brandName: "کیور نیت",
    brandSub: "محصولات دارویی",
    persianName: "کیور نیت فارمسوتیکل",
    home: "صفحه اصلی",
    products: "محصولات",
    symptomChecker: "بررسی هوشمند علائم",
    contactUs: "تماس با ما",
    adminPanel: "پنل مدیریت",
    dashboard: "داشبورد",
    tagline: "نسل جدید خدمات بهداشتی در افغانستان",
    description: "شرکت داروسازی کیور نیت در خط مقدم تولیدات پیشرفته پزشکی در افغانستان قرار دارد. ما شربت‌ها، ساسپنشن‌ها، مکمل‌ها و قطره‌های ضروری اطفال را با کیفیت ممتاز تولید می‌کنیم. تحویل مطمئن در تمام ۳۴ ولایت با ردیابی دقیق GPS.",
    browseBtn: "مشاهده داروها",
    diagnosticsBtn: "تشخیص هوشمند علائم",
    exploreNewBtn: "بررسی محصولات جدید ما",
    newProducts: "محصولات جدید",
    newArrivals: "محصولات جدید (۷ روز اخیر)",
    subscribeTitle: "اشتراک در خبرنامه محصولات جدید",
    subscribeDesc: "هر زمان که فرمولاسیون‌های جدید پزشکی را روانه بازار کردیم، ایمیل‌های اطلاع‌رسانی خودکار دریافت کنید.",
    subscribePlaceholder: "آدرس ایمیل فعال خود را وارد کنید...",
    subscribeBtn: "اشتراک",
    mophTitle: "تاییدیه وزارت صحت عامه",
    mophDesc: "تولید با استانداردهای عالی کیفیت",
    whyChoose: "چرا کیور نیت را انتخاب کنید",
    whyDesc: "ما مهندسی پیشرفته آزمایشگاهی را با لوجیستیک منطقوی ترکیب می‌کنیم تا پوشش طبی عالی را در سراسر افغانستان ارائه دهیم."
  },
  ps: {
    brandName: "کیور نیت",
    brandSub: "درمل جوړولو شرکت",
    persianName: "کیور نیت فارمسوتیکل",
    home: "اصلي پاڼه",
    products: "محصولات",
    symptomChecker: "د نښو نښانو هوښیار چک کوونکی",
    contactUs: "اړیکه ونیسئ",
    adminPanel: "مدیریت تخته",
    dashboard: "داشبورډ",
    tagline: "په افغانستان کې د روغتیایی خدمتونو نوی نسل",
    description: "کیور نیت درمل جوړولو شرکت په افغانستان کې د پرمختللو طبي تولیداتو په لومړۍ کرښه کې ولاړ دی. موږ د لوړ کیفیت شربتونه، تعلیقونه، تکمیلي درمل او د ماشومانو لپاره اړین څاڅکي تولیدوو. د دقیق GPS تعقیب سره په ټولو ۳۴ ولایتونو کې ډاډمن تحویل.",
    browseBtn: "د درملو لیدل",
    diagnosticsBtn: "هوښیار تشخیص پیلول",
    exploreNewBtn: "زموږ نوي محصولات وپلټئ",
    newProducts: "نوي محصولات",
    newArrivals: "نوي محصولات (وروستي ۷ ورځې)",
    subscribeTitle: "د نویو درملو خبرتیاوو ته ګډون کول",
    subscribeDesc: "هرکله چې موږ نوي طبي درمل تولید کړو، په اوتومات ډول سمدستي خبرتیاوې ترلاسه کړئ.",
    subscribePlaceholder: "خپل فعال بریښنالیک پته دننه کړئ...",
    subscribeBtn: "ګډون کول",
    mophTitle: "د عامې روغتیا وزارت تایید شوی",
    mophDesc: "د لوړ کیفیت تولیدي معیارونه",
    whyChoose: "ولې کیور نیت غوره کړئ",
    whyDesc: "موږ پرمختللی لابراتواري انجینري د سیمه ایز لوژستیک سره یوځای کوو ترڅو په ټول افغانستان کې غوره طبي خدمتونه وړاندې کړو."
  }
};

// 34 Afghanistan Provinces with standard delivery rates
const AFGHANISTAN_PROVINCES = [
  { name: "Kabul", shippingCost: 50 },
  { name: "Kandahar", shippingCost: 200 },
  { name: "Herat", shippingCost: 250 },
  { name: "Balkh (Mazar-i-Sharif)", shippingCost: 180 },
  { name: "Nangarhar (Jalalabad)", shippingCost: 100 },
  { name: "Kunduz", shippingCost: 170 },
  { name: "Helmand", shippingCost: 220 },
  { name: "Faryab", shippingCost: 200 },
  { name: "Ghazni", shippingCost: 120 },
  { name: "Bamyan", shippingCost: 150 },
  { name: "Badakhshan", shippingCost: 300 },
  { name: "Baghlan", shippingCost: 140 },
  { name: "Takhar", shippingCost: 190 },
  { name: "Khost", shippingCost: 130 },
  { name: "Paktia", shippingCost: 130 },
  { name: "Paktika", shippingCost: 180 },
  { name: "Parwan", shippingCost: 70 },
  { name: "Kapisa", shippingCost: 70 },
  { name: "Panjshir", shippingCost: 90 },
  { name: "Wardak", shippingCost: 80 },
  { name: "Logar", shippingCost: 80 },
  { name: "Laghman", shippingCost: 100 },
  { name: "Kunar", shippingCost: 150 },
  { name: "Nuristan", shippingCost: 350 },
  { name: "Samangan", shippingCost: 160 },
  { name: "Sar-e Pol", shippingCost: 190 },
  { name: "Jawzjan", shippingCost: 180 },
  { name: "Nimruz", shippingCost: 300 },
  { name: "Farah", shippingCost: 280 },
  { name: "Badghis", shippingCost: 250 },
  { name: "Ghor", shippingCost: 220 },
  { name: "Uruzgan", shippingCost: 200 },
  { name: "Zabul", shippingCost: 180 },
  { name: "Daykundi", shippingCost: 250 }
].sort((a, b) => a.name.localeCompare(b.name));

// The 26 Pharmaceutical products extracted from the price list
const INITIAL_PRODUCTS = [
  { id: 1, name: "Cure-Fen DS", generic: "IBUPROFEN", packing: "200mg/5ml", price: 24.5, carton: 80, category: "Analgesic & Fever", available: true, description: "Effective fast-acting suspension for pain relief, inflammatory swelling reduction, and pediatric temperature reduction.", caution: "Avoid on an empty stomach. Consult physician for children under 6 months." },
  { id: 2, name: "CURE-MOL FORT", generic: "PARACETAMOL", packing: "200mg/5ml", price: 21.5, carton: 80, category: "Analgesic & Fever", available: true, description: "Enhanced pediatric paracetamol suspension formulated to safely combat severe fever, teething aches, and cold symptoms.", caution: "Do not exceed recommended dose to prevent liver fatigue." },
  { id: 3, name: "Cure-Vit Syrup Glass", generic: "Multivitamin + Calcium", packing: "200ML", price: 32.0, carton: 70, category: "Vitamins & Health", available: true, description: "Premium multivitamin complex enriched with liquid calcium to support strong bone development, immunity, and healthy pediatric growth.", caution: "Store in a cool place, shake well before use." },
  { id: 4, name: "Net Zole", generic: "Metronidazole", packing: "120ML", price: 25.5, carton: 80, category: "Anti-infective", available: true, description: "High-efficacy antibacterial and antiprotozoal suspension designed to treat severe gastrointestinal infections and dental abscesses.", caution: "Prescription only. Complete the full course of treatment." },
  { id: 5, name: "Cure-Cid Syrup", generic: "Anti-Acid", packing: "200ML", price: 29.0, carton: 70, category: "Gastrointestinal", available: true, description: "Fast-acting clinical antacid syrup providing relief from severe heartburn, acid reflux, stomach bloating, and general gastritis.", caution: "Do not take within 2 hours of other oral drugs." },
  { id: 6, name: "Cure-Vit Syrup Plastic", generic: "Multivitamin + Calcium", packing: "200ML", price: 25.0, carton: 70, category: "Vitamins & Health", available: true, description: "Essential multivitamin blend with calcium in a lightweight, break-resistant PET bottle. Safe for province shipment.", caution: "Keep out of reach of children." },
  { id: 7, name: "Phylli Cure Syrup", generic: "Aminophylline", packing: "120ML", price: 20.5, carton: 80, category: "Respiratory", available: true, description: "Bronchodilator syrup that relaxes muscles in the lungs and chest, expanding airways for asthma, bronchitis, and COPD relief.", caution: "May cause minor heart palpitation. Avoid excess caffeine while taking." },
  { id: 8, name: "CNP Kuf Syrup", generic: "Dextromethorphan", packing: "120ML", price: 19.5, carton: 80, category: "Cough & Cold", available: true, description: "Effective cough suppressant syrup that acts on the dry cough reflex center, soothing throat tickling and persistent irritation.", caution: "Avoid if cough produces heavy phlegm or mucus." },
  { id: 9, name: "Iron-Net Syrup Glass", generic: "Iron + L-Methylfolate", packing: "120ML", price: 25.5, carton: 80, category: "Vitamins & Health", available: true, description: "Hematinic syrup combining digestible active iron with active folate. Promotes red blood cell production, treating anemia.", caution: "May cause dark stools. Take with water/juice." },
  { id: 10, name: "Phylli Cure Syrup Plastic", generic: "Aminophylline", packing: "120ML", price: 17.0, carton: 80, category: "Respiratory", available: true, description: "Aminophylline bronchodilator formulation packaged in a durable plastic bottle. Essential for chronic respiratory patients.", caution: "Strictly adhere to the dosage outline." },
  { id: 11, name: "CNP Kuf Syrup Plastic", generic: "Dextromethorphan", packing: "120ML", price: 16.0, carton: 80, category: "Cough & Cold", available: true, description: "Dry-cough relief syrup in an active PET bottle. Fast acting relief for throat tickles and chronic non-productive coughs.", caution: "May cause mild drowsiness. Avoid operating heavy machinery." },
  { id: 12, name: "Iron-Net Syrup Plastic", generic: "Iron + L-Methylfolate", packing: "120ML", price: 22.0, carton: 80, category: "Vitamins & Health", available: true, description: "Active iron supplement to fight fatigue and combat nutritional anemia, packaged in a shipping-safe plastic bottle.", caution: "Absorption is enhanced when taken on an empty stomach." },
  { id: 13, name: "SALBU- NET syrup plastic", generic: "Salbutamol", packing: "120 ml", price: 21.0, carton: 80, category: "Respiratory", available: true, description: "Highly trusted fast-acting bronchodilator syrup that immediately relieves chest tightness, wheezing, and bronchial spasms.", caution: "Monitor heart rate. Do not double doses." },
  { id: 14, name: "SALBU- NET syrup Glass", generic: "Salbutamol", packing: "120 ml", price: 23.5, carton: 80, category: "Respiratory", available: true, description: "Medical-grade Salbutamol syrup in amber glass to shield the active ingredients from light. Rapid relief for acute asthmatic episodes.", caution: "Use with caution in hyperthyroid or diabetic patients." },
  { id: 15, name: "Net Zol Plastic", generic: "Metronidazole", packing: "120ML", price: 22.0, carton: 80, category: "Anti-infective", available: true, description: "Metronidazole suspension in light, rugged packaging. Designed for rural clinic distribution to eliminate intestinal parasites.", caution: "Do not consume alcohol while taking this medicine or 48 hours after." },
  { id: 16, name: "Cure Milk", generic: "Nutritional Milk Powder", packing: "400gram", price: 160.0, carton: 30, category: "Vitamins & Health", available: true, description: "Nutritional powder supplement fortified with key minerals, vitamins, and calcium for high energy and physical vitality.", caution: "Not suitable as an exclusive infant formula under 12 months." },
  { id: 17, name: "CITA-CURE Without pack", generic: "Disodium Hydrogen Citrate", packing: "120ml", price: 18.0, carton: 80, category: "Urinary Tract", available: true, description: "Active urine alkalinizer syrup that neutralizes burning pain during urination, helping to clear minor UTIs and prevent kidney stones.", caution: "Drink plenty of water while using this medicine." },
  { id: 18, name: "CITA- CURE", generic: "Disodium Hydrogen Citrate", packing: "120ml", price: 20.5, carton: 80, category: "Urinary Tract", available: true, description: "Standard clinical Disodium Hydrogen Citrate syrup in full protective packaging. Relieves dysuria and acidic metabolic states.", caution: "Dilute in a full glass of water prior to consumption." },
  { id: 19, name: "Cure Gink Glass", generic: "Gingko Biloba + Ginseng", packing: "200ml", price: 28.0, carton: 84, category: "Cognitive & Energy", available: true, description: "Dual herbal extract combining Gingko and Ginseng to boost cerebral blood circulation, improve memory, focus, and energy.", caution: "Consult a doctor if taking blood thinners." },
  { id: 20, name: "Cure Gink Plastic", generic: "Gingko Biloba + Ginseng", packing: "200ml", price: 23.0, carton: 84, category: "Cognitive & Energy", available: true, description: "Cognitive stimulant and mental fatigue buster in dynamic, break-proof travel plastic packaging.", caution: "Avoid taking late in the evening to prevent sleep issues." },
  { id: 21, name: "Cure cid-H", generic: "Herbal Antacid", packing: "120ml", price: 13.0, carton: 72, category: "Gastrointestinal", available: true, description: "All-natural herbal stomach antacid formulated with soothing botanicals to neutralize hyperacidity and settle stomach spasms.", caution: "Safe formulation, but discontinue if any allergic reaction occurs." },
  { id: 22, name: "Cure Mole Glass", generic: "Paracetamol", packing: "120ml", price: 18.5, carton: 80, category: "Analgesic & Fever", available: true, description: "Standard paracetamol syrup in protective glass packaging. Reliable treatment for headaches, toothaches, and mild childhood fevers.", caution: "Always check the dose based on child's age/weight chart." },
  { id: 23, name: "Cure Mole Plastic", generic: "Paracetamol", packing: "120ml", price: 15.5, carton: 80, category: "Analgesic & Fever", available: true, description: "Safe and quick-relief liquid paracetamol suspension in lightweight plastic, optimized for remote province shipping.", caution: "Never combine with other drugs containing acetaminophen." },
  { id: 24, name: "Net Zole glass", generic: "Metronidazole", packing: "60ml", price: 18.0, carton: 130, category: "Anti-infective", available: true, description: "Highly concentrated 60ml pediatric anti-parasitic and anti-infective suspension in specialized glass dropper shielding.", caution: "Take precisely at the scheduled times." },
  { id: 25, name: "CURE-DON glass", generic: "Domperidone", packing: "120ml", price: 19.0, carton: 80, category: "Gastrointestinal", available: true, description: "Promotility syrup that directly stops nausea, curbs vomiting, and eliminates stomach bloating by accelerating gut emptying.", caution: "Not recommended for patients with cardiovascular history." },
  { id: 26, name: "CURE-DON plastic", generic: "Domperidone", packing: "120ml", price: 16.0, carton: 80, category: "Gastrointestinal", available: true, description: "Anti-emetic Domperidone suspension in robust shipping-safe plastic. Quickly relieves abdominal fullness and vomiting.", caution: "Consult a doctor for appropriate pediatric dosing." }
];

// Presets for the symptom selector matching logic
const CLINICAL_DIAGNOSTICS = [
  { id: "fever", label: "Fever & Cold Symptoms", disease: "Hyperpyrexia & Influenza", description: "Elevated body temperature, cold flashes, teething discomfort, or mild viral aches.", medicines: [2, 22, 23, 1], confidence: "98% Match" },
  { id: "dry_cough", label: "Dry Non-productive Cough", disease: "Acute Dry Cough & Bronchitis", description: "Continuous dry hacking, throat tickling, lack of phlegm, or throat irritation.", medicines: [8, 11], confidence: "95% Match" },
  { id: "stomach_acid", label: "Acid Heartburn & Gastritis", disease: "Gastroesophageal Reflux (GERD)", description: "Burning sensation in upper chest, acid regurgitation, bloating, or stomach upset.", medicines: [5, 21, 25, 26], confidence: "94% Match" },
  { id: "asthma", label: "Asthma & Wheezing", disease: "Bronchial Asthma / COPD Spasms", description: "Difficulty breathing, chest tightness, wheezing sound, or bronchial inflammation.", medicines: [13, 14, 7, 10], confidence: "92% Match" },
  { id: "uti", label: "Burning Urination", disease: "Acidic Urine / Suspected UTI", description: "Painful urination, high urine acidity, bladder discomfort, or crystal presence.", medicines: [18, 17], confidence: "96% Match" },
  { id: "infection", label: "Bacterial Diarrhea", disease: "Amoebic Dysentery & Parasites", description: "Stomach cramping, severe diarrhea, microbial infection, or dental abscesses.", medicines: [4, 15, 24], confidence: "97% Match" },
  { id: "fatigue", label: "Fatigue & Anemia", disease: "Iron-Deficiency Anemia & Weakness", description: "Dizziness, persistent tiredness, poor mental focus, pale skin, or general lethargy.", medicines: [9, 12, 19, 20], confidence: "93% Match" }
];

const getCategoryVisual = (category) => {
  if (category.includes("Analgesic")) {
    return { Icon: Activity, tone: "emerald", label: "Pain Relief" };
  }

  if (category.includes("Respiratory")) {
    return { Icon: Sparkles, tone: "sky", label: "Respiratory Care" };
  }

  if (category.includes("Gastrointestinal")) {
    return { Icon: Layers, tone: "gold", label: "Digestive Support" };
  }

  if (category.includes("Vitamins")) {
    return { Icon: CheckCircle, tone: "teal", label: "Daily Wellness" };
  }

  if (category.includes("Anti-infective")) {
    return { Icon: ShieldCheck, tone: "violet", label: "Infection Control" };
  }

  if (category.includes("Urinary")) {
    return { Icon: MapPin, tone: "rose", label: "Targeted Relief" };
  }

  return { Icon: TrendingUp, tone: "slate", label: "Clinical Care" };
};

// Initial mock orders to populate the admin dashboard dynamically
const INITIAL_ORDERS = [
  {
    id: 1041,
    name: "Ahmad Shah Kabuli",
    province: "Kabul",
    district: "Karte Char",
    street: "Street 4, Pharmacy Alley",
    phone: "0799887766",
    gpsCoords: "34.512301, 69.176420",
    items: [
      { id: 1, name: "Cure-Fen DS", price: 24.5, qty: 10 },
      { id: 3, name: "Cure-Vit Syrup Glass", price: 32.0, qty: 5 }
    ],
    subtotal: 405.0,
    shippingCost: 50.0,
    total: 455.0,
    status: "Delivered",
    date: "2026-05-20"
  },
  {
    id: 1042,
    name: "Mohammad Jawad",
    province: "Herat",
    district: "District 2",
    street: "Main Bazaar Road",
    phone: "0788334455",
    gpsCoords: "34.348210, 62.199430",
    items: [
      { id: 14, name: "SALBU- NET syrup Glass", price: 23.5, qty: 20 },
      { id: 5, name: "Cure-Cid Syrup", price: 29.0, qty: 15 }
    ],
    subtotal: 905.0,
    shippingCost: 250.0,
    total: 1155.0,
    status: "Shipped",
    date: "2026-05-21"
  },
  {
    id: 1043,
    name: "Dr. Zalmay Balkhi",
    province: "Balkh (Mazar-i-Sharif)",
    district: "Bakhtar District",
    street: "Mazar Clinical Square, Block B",
    phone: "0777123456",
    gpsCoords: "36.702240, 67.114320",
    items: [
      { id: 19, name: "Cure Gink Glass", price: 28.0, qty: 30 },
      { id: 16, name: "Cure Milk", price: 160.0, qty: 5 },
      { id: 18, name: "CITA- CURE", price: 20.5, qty: 25 }
    ],
    subtotal: 2152.5,
    shippingCost: 180.0,
    total: 2332.5,
    status: "Pending",
    date: "2026-05-22"
  }
];

function App() {
  // Navigation Tabs: 'home' | 'products' | 'diagnostics' | 'contact' | 'admin'
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Data State (persisted via localStorage)
  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('cnp_products');
    const loaded = local ? JSON.parse(local) : INITIAL_PRODUCTS;
    // Dynamically tag recent dates for new products filter (May 20, 2026 is new as today is May 22, 2026)
    return loaded.map(p => ({
      ...p,
      createdDate: p.createdDate || ([1, 2, 3, 16, 17].includes(p.id) ? "2026-05-20" : "2026-04-10")
    }));
  });
  
  const [orders, setOrders] = useState(() => {
    const local = localStorage.getItem('cnp_orders');
    return local ? JSON.parse(local) : INITIAL_ORDERS;
  });

  // Language Selection: 'en' | 'da' | 'ps'
  const [lang, setLang] = useState(() => {
    const local = localStorage.getItem('cnp_lang');
    return local ? local : 'en';
  });

  // Mobile navigation hamburger toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Subscriber List for automatic simulated marketing emails
  const [subscribers, setSubscribers] = useState(() => {
    const local = localStorage.getItem('cnp_subscribers');
    return local ? JSON.parse(local) : [
      "kabul.clinic@curenet.af",
      "herat.pharmacy@gmail.com",
      "mazar.hospital@yahoo.com",
      "dost.distribution@gmail.com",
      "jawed.medical@hotmail.com"
    ];
  });

  // Active Admin View Panel: 'orders' | 'inventory' | 'marketing' | 'chatbot'
  const [adminSubTab, setAdminSubTab] = useState('orders');

  // Interactive newsletter state variables
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [emailMarketingLogs, setEmailMarketingLogs] = useState([]);
  const [isEmailMarketingActive, setIsEmailMarketingActive] = useState(false);

  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Diagnostics Tab State
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(null);
  const [customSymptomInput, setCustomSymptomInput] = useState('');
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Checkout Form State
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutProvince, setCheckoutProvince] = useState('Kabul');
  const [checkoutDistrict, setCheckoutDistrict] = useState('');
  const [checkoutStreet, setCheckoutStreet] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [gpsCoords, setGpsCoords] = useState({ lat: 34.5555, lng: 69.2073 }); // Defaults to Kabul coordinates
  
  // SMTP Simulation Logs State
  const [smtpLogs, setSmtpLogs] = useState([]);
  const [isSmtpActive, setIsSmtpActive] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [lastPlacedOrderId, setLastPlacedOrderId] = useState(null);

  // Admin Tab State
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  
  // Admin Inventory Creator State
  const [newProdName, setNewProdName] = useState('');
  const [newProdGeneric, setNewProdGeneric] = useState('');
  const [newProdPacking, setNewProdPacking] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCarton, setNewProdCarton] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Analgesic & Fever');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdCaution, setNewProdCaution] = useState('');

  // Admin AI Chatbot state
  const [adminChatMessages, setAdminChatMessages] = useState([
    { role: 'assistant', text: "Salam. I am the CNP Operations Assistant. Ask me anything about province sales metrics, symptom trends, or inventory restock warnings!" }
  ]);
  const [adminChatInput, setAdminChatInput] = useState('');

  // Map elements refs
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('cnp_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cnp_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cnp_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('cnp_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  // Leaflet map initialization
  useEffect(() => {
    // We only want to load the map when the checkout cart drawer is visible or when map container is available
    if (!mapRef.current) return;
    if (typeof window.L === 'undefined') {
      console.warn("Leaflet library not loaded yet.");
      return;
    }

    const L = window.L;

    // Reset previous instance if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Centered at the selected province or Kabul
    const map = L.map(mapRef.current).setView([gpsCoords.lat, gpsCoords.lng], 12);
    mapInstanceRef.current = map;

    // Clean light map tiles to match the refreshed interface
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Draggable medical pin
    const marker = L.marker([gpsCoords.lat, gpsCoords.lng], {
      draggable: true
    }).addTo(map);
    markerRef.current = marker;

    // Bind initial popup
    marker.bindPopup("<strong style='color:#10b981'>Delivery Pharmacy Pinpoint</strong><br/>Drag this to your exact shop/home!").openPopup();

    // Map drag actions
    marker.on('dragend', () => {
      const latLng = marker.getLatLng();
      const latVal = parseFloat(latLng.lat.toFixed(6));
      const lngVal = parseFloat(latLng.lng.toFixed(6));
      setGpsCoords({ lat: latVal, lng: lngVal });
    });

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      const latVal = parseFloat(lat.toFixed(6));
      const lngVal = parseFloat(lng.toFixed(6));
      marker.setLatLng([lat, lng]);
      setGpsCoords({ lat: latVal, lng: lngVal });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isCartOpen]); // Trigger maps reload when checkout cart drawer slides open

  // Center maps on province selection change
  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current) return;
    
    // Approximate province center coordinates for key locations in Afghanistan
    const provinceCenters = {
      "Kabul": { lat: 34.5553, lng: 69.2075 },
      "Kandahar": { lat: 31.6289, lng: 65.7372 },
      "Herat": { lat: 34.3529, lng: 62.2040 },
      "Balkh (Mazar-i-Sharif)": { lat: 36.7022, lng: 67.1143 },
      "Nangarhar (Jalalabad)": { lat: 34.4253, lng: 70.4533 },
      "Kunduz": { lat: 36.7290, lng: 68.8680 },
      "Helmand": { lat: 31.5938, lng: 64.3592 },
      "Ghazni": { lat: 33.5492, lng: 68.4175 },
      "Bamyan": { lat: 34.8252, lng: 67.8276 },
      "Badakhshan": { lat: 37.1160, lng: 70.5800 }
    };

    const targetCenter = provinceCenters[checkoutProvince] || { lat: 34.5553, lng: 69.2075 };
    setGpsCoords(targetCenter);
    mapInstanceRef.current.setView([targetCenter.lat, targetCenter.lng], 12);
    markerRef.current.setLatLng([targetCenter.lat, targetCenter.lng]);
  }, [checkoutProvince]);

  // Handle HTML5 dynamic Geolocation
  const handleAutoDetectLocation = () => {
    if (navigator.geolocation) {
      setSmtpLogs(prev => [...prev, "SMTP-DEBUG: Initialized client HTML5 Geolocation API request..."]);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latVal = parseFloat(position.coords.latitude.toFixed(6));
          const lngVal = parseFloat(position.coords.longitude.toFixed(6));
          
          setGpsCoords({ lat: latVal, lng: lngVal });
          
          if (mapInstanceRef.current && markerRef.current) {
            mapInstanceRef.current.setView([latVal, lngVal], 15);
            markerRef.current.setLatLng([latVal, lngVal]);
            markerRef.current.bindPopup("<strong style='color:#10b981'>High Accuracy GPS Locked!</strong>").openPopup();
          }
          
          setSmtpLogs(prev => [
            ...prev,
            `SMTP-DEBUG: Latitude/Longitude detected: (${latVal}, ${lngVal})`
          ]);
        },
        (error) => {
          console.error(error);
          setSmtpLogs(prev => [
            ...prev,
            `SMTP-DEBUG: ERROR: Geolocation failed (${error.message}). Reverting to default province maps.`
          ]);
        },
        { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 }
      );
    } else {
      setSmtpLogs(prev => [...prev, "SMTP-DEBUG: ERROR: Geolocation is unsupported by this browser client."]);
    }
  };

  // Cart Operations
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
    
    // Soft notify cart action
    setIsCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const getSelectedProvinceShipping = () => {
    const match = AFGHANISTAN_PROVINCES.find(p => p.name === checkoutProvince);
    return match ? match.shippingCost : 150;
  };
  const getCartTotal = () => getSubtotal() + getSelectedProvinceShipping();

  // AI Diagnostics keyword matching
  const handleAISymptomSubmit = (e) => {
    if (e) e.preventDefault();
    if (!customSymptomInput.trim() && !selectedDiagnostic) return;

    setIsAnalyzing(true);
    
    // Simulate high-performance diagnostic analysis
    setTimeout(() => {
      let match = null;
      const text = customSymptomInput.toLowerCase();
      
      if (selectedDiagnostic) {
        match = CLINICAL_DIAGNOSTICS.find(d => d.id === selectedDiagnostic);
      } else {
        // Evaluate keywords
        if (text.includes("fever") || text.includes("temperature") || text.includes("cold") || text.includes("ache") || text.includes("pain") || text.includes("headache")) {
          match = CLINICAL_DIAGNOSTICS.find(d => d.id === "fever");
        } else if (text.includes("cough") || text.includes("throat") || text.includes("tickle") || text.includes("dry")) {
          match = CLINICAL_DIAGNOSTICS.find(d => d.id === "dry_cough");
        } else if (text.includes("acid") || text.includes("heartburn") || text.includes("gastritis") || text.includes("reflux") || text.includes("bloat")) {
          match = CLINICAL_DIAGNOSTICS.find(d => d.id === "stomach_acid");
        } else if (text.includes("breath") || text.includes("asthma") || text.includes("wheez") || text.includes("chest") || text.includes("copd")) {
          match = CLINICAL_DIAGNOSTICS.find(d => d.id === "asthma");
        } else if (text.includes("urine") || text.includes("burning") || text.includes("uti") || text.includes("urinate")) {
          match = CLINICAL_DIAGNOSTICS.find(d => d.id === "uti");
        } else if (text.includes("diarrhea") || text.includes("infection") || text.includes("parasite") || text.includes("stomach infect")) {
          match = CLINICAL_DIAGNOSTICS.find(d => d.id === "infection");
        } else if (text.includes("fatigue") || text.includes("weak") || text.includes("tired") || text.includes("anemia") || text.includes("iron")) {
          match = CLINICAL_DIAGNOSTICS.find(d => d.id === "fatigue");
        } else {
          // Default fallbacks to Multivitamins and Health boosters
          match = CLINICAL_DIAGNOSTICS.find(d => d.id === "fatigue");
        }
      }

      if (match) {
        const matchedProducts = products.filter(p => match.medicines.includes(p.id));
        setAiAnalysisResult({
          disease: match.disease,
          description: match.description,
          confidence: match.confidence,
          recommendedProducts: matchedProducts
        });
      }

      setIsAnalyzing(false);
    }, 1200);
  };

  // Checkout submission with live SMTP Visualizer
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!checkoutName || !checkoutDistrict || !checkoutStreet || !checkoutPhone) {
      alert("All fields are required to secure high-accuracy delivery.");
      return;
    }

    setIsSmtpActive(true);
    setSmtpLogs([]);

    const orderId = Math.floor(Math.random() * 9000) + 1000;
    const dateStr = new Date().toISOString().split('T')[0];
    const newOrder = {
      id: orderId,
      name: checkoutName,
      province: checkoutProvince,
      district: checkoutDistrict,
      street: checkoutStreet,
      phone: checkoutPhone,
      gpsCoords: `${gpsCoords.lat.toFixed(6)}, ${gpsCoords.lng.toFixed(6)}`,
      items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, qty: item.qty })),
      subtotal: getSubtotal(),
      shippingCost: getSelectedProvinceShipping(),
      total: getCartTotal(),
      status: "Pending",
      date: dateStr
    };

    // SMTP Handshake Simulation Logger
    const logSteps = [
      `CONNECT smtp.curenet.com.af:587 [Ready to transmit order #${orderId}]`,
      "220 smtp.curenet.com.af ESMTP Postfix - Clinical Secure Handshake",
      "EHLO secure.curenet.com.af",
      "250-smtp.curenet.com.af, PIPELINING, SIZE 15728640, STARTTLS",
      "STARTTLS",
      "220 2.0.0 Ready to start TLS",
      "AUTH LOGIN [Secured Administrator Credentials Transmitting]",
      "235 2.7.0 Authentication successful",
      `MAIL FROM: <checkout-dispatch@curenet.com.af>`,
      "250 2.1.0 Ok",
      `RCPT TO: <orders@curenet.com.af>`,
      "250 2.1.5 Ok [Recipient Registered]",
      "DATA",
      `354 End data with <CR><LF>.<CR><LF> [Transmitting payload: Order #${orderId} - Province: ${checkoutProvince}]`,
      `Subject: NEW PHARMACEUTICAL ORDER DISPATCH - #${orderId} - ${checkoutName}`,
      `From: Cure Net Checkout <checkout-dispatch@curenet.com.af>`,
      `To: Orders Division <orders@curenet.com.af>`,
      `=================== ORDER DETAILS ===================`,
      `Customer Name: ${checkoutName}`,
      `Delivery Target: Province: ${checkoutProvince}, District: ${checkoutDistrict}, Street: ${checkoutStreet}`,
      `Contact Phone: ${checkoutPhone}`,
      `Precise GPS Pins: Latitude: ${gpsCoords.lat.toFixed(6)}, Longitude: ${gpsCoords.lng.toFixed(6)}`,
      `Cart Summary: ${cart.map(i => `${i.name} (x${i.qty})`).join(', ')}`,
      `Financial Telemetry: Subtotal: ${getSubtotal()} AF, Shipping: ${getSelectedProvinceShipping()} AF, Total: ${getCartTotal()} AF`,
      `====================================================`,
      ".",
      `250 2.0.0 Ok: queued as CNP-SMTP-${orderId}`,
      "QUIT",
      "221 2.0.0 Bye [Transmission Secured Successfully!]"
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logSteps.length) {
        setSmtpLogs(prev => [...prev, logSteps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        
        // Finalize transaction
        setOrders(prev => [newOrder, ...prev]);
        setLastPlacedOrderId(orderId);
        setCart([]);
        setIsCartOpen(false);
        setIsSmtpActive(false);
        setShowCheckoutSuccess(true);
        
        // Trigger high-end celebration
        confetti({
          particleCount: 180,
          spread: 90,
          origin: { y: 0.6 }
        });
      }
    }, 100);
  };

  // Newsletter Subscriber Registration
  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (!subscriberEmail.trim()) return;

    const email = subscriberEmail.trim().toLowerCase();
    
    // Quick regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please provide a valid active email address.");
      return;
    }

    if (subscribers.includes(email)) {
      alert("This email is already registered to receive Cure Net product alerts!");
      setSubscriberEmail('');
      return;
    }

    // Add and save
    setSubscribers(prev => [...prev, email]);
    setSubscriberEmail('');

    // Celebrate with elegant visual feedback
    confetti({
      particleCount: 80,
      spread: 60,
      colors: ['#10b981', '#0d9488', '#ffffff']
    });

    alert(`Tashakor! "${email}" has been successfully added to our new product broadcast pipeline!`);
  };

  // Admin Authentication
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'paikanm@curenet') {
      setAdminAuth(true);
      setAdminError('');
    } else {
      setAdminError('Invalid Administrative Credentials.');
    }
  };

  // Admin status update
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => {
      return prev.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
    });
  };

  // Admin inventory updates
  const handleUpdatePrice = (id, newPrice) => {
    setProducts(prev => {
      return prev.map(p => p.id === id ? { ...p, price: parseFloat(newPrice) || 0 } : p);
    });
  };

  const handleUpdateCarton = (id, newCarton) => {
    setProducts(prev => {
      return prev.map(p => p.id === id ? { ...p, carton: parseInt(newCarton) || 0 } : p);
    });
  };

  const handleToggleAvailable = (id) => {
    setProducts(prev => {
      return prev.map(p => p.id === id ? { ...p, available: !p.available } : p);
    });
  };

  // Admin Add Custom Product
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdGeneric || !newProdPacking || !newProdPrice || !newProdCarton) {
      alert("Please fill all required inputs to create the product.");
      return;
    }

    const todayStr = "2026-05-22"; // standard system reference date

    const newProd = {
      id: products.length + 1,
      name: newProdName,
      generic: newProdGeneric.toUpperCase(),
      packing: newProdPacking,
      price: parseFloat(newProdPrice),
      carton: parseInt(newProdCarton),
      category: newProdCategory,
      available: true,
      createdDate: todayStr, // Tagged with today's date to automatically render under "New Products" for 7 days
      description: newProdDesc || "Premium medical formulation manufactured under stringent GMP quality criteria by Cure Net Pharmaceuticals.",
      caution: newProdCaution || "Consume strictly in accordance with certified medical professional guidance."
    };

    setProducts(prev => [...prev, newProd]);
    
    // Auto-trigger dynamic simulated promotional email broadcast
    setIsEmailMarketingActive(true);
    setEmailMarketingLogs([`[SMTP CAMPAIGN ACTIVATED] Broadcasting launch of certified medicine: "${newProd.name}"`]);
    
    let logBuffer = [
      `CONNECT mail.curenet-marketing.af:25 [Connecting to clinical subscriber relay]`,
      "220 mail.curenet-marketing.af ESMTP Marketing Postfix",
      "EHLO dispatch.curenet-marketing.af",
      "250-mail.curenet-marketing.af, SIZE 10485760, PIPELINING",
      `MAIL FROM: <marketing-alerts@curenet.af>`,
      "250 2.1.0 Ok"
    ];

    // Build receipt steps for all subscribers
    subscribers.forEach((email, index) => {
      logBuffer.push(`RCPT TO: <${email}>`);
      logBuffer.push(`250 2.1.5 Ok [Transmitting alert payload to ${email}]`);
    });

    logBuffer.push("DATA");
    logBuffer.push(`354 Start mail input; end with <CR><LF>.<CR><LF>`);
    logBuffer.push(`Subject: NEW MEDICAL FORMULATION RELEASE: Explore ${newProd.name} (${newProd.generic})`);
    logBuffer.push(`From: Cure Net Pharmaceuticals <marketing-alerts@curenet.af>`);
    logBuffer.push(`=================== CLINICAL ANNOUNCEMENT ===================`);
    logBuffer.push(`Salam Alaikum,`);
    logBuffer.push(`We are proud to announce that Cure Net has officially launched a new formulation:`);
    logBuffer.push(`- Medicine Name: ${newProd.name}`);
    logBuffer.push(`- Generic Compound: ${newProd.generic}`);
    logBuffer.push(`- Packing Standard: ${newProd.packing}`);
    logBuffer.push(`- Therapeutic Category: ${newProd.category}`);
    logBuffer.push(`- Formulation Description: ${newProd.description}`);
    logBuffer.push(`Available now for country-wide province shipment! Order directly via our digital portal.`);
    logBuffer.push(`=============================================================`);
    logBuffer.push(".");
    logBuffer.push(`250 2.0.0 Ok: Campaign completed successfully. ${subscribers.length} alerts dispatched!`);
    logBuffer.push("QUIT");
    logBuffer.push("221 2.0.0 Bye [Marketing Relay Disconnected]");

    let currentMarketingStep = 0;
    const intervalMarketing = setInterval(() => {
      if (currentMarketingStep < logBuffer.length) {
        setEmailMarketingLogs(prev => [...prev, logBuffer[currentMarketingStep]]);
        currentMarketingStep++;
      } else {
        clearInterval(intervalMarketing);
        setIsEmailMarketingActive(false);
      }
    }, 80);

    // Reset Form
    setNewProdName('');
    setNewProdGeneric('');
    setNewProdPacking('');
    setNewProdPrice('');
    setNewProdCarton('');
    setNewProdDesc('');
    setNewProdCaution('');
    
    // Alert user
    alert(`Success: Product "${newProd.name}" created! ${subscribers.length} registered email notifications have been simulated in the Marketing Hub!`);
  };

  // Admin AI Chatbot answering logic
  const handleAdminChatSubmit = (e) => {
    e.preventDefault();
    if (!adminChatInput.trim()) return;

    const userMsg = adminChatInput;
    setAdminChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setAdminChatInput('');

    setTimeout(() => {
      const text = userMsg.toLowerCase();
      let reply = "";

      if (text.includes("province") || text.includes("sales") || text.includes("kabul")) {
        // Tally order counts by province
        const counts = orders.reduce((acc, o) => {
          acc[o.province] = (acc[o.province] || 0) + 1;
          return acc;
        }, {});
        const chartData = Object.entries(counts).map(([prov, c]) => `${prov}: ${c} order(s)`).join(', ');
        
        reply = `I parsed our current dynamic database. The order distribution across Afghanistan is currently: [ ${chartData || "No orders logged yet"} ]. Kabul remains the highest shipping vector.`;
      } 
      else if (text.includes("restock") || text.includes("inventory") || text.includes("stock")) {
        const outOfStock = products.filter(p => !p.available);
        if (outOfStock.length > 0) {
          reply = `Operational Alert: The following medicines are marked unavailable: ${outOfStock.map(p => p.name).join(', ')}. Recommend requesting a production restock batch immediately.`;
        } else {
          reply = "Operational Update: All 26 registered medicines are fully restocked and running active in the catalog.";
        }
      } 
      else if (text.includes("revenue") || text.includes("sales value") || text.includes("money")) {
        const totalRev = orders.reduce((sum, o) => sum + o.total, 0);
        const pendingCount = orders.filter(o => o.status === 'Pending').length;
        reply = `Dynamic Financial Telemetry: Total logged order turnover is ${totalRev.toFixed(1)} AFG. There are currently ${pendingCount} pending order packages that need physical dispatch.`;
      }
      else {
        reply = "Understood. Our AI operation registers consistent diagnostics. Kabul, Herat and Mazar-i-Sharif display the highest demand spikes for respiratory medicines (SALBU-NET and Phylli Cure) this week. Recommend prioritizing shipping logistics to those zones.";
      }

      setAdminChatMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    }, 1000);
  };

  // Helper to determine if a product was added in the last 7 days (as of May 22, 2026)
  const isNewProduct = (p) => {
    if (!p.createdDate) return false;
    const today = new Date("2026-05-22");
    const created = new Date(p.createdDate);
    const diffTime = Math.abs(today - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  // Custom filters count
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.generic.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Virtual filter logic for "New Products"
    const matchesCategory = categoryFilter === 'All' || 
                            (categoryFilter === 'New Products' ? isNewProduct(p) : p.category === categoryFilter);
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'New Products', ...new Set(products.map(p => p.category))];

  return (
    <div className={`app-container lang-${lang} ${lang === 'en' ? '' : 'is-rtl'}`.trim()}>
      {/* Navbar Header */}
      <header className="navbar" style={{ direction: lang === 'en' ? 'ltr' : 'rtl' }}>
        <div className="navbar-container">
          <div className="logo-wrapper" onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}>
            <img src="/logo.png" className="logo-img" alt="Cure Net Logo" />
            <div className="logo-text">
              <span>{TRANSLATIONS[lang].brandName}</span>
              <span className="logo-sub">{TRANSLATIONS[lang].brandSub}</span>
            </div>
          </div>
          
          {/* Language Switcher & Hamburger Button */}
          <div className="d-flex align-center gap-4">
            <div className="lang-switcher">
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
              <button className={`lang-btn ${lang === 'da' ? 'active' : ''}`} onClick={() => setLang('da')}>دری</button>
              <button className={`lang-btn ${lang === 'ps' ? 'active' : ''}`} onClick={() => setLang('ps')}>پشتو</button>
            </div>

            <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)} title="View Cart">
              <ShoppingCart size={20} />
              {cart.length > 0 && <span className="cart-badge">{cart.reduce((sum, i) => sum + i.qty, 0)}</span>}
            </button>

            {/* Mobile Hamburger Trigger */}
            <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span style={{ fontSize: '1.4rem' }}>☰</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {isMobileMenuOpen && (
              <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>✕</button>
            )}
            <span className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}>
              {TRANSLATIONS[lang].home}
            </span>
            <span className={`nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => { setActiveTab('products'); setIsMobileMenuOpen(false); }}>
              {TRANSLATIONS[lang].products}
            </span>
            <span className={`nav-item ${activeTab === 'diagnostics' ? 'active' : ''}`} onClick={() => { setActiveTab('diagnostics'); setIsMobileMenuOpen(false); }}>
              {TRANSLATIONS[lang].symptomChecker}
            </span>
            <span className={`nav-item ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => { setActiveTab('contact'); setIsMobileMenuOpen(false); }}>
              {TRANSLATIONS[lang].contactUs}
            </span>
            
            <button className="admin-toggle-btn" onClick={() => { setActiveTab('admin'); setIsMobileMenuOpen(false); }}>
              <Lock size={12} />
              {adminAuth ? TRANSLATIONS[lang].dashboard : TRANSLATIONS[lang].adminPanel}
            </button>
          </nav>
        </div>
      </header>

      {/* Main content body based on current active tab */}
      <main className="flex-1">
        
        {/* Tab 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div>
            {/* HERO HERO SECTION */}
            <section className="hero-section" style={{ direction: lang === 'en' ? 'ltr' : 'rtl', textAlign: lang === 'en' ? 'left' : 'right' }}>
              <div>
                <span className="hero-subtitle">{TRANSLATIONS[lang].mophTitle}</span>
                <h1>{TRANSLATIONS[lang].tagline}</h1>
                <p className="hero-desc">
                  {TRANSLATIONS[lang].description}
                </p>
                <div className="hero-buttons" style={{ justifyContent: lang === 'en' ? 'flex-start' : 'flex-end' }}>
                  <button className="btn btn-primary" onClick={() => setActiveTab('products')}>
                    {TRANSLATIONS[lang].browseBtn} <ArrowRight size={16} style={{ transform: lang === 'en' ? 'none' : 'rotate(180deg)' }} />
                  </button>
                  <button className="btn btn-secondary" onClick={() => setActiveTab('diagnostics')}>
                    {TRANSLATIONS[lang].diagnosticsBtn} <Sparkles size={16} />
                  </button>
                </div>
              </div>
              <div className="hero-visual">
                <div className="hero-brand-panel">
                  <div className="hero-brand-orb hero-brand-orb-1" />
                  <div className="hero-brand-orb hero-brand-orb-2" />
                  <div className="hero-brand-layout hero-brand-layout-single">
                    <div className="hero-brand-content">
                      <span className="hero-brand-kicker">{TRANSLATIONS[lang].brandSub}</span>
                      <div className="hero-brand-wordmark">
                        <span>{TRANSLATIONS[lang].brandName}</span>
                        <strong>CNP</strong>
                      </div>
                      <p className="hero-brand-copy">
                        Clean manufacturing presentation, stronger product visibility, and dependable nationwide delivery.
                      </p>
                    </div>
                    <div className="hero-brand-stats">
                      <div className="hero-badge hero-badge-clean">
                        <Activity size={22} className="text-primary" />
                        <div>
                          <div className="hero-badge-title">{TRANSLATIONS[lang].mophTitle}</div>
                          <div className="hero-badge-sub">{TRANSLATIONS[lang].mophDesc}</div>
                        </div>
                      </div>
                      <div className="hero-stat-card">
                        <strong>34 Provinces</strong>
                        <span>Reliable distribution coverage across Afghanistan.</span>
                      </div>
                      <div className="hero-stat-card">
                        <strong>26 Formulations</strong>
                        <span>Cleanly organized catalog for faster product discovery.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* DEDICATED NEW PRODUCTS CAROUSEL ROW */}
            <section className="content-section" style={{ direction: lang === 'en' ? 'ltr' : 'rtl' }}>
              <div className="new-products-banner">
                <div className="d-flex align-center justify-between gap-4 flex-column md:flex-row mb-6">
                  <div style={{ textAlign: lang === 'en' ? 'left' : 'right' }}>
                    <span className="section-subtitle">{TRANSLATIONS[lang].newProducts}</span>
                    <h2 style={{ margin: 0 }}>{TRANSLATIONS[lang].exploreNewBtn}</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      {TRANSLATIONS[lang].newArrivals}
                    </p>
                  </div>
                  <button className="btn btn-teal" onClick={() => { setActiveTab('products'); setCategoryFilter('New Products'); }}>
                    {TRANSLATIONS[lang].exploreNewBtn} →
                  </button>
                </div>

                <div className="new-products-scroll">
                  {products.filter(isNewProduct).map(prod => (
                    <div key={prod.id} className="product-card" style={{ position: 'relative', textAlign: lang === 'en' ? 'left' : 'right' }}>
                      <span className="new-badge">NEW</span>
                      <div className="product-category-tag">{prod.category}</div>
                      <h4 style={{ color: 'var(--primary-light)', fontSize: '1.1rem', margin: '0.5rem 0 0.2rem' }}>{prod.name}</h4>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{prod.generic}</div>
                      
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.75rem 0', minHeight: '3.2rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {prod.description}
                      </p>

                      <div className="d-flex justify-between align-center mt-4">
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{prod.price.toFixed(1)} AFG</span>
                        <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => addToCart(prod)}>
                          Add to Dispatch
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AUTOMATED NEWSLETTER SIGNUP CARD */}
                <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '2.5rem' }}>
                  <h3 style={{ color: 'var(--primary-light)', marginBottom: '0.5rem' }}>{TRANSLATIONS[lang].subscribeTitle}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '550px', margin: '0 auto 1.5rem' }}>
                    {TRANSLATIONS[lang].subscribeDesc}
                  </p>
                  
                  <form onSubmit={handleNewsletterSubscribe} className="email-subscribe-row">
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder={TRANSLATIONS[lang].subscribePlaceholder} 
                      value={subscriberEmail}
                      onChange={e => setSubscriberEmail(e.target.value)}
                      required 
                    />
                    <button type="submit" className="btn btn-teal">
                      {TRANSLATIONS[lang].subscribeBtn}
                    </button>
                  </form>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Total Registered Subscriber Entities: <strong style={{ color: 'var(--primary-light)' }}>{subscribers.length}</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURES SUMMARY */}
            <section className="content-section" style={{ paddingTop: '1rem', direction: lang === 'en' ? 'ltr' : 'rtl' }}>
              <div className="section-title-wrapper">
                <span className="section-subtitle">{TRANSLATIONS[lang].whyChoose}</span>
                <h2>{TRANSLATIONS[lang].whyChoose}</h2>
                <p>{TRANSLATIONS[lang].whyDesc}</p>
              </div>

              <div className="features-grid">
                <div className="feature-card" onClick={() => setActiveTab('products')}>
                  <div className="feature-icon-wrapper">
                    <Layers size={22} />
                  </div>
                  <h3 className="feature-title">26 Medical Formulations</h3>
                  <p className="feature-desc">From pediatric Paracetamol to specialized active Citrate syrups. Each engineered under strict quality assurance.</p>
                </div>

                <div className="feature-card" onClick={() => setActiveTab('diagnostics')}>
                  <div className="feature-icon-wrapper" style={{ color: '#0d9488', background: 'rgba(13, 148, 136, 0.08)' }}>
                    <Sparkles size={22} />
                  </div>
                  <h3 className="feature-title">AI Symptoms Checker</h3>
                  <p className="feature-desc">Instant online symptom analysis. Recommends exact medicine matches with clinical dosages and safety warnings.</p>
                </div>

                <div className="feature-card" onClick={() => setIsCartOpen(true)}>
                  <div className="feature-icon-wrapper" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.08)' }}>
                    <Map size={22} />
                  </div>
                  <h3 className="feature-title">GPS Target Delivery</h3>
                  <p className="feature-desc">Interactive satellite map pins pinpoint your exact pharmacy or home coordinate for seamless province shipping.</p>
                </div>
              </div>
            </section>

            {/* DYNAMIC SHOWCASE LAB SECTION */}
            <section className="content-section clean-highlight-section" style={{ maxWidth: '100%' }}>
              <div className="hero-section clean-highlight-wrap" style={{ padding: '2rem max(2rem, (100% - 1280px)/2)' }}>
                <div className="hero-visual">
                  <div className="hero-brand-panel hero-brand-panel-secondary">
                    <div className="hero-brand-orb hero-brand-orb-3" />
                    <div className="showcase-copy showcase-copy-enhanced">
                      <div className="showcase-kicker">Batch Monitoring</div>
                      <h3>Clear production flow</h3>
                      <p>From raw ingredient checks to dispatch review, every stage is presented in a cleaner, brighter interface.</p>
                    </div>
                    <div className="showcase-metrics">
                      <div className="showcase-metric">
                        <span>Stability Tests</span>
                        <strong>Verified</strong>
                      </div>
                      <div className="showcase-metric">
                        <span>Packaging Review</span>
                        <strong>Ready</strong>
                      </div>
                      <div className="showcase-metric">
                        <span>Dispatch Visibility</span>
                        <strong>Live</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="hero-subtitle">Laboratory Science</span>
                  <h2>Advanced Production & Rigorous Assays</h2>
                  <p className="hero-desc" style={{ fontSize: '1rem' }}>
                    Each production batch of Cure Net Pharmaceuticals goes through strenuous chemical assays and stability tests. Shielding essential minerals and multivitamins in custom amber glass bottles or premium PET packaging. We guarantee medicine bio-availability and potency throughout its shelf life, even in demanding regional logistics.
                  </p>
                  <button className="btn btn-teal" onClick={() => setActiveTab('contact')}>
                    Get in Touch with our Labs
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: PRODUCTS CATALOG */}
        {activeTab === 'products' && (
          <section className="content-section">
            <div className="section-title-wrapper">
              <span className="section-subtitle">Active Inventory</span>
              <h2>Registered Medical Formulations</h2>
              <p>Explore our active catalog of 26 high-grade syrups, suspensions, supplements, and vitamins manufactured by Cure Net.</p>
            </div>

            <div className="products-layout">
              {/* Sidebar Filters */}
              <aside className="sidebar-filters">
                <div className="search-input-wrapper">
                  <Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search medicine or generic..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="filter-group">
                  <h4 className="filter-title">Therapeutic Use</h4>
                  <ul className="filter-list">
                    {categories.map(cat => (
                      <li key={cat}>
                        <button 
                          className={`filter-btn ${categoryFilter === cat ? 'active' : ''}`}
                          onClick={() => setCategoryFilter(cat)}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Products Display Grid */}
              <div className="products-grid">
                {filteredProducts.map(product => {
                  const visual = getCategoryVisual(product.category);
                  const VisualIcon = visual.Icon;

                  return (
                  <article key={product.id} className="product-card" style={{ opacity: product.available ? 1 : 0.6 }}>
                    <div className="product-img-wrapper">
                      <div className={`product-visual product-visual-${visual.tone}`}>
                        <span className="product-visual-pill">{visual.label}</span>
                        <VisualIcon size={44} />
                        <span className="product-visual-generic-name">{product.generic}</span>
                      </div>
                      <span className="product-badge">{product.category}</span>
                    </div>

                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-generic">{product.generic}</div>
                      
                      <p style={{ fontSize: '0.8rem', marginBottom: '1rem', flex: 1, color: 'var(--text-secondary)' }}>
                        {product.description}
                      </p>

                      <div className="product-meta-row">
                        <span className="product-packing">
                          <Layers size={12} /> {product.packing}
                        </span>
                        <span className="product-carton">
                          <Activity size={12} /> Box: {product.carton} Pcs
                        </span>
                      </div>

                      <div className="product-footer">
                        <div>
                          <div className="product-price-label">Price per Bottle</div>
                          <div className="product-price">{product.price.toFixed(1)} AFG</div>
                        </div>
                        
                        {product.available ? (
                          <button 
                            className="product-add-btn"
                            onClick={() => addToCart(product)}
                            title="Add to Order Cart"
                          >
                            <ShoppingCart size={16} />
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700 }}>Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </article>
                )})}
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: AI DIAGNOSTICS & SYMPTOM CHECKER */}
        {activeTab === 'diagnostics' && (
          <section className="content-section">
            <div className="section-title-wrapper">
              <span className="section-subtitle">AI Diagnostics Interface</span>
              <h2>Automated Symptom Recommender</h2>
              <p>State-of-the-art diagnostic recommendations based on local Cure Net Pharmaceuticals. Select clinical symptoms below to discover appropriate medicine recommendations.</p>
            </div>

            <div className="ai-recommend-container">
              {/* Form Input Side */}
              <div className="glass-panel ai-form-side">
                <div>
                  <h3 className="feature-title mb-2">Patient Diagnostic Selector</h3>
                  <p style={{ fontSize: '0.85rem' }}>Select your primary symptom profile or enter detailed custom conditions in the diagnostics window below.</p>
                </div>

                <div className="symptom-tag-container">
                  {CLINICAL_DIAGNOSTICS.map(item => (
                    <span 
                      key={item.id}
                      className={`symptom-tag ${selectedDiagnostic === item.id ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedDiagnostic(item.id);
                        setCustomSymptomInput('');
                      }}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAISymptomSubmit}>
                  <div className="mb-4">
                    <label className="form-label">Detailed Symptoms (Optional)</label>
                    <textarea 
                      rows={3} 
                      className="form-textarea"
                      placeholder="Type details (e.g., 'My child has a mild fever and a persistent dry throat cough since yesterday afternoon...')"
                      value={customSymptomInput}
                      onChange={(e) => {
                        setCustomSymptomInput(e.target.value);
                        setSelectedDiagnostic(null);
                      }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Sparkles size={16} /> Analyze Conditions & Suggest Medicine
                  </button>
                </form>

                <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '1rem', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--accent)' }}>
                  <div className="d-flex align-center gap-2 mb-2" style={{ fontWeight: 700 }}>
                    <AlertCircle size={16} /> Clinical Warning Disclaimer
                  </div>
                  Our AI Diagnostics provides quick matches based on chemical compound indications. It does not replace a professional doctor's clinical visit. Consult a qualified medical practitioner for severe conditions.
                </div>
              </div>

              {/* Diagnostic Results Side */}
              <div className="glass-panel ai-recommendation-panel">
                <div className="ai-diagnostics-header">
                  <div className={isAnalyzing ? "ai-status-pulse" : "ai-status-pulse"} style={{ backgroundColor: isAnalyzing ? '#f59e0b' : '#10b981' }} />
                  <span className="ai-status-text">
                    {isAnalyzing ? "AI Diagnostics running query..." : "AI Diagnostics Active"}
                  </span>
                </div>

                {isAnalyzing ? (
                  <div className="ai-idle-message">
                    <RefreshCw size={40} className="text-primary mb-4" style={{ animation: 'spin 2s linear infinite' }} />
                    <h4>Compiling Chemical Affinities...</h4>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Comparing symptom taxonomy to active ingredients in our Afghanistan laboratories...</p>
                  </div>
                ) : aiAnalysisResult ? (
                  <div className="ai-diagnostics-result">
                    <div className="ai-disease-card">
                      <div className="disease-name">
                        {aiAnalysisResult.disease}
                        <span className="disease-confidence">{aiAnalysisResult.confidence} Confidence</span>
                      </div>
                      <p className="disease-description">{aiAnalysisResult.description}</p>
                    </div>

                    <h4 className="mb-2" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--text-primary)' }}>
                      Highly Recommended Formulation(s):
                    </h4>
                    
                    <div className="recommended-medicines-list">
                      {aiAnalysisResult.recommendedProducts.map(med => (
                        <div key={med.id} className="recommended-med-item">
                          <div>
                            <h4 style={{ color: 'var(--primary-light)' }}>{med.name}</h4>
                            <span className="inventory-generic-tag">{med.generic} • {med.packing}</span>
                            <p className="med-meta-desc">{med.description}</p>
                            <div className="med-caution">
                              <Info size={12} /> {med.caution}
                            </div>
                          </div>
                          <div className="text-center" style={{ minWidth: '100px' }}>
                            <div className="product-price" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{med.price.toFixed(1)} AFG</div>
                            
                            {med.available ? (
                              <button 
                                className="btn btn-teal" 
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                                onClick={() => addToCart(med)}
                              >
                                <Plus size={12} /> Order
                              </button>
                            ) : (
                              <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>Out of Stock</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="ai-idle-message">
                    <Activity size={48} className="text-primary mb-4" />
                    <h4>Awaiting Patient Telemetry</h4>
                    <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Select a symptom tag or describe your physical symptoms on the left. The AI diagnostic system will compute medicine recommendations instantly.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: CONTACT US PAGE */}
        {activeTab === 'contact' && (
          <section className="content-section">
            <div className="section-title-wrapper">
              <span className="section-subtitle">Reach Our Labs</span>
              <h2>Cure Net Headquarters</h2>
              <p>Have questions about manufacturing distribution, contract manufacturing, or medical orders? Get in touch with our corporate team in Afghanistan.</p>
            </div>

            <div className="contact-section">
              <div className="glass-panel">
                <h3 className="feature-title mb-4">Corporate & Lab Inquiries</h3>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Salam! Your inquiry has been transmitted directly to our corporate communication desk at info@curenet.af.");
                }}>
                  <div className="mb-4">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" placeholder="Your Name" required />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" placeholder="name@company.com" required />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Message</label>
                    <textarea rows={5} className="form-textarea" placeholder="Your specific question regarding shipping, bulk pharmacy purchases, or GMP certificates..." required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Send size={16} /> Send Secure Message
                  </button>
                </form>
              </div>

              <div>
                <h3 className="feature-title">Locate Our Headquarters</h3>
                <p>We operate highly specialized production facilities, certified under MoPH and WHO guidelines, located in industrial zones in Kabul.</p>
                
                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <MapPin size={24} className="contact-info-icon" />
                    <div>
                      <div className="contact-info-title">Corporate Address</div>
                      <div className="contact-info-value">Cure Net Pharmaceuticals, Phase 1, Industrial Parks, Kabul, Afghanistan</div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <Phone size={24} className="contact-info-icon" />
                    <div>
                      <div className="contact-info-title">Operations Support Desk</div>
                      <div className="contact-info-value">+93 (0) 799 44 55 66 / +93 (0) 20 220 55 66</div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <Mail size={24} className="contact-info-icon" />
                    <div>
                      <div className="contact-info-title">Secure Communications</div>
                      <div className="contact-info-value">info@curenet.af / orders@curenet.af</div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed var(--border-color)' }}>
                  <h4 style={{ color: 'var(--primary-light)', marginBottom: '0.5rem' }}>Pharmacy Bulk Purchases</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Licensed Afghan pharmacies and medical distributors in Herat, Balkh, Nangarhar, and Kunduz are eligible for high-volume carton discounts. Please contact us directly with copy of license.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 5: ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <section className="content-section">
            {!adminAuth ? (
              // Administrative Authentication Guard
              <div className="glass-panel" style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
                <Lock size={48} className="text-primary mb-4" style={{ margin: '0 auto' }} />
                <h2>Administrative Handshake Required</h2>
                <p style={{ fontSize: '0.85rem' }}>Authorized staff only. Enter operational credentials to unlock orders registry and inventory dashboard.</p>
                
                <form onSubmit={handleAdminLogin} style={{ marginTop: '1.5rem' }}>
                  <div className="mb-4">
                    <input 
                      type="password" 
                      placeholder="Enter Admin Password..." 
                      className="form-input text-center"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                  </div>
                  {adminError && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '1rem' }}>{adminError}</div>}
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Verify Credentials
                  </button>
                </form>
                
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                  Hint: Use password <code style={{ color: 'var(--primary-light)' }}>paikanm@curenet</code> to authenticate
                </p>
              </div>
            ) : (
              // Active Admin Panel
              <div className="admin-dashboard-container">
                <div className="admin-header-row">
                  <div className="admin-title-group">
                    <h2>Cure Net Administration Console</h2>
                    <span className="admin-subtitle">Real-time inventory and province shipment telemetry.</span>
                  </div>
                  <button className="btn btn-secondary" onClick={() => setAdminAuth(false)}>
                    Lock Session
                  </button>
                </div>

                {/* Dashboard KPIs */}
                <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                  <div className="stat-card">
                    <div className="stat-info">
                      <span className="stat-label">Total Shipments</span>
                      <span className="stat-value">{orders.length}</span>
                    </div>
                    <div className="stat-icon-wrapper orders"><ShoppingCart size={24} /></div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-info">
                      <span className="stat-label">Total Revenue</span>
                      <span className="stat-value">{(orders.reduce((sum, o) => sum + o.total, 0)).toFixed(0)} AFG</span>
                    </div>
                    <div className="stat-icon-wrapper revenue"><TrendingUp size={24} /></div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-info">
                      <span className="stat-label">Pending Dispatch</span>
                      <span className="stat-value">{orders.filter(o => o.status === 'Pending').length}</span>
                    </div>
                    <div className="stat-icon-wrapper pending" style={{ color: '#f59e0b' }}><Activity size={24} /></div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-info">
                      <span className="stat-label">Registered Subscribers</span>
                      <span className="stat-value">{subscribers.length}</span>
                    </div>
                    <div className="stat-icon-wrapper products" style={{ color: '#10b981' }}><Mail size={24} /></div>
                  </div>
                </div>

                {/* SUB-PAGES / TABS NAVIGATION */}
                <div className="admin-section-tabs">
                  <button className={`admin-tab-btn ${adminSubTab === 'orders' ? 'active' : ''}`} onClick={() => setAdminSubTab('orders')}>
                    <ShoppingCart size={14} /> Orders Registry ({orders.length})
                  </button>
                  <button className={`admin-tab-btn ${adminSubTab === 'inventory' ? 'active' : ''}`} onClick={() => setAdminSubTab('inventory')}>
                    <Database size={14} /> Inventory Control ({products.length})
                  </button>
                  <button className={`admin-tab-btn ${adminSubTab === 'marketing' ? 'active' : ''}`} onClick={() => setAdminSubTab('marketing')}>
                    <Mail size={14} /> Email Marketing Hub ({subscribers.length})
                  </button>
                  <button className={`admin-tab-btn ${adminSubTab === 'chatbot' ? 'active' : ''}`} onClick={() => setAdminSubTab('chatbot')}>
                    <Sparkles size={14} /> Operations AI & Telemetry
                  </button>
                </div>

                {/* SUB-PAGE 1: ORDERS REGISTRY */}
                {adminSubTab === 'orders' && (
                  <div className="glass-panel orders-list-panel">
                    <h3 className="feature-title mb-4">Active Province Orders</h3>
                    <div className="orders-table-wrapper">
                      <table className="orders-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer & Contacts</th>
                            <th>Province / Coordinates</th>
                            <th>Formulations Purchased</th>
                            <th>Total AFG</th>
                            <th>Status Control</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order.id}>
                              <td style={{ fontWeight: 800, color: 'var(--primary-light)' }}>#{order.id}</td>
                              <td>
                                <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{order.name}</div>
                                <div style={{ fontSize: '0.8rem' }} className="d-flex align-center gap-2">
                                  <Phone size={10} /> {order.phone}
                                </div>
                              </td>
                              <td>
                                <div style={{ color: 'var(--text-primary)' }}>{order.province}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.district}, {order.street}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--primary-light)', fontFamily: 'monospace' }} className="d-flex align-center gap-2">
                                  <MapPin size={10} /> {order.gpsCoords}
                                </div>
                              </td>
                              <td>
                                {order.items.map((i, idx) => (
                                  <div key={idx} style={{ fontSize: '0.8rem' }}>
                                    {i.name} <strong style={{ color: 'var(--primary-light)' }}>x{i.qty}</strong>
                                  </div>
                                ))}
                              </td>
                              <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{order.total.toFixed(0)} AF</td>
                              <td>
                                <div className="d-flex flex-column gap-2">
                                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                                    {order.status}
                                  </span>
                                  {order.status === 'Pending' && (
                                    <button 
                                      className="btn btn-teal"
                                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                                      onClick={() => handleUpdateOrderStatus(order.id, 'Shipped')}
                                    >
                                      Ship Pack
                                    </button>
                                  )}
                                  {order.status === 'Shipped' && (
                                    <button 
                                      className="btn btn-primary"
                                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                                      onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}
                                    >
                                      Deliver Pack
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SUB-PAGE 2: INVENTORY CONTROL & SCAFFOLDER */}
                {adminSubTab === 'inventory' && (
                  <div className="glass-panel inventory-manager-container">
                    <h3 className="feature-title" style={{ marginBottom: '1.5rem' }}>Global Inventory & Product Scaffolder</h3>
                    
                    {/* Quick Add Product Form */}
                    <form onSubmit={handleAddProduct} className="quick-add-form" style={{ marginBottom: '2.5rem' }}>
                      <div className="inventory-input-group">
                        <span className="inventory-input-label">Medicine Brand Name</span>
                        <input type="text" placeholder="e.g. Cure-Fen DS" className="inventory-input" value={newProdName} onChange={e => setNewProdName(e.target.value)} />
                      </div>

                      <div className="inventory-input-group">
                        <span className="inventory-input-label">Chemical Generic Name</span>
                        <input type="text" placeholder="e.g. IBUPROFEN" className="inventory-input" value={newProdGeneric} onChange={e => setNewProdGeneric(e.target.value)} />
                      </div>

                      <div className="inventory-input-group">
                        <span className="inventory-input-label">Packing (Size/ML)</span>
                        <input type="text" placeholder="e.g. 200mg/5ml" className="inventory-input" value={newProdPacking} onChange={e => setNewProdPacking(e.target.value)} />
                      </div>

                      <div className="inventory-input-group">
                        <span className="inventory-input-label">Price in AFG</span>
                        <input type="number" step="0.1" placeholder="e.g. 24.5" className="inventory-input" value={newProdPrice} onChange={e => setNewProdPrice(e.target.value)} />
                      </div>

                      <div className="inventory-input-group">
                        <span className="inventory-input-label">Carton Qty (Box)</span>
                        <input type="number" placeholder="e.g. 80" className="inventory-input" value={newProdCarton} onChange={e => setNewProdCarton(e.target.value)} />
                      </div>

                      <div className="inventory-input-group">
                        <span className="inventory-input-label">Therapeutic Use Category</span>
                        <select className="inventory-input" value={newProdCategory} onChange={e => setNewProdCategory(e.target.value)}>
                          <option value="Analgesic & Fever">Analgesic & Fever</option>
                          <option value="Respiratory">Respiratory</option>
                          <option value="Gastrointestinal">Gastrointestinal</option>
                          <option value="Vitamins & Health">Vitamins & Health</option>
                          <option value="Urinary Tract">Urinary Tract</option>
                          <option value="Anti-infective">Anti-infective</option>
                          <option value="Cognitive & Energy">Cognitive & Energy</option>
                        </select>
                      </div>

                      <div className="inventory-input-group" style={{ gridColumn: 'span 2' }}>
                        <span className="inventory-input-label">Formulation Description</span>
                        <input type="text" placeholder="Describe medicine therapeutic benefits..." className="inventory-input" value={newProdDesc} onChange={e => setNewProdDesc(e.target.value)} />
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', height: '42px', alignSelf: 'flex-end' }}>
                        <Plus size={16} /> Scaffold & Publish
                      </button>
                    </form>

                    {/* Active Inventory Grid */}
                    <div className="inventory-grid">
                      {products.map(prod => (
                        <div key={prod.id} className="inventory-item-card" style={{ opacity: prod.available ? 1 : 0.6 }}>
                          <div className="inventory-item-header">
                            <div>
                              <div className="d-flex align-center gap-2">
                                <h4 style={{ color: 'var(--primary-light)' }}>{prod.name}</h4>
                                {isNewProduct(prod) && <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.6rem', padding: '0.1rem 0.3rem', borderRadius: '3px', fontWeight: 800 }}>NEW</span>}
                              </div>
                              <span className="inventory-generic-tag">{prod.generic}</span>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ID #{prod.id}</span>
                          </div>

                          <div className="inventory-edit-row">
                            <div className="inventory-input-group">
                              <span className="inventory-input-label">Price (AFG)</span>
                              <input 
                                type="number" 
                                step="0.1" 
                                className="inventory-input"
                                value={prod.price}
                                onChange={(e) => handleUpdatePrice(prod.id, e.target.value)}
                              />
                            </div>

                            <div className="inventory-input-group">
                              <span className="inventory-input-label">Carton Size</span>
                              <input 
                                type="number" 
                                className="inventory-input"
                                value={prod.carton}
                                onChange={(e) => handleUpdateCarton(prod.id, e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-between align-center" style={{ marginTop: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Packing: {prod.packing}</span>
                            <button 
                              className={`btn ${prod.available ? 'btn-teal' : 'btn-danger'}`}
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                              onClick={() => handleToggleAvailable(prod.id)}
                            >
                              {prod.available ? "Active" : "Disabled"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB-PAGE 3: EMAIL MARKETING HUB */}
                {adminSubTab === 'marketing' && (
                  <div className="glass-panel">
                    <h3 className="feature-title mb-4">Newsletter Broadcasting & Automated Email Hub</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                      Cure Net is integrated with automated marketing intelligence. Subscribed provincial clinic entities receive instantaneous SMTP email dispatches when a new medicine is scaffolded or updated.
                    </p>

                    <div className="dashboard-main-grid">
                      {/* Active Subscribers Panel */}
                      <div className="glass-panel">
                        <h4 className="mb-4" style={{ color: 'var(--primary-light)' }}>Registered Subscribers Directory</h4>
                        <div className="subscribers-grid">
                          {subscribers.map((email, idx) => (
                            <div key={idx} className="subscriber-card">
                              <div className="subscriber-avatar">
                                <User size={16} />
                              </div>
                              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>Subscriber #{idx+1}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{email}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Broadcaster Terminal */}
                      <div>
                        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <h4 className="mb-2" style={{ color: 'var(--primary-light)' }}>Interactive SMTP Broadcasting Terminal</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                            Simulate launching manual newsletters regarding current clinical inventory to all registered clinics.
                          </p>

                          <div className="smtp-visualizer-container" style={{ flex: 1, minHeight: '260px', maxHeight: '350px' }}>
                            {emailMarketingLogs.length === 0 ? (
                              <div className="text-center" style={{ color: 'var(--text-muted)', paddingTop: '5rem', fontSize: '0.8rem' }}>
                                <Mail size={32} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                                Terminal Idle. Scaffold a new product or trigger a broadcast simulation to view real-time SMTP telemetry logs.
                              </div>
                            ) : (
                              emailMarketingLogs.map((log, i) => (
                                <div key={i} className={`smtp-log-line ${log.startsWith('[SMTP') ? 'smtp-log-system' : log.startsWith('250') || log.startsWith('235') ? 'smtp-log-success' : ''}`} style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
                                  {log}
                                </div>
                              ))
                            )}
                          </div>

                          <button 
                            className="btn btn-teal" 
                            style={{ width: '100%', marginTop: '1rem' }}
                            disabled={isEmailMarketingActive}
                            onClick={() => {
                              setIsEmailMarketingActive(true);
                              setEmailMarketingLogs([`[SMTP MANUAL TRIGGER] Launching global inventory review alert to subscribers...`]);
                              
                              let logs = [
                                `CONNECT mail.curenet-marketing.af:25 [Establishing marketing connection]`,
                                "220 mail.curenet-marketing.af ESMTP Marketing Postfix",
                                "EHLO dispatch.curenet-marketing.af",
                                "250-mail.curenet-marketing.af, SIZE 10485760, PIPELINING",
                                `MAIL FROM: <marketing-alerts@curenet.af>`,
                                "250 2.1.0 Ok"
                              ];

                              subscribers.forEach(email => {
                                logs.push(`RCPT TO: <${email}>`);
                                logs.push(`250 2.1.5 Ok [Transmitting alert payload to ${email}]`);
                              });

                              logs.push("DATA");
                              logs.push(`354 Start mail input; end with <CR><LF>.<CR><LF>`);
                              logs.push(`Subject: CERTIFIED PHARMACEUTICAL CATALOG UPDATE - CURE NET`);
                              logs.push(`From: Cure Net Pharmaceuticals <marketing-alerts@curenet.af>`);
                              logs.push(`=================== OPERATION STATUS UPDATE ===================`);
                              logs.push(`Salam Alaikum,`);
                              logs.push(`We have updated our catalog database standard on May 22, 2026.`);
                              logs.push(`- Total Active Formulations: ${products.length} Syrup & Suspension Batches`);
                              logs.push(`- High Demand Provinces: Kabul, Herat, Balkh, Kandahar`);
                              logs.push(`Log in directly to order medicine packs with standard provincial logistics rates!`);
                              logs.push(`================================================================`);
                              logs.push(".");
                              logs.push(`250 2.0.0 Ok: Campaign completed successfully. ${subscribers.length} alerts dispatched!`);
                              logs.push("QUIT");
                              logs.push("221 2.0.0 Bye [Marketing Relay Disconnected]");

                              let step = 0;
                              const timer = setInterval(() => {
                                if (step < logs.length) {
                                  setEmailMarketingLogs(prev => [...prev, logs[step]]);
                                  step++;
                                } else {
                                  clearInterval(timer);
                                  setIsEmailMarketingActive(false);
                                }
                              }, 80);
                            }}
                          >
                            {isEmailMarketingActive ? "Dispatched Transmission Running..." : "Broadcast Operational Update Simulation"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-PAGE 4: OPERATIONS AI & TELEMETRY */}
                {adminSubTab === 'chatbot' && (
                  <div className="dashboard-main-grid">
                    {/* Province Order Telemetry */}
                    <div className="glass-panel province-chart-panel">
                      <h3 className="feature-title mb-4">Province Telemetry</h3>
                      
                      {(() => {
                        // Dynamically tally order counts per province
                        const tallies = orders.reduce((acc, o) => {
                          acc[o.province] = (acc[o.province] || 0) + 1;
                          return acc;
                        }, {});

                        const maxOrders = Math.max(...Object.values(tallies), 1);

                        return Object.entries(tallies).map(([prov, count]) => {
                          const percentage = (count / maxOrders) * 100;
                          return (
                            <div key={prov} className="province-bar-row">
                              <div className="province-bar-info">
                                <span>{prov}</span>
                                <strong>{count} shipment(s)</strong>
                              </div>
                              <div className="province-bar-track">
                                <div className="province-bar-fill" style={{ width: `${percentage}%` }} />
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>

                    {/* Operational AI Assistant */}
                    <div className="glass-panel admin-ai-panel">
                      <div className="admin-ai-header d-flex align-center gap-2">
                        <Sparkles size={20} className="text-primary" />
                        <h3 className="feature-title">Operations AI Assistant</h3>
                      </div>

                      <div className="admin-ai-chat" style={{ minHeight: '260px', maxHeight: '350px' }}>
                        {adminChatMessages.map((msg, index) => (
                          <div key={index} className={`chat-message ${msg.role}`}>
                            {msg.text}
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleAdminChatSubmit} className="chat-input-row">
                        <input 
                          type="text" 
                          placeholder="Query province metrics, stock levels..."
                          className="form-input"
                          value={adminChatInput}
                          onChange={(e) => setAdminChatInput(e.target.value)}
                        />
                        <button type="submit" className="btn btn-teal" style={{ padding: '0.75rem' }}>
                          <Send size={16} />
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="logo-wrapper">
              <img src="/logo.png" className="logo-img" alt="Cure Net Logo" />
              <div className="logo-text">
                <span>CURE NET</span>
                <span className="logo-sub">Pharmaceuticals</span>
              </div>
            </div>
            <p className="footer-desc">
              Cure Net Pharmaceuticals is a premier MoPH-certified pharmaceutical brand in Afghanistan. Innovating healthcare manufacturing with next-level clinical solutions and country-wide dynamic logistics.
            </p>
          </div>

          <div>
            <h4 className="footer-title">Medicines Menu</h4>
            <ul className="footer-links">
              <li><span className="footer-link" onClick={() => { setActiveTab('products'); setCategoryFilter('Analgesic & Fever'); }}>Analgesics & Fever</span></li>
              <li><span className="footer-link" onClick={() => { setActiveTab('products'); setCategoryFilter('Respiratory'); }}>Respiratory Solutions</span></li>
              <li><span className="footer-link" onClick={() => { setActiveTab('products'); setCategoryFilter('Gastrointestinal'); }}>Gastrointestinal (Antacids)</span></li>
              <li><span className="footer-link" onClick={() => { setActiveTab('products'); setCategoryFilter('Vitamins & Health'); }}>Multivitamins & Folate</span></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Interactive Services</h4>
            <ul className="footer-links">
              <li><span className="footer-link" onClick={() => setActiveTab('diagnostics')}>AI Diagnostics Checker</span></li>
              <li><span className="footer-link" onClick={() => setIsCartOpen(true)}>Afghanistan Province Shipments</span></li>
              <li><span className="footer-link" onClick={() => setActiveTab('contact')}>Enterprise Manufacturing Partnerships</span></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Operational Hours</h4>
            <ul className="footer-links" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <li>Saturday - Thursday: 8:00 AM - 5:00 PM</li>
              <li>Friday: Corporate Desk Closed</li>
              <li>Operational Emergency Contact:</li>
              <li style={{ color: 'var(--primary-light)', fontWeight: 600 }}>+93 (0) 799 44 55 66</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Cure Net Pharmaceuticals Afghanistan. All Rights Reserved. Certified GMP Manufacturer.</span>
          <div className="d-flex gap-4">
            <span className="footer-link" onClick={() => setActiveTab('admin')}>Staff Portal</span>
            <span className="footer-link">WHO Compliance</span>
            <span className="footer-link">MoPH Registry</span>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="cart-drawer-overlay" onClick={() => { if(!isSmtpActive) setIsCartOpen(false); }}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div className="d-flex align-center gap-2">
                <ShoppingCart size={22} className="text-primary" />
                <h3 className="feature-title">Your Order Cart</h3>
              </div>
              <button className="cart-close-btn" onClick={() => { if(!isSmtpActive) setIsCartOpen(false); }}>
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="ai-idle-message">
                <ShoppingCart size={48} className="text-primary mb-4" />
                <h4>Your Cart is Empty</h4>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Browse our medicines catalog or run our AI Diagnostics checker to add products to your dispatch order.</p>
              </div>
            ) : (
              <>
                <div className="cart-items-list">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div>
                        <h4 style={{ color: 'var(--primary-light)' }}>{item.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.generic}</span>
                      </div>
                      
                      <div className="cart-item-qty-control">
                        <button className="qty-btn" onClick={() => updateCartQty(item.id, -1)} disabled={isSmtpActive}>
                          <Minus size={10} />
                        </button>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.qty}</span>
                        <button className="qty-btn" onClick={() => updateCartQty(item.id, 1)} disabled={isSmtpActive}>
                          <Plus size={10} />
                        </button>
                      </div>

                      <div className="text-center">
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>{(item.price * item.qty).toFixed(1)} AF</div>
                        <button 
                          className="cart-close-btn" 
                          style={{ fontSize: '0.7rem', color: '#ef4444', marginTop: '0.2rem' }}
                          onClick={() => removeFromCart(item.id)}
                          disabled={isSmtpActive}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Summary */}
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{getSubtotal().toFixed(1)} AFG</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping to {checkoutProvince}</span>
                    <span>{getSelectedProvinceShipping()} AFG</span>
                  </div>
                  <div className="summary-row total">
                    <span>Grand Total</span>
                    <span>{getCartTotal().toFixed(1)} AFG</span>
                  </div>
                </div>

                {/* Checkout Fields */}
                <form onSubmit={handleCheckoutSubmit} className="checkout-form-container">
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                    Secure Province Delivery Address
                  </h4>

                  <div className="form-row">
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Full Delivery Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Dr. Ahmad Jawed" 
                        className="form-input" 
                        required 
                        value={checkoutName}
                        onChange={e => setCheckoutName(e.target.value)}
                        disabled={isSmtpActive}
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Province Selection</label>
                      <select 
                        className="form-select"
                        value={checkoutProvince}
                        onChange={e => setCheckoutProvince(e.target.value)}
                        disabled={isSmtpActive}
                      >
                        {AFGHANISTAN_PROVINCES.map(prov => (
                          <option key={prov.name} value={prov.name}>{prov.name} (+{prov.shippingCost} AFG)</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>District</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Karte Char" 
                        className="form-input" 
                        required 
                        value={checkoutDistrict}
                        onChange={e => setCheckoutDistrict(e.target.value)}
                        disabled={isSmtpActive}
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Street & House No.</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Street 4, Pharmacy Plaza" 
                        className="form-input" 
                        required 
                        value={checkoutStreet}
                        onChange={e => setCheckoutStreet(e.target.value)}
                        disabled={isSmtpActive}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Contact Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. 0799887766" 
                      className="form-input" 
                      required 
                      value={checkoutPhone}
                      onChange={e => setCheckoutPhone(e.target.value)}
                      disabled={isSmtpActive}
                    />
                  </div>

                  {/* Satellite Interactive Map */}
                  <div className="map-section">
                    <div className="map-header">
                      <span className="map-title">
                        <Map size={14} /> High Accuracy Satellite Pinpoint
                      </span>
                      <span className="map-coords-badge">
                        GPS: {gpsCoords.lat.toFixed(5)}, {gpsCoords.lng.toFixed(5)}
                      </span>
                    </div>

                    {/* Leaflet container ref */}
                    <div ref={mapRef} className="leaflet-map-element" />

                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      style={{ width: '100%', borderRadius: 0, padding: '0.4rem', fontSize: '0.75rem', border: 'none', borderTop: '1px solid var(--border-glass)' }}
                      onClick={handleAutoDetectLocation}
                      disabled={isSmtpActive}
                    >
                      <Activity size={12} /> Auto-Detect Live GPS Coordinates
                    </button>
                  </div>

                  {isSmtpActive ? (
                    <div className="smtp-visualizer-container">
                      {smtpLogs.map((log, i) => (
                        <div key={i} className={`smtp-log-line ${log.startsWith('CONNECT') ? 'smtp-log-system' : log.startsWith('250') || log.startsWith('235') || log.startsWith('221') ? 'smtp-log-success' : ''}`}>
                          {log}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                      <CheckCircle size={16} /> Submit Order & Dispatch SMTP Email
                    </button>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Success Order Checkout Modal */}
      {showCheckoutSuccess && (
        <div className="order-success-overlay">
          <div className="order-success-content glass-panel" style={{ border: '2px solid var(--primary)' }}>
            <div className="success-icon-ring">
              <Check size={40} className="text-primary" />
            </div>
            <h2 className="mb-2" style={{ color: 'var(--primary-light)' }}>Order Successfully Transmitted!</h2>
            <h4 className="mb-6" style={{ color: 'var(--text-secondary)' }}>Secure Transaction Code: #CNP-{lastPlacedOrderId}</h4>
            
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Salam! Your order has been securely processed. A detailed SMTP email alert was dispatched to our Kabul headquarters at <strong style={{ color: 'var(--text-primary)' }}>orders@curenetpharmaceuticals.com</strong>. Our logistics fleet is compiling your province delivery pack. Keep your phone active!
            </p>

            <button className="btn btn-primary" onClick={() => setShowCheckoutSuccess(false)}>
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
