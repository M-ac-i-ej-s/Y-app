<template>
    <BaseDialog :buttonLabel="'POST'" :dialogWidth="550" buttonColor="#582b5a" :isNav="true" :width="width">
        <div class="creatingPostComponent">
            <div class="creating-post">
                <div class="creating-post-avatar">
                    <img class="creating-post-avatar-value" :src="avatar" alt="avatar">
                </div>
                <div class="creating-post-textarea">
                    <textarea v-model="text" class="creating-post-textarea-value" maxlength="200" placeholder="What is happening!?"></textarea>
                </div>
            </div>
            <v-divider></v-divider>
            <div class="creating-post-button">
                <v-btn class="creating-post-button-value" rounded="xl" color="#582b5a" @click="post">Post</v-btn>
            </div>
        </div>
    </BaseDialog>
</template>
<script>
import BaseDialog from '../base/BaseDialog.vue'
import { createPost } from '../services/post.service.js'
import { reloadPage } from '../utils/utils';
import router from '../router';
import store from '../store';

export default {
    props: {
        width: Number,
        login: String,
        avatar: store.state.data.user.user.avatar
    },
    data() {
        return {
            text: ''
        }
    },
    components: {
        BaseDialog
    },
    methods: {
        post() {
            createPost(this.text, this.login)
                .then(() => {
                    reloadPage();
                })
                .catch((err) => {
                    router.push('/errorpage');
                })
        }
    },
}
</script>
<style lang="scss">
.creatingPostComponent {
    padding: 20px 0 0 0;
    .creating-post {
        display: flex;
        gap: 15px;
        .creating-post-avatar {
            .creating-post-avatar-value {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }
        .creating-post-textarea {
            .creating-post-textarea-value {
                padding: 10px 0 0 0;
                width: 350px;
                height: 200px;
                resize: vertical;
                border: none;
                outline: none;
                font-size: 20px;
            }
        }
    }
    .creating-post-button {
        display: flex;
        justify-content: flex-end;
        padding: 20px 0 0 0;
        .creating-post-button-value {
            width: 100px;
            height: 40px;
            font-weight: 700;
        }
    }
}
</style>