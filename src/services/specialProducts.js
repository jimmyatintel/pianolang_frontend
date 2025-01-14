import product1 from "../images/product1.jpg";
import product2 from "../images/product2.jpg";

//import { apiKey } from "../config";
//const url = `https://watchmode.p.rapidapi.com/sources/?apiKey=${apiKey}&limit=${limit}`;
// return fetch(url);

const specialPro = [
  {
    id: 1,
    src: product1,
    name: "product1",
    price: 300,
    rating: 5,
    maxQuantity: 10,
    description:
      "More room to move. With 80GB or 160GB of storage and up to 40 hours of battery life, the new lorem ippsum dolor dummy lets you enjoy up to 40,000 songs or up to 200 hours of video or any combination wherever you go. Cover Flow. Browse through your music collection by flipping..",
    isAddedToWishlist: false,
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
];

export default specialPro;
