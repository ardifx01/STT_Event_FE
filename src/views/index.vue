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
import { home, personAdd, helpCircle, radio, library, search, camera } from 'ionicons/icons';
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
      camera,
      onTabChange
    };
  },
};
</script>

<template>
<Beranda />
</template>
