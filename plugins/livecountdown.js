const axios = require("axios");  // Ensure axios is included
const { cmd, commands } = require("../command");

cmd(
    {
        pattern: "livecountdown",
        desc: "Count down days to a specific date",
        category: "main",
        react: "⏳",
        filename: __filename,
    },

    async (
        conn,
        mek,
        m,
        {
            from,
            quoted,
            body,
            isCmd,
            command,
            args,
            q,
            isGroup,
            sender,
            senderNumber,
            botNumber2,
            botNumber,
            pushname,
            isMe,
            isOwner,
            groupMetadata,
            groupName,
            participants,
            groupAdmins,
            isBotAdmins,
            isAdmins,
            reply,
        },
    ) => {
        try {
            // Get current date and time
            const currentDate = new Date();
            const hours = currentDate.getHours(); // Get current hour

            // Determine greeting based on the updated time ranges
            let greeting = "";
            if (hours >= 0 && hours < 12) {
                greeting = "⛅️Good Morning!✨";
            } else if (hours >= 12 && hours < 18) {
                greeting = "☁️Good Afternoon!✨";
            } else {
                greeting = "🌥Good Night!✨";
            }

            // Set target date to March 1, 2025, at 23:59
            const targetDate = new Date("2025-03-01T23:59:00");

            // Calculate the difference in milliseconds
            const timeDifference = targetDate - currentDate;

            // If the date is in the past
            if (timeDifference < 0) {
                return reply(`⏳ The target date has already passed.`);
            }

            // Calculate time components
            const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hoursRemaining = Math.floor(
                (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            const weeksRemaining = Math.floor(daysRemaining / 7);
            const monthsRemaining = Math.floor(daysRemaining / 30);

            // Fetch image URL from the external JSON link
            const jsonLink = "https://exsam-countdown.pages.dev/Days/liveimage.json";  // Your JSON URL
            const { data } = await axios.get(jsonLink);
            const imageUrl = data.image || "https://i.ibb.co/98XnsZL/20241008-150032.png"; // Fallback image if none found in JSON

            // Generate the response message with greeting and countdown info
            const message = ` 
${greeting}

⏳ *🎖 2024 O/L විභාගයට තව,* ⏳

*🕒* *මාස* *:* *${monthsRemaining}*
*🕒* *සති* *:* *${weeksRemaining}*
*🕒* *දින* *:* *${daysRemaining}*
*🕒* *පැය* *:* *${hoursRemaining}*

📅 *අද* *:* *${currentDate.toISOString().split("T")[0]}*

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋᴀᴡᴅʜɪᴛʜᴀ ɴɪʀᴍᴀʟ🧑‍💻*
`;

            // Send the message with an image and caption
            await conn.sendMessage(
                from,
                {
                    image: { url: imageUrl },
                    caption: message,
                },
                { quoted: mek },
            );
        } catch (e) {
            console.log(e);
            reply(`${e}`);
        }
    },
);
