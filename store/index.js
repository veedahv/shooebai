
// import router from '../router'
import currencySymbol from 'currency-symbol';


export const state = () => ({
    country: null,
    countryName: null,
    countryIsocode: null,
    countryFlag: null,
    currency: null,
    currencyRate: null,
    currencySymbol: null,
    products: [],
    filterProducts: [],
    visibleProductArr: [],
    cartItems: [],
    cartProducts: [],
    wishItems: [],
    wishItemsArray: [],
    isLoggedIn: false,
    isAdmin: false,
    userId: null,
    loading: false,
    user: {},
    pageData: {page: 0, query: ''}
})
// pageData: {}

export const mutations = {
    loading(state, isLoading) {
        state.loading = isLoading
    },
    country(state, country) {
        state.country = country;
        state.countryFlag = country.iso_code.toLowerCase();
        state.countryIsocode = country.iso_code;
        state.countryName = country.name;
        // state.currencySymbol = currencySymbol.symbol(country.name);
        // console.log(state.currencySymbol);
    },
    currency(state, country) {
        state.currency = Object.keys(country.currencies)[0];
    },
    setCurrencySymbol(state, currencySymbol) {
        // state.currencySymbol = currencySymbol.symbol(country.name);
        state.currencySymbol = currencySymbol;
        // state.currencySymbol = Object.keys(currencySymbol.currencies)[0].symbol;
    },
    currencyVal(state, currencyValue) {
        state.currencyRate = currencyValue
    },
    setUser(state, user) {
        state.user = user
    },
    setUserId(state, userId) {
        state.userId = userId
    },
    adminState(state, isAdmin) {
        state.isAdmin = isAdmin
    },
    updateWishlist(state, wishItems) {
        state.wishItems = wishItems
    },
    updateWishlistArray(state, wishItems) {
        state.wishItemsArray = wishItems
    },
    updateCart(state, cartItems) {
        state.cartItems = cartItems
        // console.log(state.cartItems);
    },
    updateCartProducts(state, cartItems) {
        state.cartProducts = cartItems
    },
    updateProducts(state, products) {
        state.products = products
        state.loading = false
    },
    updateFilterProducts(state, filterProducts) {
        // console.log(filterProducts);
        // state.visibleProductArr = visibleProducts
        state.filterProducts = filterProducts
    },
    updateProductsPage(state, visibleProducts) {
        state.visibleProductArr = visibleProducts
        // console.log(filterProducts);
        // state.filterProducts = filterProducts
    },
    updatePerPage(state, data) {
        state.perPage = data;
    },
    logoutState(state, isLoggedIn) {
        state.isLoggedIn = isLoggedIn
    },
    // authStart(state) {
    //     state.error = null,
    //         state.loading = true
    // },
    // authStopLoading(state) {
    //     state.loading = false
    // },
}

export const actions = {
    async getCountryInfo({ commit, state }) {
        const returnValue = await this.$http.$get(`https://restcountries.com/v3/alpha/${state.countryIsocode}?fields=name,capital,currencies,flags`);
        // let returnCurrency = await this.$http.$get(
        //     `/api/currency/${Object.keys(returnValue.currencies)[0]}`
        // );
        // let currencyValue = returnCurrency.id;
        // commit('currency', returnValue)
        // commit('currencyVal', currencyValue)
        console.log(returnValue);
        console.log(returnValue.currencies[(Object.keys(returnValue.currencies)[0])].symbol);
        commit('setCurrencySymbol', returnValue.currencies[(Object.keys(returnValue.currencies)[0])].symbol)
    },
    async getLocation({ commit, dispatch }) {
        let response = await this.$http.$get(
            "https://api.geoapify.com/v1/ipinfo?&apiKey=2a1bb31c0a134533b5261eae06c6d2e6"
        );
        let location = response.country;
        // const countryValue = await this.$http.$get(`https://restcountries.com/v3/alpha/${state.countryIsocode}?fields=name,capital,currencies,flags`);
        console.log(location);
        const ref = this.$fire.firestore.collection("ExchangeRates").doc("AllRates");
        let snap;
        try {
            snap = await ref.get();
        } catch (e) {
            // TODO: error handling
            console.error(e);
        }
        let allRates = snap.data().currencyRates.rates;
        let currencyValue = (allRates.NGN) / (allRates[`${location.currency.substring(0, 3)}`]);
        console.log(allRates.NGN);
        console.log(allRates);
        console.log(allRates[`${location.currency.substring(0, 3)}`]);
        console.log(currencyValue);
        console.log(location.currency);
        commit('currencyVal', currencyValue);
        commit('country', location);
        dispatch('getCountryInfo');
        },
    logout({ commit, dispatch, state }) {
        this.$fire.auth
            .signOut()
            .then(() => {
                // Sign-out successful.
                commit('logoutState', false);
                let cartList = [];
                let wishList = [];
                localStorage.removeItem("cartList");
                localStorage.removeItem("favList");
                commit('updateCart', cartList);
                commit('updateWishlist', wishList);
                // console.log(this.$route.path);
                // console.log(this.$route);
                // console.log(this.$nuxt.$options.router);
                // this.$nuxt.$options.router.push(link);
            })
            .catch((error) => {
                // An error happened.
            });
    },
    startLoading({ commit }) {
        commit('loading', true);
    },
    finishLoading({ commit }) {
        commit('loading', false);
    },
    async getProducts({ commit, dispatch, state }) {
        commit('loading', true);
        const ref = this.$fire.firestore.collection("products").doc("product");
        let snap;
        try {
            snap = await ref.get();
        } catch (e) {
            // TODO: error handling
            console.error(e);
        }
        let allProducts = snap.data().products;
        await commit('updateProducts', allProducts);
        console.log(state.perPage);
        // dispatch('getPageProducts', state.pageData);
        dispatch('getPageProducts', 0);
        commit('loading', false);
    },
    getPageProducts({ commit, dispatch, state }, page) {
        // dispatch('getProducts');
        let visibleProductArr = [];
        let filterProductsArr = [];
        let perPage = 15;
        // console.log(data.page);
        // console.log(data.query);
        // if (data) {
        //     // console.log(data);            
        //     commit('updatePerPage', data);
        // } else {
        //     // console.log(state.perPage);  
        //     data = state.perPage;          
        // }
        // state.products.forEach(product => {
        //     // console.log(product.tags);
        //     console.log(data.query);
        //     if (data.query) {
        //         // console.log(product);
        //         product.tags.forEach(tag => {
        //             if (tag.toLowerCase().includes(data.query.toLowerCase())) {
        //                 console.log(tag);
        //                 filterProductsArr.push(product);
                        
        //             }
        //             // tag.toLowerCase().includes(data.query.toLowerCase());
        //         });
        //     } else {
        //         filterProductsArr.push(product);

        //     }
        // });
        // console.log(filterProductsArr);
        // filterProductsArr = state.products.slice(
        //     page * perPage,
        //     page * perPage + perPage
        // );
        visibleProductArr = state.products.slice(
            page * perPage,
            page * perPage + perPage
        );
        // commit('updateProductsPage', visibleProductArr, filterProductsArr);
        commit('updateProductsPage', visibleProductArr);
        commit('updateFilterProducts', filterProductsArr);
    },
    async getCartProducts({ commit, dispatch, state }) {
                let cartProducts = [];
                state.cartItems.forEach((cartItem) => {
            state.products.forEach((prod) => {
                if (prod.productId === cartItem.id) {
                    prod.sizeSet = cartItem.sizeSet;
                    prod.colorSet = cartItem.colorSet;
                    prod.qty = cartItem.qty;
                    cartProducts.push(prod);
                }
            });
        });
        commit('updateCartProducts', cartProducts);
    },
    getWishProducts({ commit, state }) {
        let wishProducts = [];
        state.products.forEach((prod) => {
            if (state.wishItems.includes(prod.productId)) {
                wishProducts.push(prod);
            }
        });
        commit('updateWishlistArray', wishProducts);
    },
    updateWishProducts({ commit, dispatch, state }, productId) {
        let favList = [];
        state.wishItems.forEach(item => {
            favList.push(item);
        });
        if (favList.includes(productId)) {
            let found = favList.indexOf(productId);
            favList.splice(found, 1);
        } else {
            favList.push(productId);
        }
        if (state.logoutState) {
            const editUser = {
                userId: state.user.userId,
                displayName: state.user.displayName,
                email: state.user.email,
                country: state.user.country,
                cart: state.user.cart,
                fav: favList,
            };
            dispatch('updateUser', editUser);
        } else {
            localStorage.setItem("favList", JSON.stringify(favList));
            commit('updateWishlist', favList);
            dispatch('getWishProducts');
        }
    },
    updateCartProducts({ commit, dispatch, state }, newItem) {
        let cartList = [];
        state.cartItems.forEach((cartItem) => {
            cartList.push(cartItem);
        });
        let isFound = false;
        let found;
        cartList.forEach((cartItem) => {
            if (cartItem.id === newItem.id) {
                found = cartList.indexOf(cartItem);
                isFound = true;
            }
        });
        if (isFound) {
            cartList.splice(found, 1);
        } else {
            cartList.push(newItem);
        }
        if (state.logoutState) {
            const editUser = {
                userId: state.user.userId,
                displayName: state.user.displayName,
                role: state.user.role,
                email: state.user.email,
                country: state.user.country,
                cart: cartList,
                fav: state.user.fav,
            };
            dispatch('updateUser', editUser);
        } else {
            localStorage.setItem("cartList", JSON.stringify(cartList));
            commit('updateCart', cartList);
            dispatch('getCartProducts');
        }
    },
    updateCartItems({ commit, dispatch, state }, newItem) {
        let cartList = [];
        state.cartItems.forEach((cartItem) => {
            cartList.push(cartItem);
        });
        let isFound = false;
        let found;
        cartList.forEach((cartItem) => {
            if (cartItem.id === newItem.id) {
                found = cartList.indexOf(cartItem);
                isFound = true;
            }
        });
        if (isFound) {
            cartList.splice(found, 1, newItem);
        }
        if (state.logoutState) {
            const editUser = {
                userId: state.user.userId,
                displayName: state.user.displayName,
                role: state.user.role,
                email: state.user.email,
                country: state.user.country,
                cart: cartList,
                fav: state.user.fav,
            };
            dispatch('updateUser', editUser);
        } else {
            localStorage.setItem("cartList", JSON.stringify(cartList));
            commit('updateCart', cartList);
            dispatch('getCartProducts');
        }
    },
    updateUser({ dispatch, state }, newUser) {
        const ref = this.$fire.firestore.collection("users").doc(state.userId);
        const document = {
            user: newUser,
        };
        ref.set(document);
        dispatch('getUser');
    },
    async getUser({ commit, dispatch, state }) {
        const ref = this.$fire.firestore.collection("users").doc(state.userId);
        let snap;
        try {
            snap = await ref.get();
        } catch (e) {
            // TODO: error handling
            console.error(e);
        }
        let user = snap.data().user;
        if (user.role === "admin") {
            commit('adminState', true);
        }
        commit('setUser', user);
        let cartList = [];
        state.user.cart.forEach((cartItem) => {
            cartList.push(cartItem);
        });
        if (localStorage.getItem("cartList")) {
            let list = JSON.parse(localStorage.getItem("cartList"));
            list.forEach((element) => {
                cartList.push(element);
            });
            localStorage.removeItem("cartList");
        }
        let wishList = [];
        state.user.fav.forEach((listItem) => {
            wishList.push(listItem);
        });
        if (localStorage.getItem("favList")) {
            let list = JSON.parse(localStorage.getItem("favList"));
            // let favList;
            list.forEach((element) => {
                wishList.push(element);
            });
            // localStorage.setItem("favList", JSON.stringify(favList));
            localStorage.removeItem("favList");
        }
        commit('updateCart', cartList);
        commit('updateWishlist', wishList);
        dispatch('getCartProducts');
    },
    async authUser({ commit, dispatch, state }) {
        dispatch('getProducts');
        this.$fire.auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                let uid = user.uid;
                commit('setUserId', uid);
                dispatch('getUser');
                commit('logoutState', true);
                // }
            } else {
                // User is signed out
                // ...
                // console.log("signed out");
                if (localStorage.getItem("favList")) {
                    let list = JSON.parse(localStorage.getItem("favList"));
                    let favList = [];
                    list.forEach((element) => {
                        favList.push(element);
                    });
                    localStorage.setItem("favList", JSON.stringify(favList));
                    commit('updateWishlist', favList);
                    dispatch('getWishProducts');
                }
                if (localStorage.getItem("cartList")) {
                    let list = JSON.parse(localStorage.getItem("cartList"));
                    let cartList = [];
                    list.forEach((element) => {
                        cartList.push(element);
                    });
                    localStorage.setItem("cartList", JSON.stringify(cartList));
                    commit('updateCart', cartList);
                    dispatch('getCartProducts');
                }
            }
        });
    },
}

export const getters = {
    getAdminState(state) {
        return state.isAdmin
    },
    getUser(state) {
        return state.user
    },
    getProducts(state) {
        return state.products
    },
    getCartItems(state) {
        return state.cartItems
    },
    getCartProducts(state) {
        let cartProducts = [];
        state.cartItems.forEach((cartItem) => {
            state.products.forEach((prod) => {
                if (prod.productId === cartItem.id) {
                    cartProducts.push(prod);
                }
            });
        });
        console.log(cartProducts);
        return cartProducts;
    },
    getCountryName(state) {
        return state.countryName
    },
    getCountryFlag(state) {
        return state.countryFlag
    },
    getCurrency(state) {
        return state.currency
    },
    getCurrencySymbol(state) {
        return state.currencySymbol
    },
    getCurrencyRate(state) {
        console.log(state.currencyRate);
        return state.currencyRate
    }
}

