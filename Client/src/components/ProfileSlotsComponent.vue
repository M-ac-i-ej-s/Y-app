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
                <div v-if="posts">
                    <PostComponent v-for="post in posts" :key="post._id" :post="post" :user="user"/>
                </div>
                <div v-else>
                    ...loading
                </div>
            </v-window-item>
            <v-window-item :value="2">
                <v-card>
                <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </v-card-text>
                </v-card>
            </v-window-item>
            <v-window-item :value="3">
                <v-card>
                <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </v-card-text>
                </v-card>
            </v-window-item>
        </v-window>
    </div>
</template>
<script>
import { getUsersPosts } from '../services/post.service';
import PostComponent from './PostComponent.vue';
import _ from 'lodash';

export default {
    components: {
    PostComponent,
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
        posts: null
      }
    },
    methods: {
        async getUsersPostService() {
            try {
                const res = await getUsersPosts(this.user?._id);

                res.forEach(post => {
                    post.date = new Date(post.date);
                });

                this.posts = res;
            } catch (error) {
                console.error('Error in getUsersPostService:', error);
            }
        },
    },
    mounted() {
        this.getUsersPostService();
    },  
  }
</script>
<style lang="scss">
.profileSlot {
    padding: 175px 0 0 0;
    .profile-slot-tabs {
        width: 600px;
        border-bottom: 1px solid #e0e0e0;
        .profile-slot-tabs-label {
            font-weight: 700;
        }
    }
    .profile-slot-windows {
        width: 600px;
    }
}    
</style>