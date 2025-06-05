<script>
import Beranda from './components/Home.vue'
import Register from './components/Register.vue';
import FeedbacksScan from './components/FeedbacksScan.vue';
import {
  IonTabs,
  IonTab,
  IonToolbar,
  IonTabBar,
  IonTabButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonIcon,
} from '@ionic/vue';
import { home, personAdd, helpCircle, radio, library, search } from 'ionicons/icons';
import { ref } from 'vue';

export default {
  components: { 
    Beranda,
    Register,
    FeedbacksScan, 
    IonTabs, 
    IonTab, 
    IonToolbar, 
    IonTabBar, 
    IonTabButton, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonIcon 
  },
  setup() {
    const activeTab = ref('home');
    
    const onTabChange = (event) => {
      if (event && event.detail && event.detail.tab) {
        activeTab.value = event.detail.tab;
      }
    };
    
    return {
      home,
      personAdd,
      helpCircle,
      radio,
      library,
      search,
      activeTab,
      onTabChange
    };
  },
};
</script>

<template>
  <ion-tabs @ionTabsDidChange="onTabChange">
    <ion-tab tab="home">
      <div id="home-page">
        <Beranda />
      </div>
    </ion-tab>
    <ion-tab tab="registerPage">
      <div id="register-page">
        <Register />
      </div>
    </ion-tab>  
    <ion-tab tab="cameraParticipatPage">
      <div id="camera-Participant-Page">
        <FeedbacksScan :is-active="activeTab === 'cameraParticipatPage'" />
      </div>
    </ion-tab>        
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home">
        <ion-icon :icon="home" />
        Beranda
      </ion-tab-button>
      <ion-tab-button tab="cameraParticipatPage">
        <ion-icon :icon="helpCircle" />
        Feedbacks
      </ion-tab-button>
      <ion-tab-button tab="registerPage">
        <ion-icon :icon="personAdd" />
        Register
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>
