<template>
    <div class="Home">
        <div class="home-writing">
            <div class="home-writing-info">
                <div class="home-writing-info-image">
                    <img class="home-writing-info-image-value" src="../assets/dummy-avatar.png" alt="">
                </div>
                <div class="home-writing-info-text">
                    <span class="home-writing-info-text-value" ref="text" role="textbox" placeholder="What is happening!?" contenteditable></span>
                </div>
            </div>
            <div class="home-writing-button">
                <v-btn class="home-writing-button-value" rounded="xl" color="#582b5a" @click="post">Post</v-btn>
            </div>
        </div>
        <div v-if="posts">
            <div v-if="posts[0].length > 0">
                <div v-for="(pages, index) in posts" :key="index">
                    <div v-for="post in pages" :key="post._id">
                        <PostComponent :post="post" />
                    </div>
                    <div class="home-exeption" v-if="pages.length < 10">
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
        </div>
        <div v-else>
            <LoaderComponent/>
        </div>
    </div>
</template>
<script>
import CreatingPostComponent from './CreatingPostComponent.vue';
import PostComponent from './PostComponent.vue';
import ExeptionComponent from './ExeptionComponent.vue';
import LoaderComponent from './LoaderComponent.vue';
import store from '../store';
import router from '../router';
import { reloadPage } from '../utils/utils';
import { createPost, getPostsByFollowedUsers } from '../services/post.service';

export default {
    name: 'HomeComponent',
    components: {
        CreatingPostComponent,
        PostComponent,
        ExeptionComponent,
        LoaderComponent
    },
    data() {
        return {
            userLogin: store.state.data.user.user.login,
            posts: null,
            seenIds: []
        }
    },
    methods: {
        post() {
            try {
                createPost(this.$refs.text.textContent, this.userLogin)
                    .then(() => {
                        reloadPage();
                    })
                    .catch((err) => {
                        router.push('/errorpage');
                    })
            } catch (err) {
                router.push('/errorpage');
            }
        },
        async getPostsByFollowedUsersService(lazyLoad = false) {
            const seenIDs = (lazyLoad) ? this.seenIds : [];
            try {
                const response = await getPostsByFollowedUsers(this.userLogin, seenIDs);
                console.log(response)
                if(response.length !== 0) {
                    response.forEach(post => {
                        if(!this.seenIds.includes(post._id)) {
                            this.seenIds.push(post._id);
                        }
                        post.date = new Date(post.date);
                    });
                    if(!lazyLoad) {
                        this.posts = [response]
                    } else {
                        this.posts = [...this.posts, response]
                    }
                } else {
                    if(!lazyLoad) {
                        this.posts = [[]]
                    }
                }
            } catch (err) {
                router.push('/errorpage');
            }
        },
        checkScroll() {
            const maxScrollPosition = document.documentElement.scrollHeight - window.innerHeight;
            if (window.scrollY === maxScrollPosition) {
                this.getPostsByFollowedUsersService(true);
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', this.checkScroll);
        this.getPostsByFollowedUsersService();
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.checkScroll);
    }
}
</script>
<style lang="scss">
.Home {
    min-height: 150vh;
    border-left:1px solid #e0e0e0;
    border-right:1px solid #e0e0e0;
    .home-writing {
        padding: 20px 10px 20px 10px;
        border-bottom: 1px solid #d3d3d3;
        .home-writing-info {
            display: flex;
            .home-writing-info-image {
                padding: 0 10px 0 10px;
                .home-writing-info-image-value {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
            }
            .home-writing-info-text {
                width: 500px;
                padding: 5px 0 0 0;
                .home-writing-info-text-value {
                    display: block;
                    padding: 5px;
                    width: 100%;
                    cursor: text;
                    min-height: 50px;
                    resize: both;
                    border: none;
                    outline: none;
                    font-size: 20px;
                    overflow: hidden;
                }
                .home-writing-info-text-value[contenteditable]:empty:before {
                    content: attr(placeholder);
                    color: #a9a9a9;
                }
            }
        }
        .home-writing-button {
            display: flex;
            justify-content: flex-end;
            padding: 20px 0 0 0;
            .home-writing-button-value {
                width: 100px;
                height: 40px;
                font-weight: 700;
            }
        }
    }
    .home-exeption {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 30px 20px 30px 20px;
        font-size: 20px;
        font-weight: 700;
    }
}
</style>