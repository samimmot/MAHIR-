const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');

module.exports.config = {
    name: 'autosent',
    version: '10.0.1',
    hasPermssion: 0,
    credits: 'Shahadat Islam',
    description: 'Automatically sends messages at scheduled times (BD Time)',
    commandCategory: 'group messenger',
    usages: '[]',
    cooldowns: 3
};

const messages = [
    { time: '12:00 AM', message: 'এখন সময় রাত 12:00 AM ⏳\nAPKO KIYA NIND NEHI ATA  Bby Good Night 😴💤❤️', special: null },
    { time: '1:00 AM', message: 'এখন সময় রাত 1:00 AM ⏳\nBOHOT LOK SO GAYA AP BHI SO JAW AB!😾😴🛌', special: null },
    { time: '2:00 AM', message: 'এখন সময় রাত 2:00 AM ⏳\nABHI TAK JAG RAHE HO AP. LEKIN KIU YAAR?😤👊💤', special: null },
    { time: '3:00 AM', message: 'এখন সময় রাত 3:00 AM ⏳\nZISAN BBY AP SO GAYA ? MUJHE AKELA BOHOT DAR LAG RAHE HAIN?🙄🌃🛌', special: null },
    { time: '4:00 AM', message: 'এখন সময় ভোর 4:00 AM ⏳\nKUCH DER KE BAAT FAJAR KE AJAN HOGI। 🕌🕋🕓', special: null },
    { time: '5:00 AM', message: 'এখন সময় ভোর 5:00 AM ⏳\nFAJAR KE AJAN HO GAYE, KIYA AP NE NAMAJ PARLIYA~ 🕌✨🤲💖', special: null },
    { time: '6:00 AM', message: 'এখন সময় সকাল 6:00 AM ⏳\nASSALAMUALAIKUM Good Morning Bby! ABHI UTTH JAW 🌅💖😳', special: null },
    { time: '7:00 AM', message: 'এখন সময় সকাল 7:00 AM ⏳\nNIND KATI NEHI AP FIR MOBILE UTHA LIYA HATH MEIN!🛌➡️📱', special: null },
    { time: '8:00 AM', message: 'এখন সময় সকাল 8:00 AM ⏳\nARE AB TO MOBILE RAKHO OR FRESH HO JAW!📱🪥🍽️', special: null },
    { time: '9:00 AM', message: 'এখন সময় সকাল 9:00 AM ⏳\nBby, BREAKFAST KAR LIYA APP NE?🍳🥞💖', special: null },
    { time: '10:00 AM', message: 'এখন সময় সকাল 10:00 AM ⏳\nBBY, APP ABHI TAK COLLEGE NEHI GAYE? 😜📚🙄', special: null },
    { time: '11:00 AM', message: 'এখন সময় সকাল 11:00 AM ⏳\nZISAN BOOS KIYA KAR RAHI HAIN AP!🙄📱💼', special: null },
    { time: '12:00 PM', message: 'এখন সময় দুপুর 12:00 PM ⏳\nLO DUPAHER HO GAYE! 🌞🙌🌸', special: null },
    { time: '1:00 PM', message: 'এখন সময় দুপুর 1:00 PM ⏳\nAB MOBILE RAKHO OR NAHA LO FIR JOHOR KE NAMAJ PARLO😻❣️🥰', special: null },
    { time: '2:00 PM', message: 'এখন সময় দুপুর 2:00 PM ⏳\nNAMAJ TO LAG TAHE PARLIYA AB KHANA KHA LO FIR SO JAW🔪🛁🍽️', special: null },
    { time: '3:00 PM', message: 'এখন সময় বিকেল 3:00 PM ⏳\nBOSS, ZISAN APKE BINA NIND NEHI ATIHAIN….!😴💔🌙', special: null },
    { time: '4:00 PM', message: 'এখন সময় বিকেল 4:00 PM ⏳\nVAI LOG AJ BOHOT GARMI THA BAHAR MEIN! 🥵🌞💦', special: null },
    { time: '5:00 PM', message: 'এখন সময় বিকেল 5:00 PM ⏳\nLAGTAHE ASOR KA AJAN HO GAYE FRESH HO KAR NAMAJ PARLO! 😅🕒🙂', special: null },
    { time: '6:00 PM', message: 'এখন সময় সন্ধ্যা 6:00 PM ⏳\nGood Evening Everyone! MAGRIB KI AJAN HO GAYE TO SAB LOG NAMAJ PARLO! 🌆👐💦', special: null },
    { time: '7:00 PM', message: 'এখন সময় সন্ধ্যা 7:00 PM ⏳\nAB THORA SA STUDY KARLO?😏📚🤔', special: null },
    { time: '8:00 PM', message: 'এখন সময় রাত 8:00 PM ⏳\nPARNE KI WAQT PAR BHI MOBILE USE KARNE HOGI...!🫰🤬🔥', special: null },
    { time: '9:00 PM', message: 'এখন সময় রাত 9:00 PM ⏳\nBOHOT HO GAYE PARAI AB DINNER KARLO JAW...!😘🍽️❤️', special: null },
    { time: '10:00 PM', message: 'এখন সময় রাত 10:00 PM ⏳\nBBY AB THORA SA MOBILE USE KARLO AP..!😜📱😾', special: null },
    { time: '11:00 PM', message: 'এখন সময় রাত 11:00 PM ⏳\nBOHOT RAT HO GAYE SONE JAWGI KAB TAQ HAAN...?😑🤬', special: null }
];

module.exports.onLoad = ({ api }) => {
    console.log(chalk.bold.hex("#00c300")("============ AUTOSENT COMMAND LOADED (BD TIME) ============"));

    messages.forEach(({ time, message }) => {
        const [hour, minute, period] = time.split(/[: ]/);
        let hour24 = parseInt(hour, 10);
        if (period === 'PM' && hour !== '12') {
            hour24 += 12;
        } else if (period === 'AM' && hour === '12') {
            hour24 = 0;
        }

        const rule = new schedule.RecurrenceRule();
        rule.tz = 'Basanti/Kalkata';
        rule.hour = hour24;
        rule.minute = parseInt(minute, 10);

        schedule.scheduleJob(rule, () => {
            if (!global.data?.allThreadID) return;
            global.data.allThreadID.forEach(threadID => {
                api.sendMessage(message, threadID, (error) => {
                    if (error) {
                        console.error(`Failed to send message to ${threadID}:`, error);
                    }
                });
            });
        });

        console.log(chalk.hex("#00FFFF")(`Scheduled (BDT): ${time} => ${message}`));
    });
};

module.exports.run = () => {
    // Main logic is in onLoad
};
