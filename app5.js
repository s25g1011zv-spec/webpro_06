"use strict";

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


const animeData = [
  { name: "進撃の巨人", rate: 4.5, episodes: 34 },
  { name: "呪術廻戦", rate: 4.4, episodes: 30 },
  { name: "キングダム", rate:4.6,episodes: 77 },
  { name: "メジャー一期",rate:4.7,episodes:78},
  { name: "ダイヤのエース",rate:4.6,episodes:47}
];


const gameData = [
  { name: "Minecraft", rate: 3.9, downloads: 280000000 },
  { name: "原神", rate: 4.4, downloads: 115000000 },
  { name: "クラッシュロイヤル", rate:4.4, downloads: 8400000 },
  { name: "プロスピ", rate:4.6, doenloads: 53000000}
];


const pitcherData = [
  { name: "グリフィン", spirits: 4900, power: 79, control: 77, stamina: 74 },
  { name: "大谷翔平", spirits: 4700, power: 86, control: 77, stamina: 83 },
  { name: "山崎伊織", spirits: 4900, power: 74, control: 76, stamina: 77 },
  { name: "千賀滉大", spirits: 5000, power: 83, control: 70, stamina: 81 },
  { name: "菅野智之", spirits: 5000, power: 85, control: 86, stamina: 86 },
];


app.get("/anime", (req, res) => {
  res.render("anime_list", { data: animeData });
});


app.get("/anime/create", (req, res) => {
  res.render("anime_new");
});


app.post("/anime", (req, res) => {
  animeData.push({
    name: req.body.name,
    rate: Number(req.body.rate),
    episodes: Number(req.body.episodes)
  });
  res.redirect("/anime");
});


app.get("/anime/:id", (req, res) => {
  const id = Number(req.params.id);
  res.render("anime_detail", {
    data: animeData[id],
    id: id
  });
});




app.get("/anime/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  res.render("anime_edit", {
    data: animeData[id],
    id: id
  });
});


app.post("/anime/update/:id", (req, res) => {
  const id = Number(req.params.id);
  animeData[id] = {
    name: req.body.name,
    rate: Number(req.body.rate),
    episodes: Number(req.body.episodes)
  };
  res.redirect("/anime/" + id);
});


app.post("/anime/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  animeData.splice(id, 1);
  res.redirect("/anime");
});





app.get("/game", (req, res) => {
  res.render("game_list", { data: gameData });
});


app.get("/game/create", (req, res) => {
  res.render("game_new");
});

app.post("/game", (req, res) => {
  gameData.push({
    name: req.body.name,
    rate: Number(req.body.rate),
    downloads: Number(req.body.downloads)
  });
  res.redirect("/game");
});


app.get("/game/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  res.render("game_edit", { data: gameData[id], id });
});


app.post("/game/update/:id", (req, res) => {
  const id = Number(req.params.id);
  gameData[id] = {
    name: req.body.name,
    rate: Number(req.body.rate),
    downloads: Number(req.body.downloads)
  };
  res.redirect("/game/" + id);
});


app.get("/game/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || !gameData[id]) return res.redirect("/game");
  res.render("game_detail", { data: gameData[id], id });
});


app.post("/game/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  gameData.splice(id, 1);
  res.redirect("/game");
});



app.get("/pitcher", (req,res)=>{
  res.render("pitcher_list",{ data:pitcherData });
});


app.get("/pitcher/create",(req,res)=>{
  res.render("pitcher_new");
});


app.post("/pitcher",(req,res)=>{
  pitcherData.push({
    name:req.body.name,
    spirits:Number(req.body.spirits),
    power:Number(req.body.power),
    control:Number(req.body.control),
    stamina:Number(req.body.stamina)
  });
  res.redirect("/pitcher");
});


app.get("/pitcher/edit/:id",(req,res)=>{
  const id=Number(req.params.id);
  res.render("pitcher_edit",{ data:pitcherData[id], id });
});

app.post("/pitcher/update/:id",(req,res)=>{
  const id=Number(req.params.id);
  pitcherData[id]={
    name:req.body.name,
    spirits:Number(req.body.spirits),
    power:Number(req.body.power),
    control:Number(req.body.control),
    stamina:Number(req.body.stamina)
  };
  res.redirect("/pitcher/"+id);
});


app.get("/pitcher/:id",(req,res)=>{
  const id=Number(req.params.id);
  if(isNaN(id)||!pitcherData[id]) return res.redirect("/pitcher");
  res.render("pitcher_detail",{ data:pitcherData[id], id });
});


app.post("/pitcher/delete/:id",(req,res)=>{
  const id=Number(req.params.id);
  pitcherData.splice(id,1);
  res.redirect("/pitcher");
});

let station2 = [
  { id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

// 一覧
app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', {data: station2} );
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

// Read
app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_detail', {id: number, data: detail} );
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice( req.params.number, 1 );
  res.redirect('/keiyo2' );
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push( { id: id, code: code, name: name, change: change, passengers: passengers, distance: distance } );
  console.log( station2 );
  res.render('keiyo2', {data: station2} );
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[ number ];
  res.render('keiyo2_edit', {id: number, data: detail} );
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log( station2 );
  res.redirect('/keiyo2' );
});
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
