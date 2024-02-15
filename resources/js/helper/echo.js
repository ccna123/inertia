import Echo from "laravel-echo";

const echo = new Echo({
    broadcaster: "pusher",
    key: process.env.VITE_PUSHER_APP_KEY,
    cluster: process.env.VITE_PUSHER_APP_CLUSTER,
    encrypted: true,
});

export default echo;
