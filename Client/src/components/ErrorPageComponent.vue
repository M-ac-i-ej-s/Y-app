<template>
    <div class="ErrorPage">
        <span class="error-page-oops">
            Oops!
        </span>
        <span class="error-page-text">
            Something went wrong.
        </span>
        <span class="error-page-404">
            404
        </span>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
.ErrorPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 200px 0 0 0;
    .error-page-oops {
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .error-page-text {
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .error-page-404 {
        font-size: 100px;
        font-weight: bold;
    }
}
</style>