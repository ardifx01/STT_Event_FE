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
  IonFabButton,
  IonText,
  IonImg
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
    IonFabButton,
    IonText,
    IonImg
  },
 
});
</script>
<template>
  <ion-page>
    <ion-content>
      <!-- Hero Section -->
      <div class="hero-section">
        <img src="/img/asset/microsite.png" alt="Security Illustration" />
      </div>

      <ion-grid class="ion-container ion-margin-top">

        <ion-row class="ml-4">
          
          <ion-col size="8" class="">
            
            <ion-col class="">
              <h3 class="blue-text ion-no-margin text-center"><strong>NEW EXPERIENCE!</strong></h3>
              <div class="judul-home">
                <span class="strip left-strip"></span>
                  <div class="mt-8">
                    <p class="text-center font-judul-home">AI</p>
                    <h5 class="ion-no-margin font-judul-home"><strong>Experience</strong></h5>
                    <p class="text-center font-judul-home">Booth</p>
                  </div>
                <span class="strip right-strip"></span>
              </div>
              
              <ion-text class="paragraph-text">
                <p>We are pleased to invite you to our upcoming STT Solution Day, an exclusive event dedicated to exploring the latest innovations in Artificial Intelligence (AI) and Cybersecurity.</p>
                <p>As technology rapidly evolves, the convergence of AI and Cybersecurity is transforming the IT landscape, offering new opportunities for growth, automation, and defense. This event is designed to equip our partners with the latest insights, strategies, and real-world solutions to stay ahead in a fast-moving digital era.</p>
                
                <h5><strong>REGISTER NOW!</strong></h5>

                <p><span class="blue-text">Secure your spot by RSVP by <strong>11 September 2025.</strong></span> Don't miss the chance to harness the power of AI your company. We look forward to your participation and engaging discussion during the Event. Thank you</p>
                
              </ion-text>
            </ion-col>

          </ion-col>
          
          <ion-col class="ion-align-self-center ion-text-center ml-8">
            <img src="/img/asset/asset_experience.png" alt="Experience" class="">
          </ion-col>

        </ion-row>

        <div class="bg-gradient-blue">
          <p>Event</p>
        </div>

        <ion-row class="">

          <ion-col class="ion-align-self-center mobile-detail-event">
            <ion-row>
              <ion-col size="3" class="ion-text-end">
                <ion-img src="/img/asset/asset_location.png" class="event-icon"></ion-img>
              </ion-col>
              <ion-col size="8" class="event-details mobile-detail-event ion-align-self-center">
                <ion-text color="dark">
                  <h2 class="ion-no-margin"><strong>Shangri-La Hotel, Jakarta</strong></h2>
                  <p class="ion-no-margin">1st Floor, Indonesian Room</p>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          
          <ion-col class="ion-align-self-center mobile-detail-event">
            <ion-row>
              <ion-col size="3" class="ion-text-end">
                <ion-img src="/img/asset/asset_date.png" class="event-icon"></ion-img>
              </ion-col>
              <ion-col size="8" class="event-details mobile-detail-event ion-align-self-center">
                <ion-text color="dark">
                  <h2 class="ion-no-margin"><strong>Tuesday, 24 October 2023</strong></h2>
                  <p class="ion-no-margin">09.00 - 17.00</p>
                 
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
        
        </ion-row>

      </ion-grid>

      <!-- Event Schedule Section -->
      <ion-grid class="ion-container ion-margin-top">

        <ion-row>
          <ion-col size="12">
            <ion-card>

              <ion-card-header>
                <ion-card-title class="ion-text-center">
                  <h2><strong>General Session</strong></h2>
                  <!-- <h4>AI IN ACTION : REAL WORLD USE CASES FOR COMPETITIVE ADVANTAGES</h4> -->
                </ion-card-title>
              </ion-card-header>
              
              <ion-card-content class="schedule">
                <!-- Schedule Header -->
                <div class="schedule-header">
                  <div class="schedule-time">Time</div>
                  <div class="schedule-agenda">Agenda</div>
                  <div class="schedule-topic">Topic</div>
                  <div class="schedule-speaker">Speaker</div>
                  <!-- <div class="schedule-brand">Brand</div>
                  <div class="schedule-solution">Solution</div> -->
                </div>
                
                <!-- Morning Sessions -->
                <div class="schedule-item">
                  <div class="schedule-time-content border-gray table-center">09.30 - 09.45<br><small>15 min</small></div>
                  <div class="schedule-agenda-content border-gray table-center">Opening</div>
                  <div class="schedule-topic-content border-gray table-center">Sapta Tunas Achievement & Roadmap</div>
                  <div class="schedule-speaker-content border-gray table-center"><strong>Arianto</strong></div>
                </div>
                
                <div class="schedule-item schedule-item-blue">
                  <div class="schedule-time-content schedule-time-content-blue border-blue table-center">09.45 - 10.00<br><small>15 min</small></div>
                  <div class="schedule-topic-content border-blue table-center">-</div>
                  <div class="schedule-agenda-content border-blue table-center">Keynote Speech</div>
                  <div class="schedule-speaker-content border-blue table-center"><strong>Erwin</strong></div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content border-gray table-center">10.00 - 10.30<br><small>30 min</small></div>
                  <div class="schedule-agenda-content border-gray table-center">Background</div>
                  <div class="schedule-topic-content border-gray table-center">Current Challenges & Latest IT Trends</div>
                  <div class="schedule-speaker-content border-gray table-center"><strong>Andre</strong></div>
                </div>
                
                <div class="schedule-item schedule-item-blue">
                  <div class="schedule-time-content schedule-time-content-blue border-blue table-center">10.30 - 11.15<br><small>45 min</small></div>
                  <div class="schedule-agenda-content border-blue table-center">Session 1</div>
                  <div class="schedule-topic-content border-blue table-center">Cloud Transformation</div>
                  <div class="schedule-speaker-content border-blue table-center"><strong>Bram</strong></div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content border-gray table-center">11.15 - 12.00<br><small>45 min</small></div>
                  <div class="schedule-agenda-content border-gray table-center">Session 2</div>
                  <div class="schedule-topic-content border-gray table-center">Dell AI Factory</div>
                  <div class="schedule-speaker-content border-gray table-center"><strong>David</strong></div>
                </div>
                
                <div class="schedule-item lunch-break schedule-item-blue">
                  <div class="schedule-time-content schedule-time-content-blue border-blue">12.00 - 13.00<br><small>60 min</small></div>
                  <div class="schedule-time-content-blue text-center table-center border-blue"><strong>Networking Lunch</strong></div>
                </div>
                
                <!-- Breakout A Section -->
                <div class="schedule-section-header">
                  <h3>Breakout A (AI/ML & Data Management)</h3>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content border-gray table-center">13.00 - 13.30<br><small>30 min</small></div>
                  <div class="schedule-agenda-content border-gray table-center">Session 2</div>
                  <div class="schedule-topic-content border-gray table-center">Master Data Management (Pentaho)</div>
                  <div class="schedule-speaker-content border-gray table-center"><strong>Victor</strong></div>
                  <!-- <div class="schedule-brand-content"><strong>Xeratic</strong></div>
                  <div class="schedule-solution-content"></div> -->
                </div>
                
                <div class="schedule-item schedule-item-blue">
                  <div class="schedule-time-content border-blue table-center schedule-time-content-blue">13.30 - 14.30<br><small>60 min</small></div>
                  <div class="schedule-agenda-content border-blue table-center">Session 3</div>
                  <div class="schedule-topic-content border-blue table-center">AI Experience Introduction</div>
                  <div class="schedule-speaker-content border-blue table-center"><strong>Juan Fernando</strong></div>
                  <!-- <div class="schedule-brand-content"><strong>STT</strong></div>
                  <div class="schedule-solution-content">KYX, FD, CV, LLM</div> -->
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content border-gray table-center">14.20 - 15.00<br><small>30 min</small></div>
                  <div class="schedule-agenda-content border-gray table-center">-</div>
                  <div class="schedule-speaker-content border-gray table-center">-</div>
                  <div class="schedule-topic-conten border-gray table-centert">-</div>
                  <!-- <div class="schedule-brand-content">-</div>
                  <div class="schedule-solution-content"></div> -->
                </div>
                
                <div class="schedule-item schedule-item-blue">
                  <div class="schedule-time-content border-blue table-center schedule-time-content-blue">15.00 - 15.30<br><small>30 min</small></div>
                  <div class="schedule-agenda-content border-blue table-center">Session 4</div>
                  <div class="schedule-topic-content border-blue table-center">AI Infrastructure</div>
                  <div class="schedule-speaker-content border-blue table-center"><strong>Fitra</strong></div>
                  <!-- <div class="schedule-brand-content"><strong>Rafay</strong></div>
                  <div class="schedule-solution-content"></div> -->
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content border-gray table-center">15.30 - 16.00<br><small>30 min</small></div>
                  <div class="schedule-agenda-content border-gray table-center">Session 5</div>
                  <div class="schedule-topic-content border-gray table-center">AI Paralel File Storage Solution</div>
                  <div class="schedule-speaker-content border-gray table-center"><strong>Eunice</strong></div>
                  <!-- <div class="schedule-brand-content"><strong>Weka</strong></div>
                  <div class="schedule-solution-content"></div> -->
                </div>
                
                <!-- Breakout B Section -->
                <div class="schedule-section-header">
                  <h3>Breakout B (Cyber Security)</h3>
                </div>
                
                <div class="schedule-item schedule-item-blue">
                  <div class="schedule-time-content schedule-time-content-blue border-blue table-center">13.00 - 13.40<br><small>40 min</small></div>
                  <div class="schedule-agenda-content border-blue table-center">Session 2</div>
                  <div class="schedule-topic-content border-blue table-center">Threat Intelligence</div>
                  <div class="schedule-speaker-content border-blue table-center"><strong>Rangga</strong></div>
                  <!-- <div class="schedule-brand-content"><strong>Cyble</strong></div>
                  <div class="schedule-solution-content">Network Security</div> -->
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content border-gray table-center">13.40 - 14.20<br><small>40 min</small></div>
                  <div class="schedule-agenda-content border-gray table-center">Session 3</div>
                  <div class="schedule-topic-content border-gray table-center">Enterprise User Protection</div>
                  <div class="schedule-speaker-content border-gray table-center"><strong>Calvin</strong></div>
                  <!-- <div class="schedule-brand-content"><strong>Cisco</strong></div>
                  <div class="schedule-solution-content">Endpoint Security</div> -->
                </div>
                
                <div class="schedule-item schedule-item-blue">
                  <div class="schedule-time-content schedule-time-content-blue border-blue table-center">14.20 - 14.40<br><small>20 min</small></div>
                  <div class="schedule-agenda-content border-blue table-center">-</div>
                  <div class="schedule-speaker-content border-blue table-center">-</div>
                  <div class="schedule-topic-content border-blue table-center">-</div>
                  <!-- <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div> -->
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content border-gray table-center">14.40 - 15.20<br><small>40 min</small></div>
                  <div class="schedule-agenda-content border-gray table-center">Session 4</div>
                  <div class="schedule-topic-content border-gray table-center">Security + Observability (AI Ops)</div>
                  <div class="schedule-speaker-content border-gray table-center"><strong>Diar</strong></div>
                  <!-- <div class="schedule-brand-content"><strong>Elastic</strong></div>
                  <div class="schedule-solution-content"></div> -->
                </div>
                
                <div class="schedule-item schedule-item-blue">
                  <div class="schedule-time-content schedule-time-content-blue border-blue table-center">15.20 - 16.00<br><small>40 min</small></div>
                  <div class="schedule-agenda-content border-blue table-center">Session 5</div>
                  <div class="schedule-topic-content border-blue table-center">Cyber Resiliency (CRS)</div>
                  <div class="schedule-speaker-content border-blue table-center"><strong>Felix</strong></div>
                  <!-- <div class="schedule-brand-content"><strong>STT</strong></div>
                  <div class="schedule-solution-content">Data Security</div> -->
                </div>
                
                <!-- General Session -->
                <div class="schedule-section-header">
                  <h3>General Session</h3>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content border-gray table-center">16.00 - 16.15<br><small>15 min</small></div>
                  <div class="schedule-agenda-content border-gray table-center">Customer Testimonial</div>
                  <div class="schedule-topic-content border-gray table-center">-</div>
                  <div class="schedule-speaker-content border-gray table-center"><strong>Alfandi</strong></div>
                  <!-- <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div> -->
                </div>
                
                <div class="schedule-item schedule-item-blue">
                  <div class="schedule-time-content schedule-time-content-blue border-blue table-center">16.15 - 16.30<br><small>15 min</small></div>
                  <div class="schedule-agenda-content border-blue table-center">Door Prize & Closing</div>
                  <div class="schedule-topic-conten border-blue table-centert">-</div>
                  <div class="schedule-speaker-content border-blue table-center"><strong>Sastrya</strong></div>
                  <!-- <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div> -->
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

      </ion-grid>

      <!-- Footer Section -->
       <div class="">
        <div class="footer-section">
          <img src="/img/asset/win_prize.png" alt="" style="width: 100%;" class="hfull">
        </div>

        <div class="footer-bg-image"></div>
       </div>
    </ion-content>
  </ion-page>
</template>




