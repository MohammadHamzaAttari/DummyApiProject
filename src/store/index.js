import { createStore } from 'vuex'
import filterProducts from '../products/filter-products'
import axios from 'axios'
const store = createStore({
    state() {
        return {
            user: null,
            categories: null,
            products: null,
            cart:[]
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setProducts(state, products) {
            state.products = products;
        },
        setCategories(state, categories) {
            state.categories = categories;
        },
        setCart(state,products){
            state.cart.push(state.products.find(product=>product.id==products))
            console.log('returned from state',state.cart)
        },
        removeCarts(state,cartId){
              state.cart=state.cart.filter(cart=>cart.id!==cartId)
        }
    },
    getters: {
        getFilteredProducts(state) {
            return (filter) => filterProducts(filter, state.products);
        },
        getCategories(state) {
            return state.categories;
        },
        getCarts(state){
            return state.cart;
        }
    },
    actions: {
        fetchProducts({ commit }) {
            axios.get("https://dummyjson.com/products").then(result => commit('setProducts', result.data.products))
        },
        fetchCategories({ commit }) {
            axios.get("https://dummyjson.com/products/categories")
                .then(result => commit('setCategories', result.data.categories))
                .catch(error => console.error(error));
        },
        signIn({ commit }, user) {
            axios.post('https://dummyjson.com/auth/login',
                user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    commit('setUser', response.data)
                })
        }
    }
})

export default store;