<script>
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
  name: 'Register',
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
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        company: '',
        jobTitle: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    submitForm() {
      console.log('Form submitted:', this.formData);
      // Handle form submission logic here
    }
  }
});
</script>

<template>
  <ion-page>
    <ion-content class="registration-page-content">
      <div class="hero-section">
        <img src="/img/prizes.png" alt="Win The Prize" />
      </div>
      
      <!-- Background Decorative Elements -->
      <div class="background-decoration">
        <div class="bg-circle bg-circle-1"></div>
        <div class="bg-circle bg-circle-2"></div>
        <div class="bg-circle bg-circle-3"></div>
        <div class="bg-wave bg-wave-1"></div>
        <div class="bg-wave bg-wave-2"></div>
      </div>
      
      <ion-grid class="ion-container registration-content">
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="8" size-lg="6">
            <ion-card class="registration-card">
              <ion-card-header class="registration-header">
                <ion-card-title class="registration-title">
                  Registration Form
                </ion-card-title>
              </ion-card-header>
              
              <ion-card-content class="registration-form">
                <ion-list>
                  <ion-item class="form-item">
                    <ion-input
                      v-model="formData.firstName"
                      placeholder="First Name"
                      class="custom-input"
                      fill="outline"
                    ></ion-input>
                  </ion-item>
                  
                  <ion-item class="form-item">
                    <ion-input
                      v-model="formData.lastName"
                      placeholder="Last Name"
                      class="custom-input"
                      fill="outline"
                    ></ion-input>
                  </ion-item>
                  
                  <ion-item class="form-item">
                    <ion-input
                      v-model="formData.company"
                      placeholder="Company"
                      class="custom-input"
                      fill="outline"
                    ></ion-input>
                  </ion-item>
                  
                  <ion-item class="form-item">
                    <ion-input
                      v-model="formData.jobTitle"
                      placeholder="Job Title"
                      class="custom-input"
                      fill="outline"
                    ></ion-input>
                  </ion-item>
                  
                  <ion-item class="form-item">
                    <ion-input
                      v-model="formData.email"
                      type="email"
                      placeholder="Company Email"
                      class="custom-input"
                      fill="outline"
                    ></ion-input>
                  </ion-item>
                  
                  <ion-item class="form-item">
                    <ion-input
                      v-model="formData.phone"
                      type="tel"
                      placeholder="Mobile Phone"
                      class="custom-input"
                      fill="outline"
                    ></ion-input>
                  </ion-item>
                </ion-list>
                
                <ion-button
                  expand="block"
                  class="submit-button"
                  @click="submitForm"
                >
                  SUBMIT
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>