<template>
    <div class="ExeptionPost">
        <span class="expetion-post-oops">
            Oops!
        </span>
        <span class="expetion-post-label">
            There is no {{ text }} yet.
        </span>
        <v-icon class="expetion-post-icon" icon="mdi-alert-octagram-outline" color="#582b5a"/>
    </div>
</template>
<script>
export default {
    name: 'ExeptionPost',
    props: {
        text: {
            type: String,
            required: true
        }
    }
}
</script>
<style lang="scss">
.ExeptionPost {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0 0 0;
    text-align: center;
    .expetion-post-oops {
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .expetion-post-label {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .expetion-post-icon {
        font-size: 100px;
    }
}
</style>