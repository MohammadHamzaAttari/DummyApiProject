<template>
  <div>
    <div class="categories">
       <button @click="setFilter('smartphones')">smartphones</button>
       <button @click="setFilter('laptops')">laptops</button>
       <button @click="setFilter('groceries')">groceries</button>
       <button @click="setFilter('')">All</button>
    </div>
    <div class="product-list">
      <div class="product" v-for="product in  filteredProducts" v-bind:key="product.id">
        <span>
          <img :src="product.thumbnail" class="product-image"/>
        </span>
        <div class="product-description">
          <span class="title">{{product.title}}</span>
          <span class="description">{{product.description}}</span>
          <span class="category">Product Category: {{product.category}}</span>
        </div>
        <div class="price-buy">
          <span class="price">${{product.price}}</span>
          <span><button class="primary buy" @click="getProductId(product.id)">Buy</button></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';




export default {
  name: 'Products',
  data() {
    return {
      filter: null,
      categories:this.$store.getters.getCategories,
    };
    
  },
  created(){
    this.$store.dispatch('fetchProducts');
    this.$store.dispatch('fetchCategories')
},
  methods: {
    setFilter(filter) {
       this.filter=filter;
    },
    getProductId(productId){
        this.$store.commit('setCart',productId)
    }
  },
  computed: {
    visibleProducts() {
      return this.$store.getters.getFilteredProducts(this.filter);
    },
    ...mapGetters(['getFilteredProducts']),
    filteredProducts() {
      return this.getFilteredProducts(this.filter || '');
    },
  },
};
</script>

<style scoped>
  .categories {
    display: flex;
    justify-content: space-around;
    padding: 0 25px;
  }
  .categories button {
    width: 150px;
    height: 65px;
    font-size: 20px;
    background-color: #336699;
    color: white;
    margin: 20px 0;
    cursor: pointer;
  }
  .categories button:hover {
    color: #D6F0FC;
  }
  .product-list {
    display:flex;
    flex-direction:column;
  }
  .product:nth-child(1) {
    border-top: 2px solid #eee;
  }
  .product {
    display: flex;
    padding:25px 20px;
    border-bottom: 2px solid #ccc;
  }
  .product-image {
    width:200px;
  }
  .product-description {
    display: flex;
    flex-direction: column;
    margin-left: 25px;
  }
  .category {
    justify-self: end;
    color: #999;
  }
  .title {
    font-size: 20px;
    color: #336699;
    font-weight: bold;
    color: #555;
    margin:10px 0 5px 0;
  }
  .description {
    font-size: 16px;
    color: #555;
    margin-bottom: 15px;
    margin-right: 25px;

  }
  .price-buy {
    display: flex;
    margin-left: auto;
    flex-direction: column;
    align-items: center;
    margin-top: auto;
    margin-bottom: auto;
    padding-left: 35px;
    border-left: 1px solid #ccc;
  }
  .price {
    font-size: 25px;
    margin-bottom: 25px;
    color: #336699;
  }
  .buy {
    padding: 4px 25px;
  }
</style>
