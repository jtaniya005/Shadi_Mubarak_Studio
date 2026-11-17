const THEMES = ["Royal Heritage", "Boho Garden", "Minimal Modern", "Floral Pastel"];
const CATS = ["Venue", "Catering", "Decor", "Photography"];

const V = (id, name, cat, city, rating, base, themes, pk, verified = true, tagline = "", exp = "8+ yrs", verifiedPoints = ["Studio Audited", "Fixed-Price Guarantee", "Backup Team On-Call"], image = "") => ({
  id,
  name,
  cat,
  city,
  rating,
  base,
  themes,
  pk,
  verified,
  tagline,
  exp,
  verifiedPoints,
  image
});

const VENDORS = [
  V(
    1,
    "Rang Mahal Palace",
    "Venue",
    "Jaipur",
    4.8,
    450000,
    ["Royal Heritage"],
    [
      ["Day Wedding", 450000, "400 guests, lawn, royal bridal suite, haveli lighting"],
      ["Full Weekend", 800000, "3 days, 2 grand stages, 24 heritage guest rooms"]
    ],
    true,
    "17th-century palatial courtyards with majestic Aravalli backdrop",
    "15+ yrs",
    ["Govt Licensed & Audited", "Dedicated Generator & Rain-backup", "Zero Hidden Service Fees"],
    "/images/vendors/rang-mahal.jpg"
  ),
  V(
    2,
    "Lotus Greens",
    "Venue",
    "Udaipur",
    4.5,
    300000,
    ["Boho Garden", "Floral Pastel"],
    [
      ["Garden Evening", 300000, "250 guests, canopy fairy lights, fountain lawn"],
      ["Lakeside Deluxe", 520000, "Lake Pichola deck, 350 guests, sunset mandap"]
    ],
    true,
    "Lake-view emerald lawns ideal for sunset pheras & twilight cocktails",
    "9+ yrs",
    ["Eco-Certified Green Venue", "Sound curfew extension till 1 AM", "Valet & 120 Car Parking"],
    "/images/vendors/lotus-greens.jpg"
  ),
  V(
    3,
    "Saffron Table",
    "Catering",
    "Jaipur",
    4.7,
    1200,
    ["Royal Heritage"],
    [
      ["Classic (per plate)", 1200, "18 dishes, 3 royal live counters, silver service"],
      ["Grand (per plate)", 1800, "30 dishes, 6 live counters, midnight halwai bazaar"]
    ],
    true,
    "Authentic Mewari & Awadhi royal banquets crafted by master khansamas",
    "18+ yrs",
    ["FSSAI 5-Star Kitchen Audit", "Tasting Session Included", "Hygienic Bio-Cutlery"],
    "/images/vendors/saffron-table.jpg"
  ),
  V(
    4,
    "Green Leaf Kitchen",
    "Catering",
    "Delhi",
    4.3,
    900,
    ["Minimal Modern", "Boho Garden"],
    [
      ["Plant-forward (per plate)", 900, "Curated farm-to-table tasting menu & cold-pressed bar"],
      ["Fusion (per plate)", 1300, "Pan-Asian & Mediterranean live counters with botanical mocktails"]
    ],
    false,
    "Modern clean culinary experience with zero food wastage commitment",
    "6+ yrs",
    ["FSSAI Registered", "Nutritional customisation", "Live Chef station"],
    "/images/vendors/green-leaf.jpg"
  ),
  V(
    5,
    "Petal & Thread",
    "Decor",
    "Udaipur",
    4.9,
    220000,
    ["Floral Pastel", "Boho Garden"],
    [
      ["Mandap Only", 120000, "Lotus floral mandap, royal entry walkway, 20 centrepieces"],
      ["Full Venue", 220000, "Mandap, bespoke sangeet stage, lounge tents & ambient warm wash"]
    ],
    true,
    "Celebrity floral designers creating ethereal pastel mandaps & fairy-lit tunnels",
    "11+ yrs",
    ["Fresh Holland/Bangalore Florals", "3D Sketch Approval Prior to Event", "On-site Crew of 25"],
    "/images/vendors/petal-thread.jpg"
  ),
  V(
    6,
    "Stone & Linen",
    "Decor",
    "Delhi",
    4.4,
    160000,
    ["Minimal Modern"],
    [
      ["Essential", 90000, "Geometric mandap, warm candlelight aisle, minimalist signage"],
      ["Signature", 160000, "Full bespoke venue styling, ivory silks, organic botanicals"]
    ],
    true,
    "Contemporary architectural wedding decor with warm organic textures",
    "7+ yrs",
    ["Custom 3D CAD Renders", "Sustainable Bamboo & Linen", "Transparent Pricing Sheet"],
    "/images/vendors/stone-linen.jpg"
  ),
  V(
    7,
    "Frame Stories",
    "Photography",
    "Jaipur",
    4.8,
    150000,
    ["Royal Heritage", "Floral Pastel"],
    [
      ["Photo + Video", 150000, "2 candid photographers, 1 royal cinematographer, 4K edit"],
      ["Premium Film", 260000, "Drone aerials, same-day 3-min teaser, 3 handcrafted Italian albums"]
    ],
    true,
    "Vogue-featured visual storytellers capturing raw emotions & timeless grandeur",
    "10+ yrs",
    ["Sony FX Cinema Rigs", "Guaranteed 21-Day Final Delivery", "Dual Memory Card Backup"],
    "/images/vendors/frame-stories.jpg"
  ),
  V(
    8,
    "Candid Karma",
    "Photography",
    "Delhi",
    4.2,
    80000,
    ["Minimal Modern", "Boho Garden"],
    [
      ["Candid Day", 80000, "1 candid photographer, 300 color-graded edits, high-res drive"],
      ["Candid Plus", 120000, "2 photographers, drone coverage, pre-wedding couple shoot"]
    ],
    false,
    "Intimate, candid documentary photography focusing on genuine family smiles",
    "5+ yrs",
    ["High-Speed Cloud Gallery", "Flexible ceremony hours", "Complimentary reels package"],
    "/images/vendors/candid-karma.jpg"
  )
];

const CAT_PLAN = { Venue: 35, Catering: 25, Decor: 15, Photography: 10, Attire: 10, Other: 5 };

// Shubh Muhurat Auspicious Dates with Vedic astrological markers
const SHUBH_MUHURATS = [
  {
    id: "m1",
    date: "2027-01-22",
    day: "Friday",
    nakshatra: "Rohini Nakshatra",
    tithi: "Purnima",
    muhuratTime: "05:40 PM - 11:25 PM",
    season: "Winter Auspicious",
    tag: "High Guna Alignment",
    highlight: "Ideal for Royal Heritage & Courtyard Weddings"
  },
  {
    id: "m2",
    date: "2027-02-14",
    day: "Sunday",
    nakshatra: "Uttara Phalguni",
    tithi: "Shukla Saptami",
    muhuratTime: "07:15 AM - 01:30 PM (Amrit Siddhi)",
    season: "Spring Auspicious",
    tag: "Most Popular Muhurat",
    highlight: "Perfect for Day Pheras & Lakeside Sunsets"
  },
  {
    id: "m3",
    date: "2027-02-21",
    day: "Sunday",
    nakshatra: "Hasta Nakshatra",
    tithi: "Magha Purnima",
    muhuratTime: "02:20 PM - 07:45 PM (Vijaya Lagna)",
    season: "Spring Auspicious",
    tag: "Royal Lagna",
    highlight: "Best for Evening Sangeet & Saat Phere"
  },
  {
    id: "m4",
    date: "2027-03-08",
    day: "Monday",
    nakshatra: "Swati Nakshatra",
    tithi: "Shukla Navami",
    muhuratTime: "06:15 PM - 10:45 PM (Godhuli)",
    season: "Summer Dawn",
    tag: "Auspicious Twilight",
    highlight: "Great for Open-air Garden Mandaps"
  },
  {
    id: "m5",
    date: "2027-04-18",
    day: "Sunday",
    nakshatra: "Anuradha Nakshatra",
    tithi: "Kamada Ekadashi",
    muhuratTime: "08:10 PM - 02:00 AM (Ratri Lagna)",
    season: "Royal Summer",
    tag: "Sacred Siddhi",
    highlight: "Ideal for Grand Palatial Celebrations"
  }
];

// Real Wedding Stories (Shaadi-inspired celebration gallery with proof and inspiration)
const REAL_STORIES = [
  {
    id: 1,
    couple: "Tanvi & Siddharth",
    city: "Jaipur",
    venue: "Rang Mahal Palace",
    theme: "Royal Heritage",
    date: "November 2026",
    guests: 380,
    spendTier: "₹38L",
    accent: "#7a1d36",
    quote: "ShadiMubarak's verified partners gave our families complete peace of mind. Every ritual unfolded like poetry.",
    ceremonies: ["Royal Welcome", "Mehendi Bazaar", "Haveli Sangeet", "Sunset Saat Phere"],
    vendorsUsed: ["Rang Mahal Palace", "Saffron Table", "Frame Stories"],
    image: "/images/stories/tanvi-siddharth.jpg"
  },
  {
    id: 2,
    couple: "Ananya & Rohan",
    city: "Udaipur",
    venue: "Lotus Greens",
    theme: "Floral Pastel",
    date: "December 2026",
    guests: 260,
    spendTier: "₹24L",
    accent: "#166050",
    quote: "From Shubh Muhurat selection to seating arrangements, we planned the entire 3-day wedding without a single spreadsheet.",
    ceremonies: ["Haldi by the Lake", "Cocktails & Qawwali", "Pastel Mandap Phere"],
    vendorsUsed: ["Lotus Greens", "Petal & Thread", "Frame Stories"],
    image: "/images/stories/ananya-rohan.jpg"
  },
  {
    id: 3,
    couple: "Meera & Dev",
    city: "Delhi",
    venue: "Stone & Linen Pavilion",
    theme: "Minimal Modern",
    date: "January 2027",
    guests: 180,
    spendTier: "₹18L",
    accent: "#d49228",
    quote: "The VIP Concierge connected us directly to top caterers with fixed rates. Transparent and stress-free!",
    ceremonies: ["Intimate Roka", "Sangeet Soiree", "Ivory Mandap Ceremony"],
    vendorsUsed: ["Stone & Linen", "Green Leaf Kitchen", "Candid Karma"],
    image: "/images/stories/meera-dev.jpg"
  }
];

const CATEGORY_CARDS = [
  {
    cat: "Venue",
    title: "Palaces & Heritage Venues",
    desc: "17th-century havelis, lake-view lawns, and royal ballrooms in Jaipur & Udaipur.",
    price: "from ₹3.0 Lakhs",
    image: "/images/categories/cat-venues.jpg",
    icon: "palace"
  },
  {
    cat: "Catering",
    title: "Royal Khansamas & Catering",
    desc: "Authentic Mewari, Awadhi, and modern farm-to-table culinary experiences.",
    price: "from ₹900 / plate",
    image: "/images/categories/cat-catering.jpg",
    icon: "catering"
  },
  {
    cat: "Decor",
    title: "Bespoke Mandaps & Decor",
    desc: "Celebrity floral designers, pastel lotus mandaps, and fairy-lit twilight canopies.",
    price: "from ₹1.2 Lakhs",
    image: "/images/categories/cat-decor.jpg",
    icon: "flower"
  },
  {
    cat: "Photography",
    title: "Cinema & Candid Photography",
    desc: "Vogue-featured cinematographers, 4K aerial drone trailers, and Italian albums.",
    price: "from ₹80,000",
    image: "/images/categories/cat-photography.jpg",
    icon: "camera"
  }
];

// Cultural Tradition Ritual Packs to fast-populate the Ceremony Planner
const TRADITIONS = {
  "North Indian / Punjabi": [
    {
      name: "Roka & Chunni Ceremony",
      daysBefore: 45,
      tasks: [
        { t: "Confirm auspicious lagan time with Pandit ji", who: "Parents" },
        { t: "Order red Chunni & dry fruit mithai hampers", who: "Bride's Family" },
        { t: "Book private banquet hall & photographer", who: "Groom's Family" }
      ]
    },
    {
      name: "Mehendi & Sangeet Soiree",
      daysBefore: 2,
      tasks: [
        { t: "Book 4 certified bridal henna artists", who: "Bride" },
        { t: "Coordinate Dhol players & curated DJ playlist", who: "Friends" },
        { t: "Setup bangle stall & floral jewelry counter", who: "Sister" },
        { t: "Tasting confirmation for live chaat counters", who: "Caterer" }
      ]
    },
    {
      name: "Haldi & Chooda Ceremony",
      daysBefore: 1,
      tasks: [
        { t: "Prepare fresh organic ubtan with sandalwood", who: "Maternal Aunts" },
        { t: "Conduct maternal Chooda & Kalire ritual", who: "Mama Ji" },
        { t: "Arrange yellow floral decor & yellow outfits", who: "Bride" }
      ]
    },
    {
      name: "Grand Baraat & Saat Phere",
      daysBefore: 0,
      tasks: [
        { t: "Vintage vintage car / Ghodi procession clearance", who: "Groom's Side" },
        { t: "Milni floral malas & welcome aarti thali", who: "Bride's Family" },
        { t: "Mandap havan samagri & 7 vows scroll check", who: "Pandit Ji" },
        { t: "Vidaai doli car decorated with tuberose", who: "Brother" }
      ]
    }
  ],
  "Marwari / Rajasthani": [
    {
      name: "Mudha Tikka & Godh Bharai",
      daysBefore: 30,
      tasks: [
        { t: "Formal lagan patrika reading & approval", who: "Elders" },
        { t: "Traditional sweet hamper exchange (Ghevar/Peda)", who: "Family" }
      ]
    },
    {
      name: "Bhaat & Mayra Feast",
      daysBefore: 2,
      tasks: [
        { t: "Maternal uncle (Nanihal) grand arrival welcome", who: "Parents" },
        { t: "Mayra bridal lehenga & jewelry presentation", who: "Mama Ji" },
        { t: "Traditional Rajasthani folk singer sangeet", who: "Event Team" }
      ]
    },
    {
      name: "Tel Baan & Haldi",
      daysBefore: 1,
      tasks: [
        { t: "Seven-step clay pot blessing ritual", who: "Sisters" },
        { t: "Mustard paste application & traditional geet", who: "Bhabhi" }
      ]
    },
    {
      name: "Toran & Saat Phere",
      daysBefore: 0,
      tasks: [
        { t: "Toran touching ritual with royal sword", who: "Groom" },
        { t: "Jaimala garland exchange on royal stage", who: "Couple" },
        { t: "Granthi Bandhan & Sacred Fire Parikrama", who: "Pandit Ji" }
      ]
    }
  ],
  "South Indian (Telugu / Tamil)": [
    {
      name: "Nichayathartham (Engagement)",
      daysBefore: 40,
      tasks: [
        { t: "Lagna Patrika exchange before elders", who: "Priest" },
        { t: "Thamboolam platter & silk saree presentation", who: "Groom's Mother" }
      ]
    },
    {
      name: "Pellikuthuru / Nalangu",
      daysBefore: 1,
      tasks: [
        { t: "Sacred oil bath ceremony & kumkum blessing", who: "Aunts" },
        { t: "Traditional swinging ritual (Oonjal) with songs", who: "Cousins" }
      ]
    },
    {
      name: "Muhurtham & Kanyadanam",
      daysBefore: 0,
      tasks: [
        { t: "Jeelakarra Bellam auspicious placement on crown", who: "Couple" },
        { t: "Mangalasutra Dharana tying with 3 knots", who: "Groom" },
        { t: "Talambralu sacred turmeric rice shower", who: "Family" }
      ]
    }
  ]
};

const VIP_CONCIERGE_FEATURES = [
  { icon: "crown", title: "Dedicated Vivah Director", desc: "A personal senior wedding planner on speed dial from muhurat to vidaai." },
  { icon: "shield", title: "100% Rate Transparency", desc: "Zero surprise markups with audited vendor contracts & direct rates." },
  { icon: "diya", title: "Vedic Pandit & Ritual Alignment", desc: "Handpicked multi-lingual priests matching your cultural heritage." },
  { icon: "sparkles", title: "Bespoke Decor & Tasting Access", desc: "Private VIP food tastings & 3D mandap visual walkthroughs." }
];

const INIT = {
  couple: "Royal Wedding Celebration",
  date: "2027-02-14",
  budget: 1500000,
  theme: "Floral Pastel",
  tradition: "North Indian / Punjabi",
  city: "Jaipur",
  saved: [5, 1],
  views: { Decor: 3, Venue: 2 },
  quotes: [],
  conciergeRequested: false,
  events: [
    {
      id: 1,
      name: "Mehendi & Sangeet",
      date: "2027-02-12",
      tasks: [
        { id: 1, t: "Book mehendi artists", who: "Bride", done: true },
        { id: 2, t: "Finalise chaat & dessert menu", who: "Family", done: false },
        { id: 5, t: "DJ & Dhol playlist rehearsal", who: "Groom", done: false }
      ]
    },
    {
      id: 2,
      name: "Wedding Ceremony (Saat Phere)",
      date: "2027-02-14",
      tasks: [
        { id: 3, t: "Confirm Vedic Pandit ji for Amrit Siddhi Muhurat", who: "Groom's Side", done: true },
        { id: 4, t: "Mandap 3D sketch approval with Petal & Thread", who: "Bride's Side", done: false },
        { id: 6, t: "Arrange Jaimala garlands & rose petal baskets", who: "Sister", done: false }
      ]
    }
  ],
  guests: [
    { id: 1, name: "Nani Ji", side: "Bride", rsvp: "Yes", table: 1 },
    { id: 2, name: "Rohan Mehta", side: "Groom", rsvp: "Yes", table: 2 },
    { id: 3, name: "Simran Kaur", side: "Bride", rsvp: "Pending", table: 1 },
    { id: 4, name: "Dev Arora", side: "Groom", rsvp: "No", table: 2 },
    { id: 5, name: "Isha Rao", side: "Bride", rsvp: "Pending", table: 3 },
    { id: 6, name: "Chacha Ji & Family", side: "Groom", rsvp: "Yes", table: 1 },
    { id: 7, name: "Vikram Malhotra", side: "Bride", rsvp: "Yes", table: 4 }
  ],
  expenses: [
    { id: 1, item: "Venue advance (Rang Mahal)", cat: "Venue", amt: 150000, paid: true },
    { id: 2, item: "Floral mandap booking (Petal & Thread)", cat: "Decor", amt: 60000, paid: true },
    { id: 3, item: "Bridal lehenga & sherwani", cat: "Attire", amt: 140000, paid: true },
    { id: 4, item: "Catering tasting token", cat: "Catering", amt: 20000, paid: false }
  ]
};

export { THEMES, CATS, VENDORS, CAT_PLAN, SHUBH_MUHURATS, REAL_STORIES, CATEGORY_CARDS, TRADITIONS, VIP_CONCIERGE_FEATURES, INIT };
