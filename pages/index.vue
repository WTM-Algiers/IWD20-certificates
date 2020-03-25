<template>
  <div class="container">
    <!-- <header class="header"></header> -->
    <div class="superWomanContainer" v-if="windowWidth > 600">
      <img class="superWoman" src="~/assets/super_woman.svg" alt="superWoman" />
    </div>
    <div class="thankYouCard">
      <img src="~/assets/wtm.svg" alt="wtm" style="height:8vh" />
      <div class="logos">
        <logo />
        <iwd-idea class="ideathon" />
      </div>
      <vs-alert class="alert" style="height:fitContent" relief gradient>
        <template #title>
          <h1 style="margin: 0 auto">Thank you!</h1>
        </template>
        <div class="email" style="flexDirection:column">
          <p
            class="thanks"
          >We, WTM Algiers Family, would like to warmly thank you for having partaken in the success of our IWD'2020. Your presence was greatly appreciated!</p>
          <div class="email">
            <p class="thanks" style="fontSize:1.5rem;marginRight:10px">Email</p>
            <vs-input primary v-model="email" style="color:black">
              <template #icon>
                <i class="bx bx-envelope bx-md"></i>
              </template>
              <template v-if="!validateEmail && email" #message-danger>Invalid Email</template>
            </vs-input>
          </div>
          <vs-button
            color="rgb(66, 133, 244)"
            animation-type="vertical"
            size="large"
            @click="getCertificate"
          >
            Get My Certificate
            <template #animate>
              <i class="bx bx-wink-tongue"></i>
            </template>
          </vs-button>
        </div>
      </vs-alert>
    </div>
    <!-- <h1 class="title">IWDCertificates</h1>
      <h2 class="subtitle">IWD Algiers 2020 Certificates</h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
    </div>-->
  </div>
</template>

<script>
import firebase from 'firebase/app'
import Logo from '~/components/Logo.vue'
import IwdIdea from '~/components/IwdIdea.vue'
import WTM from '~/components/wtm.vue'

export default {
  components: {
    Logo,
    IwdIdea,
    WTM
  },
  data() {
    return {
      email: '',
      windowWidth: undefined
    }
  },
  computed: {
    validateEmail() {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.email)
    }
  },
  methods: {
    async getCertificate() {
      if (this.validateEmail) {
        var storageRef = firebase.storage().ref()
        let link = await storageRef
          .child(this.email + '.pdf')
          .getDownloadURL()
          .then(link => {
            this.$axios({
              url: link,
              method: 'GET',
              responseType: 'blob'
            })
              .then(response => {
                var fileURL = window.URL.createObjectURL(
                  new Blob([response.data])
                )
                var fileLink = document.createElement('a')
                fileLink.href = fileURL
                fileLink.setAttribute('download', this.email + '.pdf')
                document.body.appendChild(fileLink)

                fileLink.click()
                const noti = this.$vs.notification({
                  flat: true,
                  color: 'success',
                  position: 'bottom-center',
                  title: 'Congratulations 🎉',
                  text: `Here is your certificate!`
                })
              })
              .catch(error => {
                console.log(error)
              })
          })
          .catch(error => {
            const noti = this.$vs.notification({
              flat: true,
              color: 'danger',
              position: 'bottom-center',
              title: 'Wrong Email 🙇‍',
              text: `We couldn't find a certificate with the following email ${this.email}`
            })
            console.log(error)
          })
      } else {
        const noti = this.$vs.notification({
          flat: true,
          color: 'danger',
          position: 'bottom-center',
          title: 'Invalid Email 🙇‍',
          text: `We need a valid email to get your certificate!`
        })
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth
    }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
    this.windowWidth = window.innerWidth
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  width: 100vw;
  display: grid;
  align-items: center;
  background-color: var(--bag-color);
  grid-template-columns: 1fr 1fr;
}

.superWomanContainer {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  justify-content: start;
  align-items: center;
  z-index: 0;
}
.superWoman {
  opacity: 0.5;
  max-width: 100%;
  max-height: 100%;
}
.thankYouCard {
  width: 50vw;
  justify-self: end;
  margin-right: 10rem;
  grid-column: 2;
  display: flex;
  flex-direction: column;
}
.header {
  grid-column: 1/3;
  justify-self: center;
}
.ideathon {
  height: 100%;
}
.thanks {
  font-size: 2.25rem;
  font-weight: 200;
}
.email {
  display: flex;
  align-items: center;
  margin-top: 2rem;
  align-self: center;
  flex-direction: column;
}
.alert {
  height: fit-content !important;
}
.logos {
  display: flex;
  height: 15vh;
}
@media only screen and (max-width: 1300) {
  .container {
    grid-template-columns: 1fr;
  }
  .thankYouCard {
    width: 75vw;
    grid-column: 1;
    justify-self: center;
    margin-right: 0;
    height: fit-content;
  }
  .alert {
    height: fit-content !important;
  }
  .thanks {
    font-size: 1rem;
    font-weight: 200;
  }
}
@media only screen and (max-width: 1200px) {
  .container {
    grid-template-columns: 1fr;
  }
  .thankYouCard {
    width: 75vw;
    grid-column: 1;
    justify-self: center;
    margin-right: 0;
    height: fit-content;
  }
  .alert {
    height: fit-content !important;
  }
  .thanks {
    font-size: 1.25rem;
    font-weight: 200;
  }
}
@media only screen and (max-width: 600px) {
  .logos {
    flex-direction: column;
    height: fit-content;
  }
  .ideathon {
    height: 10vh;
  }
}
</style>
