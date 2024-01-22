<template>
    <BaseDialog :dialogWidth="650" :isRepost="true">
        <div class="create-writing">
            <div class="create-writing-info">
                <div class="create-writing-info-image">
                    <img class="create-writing-info-image-value" :src="avatar" alt="">
                </div>
                <div class="create-writing-info-text">
                    <span class="create-writing-info-text-value" ref="text" role="textbox" placeholder="Post your reply" contenteditable></span>
                </div>
            </div>
            <div class="create-writing-repost-to">
                <div class="create-writing-repost-to-container">
                    <div class="create-writing-repost-to-container-image">
                        <img class="create-writing-repost-to-container-image-value" :src="user.avatar" alt="avatar">
                    </div>
                    <div>
                        <span class="create-writing-repost-to-container-values login">{{ user?.login }}</span>
                        <v-icon icon="mdi-circle-small"></v-icon>
                        <span class="create-writing-repost-to-container-values">{{ post.date.toLocaleString('en-us', { month: 'short' }) }} {{ post.date.getDate() }} {{ post.date.getFullYear() }}</span>
                        <div class="create-writing-repost-to-container-text">
                            <span class="create-writing-repost-to-container-text-value">
                                {{ post.text }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="create-writing-button">
                <v-btn class="create-writing-button-value" rounded="xl" color="#582b5a" @click="postRepostService">Repost</v-btn>
            </div>
        </div>
    </BaseDialog>
</template>
<script>
import BaseDialog from '../base/BaseDialog.vue';
import { postRepost } from '../services/post.service';
import { reloadPage } from '../utils/utils';
import store from '../store';
import router from '../router';

export default {
    name: 'CreateRepostComponent',
    components: {
        BaseDialog
    },
    props: {
        post: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            avatar: store.state.data.user.user.avatar
        }
    },
    methods: {
        async postRepostService() {
            try {
                if(this.$refs.text.textContent.length > 0) {
                    await postRepost(this.post._id, store.state.data.user.user.login, this.$refs.text.textContent, this.user.login);
                    await reloadPage();
                }
            } catch (error) {
                router.push('/errorpage');
            }
        }
    }
}
</script>
<style lang="scss">
.create-writing {
        padding: 20px 10px 20px 10px;
        border-bottom: 1px solid #d3d3d3;
        .create-writing-info {
            display: flex;
            .create-writing-info-image {
                padding: 0 10px 0 10px;
                .create-writing-info-image-value {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
            }
            .create-writing-info-text {
                width: 500px;
                padding: 5px 0 0 0;
                .create-writing-info-text-value {
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
                .create-writing-info-text-value[contenteditable]:empty:before {
                    content: attr(placeholder);
                    color: #a9a9a9;
                }
            }
        }
        .create-writing-button {
            display: flex;
            justify-content: flex-end;
            padding: 20px 0 0 0;
            .create-writing-button-value {
                width: 100px;
                height: 40px;
                font-weight: 700;
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
}
</style>