import { NavbarController } from "./components/NavbarController";
import { ContentController } from "./components/ContentController";

import { JSONConverterController } from "./helpers/JSONConverterController";

export class AppController {
    constructor() {
        // Helpers
        this.jsonConverter = new JSONConverterController(this);

        // Setup project
        this.init();

        // Load components
        this.navbar = new NavbarController(this);
        this.content = new ContentController(this);
    }

    init() {
        // Set global enums
        this.enums = {
            "pages": {
                WAREHOUSE: 'warehouse',
                PRODUCTS: 'products'
            },
            "categories": {
                FRILLS: 'frill',
                DECORATION: 'decoration',
                CLOTHING: 'clothing'
            }
        };

        // Set navigation menu items
        this.menuItems = [
            { page: this.enums.pages.WAREHOUSE, title: "Magazijn" },
            { page: this.enums.pages.PRODUCTS, title: "Producten" },
        ]

        // Save products to localstorage (if not already present)
        if (localStorage.getItem("products") == null) {
            const data = require('../storage/products.json');
            const products = this.jsonConverter.convertJSON(data);

            this.setProducts(products);
        }
    }

    getProducts() {
        return this.jsonConverter.convertJSON(JSON.parse(localStorage.getItem("products")));
    }

    setProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    switchPage(page) {
        this.content.switchContent(page);
    }
}