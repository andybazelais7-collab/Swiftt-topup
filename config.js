/* ============================================================
   SWIFTT TOPUP — PRI YO (fichye pou modifye a)
   Boss: pou chanje yon pri, modifye nimewo a isit la sou GitHub
   (pa egzanp price: 150 -> 175), epi tout sit la ap mete ajou
   pou kont li. Pa manyen lòt fichye yo si ou pa bezwen.
   ============================================================ */
const WHATSAPP_NUMBER = "18735972113";
const MONCASH_NUMBER = "+509 3497 9011";

const GAMES = {
  freefire: {
    name: "Free Fire",
    currency: "Goud",
    packs: [
      { label: "100 + 10 bonus",   amount: "110",   price: 150 },
      { label: "200 + 20 bonus",   amount: "220",   price: 330 },
      { label: "310 + 41 bonus",   amount: "351",   price: 480 },
      { label: "520 + 52 bonus",   amount: "572",   price: 800 },
      { label: "1 060 + 120 bonus", amount: "1 180", price: 1625 },
      { label: "2 180 + 218 bonus", amount: "2 398", price: 3225 },
      { label: "5 600 + 560 bonus", amount: "6 160", price: 9000 }
    ],
    extrasTitle: "Lòt òf Free Fire",
    extras: [
      { label: "BOOYAH Pass + pr", price: 1700 },
      { label: "Abònman Semèn",    price: 375 },
      { label: "Abònman Mwa",      price: 1850 },
      { label: "BOOYAH Pass",      price: 475 },
      { label: "LEVEL UP",         price: 1000 }
    ]
  },
  efootball: {
    name: "eFootball",
    currency: "HTG",
    packs: [
      { label: "130 Coins",    amount: "130",    price: 200 },
      { label: "300 Coins",    amount: "300",    price: 445 },
      { label: "550 Coins",    amount: "550",    price: 790 },
      { label: "750 Coins",    amount: "750",    price: 1070 },
      { label: "1 040 Coins",  amount: "1 040",  price: 1450 },
      { label: "2 130 Coins",  amount: "2 130",  price: 2970 },
      { label: "3 250 Coins",  amount: "3 250",  price: 4455 },
      { label: "5 700 Coins",  amount: "5 700",  price: 7260 },
      { label: "12 800 Coins", amount: "12 800", price: 15510 }
    ],
    extrasTitle: "",
    extras: []
  }
};
