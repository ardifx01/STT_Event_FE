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
 
});
</script>
<template>
  <ion-page>
    <ion-content>
      <!-- Hero Section -->
      <div class="hero-section">
        <img src="/img/header.png" alt="Security Illustration" />
      </div>
      <ion-grid class="ion-container ion-margin-top">
        <ion-row class="ion-justify-content-center">
          <ion-col size="11" size-md="6" class="ion-align-self-center">
            <ion-col size="12" size-md="10">
              <h6 class="orange-text ion-no-margin"><strong>Ready to</strong></h6>
              <h5 class="blue-text ion-no-margin"><strong>unlock the new era of technology</strong></h5>
              <h6 class="purple-text ion-no-margin"><strong>in your company?</strong></h6>
              
              <ion-text class="paragraph-text">
                <p>Join us for an insightful journey into the world of <strong>IT Infrastructure and Cyber Resiliency!</strong>
                  We are thrilled to <strong>invite you</strong> to an exclusive event dedicated to exploring the
                  latest advancements in IT infrastructure and the critical importance of cyber resiliency in
                  today's digital landscape.</p>
                
                <p>At STT Solutions Day, you will have the <strong>opportunity</strong> to:</p>
                
                <ul>
                  <li>Gain valuable insights from industry experts</li>
                  <li>Discover <strong>innovative technologies</strong> and strategies</li>
                  <li>Network with like-minded professionals</li>
                  <li>Learn how to <strong>safeguard</strong> your organization against cyber threats</li>
                </ul>
                
                <p>Don't miss out on this chance to strengthen your IT infrastructure and enhance your cyber resilience.
                  <strong>Join us</strong> for an informative and engaging event that will empower you to
                  protect your digital assets and stay ahead in the ever-evolving tech landscape.</p>
                
                <p>Please <strong class="blue-text">RSVP by 23 October 2023</strong>
                  secure your spot at STT Solutions Day. Space is limited, so early registration is encouraged.
                  We look forward to your presence and meaningful contributions to this important conversation.</p>
              </ion-text>
            </ion-col>
          </ion-col>
          
          <ion-col size="11" size-md="6" class="ion-align-self-center ion-text-center">
            <img src="/img/unlock.png" alt="Unlock illustration" class="w-100">
          </ion-col>
        </ion-row>
        <ion-row class="">
          <ion-col size="12" size-md="6" class="ion-align-self-center mobile-detail-event">
            <ion-row>
              <ion-col size="3" class="ion-text-end">
                <ion-img src="/img/location.png" class="event-icon"></ion-img>
              </ion-col>
              <ion-col size="8" class="event-details mobile-detail-event ion-align-self-center">
                <ion-text color="dark">
                  <h2 class="ion-no-margin"><strong>Shangri-La Hotel, Jakarta</strong></h2>
                  <p class="ion-no-margin">1st Floor, Indonesian Room</p>
                  <p class="ion-no-margin">Sumatera - Sulawesi</p>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="12" size-md="6" class="ion-align-self-center mobile-detail-event">
            <ion-row>
              <ion-col size="3" class="ion-text-end">
                <ion-img src="/img/time.png" class="event-icon"></ion-img>
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
                  <h2><strong>STT AI EXPERIENCE DAY</strong></h2>
                  <h4>AI IN ACTION : REAL WORLD USE CASES FOR COMPETITIVE ADVANTAGES</h4>
                </ion-card-title>
              </ion-card-header>
              
              <ion-card-content class="schedule">
                <!-- Schedule Header -->
                <div class="schedule-header">
                  <div class="schedule-time">Schedule</div>
                  <div class="schedule-agenda">Agenda</div>
                  <div class="schedule-speaker">Speaker</div>
                  <div class="schedule-topic">Topic</div>
                  <div class="schedule-brand">Brand</div>
                  <div class="schedule-solution">Solution</div>
                </div>
                
                <!-- Morning Sessions -->
                <div class="schedule-item">
                  <div class="schedule-time-content">09.30 - 09.45<br><small>15 min</small></div>
                  <div class="schedule-agenda-content">Opening</div>
                  <div class="schedule-speaker-content"><strong>Arianto</strong></div>
                  <div class="schedule-topic-content">Sapta Tunas Achievement & Roadmap</div>
                  <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">09.45 - 10.00<br><small>15 min</small></div>
                  <div class="schedule-agenda-content">Keynote Speech</div>
                  <div class="schedule-speaker-content"><strong>Erwin</strong></div>
                  <div class="schedule-topic-content"></div>
                  <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">10.00 - 10.30<br><small>30 min</small></div>
                  <div class="schedule-agenda-content">Background</div>
                  <div class="schedule-speaker-content"><strong>Andre</strong></div>
                  <div class="schedule-topic-content">Current Challenges & Latest IT Trends</div>
                  <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">10.30 - 11.15<br><small>45 min</small></div>
                  <div class="schedule-agenda-content">Session 1</div>
                  <div class="schedule-speaker-content"><strong>Bram</strong></div>
                  <div class="schedule-topic-content">Cloud Transformation</div>
                  <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">11.15 - 12.00<br><small>45 min</small></div>
                  <div class="schedule-agenda-content">Session 2</div>
                  <div class="schedule-speaker-content"><strong>David</strong></div>
                  <div class="schedule-topic-content">Dell AI Factory</div>
                  <div class="schedule-brand-content"><strong>Dell</strong></div>
                  <div class="schedule-solution-content"></div>
                </div>
                
                <div class="schedule-item lunch-break">
                  <div class="schedule-time-content">12.00 - 13.00<br><small>60 min</small></div>
                  <div class="schedule-agenda-content" colspan="6"><strong>Networking Lunch</strong></div>
                </div>
                
                <!-- Breakout A Section -->
                <div class="schedule-section-header">
                  <h3>Breakout A (AI/ML & Data Management)</h3>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">13.00 - 13.30<br><small>30 min</small></div>
                  <div class="schedule-agenda-content">Session 2</div>
                  <div class="schedule-speaker-content"><strong>Victor</strong></div>
                  <div class="schedule-topic-content">Master Data Management (Pentaho)</div>
                  <div class="schedule-brand-content"><strong>Xeratic</strong></div>
                  <div class="schedule-solution-content"></div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">13.30 - 14.30<br><small>60 min</small></div>
                  <div class="schedule-agenda-content">Session 3</div>
                  <div class="schedule-speaker-content"><strong>Juan Fernando</strong></div>
                  <div class="schedule-topic-content">AI Experience Introduction</div>
                  <div class="schedule-brand-content"><strong>STT</strong></div>
                  <div class="schedule-solution-content">KYX, FD, CV, LLM</div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">14.20 - 15.00<br><small>30 min</small></div>
                  <div class="schedule-agenda-content"></div>
                  <div class="schedule-speaker-content"></div>
                  <div class="schedule-topic-content"></div>
                  <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">15.00 - 15.30<br><small>30 min</small></div>
                  <div class="schedule-agenda-content">Session 4</div>
                  <div class="schedule-speaker-content"><strong>Fitra</strong></div>
                  <div class="schedule-topic-content">AI Infrastructure</div>
                  <div class="schedule-brand-content"><strong>Rafay</strong></div>
                  <div class="schedule-solution-content"></div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">15.30 - 16.00<br><small>30 min</small></div>
                  <div class="schedule-agenda-content">Session 5</div>
                  <div class="schedule-speaker-content"><strong>Eunice</strong></div>
                  <div class="schedule-topic-content">AI Paralel File Storage Solution</div>
                  <div class="schedule-brand-content"><strong>Weka</strong></div>
                  <div class="schedule-solution-content"></div>
                </div>
                
                <!-- Breakout B Section -->
                <div class="schedule-section-header">
                  <h3>Breakout B (Cyber Security)</h3>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">13.00 - 13.40<br><small>40 min</small></div>
                  <div class="schedule-agenda-content">Session 2</div>
                  <div class="schedule-speaker-content"><strong>Rangga</strong></div>
                  <div class="schedule-topic-content">Threat Intelligence</div>
                  <div class="schedule-brand-content"><strong>Cyble</strong></div>
                  <div class="schedule-solution-content">Network Security</div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">13.40 - 14.20<br><small>40 min</small></div>
                  <div class="schedule-agenda-content">Session 3</div>
                  <div class="schedule-speaker-content"><strong>Calvin</strong></div>
                  <div class="schedule-topic-content">Enterprise User Protection</div>
                  <div class="schedule-brand-content"><strong>Cisco</strong></div>
                  <div class="schedule-solution-content">Endpoint Security</div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">14.20 - 14.40<br><small>20 min</small></div>
                  <div class="schedule-agenda-content"></div>
                  <div class="schedule-speaker-content"></div>
                  <div class="schedule-topic-content"></div>
                  <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">14.40 - 15.20<br><small>40 min</small></div>
                  <div class="schedule-agenda-content">Session 4</div>
                  <div class="schedule-speaker-content"><strong>Diar</strong></div>
                  <div class="schedule-topic-content">Security + Observability (AI Ops)</div>
                  <div class="schedule-brand-content"><strong>Elastic</strong></div>
                  <div class="schedule-solution-content"></div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">15.20 - 16.00<br><small>40 min</small></div>
                  <div class="schedule-agenda-content">Session 5</div>
                  <div class="schedule-speaker-content"><strong>Felix</strong></div>
                  <div class="schedule-topic-content">Cyber Resiliency (CRS)</div>
                  <div class="schedule-brand-content"><strong>STT</strong></div>
                  <div class="schedule-solution-content">Data Security</div>
                </div>
                
                <!-- General Session -->
                <div class="schedule-section-header">
                  <h3>General Session</h3>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">16.00 - 16.15<br><small>15 min</small></div>
                  <div class="schedule-agenda-content">Customer Testimonial</div>
                  <div class="schedule-speaker-content"><strong>Alfandi</strong></div>
                  <div class="schedule-topic-content"></div>
                  <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div>
                </div>
                
                <div class="schedule-item">
                  <div class="schedule-time-content">16.15 - 16.30<br><small>15 min</small></div>
                  <div class="schedule-agenda-content">Door Prize & Closing</div>
                  <div class="schedule-speaker-content"><strong>Sastrya</strong></div>
                  <div class="schedule-topic-content"></div>
                  <div class="schedule-brand-content"></div>
                  <div class="schedule-solution-content"></div>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>




