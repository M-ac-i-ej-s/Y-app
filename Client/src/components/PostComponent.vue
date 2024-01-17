<template>
        <div :class="`postComponent ${isBlocked && 'blocked'}`" v-if="post && user" @click="redirectToPost">
            <div class="post-component-values">
                <div class="post-component-values-container">
                    <div class="post-component-values-container-image" @click.stop="redirectToProfile">
                        <img class="post-component-values-container-image-value" src="../assets/dummy-avatar.png" alt="">
                    </div>
                    <div class="post-component-values-container-user-info">
                        <div class="post-component-values-container-user-info-values">
                            <div>
                                <span class="post-component-values-container-user-info-values-login" @click.stop="redirectToProfile">{{ user.login }}</span>
                                <v-icon icon="mdi-circle-small"></v-icon>
                                <span class="post-component-values-container-user-info-values-date">{{ post.date.toLocaleString('en-us', { month: 'short' }) }} {{ post.date.getDate() }} {{ post.date.getFullYear() }}</span>
                                <span v-if="post.isReply" class="post-component-values-container-user-info-values-link" @click.stop="redirectToReplied">
                                        @Reply to {{ post.replyTo.user }}
                                </span>
                            </div>
                            <div v-if="post.login === userState">
                                <v-icon class="post-component-values-container-user-info-values-more" icon="mdi-delete-outline" @click.stop="deletePost"></v-icon>
                            </div>
                        </div>
                        <div>
                            {{ post.text }}
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="isRepost && repostPost" class="create-writing-repost-to" @click.stop="redirectToRepost">
                <div class="create-writing-repost-to-container">
                    <div class="create-writing-repost-to-container-image">
                        <img class="create-writing-repost-to-container-image-value" src="../assets/dummy-avatar.png" alt="">
                    </div>
                    <div>
                        <span class="create-writing-repost-to-container-values login">{{ repostPost.user }}</span>
                        <v-icon icon="mdi-circle-small"></v-icon>
                        <span class="create-writing-repost-to-container-values">{{ repostPost.date.toLocaleString('en-us', { month: 'short' }) }} {{ repostPost.date.getDate() }} {{ repostPost.date.getFullYear() }}</span>
                        <div class="create-writing-repost-to-container-text">
                            <span class="create-writing-repost-to-container-text-value">
                                {{ repostPost.text }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="post-component-stats">
                <div class="post-component-stats-values" @click.stop="onLike">
                    <v-icon v-if="!isLikedByUser" icon="mdi-heart-outline" class="post-component-stats-values-icon heart"/>
                    <v-icon v-else icon="mdi-heart" class="post-component-stats-values-icon heart liked" color="red"/>
                    <span>{{ numLikes }}</span>
                </div>
                <div class="post-component-stats-values">
                    <v-icon icon="mdi-comment-outline" class="post-component-stats-values-icon comment"/>
                    <span>{{ numReplies }}</span>
                </div>
                <div class="post-component-stats-values">
                    <CreateRepostComponent :post="post" :user="user"/>
                    <span>{{ post.repeats.length }}</span>
                </div>
                <div class="post-component-stats-values" @click.stop="onSave">
                    <v-icon v-if="!isSavedByUser" icon="mdi-bookmark-outline" class="post-component-stats-values-icon bookmark"/>
                    <v-icon v-else icon="mdi-bookmark" class="post-component-stats-values-icon bookmark" color="#add8e6"/>
                    <span>{{ numSaves }}</span>
                </div>    
            </div>
        </div>
</template>
<script>
import CreateRepostComponent from './CreateRepostComponent.vue';
import { getUser } from '../services/user.service';
import { deletePost,likePost, savePost, updateReplies, getPost  } from '../services/post.service';
import { reloadPage } from '../utils/utils';
import router from '../router';
import Swal from 'sweetalert2'
import store from '../store';

export default {
    name: 'PostComponent',
    components: {
        CreateRepostComponent
    },
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
            isRepost: false,
            isBlocked: false,
            numLikes: this.post.likes.length,
            numSaves: this.post.saves.length,
            numReplies: this.post.replies.length,
            numRepost: this.post.repeats.length,
            userState: store.state.data.user.user.login,
            repostPost: null
        }
    },
    methods: {
        async getUser() {
            try {
                const res = await getUser(this.post.user);
                this.user = res;
            } catch (error) {
                router.push('/errorpage');
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
                            router.push('/errorpage');
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
                if (like === this.userState) {
                    this.isLikedByUser = true;
                }
            });
        },
        checkIfSaved() {
            this.post.saves.forEach(save => {
                if (save === this.userState) {
                    this.isSavedByUser = true;
                }
            });
        },
        checkIfBlocked() {
            if(store.state.data.user.user.blockedUsers.includes(this.post.user)) {
                this.isBlocked = true;
            }
            console.log(this.isBlocked)
        },
        async checkIfRepost() {
            if(this.post.isRepost) {
                this.isRepost = true;
                try {
                    const response = await getPost(this.post.repostFrom.id);

                    response.date = new Date(response.date);

                    this.repostPost = response;
                } catch (error) {
                    router.push('/errorpage');
                }
            } else {
                this.isRepost = false;
            }
        },
        onLike() {
            this.isLikedByUser = !this.isLikedByUser;

            if(this.isLikedByUser) {
                this.numLikes++;
            } else {
                this.numLikes--;
            }

            try {
                likePost(this.post._id, this.userState);
            } catch (error) {
                router.push('/errorpage');
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
                savePost(this.post._id, this.userState);
            } catch (error) {
                router.push('/errorpage');
            }
        },
        redirectToPost() {
            router.push('/' + this.post.user + '/' + this.post._id);
        },
        redirectToReplied() {
            router.push('/' + this.post.replyTo.user + '/' + this.post.replyTo.id);
        },
        redirectToRepost() {
            router.push('/' + this.repostPost.user + '/' + this.repostPost._id);
        },
        redirectToProfile() {
            router.push('/' + this.post.user);
        },
        readActions() {
            this.numLikes = this.post.likes.length;
            this.numSaves = this.post.saves.length;
            this.numReplies = this.post.replies.length;
            this.numRepost = this.post.repeats.length;

        }
    },
    mounted() {
        this.getUser();
        this.checkIfLiked();
        this.checkIfSaved();
        this.checkIfRepost();
        this.checkIfBlocked();
    },
    watch: {
        post: function() {
            this.getUser();
            this.checkIfLiked();
            this.checkIfSaved();
            this.checkIfRepost();
            this.checkIfBlocked();
            this.readActions();
        }
    }
}

</script>
<style lang="scss" scoped>
.postComponent {
    border-bottom: 1px solid #e0e0e0;
    padding: 20px;
    transition: 0.2s ease;
    cursor: pointer;
    &.blocked {
        filter: blur(3px);
    }
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
                        &:hover {
                            text-decoration: underline;
                        }
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
                    .post-component-values-container-user-info-values-link {
                        text-decoration: none;
                        color: #582b5a;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }
    .create-writing-repost-to {
            padding: 20px;
            margin: 10px 20px 0 20px;
            border: 1px solid #d3d3d3;
            border-radius: 20px;
            &:hover {
                background-color: #f5f5f5;
            }
            .create-writing-repost-to-container {
                display: flex;
                align-items: center;
                .create-writing-repost-to-container-image {
                    padding: 0 10px 0 10px;
                    .create-writing-repost-to-container-image-value {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                }
            }
            .create-writing-repost-to-container-values {
                font-size: 14px;
                &.login {
                    font-weight: 700;
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
            }
        }
    }
}
</style>