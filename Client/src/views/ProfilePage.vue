<template>
    <div class="Profile">
        <div class="profileComponent" v-if="user && posts && likedPosts && replies && isFollowed !== null && isBlocked !== null">
            <ProfileCardComponent 
                :isYourProfile="isYourProfile" 
                :isFollowed="isFollowed" 
                :isHovering="isHovering" 
                :isBlocked="isBlocked" 
                :user="user" 
                :postsLength="postsLength"
                :updateFollowers="updateFollowersService"
                :updateBlockedUsers="updateBlockedUsersService"/>
            <ProfileSlotsComponent 
                :isYourProfile="isYourProfile" 
                :isFollowed="isFollowed" 
                :user="user" 
                :posts="posts"
                :likedPosts="likedPosts"
                :replies="replies"
                @tab-change="onTabChange"/>
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
import { getUsersPosts, getAllLikedPosts, getAllReplies } from '../services/post.service';
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
            likedPosts: null,
            replies: null,
            seenPostsIds: [],
            seenLikedPostsIds: [],
            seenRepliesIds: [],
            seenPostsIds: [],
            userCloud: null,
            postsLength: null,
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
                this.getAllLikedPostsService();
                this.getAllRepliesService();
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async updateFollowersService() {
            try {
                await updateBothFollow(store.state.data.user.user.login, this.$route.params.username);
                await this.getUserFromCloudService();
                this.reLogUser(this.userCloud);
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
                this.reLogUser(this.userCloud);
                this.isBlocked = !this.isBlocked;
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getUsersPostService(lazyLoad = false) {
            const seenIDs = (lazyLoad) ? this.seenPostsIds : [];
            try {
                const res = await getUsersPosts(this.user.login, seenIDs);
                res.forEach(post => {
                    post.date = new Date(post.date);
                    this.seenPostsIds.push(post._id);
                });

                if(!lazyLoad) {
                    this.posts = [res]
                } else {
                    if(res.length !== 0){
                        this.posts = [...this.posts, res]
                    }
                }

                this.postsLength = this.posts.flat().length;
            
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getAllLikedPostsService(lazyLoad = false) {
            const seenIDs = (lazyLoad) ? this.seenLikedPostsIds : [];
            try {
                const res = await getAllLikedPosts(this.user.login, seenIDs);
                
                res.forEach(post => {
                    post.date = new Date(post.date);
                    this.seenLikedPostsIds.push(post._id);
                });

                if(!lazyLoad) {
                    this.likedPosts = [res]
                } else {
                    if(res.length !== 0){
                        this.likedPosts = [...this.likedPosts, res]
                    }
                }

            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getAllRepliesService(lazyLoad = false) {
            const seenIDs = (lazyLoad) ? this.seenRepliesIds : [];
            try {
                const res = await getAllReplies(this.user.login, seenIDs);
                
                res.forEach(post => {
                    post.date = new Date(post.date);
                    this.seenRepliesIds.push(post._id);
                });

                if(!lazyLoad) {
                    this.replies = [res]
                } else {
                    if(res.length !== 0) {
                        this.replies = [...this.replies, res]
                    }
                }

            } catch (error) {
                router.push('/errorpage');
            }
        },
        onTabChange(tab) {
            if(tab === 1) {
                this.getUsersPostService(true);
            } else if(tab === 2) {
                this.getAllRepliesService(true);
            } else if(tab === 3) {
                this.getAllLikedPostsService(true);
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
            this.posts = null;
            this.likedPosts = null;
            this.replies = null;
            this.seenPostsIds = [];
            this.seenLikedPostsIds = [];
            this.seenRepliesIds = [];
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