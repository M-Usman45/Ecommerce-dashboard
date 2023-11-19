<template>
  <div id="app">
    <Layout>
      <router-view></router-view>
    </Layout>
  </div>
</template>

<script>
import Layout from "./components/Layout/AppLayout.vue";

export default {
  components: {
    Layout,
  },
};
</script>
