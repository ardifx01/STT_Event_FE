<template>
  <ion-page>
    <ion-content>
      <!-- Hero Section -->
      <div class="hero-section ion-padding">
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="6">
              <h1>SOLUTION DAY</h1>
              <h2>24 OCTOBER 2023</h2>
              <p>Securing the Future: Building Resilient Cybersecurity Strategies</p>
            </ion-col>
            <ion-col size="12" size-md="6" class="ion-text-center">
              <img src="" alt="Security Illustration" />
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- Event Details -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Event Detail</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-icon :icon="locationOutline" slot="start"></ion-icon>
            <ion-label>At Dell Innovation Room</ion-label>
          </ion-item>
          <ion-item>
            <ion-icon :icon="calendarOutline" slot="start"></ion-icon>
            <ion-label>24 October 2023</ion-label>
          </ion-item>
        </ion-card-content>
      </ion-card>

      <!-- Schedule Section -->
      <ion-list>
        <ion-list-header>
          <ion-label>Schedule</ion-label>
        </ion-list-header>

        <ion-item>
          <ion-label>
            <h2>09:00 - 10:00</h2>
            <h3>Registration</h3>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Registration Form -->
      <ion-card class="ion-padding">
        <ion-card-header>
          <ion-card-title>Registration Form</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Full Name</ion-label>
            <ion-input type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email"></ion-input>
          </ion-item>
          <ion-button expand="block" class="ion-margin-top">Register Now</ion-button>
        </ion-card-content>
      </ion-card>

      <ion-fab>
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonInput,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/vue';
import { locationOutline, calendarOutline, add } from 'ionicons/icons';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonInput,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton
  },
  setup() {
    return {
      locationOutline,
      calendarOutline,
      add
    };
  }
});
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #4c8dff 0%, #3171e0 100%);
  color: white;
  padding: 2rem;
}

.hero-section h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.hero-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.hero-section img {
  max-width: 100%;
  height: auto;
}
</style>

