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
    userId: null,
    user: {}
    // loading: false,
})

export const mutations = {
    country(state, country) {
        state.country = country
        state.countryIsocode = country.iso_code
        state.countryName = country.name
        // state.loading = true
    },
    currency(state, country) {
        state.currency = Object.keys(country.currencies)[0]
        state.currencySymbol = country.currencies[`${Object.keys(country.currencies)[0]}`].symbol
        state.countryFlag = country.flags[0]
        // state.loading = true
    },
    currencyVal(state, currencyValue) {
        state.currencyRate = currencyValue
    },
    setUser(state, user) {
        state.user = user
            // state.loading = true
    },
    setUserId(state, userId) {
        state.userId = userId
            // state.loading = true
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
        console.log(returnValue);
        // console.log(returnValue.name.common);
        // console.log(returnValue.currencies);
        // console.log(Object.keys(returnValue.currencies));
        // console.log(Object.keys(returnValue.currencies)[0]);
        // console.log(returnValue.currencies[`${Object.keys(returnValue.currencies)[0]}`].symbol);
        // console.log(returnValue.flags[0]);
        let returnCurrency = await this.$http.$get(
            `/api/currency/${Object.keys(returnValue.currencies)[0]}`
        );
        let currencyValue = returnCurrency.id;
        console.log(currencyValue);
        commit('currency', returnValue)
        commit('currencyVal', currencyValue)
    },
    async getLocation({ commit, dispatch }) {
        const returnValue = await this.$http.$get("/api/getLocation");
        commit('country', returnValue)
        // console.log(returnValue.name);
        console.log(returnValue);
        await dispatch('getCountryInfo')
    },
    async getUser({ commit, dispatch, state }) {
      console.log(state.userId);
      const ref = this.$fire.firestore.collection("users").doc(state.userId);
      console.log(ref);
      let snap;
      try {
        snap = await ref.get();
      } catch (e) {
        // TODO: error handling
        console.error(e);
      }
      let user = snap.data().user;
      commit('setUser', user)
        console.log(state.user);
      // const newUser = {
      //   userId: userId,
      //   displayName: this.displayName,
      //   email: this.email,
      //   password: this.password,
      //   country: this.country
      // };
      // const document = {
      //   user: newUser,
      // };
      // ref.set(document);
    },
    authUser({ commit, dispatch, state }) {
        this.$fire.auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                let uid = user.uid;
                // state.uid = user.uid;
                // ...
                console.log(uid);
                commit('setUserId', uid)
                dispatch('getUser')
                // console.log(user);
                // this.isLoggedIn = true;
                // if (uid === "jl0JqEJTJrbWgY0zxO9voeHxJBS2") {
                //   this.isAdmin = true;
                // }
            } else {
                // User is signed out
                // ...
                console.log("signed out");
            }
        });
        // const auth = getAuth();
        // onAuthStateChanged(auth, (user) => {
        //   if (user) {
        //     // User is signed in, see docs for a list of available properties
        //     // https://firebase.google.com/docs/reference/js/firebase.User
        //     const uid = user.uid;
        //     console.log(user);
        //     // ...
        //   } else {
        //     // User is signed out
        //     // ...
        //     console.log("User is signed out");
        //   }
        // });
        // dispatch('authStart')
        // axios.post('/auth/employer/login', {
        //     email: authData.email,
        //     password: authData.password
        // })
        //     .then(res => {
        //         console.log(res)
        //         const user = res.data
        //         localStorage.setItem('token', user.token)
        //         localStorage.setItem('user-role', user.role)
        //         commit('authSuccess', user)
        //         router.push('/ViewJobsCompany')
        //         dispatch('authStopLoading')

        //     })
        //     .catch(err => {
        //         console.log(err.message)
        //         commit('authFail', err)
        //         commit('errMessageType', err.message)
        //         dispatch('authStopLoading')
        //     })


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
    getUser(state) {
        return state.user
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

