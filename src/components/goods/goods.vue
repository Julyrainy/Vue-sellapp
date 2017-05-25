<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{currentItem: index === currentIndex}" @click="currentChange(index, $event)">
          <span class="text border-1px"><span v-if="item.type > 0" :class="classMap[item.type]" class="icon"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook" >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="showFoodDetail(food, $event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span v-if="food.rating">好评率{{food.rating}}%</span>
                </div>
                <p class="price">
                  <span class="nowPrice"><em class="rmb">￥</em>{{food.price}}</span>
                  <span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </p>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart></shopcart>
    <food ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import food from '../food/food.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  const ERR_OK = 0;
  export default {
    data() {
       return {
         listHeight: [],
         scrollY: 0
       };
    },
    computed: {
      goods() {
          return this.$store.state.goods;
      },
      // 计算当前食物栏滚动的Y坐标位于哪个类别区间
      currentIndex() {
          for (let i = 0; i < this.listHeight.length; i++) {
              let high = this.listHeight[i + 1];
              let low = this.listHeight[i];
              if (!high || (this.scrollY >= low && this.scrollY < high)) {
                  return i;
              }
          }
          return 0;
      }
    },
    methods: {
      // 初始化scroll条
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3 // 可以获取到滚动的坐标
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      // 计算每个大分类在食物栏里所占用的高度区间
      _calculateHeight() {
        let height = 0;
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      // 点击菜单分类栏直接跳转
      currentChange(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      // 显示食物详情
      showFoodDetail(item, event) {
        if (!event._constructed) {
          return;
        }
        this.$store.dispatch('set_activefood', item);
        this.$refs.food.show();
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'guarantee', 'invoice'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
            this.$store.state.goods = response.data;
            this.$nextTick(() => {
                this._initScroll();
                this._calculateHeight();
            });
        }
      });
    },
    components: {
        shopcart,
        cartcontrol,
        food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display:flex
    position:absolute
    top: 176px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        vertical-align: middle
        padding: 0 12px
        height: 54px
        &.currentItem
          border-left: 2px solid red
          background: #ffffff
          .text
            font-weight: 700
        .text
          display: table-cell
          width: 56px
          border-1px(rgba(7, 17, 27, 0.1))
          vertical-align: middle
          font-size: 12px
          line-height: 14px
          .icon
            position: relative
            top: 2px
            display: inline-block
            margin-right: 2px
            width: 12px
            height: 12px
            background-size: 12px 12px
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.special
              bg-image('special_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
    .foods-wrapper
      flex: 1
      .food-list
        .title
          padding-left:14px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: rgb(147, 153, 159)
          line-height: 26px
          background-color: #f3f5f7
        .food-item
          position: relative
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px: rgba(7, 17, 27, 0.1)
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            flex: 1
            margin-top: 2px
            .name
              margin-bottom: 8px
              font-size: 14px
              color: rgb(7, 17, 27)
            .description, .extra
              font-size: 10px
              color: rgb(147, 153, 159)
            .description
              margin-bottom: 8px
            .extra
              margin-bottom: 4px
              .sellCount
                margin-right: 12px
            .price
              font-size: 0
              font-weight: 700
              line-height: 24px
              .nowPrice
                margin-right: 8px
                font-size: 14px
                color: rgb(239, 19, 21)
                .rmb
                  font-size: 10px
                  font-weight: normal
                  font-style: normal
              .oldPrice
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 22px

</style>
