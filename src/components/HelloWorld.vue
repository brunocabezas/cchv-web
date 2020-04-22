<template>
  <div class="hello">
    <h1>{{ `Count Property ${count}` }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    count: Number
  },
  setup() {
    console.log("Hello World");
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  color: red;
}
</style>
