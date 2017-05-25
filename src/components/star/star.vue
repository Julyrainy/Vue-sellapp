<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';

  export default {
      props: {
        size: {
          type: Number
        },
        score: {
          type: Number
        }
      },
      computed: {
        starType() {
            return 'star' + this.size;
        },
        // 将数字评分转化为给星星的数目，四舍五半入，入4.8，最终也是4颗半星
        itemClasses() {
            let items = [];
            const score = Math.floor(this.score * 2) / 2;
            const hasDecimal = score % 1 !== 0;
            const integer = Math.floor(score);
            for (let i = 0; i < integer; i++) {
              items.push(CLS_ON);
            }
            if (hasDecimal) {
                items.push(CLS_HALF);
            }
            while (items.length < LENGTH) {
                items.push(CLS_OFF);
            }
            return items;
        }

      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .star
    font-size: 0
    .star-item
      display: inline-block;
      background-repeat: no-repeat
      &:last-child
        margin-right: 0
    &.star24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &.on
          bg-image('star24_on')
        &.off
          bg-image('star24_off')
        &.half
          bg-image('star24_half')
    &.star36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &.on
          bg-image('star36_on')
        &.off
          bg-image('star36_off')
        &.half
          bg-image('star36_half')
    &.star48
      .star-item
        width: 30px
        height: 30px
        margin-right: 22px
        background-size: 30px 30px
        &.on
          bg-image('star48_on')
        &.off
          bg-image('star48_off')
        &.half
          bg-image('star48_half')

</style>
