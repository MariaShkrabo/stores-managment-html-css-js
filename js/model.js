/**
 * Model class. Knows everything about API endpoint and data structure. Can format/map data to any structure.
 *
 * @constructor
 */
export function Model(){
    /**
	 * URL template for getting the stores from server.
	 * @type {string}
	 */
    var STORES_URL            = "http://localhost:3000/api/Stores";
    /**
	 * URL template for getting all products from server.
	 * @type {string}
	 */
    var PRODUCTS_URL          = "http://localhost:3000/api/Products";
    /**
	 * URL template for getting the store products from server.
	 * @type {string}
	 */
    var STORE_PRODUCTS_URL    = PRODUCTS_URL + "?filter=%7B%22where%22%3A%7B%22StoreId%22%3A%20{StoreId}%7D%7D";
    /**
	 * URL template for getting filtered products from server.
	 * @type {string}
	 */
    var FILTERED_PRODUCTS_URL = PRODUCTS_URL + "?filter=%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22Status%22%3A%22{Status}%22%7D%2C%7B%22StoreId%22%3A{StoreId}%7D%5D%7D%7D";

    /**
	 * Fetch stores.
	 *
	 * @returns {Promise} the promise object will be resolved once the Stores object gets loaded/failed.
	 *
	 * @public
	 */
    this.getStores = function(){
        return (fetch(STORES_URL))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                    throw err;
            });
    }

    /**
	 * Fetch products of the store.
	 *
     * @param {number} StoreId store id.
     * 
	 * @returns {Promise} the promise object will be resolved once the Products object gets loaded/failed.
	 *
	 * @public
	 */
    this.getProducts = function(StoreId){       
        return (fetch(STORE_PRODUCTS_URL.replace("{StoreId}", StoreId)))
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                    throw err;
            });
    }

    /**
	 * Fetch products.
	 *
     * @param {number} StoreId store id.
     * @param {string} Status filtration status of products.
     * 
	 * @returns {Promise} the promise object will be resolved once the Products object gets loaded/failed.
	 *
	 * @public
	 */
    this.getFilteredProducts = function(StoreId, Status){
        return (fetch(FILTERED_PRODUCTS_URL.replace("{StoreId}", StoreId).replace("{Status}", Status)))
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
                throw err;
        });
    }

    /**
	 * Create store.
	 *
     * @param {Object} data store parameters.
     * 
	 * @returns {Promise} the promise object will be resolved once the Store object gets loaded/failed.
	 *
	 * @public
	 */
    this.createStore = function(data) {
        try{
            return (fetch(STORES_URL, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data),
            }));
        }
        catch(err){
            throw err;
        };	
    }

    /**
	 * Create product.
	 *
     * @param {Object} data product parameters.
     * 
	 * @returns {Promise} the promise object will be resolved once the Product object gets loaded/failed.
	 *
	 * @public
	 */
    this.createProduct = function(data){
        try{
            return (fetch(PRODUCTS_URL, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data),
            }));
        }
        catch(err){
            throw err;
        };	
    }

    /**
	 * Delete store.
	 *
     * @param {Object} data product parameters.
     * 
	 * @returns {Promise} the promise object will be resolved once the Product object gets loaded/failed.
	 *
	 * @public
	 */
    this.deleteStore = function(id){
        return (fetch(`${STORES_URL}/${id}`, {
            method: "DELETE",
        }))
        .catch((err) => {
            throw err;
        });
    }

    /**
	 * Convert date into readable form.
	 *
     * @param {string} element the value of the "Established" property.
     * 
	 * @returns {string} readable date form.
	 *
	 * @public
	 */
    this.convertDate = function(element) {
        return new Date(element).toLocaleString("en-US",{month: "short", day: "numeric", year: "numeric"})
    }

    /**
	 * Sort products.
	 *
     * @param {number} id store id.
     * @param {string} sortBy the name of the column property by which the sorting occurs.
     * @param {string} sortDirection sort direction (decreasing / increasing)s.
     * 
	 * @returns {Promise} the promise object will be resolved once the Product object gets loaded/failed.
	 *
	 * @public
	 */
    this.sortProducts = function(id, sortBy, sortDirection) {
        return (fetch(`${STORES_URL}/${id}/rel_Products?filter[order]=${sortBy} ${sortDirection}`))
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
                throw err;
        });
    }

    /**
	 * Delete product.
	 *
     * @param {number} id product id.
     * 
	 * @returns {Promise} the promise object will be resolved once the Product object gets loaded/failed.
	 *
	 * @public
	 */
    this.deleteProduct = function(id) {
        return (fetch(PRODUCTS_URL + `/${id}`, {
            method: "DELETE",
        }))
        .catch((err) => {
                throw err;
        });
    }

    /**
	 * Edit product.
	 *
     * @param {Object} data product parameters.
     * 
	 * @returns {Promise} the promise object will be resolved once the Product object gets loaded/failed.
	 *
	 * @public
	 */
    this.editProduct = function(data) {
        try{
            return (fetch(PRODUCTS_URL, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data),
            }));
        }
        catch(err){
            throw err;
        };	
    }

}