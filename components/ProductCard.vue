<template>
  <div>
    <div class="product">
      <span class="flash-sale" v-if="product.flashSale">Flash sale</span>
      <span class="new-sale" v-if="product.newProduct">New</span>
      <div class="product-img">
        <img :src="product.productImage" alt="" />
      </div>
      <div class="product-info">
        <div class="product-details">
          <p class="product-name">{{ product.productName }}</p>
          <p class="product-price">{{ product.productPrice }}</p>
        </div>
        <div class="product-btn-box">
          <button class="product-btn">
            <span v-if="product.fav">
            <i class="fa fa-heart" aria-hidden="true"></i>
            </span>
            <span v-else>
            <i class="fa fa-heart-o" aria-hidden="true"></i>
            </span>
          </button>
          <button class="product-btn">
              <span class="in" v-if="product.inShop">
              <i class="fa fa-cart-plus" aria-hidden="true"></i>
              </span>
              <span class="minus" v-else>
                  <span class="minus">-</span>
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["product"],
};
</script>