<template>
    <div class="NavBarComponent">
        <div class="navbar-menu">
            <div class="navbar-menu-image">
                <img class="navbar-menu-image-value" src="../assets/Ylogo.png" alt="yLogo">
            </div>
            <router-link class="navbar-menu-redirect" to="/home">
                <div class="navbar-menu-link shadow">
                    <v-icon class="navbar-menu-link-icon" icon="mdi-home-outline"/>
                    <span class="navbar-menu-link-label">Home</span>
                </div>
            </router-link>
            <router-link class="navbar-menu-redirect" to="/explore">
                <div class="navbar-menu-link shadow">
                    <v-icon class="navbar-menu-link-icon" icon="mdi-magnify"/>
                    <span class="navbar-menu-link-label">Explore</span>
                </div>
            </router-link>
            <router-link class="navbar-menu-redirect" to="/:id/bookmarks">
                <div class="navbar-menu-link shadow">
                    <v-icon class="navbar-menu-link-icon" icon="mdi-bookmark-outline"/>
                    <span class="navbar-menu-link-label">Bookmarks</span>
                </div>
            </router-link>
            <router-link class="navbar-menu-redirect" to="/:id/blockedUsers">
                <div class="navbar-menu-link shadow">
                    <v-icon class="navbar-menu-link-icon" icon="mdi-account-cancel-outline"/>
                    <span class="navbar-menu-link-label">Blocked users</span>
                </div>
            </router-link>
            <router-link class="navbar-menu-redirect" :to="'/' + userLogin">
                <div class="navbar-menu-link shadow">
                    <v-icon class="navbar-menu-link-icon" icon="mdi-account-outline"/>
                    <span class="navbar-menu-link-label">Profile</span>
                </div>
            </router-link>
            <div class="navbar-menu-link">
                <CreatingPostComponent :width="width"/>
                <!-- <v-btn v-if="this.width > 768" class="navbar-menu-link-button" color="#582b5a">Post</v-btn>
                <v-btn v-else icon="mdi-plus" color="#582b5a"/> -->
            </div>
        </div>
        <div class="navbar-profile" @click="logOut">
            <div class="navbar-profile-data">
                <img class="navbar-profile-data-value" src="../assets/dummy-avatar.png" alt="avatar">
                <span v-if="width > 768" class="navbar-profile-data-login">Login</span>
            </div>
            <div v-if="width > 768" class="navbar-profile-more">
                <v-icon icon="mdi-logout" size="2vw"/>
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

export default {
    name: 'NavBarComponent',
    components: {
        CreatingPostComponent
    },
    data() {
        return {
            width: window.innerWidth,
            userLogin: store.state.data.user.user.login
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
                }
                });
        },
        handleResize() {
            this.width = parseInt(window.innerWidth)
        }
    },
    mounted() {
    // Add an event listener to watch for changes in window width
        window.addEventListener('resize', this.handleResize);
    },
    destroyed() {
    // Remove the event listener when the component is destroyed
        window.removeEventListener('resize', this.handleResize);
  } ,
}
</script>
<style lang="scss">
.NavBarComponent {
    width: 15%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
        align-items: center;
        margin: 0 10px 0 10px;
    }
    .navbar-menu {
        display: flex;
        flex-direction: column;
        @media screen and (max-width: 768px) {
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
                font-size: 1.3vw;
                padding: 0 0 0 15px;
                @media screen and (max-width: 768px) {
                    display: none;
                }
            }
            .navbar-menu-link-button {
                    width: 100%;
                    font-weight: 700;
                    font-size: 0.8vw;
                    border-radius: 20px;
            }
            .navbar-menu-link-icon {
                font-size: 2vw;
                @media screen and (max-width: 768px) {
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
        @media screen and (max-width: 768px) {
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
                width: 70px;
            }
            .navbar-profile-data-login {
                font-size: 1.3vw;
                padding: 0 0 0 10px;
            }
        }
    }
}    
</style>