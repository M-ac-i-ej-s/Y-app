<template>
    <div>
    <div class="profileComponent" v-if="user">
        <ProfileCardComponent :isYourProfile="isYourProfile" :isFollowed="isFollowed" :isHovering="isHovering" :user="user" :updateFollowers="updateFollowersService"/>
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
import { getUser, updateBothFollow } from '../services/user.service';
import { reloadPage } from '../utils/utils';
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
            isFollowed: true,
            isHovering: false,
            user: null,
            userCloud: null
        }
    },
    methods: {
        async getUserService() {
            try {
                const res = await getUser(this.$route.params.username);
                console.log(res)
                this.user = res;
                this.user.joinDate = new Date(this.user.joinDate);
            } catch (error) {
                console.error('Error in getUser:', error);
            }
        },
        async updateFollowersService() {
            try {
                await updateBothFollow(store.state.data.user.user.login, this.$route.params.username);
                await this.reLogUser(this.userCloud);
                this.isFollowed = !this.isFollowed;
            } catch (error) {
                console.error('Error in followUser:', error);
            }
        },
        checkIfFollowed() {
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
        async getUserFromCloudService() {
            try {
                const res = await getUser(store.state.data.user.user.login);
                this.userCloud = res;
                this.user.joinDate = new Date(this.user.joinDate);
            } catch (error) {
                console.error('Error in getUser:', error);
            }
        },
        ...mapMutations(['reLogUser'])
    },
    mounted() {
        this.getUserService();
        this.checkIfFollowed()
        this.checkIfProfile()
        this.getUserFromCloudService()
    },
    watch: {
        '$route.params.username': function() {
            this.user = null;
            this.getUserService();
            this.checkIfFollowed()
            this.checkIfProfile()
        },
    }

}
</script>
<style lang="scss">

</style>