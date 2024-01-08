<template>
    <div class="Explore">
        <div class="explore-nav">
            <v-text-field v-model="text" variant="solo" placeholder="What are you going to search for hmm?"/>
            <v-btn class="explore-nav-button" icon="mdi-magnify" color="#582b5a" @click="onSearch"></v-btn>
        </div>
        <div v-if="posts && users">
            <ExploreSlotsComponent :posts="posts" :users="users"/>
        </div>
    </div>
</template>
<script>
import ExploreSlotsComponent from './ExploreSlotsComponent.vue';
import { getPostsExplore } from '../services/post.service';
import { getUsersExplore } from '../services/user.service';
import router from '../router';
import store from '../store';

export default {
    name: 'ExploreComponent',
    components: {
        ExploreSlotsComponent
    },
    data() {
        return {
            posts: null,
            users: null,
            seenPostsIds: [],
            seenUsersIds: [],
            type: this.$route.query.y || '',
            text: this.$route.query.q || ''
        }
    },
    methods: {
        async getPostsExploreService(lazyLoad = false) {
            const seenIDs = (lazyLoad) ? this.seenUsersIds : [];
            try {
                const response = await getPostsExplore(store.state.data.user.user.login, this.type, this.text, seenIDs);
                if(response.length !== 0) {
                    response.forEach(post => {
                        this.seenPostsIds.push(post._id);
                    });
                    response.forEach(post => {
                        post.date = new Date(post.date);
                    });
                }
                this.posts = response;
            } catch (error) {
                console.error('Error in getPostsExploreService:', error);
            }
        },
        async getUsersExploreService(lazyLoad = false) {
            const seenIDs = (lazyLoad) ? this.seenUsersIds : [];
            try {
                const response = await getUsersExplore(store.state.data.user.user.login,this.text, seenIDs);
                response.forEach(user => {
                    this.seenUsersIds.push(user._id);
                });
                this.users = response;
            } catch (error) {
                console.error('Error in getUsersExploreService:', error);
            }
        },
        onSearch() {
            if(this.type === '') {
                router.push(`/explore?q=${this.text}`)
                this.getPostsExploreService();
                this.getUsersExploreService();
            } else {
                router.push(`/explore?q=${this.text}&f=${this.type}`)
            }
        }
    },
    mounted() {
        if(this.text !== '') {
            this.getPostsExploreService();
            this.getUsersExploreService();
        }
    },
}
</script>
<style lang="scss">
.Explore {
    width: 600px;
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
}
</style>