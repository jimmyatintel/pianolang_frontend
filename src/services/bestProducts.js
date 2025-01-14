import product1 from "../images/product1.jpg";
import product2 from "../images/product2.jpg";
import product3 from "../images/product3.jpg";
import product4 from "../images/product7.jpg";
import product1_firstpage from "../images/product1_firstpage.png";

//import { apiKey } from "../config";
//const url = `https://watchmode.p.rapidapi.com/sources/?apiKey=${apiKey}&limit=${limit}`;
// return fetch(url);

const bestPro = [
  {
    id: 1,
    src: product1,
    firstpage: product1_firstpage,
    name: "[簡譜]-Eric周興哲 - 幾乎是愛情(Almost)(附歌詞 和弦)",
    price: 300,
    rating: 5,
    maxQuantity: 10,
    description:
    "Eric周興哲 演唱的歌曲&quot;幾乎是愛情(Almost)&quot;,改編成簡譜.適合給習慣看簡譜或有和弦需求的朋友.琴譜共4頁.這份樂譜提供的試聽音樂是由電腦軟體產生.自行演奏時宜多加入感情,以增加音樂性.",
    isAddedToWishlist: false,
    author: "",
    composer: "葛大為",
    lyricist: "周興哲",

  },
  {
    id: 2,
    src: product2,
    name: "product2",
    price: 400,
    rating: 5,
    maxQuantity: 2,
    description:
      "More room to move. With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go. Cover Flow. Browse through your music collection by flipping..",
    isAddedToWishlist: false,
  },
  {
    id: 3,
    src: product3,
    name: "product3",
    price: 370,
    rating: 4.5,
    maxQuantity: 10,
    description:
      "More room to move. With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go. Cover Flow. Browse through your music collection by flipping..",
    isAddedToWishlist: false,
  },
  {
    id: 4,
    src: product4,
    name: "product4",
    price: 500,
    rating: 5,
    maxQuantity: 10,
    description:
      "More room to move. With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go. Cover Flow. Browse through your music collection by flipping..",
    isAddedToWishlist: false,
  },
];

export default bestPro;
