<template>
    <div class="ExploreSlots">
        <v-tabs v-model="tabs" color="purple-darken-2" grow>
            <v-tab :value="1" @click="switchRoutesSlots">
                <span class="explore-slots-tab-value">
                    Top
                </span>
            </v-tab>

            <v-tab :value="2" @click="switchRoutesSlots">
                <span class="explore-slots-tab-value">
                    Latest
                </span>
            </v-tab>

            <v-tab :value="3" @click="switchRoutesSlots">
                <span class="explore-slots-tab-value">
                    People
                </span>
            </v-tab>
        </v-tabs>
        <v-window v-model="tabs">
            <v-window-item :value="1">
                <div v-if="posts[0].length > 0 || users[0].length > 0" class="explore-slots-top">
                    <div v-if="users[0].length > 0" class="explore-slots-top-people">
                        <div class="explore-slots-top-people-value">
                            People
                        </div>
                        <div v-for="user in users[0].slice(0,3)" :key="user._id">
                            <ProfileShowcaseComponent :user="user"/>
                        </div>
                    </div>
                    <div class="explore-slots-top-posts">
                        <div class="explore-slots-top-posts-value">
                            Posts
                        </div>
                        <div v-for="(pages, index) in posts" :key="index">
                            <div v-for="post in pages" :key="post._id">
                                <PostComponent :post="post" />
                            </div>
                            <div class="explore-post-exaption" v-if="pages.length < 10">
                                There are no more posts
                                <v-icon icon="mdi-cancel" color="#582b5a"/>
                            </div>
                            <div v-if="pages.length === 10 && posts[posts.length-1] === pages">
                                <LoaderComponent/>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <ExeptionComponent text="posts or users with that phrase"/>
                </div>
            </v-window-item>
            <v-window-item :value="2">
                <div v-if="posts[0].length > 0">
                    <div v-for="(pages, index) in posts" :key="index">
                        <div v-for="post in pages" :key="post._id">
                            <PostComponent :post="post" />
                        </div>
                        <div class="explore-post-exaption" v-if="pages.length < 10">
                            There are no more posts
                            <v-icon icon="mdi-cancel" color="#582b5a"/>
                        </div>
                        <div v-if="pages.length === 10 && posts[posts.length-1] === pages">
                            <LoaderComponent/>
                        </div>
                    </div> 
                </div>
                <div v-else>
                    <ExeptionComponent text="posts yet"/>
                </div>
            </v-window-item>
            <v-window-item :value="3">
                <div v-if="users[0].length > 0">
                    <div v-for="(pages, index) in users" :key="index">
                        <div v-for="user in pages" :key="user._id">
                            <ProfileShowcaseComponent :user="user"/>
                        </div>
                        <div class="explore-post-exaption" v-if="pages.length < 10">
                            There are no more users
                            <v-icon icon="mdi-cancel" color="#582b5a"/>
                        </div>
                        <div v-if="pages.length === 10 && posts[posts.length-1] === pages">
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
import ProfileShowcaseComponent from './ProfileShowcaseComponent.vue';
import PostComponent from './PostComponent.vue';
import ExeptionComponent from './ExeptionComponent.vue';
import LoaderComponent from './LoaderComponent.vue';

export default {
    name: 'ExploreSlotsComponent',
    components: {
        ProfileShowcaseComponent,
        PostComponent,
        ExeptionComponent,
        LoaderComponent
    },
    props: {
        users: {
            type: Array,
            required: true
        },
        posts: {
            type: Array,
            required: true
        },
        switchRoutes: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            tabs: null,
        }
    },
    methods: {
        switchRoutesSlots() {
            if(this.tabs === 1) {
                this.switchRoutes('top');
            } else if(this.tabs === 2) {
                this.switchRoutes('latest');
            } else if(this.tabs === 3) {
                this.switchRoutes('people');
            }
        },
    },
    mounted() {
        if(this.$route.query.y === '') {
            this.tabs = 1;
        } else if(this.$route.query.y === 'live') {
            this.tabs = 2;
        } else if(this.$route.query.y === 'people') {
            this.tabs = 3;
        } else {
            this.tabs = 1;
        }
    },
}
</script>
<style lang="scss">
.ExploreSlots {
    .explore-slots-tab-value {
        font-weight: 700;
    }
    .explore-slots-top {
        .explore-slots-top-people {
            .explore-slots-top-people-value {
                padding: 10px 20px 10px 20px; 
                font-size: 25px;
                font-weight: 700;
            }
        }
        .explore-slots-top-posts {
            .explore-slots-top-posts-value {
                padding: 10px 20px 10px 20px; 
                font-size: 25px;
                font-weight: 700;
            }
        }
    }
    .explore-post-exaption {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 30px 20px 30px 20px;
        font-size: 20px;
        font-weight: 700;
    }
}
</style>