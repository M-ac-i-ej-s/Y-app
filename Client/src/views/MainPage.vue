<template>
    <div class="mainPage">
        <NavBarComponent/>
        <div class="main-page-router">
            <router-view/>
        </div>
        <WhoToFollowComponent/>
        <v-snackbar
            v-model="snackbar"
        >
            New posts by your favorite people!
            <template v-slot:actions>
                <v-btn
                color="red"
                variant="text"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>
<script>
import NavBarComponent from '../components/NavBarComponent.vue';
import WhoToFollowComponent from '../components/WhoToFollowComponent.vue';
import store from '../store'
import {socketState, socket} from '../socket';

export default {
    components: {
        NavBarComponent,
        WhoToFollowComponent
    },
    data() {
        return {
            snackbar: false,
            state: socketState
        }
    },
    watch: {
        state: {
            handler() {
                this.snackbar = true;
            },
            deep: true
        }
    },
    mounted() {
        socket.emit('setUser', store.state.data.user.user);
    },
}
</script>
<style lang="scss">
.mainPage {
    display: flex;
    justify-content: center;
    height: 150vh;
    @media screen and (max-width: 650px) {
            justify-content: flex-end;
    }
}
</style>