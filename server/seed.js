import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const showSchema = new mongoose.Schema({
  movieTitle: String,
  showTime: String,
  showDate: String,
  seats: Array
});

const Show = mongoose.model("Show", showSchema);

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    await Show.deleteMany();

    const shows = [];

    const movies = [
      "Avengers",
      "Pushpa",
      "KGF",
      "RRR",
      "Jawan",
      "Pathaan",
      "Dangal",
      "Animal"
    ];

    const times = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      for (let movie of movies) {
        for (let time of times) {
          shows.push({
            movieTitle: movie,
            showTime: time,
            showDate: date.toDateString(),
            seats: Array(50).fill("available")
          });
        }
      }
    }

    await Show.insertMany(shows);

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();