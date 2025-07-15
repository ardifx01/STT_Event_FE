import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Index from "../views/index.vue";
import PrizeDrawEntries from "../views/PrizeDrawEntries.vue";
import StaffScanQR from "../views/StaffScanQR.vue";
import BoothVisit from "../views/ScannBoothVisit.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/unhxornmrjlikftmsdgewnorjbjxvriurwzawtyjjlemlimuqfcu", //unhxornmrjlikftmsdgewnorjbjxvriurwzawtyjjlemlimuqfcu - path: '/spinwheel'
    name: "PrizeDrawEntries",
    component: PrizeDrawEntries,
  },
  {
    path: "/mdusibclkdqurpuvuabuchzeojnszumrjaelrhknishogowwijfh", //mdusibclkdqurpuvuabuchzeojnszumrjaelrhknishogowwijfh - path:'/staff/register'
    name: "StaffScanQR",
    component: StaffScanQR,
  },
  {
    path: "/vqeksyqgxazjauboporykdeeqrknqrdgfiienllsuofrsxwgntfu", //vqeksyqgxazjauboporykdeeqrknqrdgfiienllsuofrsxwgntfu -   path:'/staff/booth_visit',
    name: "BoothVisit",
    component: BoothVisit,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
