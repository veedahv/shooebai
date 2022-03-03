// import axios from 'axios'
// import { createStore } from 'vuex'
// import router from '../router'
// import f/
// import { getAuth, onAuthStateChanged } from "firebase/auth";
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
    visibleProductArr: [],
    cartItems: [],
    cartProducts: [],
    wishItems: [],
    wishItemsArray: [],
    isLoggedIn: false,
    isAdmin: false,
    userId: null,
    loading: false,
    user: {}
})

export const mutations = {
    loading(state, isLoading) {
        state.loading = isLoading
    },
    country(state, country) {
        console.log(country);
        state.country = country
        console.log(state.country);
        // state.countryFlag = country.flag.toLowerCase()
        state.countryFlag = country.iso_code.toLowerCase()
        console.log(state.countryFlag);
        state.countryIsocode = country.iso_code
        state.countryName = country.name
        // state.currencySymbol = document.createElement('span').innerHTML toHtml(currencySymbol.symbol(country.name));
        state.currencySymbol = currencySymbol.symbol(country.name);
        console.log(state.currencySymbol);
    },
    currency(state, country) {
        state.currency = Object.keys(country.currencies)[0]
        // state.currencySymbol = country.currencies[`${Object.keys(country.currencies)[0]}`].symbol
        // state.countryFlag = country.flags[0]
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
        console.log(state.cartItems);
    },
    updateCartProducts(state, cartItems) {
        state.cartProducts = cartItems
    },
    updateProducts(state, products) {
        state.products = products
        state.loading = false
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
        // const returnValue = await this.$http.$get(`/api/getCountryInfo/${state.countryIsocode}`);
        const returnValue = await this.$http.$get(`https://restcountries.com/v3/alpha/${state.countryIsocode}?fields=name,capital,currencies,flags`);
        console.log(returnValue);
        // console.log(returnValue.name.common);
        // console.log(returnValue.currencies);
        // console.log(Object.keys(returnValue.currencies));
        // console.log(Object.keys(returnValue.currencies)[0]);
        // console.log(returnValue.currencies[`${Object.keys(returnValue.currencies)[0]}`].symbol);
        // console.log(returnValue.flags[0]);
        // alert(JSON.stringify(returnValue))
        let returnCurrency = await this.$http.$get(
            `/api/currency/${Object.keys(returnValue.currencies)[0]}`
        );
        let currencyValue = returnCurrency.id;
        // alert(currencyValue);
        console.log(currencyValue);
        commit('currency', returnValue)
        commit('currencyVal', currencyValue)
    },
    async getLocation({ commit, dispatch }) {
        // alert('get location')
        // alert(state.countryName);
        // let response = await axios.get(
        let response = await this.$http.$get(
            "https://api.geoapify.com/v1/ipinfo?&apiKey=2a1bb31c0a134533b5261eae06c6d2e6"
        );
        console.log(response);

        // console.log(currencySymbol.all());
        // This will return all curriencies symbol

        // let result = await response.data;
        let location = response.country;
        console.log(location);
        console.log(location.flag);
        console.log(currencySymbol.symbol(location.name));
        // console.log(response);
        // let returnCurrency = await this.$http.$get(
        //     `/api/currency/${location.currency}`
        // );
        // let currencyValue = returnCurrency.id;
        let currencyValue = 1;
        commit('currencyVal', currencyValue)
        // console.log(result);
        // console.log(location);
        // const returnValue = await this.$http.$get("/api/getLocation");
        // alert(state.countryName);
        // alert(JSON.stringify(returnValue))
        // commit('country', returnValue);
        commit('country', location);
        console.log(state.countryFlag);
        // alert(state.countryName);
        // console.log(returnValue.name);
        // console.log(returnValue);
        // await dispatch('getCountryInfo')
    },
    logout({ commit, dispatch, state }) {
        this.$fire.auth
            .signOut()
            .then(() => {
                // Sign-out successful.
                // this.isLoggedIn = false;

                commit('logoutState', false);
                let cartList = [];
                let wishList = [];
                localStorage.removeItem("cartList");
                localStorage.removeItem("favList");
                // console.log(wishList);
                // console.log(cartList);
                commit('updateCart', cartList);
                commit('updateWishlist', wishList);
            })
            .catch((error) => {
                // An error happened.
            });
    },
    startLoading({ commit }) {
        // if (process.browser) {
        //     console.log(window.$nuxt);
        //     console.log(window.$nuxt.$root);
        //     console.log(window.$nuxt.$root.$root);
        //     console.log(window.$nuxt.$loading);
        //     console.log(window.$nuxt.$root.$loading.start);
        //     // window.$nuxt.$root.$loading.start;
        //     // window.$nuxt.$root.$loading.start();
        //     // window.$nuxt.$root.$loading.manual = true;
        //     console.log(window.$nuxt.$root.$loading);
        //     // window.$root.$loading.start();
        // }
        commit('loading', true);
    },
    finishLoading({ commit }) {
        // if (process.browser) {
        //     // window.$nuxt.$root.$loading.finish();
        //     console.log(window.$nuxt.$root.$loading);
        //     // window.$nuxt.$root.$loading.manual = false;
        //     console.log(window.$nuxt.$root.$loading);
        // }
        commit('loading', false);
    },
    async getProducts({ commit, dispatch, state }) {
        // console.log('saii');
        commit('loading', true);
        // window.$nuxt.$root.$loading.start();
        // dispatch('startLoading');
        const ref = this.$fire.firestore.collection("products").doc("product");
        let snap;
        try {
            snap = await ref.get();
        } catch (e) {
            // TODO: error handling
            console.error(e);
        }
        let allProducts = snap.data().products;
        // console.log(allProducts);
        await commit('updateProducts', allProducts);
        // console.log('sayaa');
        dispatch('getPageProducts', 0);
        commit('loading', false);
        // dispatch('getCartProducts');
        // dispatch('getWishProducts');
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
    // getLocalCartList({ commit, dispatch, state }) {
    //     // dispatch('getProducts');

    //     if (localStorage.getItem("favList")) {
    //         let list = JSON.parse(localStorage.getItem("favList"));
    //         let favList;
    //         list.forEach((element) => {
    //             favList.push(element);
    //         });
    //         localStorage.setItem("favList", JSON.stringify(favList));
    //     }
    //     if (localStorage.getItem("cartList")) {
    //         let list = JSON.parse(localStorage.getItem("cartList"));
    //         let cartList;
    //         list.forEach((element) => {
    //             cartList.push(element);
    //         });
    //         localStorage.setItem("cartList", JSON.stringify(cartList));
    //     }
    //     let cartList = [];
    //     state.user.cart.forEach((cartItem) => {
    //         cartList.push(cartItem);
    //     });
    //     let wishList = [];
    //     // console.log(state.user.fav);
    //     state.user.fav.forEach((listItem) => {
    //         wishList.push(listItem);
    //     });
    //     // console.log(wishList);
    //     // console.log(cartList);
    //     commit('updateCart', cartList);
    //     commit('updateWishlist', wishList);
    //     dispatch('getCartProducts');
    //     dispatch('getWishProducts');
    //     // let cartProducts = [];
    //     // state.cartItems.forEach((cartItem) => {
    //     //     state.products.forEach((prod) => {
    //     //         if (prod.productId === cartItem.id) {
    //     //             // let product = prod;
    //     //             // product.sizeSet = cartItem.sizeSet;
    //     //             // product.colorSet = cartItem.colorSet;
    //     //             // product.qty = cartItem.qty;
    //     //             prod.sizeSet = cartItem.sizeSet;
    //     //             prod.colorSet = cartItem.colorSet;
    //     //             prod.qty = cartItem.qty;
    //     //             cartProducts.push(prod);
    //     //             // console.log(prod);
    //     //             // console.log(product);
    //     //         }
    //     //     });
    //     // });
    //     // console.log(cartProducts);
    //     // commit('updateCartProducts', cartProducts);
    // },
    async getCartProducts({ commit, dispatch, state }) {
        // dispatch('getProducts');
        // console.log(state.cartItems);
        // console.log(state.products);
        // if (state.products.length <= 0) {
        //     // console.log('say ahh');
        //     await dispatch('getProducts');
        // } else {
        //     console.log('say na nahh');
        // }
        let cartProducts = [];
        console.log(state.cartItems);
        state.cartItems.forEach((cartItem) => {
            // console.log(cartItem.id);
            state.products.forEach((prod) => {
                // console.log(prod.productId );
                if (prod.productId === cartItem.id) {
                    // let product = prod;
                    // product.sizeSet = cartItem.sizeSet;
                    // product.colorSet = cartItem.colorSet;
                    // product.qty = cartItem.qty;
                    // console.log(prod.productId );
                    prod.sizeSet = cartItem.sizeSet;
                    prod.colorSet = cartItem.colorSet;
                    prod.qty = cartItem.qty;
                    cartProducts.push(prod);
                    // console.log(prod);
                    // console.log(product);
                }
            });
        });
        // console.log(cartProducts);
        // if (cartProducts.length >= 1) {
        // }
        commit('updateCartProducts', cartProducts);
        console.log(state.cartProducts);
    },
    getWishProducts({ commit, dispatch, state }) {
        // dispatch('getProducts');
        let wishProducts = [];
        // state.wishItems.forEach((wishItem) => {
        // console.log(state.wishItems);
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
        if (state.logoutState) {
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
        // console.log(cartList);
        //   console.log(newItem);
        let isFound = false;
        let found;
        cartList.forEach((cartItem) => {
            if (cartItem.id === newItem.id) {
                // console.log("lolo");
                found = cartList.indexOf(cartItem);
                isFound = true;
                // card.sizeSet = item.s
                // cartItem.sizeSet = newItem.sizeSet;
                // cartItem.colorSet = newItem.colorSet;
                // cartItem.qty = newItem.qty;
                // console.log(newItem);
                // console.log(cartItem);
            }
        });
        if (isFound) {
            cartList.splice(found, 1, newItem);
            // console.log(cartList);
        }
        // if (isFound) {
        //     cartList.splice(found, 1);
        //     //   console.log(cartList);
        // } else {
        //     cartList.push(newItem);
        //     //   console.log(cartList);
        // }
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
        console.log(state.user);
        let cartList = [];
        state.user.cart.forEach((cartItem) => {
            cartList.push(cartItem);
        });
        console.log(state.user.cart);
        if (localStorage.getItem("cartList")) {
            let list = JSON.parse(localStorage.getItem("cartList"));
            // let cartList;
            list.forEach((element) => {
                cartList.push(element);
            });
            // localStorage.setItem("cartList", JSON.stringify(cartList));
            localStorage.removeItem("cartList");
        }
        let wishList = [];
        // console.log(state.user.fav);
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
        // console.log(wishList);
        // console.log(cartList);
        console.log(cartList);
        commit('updateCart', cartList);
        commit('updateWishlist', wishList);
        dispatch('getCartProducts');
        // dispatch('getWishProducts');
    },
    async authUser({ commit, dispatch, state }) {
        dispatch('getProducts');
        // console.log(state.products);
        // let response = await this.$http.$get(
        //     'http://localhost:3001/users'
        // );
        // console.log(response);
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
                if (localStorage.getItem("favList")) {
                    let list = JSON.parse(localStorage.getItem("favList"));
                    let favList = [];
                    list.forEach((element) => {
                        favList.push(element);
                    });
                    localStorage.setItem("favList", JSON.stringify(favList));
                    // dispatch('getProducts');
                    // console.log(state.products);
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
                    // dispatch('getProducts');
                    // console.log(state.products);
                    commit('updateCart', cartList);
                    dispatch('getCartProducts');
                }
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

