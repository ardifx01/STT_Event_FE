<script lang="ts">
import Home from './components/Home.vue'
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

  import { playCircle, radio, library, search } from 'ionicons/icons';

  export default {
    components: { Home, IonTabs, IonTab, IonToolbar, IonTabBar, IonTabButton, IonContent, IonHeader, IonTitle, IonIcon },
    data() {
      return {
        playCircle,
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
        <Home />
      </div>
    </ion-tab>
    <ion-tab tab="radio">
      <div id="radio-page">
        <ion-header>
          <ion-toolbar>
            <ion-title>Radio</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="example-content">Radio content</div>
        </ion-content>
      </div>
    </ion-tab>

    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home">
        <ion-icon :icon="playCircle" />
        Home
      </ion-tab-button>
      <ion-tab-button tab="radio">
        <ion-icon :icon="radio" />
        Radio
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>
