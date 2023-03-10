import { format } from "date-fns";
export const productsFakeData = [{
  image: "/static/products/shoe-3.png",
  name: "Nike Air Max 270",
  company: "Nike Official",
  category: "Shoe",
  sku: "UY3769",
  price: 450,
  stock: 48,
  rate: 14
}, {
  image: "/static/products/shoe-4.png",
  name: "White Nike 270",
  company: "Rave BD",
  category: "Shoe",
  sku: "UY3769",
  price: 450,
  stock: 48,
  rate: 14
}, {
  image: "/static/products/shoe-3.png",
  name: "Blue Revels Shoes",
  company: "Rave BD",
  category: "Shoe",
  sku: "UY3769",
  price: 450,
  stock: 48,
  rate: 14
}, {
  image: "/static/products/shoe-4.png",
  name: "Nike Pro Max 270",
  company: "Nike BD",
  category: "Shoe",
  sku: "UY3769",
  price: 450,
  stock: 48,
  rate: 14
}, {
  image: "/static/products/light.png",
  name: "Nike Lamp Light",
  company: "Super Start",
  category: "Electronics",
  sku: "UY3769",
  price: 450,
  stock: 48,
  rate: 14
}, {
  image: "/static/products/chair.png",
  name: "Comfortable Chair",
  company: "Hatil",
  category: "Chair",
  sku: "UY3769",
  price: 450,
  stock: 48,
  rate: 14
}];
export const ordersFakeData = [{
  orderNo: "UY3769",
  customer: "Mark Ruffle",
  date: format(new Date(), "dd-MM-yyyy"),
  total: "$789",
  payment: "Paypal",
  status: "Unpaid"
}, {
  orderNo: "UY3770",
  customer: "Mark Ruffle",
  date: format(new Date(), "dd-MM-yyyy"),
  total: "$789",
  payment: "Paypal",
  status: "Paid"
}, {
  orderNo: "UY3761",
  customer: "Mark Ruffle",
  date: format(new Date(), "dd-MM-yyyy"),
  total: "$789",
  payment: "Paypal",
  status: "Unpaid"
}, {
  orderNo: "UY3762",
  customer: "Mark Ruffle",
  date: format(new Date(), "dd-MM-yyyy"),
  total: "$789",
  payment: "Paypal",
  status: "Paid"
}];
export const customersFakeData = [{
  date: format(new Date(), "MMM dd, yyyy"),
  name: "Natalie Dormer",
  position: "UI Designer",
  phone: "+00578115245",
  avatar: "/static/avatar/001-man.svg",
  email: "Uilib@gmail.com",
  location: "Austin, USA",
  status: "Active"
}, {
  date: format(new Date(), "MMM dd, yyyy"),
  name: "Natalie Dormer",
  position: "Editor",
  phone: "+00578115245",
  avatar: "/static/avatar/002-girl.svg",
  email: "Uilib@gmail.com",
  location: "Austin, USA",
  status: "Blocked"
}, {
  date: format(new Date(), "MMM dd, yyyy"),
  name: "Lily Collins",
  position: "UI Designer",
  phone: "+00578115245",
  avatar: "/static/avatar/003-boy.svg",
  email: "Uilib@gmail.com",
  location: "Corner View, Sylhet",
  status: "Active"
}, {
  date: format(new Date(), "MMM dd, yyyy"),
  name: "Natalie Dormer",
  phone: "+00578115245",
  avatar: "/static/avatar/004-woman.svg",
  email: "Uilib@gmail.com",
  location: "Corner View, Sylhet",
  status: "Blocked"
}];