<template>
  <div id="app">
    <Header />
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Whna weac</h1>
    <h3>
      Counter: {{ String(ready) }}
      <a @click="inc()" style="margin-right:10px">+</a>
      <a @click="dec()">-</a>
    </h3>
    <div>{{ state && state.length }}</div>
    <HelloWorld :count="count" />
  </div>
</template>

<script lang="ts">
import { useCounter } from "@vueuse/core";
import { defineComponent } from "vue";
import { useAsyncState } from "@vueuse/core";
import api from "./api/client";
import Header from "@/components/layout/Header/Header.vue";

const App = defineComponent({
  components: { Header },
  name: "App",
  setup() {
    const { count, inc, dec } = useCounter();
    const { state, ready } = useAsyncState(
      api.get("/users").then((res: any) => {
        console.log(res.data.users);
        return res.data.users;
      }),
      []
    );
    return {
      count,
      inc,
      state,
      ready,
      dec
    };
  }
});

export default App;
</script>
