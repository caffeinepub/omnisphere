export interface Phone {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  amazonPrice: number;
  flipkartPrice: number;
  originalPrice: number;
  specs: {
    ram: string;
    camera: string;
    battery: string;
    display: string;
    processor: string;
  };
  expertScore: number;
  subScores: {
    design: number;
    camera: number;
    battery: number;
    performance: number;
    valueForMoney: number;
  };
  priceHistory: number[];
  trending: {
    viewsToday: number;
    isNewLaunch: boolean;
    priceTrend: "up" | "down" | "stable";
  };
  imageUrl: string;
  rating: number;
  isRecommended: boolean;
  priceRange: "under10k" | "10k-15k" | "15k-20k" | "20k-30k" | "30k+";
}

function generatePriceHistory(base: number, variance = 0.06): number[] {
  const history: number[] = [];
  let current = base * (1 + variance);
  for (let i = 0; i < 30; i++) {
    const change = (Math.random() - 0.48) * base * 0.02;
    current = Math.max(base * 0.9, Math.min(base * 1.12, current + change));
    history.push(Math.round(current / 100) * 100);
  }
  history[29] = base;
  return history;
}

export const PHONES_DATA: Phone[] = [
  {
    id: "redmi-a3",
    name: "Redmi A3",
    price: "₹7,499",
    priceValue: 7499,
    amazonPrice: 7299,
    flipkartPrice: 7499,
    originalPrice: 8499,
    specs: {
      ram: "4GB RAM",
      camera: "50MP Camera",
      battery: "5000mAh",
      display: '6.71" HD+',
      processor: "MediaTek Helio G36",
    },
    expertScore: 6.5,
    subScores: {
      design: 6.0,
      camera: 6.0,
      battery: 7.5,
      performance: 6.0,
      valueForMoney: 7.0,
    },
    priceHistory: generatePriceHistory(7499),
    trending: { viewsToday: 342, isNewLaunch: false, priceTrend: "down" },
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    rating: 3.8,
    isRecommended: false,
    priceRange: "under10k",
  },
  {
    id: "realme-c55",
    name: "Realme C55",
    price: "₹9,999",
    priceValue: 9999,
    amazonPrice: 9799,
    flipkartPrice: 9999,
    originalPrice: 9999,
    specs: {
      ram: "6GB RAM",
      camera: "64MP Camera",
      battery: "5000mAh",
      display: '6.72" FHD+',
      processor: "MediaTek Helio G88",
    },
    expertScore: 7.0,
    subScores: {
      design: 7.0,
      camera: 7.5,
      battery: 7.0,
      performance: 6.5,
      valueForMoney: 7.5,
    },
    priceHistory: generatePriceHistory(9999),
    trending: { viewsToday: 518, isNewLaunch: true, priceTrend: "stable" },
    imageUrl:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
    rating: 4.0,
    isRecommended: false,
    priceRange: "under10k",
  },
  {
    id: "redmi-note-13",
    name: "Redmi Note 13",
    price: "₹13,999",
    priceValue: 13999,
    amazonPrice: 13499,
    flipkartPrice: 13999,
    originalPrice: 15999,
    specs: {
      ram: "6GB RAM",
      camera: "108MP Camera",
      battery: "5000mAh",
      display: '6.67" AMOLED',
      processor: "Snapdragon 685",
    },
    expertScore: 8.2,
    subScores: {
      design: 8.0,
      camera: 9.0,
      battery: 8.0,
      performance: 7.5,
      valueForMoney: 9.0,
    },
    priceHistory: generatePriceHistory(13999),
    trending: { viewsToday: 1243, isNewLaunch: false, priceTrend: "down" },
    imageUrl:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=80",
    rating: 4.4,
    isRecommended: true,
    priceRange: "10k-15k",
  },
  {
    id: "realme-12x",
    name: "Realme 12x",
    price: "₹12,999",
    priceValue: 12999,
    amazonPrice: 12799,
    flipkartPrice: 12999,
    originalPrice: 12999,
    specs: {
      ram: "6GB RAM",
      camera: "50MP Camera",
      battery: "5000mAh",
      display: '6.67" FHD+',
      processor: "MediaTek Dimensity 6100+",
    },
    expertScore: 7.5,
    subScores: {
      design: 7.5,
      camera: 7.0,
      battery: 8.0,
      performance: 7.5,
      valueForMoney: 7.5,
    },
    priceHistory: generatePriceHistory(12999),
    trending: { viewsToday: 876, isNewLaunch: true, priceTrend: "stable" },
    imageUrl:
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80",
    rating: 4.1,
    isRecommended: false,
    priceRange: "10k-15k",
  },
  {
    id: "iqoo-z9-lite",
    name: "iQOO Z9 Lite",
    price: "₹17,999",
    priceValue: 17999,
    amazonPrice: 17499,
    flipkartPrice: 17999,
    originalPrice: 19999,
    specs: {
      ram: "8GB RAM",
      camera: "50MP Camera",
      battery: "5000mAh",
      display: '6.67" FHD+ AMOLED',
      processor: "Snapdragon 4 Gen 2",
    },
    expertScore: 8.5,
    subScores: {
      design: 8.0,
      camera: 8.0,
      battery: 9.0,
      performance: 9.0,
      valueForMoney: 8.5,
    },
    priceHistory: generatePriceHistory(17999),
    trending: { viewsToday: 2105, isNewLaunch: false, priceTrend: "down" },
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    rating: 4.5,
    isRecommended: true,
    priceRange: "15k-20k",
  },
  {
    id: "samsung-m35",
    name: "Samsung M35",
    price: "₹19,999",
    priceValue: 19999,
    amazonPrice: 19499,
    flipkartPrice: 19999,
    originalPrice: 19999,
    specs: {
      ram: "8GB RAM",
      camera: "50MP Camera",
      battery: "6000mAh",
      display: '6.6" FHD+ AMOLED',
      processor: "Exynos 1380",
    },
    expertScore: 8.0,
    subScores: {
      design: 8.0,
      camera: 7.5,
      battery: 9.5,
      performance: 7.5,
      valueForMoney: 8.0,
    },
    priceHistory: generatePriceHistory(19999),
    trending: { viewsToday: 1589, isNewLaunch: false, priceTrend: "up" },
    imageUrl:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
    rating: 4.3,
    isRecommended: true,
    priceRange: "15k-20k",
  },
  {
    id: "oneplus-nord-ce4",
    name: "OnePlus Nord CE4",
    price: "₹24,999",
    priceValue: 24999,
    amazonPrice: 24499,
    flipkartPrice: 24999,
    originalPrice: 26999,
    specs: {
      ram: "8GB RAM",
      camera: "50MP Camera",
      battery: "5500mAh",
      display: '6.7" FHD+ AMOLED',
      processor: "Snapdragon 7s Gen 2",
    },
    expertScore: 8.8,
    subScores: {
      design: 9.0,
      camera: 8.5,
      battery: 8.5,
      performance: 9.0,
      valueForMoney: 9.0,
    },
    priceHistory: generatePriceHistory(24999),
    trending: { viewsToday: 3241, isNewLaunch: false, priceTrend: "down" },
    imageUrl:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=80",
    rating: 4.6,
    isRecommended: true,
    priceRange: "20k-30k",
  },
  {
    id: "realme-gt-6t",
    name: "Realme GT 6T",
    price: "₹29,999",
    priceValue: 29999,
    amazonPrice: 29499,
    flipkartPrice: 29999,
    originalPrice: 29999,
    specs: {
      ram: "12GB RAM",
      camera: "50MP Camera",
      battery: "5500mAh",
      display: '6.78" FHD+ AMOLED 120Hz',
      processor: "Snapdragon 7s Gen 3",
    },
    expertScore: 7.8,
    subScores: {
      design: 8.0,
      camera: 7.5,
      battery: 8.0,
      performance: 8.5,
      valueForMoney: 7.5,
    },
    priceHistory: generatePriceHistory(29999),
    trending: { viewsToday: 2780, isNewLaunch: true, priceTrend: "stable" },
    imageUrl:
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80",
    rating: 4.2,
    isRecommended: false,
    priceRange: "20k-30k",
  },
];

export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80";
