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
            <div class="blocked-users-label-icon">
                <v-icon icon="mdi-account-check" size="x-large"/>
                <v-tooltip activator="parent" location="bottom">Unblock all users</v-tooltip>
            </div>
        </div>
        <div v-if="blockedUsers?.length > 0">
            <ProfileShowcaseComponent v-for="user in blockedUsers" :key="user._id" :user="user"/>
        </div>
        <div v-else>
            <ExeptionComponent text="blocked users"/>
        </div>
    </div>
</template>
<script>
import ProfileShowcaseComponent from './ProfileShowcaseComponent.vue';
import ExeptionComponent from './ExeptionComponent.vue';
import store from '../store';
import {getAllBlockedUsers} from '../services/user.service';

export default {
    name: 'BlockedUsersComponent',
    data() {
        return {
            blockedUsers: null
        }
    },
    components: {
        ProfileShowcaseComponent,
        ExeptionComponent
    },
    methods: {
        async getAllBlockedUsersService() {
            try {
                const res = await getAllBlockedUsers(store.state.data.user.user.login);
                console.log(res)
                this.blockedUsers = res;
            } catch (error) {
                console.error('Error in getAllBlockedUsers:', error);
            }
        },
    },
    mounted() {
        this.getAllBlockedUsersService();
    }
}
</script>
<style lang="scss">
.BlockedUsers {
    width: 600px;
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