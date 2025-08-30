module.exports.config = {
    name: "owner",
    version: "1.2.0",
    hasPermssion: 0,
    credits: "Shaon Ahmed",
    description: "Fancy owner info with Imgur banner",
    commandCategory: "For users",
    usages: "owner",
    cooldowns: 5,
};

module.exports.run = async function({ api, event, Users }) {
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const moment = require("moment-timezone");

    const { threadID, senderID } = event;
    const ownerID = "100079776818351"; // তোমার Facebook ID

    if (senderID != ownerID) {
        return api.sendMessage("❌ শুধুমাত্র Owner এর জন্য।", threadID);
    }

    const name = await Users.getNameUser(senderID);
    const uptime = process.uptime();
    const hours = Math.floor(uptime / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);

    // Only Imgur banners
    const banners = [
        "https://i.imgur.com/9oI0js6.png",
        ""
    ];

    const bannerLink = banners[Math.floor(Math.random() * banners.length)];
    const path = __dirname + "/cache/owner_banner.jpg";

    // Download image from Imgur
    return request(encodeURI(bannerLink))
        .pipe(fs.createWriteStream(path))
        .on("close", () => {
            const message = `
🌸✨ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 ✨🌸

👤 Name      : ${name}
🆔 Facebook ID: ${ownerID}
📱 WhatsApp   : 01931411945
💻 Bot        : 🅰🅸 🅰🆂🅸🆂🆃🅰🅽🆃⚠️

⏰ Active Time: ${hours}h ${minutes}m ${seconds}s

🌟 Thanks for using the bot!
`;

            api.sendMessage({ body: message, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path));
        });
}; 
