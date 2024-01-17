<template>
    <div class="bookmarksComponent">
        <div class="bookmark-component">
            <div class="bookmark-component-info">
                <span class="bookmark-component-info-label">Bookmarks</span>
                <span class="bookmark-component-info-login">test</span>
            </div>
            <div class="bookmark-component-icon" @click="clearAllBookmarks">
                <v-icon icon="mdi-forum-remove-outline" size="x-large"/>
                <v-tooltip activator="parent" location="bottom">Clear all bookmarks</v-tooltip>
            </div>
        </div>
        <div v-if="savedPosts">
            <div v-if="savedPosts.length > 0">
                <PostComponent v-for="post in savedPosts" :key="post._id" :post="post" />
            </div>
            <div v-else>
                <ExeptionComponent text="bookmarks"/>
            </div>  
        </div>
        <div v-else>
            <LoaderComponent/>
        </div>  
    </div>
</template>
<script>
import { getAllSavedPosts, savePost } from '../services/post.service';
import Swal from 'sweetalert2';
import PostComponent from '../components/PostComponent.vue';
import ExeptionComponent from '../components/ExeptionComponent.vue';
import LoaderComponent from '../components/LoaderComponent.vue';
import store from '../store';
import router from '../router';

export default {
    name: 'BookmarksPage',
    components: {
        PostComponent,
        ExeptionComponent,
        LoaderComponent
    },
    data() {
        return {
            savedPosts: null
        }
    },
    methods: {
        async getAllSavedPostsService() {
            try {
                const res = await getAllSavedPosts(store.state.data.user.user.login);

                res.forEach(post => {
                    post.date = new Date(post.date);
                });

                this.savedPosts = res;
            } catch (error) {
                router.push('/errorpage');
            }
        },
        clearAllBookmarks() {
            Swal.fire({
                title: "Do you want to clear all your bookmarks?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Clear all bookmarks"
                }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        this.savedPosts.forEach(async post => {
                            await savePost(post._id, store.state.data.user.user.login);
                        });
                        this.savedPosts = [];
                    } catch (error) {
                        router.push('/errorpage');
                    
                    }
                    Swal.fire({
                        title: "Cleared !",
                        icon: "success"
                    });
                }
                });
        }
    },
    mounted() {
        this.getAllSavedPostsService();
    }
}
</script>
<style lang="scss">
.bookmarksComponent {
    width: 600px;
    min-height: 150vh;
    border-left:1px solid #e0e0e0;
    border-right:1px solid #e0e0e0;
    @media screen and (max-width: 850px) {
        width: 450px;
    }
    .bookmark-component {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px 10px 20px;
        .bookmark-component-info {
            display: flex;
            flex-direction: column;
            .bookmark-component-info-label {
                font-size: 25px;
                font-weight: 700;
            }
            .bookmark-component-info-login {
                font-size: 15px;
                color: grey;
            } 
        }
        .bookmark-component-icon {
            padding: 10px;
            transition: 0.2s ease;
            cursor: pointer;
            &:hover {
                background-color: #e9e9e9;
                border-radius: 90px;
            } 
        }
    }
}    
</style>