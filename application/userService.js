import { UserRepoInfr } from "../infrastructure/repositories/userRepositoryInfrastructure";
import Validator from "../commonComponent/validator";

export class UserService {
    constructor() {
        this.userRepository = new UserRepoInfr();
    }

    // arg przechwytywane z http?
    async logIn(email, password, role) {
        try {
            // jeśli błędne dane to powinna się wyświetlić opcja do ponownego zalogowania
        } 
        
        catch (error) {
            
        }
    } 

    async logOut() { 
        // będzie wyświetlać stronę główną dla niezalogowanych użytkowników
    }

    async createNewUserAccount(email, password) {
        try {
            // szukamy usera po emailu, jak nie ma to wywołujemy create...
            // jak jest to info że już istnieje i niech się łaskawie zaloguje
        } 
        
        catch (error) {

        }
    }
}