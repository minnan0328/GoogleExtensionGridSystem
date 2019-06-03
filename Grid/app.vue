<template>
  <div id="app" class="grid-box">
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
  name: 'App',
  components: {
  }
}
</script>

<style lang="sass">
  .grid-box
    width: 100vw
    height: 100vh
    display: flex
    position: fixed
    justify-content: center
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
    .grid-box
      .grid-container
          width: 764px
          margin: 0 auto
          padding: 0 2px
          grid-gap: 4px

  @media (max-width: 320px)
    .grid-box
      .grid-container
          width: 315px
          margin: 0 auto
          padding: 0 2.5px
          grid-gap: 5px
</style>
