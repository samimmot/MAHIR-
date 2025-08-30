const fs = require("fs");
const path = require("path");

// ========== CONFIG ==========
module.exports.config = {
    name: "funpackpro",
    version: "2.0.0",
    hasPermssion: 2,
    credits: "Ferdous Wahid (Optimized)",
    description: "Multi Fun & Utility Command Pack with AutoReact",
    commandCategory: "fun",
    usePrefix: true,
    cooldowns: 1
};

// ===== FILE PATHS =====
const autoReactConfigPath = path.join(__dirname, "../modules/funpack_autoreact.json");

// যদি কনফিগ ফাইল না থাকে তাহলে ডিফল্ট তৈরি করবে
if (!fs.existsSync(autoReactConfigPath)) {
    fs.writeFileSync(autoReactConfigPath, JSON.stringify({ enabled: true, reactions: [] }, null, 2));
}

// ===== AUTO REACT SYSTEM =====
module.exports.handleEvent = async ({ api, event }) => {
    if (!event.body) return;
    const cfg = JSON.parse(fs.readFileSync(autoReactConfigPath, "utf-8"));
    if (!cfg.enabled) return;

    const msg = event.body.toLowerCase();
    cfg.reactions.forEach(r => {
        if (msg.startsWith(r.keyword.toLowerCase())) {
            api.setMessageReaction(r.emoji, event.messageID, () => {}, true);
        }
    });
};

// ===== COMMAND HANDLER =====
module.exports.run = async ({ api, event, args }) => {
    if (!args[0]) {
        return api.sendMessage(
`📜 Available Commands:
1️⃣ scanface @tag
2️⃣ lovepercent name1 name2
3️⃣ reverse text
4️⃣ brain @tag
5️⃣ insult @tag
6️⃣ autoreact on/off
7️⃣ quote`,
            event.threadID
        );
    }

    const cmd = args[0].toLowerCase();
    const rest = args.slice(1);

    switch (cmd) {
        case "scanface": {
            let name = event.mentions ? Object.values(event.mentions)[0] : "Unknown";
            return api.sendMessage(`🔍 Scanning face of ${name}...\n✅ 99% Match Found!\n🎯 Looks awesome!`, event.threadID);
        }
        case "lovepercent": {
            if (rest.length < 2) return api.sendMessage("❗Usage: lovepercent name1 name2", event.threadID);
            let percent = Math.floor(Math.random() * 101);
            return api.sendMessage(`💖 Love between ${rest[0]} & ${rest[1]} is ${percent}%`, event.threadID);
        }
        case "reverse": {
            if (rest.length === 0) return api.sendMessage("❗Usage: reverse text", event.threadID);
            let reversed = rest.join(" ").split("").reverse().join("");
            return api.sendMessage(`🔄 ${reversed}`, event.threadID);
        }
        case "brain": {
            let target = event.mentions ? Object.values(event.mentions)[0] : "Unknown";
            let size = Math.floor(Math.random() * 100) + 1;
            return api.sendMessage(`🧠 ${target}'s brain size is ${size} MB 🤯`, event.threadID);
        }
        case "insult": {
            let target = event.mentions ? Object.values(event.mentions)[0] : "Someone";
            const insults = [
                "তুমি এমন বোকা, Google ও তোমাকে খুঁজে পায় না 😂",
                "তোমার IQ মশার থেকেও কম 🦟",
                "তুমি এত স্লো, যে লোডিং স্ক্রিনও তোমাকে ওভারটেক করে 😏"
            ];
            let randomInsult = insults[Math.floor(Math.random() * insults.length)];
            return api.sendMessage(`🔥 ${target}, ${randomInsult}`, event.threadID);
        }
        case "autoreact": {
            if (!rest[0]) return api.sendMessage("❗Usage: autoreact on/off", event.threadID);
            let cfg = JSON.parse(fs.readFileSync(autoReactConfigPath, "utf-8"));
            if (rest[0].toLowerCase() === "on") {
                cfg.enabled = true;
                fs.writeFileSync(autoReactConfigPath, JSON.stringify(cfg, null, 2));
                return api.sendMessage("✅ AutoReact enabled!", event.threadID);
            } else if (rest[0].toLowerCase() === "off") {
                cfg.enabled = false;
                fs.writeFileSync(autoReactConfigPath, JSON.stringify(cfg, null, 2));
                return api.sendMessage("❌ AutoReact disabled!", event.threadID);
            } else {
                return api.sendMessage("❗Use on/off only.", event.threadID);
            }
        }
        case "quote": {
            const quotes = [
                "🌟 Believe in yourself!",
                "💡 Work smart, not just hard.",
                "🔥 Push harder than yesterday."
            ];
            let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            return api.sendMessage(randomQuote, event.threadID);
        }
        default:
            return api.sendMessage("❌ Unknown sub-command.", event.threadID);
    }
};
