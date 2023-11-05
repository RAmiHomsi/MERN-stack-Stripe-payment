import photo1 from "../assets/1.jpg";
import photo2 from "../assets/2.jpg";
import photo3 from "../assets/3.jpg";
import photo4 from "../assets/4.jpg";

export const products = [
  {
    name: "Demon Slayer",
    price: 30,
    id: crypto.randomUUID(),
    quantity: 1,
    img: photo1,
  },
  {
    name: "Naruto Shippuden",
    price: 40,
    id: crypto.randomUUID(),
    quantity: 1,
    img: photo2,
  },
  {
    name: "Jujutsu Kaisen",
    price: 50,
    id: crypto.randomUUID(),
    quantity: 1,
    img: photo3,
  },
  {
    name: "Attack On Titan",
    price: 60,
    id: crypto.randomUUID(),
    quantity: 1,
    img: photo4,
  },
];
