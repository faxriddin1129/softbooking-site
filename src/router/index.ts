import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/stores/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Default",
            component: () => import("@/layouts/pages/PDefault.vue"),
            children: [
                {
                    path: "",
                    name: "Home",
                    component: () => import("@/pages/HomeView.vue"),
                    meta: {
                        auth: false,
                    },
                },
                {
                    path: "/profile",
                    name: "Profile",
                    component: () => import("@/pages/ProfileView.vue"),
                    meta: {
                        auth: true,
                    },
                },
                {
                    path: "/orders",
                    name: "Orders",
                    component: () => import("@/pages/OrdersView.vue"),
                    meta: {
                        auth: true,
                    },
                },
                {
                    path: "/order",
                    name: "Order",
                    component: () => import("@/pages/OrderView.vue"),
                },
                {
                    path: "/orders-active",
                    name: "Orders-Active",
                    component: () => import("@/pages/OrdersActiveView.vue"),
                    meta: {
                        auth: true,
                    },
                },
                {
                    path: "/orders-history",
                    name: "Orders-History",
                    component: () => import("@/pages/OrdersHistoryView.vue"),
                    meta: {
                        auth: true,
                    },
                },
                {
                    path: "/booking",
                    name: "Booking",
                    component: () => import("@/pages/BookingView.vue"),
                },
                {
                    path: "/last-search",
                    name: "lastSearch",
                    component: () => import("@/pages/LastSearch.vue"),
                },
                {
                    path: "/login",
                    name: "Login",
                    component: () => import("@/pages/LoginView.vue"),
                    meta: {
                        auth: false,
                    },
                },
                {
                    path: "/privacy",
                    name: "Privacy",
                    component: () => import("@/pages/PrivacyView.vue"),
                },
                {
                    path: "/reset-password",
                    name: "ResetPassword",
                    component: () => import("@/pages/ResetPasswordView.vue"),
                },
                {
                    path: "/agency",
                    name: "Agency",
                    component: () => import("@/pages/AgencyView.vue"),
                },
                {
                    path: "/:pathMatch(.*)*",
                    name: "NotFound",
                    component: () => import("@/pages/NotFoundView.vue"),
                    meta: {
                        auth: false,
                    },
                },
            ],
        },
    ],
});

router.beforeEach(async (to, from) => {
    const store = useAuthStore();
    const token = store.getTokens();
    if (token && !store.user) {
        await store.fetchUser(); // getUser instead of token
    }
    if (to.meta.auth && !token) return {name: "Login"};
    if (token && store.user && to.name === "Login") return {name: "Home"};
    window.scrollTo(0, 0);
    return true;
});
export default router;
