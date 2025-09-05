module.exports.config = {
 name: "hot",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "hot video",
 commandCategory: "admin",
 usages: "horny vedio",
 cooldowns: 5,
 dependencies: {
 request: '',
 "fs-extra": '',
 axios: ''
 }
};

module.exports.run = async function({ api, event }) {
 const request = global.nodemodule["request"];
 const fs = global.nodemodule["fs-extra"];
var videoLinks = [

];
 

 const path = __dirname + "/cache/hotvideo.mp4";
 const randomLink = videoLinks[Math.floor(Math.random() * videoLinks.length)];

 request(encodeURI(randomLink))
 .pipe(fs.createWriteStream(path))
 .on("close", () => {
 api.sendMessage({
 body: "পাপির দল 😤 নে তোদের যাদের বউ নাই তাদের জন্য বস 𝗭𝗜𝗦𝗔𝗡 এই ফাইল দিছে । খবরদার হাত মারবি না 🥵🫵",
 attachment: fs.createReadStream(path)
 }, event.threadID, () => fs.unlinkSync(path));
 });
};
