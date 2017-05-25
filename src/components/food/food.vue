<template>
  <transition name="fade-in">
    <div v-show="showFlag" class="food">
      {{selectFood.name}}
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
      data () {
          return {
              showFlag: false
          };
      },
      computed: {
          selectFood() {
              return this.$store.state.foodDetail;
          }
      },
      methods: {
          show() {
              this.showFlag = true;
          }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    width: 100%
    z-index: 30
    background: #fff
    &.fade-in-enter,&.fade-in-leave-active
      transform: translate3d(100%,0,0)
    &.fade-in-enter-active,&.fade-in-leave-active
      transition: all 0.4s
</style>
