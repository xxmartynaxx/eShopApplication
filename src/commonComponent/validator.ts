class Validator {
    static arrayOfSizes: string[] = ["xs", "s", "m", "l", "xl"];
    static arrayOfCategories: string[] = ["tops", "bottoms", "dresses", "outerwear", "activewear"];
    static orderStatus: string[] = ["in magazine", "shipped", "delivered", "canceled"];
    static roles: string[] = ["user", "admin"];

    static isEmpty(arg: unknown): boolean {
        return typeof arg === "string" && arg.trim() === "";
    }

    static isString(arg: unknown): boolean {
        return typeof arg === "string";
    }

    static isCategoryRight(arg: string): boolean {
        return this.arrayOfCategories.includes(arg);
    }

    static isSizeRight(arg: string): boolean {
        if (!this.arrayOfSizes.includes(arg)) return false;
        return true;
    }

    static isPositiveNumber(arg: unknown): boolean {
        return typeof arg === "number" && arg >= 0;
    }

    static numberRange(arg: unknown, min: number, max: number): boolean {
        return typeof arg === "number" && arg >= min && arg <= max;
    }

    static isValidProduct(
        category: string, 
        name: string, 
        descr: string, 
        size: string, 
        price: number, 
        stock: number
    ): boolean {
        return this.isCategoryRight(category) &&
               this.isString(name) &&
               this.isString(descr) &&
               this.isSizeRight(size) &&
               this.isPositiveNumber(price) &&
               this.numberRange(stock, 1, 99);
    }

    static isEmail(arg: unknown): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return typeof arg === "string" && emailRegex.test(arg);
    }

    static isLengthRight(arg: string): boolean {
        return this.isString(arg) && arg.length >= 6 && arg.length <= 20;
    }

    static isRoleRight(arg: string): boolean {
        return this.roles.includes(arg);
    }
}

export default Validator;
