import { createContext, useContext, useState } from "react";

type Language = "en" | "ta" | "hi";

const translations: Record<Language, Record<string, string>> = {
  en: {
    products: "Products",
    trackOrder: "Track Order",
    myAccount: "My Account",
    cart: "Cart",
    search: "Search",
    home: "Home",
    checkout: "Checkout",
    orderTracking: "Order Tracking",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    language: "Language",
    english: "English",
    tamil: "Tamil",
    hindi: "Hindi",
    login: "Login",
    register: "Register",
    logout: "Logout",
    categories: "Categories",
    price: "Price",
    rating: "Rating",
    reviews: "Reviews",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    quantity: "Quantity",
    total: "Total",
    placeOrder: "Place Order",
    orderId: "Order ID",
    orderStatus: "Order Status",
    deliveryAddress: "Delivery Address",
    paymentMethod: "Payment Method",
    cashOnDelivery: "Cash on Delivery",
    upiPayment: "UPI Payment",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    myEBooks: "My E-Books",
    readNow: "Read Now",
    download: "Download",
    adminPanel: "Admin Panel",
    manageProducts: "Manage Products",
    orders: "Orders",
    dailyDeals: "Daily Deals",
    budgetPicks: "Budget Picks",
    bestPrice: "Best Price",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    scanProduct: "Scan Product",
    useCurrentLocation: "Use Current Location",
    verificationCode: "Verification Code",
    ebooks: "E-Books",
  },
  ta: {
    products: "பொருட்கள்",
    trackOrder: "ஆர்டர் கண்காணி",
    myAccount: "என் கணக்கு",
    cart: "கார்ட்",
    search: "தேடல்",
    home: "முகப்பு",
    checkout: "செக்அவுட்",
    orderTracking: "ஆர்டர் கண்காணிப்பு",
    addToCart: "கார்ட்டில் சேர்",
    buyNow: "இப்போது வாங்கு",
    language: "மொழி",
    english: "ஆங்கிலம்",
    tamil: "தமிழ்",
    hindi: "இந்தி",
    login: "உள்நுழை",
    register: "பதிவு செய்",
    logout: "வெளியேறு",
    categories: "வகைகள்",
    price: "விலை",
    rating: "மதிப்பீடு",
    reviews: "விமர்சனங்கள்",
    inStock: "கையிருப்பில்",
    outOfStock: "கையிருப்பில் இல்லை",
    quantity: "அளவு",
    total: "மொத்தம்",
    placeOrder: "ஆர்டர் செய்",
    orderId: "ஆர்டர் எண்",
    orderStatus: "ஆர்டர் நிலை",
    deliveryAddress: "டெலிவரி முகவரி",
    paymentMethod: "கட்டண முறை",
    cashOnDelivery: "டெலிவரியில் பணம்",
    upiPayment: "UPI கட்டணம்",
    processing: "செயலாக்கம்",
    shipped: "அனுப்பப்பட்டது",
    delivered: "வழங்கப்பட்டது",
    cancelled: "ரத்து செய்யப்பட்டது",
    myEBooks: "என் மின்புத்தகங்கள்",
    readNow: "இப்போது படி",
    download: "பதிவிறக்கம்",
    adminPanel: "நிர்வாக பலகை",
    manageProducts: "பொருட்களை நிர்வகி",
    orders: "ஆர்டர்கள்",
    dailyDeals: "தினசரி சலுகைகள்",
    budgetPicks: "பட்ஜெட் தேர்வுகள்",
    bestPrice: "சிறந்த விலை",
    quickLinks: "விரைவு இணைப்புகள்",
    contactUs: "தொடர்பு கொள்ளுங்கள்",
    scanProduct: "பொருளை ஸ்கேன் செய்",
    useCurrentLocation: "தற்போதைய இருப்பிடம் பயன்படுத்து",
    verificationCode: "சரிபார்ப்பு குறியீடு",
    ebooks: "மின்புத்தகங்கள்",
  },
  hi: {
    products: "उत्पाद",
    trackOrder: "ऑर्डर ट्रैक करें",
    myAccount: "मेरा खाता",
    cart: "कार्ट",
    search: "खोज",
    home: "होम",
    checkout: "चेकआउट",
    orderTracking: "ऑर्डर ट्रैकिंग",
    addToCart: "कार्ट में जोड़ें",
    buyNow: "अभी खरीदें",
    language: "भाषा",
    english: "अंग्रेज़ी",
    tamil: "तमिल",
    hindi: "हिंदी",
    login: "लॉगिन",
    register: "रजिस्टर",
    logout: "लॉगआउट",
    categories: "श्रेणियाँ",
    price: "कीमत",
    rating: "रेटिंग",
    reviews: "समीक्षाएं",
    inStock: "स्टॉक में",
    outOfStock: "स्टॉक में नहीं",
    quantity: "मात्रा",
    total: "कुल",
    placeOrder: "ऑर्डर करें",
    orderId: "ऑर्डर आईडी",
    orderStatus: "ऑर्डर स्थिति",
    deliveryAddress: "डिलीवरी पता",
    paymentMethod: "भुगतान विधि",
    cashOnDelivery: "कैश ऑन डिलीवरी",
    upiPayment: "UPI भुगतान",
    processing: "प्रसंस्करण",
    shipped: "भेजा गया",
    delivered: "डिलीवर हो गया",
    cancelled: "रद्द किया गया",
    myEBooks: "मेरी ई-बुक्स",
    readNow: "अभी पढ़ें",
    download: "डाउनलोड",
    adminPanel: "एडमिन पैनल",
    manageProducts: "उत्पाद प्रबंधित करें",
    orders: "ऑर्डर",
    dailyDeals: "दैनिक डील्स",
    budgetPicks: "बजट पिक्स",
    bestPrice: "सर्वोत्तम मूल्य",
    quickLinks: "त्वरित लिंक",
    contactUs: "संपर्क करें",
    scanProduct: "उत्पाद स्कैन करें",
    useCurrentLocation: "वर्तमान स्थान उपयोग करें",
    verificationCode: "सत्यापन कोड",
    ebooks: "ई-बुक्स",
  },
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const stored = (localStorage.getItem("tkmart_lang") as Language) || "en";
  const [language, setLanguageState] = useState<Language>(stored);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("tkmart_lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] ?? translations.en[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
