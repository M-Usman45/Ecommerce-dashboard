<template>
  <nav class="bg-gray-800 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-8 w-8" :src="require('@/assets/logo.png')" alt="Logo" />
          </div>
          <div class="hidden md:flex items-baseline space-x-4 ml-10">
            <RouterLink
              v-for="(item, index) in accountItems"
              :key="`top-nav-${index}`"
              :to="item.path"
              class="px-3 py-2 rounded-md text-sm font-medium"
              :class="{
                'bg-gray-700 text-white': $route.path === item.path,
                'text-gray-300 hover:bg-gray-700 hover:text-white': $route.path !== item.path,
              }"
            >
              {{ item.title }}
            </RouterLink>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      accountItems: [
        { title: "Dashboard", path: "/", icon: "" },
        { title: "Manage Inventory", path: "/manage-inventory", icon: "" },
        { title: "Products", path: "/product/add", icon: "" },
      ],
    };
  },
};
</script>
