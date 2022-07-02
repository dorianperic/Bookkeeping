const mongoose = require('mongoose')
var { Bookdb , Userdb } = require('../model/model');

mongoose.connect("add your mongo db conn string here", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('mongoDB connected');
}).catch((err) => {
    console.log(err);
});


const booksSeed = [{
    name:"Koko u Parizu",
    author:"Ivan Kušan",
    availability:true,
    description:"Poznati dječji roman, Koko u Parizu, prominentnog hrvatskog autora Ivana Kušana, prava je kombinacija intrige, zaigranosti i blage doze komedije. Koko doživljava nove pustolovine, ovaj put na prostorima Pariza.",
    type:"Dječji roman",
    bookpicture:"https://i.imgur.com/xWYWmBW.jpg",
    authorpicture:"https://i.imgur.com/lCxyC8i.jpg"
    },
    {
    name:"Ana Karenjina",
    author:"Lav Nikolajevič Tolstoj",
    availability:true,
    description:"Ana Karenjina objavljena je u serijskom obliku u razdoblju između 1873. i  1877. godine. Djelo je ostavilo dubok dojam, a suvremena izvješća pokazuju kako je rusko društvo pratilo i raspravljalo o romanu, nestrpljivo isčekujući idući nastavak. Tema romana je preljub kojeg počini glavni lik Ana Karenjina nakon čega je društvo osuđujući odbacuje, priklanjajući se njenom mužu grofu Karenjinu.",
    type:"Roman",
    bookpicture:"https://i.imgur.com/BA9Fg5r.jpg",
    authorpicture:"https://i.imgur.com/6gSy4fU.jpg"
    },
    {
    name:"Braća Karamazovi",
    author:"Fjodor Mihailovič Dostojevski",
    availability:true,
    description:"„Braća Karamazovi“ roman je slavnog ruskog pisca Fjodora Mihailoviča Dostojevskog i to njegov poslednji. Pisan je 1879. i 1880. godine, istovremeno objavljivan u nastavcima u časopisu Ruski vesnik. Ovo je jedan veliki filozofski roman, za kojeg su najveći mislioci 19. i 20. stoljeća smatrali da je jedno vrhunsko dostignuće svetske književnosti. Roman objedinjuje filozofska promišljanja o raznim temema, koje uključuju moralna pitanja, slobodnu volju, etiku hršćanstva, sumnje u veru, ali i modernu Rusiju.",
    type:"Roman",
    bookpicture:"https://i.imgur.com/7rgIPBt.jpg",
    authorpicture:"https://i.imgur.com/KQiERO0.jpg"
    },
    {
    name:"Lovac u žitu",
    author:"Jerome David Salinger",
    availability:true,
    description:"U romanu su prikazani likovi i teme koje se pojavljuju i u brojnim Salingerovim ranijim kratkim pričama, a od kojih su neke korištene kao osnova pojedinih poglavlja u djelu Lovac u žitu. Uistinu, obitelj Caulfield predmet je dviju glavnih Salingerovih priča – Ovaj sendvič nema majonezu i Lud sam, kao i brojnih neobjavljenih djela.  Prvu od tih priča, Ovaj sendvič nema majonezu, pripovijeda Vincent Caulfield, koji saznaje da je njegov brat izbačen iz škole Pentey (u romanu Lovac u žitu autor naziv škole mijenja u Pencey). Vincent služi kao osnova D.B-u Caulfieldu, Holdenovom starijem bratu u romanu i glavni je protagonist u mnogim Salingerovim pričama. U priči Ocean pun kugli za kuglanje Vincent se prisjeća svog odnosa s Kennethom, njegovim pokojnim mlađim bratom (očigledna osnova za Allie).",
    type:"Roman",
    bookpicture:"https://i.imgur.com/1N2eEwF.jpg",
    authorpicture:"https://i.imgur.com/6EFnzFy.jpg"
    },
    {
    name:"Priče iz davnine",
    author:"Ivana Brlić Mažuranić",
    availability:true,
    description:"“Priče iz davnine” zbirka je priča naše najpoznatije autorice bajki Ivane Brlić Mažuranić. Mnoge od njih ostale su u divnom sjećanju brojnih generacija upravo zbog svoje originalnosti, ljepote i svevremenskih pouka. Zbirka je prvi put izdana 1916. godine i već je tada postigla nevjerojatan uspjeh. Prvo izdanje sadržavalo je šest priča, a u drugo izdanje, koje je tiskano 1926. godine, dodane su još dvije priče – “Lutonjica Toporko i devet Župančića” i “Jagor”.",
    type:"Zbirka priča",
    bookpicture:"https://i.imgur.com/PzhxWis.jpg",
    authorpicture:"https://i.imgur.com/v60MUQv.jpg"
}]

const userSeed = [{
    name:"Dorian",
    passwordhash:"76f92caae21bdc8f4e1882bc608cf39e7857c177d2be04b5f7b5011ccd4d4230",
    role:true
    },
    {
    name:"Ivo",
    passwordhash:"144d891e31caa262111f14785dee60113035f4f4681292d8d4fd9dc039bf6331",
    role:false
}]

const dbSeed = async () => {
    await Bookdb.deleteMany({});
    await Userdb.deleteMany({});

    await Bookdb.insertMany(booksSeed);
    await Userdb.insertMany(userSeed);
}

dbSeed().then(() => {
    mongoose.connection.close()
});
