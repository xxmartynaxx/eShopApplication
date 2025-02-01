import { Database } from "./infrastructure/database/databaseConnection.js";
import express from "express";
import routes from "./userInterface/routes";
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
app.set('views', './userInterface/views');
// Ładowanie tras 
app.use('/', routes);
// Strona główna
app.get('/home', (req, res) => {
    res.render('home', { title: 'Strona Główna' });
});
// Uruchomienie serwera
(async function main() {
    try {
        console.log("Inicjalizacja bazy danych...");
        await Database.initialize();
        console.log("Baza danych zainicjalizowana.");
        // Opcjonalne: wstawienie danych testowych do bazy
        // await insertData();
        // console.log("Dane testowe zostały wstawione.");
        // Start serwera
        app.listen(PORT, () => {
            console.log(`Serwer działa na http://localhost:${PORT}`);
        });
        // Wywołanie po zamknięciu (opcjonalne)
        process.on('SIGINT', async () => {
            console.log("Zamykanie połączenia z bazą danych...");
            await Database.destroy();
            console.log("Połączenie z bazą danych zamknięte.");
            process.exit(0);
        });
    }
    catch (error) {
        console.error("Błąd podczas inicjalizacji aplikacji:", error);
    }
})();
