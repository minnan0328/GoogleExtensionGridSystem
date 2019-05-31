<template>
  <div id="app" class="grid-box" v-show="toggle">
    <div class="grid-container">
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
    data () {
    return {
      toggle: false,
    }
  },
  components: {},
  methods: {
    switchView: function(callback){
      // document.getElementsByTagName("body")[0].appendChild("app");
      this.toggle = !this.toggle;
      if(callback && typeof callback == 'function'){
        callback();
      }
    },
  },
  mounted: function(){
    var _this = this;

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      console.log(message, sender, sendResponse)
      _this.switchView.call(_this, function(){
        sendResponse("操作完成")
      });
    });

  }
};
</script>

<style lang="sass">
body
  margin: 0
  padding: 0
  border: 0
  .grid-box
    width: 100vw
    height: 100vh
    display: flex
    position: fixed
    justify-content: center
    top: 0
    z-index: 1000
    .grid-container
      display: grid
      grid-template-columns: repeat(12, 1fr)
      // grid-template-rows: 25% 100px auto
      height: 100vh
      width: 940px
      margin: 0 auto
      padding: 0 10px
      grid-gap: 20px
      position: fixed
      .grid-item
        border: 1px dashed rgba(0,0,0,0.5)
        // background-color: #999

  @media (max-width: 768px)
    body
      .grid-box
        .grid-container
            width: 764px
            margin: 0 auto
            padding: 0 2px
            grid-gap: 4px

  @media (max-width: 320px)
    body
      .grid-box
        .grid-container
            width: 315px
            margin: 0 auto
            padding: 0 2.5px
            grid-gap: 5px
</style>
