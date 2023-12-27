<template>
        <div class="postComponent" v-if="post">
            <div class="post-component-values">
                <div class="post-component-values-container">
                    <div class="post-component-values-container-image">
                        <img class="post-component-values-container-image-value" src="../assets/dummy-avatar.png" alt="">
                    </div>
                    <div class="post-component-values-container-user-info">
                        <div class="post-component-values-container-user-info-values">
                            <span class="post-component-values-container-user-info-values-login">{{ user?.login }}</span>
                            <v-icon icon="mdi-circle-small"></v-icon>
                            <span class="post-component-values-container-user-info-values-date">{{ post.date.toLocaleString('en-us', { month: 'short' }) }} {{ post.date.getDate() }} {{ post.date.getFullYear() }}</span>
                        </div>
                        <div>
                            {{ post.text }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="post-component-stats">
                <div class="post-component-stats-values">
                    <v-icon icon="mdi-heart-outline" class="post-component-stats-values-icon heart"/>
                    <span>{{ post.likes.length }}</span>
                </div>
                <div class="post-component-stats-values">
                    <v-icon icon="mdi-comment-outline" class="post-component-stats-values-icon comment"/>
                    <span>{{ post.replies.length }}</span>
                </div>
                <div class="post-component-stats-values">
                    <v-icon icon="mdi-bookmark-outline" class="post-component-stats-values-icon bookmark"/>
                    <span>{{ post.saves.length }}</span>
                </div>    
            </div>
        </div>
</template>
<script>
import { getUser } from '../services/user.service';

export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            user: null
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
    },
    mounted() {
        this.getUser();
        this.post.date = new Date(this.post.date);
    }
}

</script>
<style lang="scss" scoped>
.postComponent {
    border-bottom: 1px solid #e0e0e0;
    padding: 20px;
    .post-component-values {
        display: flex;
        justify-content: space-between;
        .post-component-values-container {
            display: flex;
            justify-content: center;
            .post-component-values-container-image {
                width: 50px;
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
                .post-component-values-container-user-info-values {
                    display: flex;
                    align-items: center;
                    .post-component-values-container-user-info-values-login {
                        font-weight: 600;
                        font-size: 14px;
                    }
                    .post-component-values-container-user-info-values-date {
                        font-weight: 400;
                        font-size: 14px;
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
            .post-component-stats-values-icon {
                transition: 0.2s ease;
                border-radius: 50%;
                &.heart:hover {
                    color: #ff0000;
                }
                &.comment:hover {
                    color: greenyellow;
                }
                &.bookmark:hover {
                    color: lightblue;
                }
            }
        }
    }
}
</style>