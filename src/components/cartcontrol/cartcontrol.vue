<template>
  <div class="cartcontrol">
    <transition name="deletefade">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="deleteFoodCount">
        <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="text" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add" @click="addFoodCount">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addFoodCount(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$store.dispatch('add_foodscount', this.food);
        // this.$store.dispatch('set_activeball', event.target);
      },
      deleteFoodCount() {
        if (!event._constructed) {
          return;
        }
        this.food.count--;
        if (this.food.count === 0) {
          this.$store.dispatch('delete_foodscount', this.food);
        }
      }
    },
    computed: {
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      // opacity: 1
      // transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        font-size: 24px
        line-height: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.deletefade-enter-active, &.deletefade-leave-active
        transition: all 0.4s linear
      &.deletefade-enter, &.deletefade-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-add
      display: inline-block
      padding: 6px
      .icon-add_circle
        font-size: 24px
        color: rgb(0, 160, 220)
        line-height: 24px
    .text
      display: inline-block
      vertical-align: top
      padding-top: 6px
      line-height: 24px
      width: 12px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)

</style>
