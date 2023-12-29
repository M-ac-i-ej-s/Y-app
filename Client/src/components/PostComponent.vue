<template>
        <div class="postComponent" v-if="post" @click="onClick">
            <div class="post-component-values">
                <div class="post-component-values-container">
                    <div class="post-component-values-container-image">
                        <img class="post-component-values-container-image-value" src="../assets/dummy-avatar.png" alt="">
                    </div>
                    <div class="post-component-values-container-user-info">
                        <div class="post-component-values-container-user-info-values">
                            <div>
                                <span class="post-component-values-container-user-info-values-login">{{ user?.login }}</span>
                                <v-icon icon="mdi-circle-small"></v-icon>
                                <span class="post-component-values-container-user-info-values-date">{{ post.date.toLocaleString('en-us', { month: 'short' }) }} {{ post.date.getDate() }} {{ post.date.getFullYear() }}</span>
                            </div>
                            <div>
                                <v-icon class="post-component-values-container-user-info-values-more" icon="mdi-delete-outline" @click="deletePost"></v-icon>
                            </div>
                        </div>
                        <div>
                            {{ post.text }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="post-component-stats">
                <div class="post-component-stats-values" @click="onLike">
                    <v-icon v-if="!isLikedByUser" icon="mdi-heart-outline" class="post-component-stats-values-icon heart"/>
                    <v-icon v-else icon="mdi-heart" class="post-component-stats-values-icon heart liked" color="red"/>
                    <span>{{ numLikes }}</span>
                </div>
                <div class="post-component-stats-values">
                    <v-icon icon="mdi-comment-outline" class="post-component-stats-values-icon comment"/>
                    <span>{{ post.replies.length }}</span>
                </div>
                <div class="post-component-stats-values">
                    <v-icon icon="mdi-repeat-variant" class="post-component-stats-values-icon repeat"/>
                    <span>{{ post.repeats.length }}</span>
                </div>
                <div class="post-component-stats-values" @click="onSave">
                    <v-icon v-if="!isSavedByUser" icon="mdi-bookmark-outline" class="post-component-stats-values-icon bookmark"/>
                    <v-icon v-else icon="mdi-bookmark" class="post-component-stats-values-icon bookmark" color="#add8e6"/>
                    <span>{{ numSaves }}</span>
                </div>    
            </div>
        </div>
</template>
<script>
import { getUser, updateLikedPosts, updateSavedPosts } from '../services/user.service';
import { deletePost,likePost, savePost, updateReplies  } from '../services/post.service';
import { reloadPage } from '../utils/utils';
import router from '../router';
import Swal from 'sweetalert2'
import store from '../store';

export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            user: null,
            isLikedByUser: false,
            isSavedByUser: false,
            numLikes: this.post.likes.length,
            numSaves: this.post.saves.length
        }
    },
    methods: {
        async getUser() {
            try {
                const res = await getUser(this.post.user);
                this.user = res;
            } catch (error) {
                console.error('Error in getUser:', error);
            }
        },
        deletePost() {
            Swal.fire({
                title: "Delete this post?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete"
                }).then( async (result) => {
                if (result.isConfirmed) {
                    if(this.post.isReply) {
                        try {
                            await updateReplies(this.post._id);
                        } catch (error) {
                            console.error('Error in deletePost:', error);
                        }
                    }

                    await deletePost(this.post._id);

                    Swal.fire({
                        title: "The post has been deleted",
                        icon: "success"
                    });
                    reloadPage();
                }
                });
        },
        checkIfLiked() {
            this.post.likes.forEach(like => {
                if (like === store.state.data.user.user.login) {
                    this.isLikedByUser = true;
                }
            });
        },
        checkIfSaved() {
            this.post.saves.forEach(save => {
                if (save === store.state.data.user.user.login) {
                    this.isSavedByUser = true;
                }
            });
        },
        onLike() {
            this.isLikedByUser = !this.isLikedByUser;

            if(this.isLikedByUser) {
                this.numLikes++;
            } else {
                this.numLikes--;
            }

            try {
                updateLikedPosts(store.state.data.user.user.login, this.post._id);
            } catch (error) {
                console.error('Error in onLike:', error);
            }

            try {
                likePost(this.post._id, store.state.data.user.user.login);
            } catch (error) {
                console.error('Error in onLike:', error);
            }
        },
        onSave() {
            this.isSavedByUser = !this.isSavedByUser;

            if(this.isSavedByUser) {
                this.numSaves++;
            } else {
                this.numSaves--;
            }

            try {
                updateSavedPosts(store.state.data.user.user.login, this.post._id);
            } catch (error) {
                console.error('Error in onSave:', error);
            }

            try {
                savePost(this.post._id, store.state.data.user.user.login);
            } catch (error) {
                console.error('Error in onSave:', error);
            }
        },
        onClick() {
            router.push('/' + this.post.user + '/' + this.post._id);
        }
    },
    mounted() {
        this.getUser();

        this.checkIfLiked();
        this.checkIfSaved();
    }
}

</script>
<style lang="scss" scoped>
.postComponent {
    border-bottom: 1px solid #e0e0e0;
    padding: 20px;
    transition: 0.2s ease;
    cursor: pointer;
    @media screen and (max-width: 700px) {
        width: 100%;
    }
    &:hover {
        background-color: #e9e9e9;
    }
    .post-component-values {
        display: flex;
        justify-content: space-between;
        .post-component-values-container {
            display: flex;
            width: 100%;
            .post-component-values-container-image {
                width: 55px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                .post-component-values-container-image-value {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .post-component-values-container-user-info {
                padding-left: 10px;
                width: 100%;
                .post-component-values-container-user-info-values {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .post-component-values-container-user-info-values-login {
                        font-weight: 600;
                        font-size: 14px;
                    }
                    .post-component-values-container-user-info-values-date {
                        font-weight: 400;
                        font-size: 14px;
                    }
                    .post-component-values-container-user-info-values-more {
                        border-radius: 90px;
                        cursor: pointer;
                        transition: 0.3s ease;
                        color: gray;
                        &:hover {
                            color: #db2020;
                        }
                    }
                }
            }
        }
    }
    .post-component-stats {
        display: flex;
        justify-content: space-around;
        padding: 10px 0 0 0;
        .post-component-stats-values {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 14px;
            font-weight: 400;
            color: gray;
            cursor: pointer;
            .post-component-stats-values-icon {
                transition: 0.2s ease;
                border-radius: 50%;
                &.heart:hover {
                    color: #ff0000;
                }
                &.comment:hover {
                    color: #adff2f;
                }
                &.bookmark:hover {
                    color: #add8e6;
                }
                &.repeat:hover {
                    color: #99a127;
                }
            }
        }
    }
}
</style>