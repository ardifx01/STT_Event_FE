<template>
  <ion-page>
    <ion-content class="ion-padding">
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container">
        <ion-spinner name="crescent"></ion-spinner>
        <p>Loading participants...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <p>{{ error }}</p>
        <ion-button @click="loadParticipants" fill="outline" size="small">Retry</ion-button>
      </div>
      
      <!-- Wheel -->
      <fieldset v-else class="ui-wheel-of-fortune" :style="wheelStyle">
        <ul>
          <li v-for="(participant, index) in participants" :key="participant.id || index" :style="getSegmentStyle(index)">
            {{ participant.name || participant }}
          </li>
        </ul>
        <button type="button" :disabled="isSpinning">
          {{ isSpinning ? 'SPINNING...' : 'SPIN' }}
        </button>
      </fieldset>
      
      <!-- Winner Display -->
      <div v-if="winner" class="winner-display">
        <ion-card>
          <ion-card-header>
            <ion-card-title>🎉 Winner! 🎉</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <h2>{{ typeof winner === 'object' ? winner.name : winner }}</h2>
            <p v-if="winner.email">{{ winner.email }}</p>
            <p v-if="winner.company">{{ winner.company }}</p>
          </ion-card-content>
        </ion-card>
        <ion-button @click="resetWheel" expand="block" fill="outline" class="ion-margin-top">
          Spin Again
        </ion-button>
      </div>
      
      <!-- Participants Info -->
      <div class="participants-info">
        <p>Total Participants: {{ participants.length }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/vue';

export default defineComponent({
  name: 'PrizeDrawEntries',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  },
  data() {
    return {
      participants: [],
      isLoading: true,
      error: null,
      isSpinning: false,
      winner: null,
      animation: null,
      previousEndDegree: 0
    };
  },
  computed: {
    wheelStyle() {
      return {
        '--_items': this.participants.length
      };
    }
  },
  async mounted() {
    await this.loadParticipants();
    this.$nextTick(() => {
      this.initWheelOfFortune();
    });
  },
  methods: {
    async loadParticipants() {
      this.isLoading = true;
      this.error = null;
      
      try {
        // TODO: Replace with actual API call
        const response = await this.fetchParticipantsFromAPI();
        this.participants = response.data;
        
        if (this.participants.length === 0) {
          this.error = 'No participants found';
        }
      } catch (err) {
        this.error = 'Failed to load participants. Please try again.';
        console.error('Error loading participants:', err);
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchParticipantsFromAPI() {
      // Simulasi API call - ganti dengan endpoint yang sebenarnya
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mock data - ganti dengan actual API call
          resolve({
            data: [
              { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Tech Corp' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'Innovation Ltd' },
              { id: 3, name: 'Bob Johnson', email: 'bob@example.com', company: 'StartupXYZ' },
              { id: 4, name: 'Alice Brown', email: 'alice@example.com', company: 'Digital Solutions' },
              { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', company: 'Future Tech' },
              { id: 6, name: 'Diana Davis', email: 'diana@example.com', company: 'Smart Systems' },
              { id: 7, name: 'Eva Martinez', email: 'eva@example.com', company: 'Cloud Nine' },
              { id: 8, name: 'Frank Miller', email: 'frank@example.com', company: 'Data Dynamics' },
              { id: 9, name: 'Grace Lee', email: 'grace@example.com', company: 'AI Solutions' },
              { id: 10, name: 'Henry Wang', email: 'henry@example.com', company: 'BlockTech' },
              { id: 11, name: 'Ivy Chen', email: 'ivy@example.com', company: 'CyberSafe' },
              { id: 12, name: 'Jack Taylor', email: 'jack@example.com', company: 'DevOps Pro' }
            ]
          });
        }, 1000);
      });
      
      // Actual API call example:
      // const response = await fetch('/api/participants');
      // if (!response.ok) throw new Error('Failed to fetch participants');
      // return await response.json();
    },
    
    getSegmentStyle(index) {
      return {
        '--_idx': index + 1
      };
    },
    
    initWheelOfFortune() {
      const node = document.querySelector('.ui-wheel-of-fortune');
      if (!node) return;

      const spin = node.querySelector('button');
      const wheel = node.querySelector('ul');
      
      if (!spin || !wheel) return;

      // Remove existing event listeners
      spin.removeEventListener('click', this.handleSpinClick);
      spin.addEventListener('click', this.handleSpinClick);
    },
    
    handleSpinClick() {
      if (this.isSpinning || this.participants.length === 0) return;
      
      this.isSpinning = true;
      this.winner = null;
      
      const wheel = document.querySelector('.ui-wheel-of-fortune ul');
      if (!wheel) return;
      
      if (this.animation) {
        this.animation.cancel();
      }

      const randomAdditionalDegrees = Math.random() * 360 + 1800;
      const newEndDegree = this.previousEndDegree + randomAdditionalDegrees;

      this.animation = wheel.animate([
        { transform: `rotate(${this.previousEndDegree}deg)` },
        { transform: `rotate(${newEndDegree}deg)` }
      ], {
        duration: 4000,
        direction: 'normal',
        easing: 'cubic-bezier(0.440, -0.205, 0.000, 1.130)',
        fill: 'forwards',
        iterations: 1
      });

      this.previousEndDegree = newEndDegree;
      
      this.animation.addEventListener('finish', () => {
        this.detectWinner(newEndDegree);
        this.isSpinning = false;
      });
    },
    
    detectWinner(finalDegree) {
      if (this.participants.length === 0) return;
      
      // Normalize degree to 0-360 range
      const normalizedDegree = ((finalDegree % 360) + 360) % 360;
      
      // Calculate segment angle
      const segmentAngle = 360 / this.participants.length;
      
      // Since the arrow points to the top and segments start from the right (0 degrees),
      // we need to adjust the calculation. The arrow points at 270 degrees (top).
      // We need to find which segment the arrow is pointing to.
      const arrowPosition = 270; // Arrow points to top (270 degrees)
      const adjustedDegree = (normalizedDegree + arrowPosition) % 360;
      
      // Calculate winning segment index
      // Since segments are arranged clockwise starting from 0 degrees (right),
      // we need to reverse the calculation
      const winningSegmentIndex = Math.floor(adjustedDegree / segmentAngle) % this.participants.length;
      
      // Get the correct winner by reversing the index since the wheel spins clockwise
      // but we want the segment that the arrow is pointing to
      const correctedIndex = (this.participants.length - winningSegmentIndex) % this.participants.length;
      
      this.winner = this.participants[correctedIndex];
      
      console.log('Final degree:', finalDegree);
      console.log('Normalized degree:', normalizedDegree);
      console.log('Adjusted degree:', adjustedDegree);
      console.log('Winning segment index:', winningSegmentIndex);
      console.log('Corrected index:', correctedIndex);
      console.log('Winner:', this.winner);
      
      // Optional: Send winner data to backend
      this.recordWinner(this.winner);
    },
    
    async recordWinner(winner) {
      try {
        // TODO: Send winner data to backend
        // await fetch('/api/winners', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ 
        //     participantId: winner.id, 
        //     timestamp: new Date().toISOString() 
        //   })
        // });
        
        console.log('Winner recorded:', winner);
      } catch (error) {
        console.error('Failed to record winner:', error);
      }
    },
    
    resetWheel() {
      this.winner = null;
      this.isSpinning = false;
      
      const wheel = document.querySelector('.ui-wheel-of-fortune ul');
      if (wheel && this.animation) {
        this.animation.cancel();
        wheel.style.transform = `rotate(${this.previousEndDegree}deg)`;
      }
    }
  }
});
</script>

<style scoped>
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 16px;
}

.participants-info {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.winner-display {
  margin-top: 20px;
  animation: bounceIn 0.6s ease-out;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

:where(.ui-wheel-of-fortune) {
  all: unset;
  aspect-ratio: 1 / 1;
  container-type: inline-size;
  direction: ltr;
  display: grid;
  position: relative;
  width: 50%;
  margin: 0 auto;
  
  &::after {
    aspect-ratio: 1/cos(30deg);
    background-color: crimson;
    clip-path: polygon(50% 100%,100% 0,0 0);
    content: "";
    height: 4cqi;
    position: absolute;
    place-self: start center;
    scale: 1.4;
    z-index: 10;
  }

  & > * { position: absolute; }

  button {
    aspect-ratio: 1 / 1;
    background: hsla(220, 95%, 42%, 0.8);
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    font-size: 5cqi;
    place-self: center;
    width: 20cqi;
    z-index: 5;
    transition: transform 0.1s ease;
    font-weight: bold;
    
    &:hover:not(:disabled) {
      transform: scale(1.05);
    }
    
    &:active:not(:disabled) {
      transform: scale(0.95);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  ul {
    all: unset;
    clip-path: inset(0 0 0 0 round 50%);
    display: grid;
    inset: 0;
    place-content: center start;

    li {
      align-content: center;
      aspect-ratio: 1 / calc(2 * tan(180deg / var(--_items)));
      background: hsl(calc(360deg / var(--_items) * calc(var(--_idx))), 100%, 75%);
      clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
      display: grid;
      font-size: 30px;
      grid-area: 1 / -1;
      padding-left: 1ch;
      rotate: calc(360deg / var(--_items) * calc(var(--_idx) - 1));
      transform-origin: center right;
      user-select: none;
      width: 50cqi;
      font-weight: bold;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  :where(.ui-wheel-of-fortune) {
    width: 80%;
    
    ul li {
      font-size: 3cqi;
    }
    
    button {
      font-size: 4cqi;
    }
  }
}
</style>