class Validator {
    static arrayOfSizes = ["xs", "s", "m", "l", "xl"];
    static arrayOfCategories = ["tops", "bottoms", "dresses", "outerwear", "activewear"];
    static orderStatus = ["in magazine", "shipped", "delivered", "canceled"];
    static roles = ["user", "admin"];

    static isEmpty(arg) {
        return typeof arg === "string" && arg.trim() === "";
    }

    static isString(arg) {
        return typeof arg === "string";
    }

    static isCategoryRight(arg) {
        return this.arrayOfCategories.includes(arg);
    }

    // arg to tablica stringów, np. ["xs", "m"]
    static isSizeRight(arg) {
        for (let size of arg) {
            if (!this.arrayOfSizes.includes(size)) return false;
        }
        return true;
    }

    static isPositiveNumber(arg) {
        return typeof arg === "number" && arg >= 0;
    }

    static numberRange(arg, min, max) {
        return this.isNumber(arg) && arg >= min && arg <= max;
    }

    static isValidProduct(category, name, descr, sizes, price, stock) {
        return this.isCategoryRight(category) &&
               this.isString(name) &&
               this.isString(descr) &&
               this.isSizeRight(sizes) &&
               this.isPositiveNumber(price) &&
               this.numberRange(stock, 1, 99);
    }

    static isEmail(arg) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return typeof arg === "string" && emailRegex.test(arg);
    }

    static isLengthRight(arg) {
        return this.isString(arg) && arg.length >= 6 && arg.length <= 15;
    }
}

export default Validator;