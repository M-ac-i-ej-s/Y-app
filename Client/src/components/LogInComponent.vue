<template>
    <BaseDialog :buttonLabel="'Log in'" :dialogWidth="550">
            <div class="login-component-actions">
                <div class="login-component-actions-label">
                    <div class="login-component-actions-label-spacer">
                        <span>Log in to your</span>
                        <span>Y account.</span>
                    </div>
                </div>
                <div class="login-component-actions-buttons">
                    <v-text-field
                    class="login-component-actions-buttons-value"
                    label="Email"
                    variant="outlined"
                    prepend-icon="mdi-email-outline"
                    ></v-text-field>
                    <v-text-field
                    class="login-component-actions-buttons-value"
                    label="Password"
                    variant="outlined"
                    prepend-icon="mdi-lock-outline"
                    ></v-text-field>
                </div>
                <div class="login-component-actions-login">
                <v-btn class="login-component-actions-login-button" rounded="xl" color="purple-darken-2">
                    Log In
                </v-btn>
                </div>
            </div>
    </BaseDialog>
</template> 

<script>
import BaseDialog from '../base/BaseDialog.vue'
import { login } from '../services/auth.service';
import { mapMutations } from 'vuex';
import router from '../router';
import authHeader from '../services/auth-header';

export default {
    components: {
        BaseDialog
    },
    data() {
        return {
            email: null,
            password: null,
            borderError: 'black'
        }
    },
    methods: {
        onLogin() {
            login(values.email, values.password)
                .then((response) => {
                    this.loggedIn(response.User);
                    authHeader();
                    router.push('/home');
                })
                .catch(() => {
                    console.log('error');
            })
        },
        ...mapMutations(['loggedIn', 'loggedOut']),
    },

}
</script>
<style lang="scss" scoped>
.login-component-actions {
    display: flex;
    flex-direction: column;
    padding: 0 50px 0 50px;
    gap: 20px;
    .login-component-actions-label {
        display: flex;
        justify-content: center;
        font-size: 2vw;
        font-weight: 700;
        padding: 10px 0 10px 0;
        text-align: center;
        .login-component-actions-label-spacer {
            display: flex;
            flex-direction: column;
            gap: 5px;
            }
    }
    .login-component-actions-login {
        display: flex;
        justify-content: center;
        .login-component-actions-login-button {
            width: 80%;
            font-weight: 700;
        }
    }
    .login-component-actions-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        .login-component-actions-buttons-value {
            width: 100%;
        }

    }
}
.login-component-button {
        width: 100%;
        font-weight: 700;
        color: #582b5a;
}
</style>