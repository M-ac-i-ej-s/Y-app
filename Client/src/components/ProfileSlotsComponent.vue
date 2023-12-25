<template>
    <div class="profileSlot">
        <v-tabs class="profile-slot-tabs" v-model="tabs" color="primary" grow>
            <v-tab :value="1">
                <span class="profile-slot-tabs-label">
                    Posts
                </span>
            </v-tab>

            <v-tab :value="2">
                <span class="profile-slot-tabs-label">
                    Replies
                </span>
            </v-tab>

            <v-tab :value="3">
                <span class="profile-slot-tabs-label">
                    Likes
                </span>
            </v-tab>
        </v-tabs>
        <v-window class="profile-slot-windows" v-model="tabs">
            <v-window-item v-for="i in 3" :key="i" :value="i">
                <v-card>
                <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </v-card-text>
                </v-card>
            </v-window-item>
        </v-window>
    </div>
</template>
<script>
export default {
    data() {
      return {
        tabs: null,
      }
    },
  }
</script>
<style lang="scss">
.profileSlot {
    padding: 175px 0 0 0;
    .profile-slot-tabs {
        width: 600px;
        border-bottom: 1px solid #e0e0e0;
        .profile-slot-tabs-label {
            font-weight: 700;
        }
    }
    .profile-slot-windows {
        width: 600px;
    }
}    
</style>