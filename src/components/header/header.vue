<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img alt="avatar" width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score" class="star-inside"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>

          <ul class="supports" v-if="seller.supports">
            <li v-for="supportItem in seller.supports" class="support-item">
              <span class="icon" :class="classMap[supportItem.type]"></span>
              <span class="text">{{supportItem.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">{{seller.bulletin}}</div>


        </div>
      </div>
      <div class="detail-close" @click="detailShow = false">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';

  export default {
    data() {
        return {
            detailShow: false
        };
    },
    components: {
        star
    },
    computed: {
      seller() {
        return this.$store.state.seller;
      }
    },
    methods: {
      showDetail() {
          this.detailShow = true;
      }
    },
    created() {
      // 不在data中写的似乎就是静态变量
      this.classMap = ['decrease', 'discount', 'special', 'guarantee', 'invoice'];
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    position:relative
    color: #fff
    background-color: rgba(7, 17, 27, 0.5)
    overflow: hidden
    .content-wrapper
      position: relative
      padding: 24px 0 18px 24px
      font-size:0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        // line-height: 24px
        font-size: 14px
        .title
          margin:2px 0 8px 0
          .brand
            display: inline-block
            width: 30px
            height: 18px
            bg-image('brand')
            background-size:30px 18px
          .name
            font-size: 16px
            color: rgb(255, 255, 255)
            line-height: 18px
            font-weight: bold
            vertical-align: top
        .description
          margin-bottom: 10px
          font-size: 12px
          color: rgb(255,255,255)
        .supports
          .icon
            display: inline-block
            width: 12px
            height: 12px
            background-size:12px 12px;
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.special
              bg-image('special_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
          .text
            display: inline-block
            vertical-align: top
            font-size: 10px
            color: rgb(255,255,255)
            line-height: 12px

      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background:rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          line-height: 24px
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      // width:100%
      position: relative
      height:28px
      padding:0 22px 0 12px
      line-height: 28px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background-color: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        margin: 0 4px
        font-size: 10px
        vertical-align: top
      .icon-keyboard_arrow_right
        position: absolute
        top: 8px
        right: 12px
        font-size: 10px


    .background
      position:absolute
      top:0
      left:0
      width: 100%
      z-index: -1
      filter: blur(10px)

    .detail
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background-color: rgba(7, 17, 27, 0.8)
      z-index: 100
      backdrop-filter: blur(10px)
      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            justify-content: center
            .line
              flex: 1
              position: relative
              bottom: 7px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 12px 0 12px
              font-size: 14px
              font-weight:700
          .name
            margin: 0
            font-size: 16px
            font-weight: 700
            text-align: center
          .star-wrapper
            margin-top: 16px
            padding: 2px 0
            text-align: center
          .supports
            box-sizing: border-box
            width: 80%
            padding: 0 0 0 12px
            margin:0 auto
            padding-bottom: 4px
            font-size: 0
            .support-item
              margin-bottom: 12px
              list-style: none
              .icon
                display: inline-block
                width: 16px
                height: 16px
                margin-right: 6px
                background-size: 16px 16px
                vertical-align: top
                &.decrease
                  bg-image('decrease_1')
                &.discount
                  bg-image('discount_1')
                &.special
                  bg-image('special_1')
                &.guarantee
                  bg-image('guarantee_1')
                &.invoice
                  bg-image('invoice_1')
              .text
                display: inline-block
                position: relative
                top: 3px
                font-size: 12px
                vertical-align: top
          .bulletin
            box-sizing: border-box
            width: 80%
            padding: 0 12px
            margin: 0 auto
            font-size: 12px
            line-height: 24px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 9px auto
        font-size: 32px
        // clear: both // 这玩意到底干嘛的

  .fade-enter-active
  .fade-leave-active
    transition: all .5s

  .fade-enter
  .fade-leave-active
    opacity: 0
    background: rgba(7, 17, 27, 0)

</style>
