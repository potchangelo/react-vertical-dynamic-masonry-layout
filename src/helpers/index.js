import { v4 as uuidv4 } from 'uuid';
import { PageImageText, PageImage, PageText, PageImageNoGap, PageImageTextAppend, PageImageShuffle } from '../pages';

const routes = [
  { id: 'home', url: '/', title: 'Image text (Home)', component: <PageImageText /> },
  { id: 'image', url: 'image/', title: 'Image', component: <PageImage /> },
  { id: 'text', url: 'text/', title: 'Text', component: <PageText /> },
  { id: 'image-no-gap', url: 'image-no-gap/', title: 'Image no gap', component: <PageImageNoGap /> },
  { id: 'image-shuffle', url: 'image-shuffle/', title: 'Image shuffle', component: <PageImageShuffle /> },
  { id: 'image-text-append', url: 'image-text-append/', title: 'Image text with load more', component: <PageImageTextAppend /> },
];

const samplePhotos = [
  {
    title: 'Sandwich with Boiled Egg',
    description: 'Avocado and Egg Toast',
    photoUrl:
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 624,
  },
  {
    title: 'Toast Bread with Blueberry on Black Plate',
    description:
      'If you use this photo send me a link and I’ll help share your content. Or tag me or hashtag me if you’d like at #miralcetwentyone | www.miracletwentyone.org',
    photoUrl:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 569,
  },
  {
    title: 'Bowl of Vegetable Salads',
    description: 'Vegan salad bowl',
    photoUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 293,
  },
  {
    title: 'Top View Photography of Fruits in Plate',
    description: '',
    photoUrl:
      'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 660,
  },
  {
    title: 'Sushi in The Plate',
    description: 'Fish for Lunch',
    photoUrl:
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 294,
  },
  {
    title: 'Cooked Food',
    description: 'Meal with salmon and zucchini',
    photoUrl:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 660,
  },
  {
    title: 'Food Images',
    description:
      'Slid my cart over for checkout, the attendant peeked inside and said “having a party, eh?” Indeed. Wine, cheese, crackers and berries. What more could a party ask for?',
    photoUrl:
      'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 293,
  },
  {
    title: 'Blue and White Ceramic Plate with Pancakes',
    description: 'Pancakes for breakfast',
    photoUrl:
      'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 660,
  },
  {
    title: 'Taco with Beside Sliced Lemon',
    description:
      'I love this recipe for margarita marinated flank steak tacos and I love the festive, loose atmosphere of this photo. It makes me feel like I’m at a friendly, slightly chaotic party celebrating with friends on a warm evening. Dancing is bound to follow the meal.',
    photoUrl:
      'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 588,
  },
  {
    title: 'Flat-Lay Photography of Vegetable Soup on White Ceramic Cup',
    description: 'Red Curry',
    photoUrl:
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 293,
  },
  {
    title: 'Selective Focus Photography of Three Purple Ice Pops Near Pine Cones',
    description: 'Autumnal Treats',
    photoUrl:
      'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 660,
  },
  {
    title: 'Assorted Sliced Citrus Fruits on Brown Wooden Chopping Board',
    description:
      'Often I find myself playing with colors, but when Mother Nature provides you with the most stunning variety I couldn’t help myself to create this photograph.',
    photoUrl:
      'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 660,
  },
  {
    title: 'Pancakes with Orange and Blueberry on Plate',
    description: '',
    photoUrl:
      'https://images.unsplash.com/photo-1490457843367-34b21b6ccd85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 469,
  },
  {
    title: 'Selective Focus Photography of Grilled Corns',
    description: 'Grilled Corn',
    photoUrl:
      'https://images.unsplash.com/photo-1470119693884-47d3a1d1f180?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 560,
  },
  {
    title: 'Pancake with Chocolate Syrup on Ceramic Plate',
    description: 'Chocolate strawberry pancakes',
    photoUrl:
      'https://images.unsplash.com/photo-1504113888839-1c8eb50233d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
    width: 440,
    height: 308,
  },
].map(p => ({ id: uuidv4(), ...p }));

export { routes, samplePhotos };
