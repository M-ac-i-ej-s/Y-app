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
                <div class="profile-slot-windows-post" v-if="posts[0].length > 0">
                    <div v-for="(pages, index) in posts" :key="index">
                        <div v-for="post in pages" :key="post._id">
                            <PostComponent :post="post"/>
                        </div>
                        <div class="profile-slot-windows-post-exaption" v-if="pages.length < 10">
                            There are no more posts
                            <v-icon icon="mdi-cancel" color="#582b5a"/>
                        </div>
                        <div v-if="pages.length === 10 && posts[posts.length-1] === pages">
                            <LoaderComponent/>
                        </div>        
                    </div>
                </div>
                <div v-else>
                    <ExeptionComponent text="posts of that user"/>
                </div>
            </v-window-item>
            <v-window-item :value="2">
                <div class="profile-slot-windows-post" v-if="replies[0].length > 0">
                    <div v-for="(pages, index) in replies" :key="index">
                        <div v-for="post in pages" :key="post._id">
                            <PostComponent :post="post"/>
                        </div>
                        <div class="profile-slot-windows-post-exaption" v-if="pages.length < 10">
                            There are no more replies
                            <v-icon icon="mdi-cancel" color="#582b5a"/>
                        </div>
                        <div v-if="pages.length === 10 && replies[replies.length-1] === pages">
                            <LoaderComponent/>
                        </div>        
                    </div>
                </div>
                <div v-else>
                    <ExeptionComponent text="users with that login"/>
                </div>
            </v-window-item>
            <v-window-item :value="3">
                <div class="profile-slot-windows-post" v-if="likedPosts[0].length > 0">
                    <div v-for="(pages, index) in likedPosts" :key="index">
                        <div v-for="post in pages" :key="post._id">
                            <PostComponent :post="post"/>
                        </div>
                        <div class="profile-slot-windows-post-exaption" v-if="pages.length < 10">
                            There are no more liked posts
                            <v-icon icon="mdi-cancel" color="#582b5a"/>
                        </div>
                        <div v-if="pages.length === 10 && likedPosts[likedPosts.length-1] === pages">
                            <LoaderComponent/>
                        </div>        
                    </div>
                </div>
                <div v-else>
                    <ExeptionComponent text="users with that login"/>
                </div>
            </v-window-item>
        </v-window>
    </div>
</template>
<script>
import PostComponent from './PostComponent.vue';
import ExeptionComponent from './ExeptionComponent.vue';
import LoaderComponent from './LoaderComponent.vue';

export default {
    components: {
        PostComponent,
        ExeptionComponent,
        LoaderComponent,
    },
    props: {
        user: {
            type: [Object, null],
            required: true
        },
        posts: {
            type: Array,
            required: true
        },
        likedPosts: {
            type: Array,
            required: true
        },
        replies: {
            type: Array,
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
      }
    },
    methods: {
        checkScroll() {
            const maxScrollPosition = document.documentElement.scrollHeight - window.innerHeight;
            if (window.scrollY === maxScrollPosition) {
                this.$emit('tabChange', this.tabs)
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', this.checkScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.checkScroll);
    },
  }
</script>
<style lang="scss" scoped>
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
            .profile-slot-windows-post-exaption {
                display: flex;
                justify-content: center;
                gap: 10px;
                padding: 30px 20px 30px 20px;
                font-size: 20px;
                font-weight: 700;
            }
        }
    }
}    
</style>