<script>
import { defineComponent } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
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
  IonFabButton,
  IonText,
  IonImg,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from "@ionic/vue";
import { locationOutline, calendarOutline, add } from "ionicons/icons";

export default defineComponent({
  name: "HomePage",
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
    IonFabButton,
    IonText,
    IonImg,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: null,
      activeBreakoutTab: "sessionA", // Default to Session A
      agree: false,
      isTouched: false,
      isValid: false,
      formData: {
        fullName: "",
        company: "",
        jobTitle: "",
        email: "",
        phone: "",
        session: null,
      },
    };
  },
  methods: {
    validateCheckbox() {
      this.isValid = this.agree;
      this.isTouched = true;
    },
    async submitForm() {
      if (!this.agree) {
        Swal.fire({
          icon: "error",
          title: "Terms Not Accepted",
          text: "You must agree to the terms to continue",
          heightAuto: false,
          customClass: {
            popup: "my-fullscreen-modal",
          },
        });
        return;
      }

      const email = this.formData.email.trim();
      const publicEmailDomains = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "aol.com",
        "protonmail.com",
        "icloud.com",
        "mail.com",
        "zoho.com",
        "yandex.com",
      ];
      const isPublicEmail = publicEmailDomains.some((domain) =>
        email.toLowerCase().endsWith(`@${domain}`)
      );

      if (isPublicEmail) {
        Swal.fire({
          icon: "error",
          title: "Invalid Email",
          text: "Please use your company email address (no Gmail, Yahoo, etc.)",
          heightAuto: false,
          customClass: {
            popup: "my-fullscreen-modal",
          },
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Email",
          text: "Please enter a valid email address",
          heightAuto: false,
          customClass: {
            popup: "my-fullscreen-modal",
          },
        });
        return;
      }
      this.isLoading = true;
      const data = {
        full_name: this.formData.fullName,
        job_title: this.formData.jobTitle,
        company_name: this.formData.company,
        email: this.formData.email,
        mobile_number: this.formData.phone,
        session: this.formData.session,
      };
      console.log(data);
      await axios
        .post(`${import.meta.env.VITE_REGISTRATION_EVENT_STT_API}`, data)
        .then((response) => {
          this.handleEmail(data);
          this.isLoading = false;

          Swal.fire({
            title: "Registration Successfully!",
            text: response.data.message || "Thank you for registering!",
            icon: "success",
            heightAuto: false,
            customClass: {
              popup: "my-fullscreen-modal",
            },
          });

          this.clearForm();
        })
        .catch((error) => {
          console.error("Error:", error);
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message || "Something went wrong!",
            heightAuto: false,
            customClass: {
              popup: "my-fullscreen-modal",
            },
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    clearForm() {
      this.formData = {
        fullName: "",
        company: "",
        jobTitle: "",
        email: "",
        phone: "",
        session: null,
      };
    },
    handleEmail(data) {
      axios
        .post(`${import.meta.env.VITE_REGISTRATION_EVENT_EMAIL_STT_API}`, data)
        .then((response) => {
          console.log("success");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    switchBreakoutTab(tab) {
      this.activeBreakoutTab = tab;
    },
  },
});
</script>
<template>
  <ion-page>
    <!-- loading -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loader"></div>
      <div class="loading-text">Loading...</div>
    </div>
    <!-- loading -->

    <ion-content>
      <!-- Hero Section -->
      <div class="hero-section">
        <img src="/img/asset/microsite.png" alt="Security Illustration" />
      </div>

      <ion-grid class="ion-container ion-margin-top">
        <ion-row>
          <ion-col size="12" size-md="8" size-lg="7">
            <div class="content-section">
              <h1 class="blue-text ion-no-margin text-center oxanium-extrabold">
                <strong>NEW EXPERIENCE!</strong>
              </h1>
              <div class="judul-home">
                <span class="strip left-strip"></span>
                <div class="mt-8">
                  <p class="text-center font-judul-home">AI</p>
                  <h5 class="ion-no-margin font-judul-home">
                    <strong>Experience</strong>
                  </h5>
                  <p class="text-center font-judul-home">Booth</p>
                </div>
                <span class="strip right-strip"></span>
              </div>

              <ion-text class="paragraph-text">
                <p>
                  We are pleased to invite you to our upcoming STT Solution Day,
                  an exclusive event dedicated to exploring the latest
                  innovations in Artificial Intelligence (AI) and Cybersecurity.
                </p>
                <p>
                  As technology rapidly evolves, the convergence of AI and
                  Cybersecurity is transforming the IT landscape, offering new
                  opportunities for growth, automation, and defense. This event
                  is designed to equip our partners with the latest insights,
                  strategies, and real-world solutions to stay ahead in a
                  fast-moving digital era.
                </p>

                <h5><strong>REGISTER NOW!</strong></h5>

                <p>
                  <span class="blue-text"
                    >Secure your spot by RSVP by
                    <strong>11 September 2025.</strong></span
                  >
                  Don't miss the chance to harness the power of AI your company.
                  We look forward to your participation and engaging discussion
                  during the Event. Thank you
                </p>
              </ion-text>
            </div>
          </ion-col>

          <ion-col
            size="12"
            size-md="4"
            size-lg="5"
            class="ion-align-self-center ion-text-center"
          >
            <div class="experience-image">
              <img
                src="/img/asset/asset_experience.png"
                alt="Experience"
                class="responsive-image"
              />
            </div>
          </ion-col>
        </ion-row>

        <div class="bg-gradient-blue">
          <h5 class="oxanium-bold">Event Detail</h5>
        </div>
        <div class="card-event">
          <ion-row class="">
            <ion-col
              size-md="6"
              size-xs="12"
              class="ion-align-self-center mobile-detail-event"
            >
              <ion-row>
                <ion-col size="4" class="ion-text-end">
                  <ion-img
                    src="/img/asset/asset_location.png"
                    class="event-icon"
                  ></ion-img>
                </ion-col>
                <ion-col
                  size="8"
                  class="event-details mobile-detail-event ion-align-self-center"
                >
                  <ion-text color="dark">
                    <h2 class="ion-no-margin">
                      <strong>Shangri-La Hotel, Jakarta</strong>
                    </h2>
                    <p class="ion-no-margin">1st Floor, Indonesian Room</p>
                  </ion-text>
                </ion-col>
              </ion-row>
            </ion-col>

            <ion-col
              size-md="6"
              size-xs="12"
              class="ion-align-self-center mobile-detail-event"
            >
              <ion-row>
                <ion-col size="4" class="ion-text-end">
                  <ion-img
                    src="/img/asset/asset_date.png"
                    class="event-icon"
                  ></ion-img>
                </ion-col>
                <ion-col
                  size="8"
                  class="event-details mobile-detail-event ion-align-self-center"
                >
                  <ion-text color="dark">
                    <h2 class="ion-no-margin">
                      <strong>Tuesday, 11 September 2025s</strong>
                    </h2>
                    <p class="ion-no-margin">09.00 - 17.00</p>
                  </ion-text>
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
        </div>
      </ion-grid>
      <div class="schedule-bg-wrapper">
        <!-- Event Schedule Section -->
        <ion-grid class="ion-container ion-margin-top">
          <ion-row>
            <ion-col size="12">
              <ion-card class="schedule-background">
                <ion-card-header class="schedule-card-title">
                  <ion-card-title class="ion-text-center">
                    <h2 class="oxanium-bold letters-spacing">
                      <strong>General Session</strong>
                    </h2>
                    <!-- <h4>AI IN ACTION : REAL WORLD USE CASES FOR COMPETITIVE ADVANTAGES</h4> -->
                  </ion-card-title>
                </ion-card-header>

                <ion-card-content class="schedule oxanium-semibold">
                  <!-- Schedule Header -->
                  <div class="schedule-header">
                    <div class="schedule-time letters-spacing">Time</div>
                    <div class="schedule-topic letters-spacing">Topic</div>
                    <div class="schedule-speaker letters-spacing">Speaker</div>
                    <!-- <div class="schedule-brand">Brand</div>
                  <div class="schedule-solution">Solution</div> -->
                  </div>

                  <!-- Morning Sessions -->
                  <div class="schedule-item">
                    <div class="schedule-time-content table-center">
                      09.30 - 09.45<br /><small>15 min</small>
                    </div>
                    <div class="schedule-topic-content table-center">
                      Sapta Tunas Achievement & Roadmap
                    </div>
                    <div class="schedule-speaker-content table-center">
                      <strong>Arianto</strong>
                    </div>
                  </div>

                  <div class="schedule-item schedule-item-blue">
                    <div
                      class="schedule-time-content schedule-time-content-blue table-center"
                    >
                      09.45 - 10.00<br /><small>15 min</small>
                    </div>
                    <div class="schedule-agenda-content table-center">
                      Keynote Speech
                    </div>
                    <div class="schedule-speaker-content table-center">
                      <strong>Erwin</strong>
                    </div>
                  </div>

                  <div class="schedule-item">
                    <div class="schedule-time-content table-center">
                      10.00 - 10.30<br /><small>30 min</small>
                    </div>
                    <div class="schedule-topic-content table-center">
                      Current Challenges & Latest IT Trends
                    </div>
                    <div class="schedule-speaker-content table-center">
                      <strong>Andre</strong>
                    </div>
                  </div>

                  <div class="schedule-item schedule-item-blue">
                    <div
                      class="schedule-time-content schedule-time-content-blue table-center"
                    >
                      10.30 - 11.15<br /><small>45 min</small>
                    </div>
                    <div class="schedule-topic-content table-center">
                      Cloud Transformation
                    </div>
                    <div class="schedule-speaker-content table-center">
                      <strong>Bram</strong>
                    </div>
                  </div>

                  <div class="schedule-item">
                    <div class="schedule-time-content table-center">
                      11.15 - 12.00<br /><small>45 min</small>
                    </div>
                    <div class="schedule-topic-content table-center">
                      Dell AI Factory
                    </div>
                    <div class="schedule-speaker-content table-center">
                      <strong>David</strong>
                    </div>
                  </div>

                  <div class="schedule-item lunch-break schedule-item-blue">
                    <div
                      class="schedule-time-content schedule-time-content-blue"
                    >
                      12.00 - 13.00<br /><small>60 min</small>
                    </div>
                    <div
                      class="schedule-time-content-blue text-center table-center"
                    >
                      <strong>Networking Lunch</strong>
                    </div>
                  </div>

                  <!-- Breakout Sessions Tab Container -->
                  <div class="breakout-tabs-container">
                    <!-- Tab Navigation -->
                    <div class="breakout-tab-nav">
                      <button
                        class="breakout-tab-button"
                        :class="{ active: activeBreakoutTab === 'sessionA' }"
                        @click="switchBreakoutTab('sessionA')"
                      >
                        <span class="tab-title">Session A</span>
                        <span class="tab-subtitle">AI/ML Data Management</span>
                      </button>
                      <button
                        class="breakout-tab-button"
                        :class="{ active: activeBreakoutTab === 'sessionB' }"
                        @click="switchBreakoutTab('sessionB')"
                      >
                        <span class="tab-title">Session B</span>
                        <span class="tab-subtitle">Cyber Security</span>
                      </button>
                    </div>

                    <!-- Tab Content -->
                    <div class="breakout-tab-content">
                      <!-- Session A Content -->
                      <div
                        v-show="activeBreakoutTab === 'sessionA'"
                        class="tab-panel"
                      >
                        <div class="schedule-item">
                          <div class="schedule-time-content table-center">
                            13.00 - 13.30<br /><small>30 min</small>
                          </div>
                          <div class="schedule-topic-content table-center">
                            Master Data Management (Pentaho)
                          </div>
                          <div class="schedule-speaker-content table-center">
                            <strong>Victor</strong>
                          </div>
                        </div>

                        <div class="schedule-item schedule-item-blue">
                          <div
                            class="schedule-time-content table-center schedule-time-content-blue"
                          >
                            13.30 - 14.30<br /><small>60 min</small>
                          </div>
                          <div class="schedule-topic-content table-center">
                            AI Experience Introduction
                          </div>
                          <div class="schedule-speaker-content table-center">
                            <strong>Juan Fernando</strong>
                          </div>
                        </div>

                        <div class="schedule-item">
                          <div class="schedule-time-content table-center">
                            14.20 - 15.00<br /><small>30 min</small>
                          </div>
                          <div class="schedule-speaker-content table-center">
                            -
                          </div>
                          <div class="schedule-topic-content table-center">
                            -
                          </div>
                        </div>

                        <div class="schedule-item schedule-item-blue">
                          <div
                            class="schedule-time-content table-center schedule-time-content-blue"
                          >
                            15.00 - 15.30<br /><small>30 min</small>
                          </div>
                          <div class="schedule-topic-content table-center">
                            AI Infrastructure
                          </div>
                          <div class="schedule-speaker-content table-center">
                            <strong>Fitra</strong>
                          </div>
                        </div>

                        <div class="schedule-item">
                          <div class="schedule-time-content table-center">
                            15.30 - 16.00<br /><small>30 min</small>
                          </div>
                          <div class="schedule-topic-content table-center">
                            AI Paralel File Storage Solution
                          </div>
                          <div class="schedule-speaker-content table-center">
                            <strong>Eunice</strong>
                          </div>
                        </div>
                      </div>

                      <!-- Session B Content -->
                      <div
                        v-show="activeBreakoutTab === 'sessionB'"
                        class="tab-panel"
                      >
                        <div class="schedule-item schedule-item-blue">
                          <div
                            class="schedule-time-content schedule-time-content-blue table-center"
                          >
                            13.00 - 13.40<br /><small>40 min</small>
                          </div>
                          <div class="schedule-topic-content table-center">
                            Threat Intelligence
                          </div>
                          <div class="schedule-speaker-content table-center">
                            <strong>Rangga</strong>
                          </div>
                        </div>

                        <div class="schedule-item">
                          <div class="schedule-time-content table-center">
                            13.40 - 14.20<br /><small>40 min</small>
                          </div>
                          <div class="schedule-topic-content table-center">
                            Enterprise User Protection
                          </div>
                          <div class="schedule-speaker-content table-center">
                            <strong>Calvin</strong>
                          </div>
                        </div>

                        <div class="schedule-item schedule-item-blue">
                          <div
                            class="schedule-time-content schedule-time-content-blue table-center"
                          >
                            14.20 - 14.40<br /><small>20 min</small>
                          </div>
                          <div class="schedule-speaker-content table-center">
                            -
                          </div>
                          <div class="schedule-topic-content table-center">
                            -
                          </div>
                        </div>

                        <div class="schedule-item">
                          <div class="schedule-time-content table-center">
                            14.40 - 15.20<br /><small>40 min</small>
                          </div>
                          <div class="schedule-topic-content table-center">
                            Security + Observability (AI Ops)
                          </div>
                          <div class="schedule-speaker-content table-center">
                            <strong>Diar</strong>
                          </div>
                        </div>

                        <div class="schedule-item schedule-item-blue">
                          <div
                            class="schedule-time-content schedule-time-content-blue table-center"
                          >
                            15.20 - 16.00<br /><small>40 min</small>
                          </div>
                          <div class="schedule-topic-content table-center">
                            Cyber Resiliency (CRS)
                          </div>
                          <div class="schedule-speaker-content table-center">
                            <strong>Felix</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- General Session -->
                  <div class="schedule-section-header">
                    <h3 class="letters-spacing">General Session</h3>
                  </div>

                  <div class="schedule-item">
                    <div class="schedule-time-content table-center">
                      16.00 - 16.15<br /><small>15 min</small>
                    </div>
                    <div class="schedule-topic-content table-center">
                      Customer Testimonial
                    </div>
                    <div class="schedule-speaker-content table-center">
                      <strong>Alfandi</strong>
                    </div>
                    <!-- <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div> -->
                  </div>

                  <div class="schedule-item schedule-item-blue">
                    <div
                      class="schedule-time-content schedule-time-content-blue table-center"
                    >
                      16.15 - 16.30<br /><small>15 min</small>
                    </div>
                    <div class="schedule-agenda-content table-center">
                      Door Prize & Closing
                    </div>
                    <div class="schedule-speaker-content table-center">
                      <strong>Sastrya</strong>
                    </div>
                    <!-- <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div> -->
                  </div>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>

        <!-- Footer Section -->
        <div class="footer-section">
          <div class="footer-bg-image">
            <!-- Win The Prize Section -->
            <div class="footer-content">
              <div class="prize-section">
                <h2 class="prize-title oxanium-bold letters-spacing">
                  Win The Prize
                </h2>

                <!-- Prize Items -->
                <div class="prize-items">
                  <div class="prize-container">
                    <img
                      src="/img/asset/doorprize.png"
                      alt="Prize Items"
                      class="prize-image"
                    />
                    <div class="prize-text-overlay">
                      <div class="prize-item prize-item-left">
                        <p class="prize-name">Samsung Galaxy<br />Watch7</p>
                      </div>
                      <div class="prize-item prize-item-center">
                        <p class="prize-name">Xiaomi Robot Vacuum E10</p>
                      </div>
                      <div class="prize-item prize-item-right">
                        <p class="prize-name">JBL Tune 510BT<br />Wireless</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Registration Form -->
              <div class="registration-form">
                <ion-grid class="ion-container registration-content">
                  <form @submit.prevent="submitForm">
                    <ion-row class="ion-justify-content-center">
                      <ion-col size="12" size-md="8" size-lg="6">
                        <ion-card class="registration-card">
                          <ion-card-header class="registration-header">
                            <ion-card-title class="registration-title">
                              Registration Form
                            </ion-card-title>
                          </ion-card-header>

                          <ion-card-content>
                            <ion-row>
                              <ion-col
                                size="12"
                                size-md="12"
                                class="ion-margin-top"
                              >
                                <ion-input
                                  v-model="formData.fullName"
                                  class="custom-input"
                                  label="Full Name"
                                  label-placement="floating"
                                  fill="outline"
                                  placeholder="Full Name"
                                  autocomplete="given-name"
                                ></ion-input>
                              </ion-col>
                              <ion-col size="12" size-md="6">
                                <ion-input
                                  v-model="formData.company"
                                  placeholder="Company"
                                  class="custom-input"
                                  fill="outline"
                                  label="Company"
                                  label-placement="floating"
                                  autocomplete="organization"
                                ></ion-input>
                              </ion-col>
                              <ion-col size="12" size-md="6">
                                <ion-input
                                  v-model="formData.jobTitle"
                                  placeholder="Job Title"
                                  class="custom-input"
                                  fill="outline"
                                  label="Job Title"
                                  label-placement="floating"
                                  autocomplete="organization-title"
                                ></ion-input>
                              </ion-col>
                              <ion-col size="12" size-md="6">
                                <ion-input
                                  v-model="formData.email"
                                  type="email"
                                  placeholder="Company Email"
                                  class="custom-input"
                                  fill="outline"
                                  label="Company Email"
                                  label-placement="floating"
                                  autocomplete="email"
                                ></ion-input>
                              </ion-col>
                              <ion-col size="12" size-md="6">
                                <ion-input
                                  v-model="formData.phone"
                                  type="tel"
                                  placeholder="Mobile Phone"
                                  class="custom-input"
                                  fill="outline"
                                  label="Mobile Phone"
                                  label-placement="floating"
                                  autocomplete="tel"
                                ></ion-input>
                              </ion-col>
                              <ion-col size="12" size-md="12">
                                <ion-select
                                  v-model="formData.session"
                                  placeholder="Select Session"
                                  interface="popover"
                                  label="Select Session"
                                  label-placement="floating"
                                  fill="outline"
                                  class="custom-input"
                                >
                                  <ion-select-option value="1"
                                    >AI/ML & Data Management</ion-select-option
                                  >
                                  <ion-select-option value="2"
                                    >Cyber Security</ion-select-option
                                  >
                                </ion-select>
                              </ion-col>
                              <ion-col
                                size="12"
                                size-md="12"
                                style="text-align: left; padding: 20px"
                              >
                                <p>
                                  PT. Sapta Tunas Teknologi would love to stay
                                  in touch to hear about your needs and to keep
                                  you updated on products, services, solutions,
                                  exclusive offers and special events. For
                                  information on how we protect your personal
                                  data, see our
                                  <a
                                    href="/PrivacyPolicy.docx"
                                    style="text-decoration: solid"
                                    ><b>Privacy Statement</b></a
                                  >. You can unsubscribe at any time.
                                </p>
                                <ion-checkbox
                                  v-model="agree"
                                  @ionChange="validateCheckbox"
                                  :class="{
                                    'ion-valid': isValid,
                                    'ion-invalid': isValid === false,
                                    'ion-touched': isTouched,
                                  }"
                                  label-placement="end"
                                >
                                  Yes, I would like to stay in touch with PT.
                                  Sapta Tunas Teknologi by email.
                                </ion-checkbox>
                              </ion-col>
                              <ion-col size="12" size-md="12">
                                <ion-button
                                  expand="block"
                                  class="submit-button"
                                  type="submit"
                                >
                                  SUBMIT
                                </ion-button>
                              </ion-col>
                            </ion-row>
                          </ion-card-content>
                        </ion-card>
                      </ion-col>
                    </ion-row>
                  </form>
                </ion-grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>



