import { Router } from "express";
import { UserService } from "../../application/userService.js";

const router = Router();
const userService = new UserService(); 

// GET /users – Renderowanie strony głównej użytkownika
router.get('/', (req, res) => {
    res.render('layouts/user', { title: 'User Home' });
});


// GET /users/login – Renderowanie formularza logowania
router.get('/login', (req, res) => {
    res.render('userViews/login', { title: 'Login', error: null });
});

// POST /users/login – Obsługa formularza logowania
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body; // Pobieramy dane z formularza
    const response = await userService.logIn(email, password, role);

    if (response.success) {
        if (role == "user") {
            res.redirect('/users');
        }
        if (role == "admin") {
            res.redirect('/admin');
        }

    } else {
        res.render('userViews/login', { title: 'Login', error: response.message });
    }
});


// GET /users/register – Renderowanie formularza rejestracji
router.get('/register', (req, res) => {
    res.render('userViews/register', { title: 'Register', error: null });
});

// POST /users/register – Obsługa formularza rejestracji
router.post('/register', async (req, res) => {
    const { email, password } = req.body; // Pobieramy dane z formularza
    const response = await userService.createNewUserAccount(email, password);

    if (response.success) {
        res.redirect('/users/login');
    } else {
        res.render('userViews/register', { title: 'Register', error: response.message });
    }
});


// GET /users/logout – Obsługa wylogowania
router.get('/logout', (req, res) => {
    res.redirect('/');
});

export { router as userRoutes };
