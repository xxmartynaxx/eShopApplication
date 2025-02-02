import { insertData } from "./infrastructure/database/insertData.js";
import { Database } from "./infrastructure/database/databaseConnection.js";
import express from "express";
import path from 'path';
import routes from "./userInterface/routes/index.js";
import cookieParser from "cookie-parser";


const app = express();
const PORT = 3000;

// Middleware do obsługi ciasteczek
app.use(cookieParser());

// Middleware do obsługi danych formularzy
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ustawienie EJS jako silnika widoków
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'userInterface', 'views'));

// Ładowanie tras 
app.use('/', routes);

// Strona główna
app.get('/home', (req, res) => {
    res.render('home', { title: 'HomePage' });
});

// Uruchomienie serwera
(async function main() {
    try {
        // Opcjonalne: wstawienie danych testowych do bazy
        // await insertData();
        // console.log("\nTest data has been inserted.");
        
        console.log("\nInitializing the database...");
        await Database.initialize();
        console.log("\nDatabase initialized.");

        // Start serwera
        app.listen(PORT, () => {
            console.log(`\nServer is running on http://localhost:${PORT}`);
        });

        // Wywołanie po zamknięciu (opcjonalne)
        process.on('SIGINT', async () => {
            console.log("\nClosing database connection...");
            await Database.destroy();
            console.log("\nDatabase connection closed.");
            process.exit(0);
        });
    } catch (error) {
        console.error("Error during application initialization:", error);
    }
})();
