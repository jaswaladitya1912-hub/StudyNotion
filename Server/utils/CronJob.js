const cron = require("node-cron");
const User = require("../Models/User");
const Profile = require("../Models/Profile");
cron.schedule("0 0 * * *", async () => {
    console.log("Running user deletion cron job...");
    try {
        const now = new Date();
        const usersToDelete = await User.find({
            scheduleDeletion: { $lte: now } // $lte → “less than or equal to.”  It returns all users whose scheduleDeletion date is earlier than or equal to the current time.
        });

        for (const user of usersToDelete) {  // Running loop continously 
            await Profile.findByIdAndDelete(user.additionalDetails);
            await User.findByIdAndDelete(user._id);
            console.log(`Deleted user: ${user.email}`);
        }
    } catch (error) {
        console.log(error)
    }
}
);



//      ┌───────────── minute (0 - 59)
//      │ ┌───────────── hour (0 - 23)
//      │ │ ┌───────────── day of month (1 - 31)
//      │ │ │ ┌───────────── month (1 - 12)
//      │ │ │ │ ┌───────────── day of week (0 - 6) (Sunday=0)
//      │ │ │ │ │
//      │ │ │ │ │
//      0 0 * * *
//      ↑ ↑ ↑ ↑ ↑
//      │ │ │ │ └── Every day of week
//      │ │ │ └──── Every month
//      │ │ └────── Every day of month
//      │ └──────── Hour 0 (midnight)
//      └────────── Minute 0

