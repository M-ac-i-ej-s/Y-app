<template>
    <div class="ProfileShowcase" @click="goToUser">
        <div class="profile-showcase">
            <div class="profile-showcase-image">
                <img class="profile-showcase-image-value" src="../assets/dummy-avatar.png" alt="">
            </div>
            <div class="profile-showcase-info">
                <div class="profile-showcase-info-login">
                    <span class="profile-showcase-info-login-value">
                        {{ user.login }}
                    </span>
                </div>
                <div class="profile-showcase-info-bio">
                    <span class="profile-showcase-info-bio-value">
                        {{ user.bio }}
                    </span>
                </div>
            </div>
        </div>
        <div class="profile-showcase-button">
            <v-menu v-if="!isFollowed" v-model="menu" :close-on-content-click="false" location="start" class="profile-card-values-buttons-follow-block">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" icon="mdi-dots-horizontal" size="x-small"/>
                </template>
                <v-btn v-if="!isBlocked" prepend-icon="mdi-account-cancel" color="red" rounded="xl" @click="updateBlockedUsersService">
                   Block this user
                </v-btn>
                <v-btn v-else prepend-icon="mdi-account-check" color="green" rounded="xl" @click="updateBlockedUsersService">
                   Unblock this user
                </v-btn>
            </v-menu>
            <div v-if="isBlocked">
                <v-btn color="red" rounded="xl">Blocked</v-btn>
            </div>
            <div v-else>
                <v-btn v-if="!isFollowed" class="profile-showcase-button-value" color="#582b5a" @click.stop="updateBothFollowService">Follow</v-btn>
                <div v-else @mouseover="isHovering = true" @mouseleave="isHovering = false">
                    <v-btn v-if="!isHovering" class="profile-showcase-button-value following" color="#582b5a">Following</v-btn>
                    <v-btn v-else class="profile-showcase-button-value" color="red" @click.stop="updateBothFollowService">Unfollow</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import router from '../router';
import store from '../store';
import { mapMutations } from 'vuex';
import { updateBothFollow, updateBlockedUsers, getUser } from '../services/user.service';


export default {
    name: 'ProfileShowcase',
    props: {
        user: {
            type: [Object, null],
        },
    },
    data() {
        return {
            isFollowed: false,
            isHovering: false,
            userCloud: null,
            menu: false,
        }
    },
    methods: {
        isFollow() {
            if(this.user.followers.includes(this.user.login)) {
                this.isFollowed = true;
            } else {
                this.isFollowed = false;
            }
        },
        isBlocked() {
            if(store.state.data.user.user.blockedUsers.includes(this.user.login)) {
                this.isBlocked = true;
            } else {
                this.isBlocked = false;
            }
        },
        goToUser() {
            router.push(`/${this.user.login}`);
        },
        async updateBothFollowService() {
            try {
                await updateBothFollow(store.state.data.user.user.login, this.user.login);
                await this.reLogUser(this.userCloud);
                this.isFollowed = !this.isFollowed;
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async updateBlockedUsersService() {
            try {
                await updateBlockedUsers(store.state.data.user.user.login, this.user.login);
                await this.getUserFromCloudService();
                await this.reLogUser(this.userCloud);
                this.isBlocked = !this.isBlocked;
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getUserFromCloudService() {
            try {
                const res = await getUser(store.state.data.user.user.login);
                this.userCloud = res;
                this.userCloud.joinDate = new Date(this.userCloud.joinDate);
            } catch (error) {
                router.push('/errorpage');
            }
        },
        ...mapMutations(['reLogUser'])
    },
    mounted() {
        this.isFollow();
        this.isBlocked();
    }
}
</script>
<style lang="scss">
.ProfileShowcase {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #e5e5e5;
    cursor: pointer;
    &:hover {
        background-color: #f5f5f5;
    }
    .profile-showcase {
        display: flex;
        gap: 10px;
        .profile-showcase-image {
            .profile-showcase-image-value {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #582b5a;
            }
        }
        .profile-showcase-info {
            .profile-showcase-info-login {
                .profile-showcase-info-login-value {
                    font-size: 18px;
                    font-weight: bold;
                }
            }
            .profile-showcase-info-bio {
                .profile-showcase-info-bio-value {
                    font-size: 16px;
                }
            }
        }
    }
    .profile-showcase-button {
        display: flex;
        gap: 10px;
        .profile-showcase-button-value {
            width: 120px;
            font-weight: 700;
            font-size: 13px;
            border-radius: 20px;
        }
    }
}
</style>