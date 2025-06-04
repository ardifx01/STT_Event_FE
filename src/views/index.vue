<script lang="ts">
import Beranda from './components/Home.vue'
import Register from './components/Register.vue';
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

  import { home,personAdd, radio, library, search } from 'ionicons/icons';

  export default {
    components: { 
      Beranda,
      Register, 
      IonTabs, 
      IonTab, 
      IonToolbar, 
      IonTabBar, 
      IonTabButton, 
      IonContent, 
      IonHeader, 
      IonTitle, 
      IonIcon },
    data() {
      return {
        home,
        personAdd,
        radio,
        library,
        search,
      };
    },
  };
</script>
<template>
  <ion-tabs>
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
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home">
        <ion-icon :icon="home" />
        Beranda
      </ion-tab-button>
      <ion-tab-button tab="registerPage">
        <ion-icon :icon="personAdd" />
        Register
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>
