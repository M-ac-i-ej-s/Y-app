<template>
    <div class="NavBarComponent">
        <div class="navbar-menu">
            <router-link to="/home">
                <div class="navbar-menu-image">
                    <img class="navbar-menu-image-value" src="../assets/Ylogo.png" alt="yLogo">
                </div>
            </router-link>
            <router-link class="navbar-menu-redirect" to="/home">
                <div class="navbar-menu-link shadow">
                    <v-icon class="navbar-menu-link-icon" :icon="(currentRouteName === 'home') ?  'mdi-home' : 'mdi-home-outline'"/>
                    <span :class="`navbar-menu-link-label ${(currentRouteName === 'home') &&  'focus'}`">Home</span>
                </div> 
            </router-link>
            <router-link class="navbar-menu-redirect" to="/explore">
                <div class="navbar-menu-link shadow">
                    <v-icon class="navbar-menu-link-icon" icon="mdi-magnify" style="{{ font-weight: 400; }}"/>
                    <span :class="`navbar-menu-link-label ${(currentRouteName === 'explore') &&  'focus'}`">Explore</span>
                </div>
            </router-link>
            <router-link class="navbar-menu-redirect" :to="'/' + userId + '/bookmarks'">
                <div class="navbar-menu-link shadow">
                    <v-icon class="navbar-menu-link-icon" :icon="(currentRouteName === 'bookmarks') ? 'mdi-bookmark' : 'mdi-bookmark-outline'"/>
                    <span :class="`navbar-menu-link-label ${(currentRouteName === 'bookmarks') &&  'focus'}`">Bookmarks</span>
                </div>
            </router-link>
            <router-link class="navbar-menu-redirect" :to="'/' + userId + '/blockedUsers'">
                <div class="navbar-menu-link shadow">
                    <v-icon class="navbar-menu-link-icon" :icon="(currentRouteName === 'blockedUsers') ? 'mdi-account-cancel' : 'mdi-account-cancel-outline'"/>
                    <span :class="`navbar-menu-link-label ${(currentRouteName === 'blockedUsers') &&  'focus'}`">Blocked users</span>
                </div>
            </router-link>
            <router-link class="navbar-menu-redirect" :to="'/' + userLogin">
                <div class="navbar-menu-link shadow">
                    <v-icon class="navbar-menu-link-icon" :icon="(currentRouteName === userLogin) ? 'mdi-account' : 'mdi-account-outline'"/>
                    <span :class="`navbar-menu-link-label ${(currentRouteName === userLogin) &&  'focus'}`">Profile</span>
                </div>
            </router-link>
            <div class="navbar-menu-link">
                <CreatingPostComponent :width="width" :login="userLogin"/>
            </div>
        </div>
        <div class="navbar-profile" @click="logOut">
            <div class="navbar-profile-data">
                <img class="navbar-profile-data-value" :src="avatar" alt="avatar">
                <span v-if="width > 1200" class="navbar-profile-data-login">{{userLogin}}</span>
            </div>
            <div v-if="width > 1200" class="navbar-profile-more">
                <v-icon icon="mdi-logout" size="1.5vw"/>
            </div>
            <v-tooltip
                activator="parent"
                location="top"
            >
                Do you want to log out?
            </v-tooltip>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import store from '../store';
import CreatingPostComponent from './CreatingPostComponent.vue';
import router from '../router';
import { mapMutations } from 'vuex';

export default {
    name: 'NavBarComponent',
    components: {
        CreatingPostComponent
    },
    data() {
        return {
            width: window.innerWidth,
            userLogin: store.state.data.user.user.login,
            userId: store.state.data.user.user._id,
            avatar: store.state.data.user.user.avatar
        }
    },
    methods: {
        logOut() {
            Swal.fire({
                title: "Log out of Y?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Log out"
                }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Your logged out",
                        text: "Bye bye!",
                        icon: "success"
                    });
                    this.loggedOut();
                    router.push('/');
                }
                });
        },
        handleResize() {
            this.width = parseInt(window.innerWidth)
        },
        ...mapMutations(['loggedIn', 'loggedOut']),
    },
    mounted() {
    // Add an event listener to watch for changes in window width
        window.addEventListener('resize', this.handleResize);
    },
    computed: {
        currentRouteName() {
            if(this.$route.path.split('/').length > 2) {
                return this.$route.path.split('/')[2]
            } else {
                return this.$route.path.split('/')[1]
            }
        }
    },
    destroyed() {
    // Remove the event listener when the component is destroyed
        window.removeEventListener('resize', this.handleResize);
  } ,
}
</script>
<style lang="scss">
.NavBarComponent {
    position:fixed;
    width: 15%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 900px 0 0;
    @media screen and (max-width: 1500px) {
        margin: 0 820px 0 0;
    }
    @media screen and (max-width: 1200px) {
        align-items: center;
        margin: 0 725px 0 0;
    }
    @media screen and (max-width: 850px) {
        margin: 0 575px 0 0;
    }
    @media screen and (max-width: 650px) {
        margin: 0 475px 0 0;
    }
    .navbar-menu {
        display: flex;
        flex-direction: column;
        @media screen and (max-width: 1200px) {
            align-items: center; 
        }
        .navbar-menu-image {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            margin: 10px;
            transition: 0.2s ease;
            &:hover {
                background-color: #e9e9e9;
                border-radius: 90px;
            }
            .navbar-menu-image-value {
                width: 70px;
                cursor: pointer;
                padding: 5px;
                margin: 10px;
            }
        }
        .navbar-menu-redirect {
            text-decoration: none;
            color: black;
        }
        .navbar-menu-link {
            display: flex;
            align-items: center;
            padding: 10px;
            margin: 10px;
            transition: 0.2s ease;
            cursor: pointer;
            &.shadow:hover {
                background-color: #e9e9e9;
                border-radius: 90px;
            }
            .navbar-menu-link-label {
                font-size: 1vw;
                padding: 0 0 0 15px;
                &.focus {
                    font-weight: 700;
                }
                @media screen and (max-width: 1200px) {
                    display: none;
                }
            }
            .navbar-menu-link-button {
                    width: 100%;
                    font-weight: 700;
                    font-size: 1vw;
                    border-radius: 20px;
            }
            .navbar-menu-link-icon {
                font-size: 1.8vw;
                @media screen and (max-width: 1200px) {
                    font-size: 40px;
                }
            }
        }
    }
    .navbar-profile {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 10px 10px 10px;
        margin: 0 0 20px 10px;
        transition: 0.2s ease;
        cursor: pointer;
        @media screen and (max-width: 1200px) {
            margin: 0 0 20px 0;
        }
        &:hover {
            background-color: #e9e9e9;
            border-radius: 90px;
        }
        .navbar-profile-data {
            display: flex;
            align-items: center;
            .navbar-profile-data-value {
                border-radius: 90px;
                object-fit: cover;
                width: 70px;
                height: 70px;
            }
            .navbar-profile-data-login {
                font-size: 1vw;
                padding: 0 0 0 10px;
            }
        }
    }
}    
</style>