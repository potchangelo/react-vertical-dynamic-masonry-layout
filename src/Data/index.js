const sampleData = [
    {
        title: 'Sandwich with Boiled Egg',
        description: 'Avocado and Egg Toast',
        imgUrl: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 624
    },
    {
        title: 'Toast Bread with Blueberry on Black Plate',
        description: 'If you use this photo send me a link and I’ll help share your content. Or tag me or hashtag me if you’d like at #miralcetwentyone | www.miracletwentyone.org',
        imgUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 569
    },
    {
        title: 'Bowl of Vegetable Salads',
        description: 'Vegan salad bowl',
        imgUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 293
    },
    {
        title: 'Top View Photography of Fruits in Plate',
        description: '',
        imgUrl: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 660
    },
    {
        title: 'Sushi in The Plate',
        description: 'Fish for Lunch',
        imgUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 294
    },
    {
        title: 'Cooked Food',
        description: 'Meal with salmon and zucchini',
        imgUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 660
    },
    {
        title: 'Food Images',
        description: 'Slid my cart over for checkout, the attendant peeked inside and said “having a party, eh?” Indeed. Wine, cheese, crackers and berries. What more could a party ask for?',
        imgUrl: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 293
    },
    {
        title: 'Blue and White Ceramic Plate with Pancakes',
        description: 'Pancakes for breakfast',
        imgUrl: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 660
    },
    {
        title: 'Taco with Beside Sliced Lemon',
        description: 'I love this recipe for margarita marinated flank steak tacos and I love the festive, loose atmosphere of this photo. It makes me feel like I’m at a friendly, slightly chaotic party celebrating with friends on a warm evening. Dancing is bound to follow the meal.',
        imgUrl: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 588
    },
    {
        title: 'Flat-Lay Photography of Vegetable Soup on White Ceramic Cup',
        description: 'Red Curry',
        imgUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 293
    },
    {
        title: 'Selective Focus Photography of Three Purple Ice Pops Near Pine Cones',
        description: 'Autumnal Treats',
        imgUrl: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 660
    },
    {
        title: 'Assorted Sliced Citrus Fruits on Brown Wooden Chopping Board',
        description: 'Often I find myself playing with colors, but when Mother Nature provides you with the most stunning variety I couldn’t help myself to create this photograph.',
        imgUrl: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 660
    },
    {
        title: 'Pancakes with Orange and Blueberry on Plate',
        description: '',
        imgUrl: 'https://images.unsplash.com/photo-1490457843367-34b21b6ccd85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 469
    },
    {
        title: 'Selective Focus Photography of Grilled Corns',
        description: 'Grilled Corn',
        imgUrl: 'https://images.unsplash.com/photo-1470119693884-47d3a1d1f180?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 560
    },
    {
        title: 'Pancake with Chocolate Syrup on Ceramic Plate',
        description: 'Chocolate strawberry pancakes',
        imgUrl: 'https://images.unsplash.com/photo-1504113888839-1c8eb50233d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80',
        imgWidth: 440,
        imgHeight: 308
    },
];

export { sampleData };