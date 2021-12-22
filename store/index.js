// import axios from 'axios'
// import { createStore } from 'vuex'
// import router from '../router'
// import f/
// import { getAuth, onAuthStateChanged } from "firebase/auth";


export const state = () => ({
    country: null,
    countryName: null,
    countryIsocode: null,
    countryFlag: null,
    currency: null,
    currencyRate: null,
    currencySymbol: null,
    products: [],
    visibleProductArr: [],
    cartItems: [],
    cartProducts: [],
    wishItems: [],
    wishItemsArray: [],
    isLoggedIn: false,
    isAdmin: false,
    userId: null,
    user: {}
    // loading: false,
})

export const mutations = {
    // loading(state, isLoading) {
    // state.loading = isLoading
    // },
    country(state, country) {
        state.country = country
        state.countryIsocode = country.iso_code
        state.countryName = country.name
    },
    currency(state, country) {
        state.currency = Object.keys(country.currencies)[0]
        state.currencySymbol = country.currencies[`${Object.keys(country.currencies)[0]}`].symbol
        state.countryFlag = country.flags[0]
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
    },
    updateCartProducts(state, cartItems) {
        state.cartProducts = cartItems
    },
    updateProducts(state, products) {
        state.products = products
    },
    updateProductsPage(state, visibleProducts) {
        state.visibleProductArr = visibleProducts
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
        //   const ip = await this.$http.$get('https://icanhazip.com')
        // console.log('returnValue');
        // console.log(state.countryName);
        const returnValue = await this.$http.$get(`/api/getCountryInfo/${state.countryIsocode}`);
        // console.log(returnValue);
        // console.log(returnValue.name.common);
        // console.log(returnValue.currencies);
        // console.log(Object.keys(returnValue.currencies));
        // console.log(Object.keys(returnValue.currencies)[0]);
        // console.log(returnValue.currencies[`${Object.keys(returnValue.currencies)[0]}`].symbol);
        // console.log(returnValue.flags[0]);
        alert(JSON.stringify(returnValue))
        let returnCurrency = await this.$http.$get(
            `/api/currency/${Object.keys(returnValue.currencies)[0]}`
        );
        let currencyValue = returnCurrency.id;
        alert(currencyValue);
        // console.log(currencyValue);
        commit('currency', returnValue)
        commit('currencyVal', currencyValue)
    },
    async getLocation({ commit, dispatch }) {
        const returnValue = await this.$http.$get("/api/getLocation");
        commit('country', returnValue);
        alert(JSON.stringify(returnValue))
        // console.log(returnValue.name);
        // console.log(returnValue);
        await dispatch('getCountryInfo')
    },
    logout({ commit, dispatch, state }) {
        this.$fire.auth
            .signOut()
            .then(() => {
                // Sign-out successful.
                // this.isLoggedIn = false;

                commit('logoutState', false)
            })
            .catch((error) => {
                // An error happened.
            });
    },
    async getProducts({ commit, dispatch, state }) {
        const ref = this.$fire.firestore.collection("products").doc("product");
        let snap;
        try {
            snap = await ref.get();
        } catch (e) {
            // TODO: error handling
            console.error(e);
        }
        let allProducts = snap.data().products;
        commit('updateProducts', allProducts);
        dispatch('getPageProducts', 0);
        //   state.cartItems.forEach((cartItem) => {
        //     this.products.forEach((prod) => {
        //       if (prod.productId === cartItem.id) {
        //         this.cartProducts.push(prod);
        //       }
        //     });
        //   });
        //   this.getTotalPrice();
        //   this.visibleProduct();
        //   console.log(this.cartProducts);
    },
    getPageProducts({ commit, dispatch, state }, page) {
        // dispatch('getProducts');
        let visibleProductArr = [];
        let perPage = 15;
        // console.log(state.products);
        // console.log(page);
        visibleProductArr = state.products.slice(
            page * perPage,
            page * perPage + perPage
        );
        // console.log(visibleProductArr);
        commit('updateProductsPage', visibleProductArr);
    },
    getCartProducts({ commit, dispatch, state }) {
        // dispatch('getProducts');
        let cartProducts = [];
        state.cartItems.forEach((cartItem) => {
            state.products.forEach((prod) => {
                if (prod.productId === cartItem.id) {
                    cartProducts.push(prod);
                }
            });
        });
        // console.log(cartProducts);
        commit('updateCartProducts', cartProducts);
    },
    getWishProducts({ commit, dispatch, state }) {
        // dispatch('getProducts');
        let wishProducts = [];
        // state.wishItems.forEach((wishItem) => {
        state.products.forEach((prod) => {
            if (state.wishItems.includes(prod.productId)) {
                //   this.products.push(product);
                wishProducts.push(prod);
            }
            // if (prod.productId === wishItem.id) {
            // }
        });
        // });
        //   this.allProducts.forEach((product) => {
        //     if (this.favList.includes(product.productId)) {
        //       this.products.push(product);
        //     }
        //   });
        // console.log(state.wishItems);
        // console.log(wishProducts);
        // return wishProducts;
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
            //   console.log(favList);
        } else {
            favList.push(productId);
            //   console.log(favList);
        }
        const editUser = {
            userId: state.user.userId,
            displayName: state.user.displayName,
            email: state.user.email,
            country: state.user.country,
            cart: state.user.cart,
            fav: favList,
        };
        // fav: [],
        dispatch('updateUser', editUser);
    },
    updateCartProducts({ commit, dispatch, state }, newItem) {
        let cartList = [];
        state.cartItems.forEach((cartItem) => {
            cartList.push(cartItem);
        });
        // console.log(cartList);
        //   console.log(newItem);
        let isFound = false;
        let found;
        cartList.forEach((cartItem) => {
            if (cartItem.id === newItem.id) {
                // console.log("lolo");
                found = cartList.indexOf(cartItem);
                isFound = true;
            }
        });
        if (isFound) {
            cartList.splice(found, 1);
            //   console.log(cartList);
        } else {
            cartList.push(newItem);
            //   console.log(cartList);
        }
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
    },
    updateUser({ commit, dispatch, state }, newUser) {
        const ref = this.$fire.firestore.collection("users").doc(state.userId);
        // commit('setUser', user);
        const document = {
            user: newUser,
        };
        ref.set(document);
        dispatch('getUser');
    },
    async getUser({ commit, dispatch, state }) {
        //   console.log(state.userId);
        const ref = this.$fire.firestore.collection("users").doc(state.userId);
        // console.log(this.$fire.firestore.collection("users"));
        // console.log(ref);
        let snap;
        try {
            snap = await ref.get();
        } catch (e) {
            // TODO: error handling
            console.error(e);
        }
        let user = snap.data().user;
        if (user.role === "admin") {
            commit('adminState', true)
            //   this.isAdmin = true;
        }
        commit('setUser', user);
        let cartList = [];
        state.user.cart.forEach((cartItem) => {
            cartList.push(cartItem);
        });
        let wishList = [];
        // console.log(state.user.fav);
        state.user.fav.forEach((listItem) => {
            wishList.push(listItem);
        });
        // console.log(wishList);
        // console.log(cartList);
        commit('updateCart', cartList);
        commit('updateWishlist', wishList);
        dispatch('getCartProducts');
        dispatch('getWishProducts');
    },
    authUser({ commit, dispatch, state }) {
        dispatch('getProducts');
        this.$fire.auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                let uid = user.uid;
                // state.uid = user.uid;
                // ...
                // console.log(uid);
                commit('setUserId', uid);
                dispatch('getUser');
                // console.log(user);
                // this.isLoggedIn = true;
                commit('logoutState', true);
                // if (uid === "EGb3fizva6OhlFQETY78HPykmpz2") {
                // if (user.role === "admin") {
                //     commit('adminState', true)
                //     //   this.isAdmin = true;
                // }
            } else {
                // User is signed out
                // ...
                console.log("signed out");
            }
        });
    },
    // storeStudentUser(type, studentUserData) {
    //     localStorage.setItem('token', studentUserData.token)
    //     localStorage.setItem('user-role', studentUserData.role)
    // },
    // authStopLoading({ commit }) {
    //     commit('authStopLoading')
    // },
    // onTryAutoSignup: ({ dispatch }) => {
    //     dispatch('authCheckState')
    //     console.log('working')
    // },
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

