<template>
  <div class="welcomePage">
      <div class="welcome-page-content">
        <img class="welcome-page-content-image-value" src="../assets/Ylogo.png" alt="yLogo">
        <div class="welcome-page-content-actions">
          <div class="welcome-page-content-actions-label">
            <span>Get it off your chest</span>
          </div>
          <div class="welcome-page-content-actions-label smaller">
            <span>Join today.</span>
          </div>
          <div class="welcome-page-content-actions-account">
            <SignInComponent/>
            <div class="welcome-page-content-actions-account-divider">
              <v-divider/>
              <span class="welcome-page-content-actions-account-divider-label">
                or
              </span>
              <v-divider/>
            </div>
            <div>
              <LogInComponent/>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import LogInComponent from '../components/LogInComponent.vue'
import SignInComponent from '../components/SignInComponent.vue'

export default {
  name: 'WelcomePage',
  components: {
    LogInComponent,
    SignInComponent
  }
}
</script>
<style scoped lang="scss">
.welcomePage {
  .welcome-page-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 200px;
    gap: 10%;
    @media screen and (max-width: 768px) {
      flex-direction: column;
      padding-top: 100px;
      scale: 1.3;
    }
    .welcome-page-content-image-value {
      width: 25%;
    }
    .welcome-page-content-actions {
      display: flex;
      flex-direction: column;
      @media screen and (max-width: 768px) {
        align-items: center;
        width: 50%;
      }
      .welcome-page-content-actions-label {
        font-size: 3vw;
        font-weight: 700;
        color: #222222;
        &.smaller {
          font-weight: 400;
          color: #582b5a;
        }
      }
      .welcome-page-content-actions-account {
        padding: 25px 0 0 0;
        width: 70%;
        .welcome-page-content-actions-account-button {
          width: 100%;
          font-weight: 700;
          &.log {
            color: #582b5a;
          }
        }
        .welcome-page-content-actions-account-divider {
          display: flex;
          align-items: center;
          padding: 10px 0 10px 0;
          .welcome-page-content-actions-account-divider-label {
            padding: 0 10px 0 10px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>