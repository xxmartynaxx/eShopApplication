import { Router } from "express";
import { UserService } from "../../application/userService";

const router = Router();
const userService = new UserService();

// GET: Strona logowania
router.get('/login', (req, res) => {
    res.render('login', { title: 'Logowanie' });
});

// GET: Strona rejestracji
router.get('/register', (req, res) => {
    res.render('register', { title: 'Rejestracja' });
});

// POST: Logowanie użytkownika
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const result = await userService.logIn(email, password, role);

        if (result.success) {
            // Przekierowanie na stronę główną po zalogowaniu
            res.redirect('/home');
        } else {
            // Przekierowanie z powrotem do logowania z komunikatem
            res.render('login', { title: 'Logowanie', errorMessage: result.message });
        }
    } catch (error) {
        console.error("Error during login route:", error);
        res.status(500).render('login', { title: 'Logowanie', errorMessage: "Internal server error" });
    }
});

// POST: Rejestracja nowego użytkownika
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await userService.createNewUserAccount(email, password);

        if (result.success) {
            // Przekierowanie do logowania po rejestracji
            res.redirect('/api/users/login');
        } else {
            // Przekierowanie z powrotem do rejestracji z komunikatem
            res.render('register', { title: 'Rejestracja', errorMessage: result.message });
        }
    } catch (error) {
        console.error("Error during registration route:", error);
        res.status(500).render('register', { title: 'Rejestracja', errorMessage: "Internal server error" });
    }
});

export default router;
