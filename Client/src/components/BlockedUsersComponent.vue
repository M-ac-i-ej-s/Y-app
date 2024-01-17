<template>
    <div class="BlockedUsers">
        <div class="blocked-users-label">
            <div>
                <div class="blocked-users-label-title">
                    <span class="blocked-users-label-title-value">
                        Blocked Users
                    </span>
                </div>
                <div class="blocked-users-label-login">
                    <span class="blocked-users-label-login-value">
                        test
                    </span>
                </div>
            </div>
            <div class="blocked-users-label-icon" @click="unblockAllUsersService">
                <v-icon icon="mdi-account-check" size="x-large"/>
                <v-tooltip activator="parent" location="bottom">Unblock all users</v-tooltip>
            </div>
        </div>
        <div v-if="blockedUsers">
            <div v-if="blockedUsers?.length > 0">
                <ProfileShowcaseComponent v-for="user in blockedUsers" :key="user._id" :user="user"/>
            </div>
            <div v-else>
                <ExeptionComponent text="blocked users"/>
            </div>
        </div>
        <div v-else>
            <LoaderComponent/>
        </div>
    </div>
</template>
<script>
import ProfileShowcaseComponent from './ProfileShowcaseComponent.vue';
import ExeptionComponent from './ExeptionComponent.vue';
import LoaderComponent from './LoaderComponent.vue';
import store from '../store';
import router from '../router';
import Swal from 'sweetalert2';
import { mapMutations } from 'vuex';
import {getAllBlockedUsers, updateBlockedUsers, getUser} from '../services/user.service';

export default {
    name: 'BlockedUsersComponent',
    data() {
        return {
            blockedUsers: null,
            user: null
        }
    },
    components: {
        ProfileShowcaseComponent,
        ExeptionComponent,
        LoaderComponent
    },
    methods: {
        async getUserService() {
            try {
                const res = await getUser(store.state.data.user.user.login);
                this.user = res;
                this.user.joinDate = new Date(this.user.joinDate);
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getAllBlockedUsersService() {
            try {
                const res = await getAllBlockedUsers(store.state.data.user.user.login);
                this.blockedUsers = res;
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async unblockAllUsersService() {
            Swal.fire({
                title: "Do you want to unblock all users?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Unblock all users"
                }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        this.blockedUsers.forEach(async user => {
                            await updateBlockedUsers(store.state.data.user.user.login, user.login);
                        });
                        await this.getUserService();
                        this.reLogUser(this.user);
                        this.blockedUsers = [];
                    } catch (error) {
                        router.push('/errorpage');
                    
                    }
                    Swal.fire({
                        title: "Cleared !",
                        icon: "success"
                    });
                }
                });
        },
        ...mapMutations(['reLogUser'])
    },
    mounted() {
        this.getAllBlockedUsersService();
    }
}
</script>
<style lang="scss">
.BlockedUsers {
    width: 600px;
    min-height: 150vh;
    border-left:1px solid #e0e0e0;
    border-right:1px solid #e0e0e0;
    @media screen and (max-width: 850px) {
        width: 450px;
    }
    .blocked-users-label {
        display: flex;
        justify-content: space-between;
        padding: 10px 20px 10px 20px;
        align-items: center;
        .blocked-users-label-title {
            display: flex;
            flex-direction: column;
            .blocked-users-label-title-value {
                font-size: 25px;
                font-weight: 700;
            }
        }
        .blocked-users-label-login {
            .blocked-users-label-login-value {
                font-size: 15px;
                color: gray;
            }
        }
        .blocked-users-label-icon {
            padding: 10px;
            transition: 0.2s ease;
            cursor: pointer;
            &:hover {
                background-color: #e9e9e9;
                border-radius: 90px;
            } 
        }
    }
}
</style>