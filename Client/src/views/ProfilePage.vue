<template>
    <div class="Profile">
        <div class="profileComponent" v-if="user && isFollowed !== null && posts">
            <ProfileCardComponent 
                :isYourProfile="isYourProfile" 
                :isFollowed="isFollowed" 
                :isHovering="isHovering" 
                :isBlocked="isBlocked" 
                :user="user" 
                :postsLength="posts.length"
                :updateFollowers="updateFollowersService"
                :updateBlockedUsers="updateBlockedUsersService"/>
            <ProfileSlotsComponent :isYourProfile="isYourProfile" :isFollowed="isFollowed" :user="user" :posts="posts"/>
        </div>
        <div class="profile-loader" v-else>
            <LoaderComponent/>
        </div>
    </div>
</template>
<script>
import ProfileCardComponent from '../components/ProfileCardComponent.vue';
import ProfileSlotsComponent from '../components/ProfileSlotsComponent.vue';
import LoaderComponent from '../components/LoaderComponent.vue';
import { getUser, updateBothFollow, updateBlockedUsers } from '../services/user.service';
import { getUsersPosts } from '../services/post.service';
import router from '../router';
import { mapMutations } from 'vuex';
import store from '../store'

export default {
    components: {
        ProfileCardComponent,
        ProfileSlotsComponent,
        LoaderComponent
    },
    data() {
        return {
            isYourProfile: true,
            isFollowed: null,
            isHovering: false,
            isBlocked: false,
            user: null,
            posts: null,
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
                this.getUsersPostService();
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async updateFollowersService() {
            try {
                await updateBothFollow(store.state.data.user.user.login, this.$route.params.username);
                await this.getUserFromCloudService();
                await this.reLogUser(this.userCloud);
                this.isFollowed = !this.isFollowed;
            } catch (error) {
                router.push('/errorpage');
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
                router.push('/errorpage');
            }
        },
        async updateBlockedUsersService() {
            try {
                await updateBlockedUsers(store.state.data.user.user.login, this.$route.params.username);
                await this.getUserFromCloudService();
                await this.reLogUser(this.userCloud);
                this.isBlocked = !this.isBlocked;
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getUsersPostService() {
            try {
                const res = await getUsersPosts(this.user?.login);

                res.forEach(post => {
                    post.date = new Date(post.date);
                });

                this.posts = res.reverse();
            } catch (error) {
                console.log(error);
                router.push('/errorpage');
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
    },

}
</script>
<style lang="scss">
.Profile {
    min-height: 150vh;
    border-left:1px solid #e0e0e0;
    border-right:1px solid #e0e0e0;
}
.profile-loader {
    width: 600px;
}
</style>