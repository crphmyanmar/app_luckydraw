<template>
  <div class="lucky-draw">
    <div class="header header-box">
      <div class="shimmer"><span>Round {{round}}:</span> {{ userList.length}} <span>candidates</span></div>
    </div>
    <hide-at breakpoint="small">
      <!-- draw page -->
      <div class="draw-page" v-show="state === 1">
        <!-- draw tickets -->
        <div class="draw-box shimmer">
          <ul id="candidateList" ref="candidateListDesktop" @animationend="celebrate">
            <li class="item-1" v-for="(token, index) in tokenList" :key="index">{{ token.TICKET_NUMBER }}</li>
          </ul>
        </div>
        <div>
          <button
            class="button-73 click-btn"
            role="button"
            @click="
              activateClassDesktop();
              getUserList();
            "
          >
            Start
          </button>
          <!-- Transperant button to trigger remotely -->
          <!-- <button
            class="transparent-btn"
            role="button"
            @click="
              activateClassDesktop();
              getUserList();
            "
          >
            
          </button> -->
        </div>
      </div>
    </hide-at>

    <show-at breakpoint="mediumAndBelow">
      <!-- draw page -->
      <div class="draw-page" v-show="state === 1">
        <!-- draw tickets -->
        <div class="draw-box-mobile shimmer">
          <ul id="candidateList" ref="candidateListMobile" @animationend="celebrate">
            <li class="item-1" v-for="(token, index) in tokenList" :key="index">{{ token.TICKET_NUMBER }}</li>
          </ul>
        </div>
        <div>
          <button
            class="button-73"
            role="button"
            @click="
              activateClassMobile();
              getUserList();
            "
          >
            Draw
          </button>
        </div>
      </div>
    </show-at>

    <show-at breakpoint="mediumAndBelow">
      <div class="winning-page" v-show="state === 4">
        <div class="winning-box-mobile">
          <div class="winning-token-mobile shimmer">Congratulations!</div>
          <div class="winning-plate">
            <div class="winning-token-id-mobile shimmer">{{ winningToken.TICKET_NUMBER }}</div>
            <div class="winning-token-mobile shimmer">{{ winningToken.COUNTRY }}</div>
          </div>
        </div>

        <div>
          <button
            class="button-73"
            role="button"
            @click="
              changeState(1);
              getUserList();
            "
          >         
          </button>
        </div>
      </div>
    </show-at>

    <hide-at breakpoint="small">
      <div class="winning-page" v-show="state === 4">
        <div class="winning-box">
          <div class="winning-token shimmer">Congratulations!</div>
          <div class="winning-plate">
            <div class="winning-token-id shimmer">{{ winningToken.TICKET_NUMBER }}</div>
            <div class="winning-token shimmer">from {{ winningToken.COUNTRY }}</div>
          </div>
          <div>
            <div class="winning-info">
              Favorite Team: <span class="">{{ winningToken.REFERENCE1 }}</span
              ><br />
              Campaign Round: <span class="">{{ winningToken.REFERENCE2 }}</span
              ><br />
              Ticket Bought: <span class="">{{ winningToken.TICKET_COUNT }}</span
              ><br />
              Fundraiser: <span class="">{{ winningToken.FUNDRAISER_NAME }}</span
              ><br />
            </div>
          </div>
        </div>

        <div>
          <button
            class="button-73 click-btn"
            role="button"
            @click="
              changeState(1);
              getUserList();
            "
          >
            Next Draw
          </button>
        </div>
      </div>
    </hide-at>
    <!-- <div class="footer footer-box">
      <div>{{ winnerList}}</div>
    </div> -->

    <!-- Transperant button to trigger remotely -->
    <button class="transparent-btn" role="button" @click="
                changeState(1);
                activateClassDesktop();
                getUserList();
              " />
  </div>
  
</template>

<script>

// *********************************************  DATA CHANGE HERE *********************************************

import userList from '../data/Round1_Final_Guess.json';
// import userList from '../data/Round12_Final_Guess.json';
// import userList from '../data/Round3_Final_Guess.json';

// **************************************************************************************************************


import { showAt, hideAt } from 'vue-breakpoints';

// import sound from '../assets/sound/luckydraw-tick.mp3'
import sound from '../assets/sound/wheelsound.mp3'

const audio = new Audio(sound)

export default {
  name: 'Luckydraw',
  components: { showAt, hideAt },
  props: {
    restart: Boolean,
  },
  data() {
    return {
      apiKey: 'keySLF7Ph3gg0FEuk',
      pvtData: '',
      secret: 'fukCoup@2021',
      dialog: false,
      state: 1,
      winningToken: '',
      tokenList: [],
      winnerList: [],
      prizeList: [],
      prizeImg: '',
      counter: 0,
      infoText: '',
      userList: userList,
      animate: true,
// *********************************************  DATA CHANGE HERE *********************************************
      round: "1"
// *********************************************  DATA CHANGE HERE *********************************************
    };
  },
  watch: {
    restart() {
      if (this.restart) this.state = 1;
    },
  },
  mounted() {
    this.onInit();
  },
  methods: {
    onInit() {
      this.spin;
      this.state = 1;
      this.getUserList();
    },

    getUserList() {
      this.userList = this.shuffle(userList);
      this.tokenList = [];
      console.log('Total candidates:', this.userList.length);
      audio.play();
      //do while
      let i = 0;
      do {
        let random = Math.floor(Math.random() * this.userList.length);
        let id = this.userList[random];

        this.tokenList.push(id);
        i++;
      } while (i < 500);

      // console.log(this.tokenList);
      this.tokenList = this.shuffle(this.tokenList);

      let tmp = Math.floor(Math.random() * this.tokenList.length);
      this.winningToken = this.tokenList[452] = this.tokenList[tmp];
      // // Add winning number to winner list
      // this.winnerList.push(tmp + ":" + this.winningToken.TICKET_NUMBER);

    },

    celebrate() {
      this.state = 4;
      setTimeout(() => {
        console.log(`>> ${this.winningToken.TICKET_NUMBER}, ${this.winningToken.REFERENCE1}`);
      }, 1000);
    },

    changeState(state) {
      this.state = state;
      this.$emit('clicked', state, this.counter);
    },

    shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    },

    activateClassDesktop() {
      this.$refs.candidateListDesktop.classList.remove('scrollUp');
      void this.$refs.candidateListDesktop.offsetWidth;
      this.$refs.candidateListDesktop.classList.add('scrollUp');
    },

    activateClassMobile() {
      this.$refs.candidateListMobile.classList.remove('scrollUp');
      void this.$refs.candidateListMobile.offsetWidth;
      this.$refs.candidateListMobile.classList.add('scrollUp');
    },
  },
};
</script>

<style scoped>
.lucky-draw {
  position: relative;
  /* border: #272522 10px solid; */
  background-image: url('../assets/LuckyDraw.png');
  background-color: #930c30;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

.intro-page {
  position: inherit;
  bottom: 0;
}

.ready-page {
  position: inherit;
  bottom: 0;
}

.draw-page,
.winning-page {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  display: inline-grid;
}

.winning-token {
  /* position: relative; */
  /* top: -10.2vh; */
  font-size: 3vw;
  font-weight: bold;
  /* color: white; */
  /* width: 28vw; */
}

.winning-token-id {
  font-size: 6vw;
  letter-spacing: 0.5rem;
  font-weight: bold;
}

.winning-token-mobile {
  font-size: 10vw;
  font-weight: bold;
}

.winning-token-id-mobile {
  font-size: 20vw;
  letter-spacing: 0.5rem;
  font-weight: bold;
}

.winning-plate {
  padding-top: 2rem;
  animation: scale 0.5s alternate infinite ease-in;
}

.next-button {
  position: relative;
  top: -10.5vh;
  left: 40vw;
}

.footer {
  position: fixed;
  bottom: -1vh;
  z-index: 1;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
}

.shimmer {
  color: rgba(255, 255, 255, 0.1);
}
.shimmer {
  /* the shimmer magic */
  background: -webkit-gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, rgb(211, 145, 2)));
  background: -moz-gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, rgb(211, 145, 2)));
  background: gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, rgb(211, 145, 2)));
  -webkit-background-size: 125px 100%;
  -moz-background-size: 125px 100%;
  background-size: 125px 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-animation-name: shimmer;
  -moz-animation-name: shimmer;
  -webkit-animation-name: shimmer;
  animation-name: shimmer;
  -webkit-animation-duration: 5s;
  -moz-animation-duration: 5s;
  -webkit-animation-duration: 5s;
  animation-duration: 5s;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-color: #222;
}

@-moz-keyframes shimmer {
  0% {
    background-position: top left;
  }

  100% {
    background-position: top right;
  }
}

@-webkit-keyframes shimmer {
  0% {
    background-position: top left;
  }

  100% {
    background-position: top right;
  }
}

@-o-keyframes shimmer {
  0% {
    background-position: top left;
  }

  100% {
    background-position: top right;
  }
}

@-ms-keyframes shimmer {
  0% {
    background-position: top left;
  }

  100% {
    background-position: top right;
  }
}

@keyframes shimmer {
  0% {
    background-position: top left;
  }

  100% {
    background-position: top right;
  }
}

.draw-box,
.winning-box,
.draw-box-mobile,
.winning-box-mobile, 
.header-box,
.footer-box {
  position: relative;
  overflow: hidden;
  margin: 0px;
  text-align: center;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  background: #fff1f180;
}

.header-box,
.footer-box {
  position: fixed;
  font-weight: bold;
  width: 40%;
  left: 30%;
}


.header-box {
  height: 8vh;
  font-size: 2vw;
  font-weight: bold;
  text-transform: uppercase;
  top: 1vh;
}

.header-box span {
  font-size: 1.5vw;
}

.footer-box {
  height: 15vh;
  font-size: 0.5vw;
  bottom: 5vh;
}



.draw-box,
.winning-box {
  height: 50vh;
  width: 40vw;
  max-width: 40vw;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 4.8rem;
  color: #1d2227;
}

.draw-box-mobile,
.winning-box-mobile {
  height: 50vh;
  width: 90vw;
  max-width: 90vw;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 4.8rem;
  color: #1d2227;
}

.draw-box,
.draw-box-mobile {
  border: 0.5rem solid #1d2227;
}
.header-box,
.footer-box,
.winning-box,
.winning-box-mobile {
  display: grid;
  align-content: center;
}

li {
  font-size: larger;
  letter-spacing: 2rem;
}

.draw-box::before,
.draw-box-mobile::before {
  top: 0;
  left: 0;
  z-index: 1;
  content: '';
  width: 100%;
  height: 15vh;
  position: absolute;
  font-size: 2.4rem;
  color: white;
  border-radius: 0.5rem;
  background: linear-gradient(180deg, #fff1f19d, rgba(255, 142, 113, 0));
}
.draw-box::after,
.draw-box-mobile::after {
  bottom: 0;
  left: 0;
  z-index: 1;
  content: '';
  width: 100%;
  height: 15vh;
  position: absolute;
  font-size: 2.4rem;
  color: white;
  border-radius: 0.5rem;
  background: linear-gradient(180deg, rgba(255, 142, 113, 0), #fff1f19d);
}

.animationList,
ul {
  padding: 0;
}

/* scrolling list */

ul {
  opacity: 1;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.scrollUp {
  -webkit-animation: scrollUp 10s 0.2s ease-in-out 1 normal forwards;
  animation: scrollUp 10s 0.2s ease-in-out 1 normal forwards;
}

@-webkit-keyframes scrollUp {
  from {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  to {
    -webkit-transform: translateY(-90%);
    transform: translateY(-90%);
  }
}

@keyframes scrollUp {
  from {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  to {
    -webkit-transform: translateY(-90%);
    transform: translateY(-90%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s cubic-bezier(1, 0.2, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.winning-info {
  text-align: left;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0 !important;
  line-height: 1.5rem;
  padding: 1rem;
  padding-left: 5rem;
}

.winning-info span {
  font-size: 1.5rem;
}

.click-btn {
  display: none !important;
}

.transparent-btn {
  cursor: none;
  border: none;
  background-color: transparent;
  height: 90%;
  width: 100%;
}

/* CSS */
.button-73 {
  appearance: none;
  background-color: #ffffff;
  border-radius: 40em;
  border-style: none;
  box-shadow: #adcfff 0 -12px 6px inset;
  box-sizing: border-box;
  color: #000000;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.24px;
  margin: 0;
  outline: none;
  padding: 1rem 1.3rem;
  quotes: auto;
  text-align: center;
  text-decoration: none;
  transition: all 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-73:hover {
  background-color: #ffc229;
  box-shadow: #ff6314 0 -6px 8px inset;
  transform: scale(1.125);
}

.button-73:active {
  transform: scale(1.025);
}

@media (min-width: 768px) {
  .button-73 {
    font-size: 1.5rem;
    padding: 0.75rem 2rem;
  }
}
</style>
