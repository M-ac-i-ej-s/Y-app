<template>
    <div class="expandedPostComponent">
        <div class="expanded-post-label">
            <span class="expanded-post-label-value">
                Post
            </span>
        </div>
        <div>
            <div v-if="post">
                <PostComponent :post="post"/>
            </div>
            <div v-else>
                <span>
                    Loading...
                </span>
            </div>
        </div>
        <div class="expanded-post-writing">
            <div class="expanded-post-writing-info">
                <div class="expanded-post-writing-info-image">
                    <img class="expanded-post-writing-info-image-value" src="../assets/dummy-avatar.png" alt="">
                </div>
                <div class="expanded-post-writing-info-text">
                    <span class="expanded-post-writing-info-text-value" ref="text" role="textbox" placeholder="Post your reply" contenteditable></span>
                </div>
            </div>
            <div class="expanded-post-writing-button">
                <v-btn class="expanded-post-writing-button-value" rounded="xl" color="#582b5a" @click="postReply">Reply</v-btn>
            </div>
        </div>
        <div class="expanded-post-label">
            <span class="expanded-post-label-value">
                Replies
            </span>
        </div>
        <div class="expanded-post-replies">
            <div v-if="postReplies.length > 0">
                <PostComponent v-for="reply in postReplies" :post="reply" :key="reply._id"/>
            </div>
            <div class="expanded-post-replies-exaption" v-else>
                No replies yet...
            </div>
        </div>
    </div>
</template>
<script>
import { getPost, postReply, getPostReplies } from '../services/post.service';
import PostComponent from './PostComponent.vue';
import store from '../store';
import router from '../router';
import { reloadPage } from '../utils/utils';

export default {
    components: {
        PostComponent
    },
    data() {
        return {
            post: null,
            postReplies: [],
        }
    },
    methods: {
        async getPost() {
            try {
                const res = await getPost(this.$route.params.id);

                res.date = new Date(res.date);

                this.post = res;
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async postReply() {
            try {
                await postReply(this.$route.params.id,this.$refs.text.textContent ,store.state.data.user.user.login,this.$route.params.username);
                reloadPage();
            } catch (error) {
                router.push('/errorpage');
            }
        },
        async getPostReplies() {
            try {
                const res = await getPostReplies(this.$route.params.id);

                res.forEach(reply => {
                    reply.date = new Date(reply.date);
                });

                this.postReplies = res;
            } catch (error) {
                router.push('/errorpage');
            }
        }
    },
    mounted() {
        this.getPost();
        this.getPostReplies();
    },
    watch: {
        '$route.params.id': function() {
            this.getPost();
            this.getPostReplies();
        }
    }
}
</script>
<style lang="scss">
.expandedPostComponent {
    width: 600px; 
    min-height: 150vh;
    border-left:1px solid #e0e0e0;
    border-right:1px solid #e0e0e0;  
    .expanded-post-label {
        padding: 5px 20px 5px 20px;
        .expanded-post-label-value {
            font-size: 25px;
            font-weight: bold;
        }
    }
    .expanded-post-writing {
        padding: 20px 10px 20px 10px;
        border-bottom: 1px solid #d3d3d3;
        .expanded-post-writing-info {
            display: flex;
            .expanded-post-writing-info-image {
                padding: 0 10px 0 10px;
                .expanded-post-writing-info-image-value {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
            }
            .expanded-post-writing-info-text {
                width: 500px;
                padding: 5px 0 0 0;
                .expanded-post-writing-info-text-value {
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
                .expanded-post-writing-info-text-value[contenteditable]:empty:before {
                    content: attr(placeholder);
                    color: #a9a9a9;
                }
            }
        }
        .expanded-post-writing-button {
            display: flex;
            justify-content: flex-end;
            padding: 20px 0 0 0;
            .expanded-post-writing-button-value {
                width: 100px;
                height: 40px;
                font-weight: 700;
            }
        }
    }
    .expanded-post-replies {
        .expanded-post-replies-exaption {
            padding: 10px 20px 10px 20px;
            font-size: 20px;
        }
    }
}
</style>