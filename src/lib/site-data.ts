export const brand = {
  name: "Sheen Mode",
  productName: "Ghanal Hair Oil",
  tagline: "Natural Care for Stronger, Healthier Hair",
  description:
    "Homemade hair oil crafted to support hair growth, reduce breakage, and keep the scalp nourished.",
  story:
    "Sheen Mode was created to make natural hair care feel premium, simple, and trustworthy. Ghanal Hair Oil brings together carefully selected ingredients in a homemade formula designed for everyday use.",
};

export const product = {
  name: "Ghanal Hair Oil",
  price: 2499,
  currency: "PKR",
  size: "100ml",
  sku: "SM-GHO-100",
  stock: "Limited stock",
  shortDescription:
    "A lightweight, herbal blend for scalp nourishment, shine, and healthy-looking hair.",
  longDescription:
    "Ghanal Hair Oil is made for customers who want a simple, natural routine with visible care benefits. The formula is designed to support hair growth, ease dryness, and leave hair feeling softer without the heavy market-oil finish.",
};

export const benefits = [
  {
    title: "Supports Hair Growth",
    description: "Designed to keep the scalp nourished and encourage stronger strands.",
  },
  {
    title: "Reduces Hair Fall",
    description: "Helps create a healthier scalp routine that can reduce breakage.",
  },
  {
    title: "Adds Natural Shine",
    description: "Leaves the hair looking smoother, softer, and well cared for.",
  },
  {
    title: "Nourishes Roots",
    description: "A blend of oils and herbs made to feed the scalp deeply.",
  },
  {
    title: "Fights Dryness",
    description: "Adds moisture without the greasy feel of many heavy oils.",
  },
  {
    title: "For Men and Women",
    description: "A simple daily-care oil suitable for all hair types.",
  },
];

export const ingredients = [
  "Sea Buckthorn",
  "Castor Beans",
  "Indian Gooseberry",
  "Soapnut",
  "Acacia Concinna",
  "Rosemary Leaves",
  "Curry Leaves",
  "Fenugreek Seeds",
  "Black Seed / Nigella Seeds",
  "Jatamansi / Spikenard",
];

export const ingredientBenefits = [
  {
    ingredient: "Sea Buckthorn",
    benefit: "Rich in fatty acids and antioxidants that help nourish dry scalp and improve softness.",
  },
  {
    ingredient: "Castor Beans",
    benefit: "Supports stronger-looking strands and helps reduce breakage when used consistently.",
  },
  {
    ingredient: "Indian Gooseberry",
    benefit: "Amla supports scalp health and helps keep hair looking thicker and shinier.",
  },
  {
    ingredient: "Soapnut",
    benefit: "Traditionally used for scalp cleansing and helping control excess buildup.",
  },
  {
    ingredient: "Acacia Concinna",
    benefit: "Known for gentle conditioning support that can improve manageability.",
  },
  {
    ingredient: "Rosemary Leaves",
    benefit: "Commonly used to support scalp circulation and healthy hair growth routines.",
  },
  {
    ingredient: "Curry Leaves",
    benefit: "Helps support root nourishment and maintain natural hair texture.",
  },
  {
    ingredient: "Fenugreek Seeds",
    benefit: "Adds slip and moisture support, helping reduce dryness and roughness.",
  },
  {
    ingredient: "Black Seed / Nigella Seeds",
    benefit: "Provides antioxidant support for scalp comfort and stronger-looking hair.",
  },
  {
    ingredient: "Jatamansi / Spikenard",
    benefit: "Traditionally valued for soothing the scalp and supporting overall hair vitality.",
  },
];

export const gallery = [
  {
    title: "Front Bottle",
    description: "Clean label presentation for your signature product shot.",
    accent: "from-[#34583e] to-[#1f3525]",
  },
  {
    title: "Ingredients",
    description: "A premium layout that highlights the herbal formula.",
    accent: "from-[#866b3f] to-[#5d4521]",
  },
  {
    title: "Lifestyle",
    description: "Use this space for customer or model photography later.",
    accent: "from-[#c6b28a] to-[#92754c]",
  },
];

export const testimonials = [
  {
    name: "Ayesha R.",
    quote: "My hair fall reduced after 3 weeks, and the oil feels lightweight.",
  },
  {
    name: "Sana K.",
    quote: "Very natural smell and it leaves my hair soft instead of sticky.",
  },
  {
    name: "Hassan M.",
    quote: "I noticed new baby hair growth after using it consistently.",
  },
];

export const faqs = [
  {
    question: "How often should I use the oil?",
    answer: "Two to three times a week is a good starting point for most users.",
  },
  {
    question: "Is it suitable for men and women?",
    answer: "Yes. It is designed as a simple routine oil for all hair types.",
  },
  {
    question: "How long does one bottle last?",
    answer: "A 100ml bottle usually lasts several weeks depending on usage.",
  },
  {
    question: "Is it chemical free?",
    answer: "The formulation is positioned as a natural homemade oil blend.",
  },
  {
    question: "Can I use it on colored hair?",
    answer: "Yes, but patch test first if your scalp is sensitive or freshly treated.",
  },
];

export const deliveryOptions = [
  {
    id: "standard",
    label: "Standard Delivery",
    fee: 250,
    eta: "3-5 business days",
  },
  {
    id: "express",
    label: "Express Delivery",
    fee: 450,
    eta: "1-2 business days",
  },
  {
    id: "pickup",
    label: "Local Pickup",
    fee: 0,
    eta: "Same day confirmation",
  },
] as const;

export const paymentMethods = [
  "Cash on Delivery",
  "Bank Transfer",
  "Easypaisa",
  "JazzCash",
] as const;

export const socialLinks = {
  whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}`,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@sheenmode.com",
};

export const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/about", label: "About Us" },
  { href: "/orders", label: "Orders" },
  { href: "/admin", label: "Admin" },
];