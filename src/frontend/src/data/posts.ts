export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  tags: string[];
  publishedAt: string;
  author: string;
  readingTimeMinutes: number;
  imageUrl: string;
  excerpt: string;
  category: string;
}

export interface Category {
  id: number;
  icon: string;
  name: string;
  slug: string;
  description: string;
}

export const STATIC_POSTS: Post[] = [
  {
    id: 1,
    title: "iPhone 15 Pro Max Review: Kya Ye Sach Mein Worth It Hai?",
    slug: "iphone-15-pro-max-review",
    category: "Reviews",
    author: "Rahul Sharma",
    publishedAt: "2026-02-15",
    readingTimeMinutes: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    excerpt:
      "iPhone 15 Pro Max ek premium flagship hai — par kya iska daam justify hota hai? Hum iske camera, performance, aur battery life ka ek honest Hinglish review lekar aaye hain.",
    tags: ["iPhone", "Apple", "Flagship", "Review"],
    content: `<h2>Introduction: Pehli Nazar Mein</h2>
<p>iPhone 15 Pro Max launch hone ke baad se sab yehi pooch rahe hain — kya ye phone actually ₹1,60,000 ki value deta hai? Main khud bhi ye sawal pooch raha tha jab maine ye haath mein liya. Aaj hum is phone ka honest review karenge — na sirf good parts, balki bad parts bhi.</p>

<h2>Design aur Build Quality</h2>
<p>Pehli baar jab aap iPhone 15 Pro Max ko haath mein lete hain, toh ek alag hi feel aata hai. Titanium frame ne steel ki jagah li hai aur ye phone clearly lighter aur more premium lagta hai. Corners thode rounded hain, jo ek comfortable grip dete hain.</p>
<ul>
<li>Weight: 221g — previous year se thoda kam</li>
<li>Titanium Grade 5 frame — industrial grade material</li>
<li>Textured matte back glass — fingerprints kam lagate hain</li>
<li>Action Button — ek customizable button jo bahut kaam ka hai</li>
</ul>

<h2>Camera: Duniya Ka Best Mobile Camera?</h2>
<p>Camera ke mamle mein iPhone 15 Pro Max ne ek naya standard set kiya hai. 48MP main camera ke saath, aapko daytime photos mein incredible detail milti hai. Lekin jo cheez sabse impressive hai woh hai 5x optical zoom — jo pehle sirf iPad Pro mein tha.</p>
<blockquote>"Night mode mein aaj bhi koi Android phone iPhone ko match nahi kar sakta" — Rahul Sharma, OmniSphere</blockquote>

<h2>Performance: A17 Pro Chip</h2>
<p>A17 Pro chip ke baare mein kya boluN — ye monster hai. Gaming ho, video editing ho, ya phir multitasking — ye phone kabhi bhi sweat nahi karta. Genshin Impact highest settings par bhi butter smooth chalta hai.</p>

<h2>Battery Life: Disappointment Ya Relief?</h2>
<p>Honestly, mujhe lagta tha battery life ek issue hogi — par main galat tha. Full day easily nikal jaata hai moderate use se. Heavy use mein 5-6 ghante screen-on time easily milta hai. 30W fast charging support nahi hai, jo ek drawback hai.</p>

<h2>Final Verdict</h2>
<p>Agar aapka budget hai aur aap ek future-proof phone chahte hain jo 4-5 saal kaam aaye — toh iPhone 15 Pro Max ek excellent choice hai. Lekin agar aap budget conscious hain, toh iPhone 15 ya 15 Pro bhi great alternatives hain.</p>
<p><strong>Rating: 9/10</strong></p>`,
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra vs iPhone 15 Pro: Kaun Jeeta?",
    slug: "samsung-s24-ultra-vs-iphone-15-pro",
    category: "Comparisons",
    author: "Priya Singh",
    publishedAt: "2026-02-10",
    readingTimeMinutes: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    excerpt:
      "Android vs iOS ki ye eternal jang aaj bhi jaari hai. Samsung Galaxy S24 Ultra aur iPhone 15 Pro — dono premium flagships hain. Lekin winner kaun hai? Hum ek detailed comparison lekar aaye hain.",
    tags: ["Samsung", "iPhone", "Comparison", "Flagship"],
    content: `<h2>The Ultimate Flagship Battle</h2>
<p>Ye comparison sirf phones ki nahin, balki do different philosophies ki baat hai — Samsung ka Android ecosystem aur Apple ka iOS. Dono phones apne aap mein best hain, par aapke liye kaun better hai — yahi jaanenge hum aaj.</p>

<h2>Design Comparison</h2>
<p>Samsung S24 Ultra ek boxy, angular design ke saath aata hai — S Pen ke saath — jo productivity ke liye ek game changer hai. iPhone 15 Pro ka titanium frame aur compact size alag hi premium feel deta hai. Dono beautiful hain, par style alag hai.</p>

<h2>Camera Round-Up</h2>
<p>Samsung ne 200MP main camera diya hai — raw megapixels ke maamle mein clear winner. Par Apple ki image processing itni best hai ki real-world photos mein aksar iPhone ahead rehta hai. Video quality ke liye iPhone 15 Pro clearly better hai — Log video quality aaj bhi industry benchmark hai.</p>

<h2>S Pen Advantage</h2>
<p>S Pen ek aisa feature hai jo S24 Ultra ko unique banata hai. Notes lena, sketches banana, ya documents sign karna — ye sab ek built-in stylus ke saath incredible ho jaata hai. Agar aap student hain ya creative professional — S24 Ultra win karta hai.</p>

<h2>Software Experience</h2>
<p>iOS 17 ek polished, smooth experience deta hai. Samsung ka One UI 6 bhi bahut improve hua hai — par iOS ki simplicity aur security aaj bhi unmatched hai. Long-term software support ke liye Apple clear winner hai.</p>

<h2>Final Verdict</h2>
<p>Productivity aur multitasking chahiye? — Samsung S24 Ultra. Photography aur seamless experience chahiye? — iPhone 15 Pro. Ye comparison actually draw hai — dono apni jagah best hain.</p>`,
  },
  {
    id: 3,
    title: "OnePlus 12 Tips & Tricks: 10 Hidden Features Jo Aap Nahi Jante",
    slug: "oneplus-12-tips-tricks",
    category: "Tips",
    author: "Arjun Mehta",
    publishedAt: "2026-01-28",
    readingTimeMinutes: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    excerpt:
      "OnePlus 12 ek powerful phone hai, par iske saare features use karna seedha nahi hai. Yahan hain 10 hidden tips jo aapke experience ko next level par le jayenge.",
    tags: ["OnePlus", "Tips", "Tricks", "Android"],
    content: `<h2>OnePlus 12 ke Hidden Gems</h2>
<p>OnePlus 12 pe OxygenOS 14 hai — aur ye OS bohot saare hidden features lekar aaya hai. Aaj hum 10 aise tips share karenge jo aapke daily use ko much better banayenge.</p>

<h2>Tip 1: Alert Slider Customize Karo</h2>
<p>OnePlus ka iconic Alert Slider sirf silent/vibrate/ring ke liye nahi hai. Settings > Alert Slider mein jaao aur har position par custom shortcuts set karo — DND mode, specific apps mute, ya even custom profiles.</p>

<h2>Tip 2: Off-Screen Gestures Enable Karo</h2>
<p>Settings > Buttons & Gestures > Off-Screen Gestures mein jaao. Yahan aap double tap to wake, draw letters for quick app launch jaise features enable kar sakte hain.</p>

<h2>Tip 3: Pro Mode Mein RAW Photos Lo</h2>
<p>Camera open karo > Pro Mode select karo > Format ko RAW set karo. Ab aapko editing ke liye much more data milega. Adobe Lightroom pe ye photos wow look denge.</p>

<h2>Tip 4: Battery Health Guard</h2>
<p>Settings > Battery > Battery Health Guard enable karo. Ye feature overnight charging ke dauran battery 80% se upar nahi jaane deta — jisse battery lifespan badh jaati hai.</p>

<h2>Tip 5: Parallel Apps Feature</h2>
<p>Settings > Utilities > Parallel Apps mein WhatsApp, Instagram jaisi apps ko duplicate karo. Ek phone mein 2 accounts chala sakte hain — bahut kaam ka feature!</p>

<h2>Conclusion</h2>
<p>Ye tips aapke OnePlus 12 experience ko dramatically improve karenge. Inhe try karo aur neeche comments mein batao — kaun sa tip sabse useful laga aapko!</p>`,
  },
  {
    id: 4,
    title: "Best Budget Smartphones Under 15000 in 2026",
    slug: "best-budget-phones-under-15000",
    category: "Phones",
    author: "Rahul Sharma",
    publishedAt: "2026-01-20",
    readingTimeMinutes: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    excerpt:
      "₹15,000 ke andar best smartphones 2026 mein? Haan possible hai! Ye list aapko sabse value-for-money phones batayegi jo performance, camera, aur battery life mein compromise nahi karti.",
    tags: ["Budget", "Phones", "Buying Guide", "2026"],
    content: `<h2>Budget Phones in 2026: Kitna Change Hua?</h2>
<p>2026 mein budget segment bohot competitive ho gaya hai. Redmi, Realme, aur Motorola ne ₹15,000 ke andar aisi phones di hain jo 3 saal pehle ₹25,000 mein milti thi. Aaj hum top picks share karte hain.</p>

<h2>#1 Redmi Note 14 — Best Overall</h2>
<p>Snapdragon 7s Gen 3 chip, 108MP camera, 5000mAh battery, 67W fast charging — ye sab ₹14,999 mein? Haan, Redmi Note 14 is segment ka clear winner hai. Display bhi 120Hz AMOLED hai.</p>

<h2>#2 Realme 13 Pro — Best Camera</h2>
<p>Agar aap camera-first user hain, toh Realme 13 Pro aapke liye hai. Sony IMX890 sensor ke saath ye phone low-light photography mein budget segment ka king hai.</p>

<h2>#3 Motorola Edge 50 Neo — Best Software</h2>
<p>Stock Android experience chahiye? Motorola Edge 50 Neo Android 14 ke saath aata hai aur 3 saal ke OS updates promise karta hai. Ek reliable, long-lasting choice.</p>

<h2>Which One Should You Buy?</h2>
<p>Overall best? — Redmi Note 14. Camera priority? — Realme 13 Pro. Clean software + long support? — Motorola Edge 50 Neo. Teen teeno apni category mein best hain.</p>`,
  },
  {
    id: 5,
    title: "Gaming Phone Test: ASUS ROG Phone 8 vs Poco F6 Pro",
    slug: "rog-phone-8-vs-poco-f6-pro",
    category: "Gaming",
    author: "Vikash Kumar",
    publishedAt: "2026-01-15",
    readingTimeMinutes: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=800&q=80",
    excerpt:
      "Mobile gaming ke liye best phone kaun sa hai? ASUS ROG Phone 8 aur Poco F6 Pro dono gaming ke liye bane hain — par kaun jeeta? Hum ek real-world gaming test lekar aaye hain.",
    tags: ["Gaming", "ASUS ROG", "Poco", "Comparison"],
    content: `<h2>India Ka Mobile Gaming Scene</h2>
<p>BGMI, Free Fire, Genshin Impact — India mein mobile gaming boom aa chuka hai. Aur gamers ke liye dedicated gaming phones bhi available hain. Aaj hum test karenge do popular gaming phones ko.</p>

<h2>ASUS ROG Phone 8: The Beast</h2>
<p>ROG Phone 8 Snapdragon 8 Gen 3 ke saath aata hai — market ka fastest mobile processor. AeroActive Cooler 6, AirTrigger haptic buttons, 165Hz display — ye sab features genuinely gaming experience ko next level le jaate hain.</p>

<h2>Poco F6 Pro: Value King</h2>
<p>Poco F6 Pro bhi Snapdragon 8 Gen 2 ke saath aata hai — jo ROG se thoda purana hai, par still blazing fast. ₹29,999 ki price pe ye phone incredible value deta hai — gaming ke liye dedicated features nahi hain, par performance mein peeche nahi hai.</p>

<h2>Real Gaming Tests</h2>
<p>Hum ne BGMI, Genshin Impact, aur Asphalt 9 pe dono phones test kiye:</p>
<ul>
<li>BGMI 90fps: ROG Phone 8 — consistent; Poco F6 Pro — occasional dips</li>
<li>Genshin Impact Max Settings: ROG — butter smooth; Poco — playable but warm</li>
<li>Temperature management: ROG clearly better with cooling accessories</li>
<li>Battery during gaming: Both 4-5 hours gameplay</li>
</ul>

<h2>Verdict</h2>
<p>Serious gamer? Dedicated gaming phone chahiye? — ROG Phone 8. Budget mein great gaming phone? — Poco F6 Pro unbeatable value hai.</p>`,
  },
  {
    id: 6,
    title: "Laptop Buying Guide 2026: Student ke liye Best Options",
    slug: "laptop-buying-guide-2026",
    category: "Laptops",
    author: "Priya Singh",
    publishedAt: "2026-01-08",
    readingTimeMinutes: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
    excerpt:
      "College student ho ya professional — 2026 mein laptop kharidna confusing ho sakta hai. Is guide mein hum aapko budget, performance, aur requirements ke hisab se best laptops batayenge.",
    tags: ["Laptops", "Buying Guide", "Students", "2026"],
    content: `<h2>Laptop Kharidne Se Pehle Ye Socho</h2>
<p>Laptop kharidne se pehle kuch important questions: Aap kya kaam karenge? Budget kya hai? Portability matter karta hai? In sawaalon ke jawaab hi aapka ideal laptop decide karenge.</p>

<h2>Under ₹40,000: Best Budget Picks</h2>
<p>Lenovo IdeaPad Slim 3 aur HP 15s is range mein best value dete hain. Intel Core i5 12th gen processor ke saath daily tasks, coding, aur light editing easily handle hoti hai. Students ke liye ideal choice.</p>

<h2>₹40,000–₹70,000: Mid Range Sweet Spot</h2>
<p>ASUS VivoBook 16X aur Acer Swift Go is range mein khade hain. OLED displays, faster processors, aur better build quality is range mein milti hai. Agar afford kar sako, toh is range mein invest karo — ye range best value deti hai.</p>

<h2>Premium Segment: ₹70,000+</h2>
<p>MacBook Air M3 aur Dell XPS 15 is category mein hain. Longevity, performance, aur build quality ke maamle mein ye best hain. Agar aap 5+ saal use karna chahte hain — investment worth it hai.</p>

<h2>Gaming Laptops Special Mention</h2>
<p>ASUS TUF Gaming A15 aur Lenovo LOQ 15 gaming students ke liye best value hai ₹60,000–₹80,000 range mein. RTX 4060 GPU ke saath ye laptops AAA games easily chalate hain.</p>

<h2>Final Recommendation</h2>
<p>Student: Lenovo IdeaPad Slim 3 / HP 15s. Coding + Design: ASUS VivoBook 16X. Gaming: ASUS TUF A15. Premium: MacBook Air M3. Apni needs ke hisab se choose karo!</p>`,
  },
];

export const STATIC_CATEGORIES: Category[] = [
  {
    id: 1,
    icon: "📱",
    name: "Phones",
    slug: "phones",
    description: "Latest smartphone reviews aur news",
  },
  {
    id: 2,
    icon: "💻",
    name: "Laptops",
    slug: "laptops",
    description: "Laptop reviews, comparisons aur guides",
  },
  {
    id: 3,
    icon: "💡",
    name: "Tips",
    slug: "tips",
    description: "Useful tips aur tricks aapke devices ke liye",
  },
  {
    id: 4,
    icon: "⭐",
    name: "Reviews",
    slug: "reviews",
    description: "Honest aur detailed gadget reviews",
  },
  {
    id: 5,
    icon: "🎮",
    name: "Gaming",
    slug: "gaming",
    description: "Gaming phones, reviews aur tips",
  },
  {
    id: 6,
    icon: "⚖️",
    name: "Comparisons",
    slug: "comparisons",
    description: "Head-to-head gadget comparisons",
  },
];

export const CATEGORY_COLOR_MAP: Record<string, string> = {
  Reviews: "bg-primary text-primary-foreground",
  Comparisons: "bg-blue-600 text-white",
  Tips: "bg-green-600 text-white",
  Phones: "bg-purple-600 text-white",
  Gaming: "bg-orange-600 text-white",
  Laptops: "bg-teal-600 text-white",
};
