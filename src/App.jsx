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
  Map, 
  Settings, 
  Layers, 
  ChevronRight, 
  Lock,
  ArrowRight,
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

const CATEGORY_LABELS = {
  en: {
    All: "All",
    "New Products": "New Products",
    "Analgesic & Fever": "Analgesic & Fever",
    "Cough & Cold": "Cough & Cold",
    Respiratory: "Respiratory",
    Gastrointestinal: "Gastrointestinal",
    "Vitamins & Health": "Vitamins & Health",
    "Urinary Tract": "Urinary Tract",
    "Anti-infective": "Anti-infective",
    "Cognitive & Energy": "Cognitive & Energy"
  },
  da: {
    All: "همه",
    "New Products": "محصولات جدید",
    "Analgesic & Fever": "مسکن و تب",
    "Cough & Cold": "سرفه و زکام",
    Respiratory: "تنفسی",
    Gastrointestinal: "گوارشی",
    "Vitamins & Health": "ویتامین و سلامت",
    "Urinary Tract": "مجرای ادرار",
    "Anti-infective": "ضد عفونی",
    "Cognitive & Energy": "تمرکز و انرژی"
  },
  ps: {
    All: "ټول",
    "New Products": "نوي محصولات",
    "Analgesic & Fever": "درد او تبه",
    "Cough & Cold": "ټوخی او زکام",
    Respiratory: "تنفسي",
    Gastrointestinal: "هاضمه",
    "Vitamins & Health": "ویټامین او روغتیا",
    "Urinary Tract": "ادراري لارې",
    "Anti-infective": "د عفونت ضد",
    "Cognitive & Energy": "ذهني او انرژي"
  }
};

const VISUAL_LABELS = {
  en: {
    analgesic: "Pain Relief",
    respiratory: "Respiratory Care",
    gastrointestinal: "Digestive Support",
    vitamins: "Daily Wellness",
    antiInfective: "Infection Control",
    urinary: "Targeted Relief",
    default: "Clinical Care"
  },
  da: {
    analgesic: "کاهش درد",
    respiratory: "مراقبت تنفسی",
    gastrointestinal: "حمایت گوارشی",
    vitamins: "سلامت روزانه",
    antiInfective: "کنترل عفونت",
    urinary: "درمان هدفمند",
    default: "مراقبت طبی"
  },
  ps: {
    analgesic: "د درد ارامي",
    respiratory: "تنفسي پاملرنه",
    gastrointestinal: "د هاضمې ملاتړ",
    vitamins: "ورځنۍ روغتیا",
    antiInfective: "د عفونت کنټرول",
    urinary: "هدفمنه درملنه",
    default: "طبي پاملرنه"
  }
};

const DIAGNOSTIC_COPY = {
  en: {
    fever: {
      label: "Fever & Cold Symptoms",
      disease: "Hyperpyrexia & Influenza",
      description: "Elevated body temperature, cold flashes, teething discomfort, or mild viral aches.",
      confidence: "98% Match"
    },
    dry_cough: {
      label: "Dry Non-productive Cough",
      disease: "Acute Dry Cough & Bronchitis",
      description: "Continuous dry hacking, throat tickling, lack of phlegm, or throat irritation.",
      confidence: "95% Match"
    },
    stomach_acid: {
      label: "Acid Heartburn & Gastritis",
      disease: "Gastroesophageal Reflux (GERD)",
      description: "Burning sensation in upper chest, acid regurgitation, bloating, or stomach upset.",
      confidence: "94% Match"
    },
    asthma: {
      label: "Asthma & Wheezing",
      disease: "Bronchial Asthma / COPD Spasms",
      description: "Difficulty breathing, chest tightness, wheezing sound, or bronchial inflammation.",
      confidence: "92% Match"
    },
    uti: {
      label: "Burning Urination",
      disease: "Acidic Urine / Suspected UTI",
      description: "Painful urination, high urine acidity, bladder discomfort, or crystal presence.",
      confidence: "96% Match"
    },
    infection: {
      label: "Bacterial Diarrhea",
      disease: "Amoebic Dysentery & Parasites",
      description: "Stomach cramping, severe diarrhea, microbial infection, or dental abscesses.",
      confidence: "97% Match"
    },
    fatigue: {
      label: "Fatigue & Anemia",
      disease: "Iron-Deficiency Anemia & Weakness",
      description: "Dizziness, persistent tiredness, poor mental focus, pale skin, or general lethargy.",
      confidence: "93% Match"
    }
  },
  da: {
    fever: {
      label: "علائم تب و زکام",
      disease: "تب بلند و آنفلوآنزا",
      description: "حرارت بلند بدن، لرزه، درد خفیف ویروسی یا ناراحتی دندان‌درآوردن.",
      confidence: "۹۸٪ مطابقت"
    },
    dry_cough: {
      label: "سرفه خشک",
      disease: "سرفه خشک حاد و برونشیت",
      description: "سرفه خشک پیهم، خارشی شدن گلو یا تحریک بدون بلغم.",
      confidence: "۹۵٪ مطابقت"
    },
    stomach_acid: {
      label: "ترشی و سوزش معده",
      disease: "ریفلاکس و التهاب معده",
      description: "سوزش سینه، برگشت اسید، نفخ یا ناراحتی معده.",
      confidence: "۹۴٪ مطابقت"
    },
    asthma: {
      label: "آسم و خس‌خس سینه",
      disease: "اسپاسم آسم یا COPD",
      description: "تنگی نفس، فشار سینه، صدای خس‌خس یا التهاب مجاری تنفسی.",
      confidence: "۹۲٪ مطابقت"
    },
    uti: {
      label: "سوزش ادرار",
      disease: "اسیدی بودن ادرار یا UTI مشکوک",
      description: "ادرار دردناک، اسیدی بودن زیاد، ناراحتی مثانه یا وجود کریستال.",
      confidence: "۹۶٪ مطابقت"
    },
    infection: {
      label: "اسهال عفونی",
      disease: "دیسنتری آمیبی و انگل‌ها",
      description: "دل‌درد، اسهال شدید، عفونت میکروبی یا آبسه دندان.",
      confidence: "۹۷٪ مطابقت"
    },
    fatigue: {
      label: "خستگی و کم‌خونی",
      disease: "کم‌خونی ناشی از کمبود آهن",
      description: "سرگیجه، خستگی دوامدار، تمرکز کم یا ضعف عمومی.",
      confidence: "۹۳٪ مطابقت"
    }
  },
  ps: {
    fever: {
      label: "د تب او زکام نښې",
      disease: "لوړه تبه او انفلونزا",
      description: "د بدن لوړه تودوخه، یخنۍ، سپک ویروسي دردونه یا د غاښ راوتلو تکلیف.",
      confidence: "۹۸٪ سمون"
    },
    dry_cough: {
      label: "وچ ټوخ",
      disease: "شدید وچ ټوخ او برونشیت",
      description: "پرله‌پسې وچ ټوخ، د ستوني خارښت یا بې بلغم تحرک.",
      confidence: "۹۵٪ سمون"
    },
    stomach_acid: {
      label: "ترشوالی او د معدې سوخت",
      disease: "ریفلاکس او د معدې التهاب",
      description: "د سینې سوخت، د اسید راګرځېدل، پړسوب یا د معدې ناراحتي.",
      confidence: "۹۴٪ سمون"
    },
    asthma: {
      label: "استما او خس خس",
      disease: "د استما یا COPD سپاسم",
      description: "ساه لنډي، د سینې فشار، خس خس یا د تنفسي لارو التهاب.",
      confidence: "۹۲٪ سمون"
    },
    uti: {
      label: "د ادرار سوخت",
      disease: "تیزابي ادرار یا شکمن UTI",
      description: "دردناک ادرار، لوړه تیزابیت، د مثانې تکلیف یا کرسټالونه.",
      confidence: "۹۶٪ سمون"
    },
    infection: {
      label: "میکروبي نس ناستی",
      disease: "امیبي پیچش او پرازیتونه",
      description: "د ګېډې درد، شدید نس ناستی، میکروبي عفونت یا د غاښ ابسه.",
      confidence: "۹۷٪ سمون"
    },
    fatigue: {
      label: "ستړیا او کم‌خوني",
      disease: "د اوسپنې کموالي کم‌خوني",
      description: "سرګرځېدل، دوامداره ستړیا، کم تمرکز یا عمومي کمزوري.",
      confidence: "۹۳٪ سمون"
    }
  }
};

const UI_COPY = {
  en: {
    home: {
      heroBrandCopy: "Clean manufacturing presentation, stronger product visibility, and dependable nationwide delivery.",
      coverageTitle: "34 Provinces",
      coverageDesc: "Reliable distribution coverage across Afghanistan.",
      formulationsTitle: "26 Formulations",
      formulationsDesc: "Cleanly organized catalog for faster product discovery.",
      subscriberCount: "Total Registered Subscriber Entities",
      features: {
        formulationsTitle: "26 Medical Formulations",
        formulationsDesc: "From pediatric Paracetamol to specialized active Citrate syrups. Each engineered under strict quality assurance.",
        aiTitle: "AI Symptoms Checker",
        aiDesc: "Instant online symptom analysis. Recommends exact medicine matches with clinical dosages and safety warnings.",
        gpsTitle: "GPS Target Delivery",
        gpsDesc: "Interactive map pins help pinpoint your exact pharmacy or home location for seamless province shipping."
      },
      showcase: {
        kicker: "Batch Monitoring",
        title: "Clear production flow",
        desc: "From raw ingredient checks to dispatch review, every stage is presented in a cleaner, brighter interface.",
        metrics: {
          tests: "Stability Tests",
          packaging: "Packaging Review",
          dispatch: "Dispatch Visibility",
          verified: "Verified",
          ready: "Ready",
          live: "Live"
        },
        sectionKicker: "Laboratory Science",
        sectionTitle: "Advanced Production & Rigorous Assays",
        sectionDesc: "Each Cure Net batch goes through stability checks and controlled packaging review to keep products dependable through demanding regional logistics.",
        cta: "Get in Touch with our Labs"
      }
    },
    products: {
      subtitle: "Active Inventory",
      title: "Registered Medical Formulations",
      desc: "Explore our active catalog of syrups, suspensions, supplements, and vitamins manufactured by Cure Net.",
      search: "Search medicine or generic...",
      filterTitle: "Therapeutic Use",
      priceLabel: "Price per Bottle",
      boxLabel: "Box",
      addToCart: "Add to Order",
      outOfStock: "Out of Stock",
      newBadge: "New"
    },
    diagnostics: {
      subtitle: "AI Diagnostics Interface",
      title: "Automated Symptom Recommender",
      desc: "Select a symptom profile or describe the condition to get the closest medicine recommendation from our catalog.",
      selectorTitle: "Patient Diagnostic Selector",
      selectorDesc: "Select your primary symptom profile or enter detailed custom conditions below.",
      detailedSymptoms: "Detailed Symptoms (Optional)",
      inputPlaceholder: "Type details about the symptoms...",
      analyze: "Analyze Conditions & Suggest Medicine",
      disclaimerTitle: "Clinical Warning Disclaimer",
      disclaimer: "This AI tool provides quick matches based on indications and does not replace a doctor's visit.",
      running: "AI Diagnostics running query...",
      active: "AI Diagnostics Active",
      loadingTitle: "Compiling Chemical Affinities...",
      loadingDesc: "Comparing symptom patterns with active ingredients from our catalog.",
      recommendedTitle: "Highly Recommended Formulation(s):",
      order: "Order",
      idleTitle: "Awaiting Patient Telemetry",
      idleDesc: "Select a symptom tag or describe symptoms to compute medicine recommendations.",
      confidenceSuffix: "Confidence"
    },
    contact: {
      subtitle: "Reach Our Labs",
      title: "Cure Net Headquarters",
      desc: "Have questions about manufacturing, distribution, or medical orders? Contact our team in Afghanistan.",
      formTitle: "Corporate & Lab Inquiries",
      name: "Full Name",
      email: "Email Address",
      message: "Message",
      messagePlaceholder: "Your question regarding shipping, bulk purchases, or certificates...",
      send: "Send Secure Message",
      mapTitle: "Locate Our Headquarters",
      mapDesc: "We operate specialized production facilities in Kabul with high manufacturing standards.",
      addressTitle: "Corporate Address",
      phoneTitle: "Operations Support Desk",
      mailTitle: "Secure Communications",
      bulkTitle: "Pharmacy Bulk Purchases",
      bulkDesc: "Licensed pharmacies and distributors can contact us directly for high-volume carton discounts."
    },
    admin: {
      authTitle: "Administrative Handshake Required",
      authDesc: "Authorized staff only. Enter credentials to unlock orders and inventory.",
      passwordPlaceholder: "Enter Admin Password...",
      verify: "Verify Credentials",
      hintLabel: "Hint:",
      headerTitle: "Cure Net Administration Console",
      headerSubtitle: "Real-time inventory and province shipment telemetry.",
      lock: "Lock Session",
      stats: {
        shipments: "Total Shipments",
        revenue: "Total Revenue",
        pending: "Pending Dispatch",
        subscribers: "Registered Subscribers"
      },
      tabs: {
        orders: "Orders Registry",
        inventory: "Inventory Control",
        marketing: "Email Marketing Hub",
        chatbot: "Operations AI & Telemetry"
      },
      ordersTitle: "Active Province Orders",
      orderTable: {
        orderId: "Order ID",
        customer: "Customer & Contacts",
        province: "Province / Coordinates",
        formulations: "Formulations Purchased",
        total: "Total AFG",
        status: "Status Control",
        ship: "Ship Pack",
        deliver: "Deliver Pack"
      },
      status: {
        Pending: "Pending",
        Shipped: "Shipped",
        Delivered: "Delivered"
      },
      inventoryTitle: "Global Inventory & Product Scaffolder",
      fields: {
        name: "Medicine Brand Name",
        generic: "Chemical Generic Name",
        packing: "Packing (Size/ML)",
        price: "Price in AFG",
        carton: "Carton Qty (Box)",
        category: "Therapeutic Use Category",
        description: "Formulation Description"
      },
      publish: "Scaffold & Publish",
      active: "Active",
      disabled: "Disabled",
      marketingTitle: "Newsletter Broadcasting & Automated Email Hub",
      marketingDesc: "Subscribed clinics receive automated alerts when medicines are added or updated.",
      subscribersTitle: "Registered Subscribers Directory",
      subscriberLabel: "Subscriber",
      terminalTitle: "Interactive SMTP Broadcasting Terminal",
      terminalDesc: "Simulate a manual newsletter broadcast to all registered clinics.",
      terminalIdle: "Terminal Idle. Scaffold a new product or trigger a broadcast simulation to view SMTP logs.",
      broadcastRunning: "Dispatched Transmission Running...",
      broadcastCta: "Broadcast Operational Update Simulation",
      telemetryTitle: "Province Telemetry",
      shipmentsSuffix: "shipment(s)",
      aiTitle: "Operations AI Assistant",
      aiPlaceholder: "Query province metrics, stock levels..."
    },
    footer: {
      desc: "Cure Net Pharmaceuticals is a MoPH-certified pharmaceutical brand in Afghanistan focused on clean manufacturing and dependable logistics.",
      menuTitle: "Medicines Menu",
      menu: {
        analgesic: "Analgesics & Fever",
        respiratory: "Respiratory Solutions",
        gastrointestinal: "Gastrointestinal Support",
        vitamins: "Multivitamins & Folate"
      },
      servicesTitle: "Interactive Services",
      services: {
        diagnostics: "AI Diagnostics Checker",
        shipping: "Afghanistan Province Shipments",
        partnerships: "Enterprise Manufacturing Partnerships"
      },
      hoursTitle: "Operational Hours",
      hours: {
        weekdays: "Saturday - Thursday: 8:00 AM - 5:00 PM",
        friday: "Friday: Corporate Desk Closed",
        emergency: "Operational Emergency Contact:"
      },
      bottom: "All Rights Reserved. Certified GMP Manufacturer.",
      staffPortal: "Staff Portal",
      compliance: "WHO Compliance",
      registry: "MoPH Registry"
    },
    cart: {
      title: "Your Order Cart",
      emptyTitle: "Your Cart is Empty",
      emptyDesc: "Browse the catalog to add products to your order.",
      remove: "Remove",
      subtotal: "Subtotal",
      shippingTo: "Shipping to",
      total: "Grand Total",
      deliveryTitle: "Secure Province Delivery Address",
      fullName: "Full Delivery Name",
      province: "Province Selection",
      district: "District",
      street: "Street & House No.",
      phone: "Contact Phone Number",
      mapTitle: "High Accuracy Satellite Pinpoint",
      gps: "GPS",
      autodetect: "Auto-Detect Live GPS Coordinates",
      submit: "Submit Order & Dispatch SMTP Email",
      successTitle: "Order Successfully Transmitted!",
      successCode: "Secure Transaction Code",
      successDesc: "Your order has been processed securely and our logistics team is preparing your province delivery pack.",
      close: "Acknowledge & Close"
    },
    alerts: {
      checkoutRequired: "All fields are required to secure high-accuracy delivery.",
      invalidEmail: "Please provide a valid active email address.",
      duplicateEmail: "This email is already registered to receive Cure Net product alerts.",
      subscribeSuccess: "has been successfully added to our product alert list.",
      invalidAdmin: "Invalid Administrative Credentials.",
      addProductRequired: "Please fill all required inputs to create the product.",
      addProductSuccess: "Product created and subscriber notifications were prepared.",
      contactSuccess: "Your inquiry has been transmitted to our corporate communication desk.",
      productDefaultDesc: "Premium medical formulation manufactured under strict quality standards by Cure Net Pharmaceuticals.",
      productDefaultCaution: "Use strictly according to certified medical guidance."
    },
    chatbot: {
      intro: "Salam. I am the CNP Operations Assistant. Ask me anything about province sales metrics, symptom trends, or restock warnings.",
      provinceReplyPrefix: "Current order distribution across provinces:",
      provinceReplySuffix: "Kabul remains the highest shipping vector.",
      noOrders: "No orders logged yet",
      restockAllClear: "Operational Update: All registered medicines are currently available in the catalog.",
      restockAlertPrefix: "Operational Alert: These medicines are marked unavailable:",
      revenuePrefix: "Dynamic Financial Telemetry: Total logged turnover is",
      revenueSuffix: "pending order packages still need dispatch.",
      fallback: "Operational view indicates strong demand in Kabul, Herat, and Mazar-i-Sharif for respiratory medicines this week."
    }
  },
  da: {
    home: {
      heroBrandCopy: "ارائه پاک تولید، دید بهتر محصولات و توزیع مطمئن در سراسر کشور.",
      coverageTitle: "۳۴ ولایت",
      coverageDesc: "پوشش قابل اعتماد توزیع در سراسر افغانستان.",
      formulationsTitle: "۲۶ فرمول",
      formulationsDesc: "کاتالوگ منظم برای یافتن سریع‌تر محصول.",
      subscriberCount: "مجموع مشترکین ثبت‌شده",
      features: {
        formulationsTitle: "۲۶ فرمول طبی",
        formulationsDesc: "از پاراستامول اطفال تا شربت‌های تخصصی؛ همه با کنترل کیفیت دقیق.",
        aiTitle: "بررسی هوشمند علائم",
        aiDesc: "تحلیل سریع آنلاین علائم و پیشنهاد نزدیک‌ترین داروی مناسب.",
        gpsTitle: "تحویل هدفمند با GPS",
        gpsDesc: "نقشه تعاملی برای تعیین دقیق موقعیت دواخانه یا منزل شما."
      },
      showcase: {
        kicker: "نظارت بچ",
        title: "روند روشن تولید",
        desc: "از بررسی مواد اولیه تا بازبینی ارسال، همه مراحل در یک رابط روشن‌تر نمایش داده می‌شود.",
        metrics: {
          tests: "آزمایش پایداری",
          packaging: "بازبینی بسته‌بندی",
          dispatch: "دید ارسال",
          verified: "تایید شد",
          ready: "آماده",
          live: "زنده"
        },
        sectionKicker: "دانش لابراتوار",
        sectionTitle: "تولید پیشرفته و آزمایش‌های دقیق",
        sectionDesc: "هر بچ کیور نیت از آزمایش پایداری و بازبینی کنترل‌شده بسته‌بندی می‌گذرد تا کیفیت در مسیرهای دشوار حفظ شود.",
        cta: "تماس با لابراتوار ما"
      }
    },
    products: {
      subtitle: "موجودی فعال",
      title: "فرمول‌های طبی ثبت‌شده",
      desc: "کاتالوگ فعال شربت‌ها، ساسپنشن‌ها، مکمل‌ها و ویتامین‌های کیور نیت را ببینید.",
      search: "جستجوی دارو یا نام جنریک...",
      filterTitle: "کاربرد درمانی",
      priceLabel: "قیمت هر بوتل",
      boxLabel: "کارتن",
      addToCart: "افزودن به سفارش",
      outOfStock: "ناموجود",
      newBadge: "جدید"
    },
    diagnostics: {
      subtitle: "رابط تشخیص هوشمند",
      title: "پیشنهاددهنده خودکار علائم",
      desc: "یک دسته علائم را انتخاب کنید یا وضعیت را شرح دهید تا نزدیک‌ترین داروی مناسب پیشنهاد شود.",
      selectorTitle: "انتخاب‌گر علائم مریض",
      selectorDesc: "علائم اصلی را انتخاب کنید یا توضیحات بیشتر را در پایین وارد نمایید.",
      detailedSymptoms: "علائم تفصیلی (اختیاری)",
      inputPlaceholder: "جزئیات علائم را بنویسید...",
      analyze: "تحلیل علائم و پیشنهاد دوا",
      disclaimerTitle: "هشدار طبی",
      disclaimer: "این ابزار تنها تطبیق سریع ارائه می‌کند و جایگزین مراجعه به داکتر نیست.",
      running: "تشخیص هوشمند در حال بررسی...",
      active: "تشخیص هوشمند فعال است",
      loadingTitle: "در حال تطبیق ترکیبات...",
      loadingDesc: "الگوهای علائم با مواد موثره کاتالوگ مقایسه می‌شود.",
      recommendedTitle: "فرمول‌های بسیار پیشنهادی:",
      order: "سفارش",
      idleTitle: "در انتظار معلومات مریض",
      idleDesc: "یک برچسب علائم انتخاب کنید یا علائم را شرح دهید تا پیشنهادها نمایش شود.",
      confidenceSuffix: "اطمینان"
    },
    contact: {
      subtitle: "ارتباط با لابراتوار",
      title: "دفتر مرکزی کیور نیت",
      desc: "برای پرسش درباره تولید، توزیع یا سفارشات طبی با تیم ما تماس بگیرید.",
      formTitle: "پرسش‌های شرکتی و لابراتوار",
      name: "نام مکمل",
      email: "آدرس ایمیل",
      message: "پیام",
      messagePlaceholder: "پرسش شما درباره ارسال، خرید عمده یا اسناد...",
      send: "ارسال پیام امن",
      mapTitle: "موقعیت دفتر مرکزی",
      mapDesc: "ما در کابل دارای تاسیسات تخصصی تولیدی با معیارهای بلند هستیم.",
      addressTitle: "آدرس شرکت",
      phoneTitle: "دفتر پشتیبانی عملیات",
      mailTitle: "ارتباطات امن",
      bulkTitle: "خریدهای عمده دواخانه",
      bulkDesc: "دواخانه‌ها و توزیع‌کنندگان دارای جواز می‌توانند برای تخفیف‌های حجمی با ما تماس بگیرند."
    },
    admin: {
      authTitle: "ورود اداری ضروری است",
      authDesc: "فقط برای کارمندان مجاز. برای دسترسی به سفارشات و موجودی، رمز را وارد کنید.",
      passwordPlaceholder: "رمز مدیریت را وارد کنید...",
      verify: "تایید اعتبار",
      hintLabel: "راهنما:",
      headerTitle: "کنسول مدیریت کیور نیت",
      headerSubtitle: "موجودی و تله‌متری ارسال ولایت‌ها به‌صورت زنده.",
      lock: "قفل نشست",
      stats: {
        shipments: "مجموع ارسال‌ها",
        revenue: "درآمد مجموعی",
        pending: "در انتظار ارسال",
        subscribers: "مشترکین ثبت‌شده"
      },
      tabs: {
        orders: "ثبت سفارشات",
        inventory: "کنترل موجودی",
        marketing: "مرکز ایمیل مارکتینگ",
        chatbot: "هوش عملیاتی و تله‌متری"
      },
      ordersTitle: "سفارشات فعال ولایت‌ها",
      orderTable: {
        orderId: "شماره سفارش",
        customer: "مشتری و تماس",
        province: "ولایت / مختصات",
        formulations: "اقلام خریداری‌شده",
        total: "مجموع افغانی",
        status: "کنترول وضعیت",
        ship: "ارسال بسته",
        deliver: "تحویل بسته"
      },
      status: {
        Pending: "در انتظار",
        Shipped: "ارسال شد",
        Delivered: "تحویل شد"
      },
      inventoryTitle: "مدیریت موجودی و ایجاد محصول",
      fields: {
        name: "نام تجارتی دوا",
        generic: "نام جنریک",
        packing: "بسته‌بندی (اندازه/ML)",
        price: "قیمت به افغانی",
        carton: "تعداد کارتن",
        category: "دسته درمانی",
        description: "توضیحات فرمول"
      },
      publish: "ایجاد و نشر",
      active: "فعال",
      disabled: "غیرفعال",
      marketingTitle: "پخش خبرنامه و مرکز ایمیل خودکار",
      marketingDesc: "کلینیک‌های مشترک هنگام اضافه یا بروزرسانی دواها خبر خودکار دریافت می‌کنند.",
      subscribersTitle: "فهرست مشترکین ثبت‌شده",
      subscriberLabel: "مشترک",
      terminalTitle: "ترمینل تعاملی SMTP",
      terminalDesc: "پخش دستی خبرنامه برای همه کلینیک‌های ثبت‌شده را شبیه‌سازی کنید.",
      terminalIdle: "ترمینل آماده است. یک محصول جدید ایجاد کنید یا پخش شبیه‌سازی را اجرا نمایید.",
      broadcastRunning: "ارسال در حال اجرا...",
      broadcastCta: "شبیه‌سازی بروزرسانی عملیاتی",
      telemetryTitle: "تله‌متری ولایت‌ها",
      shipmentsSuffix: "ارسال",
      aiTitle: "دستیار هوش عملیاتی",
      aiPlaceholder: "درباره ولایت‌ها یا موجودی سوال کنید..."
    },
    footer: {
      desc: "کیور نیت یک برند دارویی تاییدشده وزارت صحت عامه در افغانستان است که بر تولید پاک و لوجستیک مطمئن تمرکز دارد.",
      menuTitle: "فهرست دواها",
      menu: {
        analgesic: "مسکن و تب",
        respiratory: "محصولات تنفسی",
        gastrointestinal: "حمایت گوارشی",
        vitamins: "مولتی‌ویتامین و فولات"
      },
      servicesTitle: "خدمات تعاملی",
      services: {
        diagnostics: "بررسی هوشمند علائم",
        shipping: "ارسال به ولایت‌ها",
        partnerships: "همکاری تولیدی"
      },
      hoursTitle: "ساعات کاری",
      hours: {
        weekdays: "شنبه تا پنجشنبه: ۸:۰۰ صبح تا ۵:۰۰ عصر",
        friday: "جمعه: دفتر تعطیل",
        emergency: "تماس اضطراری:"
      },
      bottom: "تمام حقوق محفوظ است. تولیدکننده تاییدشده GMP.",
      staffPortal: "پرتال کارمندان",
      compliance: "مطابقت WHO",
      registry: "ثبت وزارت صحت"
    },
    cart: {
      title: "سبد سفارش شما",
      emptyTitle: "سبد شما خالی است",
      emptyDesc: "از کاتالوگ دیدن کنید تا محصولات را به سفارش خود اضافه نمایید.",
      remove: "حذف",
      subtotal: "جمع فرعی",
      shippingTo: "هزینه ارسال به",
      total: "مجموع کل",
      deliveryTitle: "آدرس امن تحویل در ولایت",
      fullName: "نام کامل دریافت‌کننده",
      province: "انتخاب ولایت",
      district: "ناحیه",
      street: "سرک و شماره خانه",
      phone: "شماره تماس",
      mapTitle: "تعیین دقیق موقعیت",
      gps: "GPS",
      autodetect: "تشخیص خودکار مختصات",
      submit: "ثبت سفارش و ارسال ایمیل",
      successTitle: "سفارش با موفقیت ارسال شد",
      successCode: "کد امن تراکنش",
      successDesc: "سفارش شما با موفقیت ثبت شد و تیم لوجستیک ما در حال آماده‌سازی بسته تحویلی است.",
      close: "بستن"
    },
    alerts: {
      checkoutRequired: "برای ثبت تحویل دقیق، همه فیلدها الزامی است.",
      invalidEmail: "لطفاً یک آدرس ایمیل معتبر وارد کنید.",
      duplicateEmail: "این ایمیل قبلاً برای خبرهای محصولات ثبت شده است.",
      subscribeSuccess: "با موفقیت به فهرست خبرهای محصولات اضافه شد.",
      invalidAdmin: "اعتبار اداری نادرست است.",
      addProductRequired: "لطفاً همه فیلدهای ضروری محصول را تکمیل کنید.",
      addProductSuccess: "محصول ایجاد شد و آماده ارسال خبر به مشترکین است.",
      contactSuccess: "پیام شما به بخش ارتباطات شرکتی فرستاده شد.",
      productDefaultDesc: "فرمول طبی با کیفیت بالا که تحت معیارهای سخت‌گیرانه کیور نیت تولید شده است.",
      productDefaultCaution: "فقط مطابق رهنمود طبی معتبر استفاده شود."
    },
    chatbot: {
      intro: "سلام. من دستیار عملیاتی CNP هستم. درباره فروش ولایت‌ها، روند علائم یا هشدارهای کمبود موجودی سوال کنید.",
      provinceReplyPrefix: "توزیع فعلی سفارشات در ولایت‌ها:",
      provinceReplySuffix: "کابل همچنان بیشترین مسیر ارسال را دارد.",
      noOrders: "هنوز سفارشی ثبت نشده است",
      restockAllClear: "بروزرسانی عملیاتی: همه دواهای ثبت‌شده فعلاً در کاتالوگ موجود هستند.",
      restockAlertPrefix: "هشدار عملیاتی: این دواها ناموجود علامت شده‌اند:",
      revenuePrefix: "تله‌متری مالی: مجموع گردش ثبت‌شده برابر است با",
      revenueSuffix: "بسته سفارش هنوز در انتظار ارسال است.",
      fallback: "دید عملیاتی نشان می‌دهد کابل، هرات و مزار برای دواهای تنفسی تقاضای بیشتری دارند."
    }
  },
  ps: {
    home: {
      heroBrandCopy: "پاک تولیدي وړاندې کول، د محصولاتو ښه لید او په ټول هېواد کې باوري وېش.",
      coverageTitle: "۳۴ ولایتونه",
      coverageDesc: "په ټول افغانستان کې باوري وېشنیز پوښښ.",
      formulationsTitle: "۲۶ فورمولونه",
      formulationsDesc: "منظم کتالوګ د چټک موندلو لپاره.",
      subscriberCount: "د ثبت شوو ګډونوالو شمېر",
      features: {
        formulationsTitle: "۲۶ طبي فورمولونه",
        formulationsDesc: "له ماشومانو لپاره پاراسیټامول څخه تر ځانګړو شربتونو پورې، ټول د کیفیت له سخت کنټرول سره.",
        aiTitle: "هوښیار د نښو چک",
        aiDesc: "چټک آنلاین تحلیل او نږدې مناسب درمل وړاندیز.",
        gpsTitle: "د GPS له لارې هدفمن تحویل",
        gpsDesc: "تعاملي نقشه ستاسې درملتون یا کور په دقیقه توګه نښه کوي."
      },
      showcase: {
        kicker: "د بچ څارنه",
        title: "روښانه تولیدي بهیر",
        desc: "له خامو موادو تر لېږد بیاکتنې پورې، ټول پړاوونه په روښانه انترفېس کې ښکاري.",
        metrics: {
          tests: "د ثبات ازموینې",
          packaging: "د بسته بندۍ بیاکتنه",
          dispatch: "د لېږد لید",
          verified: "تایید",
          ready: "چمتو",
          live: "فعال"
        },
        sectionKicker: "لابراتواري ساینس",
        sectionTitle: "پرمختللی تولید او دقیقې ازموینې",
        sectionDesc: "هر Cure Net بچ د ثبات او بسته بندۍ له ارزونې تېرېږي څو کیفیت په اوږده لوجستیک کې خوندي پاتې شي.",
        cta: "زموږ له لابراتوار سره اړیکه"
      }
    },
    products: {
      subtitle: "فعاله ذخیره",
      title: "ثبت شوي طبي فورمولونه",
      desc: "د Cure Net شربتونه، سسپنشنونه، مکملونه او ویټامینونه وګورئ.",
      search: "درمل یا جنریک نوم ولټوئ...",
      filterTitle: "درملیز استعمال",
      priceLabel: "د هر بوتل بیه",
      boxLabel: "کارتن",
      addToCart: "سفارش ته اضافه کول",
      outOfStock: "موجود نه دی",
      newBadge: "نوی"
    },
    diagnostics: {
      subtitle: "هوښیار تشخیصي انترفېس",
      title: "اتومات د نښو سپارښتنه",
      desc: "د نښو یوه ډله وټاکئ یا حالت ولیکئ تر څو نږدې مناسب درمل وښودل شي.",
      selectorTitle: "د ناروغ د نښو ټاکونکی",
      selectorDesc: "اصلي نښه وټاکئ یا نور جزییات لاندې ولیکئ.",
      detailedSymptoms: "تفصیلي نښې (اختیاري)",
      inputPlaceholder: "د نښو جزییات ولیکئ...",
      analyze: "نښې تحلیل او درمل وړاندیز",
      disclaimerTitle: "طبي خبرداری",
      disclaimer: "دا وسیله یوازې چټک سمون برابروي او د ډاکټر ځای نه نیسي.",
      running: "هوښیار تشخیص روان دی...",
      active: "هوښیار تشخیص فعال دی",
      loadingTitle: "د ترکیبونو پرتله روانه ده...",
      loadingDesc: "د نښو بڼې د کتالوګ له فعالو موادو سره پرتله کېږي.",
      recommendedTitle: "ډېر سپارښتل شوي فورمولونه:",
      order: "سفارش",
      idleTitle: "د ناروغ معلوماتو ته انتظار",
      idleDesc: "د نښو ټګ وټاکئ یا نښې ولیکئ تر څو وړاندیزونه ښکاره شي.",
      confidenceSuffix: "باور"
    },
    contact: {
      subtitle: "له لابراتوار سره اړیکه",
      title: "د Cure Net مرکزي دفتر",
      desc: "د تولید، وېش یا طبي سفارشونو په اړه له ټیم سره اړیکه ونیسئ.",
      formTitle: "شرکتي او لابراتواري پوښتنې",
      name: "بشپړ نوم",
      email: "بریښنالیک",
      message: "پیغام",
      messagePlaceholder: "ستاسې پوښتنه د لېږد، عمده پېرود یا سندونو په اړه...",
      send: "خوندي پیغام لېږل",
      mapTitle: "زموږ مرکزي دفتر ومومئ",
      mapDesc: "موږ په کابل کې د لوړو معیارونو ځانګړي تولیدي تاسیسات لرو.",
      addressTitle: "شرکتي پته",
      phoneTitle: "د عملیاتو مرستندویه دفتر",
      mailTitle: "خوندي اړیکې",
      bulkTitle: "د درملتون عمده پېرود",
      bulkDesc: "جواز لرونکي درملتونونه او وېشونکي کولای شي د لوړې اندازې تخفیف لپاره اړیکه ونیسي."
    },
    admin: {
      authTitle: "اداري ننوتل اړین دي",
      authDesc: "یوازې مجاز کارکوونکي. د سفارشونو او ذخیرې د خلاصولو لپاره رمز دننه کړئ.",
      passwordPlaceholder: "اداري پاسورډ دننه کړئ...",
      verify: "اعتبار تایید",
      hintLabel: "اشاره:",
      headerTitle: "د Cure Net اداري کنسول",
      headerSubtitle: "د ذخیرې او ولایتي لېږد ژوندۍ شمېرې.",
      lock: "ناسته قلف کړئ",
      stats: {
        shipments: "ټول لېږدونه",
        revenue: "ټول عاید",
        pending: "په تمه لېږد",
        subscribers: "ثبت شوي ګډونوال"
      },
      tabs: {
        orders: "د سفارشونو ثبت",
        inventory: "د ذخیرې کنټرول",
        marketing: "د ایمیل بازارموندنې مرکز",
        chatbot: "عملياتي AI او شمېرې"
      },
      ordersTitle: "فعاله ولایتي سفارشونه",
      orderTable: {
        orderId: "د سفارش شمېره",
        customer: "پېرودونکی او اړیکه",
        province: "ولایت / مختصات",
        formulations: "پېرودل شوي توکي",
        total: "ټول افغانۍ",
        status: "د حالت کنټرول",
        ship: "بسته ولېږه",
        deliver: "بسته وسپاره"
      },
      status: {
        Pending: "په تمه",
        Shipped: "لېږل شوی",
        Delivered: "سپارل شوی"
      },
      inventoryTitle: "د ذخیرې مدیریت او د محصول جوړول",
      fields: {
        name: "د درملو تجارتي نوم",
        generic: "جنریک نوم",
        packing: "بسته بندي (اندازه/ML)",
        price: "بیه په افغانیو",
        carton: "د کارتن شمېر",
        category: "درملیزه کټه ګوري",
        description: "د فورمول تشریح"
      },
      publish: "جوړ او خپور کړه",
      active: "فعال",
      disabled: "غیرفعال",
      marketingTitle: "خبرپاڼه او اتومات ایمیل مرکز",
      marketingDesc: "ګډونوال کلینیکونه د درملو د بدلون پر مهال اتومات خبرتیا ترلاسه کوي.",
      subscribersTitle: "د ثبت شوو ګډونوالو لست",
      subscriberLabel: "ګډونوال",
      terminalTitle: "تعاملي SMTP ټرمنل",
      terminalDesc: "ټولو ثبت شوو کلینیکونو ته د لاسي خبرپاڼې خپرول وازمویئ.",
      terminalIdle: "ټرمنل چمتو دی. نوی محصول جوړ کړئ یا د خپرولو ازموینه پیل کړئ.",
      broadcastRunning: "لېږد روان دی...",
      broadcastCta: "د عملیاتو د تازه معلوماتو ازموینه",
      telemetryTitle: "ولایتي شمېرې",
      shipmentsSuffix: "لېږد",
      aiTitle: "د عملیاتو AI مرستیال",
      aiPlaceholder: "د ولایتونو یا ذخیرې په اړه پوښتنه وکړئ..."
    },
    footer: {
      desc: "Cure Net په افغانستان کې د عامې روغتیا وزارت تایید شوی درمل جوړولو برانډ دی چې په پاک تولید او باوري لوجستیک تمرکز لري.",
      menuTitle: "د درملو مینو",
      menu: {
        analgesic: "درد او تبه",
        respiratory: "تنفسي حل لارې",
        gastrointestinal: "د هاضمې ملاتړ",
        vitamins: "ملټي ویټامین او فولېټ"
      },
      servicesTitle: "تعاملي خدمتونه",
      services: {
        diagnostics: "هوښیار تشخیص",
        shipping: "ولایتي لېږدونه",
        partnerships: "تولیدي ملګرتیا"
      },
      hoursTitle: "کاري ساعتونه",
      hours: {
        weekdays: "شنبه تر پنجشنبه: ۸:۰۰ سهار تر ۵:۰۰ ماښام",
        friday: "جمعه: دفتر تړلی",
        emergency: "بیړنۍ اړیکه:"
      },
      bottom: "ټول حقوق خوندي دي. د GMP تایید شوی تولیدوونکی.",
      staffPortal: "د کارکوونکو دروازه",
      compliance: "د WHO مطابقت",
      registry: "د وزارت ثبت"
    },
    cart: {
      title: "ستاسې د سفارش ټوکرۍ",
      emptyTitle: "ټوکرۍ مو تشه ده",
      emptyDesc: "کتالوګ وګورئ او محصولات خپل سفارش ته اضافه کړئ.",
      remove: "لرې کول",
      subtotal: "فرعي ټول",
      shippingTo: "د لېږد بیه تر",
      total: "عمومي ټول",
      deliveryTitle: "د ولایت خوندي تحویلي پته",
      fullName: "د ترلاسه کوونکي بشپړ نوم",
      province: "د ولایت ټاکنه",
      district: "ناحیه",
      street: "سړک او د کور شمېره",
      phone: "د اړیکې شمېره",
      mapTitle: "دقیق موقعیت ټاکنه",
      gps: "GPS",
      autodetect: "مختصات په اوتومات ډول ومومئ",
      submit: "سفارش ثبت او ایمیل ولېږئ",
      successTitle: "سفارش په بریالیتوب ولېږدول شو",
      successCode: "خوندي کوډ",
      successDesc: "ستاسې سفارش په خوندي ډول ثبت شو او زموږ لوجستیک ټیم یې د لېږد لپاره چمتو کوي.",
      close: "تړل"
    },
    alerts: {
      checkoutRequired: "د دقیق تحویل لپاره ټول معلومات اړین دي.",
      invalidEmail: "مهرباني وکړئ یو سم بریښنالیک ولیکئ.",
      duplicateEmail: "دا بریښنالیک مخکې له مخکې ثبت شوی دی.",
      subscribeSuccess: "په بریالیتوب سره د محصول خبرتیاوو لست ته اضافه شو.",
      invalidAdmin: "اداري اعتبار ناسم دی.",
      addProductRequired: "مهرباني وکړئ د محصول ټول اړین معلومات ډک کړئ.",
      addProductSuccess: "محصول جوړ شو او د ګډونوالو خبرتیاوې چمتو شوې.",
      contactSuccess: "ستاسې پیغام د شرکت د اړیکو څانګې ته واستول شو.",
      productDefaultDesc: "لوړ کیفیت لرونکی طبي فورمول چې د Cure Net تر سختو معیارونو لاندې جوړ شوی.",
      productDefaultCaution: "یوازې د طبي لارښوونې له مخې یې وکاروئ."
    },
    chatbot: {
      intro: "سلام. زه د CNP عملياتي مرستیال یم. د ولایتونو د پلور، نښو او د ذخیرې د کمښت په اړه پوښتنه وکړئ.",
      provinceReplyPrefix: "په ولایتونو کې د سفارشونو اوسنی وېش:",
      provinceReplySuffix: "کابل لا هم تر ټولو لوی د لېږد مسیر دی.",
      noOrders: "تر اوسه هېڅ سفارش نه دی ثبت شوی",
      restockAllClear: "عملياتي تازه معلومات: ټول ثبت شوي درمل اوس مهال موجود دي.",
      restockAlertPrefix: "عملياتي خبرداری: دا درمل ناموجود نښه شوي دي:",
      revenuePrefix: "مالي شمېرې: ټول ثبت شوی گردش",
      revenueSuffix: "سفارشونه لا هم د لېږد په تمه دي.",
      fallback: "عملياتي لید ښيي چې کابل، هرات او مزار کې د تنفسي درملو غوښتنه لوړه ده."
    }
  }
};

const PRODUCT_DESCRIPTION_BY_CATEGORY = {
  da: {
    "Analgesic & Fever": (product) => `${product.generic} برای کاهش درد، تب و ناراحتی‌های عمومی در قالب شربت یا ساسپنشن تولید شده است.`,
    "Cough & Cold": (product) => `${product.generic} برای آرام‌سازی سرفه و کاهش تحریک گلو در بسته‌بندی مناسب توزیع عرضه می‌شود.`,
    Respiratory: (product) => `${product.generic} برای کمک به باز شدن راه‌های تنفسی و کاهش علائم تنفسی طراحی شده است.`,
    Gastrointestinal: (product) => `${product.generic} برای کاهش ناراحتی معده، ترشی، نفخ یا مشکلات گوارشی در دسترس است.`,
    "Vitamins & Health": (product) => `${product.generic} به حمایت رشد، انرژی، ایمنی و سلامت عمومی کمک می‌کند.`,
    "Urinary Tract": (product) => `${product.generic} برای حمایت از مجاری ادرار و کاهش ناراحتی‌های مرتبط استفاده می‌شود.`,
    "Anti-infective": (product) => `${product.generic} برای کنترل عفونت‌ها و حمایت از درمان مشکلات میکروبی و انگلی عرضه می‌شود.`,
    "Cognitive & Energy": (product) => `${product.generic} برای تقویت تمرکز، انرژی و توان ذهنی در فرمول مکمل ارائه شده است.`
  },
  ps: {
    "Analgesic & Fever": (product) => `${product.generic} د درد، تب او عمومي ناراحتۍ د کمولو لپاره د شربت يا سسپنشن په بڼه جوړ شوی دی.`,
    "Cough & Cold": (product) => `${product.generic} د ټوخې ارامولو او د ستوني د تحرک کمولو لپاره په مناسب بسته بندۍ کې وړاندې کېږي.`,
    Respiratory: (product) => `${product.generic} د تنفسي لارو د پرانیستلو او د تنفسي نښو د کمولو لپاره جوړ شوی دی.`,
    Gastrointestinal: (product) => `${product.generic} د معدې سوخت، ترشوالي، پړسوب او هاضمي ستونزو د کمولو لپاره کارېږي.`,
    "Vitamins & Health": (product) => `${product.generic} د ودې، انرژۍ، معافیت او عمومي روغتیا ملاتړ کوي.`,
    "Urinary Tract": (product) => `${product.generic} د ادراري لارو د ملاتړ او اړوند ناراحتۍ د کمولو لپاره کارېږي.`,
    "Anti-infective": (product) => `${product.generic} د عفونتونو، میکروبي او پرازیتي ستونزو د کنټرول لپاره وړاندې کېږي.`,
    "Cognitive & Energy": (product) => `${product.generic} د تمرکز، انرژۍ او ذهني ځواک د ملاتړ لپاره په مکمل فورمول کې وړاندې کېږي.`
  }
};

const PRODUCT_CAUTION_BY_CATEGORY = {
  da: {
    "Analgesic & Fever": "فقط مطابق دوز توصیه‌شده استفاده شود و برای کودکان خردسال با داکتر مشوره گردد.",
    "Cough & Cold": "در صورت سرفه شدید، بلغم زیاد یا تداوم علائم با داکتر مشوره کنید.",
    Respiratory: "از مصرف بیش از حد خودداری کرده و در صورت تنگی نفس شدید فوراً به داکتر مراجعه نمایید.",
    Gastrointestinal: "مطابق رهنمود استفاده شود و با دواهای دیگر بدون مشوره همزمان نگردد.",
    "Vitamins & Health": "در جای خشک و خنک نگهداری شود و دور از دسترس اطفال باشد.",
    "Urinary Tract": "در زمان استفاده آب کافی بنوشید و در صورت دوام علائم با داکتر مشوره نمایید.",
    "Anti-infective": "کورس دوا را کامل کنید و بدون مشوره داکتر مصرف را قطع نکنید.",
    "Cognitive & Energy": "در صورت داشتن بیماری زمینه‌ای یا مصرف دواهای دیگر با داکتر مشوره نمایید."
  },
  ps: {
    "Analgesic & Fever": "یوازې د سپارل شوي دوز له مخې وکاروئ او د کوچنیانو لپاره له ډاکټر سره مشوره وکړئ.",
    "Cough & Cold": "که ټوخی شدید وي، بلغم زیات وي یا نښې دوام وکړي له ډاکټر سره مشوره وکړئ.",
    Respiratory: "له زیات استعمال څخه ډډه وکړئ او د سختې ساه لنډۍ په صورت کې ژر ډاکټر ته مراجعه وکړئ.",
    Gastrointestinal: "د لارښوونې مطابق یې وکاروئ او له نورو درملو سره بې مشورې مه ګډوئ.",
    "Vitamins & Health": "په یخ او وچ ځای کې یې وساتئ او د ماشومانو له لاسرسي لرې یې کېږدئ.",
    "Urinary Tract": "د استعمال پر وخت کافي اوبه وڅښئ او که نښې دوام وکړي له ډاکټر سره مشوره وکړئ.",
    "Anti-infective": "د درملنې دوره بشپړه کړئ او بې له ډاکټر مشورې یې مه بندوئ.",
    "Cognitive & Energy": "که بله ناروغي یا نور درمل لرئ، له ډاکټر سره مشوره وکړئ."
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

const getCategoryVisual = (category, lang) => {
  const labels = VISUAL_LABELS[lang] || VISUAL_LABELS.en;

  if (category.includes("Analgesic")) {
    return { Icon: Activity, tone: "emerald", label: labels.analgesic };
  }

  if (category.includes("Respiratory")) {
    return { Icon: Sparkles, tone: "sky", label: labels.respiratory };
  }

  if (category.includes("Cough")) {
    return { Icon: Sparkles, tone: "sky", label: labels.respiratory };
  }

  if (category.includes("Gastrointestinal")) {
    return { Icon: Layers, tone: "gold", label: labels.gastrointestinal };
  }

  if (category.includes("Vitamins")) {
    return { Icon: CheckCircle, tone: "teal", label: labels.vitamins };
  }

  if (category.includes("Anti-infective")) {
    return { Icon: ShieldCheck, tone: "violet", label: labels.antiInfective };
  }

  if (category.includes("Urinary")) {
    return { Icon: MapPin, tone: "rose", label: labels.urinary };
  }

  return { Icon: TrendingUp, tone: "slate", label: labels.default };
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
  // Navigation Tabs: 'home' | 'products' | 'contact' | 'admin'
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
    { role: 'assistant', text: UI_COPY.en.chatbot.intro }
  ]);
  const [adminChatInput, setAdminChatInput] = useState('');

  // Map elements refs
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const t = TRANSLATIONS[lang];
  const ui = UI_COPY[lang];
  const isRtl = lang !== 'en';
  const translateCategory = (category) => CATEGORY_LABELS[lang]?.[category] || category;
  const getLocalizedStatus = (status) => ui.admin.status[status] || status;
  const getLocalizedProduct = (product) => {
    if (lang === 'en') return product;

    return {
      ...product,
      description: PRODUCT_DESCRIPTION_BY_CATEGORY[lang]?.[product.category]?.(product) || product.description,
      caution: PRODUCT_CAUTION_BY_CATEGORY[lang]?.[product.category] || product.caution
    };
  };

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
    document.documentElement.lang = lang === 'da' ? 'fa' : lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [isRtl, lang]);

  useEffect(() => {
    setAdminChatMessages(prev => {
      if (
        prev.length === 1 &&
        prev[0].role === 'assistant' &&
        Object.values(UI_COPY).some(copy => copy.chatbot.intro === prev[0].text)
      ) {
        return [{ role: 'assistant', text: ui.chatbot.intro }];
      }

      return prev;
    });
  }, [ui.chatbot.intro]);

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
    marker.bindPopup(`<strong style='color:#10b981'>${ui.cart.mapTitle}</strong><br/>${ui.cart.autodetect}`).openPopup();

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
            markerRef.current.bindPopup(`<strong style='color:#10b981'>${ui.cart.mapTitle}</strong>`).openPopup();
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

  // Checkout submission with live SMTP Visualizer
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!checkoutName || !checkoutDistrict || !checkoutStreet || !checkoutPhone) {
      alert(ui.alerts.checkoutRequired);
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
      alert(ui.alerts.invalidEmail);
      return;
    }

    if (subscribers.includes(email)) {
      alert(ui.alerts.duplicateEmail);
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

    alert(`"${email}" ${ui.alerts.subscribeSuccess}`);
  };

  // Admin Authentication
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'paikanm@curenet') {
      setAdminAuth(true);
      setAdminError('');
    } else {
      setAdminError(ui.alerts.invalidAdmin);
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
      alert(ui.alerts.addProductRequired);
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
      description: newProdDesc || ui.alerts.productDefaultDesc,
      caution: newProdCaution || ui.alerts.productDefaultCaution
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
    alert(`${newProd.name}: ${ui.alerts.addProductSuccess}`);
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
        
        reply = `${ui.chatbot.provinceReplyPrefix} [ ${chartData || ui.chatbot.noOrders} ]. ${ui.chatbot.provinceReplySuffix}`;
      } 
      else if (text.includes("restock") || text.includes("inventory") || text.includes("stock")) {
        const outOfStock = products.filter(p => !p.available);
        if (outOfStock.length > 0) {
          reply = `${ui.chatbot.restockAlertPrefix} ${outOfStock.map(p => p.name).join(', ')}.`;
        } else {
          reply = ui.chatbot.restockAllClear;
        }
      } 
      else if (text.includes("revenue") || text.includes("sales value") || text.includes("money")) {
        const totalRev = orders.reduce((sum, o) => sum + o.total, 0);
        const pendingCount = orders.filter(o => o.status === 'Pending').length;
        reply = `${ui.chatbot.revenuePrefix} ${totalRev.toFixed(1)} AFG. ${pendingCount} ${ui.chatbot.revenueSuffix}`;
      }
      else {
        reply = ui.chatbot.fallback;
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
    <div className={`app-container lang-${lang} ${isRtl ? 'is-rtl' : ''}`.trim()}>
      {/* Navbar Header */}
      <header className="navbar" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        <div className="navbar-container">
          <div className="logo-wrapper" onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}>
            <img src="/logo-transparent.png" className="logo-img" alt="Cure Net Logo" />
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

            <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)} title={ui.cart.title}>
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
            <section className="hero-section" style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
              <div>
                <span className="hero-subtitle">{TRANSLATIONS[lang].mophTitle}</span>
                <h1>{TRANSLATIONS[lang].tagline}</h1>
                <p className="hero-desc">
                  {TRANSLATIONS[lang].description}
                </p>
                <div className="hero-buttons" style={{ justifyContent: isRtl ? 'flex-end' : 'flex-start' }}>
                  <button className="btn btn-primary" onClick={() => setActiveTab('products')}>
                    {t.browseBtn} <ArrowRight size={16} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
                  </button>
                </div>
              </div>
              <div className="hero-visual">
                <div className="hero-brand-panel">
                  <div className="hero-brand-orb hero-brand-orb-1" />
                  <div className="hero-brand-orb hero-brand-orb-2" />
                  <div className="hero-brand-layout hero-brand-layout-single">
                    <div className="hero-brand-content">
                      <span className="hero-brand-kicker">{t.brandSub}</span>
                      <img src="/logo-transparent.png" alt="Cure Net logo" className="hero-brand-logo" />
                      <p className="hero-brand-copy">
                        {ui.home.heroBrandCopy}
                      </p>
                    </div>
                    <div className="hero-brand-stats">
                      <div className="hero-badge hero-badge-clean">
                          <Activity size={22} className="text-primary" />
                          <div>
                          <div className="hero-badge-title">{t.mophTitle}</div>
                          <div className="hero-badge-sub">{t.mophDesc}</div>
                          </div>
                      </div>
                      <div className="hero-stat-card">
                        <strong>{ui.home.coverageTitle}</strong>
                        <span>{ui.home.coverageDesc}</span>
                      </div>
                      <div className="hero-stat-card">
                        <strong>{ui.home.formulationsTitle}</strong>
                        <span>{ui.home.formulationsDesc}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* DEDICATED NEW PRODUCTS CAROUSEL ROW */}
            <section className="content-section" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
              <div className="new-products-banner">
                <div className="d-flex align-center justify-between gap-4 flex-column md:flex-row mb-6">
                  <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <span className="section-subtitle">{t.newProducts}</span>
                    <h2 style={{ margin: 0 }}>{t.exploreNewBtn}</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      {t.newArrivals}
                    </p>
                  </div>
                  <button className="btn btn-teal" onClick={() => { setActiveTab('products'); setCategoryFilter('New Products'); }}>
                    {t.exploreNewBtn} <ArrowRight size={16} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
                  </button>
                </div>

                <div className="new-products-scroll">
                  {products.filter(isNewProduct).map(prod => {
                    const localizedProd = getLocalizedProduct(prod);
                    return (
                    <div key={prod.id} className="product-card" style={{ position: 'relative', textAlign: isRtl ? 'right' : 'left' }}>
                      <span className="new-badge">{ui.products.newBadge}</span>
                      <div className="product-category-tag">{translateCategory(localizedProd.category)}</div>
                      <h4 style={{ color: 'var(--primary-light)', fontSize: '1.1rem', margin: '0.5rem 0 0.2rem' }}>{localizedProd.name}</h4>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{localizedProd.generic}</div>
                      
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.75rem 0', minHeight: '3.2rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {localizedProd.description}
                      </p>

                      <div className="d-flex justify-between align-center mt-4">
                        <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem' }}>{localizedProd.price.toFixed(1)} AFG</span>
                        <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => addToCart(localizedProd)}>
                          {ui.products.addToCart}
                        </button>
                      </div>
                    </div>
                    );
                  })}
                </div>

                {/* AUTOMATED NEWSLETTER SIGNUP CARD */}
                <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '2.5rem' }}>
                  <h3 style={{ color: 'var(--primary-light)', marginBottom: '0.5rem' }}>{t.subscribeTitle}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '550px', margin: '0 auto 1.5rem' }}>
                    {t.subscribeDesc}
                  </p>
                  
                  <form onSubmit={handleNewsletterSubscribe} className="email-subscribe-row">
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder={t.subscribePlaceholder} 
                      value={subscriberEmail}
                      onChange={e => setSubscriberEmail(e.target.value)}
                      required 
                    />
                    <button type="submit" className="btn btn-teal">
                      {t.subscribeBtn}
                    </button>
                  </form>
                  <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {ui.home.subscriberCount}: <strong style={{ color: 'var(--primary-light)' }}>{subscribers.length}</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURES SUMMARY */}
            <section className="content-section" style={{ paddingTop: '1rem', direction: isRtl ? 'rtl' : 'ltr' }}>
              <div className="section-title-wrapper">
                <span className="section-subtitle">{t.whyChoose}</span>
                <h2>{t.whyChoose}</h2>
                <p>{t.whyDesc}</p>
              </div>

              <div className="features-grid">
                <div className="feature-card" onClick={() => setActiveTab('products')}>
                  <div className="feature-icon-wrapper">
                    <Layers size={22} />
                  </div>
                  <h3 className="feature-title">{ui.home.features.formulationsTitle}</h3>
                  <p className="feature-desc">{ui.home.features.formulationsDesc}</p>
                </div>

                <div className="feature-card" onClick={() => setIsCartOpen(true)}>
                  <div className="feature-icon-wrapper" style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.08)' }}>
                    <Map size={22} />
                  </div>
                  <h3 className="feature-title">{ui.home.features.gpsTitle}</h3>
                  <p className="feature-desc">{ui.home.features.gpsDesc}</p>
                </div>
              </div>
            </section>

            {/* DYNAMIC SHOWCASE LAB SECTION */}
            <section className="content-section clean-highlight-section" style={{ maxWidth: '100%' }}>
              <div className="hero-section clean-highlight-wrap" style={{ padding: '2rem max(2rem, (100% - 1280px)/2)' }}>
                <div className="hero-visual">
                  <div className="showcase-images-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', height: '100%', minHeight: '300px' }}>
                    <div style={{ position: 'relative', height: '100%' }}>
                      <img src="/lab_1.png" className="hero-img" style={{ borderRadius: '24px', objectFit: 'cover', width: '100%', height: '100%', boxShadow: 'var(--shadow-md)' }} alt="Pharmaceutical Lab" />
                    </div>
                    <div style={{ position: 'relative', height: '100%' }}>
                      <img src="/lab_2.png" className="hero-img" style={{ borderRadius: '24px', objectFit: 'cover', width: '100%', height: '100%', boxShadow: 'var(--shadow-md)' }} alt="Manufacturing" />
                    </div>
                  </div>
                </div>
                <div>
                  <span className="hero-subtitle">{ui.home.showcase.sectionKicker}</span>
                  <h2>{ui.home.showcase.sectionTitle}</h2>
                  <p className="hero-desc" style={{ fontSize: '1rem' }}>
                    {ui.home.showcase.sectionDesc}
                  </p>
                  <button className="btn btn-teal" onClick={() => setActiveTab('contact')}>
                    {ui.home.showcase.cta}
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
              <span className="section-subtitle">{ui.products.subtitle}</span>
              <h2>{ui.products.title}</h2>
              <p>{ui.products.desc}</p>
            </div>

            <div className="products-layout">
              {/* Sidebar Filters */}
              <aside className="sidebar-filters">
                <div className="search-input-wrapper">
                  <Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder={ui.products.search} 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="filter-group">
                  <h4 className="filter-title">{ui.products.filterTitle}</h4>
                  <ul className="filter-list">
                    {categories.map(cat => (
                      <li key={cat}>
                        <button 
                          className={`filter-btn ${categoryFilter === cat ? 'active' : ''}`}
                          onClick={() => setCategoryFilter(cat)}
                        >
                          {translateCategory(cat)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Products Display Grid */}
              <div className="products-grid">
                {filteredProducts.map(product => {
                  const localizedProduct = getLocalizedProduct(product);
                  const visual = getCategoryVisual(localizedProduct.category, lang);
                  const VisualIcon = visual.Icon;

                  return (
                  <article key={localizedProduct.id} className="product-card" style={{ opacity: localizedProduct.available ? 1 : 0.6 }}>
                    <div className="product-img-wrapper">
                      <div className={`product-visual product-visual-${visual.tone}`}>
                        <div className="product-visual-topline">
                          <span className="product-badge">{translateCategory(localizedProduct.category)}</span>
                          <span className="product-visual-pill">{visual.label}</span>
                        </div>
                        <div className="product-visual-icon-wrap">
                          <VisualIcon size={44} />
                        </div>
                        <span className="product-visual-generic-name">{localizedProduct.generic}</span>
                      </div>
                    </div>

                    <div className="product-info">
                      <h3 className="product-name">{localizedProduct.name}</h3>
                      <div className="product-generic">{localizedProduct.generic}</div>
                      
                      <p style={{ fontSize: '0.8rem', marginBottom: '1rem', flex: 1, color: 'var(--text-secondary)' }}>
                        {localizedProduct.description}
                      </p>

                      <div className="product-meta-row">
                        <span className="product-packing">
                          <Layers size={12} /> {localizedProduct.packing}
                        </span>
                        <span className="product-carton">
                          <Activity size={12} /> {ui.products.boxLabel}: {localizedProduct.carton} Pcs
                        </span>
                      </div>

                      <div className="product-footer">
                        <div>
                          <div className="product-price-label">{ui.products.priceLabel}</div>
                          <div className="product-price">{localizedProduct.price.toFixed(1)} AFG</div>
                        </div>
                        
                        {localizedProduct.available ? (
                          <button 
                            className="product-add-btn"
                            onClick={() => addToCart(localizedProduct)}
                            title={ui.products.addToCart}
                          >
                            <ShoppingCart size={16} />
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700 }}>{ui.products.outOfStock}</span>
                        )}
                      </div>
                    </div>
                  </article>
                )})}
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: CONTACT US PAGE */}
        {activeTab === 'contact' && (
          <section className="content-section">
            <div className="section-title-wrapper">
              <span className="section-subtitle">{ui.contact.subtitle}</span>
              <h2>{ui.contact.title}</h2>
              <p>{ui.contact.desc}</p>
            </div>

            <div className="contact-section">
              <div className="glass-panel">
                <h3 className="feature-title mb-4">{ui.contact.formTitle}</h3>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert(ui.alerts.contactSuccess);
                }}>
                  <div className="mb-4">
                    <label className="form-label">{ui.contact.name}</label>
                    <input type="text" className="form-input" placeholder={ui.contact.name} required />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">{ui.contact.email}</label>
                    <input type="email" className="form-input" placeholder="name@company.com" required />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">{ui.contact.message}</label>
                    <textarea rows={5} className="form-textarea" placeholder={ui.contact.messagePlaceholder} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <Send size={16} /> {ui.contact.send}
                  </button>
                </form>
              </div>

              <div>
                <h3 className="feature-title">{ui.contact.mapTitle}</h3>
                <p>{ui.contact.mapDesc}</p>
                
                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <MapPin size={24} className="contact-info-icon" />
                    <div>
                      <div className="contact-info-title">{ui.contact.addressTitle}</div>
                      <div className="contact-info-value">Cure Net Pharmaceuticals, Phase 1, Industrial Parks, Kabul, Afghanistan</div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <Phone size={24} className="contact-info-icon" />
                    <div>
                      <div className="contact-info-title">{ui.contact.phoneTitle}</div>
                      <div className="contact-info-value">+93 (0) 799 44 55 66 / +93 (0) 20 220 55 66</div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <Mail size={24} className="contact-info-icon" />
                    <div>
                      <div className="contact-info-title">{ui.contact.mailTitle}</div>
                      <div className="contact-info-value">info@curenet.af / orders@curenet.af</div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed var(--border-color)' }}>
                  <h4 style={{ color: 'var(--primary-light)', marginBottom: '0.5rem' }}>{ui.contact.bulkTitle}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {ui.contact.bulkDesc}
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
                <h2>{ui.admin.authTitle}</h2>
                <p style={{ fontSize: '0.85rem' }}>{ui.admin.authDesc}</p>
                
                <form onSubmit={handleAdminLogin} style={{ marginTop: '1.5rem' }}>
                  <div className="mb-4">
                    <input 
                      type="password" 
                      placeholder={ui.admin.passwordPlaceholder} 
                      className="form-input text-center"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                  </div>
                  {adminError && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '1rem' }}>{adminError}</div>}
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    {ui.admin.verify}
                  </button>
                </form>
                
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                  {ui.admin.hintLabel} <code style={{ color: 'var(--primary-light)' }}>paikanm@curenet</code>
                </p>
              </div>
            ) : (
              // Active Admin Panel
              <div className="admin-dashboard-container">
                <div className="admin-header-row">
                  <div className="admin-title-group">
                    <h2>{ui.admin.headerTitle}</h2>
                    <span className="admin-subtitle">{ui.admin.headerSubtitle}</span>
                  </div>
                  <button className="btn btn-secondary" onClick={() => setAdminAuth(false)}>
                    {ui.admin.lock}
                  </button>
                </div>

                {/* Dashboard KPIs */}
                <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                  <div className="stat-card">
                    <div className="stat-info">
                      <span className="stat-label">{ui.admin.stats.shipments}</span>
                      <span className="stat-value">{orders.length}</span>
                    </div>
                    <div className="stat-icon-wrapper orders"><ShoppingCart size={24} /></div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-info">
                      <span className="stat-label">{ui.admin.stats.revenue}</span>
                      <span className="stat-value">{(orders.reduce((sum, o) => sum + o.total, 0)).toFixed(0)} AFG</span>
                    </div>
                    <div className="stat-icon-wrapper revenue"><TrendingUp size={24} /></div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-info">
                      <span className="stat-label">{ui.admin.stats.pending}</span>
                      <span className="stat-value">{orders.filter(o => o.status === 'Pending').length}</span>
                    </div>
                    <div className="stat-icon-wrapper pending" style={{ color: '#f59e0b' }}><Activity size={24} /></div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-info">
                      <span className="stat-label">{ui.admin.stats.subscribers}</span>
                      <span className="stat-value">{subscribers.length}</span>
                    </div>
                    <div className="stat-icon-wrapper products" style={{ color: '#10b981' }}><Mail size={24} /></div>
                  </div>
                </div>

                {/* SUB-PAGES / TABS NAVIGATION */}
                <div className="admin-section-tabs">
                  <button className={`admin-tab-btn ${adminSubTab === 'orders' ? 'active' : ''}`} onClick={() => setAdminSubTab('orders')}>
                    <ShoppingCart size={14} /> {ui.admin.tabs.orders} ({orders.length})
                  </button>
                  <button className={`admin-tab-btn ${adminSubTab === 'inventory' ? 'active' : ''}`} onClick={() => setAdminSubTab('inventory')}>
                    <Database size={14} /> {ui.admin.tabs.inventory} ({products.length})
                  </button>
                  <button className={`admin-tab-btn ${adminSubTab === 'marketing' ? 'active' : ''}`} onClick={() => setAdminSubTab('marketing')}>
                    <Mail size={14} /> {ui.admin.tabs.marketing} ({subscribers.length})
                  </button>
                  <button className={`admin-tab-btn ${adminSubTab === 'chatbot' ? 'active' : ''}`} onClick={() => setAdminSubTab('chatbot')}>
                    <Sparkles size={14} /> {ui.admin.tabs.chatbot}
                  </button>
                </div>

                {/* SUB-PAGE 1: ORDERS REGISTRY */}
                {adminSubTab === 'orders' && (
                  <div className="glass-panel orders-list-panel">
                    <h3 className="feature-title mb-4">{ui.admin.ordersTitle}</h3>
                    <div className="orders-table-wrapper">
                      <table className="orders-table">
                        <thead>
                          <tr>
                            <th>{ui.admin.orderTable.orderId}</th>
                            <th>{ui.admin.orderTable.customer}</th>
                            <th>{ui.admin.orderTable.province}</th>
                            <th>{ui.admin.orderTable.formulations}</th>
                            <th>{ui.admin.orderTable.total}</th>
                            <th>{ui.admin.orderTable.status}</th>
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
                                    {getLocalizedStatus(order.status)}
                                  </span>
                                  {order.status === 'Pending' && (
                                    <button 
                                      className="btn btn-teal"
                                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                                      onClick={() => handleUpdateOrderStatus(order.id, 'Shipped')}
                                    >
                                      {ui.admin.orderTable.ship}
                                    </button>
                                  )}
                                  {order.status === 'Shipped' && (
                                    <button 
                                      className="btn btn-primary"
                                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                                      onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}
                                    >
                                      {ui.admin.orderTable.deliver}
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
                    <h3 className="feature-title" style={{ marginBottom: '1.5rem' }}>{ui.admin.inventoryTitle}</h3>
                    
                    {/* Quick Add Product Form */}
                    <form onSubmit={handleAddProduct} className="quick-add-form" style={{ marginBottom: '2.5rem' }}>
                      <div className="inventory-input-group">
                        <span className="inventory-input-label">{ui.admin.fields.name}</span>
                        <input type="text" placeholder="e.g. Cure-Fen DS" className="inventory-input" value={newProdName} onChange={e => setNewProdName(e.target.value)} />
                      </div>

                      <div className="inventory-input-group">
                        <span className="inventory-input-label">{ui.admin.fields.generic}</span>
                        <input type="text" placeholder="e.g. IBUPROFEN" className="inventory-input" value={newProdGeneric} onChange={e => setNewProdGeneric(e.target.value)} />
                      </div>

                      <div className="inventory-input-group">
                        <span className="inventory-input-label">{ui.admin.fields.packing}</span>
                        <input type="text" placeholder="e.g. 200mg/5ml" className="inventory-input" value={newProdPacking} onChange={e => setNewProdPacking(e.target.value)} />
                      </div>

                      <div className="inventory-input-group">
                        <span className="inventory-input-label">{ui.admin.fields.price}</span>
                        <input type="number" step="0.1" placeholder="e.g. 24.5" className="inventory-input" value={newProdPrice} onChange={e => setNewProdPrice(e.target.value)} />
                      </div>

                      <div className="inventory-input-group">
                        <span className="inventory-input-label">{ui.admin.fields.carton}</span>
                        <input type="number" placeholder="e.g. 80" className="inventory-input" value={newProdCarton} onChange={e => setNewProdCarton(e.target.value)} />
                      </div>

                      <div className="inventory-input-group">
                        <span className="inventory-input-label">{ui.admin.fields.category}</span>
                        <select className="inventory-input" value={newProdCategory} onChange={e => setNewProdCategory(e.target.value)}>
                          <option value="Analgesic & Fever">{translateCategory("Analgesic & Fever")}</option>
                          <option value="Respiratory">{translateCategory("Respiratory")}</option>
                          <option value="Gastrointestinal">{translateCategory("Gastrointestinal")}</option>
                          <option value="Vitamins & Health">{translateCategory("Vitamins & Health")}</option>
                          <option value="Urinary Tract">{translateCategory("Urinary Tract")}</option>
                          <option value="Anti-infective">{translateCategory("Anti-infective")}</option>
                          <option value="Cognitive & Energy">{translateCategory("Cognitive & Energy")}</option>
                        </select>
                      </div>

                      <div className="inventory-input-group" style={{ gridColumn: 'span 2' }}>
                        <span className="inventory-input-label">{ui.admin.fields.description}</span>
                        <input type="text" placeholder="Describe medicine therapeutic benefits..." className="inventory-input" value={newProdDesc} onChange={e => setNewProdDesc(e.target.value)} />
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', height: '42px', alignSelf: 'flex-end' }}>
                        <Plus size={16} /> {ui.admin.publish}
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
                                {isNewProduct(prod) && <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.6rem', padding: '0.1rem 0.3rem', borderRadius: '3px', fontWeight: 800 }}>{ui.products.newBadge}</span>}
                              </div>
                              <span className="inventory-generic-tag">{prod.generic}</span>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ID #{prod.id}</span>
                          </div>

                          <div className="inventory-edit-row">
                            <div className="inventory-input-group">
                              <span className="inventory-input-label">{ui.admin.fields.price}</span>
                              <input 
                                type="number" 
                                step="0.1" 
                                className="inventory-input"
                                value={prod.price}
                                onChange={(e) => handleUpdatePrice(prod.id, e.target.value)}
                              />
                            </div>

                            <div className="inventory-input-group">
                              <span className="inventory-input-label">{ui.admin.fields.carton}</span>
                              <input 
                                type="number" 
                                className="inventory-input"
                                value={prod.carton}
                                onChange={(e) => handleUpdateCarton(prod.id, e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-between align-center" style={{ marginTop: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{ui.admin.fields.packing}: {prod.packing}</span>
                            <button 
                              className={`btn ${prod.available ? 'btn-teal' : 'btn-danger'}`}
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                              onClick={() => handleToggleAvailable(prod.id)}
                            >
                              {prod.available ? ui.admin.active : ui.admin.disabled}
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
                    <h3 className="feature-title mb-4">{ui.admin.marketingTitle}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                      {ui.admin.marketingDesc}
                    </p>

                    <div className="dashboard-main-grid">
                      {/* Active Subscribers Panel */}
                      <div className="glass-panel">
                        <h4 className="mb-4" style={{ color: 'var(--primary-light)' }}>{ui.admin.subscribersTitle}</h4>
                        <div className="subscribers-grid">
                          {subscribers.map((email, idx) => (
                            <div key={idx} className="subscriber-card">
                              <div className="subscriber-avatar">
                                <User size={16} />
                              </div>
                              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem' }}>{ui.admin.subscriberLabel} #{idx+1}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{email}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Broadcaster Terminal */}
                      <div>
                        <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <h4 className="mb-2" style={{ color: 'var(--primary-light)' }}>{ui.admin.terminalTitle}</h4>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                            {ui.admin.terminalDesc}
                          </p>

                          <div className="smtp-visualizer-container" style={{ flex: 1, minHeight: '260px', maxHeight: '350px' }}>
                            {emailMarketingLogs.length === 0 ? (
                              <div className="text-center" style={{ color: 'var(--text-muted)', paddingTop: '5rem', fontSize: '0.8rem' }}>
                                <Mail size={32} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                                {ui.admin.terminalIdle}
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
                            {isEmailMarketingActive ? ui.admin.broadcastRunning : ui.admin.broadcastCta}
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
                      <h3 className="feature-title mb-4">{ui.admin.telemetryTitle}</h3>
                      
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
                                <strong>{count} {ui.admin.shipmentsSuffix}</strong>
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
                        <h3 className="feature-title">{ui.admin.aiTitle}</h3>
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
                          placeholder={ui.admin.aiPlaceholder}
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
              <img src="/logo-transparent.png" className="logo-img" alt="Cure Net Logo" />
              <div className="logo-text">
                <span>{t.brandName}</span>
                <span className="logo-sub">{t.brandSub}</span>
              </div>
            </div>
            <p className="footer-desc">
              {ui.footer.desc}
            </p>
          </div>

          <div>
            <h4 className="footer-title">{ui.footer.menuTitle}</h4>
            <ul className="footer-links">
              <li><span className="footer-link" onClick={() => { setActiveTab('products'); setCategoryFilter('Analgesic & Fever'); }}>{ui.footer.menu.analgesic}</span></li>
              <li><span className="footer-link" onClick={() => { setActiveTab('products'); setCategoryFilter('Respiratory'); }}>{ui.footer.menu.respiratory}</span></li>
              <li><span className="footer-link" onClick={() => { setActiveTab('products'); setCategoryFilter('Gastrointestinal'); }}>{ui.footer.menu.gastrointestinal}</span></li>
              <li><span className="footer-link" onClick={() => { setActiveTab('products'); setCategoryFilter('Vitamins & Health'); }}>{ui.footer.menu.vitamins}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">{ui.footer.servicesTitle}</h4>
            <ul className="footer-links">
              <li><span className="footer-link" onClick={() => setIsCartOpen(true)}>{ui.footer.services.shipping}</span></li>
              <li><span className="footer-link" onClick={() => setActiveTab('contact')}>{ui.footer.services.partnerships}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">{ui.footer.hoursTitle}</h4>
            <ul className="footer-links" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <li>{ui.footer.hours.weekdays}</li>
              <li>{ui.footer.hours.friday}</li>
              <li>{ui.footer.hours.emergency}</li>
              <li style={{ color: 'var(--primary-light)', fontWeight: 600 }}>+93 (0) 799 44 55 66</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Cure Net Pharmaceuticals Afghanistan. {ui.footer.bottom}</span>
          <div className="d-flex gap-4">
            <span className="footer-link" onClick={() => setActiveTab('admin')}>{ui.footer.staffPortal}</span>
            <span className="footer-link">{ui.footer.compliance}</span>
            <span className="footer-link">{ui.footer.registry}</span>
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
                <h3 className="feature-title">{ui.cart.title}</h3>
              </div>
              <button className="cart-close-btn" onClick={() => { if(!isSmtpActive) setIsCartOpen(false); }}>
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="ai-idle-message">
                <ShoppingCart size={48} className="text-primary mb-4" />
                <h4>{ui.cart.emptyTitle}</h4>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>{ui.cart.emptyDesc}</p>
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
                          {ui.cart.remove}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout Summary */}
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>{ui.cart.subtotal}</span>
                    <span>{getSubtotal().toFixed(1)} AFG</span>
                  </div>
                  <div className="summary-row">
                    <span>{ui.cart.shippingTo} {checkoutProvince}</span>
                    <span>{getSelectedProvinceShipping()} AFG</span>
                  </div>
                  <div className="summary-row total">
                    <span>{ui.cart.total}</span>
                    <span>{getCartTotal().toFixed(1)} AFG</span>
                  </div>
                </div>

                {/* Checkout Fields */}
                <form onSubmit={handleCheckoutSubmit} className="checkout-form-container">
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                    {ui.cart.deliveryTitle}
                  </h4>

                  <div className="form-row">
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>{ui.cart.fullName}</label>
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
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>{ui.cart.province}</label>
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
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>{ui.cart.district}</label>
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
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>{ui.cart.street}</label>
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
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>{ui.cart.phone}</label>
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
                        <Map size={14} /> {ui.cart.mapTitle}
                      </span>
                      <span className="map-coords-badge">
                        {ui.cart.gps}: {gpsCoords.lat.toFixed(5)}, {gpsCoords.lng.toFixed(5)}
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
                      <Activity size={12} /> {ui.cart.autodetect}
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
                      <CheckCircle size={16} /> {ui.cart.submit}
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
            <h2 className="mb-2" style={{ color: 'var(--primary-light)' }}>{ui.cart.successTitle}</h2>
            <h4 className="mb-6" style={{ color: 'var(--text-secondary)' }}>{ui.cart.successCode}: #CNP-{lastPlacedOrderId}</h4>
            
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              {ui.cart.successDesc} <strong style={{ color: 'var(--text-primary)' }}>orders@curenetpharmaceuticals.com</strong>
            </p>

            <button className="btn btn-primary" onClick={() => setShowCheckoutSuccess(false)}>
              {ui.cart.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
