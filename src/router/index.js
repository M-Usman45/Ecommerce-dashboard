import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import ManageInventoryView from "../views/ManageInventoryView.vue";
import AddProductForm from "../views/AddProductForm.vue";

const routes = [
  {
    path: "/",
    component: DashboardView,
  },
  {
    path: "/manage-inventory",
    component: ManageInventoryView,
  },
  {
    path: "/product/add",
    component: AddProductForm,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
