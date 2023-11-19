<template>
  <TopBar />
  
  <section class="mt-1 min-h-[86vh]">
    <div class="md:flex xl:h-auto">
      <div class="w-1/5 xl:1/6 2xl:w-[16%]">
        <SidebarVue />
      </div>
      <div class="w-4/5 xl:w-5/6 2xl:w-[84%] bg-gray-lightGrayBg py-15.5">
        <div class="container w-full mx-auto xl:px-12 2xl:w-[1122px]">
          <router-view></router-view> <!-- Display the child route's component here -->
        </div>
      </div>
    </div>
  </section>
  <FooterComponent />
</template>


<script>
import SidebarVue from "./SidebarSection.vue";
import TopBar from "./TopBar.vue"; 
import FooterComponent from "./FooterSection.vue"; 

export default {
  components: {
    SidebarVue,
    TopBar, FooterComponent
  },
};
</script>

