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
    toggleCheckbox() {
      this.validateCheckbox();
    },
    validateCheckbox() {
      this.agree = !this.agree;
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
        <img src="/img/asset/header.png" alt="Security Illustration" />
      </div>

      <ion-grid class="ion-container ion-margin-top">
        <ion-row>
          <ion-col size="12" size-md="8" size-lg="7">
            <div class="content-section">
              <div class="judul-home">
                <p class="blue-text text-center oxanium-bold font-judul-home">
                  How AI Boost Your Business with REAL Use Case?
                </p>
              </div>
              <div class="judul-home">
                <span class="strip left-strip"></span>
                <div class="mt-8">
                  <p class="text-center font-judul-home">AI</p>
                  <p class="text-center font-judul-home">Experience</p>
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
                <ion-col size="2" size-md="3" class="ion-text-center">
                  <ion-img
                    src="/img/asset/asset_location.png"
                    class="event-icon"
                  ></ion-img>
                </ion-col>
                <ion-col
                  size="10"
                  size-md="9"
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
                <ion-col size="2" size-md="3" class="ion-text-end">
                  <ion-img
                    src="/img/asset/asset_date.png"
                    class="event-icon"
                  ></ion-img>
                </ion-col>
                <ion-col
                  size="10"
                  size-md="9"
                  class="event-details mobile-detail-event ion-align-self-center"
                >
                  <ion-text color="dark">
                    <h2 class="ion-no-margin">
                      <strong>Thursday, 11 September 2025</strong>
                    </h2>
                    <p class="ion-no-margin">08.45 - 17.00</p>
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
                <!-- header -->
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
                  <!-- table biru -->
                  <div class="schedule-item schedule-item-blue">
                    <div
                      class="schedule-time-content schedule-time-content-blue table-center"
                    >
                      08.45 - 09.30
                    </div>

                    <div
                      class="schedule-agenda-content schedule-agenda-content-blue table-topic schedule-time-content-blue customer-testimonial"
                    >
                      <strong class="color-font-gray">Registration</strong>
                    </div>
                  </div>

                  <div class="schedule-item schedule-item-blue">
                    <div class="schedule-time-content table-center">
                      09.30 - 09.35
                    </div>
                    <div class="schedule-topic-content table-topic">
                      Greeting Welcome from PT Sapta Tunas Teknologi
                    </div>
                    <div class="schedule-speaker-content table-speaker">
                      <div class="partner-img-mobile">
                        <img src="/img/partner/stt.png" width="60" />
                      </div>
                      <div class="speaker-info">
                        <strong>Arianto</strong>
                        <div style="font-size: 11px">
                          General Manager, PT Sapta Tunas Teknologi
                        </div>
                      </div>
                      <img
                        class="partner-img"
                        src="/img/partner/stt.png"
                        width="60"
                      />
                    </div>
                  </div>

                  <!-- table biru -->
                  <div class="schedule-item schedule-item-blue">
                    <div
                      class="schedule-time-content schedule-time-content-blue table-center"
                    >
                      09.35 - 09.45
                    </div>
                    <div
                      class="schedule-agenda-content schedule-time-content-blue table-topic table-center"
                    >
                      Keynote Speech
                    </div>

                    <div
                      class="schedule-speaker-content schedule-time-content-blue table-speaker table-center"
                    >
                      <div class="partner-img-mobile">
                        <img src="/img/partner/dell1.png" width="90" />
                      </div>
                      <div class="speaker-info">
                        <strong>Erwin Yusran</strong>
                        <div style="font-size: 11px">
                          Head of Data Center Sales, Dell Technologies
                        </div>
                      </div>
                      <img
                        class="partner-img"
                        src="/img/partner/dell1.png"
                        width="70"
                      />
                    </div>
                  </div>

                  <div class="schedule-item schedule-item-blue">
                    <div class="schedule-time-content table-center">
                      09.45 - 10.45
                    </div>
                    <div
                      class="schedule-topic-content table-topic panel-discussion-title"
                    >
                      <div class="panel-discussion-content">
                        <strong>Panel Discussion :</strong>
                      </div>
                      <div class="panel-discussion-content">
                        Future-Proofing Your Business: How AI and Data
                        Sovereignty Shape Tomorrow's IT Landscape
                      </div>
                    </div>

                    <div class="schedule-speaker-content table-speaker">
                      <div class="partner-img-mobile">
                        <img src="/img/partner/stt.png" width="60" />
                      </div>
                      <div class="speaker-info">
                        <div class="">
                          <strong>T. Bram</strong>
                          <div style="font-size: 11px">
                            Enterprise & AI Architect
                          </div>
                        </div>
                        <div class="">
                          <strong>Jimmy Y</strong>
                          <div style="font-size: 11px">AI Expert</div>
                        </div>
                        <div class="">
                          <strong>Victor G</strong>
                          <div style="font-size: 11px">
                            Data Strategy Expert
                          </div>
                        </div>
                      </div>
                      <img
                        class="partner-img"
                        src="/img/partner/stt.png"
                        width="60"
                      />
                    </div>
                  </div>

                  <!-- table biru -->
                  <div class="schedule-item schedule-item-blue">
                    <div
                      class="schedule-time-content schedule-time-content-blue table-center"
                    >
                      10.45 - 11.15
                    </div>
                    <div
                      class="schedule-topic-content table-topic schedule-time-content-blue"
                    >
                      Dell AI Factory
                    </div>

                    <div
                      class="schedule-speaker-content table-speaker schedule-time-content-blue"
                    >
                      <div class="partner-img-mobile">
                        <img src="/img/partner/dell1.png" width="90" />
                      </div>
                      <div class="speaker-info">
                        <strong>Fardy Umar</strong>
                        <div style="font-size: 11px">
                          Solution Architect, Dell Technologies
                        </div>
                      </div>
                      <img
                        class="partner-img"
                        src="/img/partner/dell1.png"
                        width="70"
                      />
                    </div>
                  </div>

                  <div class="schedule-item schedule-item-blue">
                    <div class="schedule-time-content table-center">
                      11.15 - 12.00
                    </div>
                    <div class="schedule-topic-content table-topic">
                      Nutanix Enterprise AI : Private and Secure Centralized
                      Inferencing for GenAI
                    </div>
                    <div class="schedule-speaker-content table-speaker">
                      <div class="partner-img-mobile">
                        <img src="/img/partner/nutanix1.png" width="50" />
                      </div>
                      <div class="speaker-info">
                        <strong>Sahdam Husen</strong>
                        <div style="font-size: 11px">
                          Senior System Engineer, Nutanix Indonesia
                        </div>
                      </div>
                      <img
                        class="partner-img"
                        src="/img/partner/nutanix1.png"
                        width="50"
                      />
                    </div>
                  </div>

                  <!-- <div class="schedule-item schedule-item-blue">
                    <div class="schedule-time-content table-center schedule-time-content-blue">
                      12.00 - 13.30
                    </div>
                    <div class="schedule-topic-content table-topic schedule-time-content-blue">
                      Networking Lunch
                    </div>
                    <div class="schedule-speaker-content table-speaker schedule-time-content-blue">
                      <div class="partner-img-mobile">
                        <img src="/img/partner/dell.png" width="40" />
                      </div>
                      <div class="speaker-info">
                        <strong>Fardy Umar</strong>
                        <div style="font-size: 11px">
                          Solution Architect, Dell Technologies
                        </div>
                      </div>
                      <img
                        class="partner-img"
                        src="/img/partner/dell.png"
                        width="40"
                      />
                    </div>
                  </div> -->

                  <div class="schedule-item schedule-item-blue">
                    <div class="schedule-time-content table-center">
                      12.00 - 13.30
                    </div>

                    <div
                      class="schedule-agenda-content schedule-agenda-content-blue table-topic customer-testimonial"
                    >
                      <strong class="color-font-gray">Networking Lunch</strong>
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
                        <div class="schedule-item schedule-item-blue">
                          <div class="schedule-time-content table-center">
                            13.30 - 14.10
                          </div>
                          <div class="schedule-topic-content table-topic">
                            Dell Data Lakehouse - Modern Datalake Infrastructure
                          </div>
                          <div class="schedule-speaker-content table-speaker">
                            <div class="partner-img-mobile">
                              <img src="/img/partner/dell1.png" width="90" />
                            </div>
                            <div class="speaker-info">
                              <strong>Hendro Kusno</strong>
                              <div style="font-size: 11px">
                                UDS Territory Manager, Dell Technologies
                              </div>
                            </div>
                            <img
                              class="partner-img"
                              src="/img/partner/dell1.png"
                              width="70"
                            />
                          </div>
                        </div>

                        <!-- table biru -->
                        <div class="schedule-item schedule-item-blue">
                          <div
                            class="schedule-time-content table-center schedule-time-content-blue"
                          >
                            14.10 - 14.50
                          </div>
                          <div
                            class="schedule-topic-content table-topic schedule-time-content-blue"
                          >
                            Transform to Perform : Enterprise AI Synergy via
                            Seeing, Understanding and Acting in Action
                          </div>
                          <div
                            class="schedule-speaker-content table-speaker schedule-time-content-blue"
                          >
                            <div class="partner-img-mobile">
                              <img src="/img/partner/stt.png" width="60" />
                            </div>
                            <div class="speaker-info">
                              <strong>Juan - Fernando</strong>
                              <div style="font-size: 11px">
                                AI Consultant, PT Sapta Tunas Teknologi
                              </div>
                            </div>
                            <img
                              class="partner-img"
                              src="/img/partner/stt.png"
                              width="60"
                            />
                          </div>
                        </div>

                        <div class="schedule-item schedule-item-blue">
                          <div class="schedule-time-content table-center">
                            14.50 - 15.10
                          </div>

                          <div
                            class="schedule-agenda-content table-topic customer-testimonial"
                          >
                            <strong class="color-font-gray"
                              >Coffee Break</strong
                            >
                          </div>
                        </div>

                        <!-- table biru -->
                        <div class="schedule-item schedule-item-blue">
                          <div
                            class="schedule-time-content table-center schedule-time-content-blue"
                          >
                            15.10 - 15.50
                          </div>
                          <div
                            class="schedule-topic-content table-topic schedule-time-content-blue"
                          >
                            NeuralMesh by WEKA, Accelerating AI
                          </div>
                          <div
                            class="schedule-speaker-content table-speaker schedule-time-content-blue"
                          >
                            <div class="partner-img-mobile">
                              <img src="/img/partner/weka.png" width="50" />
                            </div>
                            <div class="speaker-info">
                              <strong>Eunice Zhou</strong>
                              <div style="font-size: 11px">
                                Regional Sales Manager, WEKA
                              </div>
                            </div>
                            <img
                              class="partner-img"
                              src="/img/partner/weka.png"
                              width="50"
                            />
                          </div>
                        </div>

                        <div class="schedule-item schedule-item-blue">
                          <div class="schedule-time-content table-center">
                            15.50 - 16.30
                          </div>
                          <div class="schedule-topic-content table-topic">
                            Accelerating AI and Cloud Native Adoption
                          </div>
                          <div class="schedule-speaker-content table-speaker">
                            <div class="partner-img-mobile">
                              <img src="/img/partner/rafay.png" width="50" />
                            </div>
                            <div class="speaker-info">
                              <strong>Fitra Alim</strong>
                              <div style="font-size: 11px">
                                Technical Delivery Lead, Refay Systems
                              </div>
                            </div>
                            <img
                              class="partner-img"
                              src="/img/partner/rafay.png"
                              width="50"
                            />
                          </div>
                        </div>
                      </div>

                      <!-- Session B Content -->
                      <div
                        v-show="activeBreakoutTab === 'sessionB'"
                        class="tab-panel"
                      >
                        <div class="schedule-item schedule-item-blue">
                          <div class="schedule-time-content table-center">
                            13.30 - 14.10
                          </div>
                          <div class="schedule-topic-content table-topic">
                            Unmasking Cyber Threats : Unlock the Power of
                            AI-Driven Threat Intelligence
                          </div>
                          <div class="schedule-speaker-content table-speaker">
                            <div class="partner-img-mobile">
                              <img src="/img/partner/cyble.png" width="50" />
                            </div>
                            <div class="speaker-info">
                              <strong>Rangga F.</strong>
                              <div style="font-size: 11px">
                                Sales Director, Cyble.Inc.
                              </div>
                            </div>
                            <img
                              class="partner-img"
                              src="/img/partner/cyble.png"
                              width="50"
                            />
                          </div>
                        </div>

                        <!-- table biru -->
                        <div class="schedule-item schedule-item-blue">
                          <div
                            class="schedule-time-content schedule-time-content-blue table-center"
                          >
                            14.10 - 14.50
                          </div>
                          <div
                            class="schedule-topic-content table-topic schedule-time-content-blue"
                          >
                            Harnessing AI for Next-Generation Threat Defense
                            with Cisco
                          </div>
                          <div
                            class="schedule-speaker-content table-speaker schedule-time-content-blue"
                          >
                            <div class="partner-img-mobile">
                              <img src="/img/partner/cisco.png" width="50" />
                            </div>
                            <div class="speaker-info">
                              <strong>Rein Rachman Putra</strong>
                              <div style="font-size: 11px">
                                Cybersecurity Solutions Engineer, Cisco
                                Indonesia
                              </div>
                            </div>
                            <img
                              class="partner-img"
                              src="/img/partner/cisco.png"
                              width="50"
                            />
                          </div>
                        </div>

                        <div class="schedule-item schedule-item-blue">
                          <div class="schedule-time-content table-center">
                            14.50 - 15.10
                          </div>
                          <div
                            class="schedule-agenda-content table-topic customer-testimonial"
                          >
                            <strong class="color-font-gray"
                              >Coffee Break</strong
                            >
                          </div>
                        </div>

                        <!-- table -->
                        <div class="schedule-item schedule-item-blue">
                          <div
                            class="schedule-time-content schedule-time-content-blue table-center"
                          >
                            15.10 - 15.50
                          </div>
                          <div
                            class="schedule-topic-content table-topic schedule-time-content-blue"
                          >
                            Supercharge SecOps Workflows with AI Driven Security
                            Analytics
                          </div>
                          <div
                            class="schedule-speaker-content table-speaker schedule-time-content-blue"
                          >
                            <div class="partner-img-mobile">
                              <img src="/img/partner/elastic.png" width="50" />
                            </div>
                            <div class="speaker-info">
                              <strong>Diar Firman</strong>
                              <div style="font-size: 11px">
                                Senior Solutions Architect, ELASTIC
                              </div>
                            </div>
                            <img
                              class="partner-img"
                              src="/img/partner/elastic.png"
                              width="50"
                            />
                          </div>
                        </div>

                        <div class="schedule-item schedule-item-blue">
                          <div class="schedule-time-content table-center">
                            15.50 - 16.30
                          </div>
                          <div class="schedule-topic-content table-topic">
                            Surviving Cyber Attacks : Effective Data Recovery
                            Strategies with Dell
                          </div>

                          <div class="schedule-speaker-content table-speaker">
                            <div class="partner-img-mobile">
                              <img src="/img/partner/dell1.png" width="90" />
                            </div>
                            <div class="speaker-info">
                              <strong>Martin Ruslan</strong>
                              <div style="font-size: 11px">
                                Sales Specialist, Dell Technologies
                              </div>
                            </div>
                            <img
                              class="partner-img"
                              src="/img/partner/dell1.png"
                              width="70"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- General Session -->
                  <div class="schedule-section-header">
                    <h3 class="letters-spacing">General Session</h3>
                  </div>

                  <div class="schedule-item schedule-item-blue">
                    <div
                      class="schedule-time-content schedule-time-content-blue table-center"
                    >
                      16.30 - 16.45
                    </div>

                    <div
                      class="schedule-agenda-content schedule-agenda-content-blue table-topic schedule-time-content-blue customer-testimonial"
                    >
                      <strong class="color-font-gray">
                        Customer Testimonial</strong
                      >
                    </div>
                    <!-- <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div> -->
                  </div>

                  <div class="schedule-item schedule-item-blue">
                    <div class="schedule-time-content table-center">
                      16.45 - 17.00
                    </div>
                    <div
                      class="schedule-agenda-content table-topic customer-testimonial"
                    >
                      <strong class="color-font-gray">
                        Grand Prize & Closing</strong
                      >
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
                <div class="prize-subtitle">
                  Grand Prize & Social Media Challenge
                </div>

                <!-- Prize Items -->
                <div class="prize-items">
                  <div class="prize-container">
                    <img
                      src="/img/asset/doorprize2.png"
                      alt="Prize Items"
                      class="prize-image"
                    />
                    <!-- <div class="prize-text-overlay">
                      <div class="prize-item prize-item-left">
                        <p class="prize-name">Samsung Galaxy<br />Watch7</p>
                      </div>
                      <div class="prize-item prize-item-center">
                        <p class="prize-name">Xiaomi Robot Vacuum E10</p>
                      </div>
                      <div class="prize-item prize-item-right">
                        <p class="prize-name">JBL Tune 510BT<br />Wireless</p>
                      </div>
                    </div> -->
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
                                  fill="outline"
                                  class="custom-select"
                                >
                                  <ion-select-option
                                    class="custom-option"
                                    value="1"
                                    >AI/ML & Data Management</ion-select-option
                                  >
                                  <ion-select-option
                                    class="custom-option"
                                    value="2"
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
                                    href="/privacy-policy"
                                    style="text-decoration: solid"
                                  >
                                    <b>Privacy Statement</b> </a
                                  >. You can unsubscribe at any time.
                                </p>
                                <ion-item
                                  lines="none"
                                  button
                                  @click="toggleCheckbox"
                                  style="--padding-start: 0"
                                >
                                  <ion-checkbox
                                    slot="start"
                                    v-model="agree"
                                    @ionChange="validateCheckbox"
                                    :class="{
                                      'ion-valid': isValid,
                                      'ion-invalid': isValid === false,
                                      'ion-touched': isTouched,
                                    }"
                                  ></ion-checkbox>

                                  <p
                                    class="ion-text-wrap"
                                    style="color: #757575"
                                  >
                                    Yes, I would like to stay in touch with PT.
                                    Sapta Tunas Teknologi by email.
                                  </p>
                                </ion-item>
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


              <!-- support by -->
              <div class="custom-container">
                <h1 class="prize-title oxanium-bold letters-spacing" style="margin-bottom: 60px;">Supported by</h1>
                <ion-grid>
                  <ion-row class="ion-justify-content-center ion-no-padding">
                    <ion-col size="12" size-md="4" size-lg="3" class="col-support">
                      <ion-img src="/img/support/dell.png" class="support-icon"></ion-img>
                    </ion-col>
                    <ion-col size="12" size-md="4" size-lg="3" class="col-support">
                      <ion-img src="/img/support/cyble.png" class="support-icon"></ion-img>
                    </ion-col>
                    <ion-col size="12" size-md="4" size-lg="3" class="col-support">
                      <ion-img src="/img/support/elastic.png" class="support-icon"></ion-img>
                    </ion-col>
                    <ion-col size="12" size-md="4" size-lg="3" class="col-support">
                      <ion-img src="/img/support/cisco.png" class="support-icon"></ion-img>
                    </ion-col>
                    <ion-col size="12" size-md="4" size-lg="3" class="col-support">
                      <ion-img src="/img/support/nutanix.png" class="support-icon"></ion-img>
                    </ion-col>
                    <ion-col size="12" size-md="4" size-lg="3" class="col-support">
                      <ion-img src="/img/support/rafay.png" class="support-icon"></ion-img>
                    </ion-col>
                    <ion-col size="12" size-md="4" size-lg="3" class="col-support">
                      <ion-img src="/img/support/weka.png" class="support-icon"></ion-img>
                    </ion-col>
                    <ion-col size="12" size-md="4" size-lg="3" class="col-support">
                      <ion-img src="/img/support/amd.png" class="support-icon"></ion-img>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </div>
              <!-- support by -->

            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>


