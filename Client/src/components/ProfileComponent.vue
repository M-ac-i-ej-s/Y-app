<template>
    <div class="Profile">
        <div class="profileComponent" v-if="user && isFollowed !== null">
            <ProfileCardComponent 
                :isYourProfile="isYourProfile" 
                :isFollowed="isFollowed" 
                :isHovering="isHovering" 
                :isBlocked="isBlocked" 
                :user="user" 
                :updateFollowers="updateFollowersService"
                :updateBlockedUsers="updateBlockedUsersService"/>
            <ProfileSlotsComponent :isYourProfile="isYourProfile" :isFollowed="isFollowed" :user="user"/>
        </div>
        <div v-else>
            ...loading
        </div>
    </div>
</template>
<script>
import ProfileCardComponent from './ProfileCardComponent.vue';
import ProfileSlotsComponent from './ProfileSlotsComponent.vue';
import { getUser, updateBothFollow, updateBlockedUsers } from '../services/user.service';
import router from '../router';
import { mapMutations } from 'vuex';
import store from '../store'

export default {
    components: {
        ProfileCardComponent,
        ProfileSlotsComponent
    },
    data() {
        return {
            isYourProfile: true,
            isFollowed: null,
            isHovering: false,
            isBlocked: false,
            user: null,
            userCloud: null
        }
    },
    methods: {
        async getUserService() {
            try {
                const res = await getUser(this.$route.params.username);
                if(!res) {
                    router.push('/404');
                }
                this.user = res;
                this.user.joinDate = new Date(this.user.joinDate);
            } catch (error) {
                console.error('Error in getUser:', error);
            }
        },
        async updateFollowersService() {
            try {
                await updateBothFollow(store.state.data.user.user.login, this.$route.params.username);
                await this.getUserFromCloudService();
                await this.reLogUser(this.userCloud);
                this.isFollowed = !this.isFollowed;
            } catch (error) {
                console.error('Error in followUser:', error);
            }
        },
        checkIfFollowed() {
            console.log(store.state.data.user.user.following)
            if (store.state.data.user.user.following.includes(this.$route.params.username)) {
                this.isFollowed = true;
            } else {
                this.isFollowed = false;
            }
        },
        checkIfProfile() {
            if (store.state.data.user.user.login === this.$route.params.username) {
                this.isYourProfile = true;
            } else {
                this.isYourProfile = false;
            }
        },
        checkIfBlocked() {
            if (store.state.data.user.user.blockedUsers.includes(this.$route.params.username)) {
                this.isBlocked = true;
            } else {
                this.isBlocked = false;
            }
        },
        async getUserFromCloudService() {
            try {
                const res = await getUser(store.state.data.user.user.login);
                this.userCloud = res;
                this.user.joinDate = new Date(this.user.joinDate);
            } catch (error) {
                console.error('Error in getUser:', error);
            }
        },
        async updateBlockedUsersService() {
            try {
                await updateBlockedUsers(store.state.data.user.user.login, this.$route.params.username);
                await this.getUserFromCloudService();
                await this.reLogUser(this.userCloud);
                this.isBlocked = !this.isBlocked;
            } catch (error) {
                console.error('Error in updateBlockedUsersService:', error);
            }
        },
        ...mapMutations(['reLogUser'])
    },
    mounted() {
        this.getUserService();
        this.checkIfFollowed();
        this.checkIfProfile();
        this.checkIfBlocked();
        this.getUserFromCloudService();
    },
    watch: {
        '$route.params.username': function() {
            this.user = null;
            this.getUserService();
            this.checkIfFollowed();
            this.checkIfProfile();
            this.checkIfBlocked();
        },
    }

}
</script>
<style lang="scss">
.Profile {
    min-height: 150vh;
    border-left:1px solid #e0e0e0;
    border-right:1px solid #e0e0e0;
}
</style>