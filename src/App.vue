<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Whna weac</h1>
    <h3>
      Counter: {{ count }}
      <a @click="inc()" style="margin-right:10px">+</a>
      <a @click="dec()">-</a>
    </h3>

    <HelloWorld :count="count" />
  </div>
</template>

<script lang="ts">
import { useCounter } from "@vueuse/core";
import { defineComponent } from "@vue/composition-api";
// import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
// import Vue from "vue";
// import App from "./App.vue";

const App = defineComponent({
  components: { HelloWorld },
  setup() {
    const { count, inc, dec } = useCounter();
    return {
      count,
      inc,
      dec
    };
  }
});

export default App;
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
