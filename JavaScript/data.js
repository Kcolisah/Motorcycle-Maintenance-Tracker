//Taken me 2 days almost 3 to build the arrays (had to brainstorm)
const motorcycles = [

//Aprilia ====================================================
{
    id: 1,
    brand: "Aprilia",
    category: "Sport",
    model: "Aprilia RS457",
    year: 2021,
    price: 5299,
    image: "Sport/Aprilia_RS457.jpg"
},

{
    id: 2,
    brand: "Aprilia",
    category: "Sport",    
    model: "Aprilia RS660",
    year: 2021,
    price: 7899,
    image: "Sport/Aprilia_RS660.jpg"
},

{
    id: 3,
    brand: "Aprilia",
    category: "SuperSport",
    model: "Aprilia RSV4",
    year: 2021,
    price: 10999,
    image: "SuperSport/Aprilia_RSV4.jpg"
},


// BMW =========================================================
{
    id: 4,
    brand: "BMW",
    category: "Sport",
    model: "BMW G310RR",
    year: 2021,
    price: 5299,
    image: "Sport/BMW_G310RR.jpg"
},

{
    id: 5,
    brand: "BMW",
    category: "Sport",    
    model: "BMW F900R",
    year: 2021,
    price: 7899,
    image: "Sport/BMW_F900R.jpg"
},

{
    id: 6,
    brand: "BMW",
    category: "SuperSport",
    model: "BMW S1000RR",
    year: 2021,
    price: 10999,
    image: "SuperSport/BMW_S1000RR.jpg"
},

{
    id: 7,
    brand: "BMW",
    category: "HyperSport",
    model: "BMW M1000RR",
    year: 2021,
    price: 16599,
    image: "HyperSport/BMW_M1000RR.jpg"
},


//Ducati =========================================================
{
    id: 8,
    brand: "Ducati",
    category: "Sport",
    model: "Ducati SuperSport 950",
    year: 2021,
    price: 31500,
    image: "Sport/Ducati_SuperSport_950.jpg"
},

{
    id: 9,
    brand: "Ducati",
    category: "SuperSport",
    model: "Ducati Panigale V2",
    year: 2021,
    price: 55000,
    image: "SuperSport/Ducati_Panigale_V2.jpg"
},

{
    id: 10,
    brand: "Ducati",
    category: "SuperSport",
    model: "Ducati Panigale V4",
    year: 2021,
    price: 5299,
    image: "SuperSport/Ducati_Panigale_V4.jpg"
},

{
    id: 11,
    brand: "Ducati",
    category: "HyperSport",    
    model: "Ducati Streetfighter V4",
    year: 2021,
    price: 7899,
    image: "HyperSport/Ducati_Streetfighter_V4.jpg"
},



//Harley-Davidson =========================================================
{
    id: 12,
    brand: "Harley",
    category: "Cruiser",
    model: "Harley Iron 993",
    year: 2021,
    price: 10999,
    image: "Cruiser/Harley_Iron_993.jpg"
},

{
    id: 13,
    brand: "Harley",
    category: "Cruiser",
    model: "Harley Low Rider S",
    year: 2021,
    price: 17799,
    image: "Cruiser/Harley_Low_Rider_S.jpg"
},

{
    id: 14,
    brand: "Harley",
    category: "Cruiser",
    model: "Harley Sportster S",
    year: 2021,
    price: 16599,
    image: "Cruiser/Harley_Sportster_S.jpg"
},



// Honda  =========================================================
{
    id: 15,
    brand: "Honda",
    category: "Sport",
    model: "Honda CBR 500R",
    year: 2021,
    price: 31500,
    image: "Sport/Honda_CBR_500R.jpg"
},

{
    id: 16,
    brand: "Honda",
    category: "Sport",
    model: "Honda CBR 650R",
    year: 2021,
    price: 55000,
    image: "Sport/Honda_CBR_650R.jpg"
},

{
    id: 17,
    brand: "Honda",
    category: "SuperSport",
    model: "Honda CBR 600RR",
    year: 2021,
    price: 5299,
    image: "SuperSport/Honda_CBR_600RR.jpg"
},

{
    id: 18,
    brand: "Honda",
    category: "SuperSport",    
    model: "Honda CBR 1000RR",
    year: 2021,
    price: 7899,
    image: "SuperSport/Honda_CBR_1000RR.jpg"
},


//Indian =========================================================
{
    id: 19,
    brand: "Indian",
    category: "Cruiser",
    model: "Indian Chief",
    year: 2021,
    price: 10999,
    image: "Cruiser/Indian_Chief.jpg"
},

{
    id: 20,
    brand: "Indian",
    category: "Cruiser",
    model: "Indian Scout",
    year: 2021,
    price: 17799,
    image: "Cruiser/Indian_Scout.jpg"
},


//Kawasaki =========================================================
{
    id: 21,
    brand: "Kawasaki",
    category: "Sport",
    model: "Kawasaki Ninja 500R",
    year: 2021,
    price: 16599,
    image: "Sport/Kawasaki_Ninja_500R.jpg"
},

{
    id: 22,
    brand: "Kawasaki",
    category: "Sport",
    model: "Kawasaki Ninja 650R",
    year: 2021,
    price: 31500,
    image: "Sport/Kawasaki_Ninja_650R.jpg"
},

{
    id: 23,
    brand: "Kawasaki",
    category: "SuperSport",
    model: "Kawasaki Ninja ZX6R",
    year: 2021,
    price: 55000,
    image: "SuperSport/Kawasaki_Ninja_ZX_6R.png"
},

{
    id: 24,
    brand: "Kawasaki",
    category: "SuperSport",
    model: "Kawasaki Ninja ZX 10R",
    year: 2021,
    price: 16599,
    image: "SuperSport/Kawasaki_Ninja_ZX_10R.png"
},

{
    id: 25,
    brand: "Kawasaki",
    category: "HyperSport",
    model: "Kawasaki-Ninja ZX14R",
    year: 2021,
    price: 31500,
    image: "HyperSport/Kawasaki_Ninja_ZX_14R.jpg"
},

{
    id: 26,
    brand: "Kawasaki",
    category: "HyperSport",
    model: "Kawasaki Ninja H2",
    year: 2021,
    price: 55000,
    image: "HyperSport/Kawasaki_Ninja_H2.jpg"
},

{
    id: 27,
    brand: "Kawasaki",
    category: "HyperSport",
    model: "Kawasaki Ninja H2R",
    year: 2021,
    price: 16599,
    image: "HyperSport/Kawasaki_Ninja_H2R.jpg"
},



//KTM =========================================================
{
    id: 28,
    brand: "KTM",
    category: "Sport",
    model: "KTM RC390",
    year: 2021,
    price: 31500,
    image: "Sport/KTM_RC390.jpg"
},

{
    id: 29,
    brand: "KTM",
    category: "SuperSport",
    model: "KTM RC8C",
    year: 2021,
    price: 55000,
    image: "SuperSport/KTM_RC8C.jpeg"
},



//Suzuki    =========================================================
{
    id: 30,
    brand: "Suzuki",
    category: "Sport",
    model: "Suzuki GSX 250R",
    year: 2021,
    price: 16599,
    image: "Sport/Suzuki_GSX_250R.jpg"
},

{
    id: 31,
    brand: "Suzuki",
    category: "Sport",
    model: "Suzuki GSX 8R",
    year: 2021,
    price: 31500,
    image: "Sport/Suzuki_GSX_8R.jpg"
},

{
    id: 32,
    brand: "Suzuki",
    category: "SuperSport",
    model: "Suzuki GSX 600R",
    year: 2021,
    price: 55000,
    image: "SuperSport/Suzuki_GSX_600R.jpg"
},

{   id: 33,
    brand: "Suzuki",
    category: "SuperSport",
    model: "Suzuki GSX 750R",
    year: 2021,
    price: 16599,
    image: "SuperSport/Suzuki_GSX_750R.jpg"
},

{
    id: 34,
    brand: "Suzuki",
    category: "SuperSport",
    model: "Suzuki GSX 1000R",
    year: 2021,
    price: 31500,
    image: "SuperSport/Suzuki_GSX_1000R.jpg"
},

{
    id: 35,
    brand: "Suzuki",
    category: "HyperSport",
    model: "Suzuki GSX Hayabusa",
    year: 2021,
    price: 55000,
    image: "HyperSport/Suzuki_GSX_Hayabusa.png"
},



//Triumph =========================================================
{
    id: 36,
    brand: "Triumph",
    category: "Sport",
    model: "Triumph Daytona 660",
    year: 2021,
    price: 16599,
    image: "Sport/Triumph_Daytona_660.png"
},

{
    id: 37,
    brand: "Triumph",
    category: "Sport",
    model: "Triumph Speed Triple_RR",
    year: 2021,
    price: 31500,
    image: "Sport/Triumph_Speed_Triple_RR.jpg"
},

{
    id: 38,
    brand: "Triumph",
    category: "SuperSport",
    model: "Triumph Daytona 765",
    year: 2021,
    price: 55000,
    image: "SuperSport/Triumph_Daytona_765.jpg"
},

{
    id: 39,
    brand: "Triumph",
    category: "SuperSport",
    model: "Triumph Speed Triple 1200 RS",
    year: 2021,
    price: 16599,
    image: "SuperSport/Triumph_Speed_Triple_1200_RS.png"
},



//Yamaha =========================================================
{
    id: 40,
    brand: "Yamaha",
    category: "Sport",
    model: "Yamaha R3",
    year: 2021,
    price: 31500,
    image: "Sport/Yamaha_R3.jpg"
},

{
    id: 41,
    brand: "Yamaha",
    category: "Sport",
    model: "Yamaha R7",
    year: 2021,
    price: 55000,
    image: "Sport/Yamaha_R7.jpg"
},

{
    id: 42,
    brand: "Yamaha",
    category: "SuperSport",
    model: "Yamaha R6",
    year: 2021,
    price: 55000,
    image: "SuperSport/Yamaha_R6.jpg"
},

{
    id: 43,
    brand: "Yamaha",
    category: "SuperSport",
    model: "Yamaha R1",
    year: 2021,
    price: 55000,
    image: "SuperSport/Yamaha_R1.jpg"
}
];


function filterByBrand(motorcycles, brand){
    return motorcycles.filter(bike => bike.brand === brand);
}

function filterByCategory(motorcycles, category){
    return motorcycles.filter(bike => bike.category === category);
}

function filterByBrandAndCategory(motorcycles, brand, category){
    return motorcycles.filter(bike => bike.brand === brand && bike.category === category); // this verifies both brand and category | keeps the bike only if both are true
}


const selectedBrand = "Suzuki";
const selectedCategory = "HyperSport";

const combined = filterByBrandAndCategory(motorcycles, selectedBrand, selectedCategory);


console.log(combined);