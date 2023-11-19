<template>
  <div class="text-left lg:col-span-2 shadow-x-lg">
    <div class="pt-0">
      <div class="block">
        <ul class="flex flex-col">
          <li
            v-for="(item, index) in accountItems"
            :key="`ac-${index}`"
            class="flex items-center justify-between hover:bg-gray-800 hover:!text-white"
            @click="handleTabClick(item.path)"
          >
            <span
              class="text-sm  font-normal text-left focus:outline-none px-3 py-5 items-center flex w-full capitalize border-b-[1px] lg:border-b-gray-Grayborder xl:px-7 lg:text-base"
              :class="{
                'font-bold border-l-4 border-l-black bg-gray-800 text-white': $route.path === item.path,
                'border-l-4 border-l-transparent': $route.path !== item.path,
              }"
            >
              <RouterLink :to="item.path">
                {{ item.title }}
              </RouterLink>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    onSignOut: Function,
  },
  data() {
    return {
      accountItems: [
        { title: "Dashboard", path: "/", icon: "" },
        { title: "Manage Inventory", path: "/manage-inventory", icon: "" },
        { title: "Products", path: "/product/add", icon: "" },
      ],
    };
  },
  methods: {
    handleTabClick(value) {
      this.$router.push(value);
    },
  },
};
</script>

