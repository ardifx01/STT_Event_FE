<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'

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
      errorMessage: null,
      formData: {
        fullName: '',
        company: '',
        jobTitle: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    async submitForm()  {
      console.log('Form submitted:', this.formData);
      // Handle form submission logic here

      const data = {
        full_name: this.formData.fullName,
        job_title: this.formData.jobTitle,
        company_name: this.formData.company,
        email: this.formData.email,
        mobile_number: this.formData.phone
      }

      await axios.post('http://127.0.0.1:8000/api/registration/', data)
      .then(function (response) {
        // alert('Registration successful! wait for th admin to send a confirmation email and barcode ticket .');
        // console.log('Response:', response.data);
        // Optionally, handle success response
        Swal.fire({
          title: "Registration Successfully!",
          text: response.data.message || "Thank you for registering!",
          icon: "success",
          heightAuto: false, // ini bisa membantu
          customClass: {
            popup: 'my-fullscreen-modal'
          },
        });
      })
      .catch(function (error) {
        // console.error('Error:', error);
        // Optionally, handle error response
        // this.errorMessage = error.response.data.message || "Something went wrong!";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message || "Something went wrong!",
          heightAuto: false, // ini bisa membantu
          customClass: {
            popup: 'my-fullscreen-modal'
          },
        });
      })
      .finally(() => {
        this.clearForm(); // Clear the form after submission
      })
    },

    clearForm() {
      this.formData = {
        fullName: '',
        company: '',
        jobTitle: '',
        email: '',
        phone: ''
      };
    }
  }
});
</script>

<template>
  <ion-page>
    <ion-content class="registration-page-content">

      <!-- sweet alert -->
      <!-- sweet alert -->

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
                <ion-list lines="none">
                  <ion-item class="form-item ion-margin-top">
                    <ion-input
                      v-model="formData.fullName"
                      placeholder="Full Name"
                      class="custom-input"
                      fill="outline"
                      label="First Name"
                      label-placement="stacked"
                      clear-input
                      autocomplete="given-name"
                    ></ion-input>
                  </ion-item>
                  
                  <ion-item class="form-item">
                    <ion-input
                      v-model="formData.company"
                      placeholder="Company"
                      class="custom-input"
                      fill="outline"
                      label="Company"
                      label-placement="stacked"
                      clear-input
                      autocomplete="organization"
                    ></ion-input>
                  </ion-item>
                  
                  <ion-item class="form-item">
                    <ion-input
                      v-model="formData.jobTitle"
                      placeholder="Job Title"
                      class="custom-input"
                      fill="outline"
                      label="Job Title"
                      label-placement="stacked"
                      clear-input
                      autocomplete="organization-title"
                    ></ion-input>
                  </ion-item>
                  
                  <ion-item class="form-item">
                    <ion-input
                      v-model="formData.email"
                      type="email"
                      placeholder="Company Email"
                      class="custom-input"
                      fill="outline"
                      label="Company Email"
                      label-placement="stacked"
                      clear-input
                      autocomplete="email"
                    ></ion-input>
                  </ion-item>
                  
                  <ion-item class="form-item">
                    <ion-input
                      v-model="formData.phone"
                      type="tel"
                      placeholder="Mobile Phone"
                      class="custom-input"
                      fill="outline"
                      label="Mobile Phone"
                      label-placement="stacked"
                      clear-input
                      autocomplete="tel"
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


<style scoped>
.my-fullscreen-modal {
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
</style>