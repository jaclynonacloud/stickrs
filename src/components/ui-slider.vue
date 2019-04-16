<template lang="html">

<div class="slider-container">
  <input type="range" :min="min || 0" :max="max || 100" :step="step || 1" v-model="sliderValue" class="slider" @mousedown="isSliding=true" @mouseup="isSliding=false" @mousemove="onCheckValue" >
</div>

</template>

<script>
  export default  {
    name: 'uiSlider',
    props: {
      value: Number | String,
      min: String,
      max: String,
      step: String
    },
    watch: {
      value(newVal) {
        this.sliderValue = newVal
      }
    },
    mounted() {
      if(this.value != null) this.sliderValue = parseFloat(this.value)
    },
    data() {
      return {
        sliderValue: 0,
        isSliding: false
      }
    },
    methods: {
      onCheckValue(e) {
        if(this.isSliding)
          this.$emit('onChange', this.sliderValue)
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
@import '../sass/main';

.slider-container {
  width: 100%;

  .slider {
    -webkit-appearance: none; // remove default input styling
    appearance: none;
    width: inherit;
    height: 27px;
    background: $colour-font-basic;
    outline: none;
    user-select: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    box-sizing: border-box;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 21px;
      height: 21px;
      background: $colour-font-secondary;
      cursor: pointer; 
    }

    &::-moz-range-thumb {
      width: 21px; /* Set a specific slider handle width */
      height: 21px; /* Slider handle height */
      background: $colour-font-secondary; /* Green background */
      cursor: pointer; /* Cursor on hover */
    }

  }
}
</style>
