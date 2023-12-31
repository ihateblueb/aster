<script setup>
import Icon from "../components/Icon.vue";
import Post from "../components/Post.vue";
import PostArea from "../components/PostArea.vue";
import themes from "assets/themes.json";

import {
    VTooltip,
    VClosePopper,
    Dropdown,
    Tooltip,
    Menu
} from 'floating-vue'
import 'floating-vue/dist/style.css'
</script>

<script>
export default {
    data: () => ({
        code: "", // gets ignored after login
        loginstate: "start", // options: start, almost, done
        instanceurl: "",
        asterurl: "",
        token: "",
        user: {
            displayname: "none",
            username: "none",
            avatar: "assets/none.png",
        },
        app: {
            postArea: {
                selectedBtn: "",
                dropdown: "",
                poll: {
                    options: 2,
                },
            },
            clientid: "",
            secret: "",
        },
        toot: {
            content: "",
            replying: "",
            media: [],
            poll: {
                options: ["", "", "", "", ""],
                expires_in: "1 day",
                multiple: "false",
                hide_totals: "false",
            },
            sensitive: "",
            spoiler_text: "",
            visibility: "public",
            language: "",
        },
        timeline: {
            home: [],
            home_new: [],
            home_last: "",
            notifications: [],
            notifications_new: [],
            notifications_last: "",
        },
    }),
    mounted() {
        this.loadSettings();
        this.asterurl = window.location.origin;

        if (this.$route.query.code) {
            this.endlogin();
        }

        if (this.getLocalStorage("loginstate") === "done") {
            this.loginstate = this.getLocalStorage("loginstate");
            this.afterLogin();
            this.getAccountDetails();
            this.loadToots();
            this.loadNotifications();
        }

        console.log("[Aster Startup] Login State: " + this.loginstate);

        async function keyboardShortcuts(e) {
            if (e.ctrlKey && e.code === "Comma") {
                await navigateTo({ path: '/settings' })
            } /*
            else if (e.code === "KeyL") {
                await navigateTo({ path: '/local' })
            } else if (e.code === "KeyF") {
                await navigateTo({ path: '/federated' })
            } */
        }
        // register the handler
        document.addEventListener("keyup", keyboardShortcuts, false);
    },
    methods: {
        setLocalStorage(key, value) {
            if (process.client) {
                localStorage.setItem(key, value);
            }
        },
        getLocalStorage(key) {
            if (process.client) {
                return localStorage.getItem(key);
            }
        },
        removeLocalStorage(key) {
            if (process.client) {
                return localStorage.removeItem(key);
            }
        },

        loadSettings() {
            // color themes
            this.colortheme = this.getLocalStorage("ui_colortheme");
            let themearray = Object.entries(
                JSON.parse(JSON.stringify(themes.color))
            );
            themearray.forEach((element) => {
                document.body.classList.remove("cs_" + element[1].id);
            });
            document.body.classList.add(this.colortheme);

            // font
            this.font = this.getLocalStorage("ui_font");
            let fontarray = Object.entries(
                JSON.parse(JSON.stringify(themes.font))
            );
            fontarray.forEach((element) => {
                document.body.classList.remove("ft_" + element[1].id);
            });
            document.body.classList.add(this.font);

            // reduced motion
            this.reducedmotion = this.getLocalStorage("ui_reducedmotion");
            document.body.classList.remove("reduced-motion");
            if (this.reducedmotion === "true") {
                document.body.classList.add("reduced-motion");
            }

            // extra animations
            this.extraanimations = this.getLocalStorage("ui_extraanimations");
            document.body.classList.remove("extra-animations");
            if (this.extraanimations === "true") {
                document.body.classList.add("extra-animations");
            }
        },

        async createApplication() {
            const gettingapp = await fetch(
                "https://" + this.instanceurl + "/api/v1/apps",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `client_name=Aster&redirect_uris=${this.asterurl}/&scopes=read write push&website=https://github.com/ihateblueb/aster`,
                }
            );
            const gettingapp_response = await gettingapp.json();

            this.app.clientid = gettingapp_response.client_id;
            this.app.secret = gettingapp_response.client_secret;
            this.app.vapidkey = gettingapp_response.vapid_key;
            this.setLocalStorage("app_clientid", this.app.clientid);
            this.setLocalStorage("app_secret", this.app.secret);
            this.setLocalStorage("app_vapidkey", this.app.vapidkey);
        },

        async startlogin() {
            this.removeLocalStorage("user_avatar");
            this.removeLocalStorage("user_displayname");
            this.removeLocalStorage("user_username");
            this.removeLocalStorage("user_id");

            await this.createApplication();
            window.open(
                "https://" +
                this.instanceurl +
                "/oauth/authorize?client_id=" +
                this.app.clientid +
                `&scope=read+write+push&redirect_uri=${this.asterurl}/&response_type=code`,
                "_self"
            );
            this.setLocalStorage("instanceurl", this.instanceurl);
        },

        async endlogin() {
            this.instanceurl = this.getLocalStorage("instanceurl");
            this.code = this.$route.query.code;

            this.app.clientid = this.getLocalStorage("app_clientid");
            this.app.secret = this.getLocalStorage("app_secret");
            this.app.vapidkey = this.getLocalStorage("app_vapidkey");

            const gettingtoken = await fetch(
                "https://" + this.instanceurl + "/oauth/token",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `client_id=${this.app.clientid}&client_secret=${this.app.secret}&redirect_uri=${this.asterurl}/&grant_type=authorization_code&code=${this.code}&scope=read write push`,
                }
            );
            const gettingtoken_response = await gettingtoken.json();

            console.log(gettingtoken_response);

            this.setLocalStorage("token", gettingtoken_response.access_token);

            this.token = gettingtoken_response.access_token;

            this.getAccountDetails();
            this.afterLogin();

            this.setLocalStorage("loginstate", "done");

            setTimeout(function () {
                this.loginstate = "done";
                window.open("/", "_self");
            }, 500);
        },

        async getAccountDetails() {
            const accountdetails = await fetch(
                "https://" +
                this.instanceurl +
                "/api/v1/accounts/verify_credentials",
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            const accountdetails_response = await accountdetails.json();

            this.user.avatar = accountdetails_response.avatar;
            this.user.displayname = accountdetails_response.display_name;
            this.user.username = accountdetails_response.username;
            this.user.id = accountdetails_response.id;

            this.setLocalStorage("user_avatar", this.user.avatar);
            this.setLocalStorage("user_displayname", this.user.displayname);
            this.setLocalStorage("user_username", this.user.username);
            this.setLocalStorage("user_id", this.user.id);
        },

        async afterLogin() {
            this.instanceurl = this.getLocalStorage("instanceurl");
            this.token = this.getLocalStorage("token");

            this.app.clientid = this.getLocalStorage("app_clientid");
            this.app.secret = this.getLocalStorage("app_secret");
            this.app.vapidkey = this.getLocalStorage("app_vapidkey");
        },

        async logout() {
            console.log("Logging out...");

            this.removeLocalStorage("user_avatar");
            this.removeLocalStorage("user_displayname");
            this.removeLocalStorage("user_username");
            this.removeLocalStorage("user_id");

            this.removeLocalStorage("token");
            this.removeLocalStorage("instanceurl");
            this.removeLocalStorage("loginstate");

            this.removeLocalStorage("app_clientid");
            this.removeLocalStorage("app_secret");
            this.removeLocalStorage("app_vapidkey");

            location.reload();
        },

        async loadToots() {
            let initialtoots = await fetch(
                "https://" + this.instanceurl + "/api/v1/timelines/home",
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            let initialtoots_response = await initialtoots.json();

            initialtoots_response.forEach(
                (element) =>
                    this.timeline.home.push(element) && console.log(element)
            );

            this.timeline.home_last = initialtoots_response.at(-1).id;

            this.startStream();
        },
        async loadMoreToots(id) {
            let moretoots = await fetch(
                "https://" +
                this.instanceurl +
                "/api/v1/timelines/home?max_id=" +
                id,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            let moretoots_response = await moretoots.json();

            moretoots_response.forEach((element) =>
                this.timeline.home.push(element)
            );

            this.timeline.home_last = moretoots_response.at(-1).id;
        },
        async resetFeed() {
            this.timeline.home = [];
            this.timeline.home_new = [];
            let initialtoots = await fetch(
                "https://" + this.instanceurl + "/api/v1/timelines/home",
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            let initialtoots_response = await initialtoots.json();

            initialtoots_response.forEach(
                (element) =>
                    this.timeline.home.push(element) && console.log(element)
            );

            this.timeline.home_last = initialtoots_response.at(-1).id;
        },
        async loadNotifications() {
            let initialnotifications = await fetch(
                "https://" + this.instanceurl + "/api/v1/notifications",
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            let initialnotifications_response =
                await initialnotifications.json();

            initialnotifications_response.forEach(
                (element) =>
                    this.timeline.notifications.push(element) &&
                    console.log(element)
            );

            this.timeline.notifications_last =
                initialnotifications_response.at(-1).id;
        },
        async loadMoreNotifications(id) {
            let morenotifications = await fetch(
                "https://" +
                this.instanceurl +
                "/api/v1/notifications?max_id=" +
                id,
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + this.token,
                    },
                }
            );
            let morenotifications_response = await morenotifications.json();

            morenotifications_response.forEach((element) =>
                this.timeline.notifications.push(element)
            );

            this.timeline.notifications_last =
                morenotifications_response.at(-1).id;
        },
        async resetNotifications() {
            this.timeline.notifications = [];
            this.loadNotifications();
        },

        async sendPush(msg) {
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notifications");
            } else if (Notification.permission === "granted") {
                if (msg.type === "favourite") {
                    const notification = new Notification(
                        msg.account.display_name,
                        {
                            body:
                                "@" +
                                msg.account.acct +
                                ' favorited your post\n"' +
                                msg.status.content +
                                '"',
                            icon: msg.account.avatar_static,
                        }
                    );
                } else if (msg.type === "reblog") {
                    const notification = new Notification(
                        msg.account.display_name,
                        {
                            body:
                                "@" +
                                msg.account.acct +
                                ' reblogged your post\n"' +
                                msg.status.content +
                                '"',
                            icon: msg.account.avatar_static,
                        }
                    );
                } else if (msg.type === "reaction") {
                    const notification = new Notification(
                        msg.account.display_name,
                        {
                            body:
                                "@" +
                                msg.account.acct +
                                ' reacted to your post\n"' +
                                msg.status.content +
                                '"',
                            icon: msg.account.avatar_static,
                        }
                    );
                } else if (msg.type === "mention") {
                    const notification = new Notification(
                        msg.account.display_name,
                        {
                            body:
                                "@" +
                                msg.account.acct +
                                ' mentioned you\n"' +
                                msg.status.content +
                                '"',
                            icon: msg.account.avatar_static,
                        }
                    );
                } else if (msg.type === "poll") {
                    const notification = new Notification(
                        msg.account.display_name,
                        {
                            body:
                                'A poll you have voted in ended\n"' +
                                "@" +
                                content.account.acct +
                                ":" +
                                msg.status.content +
                                '"',
                            icon: msg.account.avatar_static,
                        }
                    );
                } else if (msg.type === "status") {
                    const notification = new Notification(
                        msg.account.display_name,
                        {
                            body:
                                "@" +
                                msg.account.acct +
                                ' posted a toot, \n"' +
                                msg.status.content +
                                '"',
                            icon: msg.account.avatar_static,
                        }
                    );
                } else {
                    const notification = new Notification(
                        msg.account.display_name,
                        {
                            body:
                                "@" +
                                msg.account.acct +
                                " sent you a notification",
                            icon: msg.account.avatar_static,
                        }
                    );
                }
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        const notification = new Notification(
                            "Aster will now send you notifications. You can disable these in settings."
                        );
                    }
                });
            }
        },

        async startStream() {
            let userSocket = new WebSocket(
                "wss://" +
                this.instanceurl +
                "/api/v1/streaming?stream=user&access_token=" +
                this.token
            );

            userSocket.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                console.log(msg.event);

                if (msg.event === "update") {
                    this.timeline.home_new.push(JSON.parse(msg.payload));
                }
                if (msg.event === "notification") {
                    this.timeline.notifications_new.push(
                        JSON.parse(msg.payload)
                    );

                    console.log(JSON.parse(msg.payload));
                    this.sendPush(JSON.parse(msg.payload));
                }
            };
        },

        async onHomeScroll(e) {
            const { scrollTop, offsetHeight, scrollHeight } = e.target;
            if (scrollTop + offsetHeight >= scrollHeight) {
                this.loadMoreToots(this.timeline.home_last);
            }
        },
        async onNotificationsScroll(e) {
            const { scrollTop, offsetHeight, scrollHeight } = e.target;
            if (scrollTop + offsetHeight >= scrollHeight) {
                this.loadMoreNotifications(this.timeline.notifications_last);
            }
        },
    },
};
</script>

<template>
    <div class="loginArea" v-if="loginstate === 'start'">
        <div class="loginContainer">
            <div class="loginContainerHeader">
                <h1 class="loginContainerHeading">Welcome to Aster</h1>
            </div>
            <div>
                <p class="iptlabel">Please type your instances URL</p>
                <input type="text" placeholder="yourinstance.social" class="ipt instanceTextArea" v-model="instanceurl"
                    @keypress.enter="startlogin()" />
                <div class="instanceLoginButtons">
                    <button class="loginbtn" @click="startlogin()">Next</button>
                </div>
            </div>
        </div>
    </div>

    <div v-if="loginstate === 'done'">
        <div class="mColumns">
            <div class="mColumn">
                <div class="mColumnHeader">
                    <div class="mCH-left">
                        <img class="inscanceIcon" :src="'https://' + instanceurl + '/favicon.ico'"
                            v-tooltip="instanceurl + ' favicon'" :alt="instanceurl + 'favicon'" />
                        <div class="mCH-text">
                            <p>Aster <span class="betaTag">BETA</span></p>
                        </div>
                    </div>
                    <div class="mCH-buttons">
                        <NuxtLink to="/settings">
                            <button class="btn btn-header">
                                <Icon name="settings" size="16px" />
                            </button>
                        </NuxtLink>
                        <button @click="logout()" class="btn btn-header-logout">
                            <Icon name="log-out" size="16px" />
                        </button>
                    </div>
                </div>
                <div class="mColumnContent">
                    <div class="searchArea"></div>
                    <PostArea />
                </div>
            </div>
            <div class="mColumn">
                <div class="mColumnHeader">
                    <div class="mCH-text">
                        <p>Home</p>
                    </div>
                    <div class="mCH-buttons">
                        <button @click="resetFeed()" class="btn btn-header">
                            <Icon name="refresh-ccw" size="16px" />
                        </button>
                    </div>
                </div>
                <div class="mColumnContent" @scroll="onHomeScroll">
                    <div class="timelineNewPosts">
                        <div v-for="toot in timeline.home_new">
                            <Post :data="toot" :instanceurl="instanceurl" :token="token" />
                        </div>
                    </div>
                    <div v-for="toot in timeline.home">
                        <Post :data="toot" :instanceurl="instanceurl" :token="token" />
                    </div>
                </div>
            </div>
            <div class="mColumn">
                <div class="mColumnHeader">
                    <p>Notifications</p>
                </div>
                <div class="mColumnContent" @scroll="onNotificationsScroll">
                    <div class="timelineNewPosts">
                        <div v-for="notification in timeline.notifications_new">
                            <Notification :data="notification" :instanceurl="instanceurl" />
                        </div>
                    </div>
                    <div v-for="notification in timeline.notifications">
                        <Notification :data="notification" :instanceurl="instanceurl" />
                    </div>
                </div>
            </div>
            <div class="mColumn">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
