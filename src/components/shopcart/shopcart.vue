<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="showList">
        <div class="logo-wrapper">
          <div class="logo" :class="{hllogo: totalCount > 0}">
            <i class="icon-shopping_cart" :class="{hlicon: totalCount > 0 }"></i> <!--完全不懂为什么要包这么多层-->
          </div>
          <div class="number" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{hltext: totalPrice > 0 }">￥{{totalPrice}}</div>
        <div class="decr">另需配送费￥{{seller.deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{enough: restPrice.type === 2}">
        <div class="pay">
          <span v-if="restPrice.type === 0">￥{{seller.minPrice}}元起送</span>
          <span v-else-if="restPrice.type === 1">还差￥{{restPrice.restnum}}元起送</span>
          <span v-else class="tobuy">去购买</span>
        </div>
      </div>
    </div>
    <!--
      <div class="ball-container">
          <div v-for="ball in balls">
            <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
              <div class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
              </div>
            </transition>
          </div>
      </div>
      -->
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <div class="empty" @click="emptyFood">清空</div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li v-for="food in foodSelect" class="list-item border-1px">
              <span class="name">{{food.name}}</span>
              <div class="price"><span>￥{{food.price * food.count}}</span></div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="setmask">
      <div class="mask" v-show="listShow" @click="listShow = !listShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import BScroll from 'better-scroll';
  export default {
      data() {
          return {
              balls: [
                {show: false},
                {show: false},
                {show: false},
                {show: false},
                {show: false}
              ],
              listShow: false
              // activeAdd: {},
              // dropBalls: []
          };
      },
      computed: {
        seller() {
          return this.$store.state.seller;
        },
        foodSelect() {
          return this.$store.state.selectFoods;
        },
        totalPrice() {
          let total = 0;
          this.foodSelect.forEach((item) => {
            total += item.price * item.count;
          });
          return total;
        },
        totalCount() {
          let count = 0;
          this.foodSelect.forEach((item) => {
            count += item.count;
          });
          return count;
        },
        restPrice() {
          let nowPrice = this.totalPrice;
          let minPrice = this.seller.minPrice;
          if (nowPrice === 0) { // 若当前购物车内没有东西
             return {type: 0, restnum: 0};
          } else if (nowPrice < minPrice) { // 若当前购物车内价格不足起送价
             return {type: 1, restnum: (minPrice - nowPrice)};
          } else { // 若当前购物车内价格足够起送价
            return {type: 2, restnum: 0};
          }
        }
      },
      methods: {
        _initScroll() {
          this.scroll = new BScroll(this.$refs.listContent, {
            click: true
          });
       },
        showList() {
          if (this.totalCount === 0) {
            return;
          }
          this.listShow = !this.listShow;
          if (this.listShow) {
            this.$nextTick(() => {
              if (!this.scroll) {
                this._initScroll();
              } else {
                this.scroll.refresh();
              }
            });
          }
        },
        emptyFood() {
          console.log('haha');
          this.$store.dispatch('empty_selectfoods');
          this.listShow = !this.listShow;
        }
      },

      components: {
          cartcontrol
      }
      /*
      watch: {
          activeAdd(val) {
            for (let i = 0; i < this.balls.length; i++) {
              let ball = this.balls[i];
              if (!ball.show) {
                ball.show = true;
                ball.el = val;
                this.dropBalls.push(ball);
                return;
              }
            }
          }
      },
      mounted() {
          this.activeAdd = this.$store.state.ballActive;
          console.log(this.activeAdd);
      },
      */

    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .shopcart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      background: #141d27
      height: 48px
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 18px
          width: 56px
          height: 56px
          padding: 6px
          border-radius: 50%
          box-sizing: border-box
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.hllogo
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.hlicon
                color: rgb(255, 255, 255)
          .number
            position: absolute
            top: 0
            left: 32px
            width: 12px
            height: 16px
            padding: 0 6px
            background: red
            border-radius: 12px
            font-size: 9px
            font-weight: 700
            text-align: center
            color: rgb(255, 255, 255)
            line-height: 16px
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          font-size: 16px
          line-height: 24px
          vertical-align: top
          margin-top: 12px
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          color: rgba(255, 255, 255, 0.4)
          &.hltext
            color: rgb(255, 255, 255)
        .decr
          display: inline-block
          margin: 12px 0 0 12px
          font-size: 10px
          line-height: 24px
          vertical-align: top
          color: rgba(255, 255, 255, 0.4)
          font-weight: 700
      .content-right
        flex: 0 0 105px
        width: 105px
        background: rgb(39, 45, 52)
        &.enough
          background: #00b43c
        .pay
          font-size: 12px
          line-height: 48px
          text-align: center
          color: rgba(255, 255, 255, 0.4)
          .tobuy
            color: rgb(255, 255, 255)
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      width: 100%
      z-index: -1
      transform: translate3d(0, -100%, 0)
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all .4s
      .list-header
        height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          line-height: 40px
          font-weight: 200
          color: rgb(7, 17 ,27)
        .empty
          float: right
          font-size: 12px
          line-height: 40px
          font-weight: 200
          color: rgb(0, 160 ,220)
      .list-content
        max-height: 217px
        padding: 0 18px
        overflow: hidden
        background: #fff
        .list-item
          height: 24px
          padding: 12px 0
          marign: 0 18px
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            float: left
            font-size: 14px
            color: rgb(7, 17, 27)
            line-height: 24px
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
          .price
            position: absolute
            right: 90px
            bottom: 12px
            font-size: 14px
            font-weight: 700
            line-height: 24px
            color: rgb(240, 20, 20)
    .mask
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -2
      backdrop-filter: blur(10px)
      background: rgba(7, 17, 27, 0.6)
      &.setmask-enter, &.setmask-leave-active
        opacity: 0
      &.setmask-enter-active, &.setmask-leave-active
        transition: all .4s

    /*.ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200px
      .inner
        width: 16px
        height:16px
        border-radius: 50%
        background: rgb(0, 160, 220)
     */

</style>
