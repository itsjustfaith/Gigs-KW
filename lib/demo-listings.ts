export type DemoPortfolioProject = {
  title: string;
  description: string;
  status: "completed" | "in-progress";
  year: number;
  image: "creative" | "video" | "writing";
};

export type DemoListing = {
  slug: string;
  categorySlug: string;
  portfolioLinks?: { provider: "canva" | "google-docs"; url: string }[];
  portfolio: {
    en: DemoPortfolioProject[];
    ar: DemoPortfolioProject[];
  };
  portrait: string;
  photographer: string;
  photoUrl: string;
  coverImage: string;
  en: {
    name: string;
    service: string;
    description: string;
    languages: string;
  };
  ar: {
    name: string;
    service: string;
    description: string;
    languages: string;
  };
  priceMin: number;
  priceMax: number;
};

// Fictional display-only records. BrowsePage enables these only in development.
export const demoListings: DemoListing[] = [
  {
    slug: "mariam-design",
    categorySlug: "design",
    portfolio: {
      en: [
        { title: "Coffee label study", description: "A sample visual direction for a neighborhood roastery.", status: "completed", year: 2025, image: "creative" },
        { title: "Local market identity", description: "An illustrative logo and color system for a small shop.", status: "in-progress", year: 2026, image: "writing" },
      ],
      ar: [
        { title: "تصوّر لملصق قهوة", description: "اتجاه بصري افتراضي لمحمصة محلية.", status: "completed", year: 2025, image: "creative" },
        { title: "هوية لسوق محلي", description: "شعار ونظام ألوان افتراضيان لمتجر صغير.", status: "in-progress", year: 2026, image: "writing" },
      ],
    },
    portrait: "/images/portrait-06.jpg",
    photographer: "Ayo Ogunseinde",
    photoUrl: "https://unsplash.com/photos/portrait-photography-of-a-smiling-woman-8VghbLlZUdQ",
    coverImage: "/images/creative-workspace.jpg",
    en: {
      name: "Mariam · sample profile",
      service: "Brand identity for a local business",
      description: "A visual direction for a small business, from logo concept to color palette.",
      languages: "Arabic · English",
    },
    ar: {
      name: "مريم · ملف تجريبي",
      service: "هوية بصرية لمشروع محلي",
      description: "اتجاه بصري لمشروع صغير، من فكرة الشعار إلى لوحة الألوان.",
      languages: "العربية · الإنجليزية",
    },
    priceMin: 45,
    priceMax: 90,
  },
  {
    slug: "arjun-nair",
    categorySlug: "development",
    portfolio: {
      en: [
        { title: "Bilingual café site", description: "A sample responsive page structure for Arabic and English.", status: "completed", year: 2025, image: "creative" },
        { title: "Booking flow concept", description: "An illustrative mobile flow for requesting an appointment.", status: "in-progress", year: 2026, image: "video" },
      ],
      ar: [
        { title: "موقع لمقهى باللغتين", description: "هيكل افتراضي متجاوب لموقع بالعربية والإنجليزية.", status: "completed", year: 2025, image: "creative" },
        { title: "تصوّر لمسار الحجز", description: "خطوات افتراضية لطلب موعد عبر الهاتف.", status: "in-progress", year: 2026, image: "video" },
      ],
    },
    portrait: "/images/portrait-03.jpg",
    photographer: "The Connected Narrative",
    photoUrl: "https://unsplash.com/photos/a-man-smiling-for-the-camera-N8lRH2uxih4",
    coverImage: "/images/creative-workspace.jpg",
    en: {
      name: "Arjun Nair · sample profile",
      service: "A bilingual website for a small business",
      description: "A responsive website in Arabic and English, based on an agreed scope.",
      languages: "Arabic · English",
    },
    ar: {
      name: "أرجون ناير · ملف تجريبي",
      service: "موقع لمشروع صغير بالعربية والإنجليزية",
      description: "موقع متجاوب باللغتين، حسب نطاق عمل يتم الاتفاق عليه.",
      languages: "العربية · الإنجليزية",
    },
    priceMin: 120,
    priceMax: 280,
  },
  {
    slug: "lulwa-writing",
    categorySlug: "writing-translation",
    portfolio: {
      en: [
        { title: "Menu copy sample", description: "Example bilingual descriptions for a small café menu.", status: "completed", year: 2025, image: "writing" },
        { title: "About page draft", description: "A sample brand introduction written for a local audience.", status: "in-progress", year: 2026, image: "creative" },
      ],
      ar: [
        { title: "نموذج نص لقائمة طعام", description: "أوصاف افتراضية باللغتين لقائمة مقهى صغير.", status: "completed", year: 2025, image: "writing" },
        { title: "مسودة صفحة نبذة", description: "تعريف افتراضي بمشروع محلي وجمهوره.", status: "in-progress", year: 2026, image: "creative" },
      ],
    },
    portrait: "/images/portrait-04.jpg",
    photographer: "Sherise Van Dyk",
    photoUrl: "https://unsplash.com/photos/portrait-photography-of-a-smiling-woman-f0xTzv7TUiI",
    coverImage: "/images/writing-desk.jpg",
    en: {
      name: "Lulwa · sample profile",
      service: "Arabic and English landing page copy",
      description: "Clear page copy shaped around a business and its audience.",
      languages: "Arabic · English",
    },
    ar: {
      name: "لولوة · ملف تجريبي",
      service: "كتابة محتوى صفحة بالعربية والإنجليزية",
      description: "محتوى واضح لصفحة تعريفية يناسب المشروع وجمهوره.",
      languages: "العربية · الإنجليزية",
    },
    priceMin: 30,
    priceMax: 75,
  },
  {
    slug: "maria-santos",
    categorySlug: "marketing",
    portfolio: {
      en: [
        { title: "Seasonal content plan", description: "A sample four-week calendar for a neighborhood shop.", status: "completed", year: 2025, image: "creative" },
        { title: "Launch message set", description: "Illustrative post ideas for announcing a new service.", status: "in-progress", year: 2026, image: "video" },
      ],
      ar: [
        { title: "خطة محتوى موسمية", description: "تقويم افتراضي لأربعة أسابيع لمتجر محلي.", status: "completed", year: 2025, image: "creative" },
        { title: "رسائل إطلاق خدمة", description: "أفكار منشورات افتراضية للإعلان عن خدمة جديدة.", status: "in-progress", year: 2026, image: "video" },
      ],
    },
    portrait: "/images/portrait-02.jpg",
    photographer: "Bhavya Shah",
    photoUrl: "https://unsplash.com/photos/smiling-man-looking-at-the-camera-jfzd8vXlDDY",
    coverImage: "/images/creative-workspace.jpg",
    en: {
      name: "Maria Santos · sample profile",
      service: "A content plan for a seasonal campaign",
      description: "A practical set of topics and post ideas for one campaign.",
      languages: "Arabic · English",
    },
    ar: {
      name: "ماريا سانتوس · ملف تجريبي",
      service: "خطة محتوى لحملة موسمية",
      description: "مواضيع وأفكار منشورات عملية لحملة واحدة.",
      languages: "العربية · الإنجليزية",
    },
    priceMin: 40,
    priceMax: 110,
  },
  {
    slug: "hamad-video",
    categorySlug: "video",
    portfolio: {
      en: [
        { title: "Short café feature", description: "A sample edit outline for a 30-second social video.", status: "completed", year: 2025, image: "video" },
        { title: "Product close-up", description: "An illustrative shot list for a small product feature.", status: "in-progress", year: 2026, image: "creative" },
      ],
      ar: [
        { title: "فيديو قصير لمقهى", description: "مخطط افتراضي لمونتاج فيديو قصير لمنصات التواصل.", status: "completed", year: 2025, image: "video" },
        { title: "لقطات لمنتج", description: "قائمة لقطات افتراضية لعرض منتج صغير.", status: "in-progress", year: 2026, image: "creative" },
      ],
    },
    portrait: "/images/portrait-05.jpg",
    photographer: "Morten Pedersen",
    photoUrl: "https://unsplash.com/photos/smiling-man-Z-bgD8pMv30",
    coverImage: "/images/video-editing.jpg",
    en: {
      name: "Hamad · sample profile",
      service: "A short-form video edit with captions",
      description: "A concise edit for social channels using client-provided footage.",
      languages: "Arabic · English",
    },
    ar: {
      name: "حمد · ملف تجريبي",
      service: "مونتاج فيديو قصير مع ترجمة مكتوبة",
      description: "مونتاج مختصر لمنصات التواصل باستخدام اللقطات التي يوفرها العميل.",
      languages: "العربية · الإنجليزية",
    },
    priceMin: 25,
    priceMax: 65,
  },
  {
    slug: "sofia-reyes",
    categorySlug: "tutoring",
    portfolio: {
      en: [
        { title: "Everyday conversation", description: "A sample lesson outline for common daily situations.", status: "completed", year: 2025, image: "writing" },
        { title: "Speaking practice notes", description: "Illustrative prompts for a one-to-one practice session.", status: "in-progress", year: 2026, image: "creative" },
      ],
      ar: [
        { title: "محادثات من الحياة اليومية", description: "مخطط افتراضي لدرس عن مواقف يومية شائعة.", status: "completed", year: 2025, image: "writing" },
        { title: "ملاحظات لتدريب المحادثة", description: "أسئلة افتراضية لجلسة تدريب فردية.", status: "in-progress", year: 2026, image: "creative" },
      ],
    },
    portrait: "/images/portrait-07.jpg",
    photographer: "Brooke Balentine",
    photoUrl: "https://unsplash.com/photos/a-smiling-woman-poses-for-a-portrait-cdZcNIca4w0",
    coverImage: "/images/writing-desk.jpg",
    en: {
      name: "Sofia Reyes · sample profile",
      service: "One-to-one conversational English practice",
      description: "A focused lesson built around everyday conversation and confidence.",
      languages: "Arabic · English",
    },
    ar: {
      name: "صوفيا رييس · ملف تجريبي",
      service: "تدريب فردي على المحادثة باللغة الإنجليزية",
      description: "درس يركز على المحادثات اليومية وبناء الثقة في التحدث.",
      languages: "العربية · الإنجليزية",
    },
    priceMin: 10,
    priceMax: 20,
  },
  {
    slug: "james-miller",
    categorySlug: "consulting",
    portfolio: {
      en: [
        { title: "Pricing worksheet", description: "A sample worksheet for mapping costs and offer scope.", status: "completed", year: 2025, image: "writing" },
        { title: "Positioning exercise", description: "Illustrative prompts for clarifying a small business offer.", status: "in-progress", year: 2026, image: "creative" },
      ],
      ar: [
        { title: "ورقة عمل للتسعير", description: "نموذج افتراضي لتحديد التكاليف ونطاق العرض.", status: "completed", year: 2025, image: "writing" },
        { title: "تمرين لتحديد موقع المشروع", description: "أسئلة افتراضية لتوضيح عرض مشروع صغير.", status: "in-progress", year: 2026, image: "creative" },
      ],
    },
    portrait: "/images/portrait-01.jpg",
    photographer: "Troy Spoelma",
    photoUrl: "https://unsplash.com/photos/a-woman-with-long-brown-hair-smiling-at-the-camera-3paKXHWzsDw",
    coverImage: "/images/creative-workspace.jpg",
    en: {
      name: "James Miller · sample profile",
      service: "A working session on pricing and positioning",
      description: "A structured conversation to clarify a business offer and its price.",
      languages: "Arabic · English",
    },
    ar: {
      name: "جيمس ميلر · ملف تجريبي",
      service: "جلسة عمل حول التسعير والتموضع",
      description: "نقاش منظم لتوضيح عرض المشروع وسعره.",
      languages: "العربية · الإنجليزية",
    },
    priceMin: 35,
    priceMax: 80,
  },
];
