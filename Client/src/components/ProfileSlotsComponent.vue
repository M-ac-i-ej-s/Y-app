<template>
    <div class="profileSlot">
        <v-tabs class="profile-slot-tabs" v-model="tabs" color="purple-darken-2" grow>
            <v-tab :value="1">
                <span class="profile-slot-tabs-label">
                    Posts
                </span>
            </v-tab>

            <v-tab :value="2">
                <span class="profile-slot-tabs-label">
                    Replies
                </span>
            </v-tab>

            <v-tab :value="3">
                <span class="profile-slot-tabs-label">
                    Likes
                </span>
            </v-tab>
        </v-tabs>
        <v-window class="profile-slot-windows" v-model="tabs">
            <v-window-item :value="1">
                <div class="profile-slot-windows-post" v-if="posts">
                    <div v-if="posts.length > 0">
                        <div v-for="post in posts" :key="post._id" >
                            <PostComponent v-if="!post.isReply" :post="post" :user="user"/>
                        </div>  
                    </div>
                    <div v-else>
                        <ExeptionComponent text="posts"/>
                    </div>    
                </div>
                <div v-else>
                    ...loading
                </div>
            </v-window-item>
            <v-window-item :value="2">
                <div class="profile-slot-windows-post" v-if="replies">
                    <div v-if="replies.length > 0">
                        <div v-for="post in replies" :key="post._id">
                            <PostComponent :post="post" :user="user"/>
                        </div>
                    </div>
                    <div v-else>
                        <ExeptionComponent text="replies"/>
                    </div>
                </div>
                <div v-else>
                    ...loading
                </div>
            </v-window-item>
            <v-window-item :value="3">
                <div class="profile-slot-windows-post" v-if="likedPosts">
                    <div v-if="likedPosts.length > 0">
                        <div v-for="post in likedPosts" :key="post._id">
                            <PostComponent :post="post" :user="user"/>
                        </div>
                    </div>
                    <div v-else>
                        <ExeptionComponent text="likes"/>
                    </div>    
                </div>
                <div v-else>
                    ...loading
                </div>
            </v-window-item>
        </v-window>
    </div>
</template>
<script>
import { getUsersPosts, getAllLikedPosts, getAllReplies } from '../services/post.service';
import PostComponent from './PostComponent.vue';
import router from '../router';
import ExeptionComponent from './ExeptionComponent.vue';

export default {
    components: {
        PostComponent,
        ExeptionComponent
    },
    props: {
        user: {
            type: [Object, null],
            required: true
        },
        isYourProfile: {
            type: Boolean,
            required: true
        },
        isFollowed: {
            type: Boolean,
            required: true
        },
    },
    data() {
      return {
        tabs: null,
        posts: null,
        likedPosts: null,
        replies: null
      }
    },
    methods: {
        async getUsersPostService() {
            try {
                const res = await getUsersPosts(this.user?.login);
                console.log(res)

                res.forEach(post => {
                    post.date = new Date(post.date);
                });

                this.posts = res.reverse();
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getAllLikedPostsService() {
            try {
                const res = await getAllLikedPosts(this.user?.login);
                
                res.forEach(post => {
                    post.date = new Date(post.date);
                });

                this.likedPosts = res.reverse();
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getAllRepliesService() {
            try {
                const res = await getAllReplies(this.user?.login);
                
                res.forEach(post => {
                    post.date = new Date(post.date);
                });

                this.replies = res.reverse();
            } catch (error) {
                router.push('/errorpage');
            }
        },
    },
    mounted() {
        this.getUsersPostService();
        this.getAllLikedPostsService();
        this.getAllRepliesService();
    },
    watch: {
        '$route.params.username': function() {
            this.getUsersPostService();
            this.getAllLikedPostsService();
            this.getAllRepliesService();
        }
    }  
  }
</script>
<style lang="scss">
.profileSlot {
    padding: 175px 0 0 0;
    @media screen and (max-width: 850px) {
        padding: 250px 0 0 0;
    }
    .profile-slot-tabs {
        width: 600px;
        border-bottom: 1px solid #e0e0e0;
        @media screen and (max-width: 850px) {
            width: 100%;
        }
        .profile-slot-tabs-label {
            font-weight: 700;
        }
    }
    .profile-slot-windows {
        width: 600px;
        @media screen and (max-width: 850px) {
            width: 100%;
        }
        .profile-slot-windows-post {
            @media screen and (max-width: 850px) {
                display: flex;
                flex-direction: column;
            }
        }
    }
}    
</style>