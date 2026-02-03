print("🚀 Checking MongoDB for existing data...");

const db = connect("mongodb://db:27017/magic-stream-movies");

// Check if already seeded
const hasData =
  db.movies.estimatedDocumentCount() > 0 ||
  db.genres.estimatedDocumentCount() > 0 ||
  db.users.estimatedDocumentCount() > 0 ||
  db.rankings.estimatedDocumentCount() > 0;

if (hasData) {
  print("⚠️ Data already exists — skipping seed.");
  quit();
}

print("📌 Seeding initial database data...");

const data3 = fs.readFileSync('/seed-data/users.json', 'utf8');

// const jsonUserData = [
//     {
//         user_id: "68385b9981097c6b4042dab4",
//         first_name: "Bob",
//         last_name: "Jones",
//         email: "bobjones@hotmail.com",
//         password: "$2a$10$FAd/ArLwxQ3WbNE3XKbyveRHidTpW9g84hX2CPr0tWdGGerrP6.3K",
//         role: "ADMIN",
//         created_at: new Date("2025-05-29T13:05:29Z"),
//         updated_at: new Date("2025-08-05T10:07:15Z"),
//         token: "",
//         refresh_token: "",
//         favourite_genres: [
//             {
//                 genre_id: 1,
//                 genre_name: "Comedy"
//             },
//             {
//                 genre_id: 4,
//                 genre_name: "Fantasy"
//             }
//         ]
//     }
// ]

db.users.insertMany(JSON.parse(data3));
//db.users.insertMany(jsonUserData);

 const data1 = fs.readFileSync('/seed-data/movies.json', 'utf8');

db.movies.insertMany(JSON.parse(data1));

const data2 = fs.readFileSync('/seed-data/genres.json', 'utf8');

db.genres.insertMany(JSON.parse(data2));

const data4 = fs.readFileSync('/seed-data/rankings.json', 'utf8');

db.rankings.insertMany(JSON.parse(data4));

print("🎉 Seeding complete. Database is ready!");
