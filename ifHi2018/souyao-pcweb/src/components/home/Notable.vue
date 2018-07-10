<template>
  <div>
    <Carousel
      loop
      v-model="value"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow"
      :easing="setting.easing"
    >
      <CarouselItem>
        <div class="demo-carousel">1</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel" style="background-color: pink;">2</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel" style="background-color: gold;">3</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel" style="background-color: green;">4</div>
      </CarouselItem>
    </Carousel>
    <!--楼层-->

  </div>
</template>

<script>


  export default {
    name: 'Notable',
    data: () =>({
      value: 0, // 幻灯片的索引
      setting: {
        autoplay: true, // 是否自动切换
        height: '', // 走马灯的高度，可填 auto 或具体高度数值，单位 px
        autoplaySpeed: 5000, // 自动切换的时间间隔，单位为毫秒
        dots: 'inside', // 指示器的位置，可选值为 inside （内部），outside（外部），none（不显示）
        radiusDot: false, // 是否显示圆形指示器
        trigger: 'click', // 指示器的触发方式，可选值为 click（点击），hover（悬停）
        arrow: 'hover', // 切换箭头的显示时机，可选值为 hover（悬停），always（一直显示），never（不显示）
        easing: 'ease'  // 动画效果，默认（ease）
      }
    }),
    components: {

    },
    mounted() {
      console.log();
    },

  }
</script>

<style lang="less" scoped>
  .demo-carousel {
    height: 420px;
    line-height: 420px;
    text-align: center;
    background-color: skyblue;
  }

</style>
