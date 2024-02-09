<template>
    <div class="Explore">
        <div class="explore-nav">
            <v-text-field v-model="text" variant="solo" placeholder="What are you going to search for hmm?"/>
            <v-btn class="explore-nav-button" icon="mdi-magnify" color="#582b5a" @click="onSearch"></v-btn>
        </div>
        <div v-if="this.$route.query.q !== undefined">
            <div v-if="posts && users">
                <ExeptionComponent v-if="posts[0].length === 0 && users[0].length === 0" text="users or posts with that text"/>
                <ExploreSlotsComponent v-else :posts="posts" :users="users" :switchRoutes="switchRoutes"/>
            </div>
            <div v-else>
                <LoaderComponent/>
            </div>
        </div>
        <div v-else class="explore-welcome">
            <v-icon class="explore-welcome-icon" icon="mdi-arrow-up-bold-outline"/>
            <span class="explore-welcome-text">Start looking, maybe you will find something awasome!</span>
        </div>
    </div>
</template>
<script>
import ExploreSlotsComponent from '../components/ExploreSlotsComponent.vue';
import ExeptionComponent from '../components/ExeptionComponent.vue';
import { getPostsExplore } from '../services/post.service';
import { getUsersExplore } from '../services/user.service';
import router from '../router';
import store from '../store';
import LoaderComponent from '../components/LoaderComponent.vue';

export default {
    name: 'ExplorePage',
    components: {
        ExploreSlotsComponent,
        LoaderComponent,
        ExeptionComponent
    },
    data() {
        return {
            posts: null,
            users: null,
            seenPostsTopIds: [],
            seenPostsLatestIds: [],
            seenUsersIds: [],
            type: this.$route.query.y || '',
            text: this.$route.query.q || ''
        }
    },
    methods: {
        async getPostsExploreService(lazyLoad = false) {
            const seenIDs = (lazyLoad) ? ((this.type === 'live') ? this.seenPostsLatestIds : this.seenPostsTopIds)  : [];
            try {
                const response = await getPostsExplore(store.state.data.user.user.login, this.type, this.text, seenIDs);
                if(response.length !== 0) {
                    response.forEach(post => {
                        if(this.type === 'live') {
                            if(!this.seenPostsLatestIds.includes(post._id)) {
                                this.seenPostsLatestIds.push(post._id);
                            }
                        } else if(this.type === '') {
                            if(!this.seenPostsTopIds.includes(post._id)) {
                                this.seenPostsTopIds.push(post._id);
                            }
                        }
                        post.date = new Date(post.date);
                    });
                    if(!lazyLoad) {
                        this.posts = [response]
                    } else {
                        this.posts = [...this.posts, response]
                    }
                } else {
                    this.posts = [[]]
                }
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getUsersExploreService(lazyLoad = false) {
            const seenIDs = (lazyLoad) ? this.seenUsersIds : [];
            try {
                const response = await getUsersExplore(store.state.data.user.user.login,this.text, seenIDs);
                response.forEach(user => {
                    if(!this.seenUsersIds.includes(user._id)) {
                        this.seenUsersIds.push(user._id);
                    }
                });
                if(!lazyLoad) {
                    this.users = [response]
                } else {
                    this.users = [...this.users, response]
                }
            } catch (error) {
                router.push('/errorpage');
            }
        },
        onSearch() {
            if(this.type === '') {
                window.addEventListener('scroll', this.checkScroll);
                router.push(`/explore?q=${this.text}`)
            } else {
                router.push(`/explore?q=${this.text}&f=${this.type}`)
            }
        },
        switchRoutes(slot) {
            if(slot === 'top') {
                router.push(`/explore?q=${this.text}`)
            } else if(slot === 'latest') {
                router.push(`/explore?q=${this.text}&y=live`)
            } else if(slot === 'people') {
                router.push(`/explore?q=${this.text}&y=people`)
            }
        },
        checkScroll() {
            const maxScrollPosition = document.documentElement.scrollHeight - window.innerHeight;
            if (window.scrollY === maxScrollPosition) {
                if(this.type === '' || this.type === 'live') {
                    this.getPostsExploreService(true);
                } else if(this.type === 'people') {
                    this.getUsersExploreService(true);
                }
            }
        },
    },
    mounted() {
        if(this.$route.query.q !== undefined) {
            window.addEventListener('scroll', this.checkScroll);
            this.getPostsExploreService();
            this.getUsersExploreService();
        }
    },
    unmounted() {
        this.posts = null;
        this.users = null;
        this.seenPostsTopIds = [];
        this.seenPostsLatestIds = [];
        this.seenUsersIds = [];
        window.removeEventListener('scroll', this.checkScroll);
    },  
    watch: {
        '$route.query.q': function() {
            if(this.$route.query.q !== undefined) {
                this.text = this.$route.query.q;
                this.getPostsExploreService();
                this.getUsersExploreService();
            } else {
                this.text = '';
                this.posts = null;
                this.users = null;
                this.seenPostsIds = [];
                this.seenUsersIds = [];
            }
        },
        '$route.query.y': function() {
            this.posts = null;
            this.seenPostsLatestIds = [];
            this.seenPostsTopIds = [];
            this.seenUsersIds = [];
            this.type = this.$route.query.y || '';
            this.getPostsExploreService();
        }
    },
}
</script>
<style lang="scss">
.Explore {
    width: 600px;
    min-height: 150vh;
    border-left:1px solid #e0e0e0;
    border-right:1px solid #e0e0e0;
    @media screen and (max-width: 850px) {
        width: 450px;
    }
    .explore-nav {
        display: flex;
        gap: 20px;
        padding: 10px 20px 0px 20px;
        .explore-nav-button {
            margin: 5px 0 0 0;
        }
    }
    .explore-results {
        .explore-results-people {
            .explore-results-people-label {
                padding: 10px 20px 10px 20px;
                font-size: 25px;
                font-weight: 700;
            }
        }
        .explore-results-posts {
            .explore-results-posts-label {
                padding: 10px 20px 10px 20px;
                font-size: 25px;
                font-weight: 700;
            }
        }
    }
    .explore-welcome {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 10px 100px 10px 100px;
        .explore-welcome-icon {
            font-size: 100px;
            color: #582b5a;
        }
        .explore-welcome-text {
            font-size: 35px;
            font-weight: 700;
        }
    }
}
</style>