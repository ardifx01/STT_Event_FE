<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Prize Draw</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content class="ion-padding">
        <div class="wheel-container">
          <!-- Canvas untuk wheel -->
          <canvas id="canvas" width="500" height="500"></canvas>
          
          <!-- Tombol spin -->
          <div class="spin-controls">
            <ion-button 
              @click="startSpin" 
              :disabled="isSpinning"
              expand="block"
              color="primary"
            >
              {{ isSpinning ? 'Spinning...' : 'SPIN THE WHEEL!' }}
            </ion-button>
          </div>
          
          <!-- Hasil -->
          <div v-if="winner" class="winner-display">
            <ion-card>
              <ion-card-header>
                <ion-card-title>🎉 Congratulations! 🎉</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <h2>{{ winner }}</h2>
              </ion-card-content>
            </ion-card>
          </div>
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
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  } from '@ionic/vue';
  
  // Import winwheel.js (pastikan sudah diinstall)
  import { Winwheel } from 'winwheel';
  
  export default defineComponent({
    name: 'PrizeDrawEntries',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonButton,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent
    },
    data() {
      return {
        wheel: null,
        isSpinning: false,
        winner: null,
        prizes: [
          { text: 'iPhone 15 Pro', fillStyle: '#ff6b6b' },
          { text: 'MacBook Air', fillStyle: '#4ecdc4' },
          { text: 'iPad Pro', fillStyle: '#45b7d1' },
          { text: 'AirPods Pro', fillStyle: '#f9ca24' },
          { text: 'Apple Watch', fillStyle: '#6c5ce7' },
          { text: 'Gift Card $500', fillStyle: '#a29bfe' },
          { text: 'Wireless Charger', fillStyle: '#fd79a8' },
          { text: 'Bluetooth Speaker', fillStyle: '#00b894' }
        ]
      };
    },
    mounted() {
      this.initWheel();
    },
    methods: {
      initWheel() {
        this.wheel = new Winwheel({
          canvasId: 'canvas',
          numSegments: this.prizes.length,
          outerRadius: 200,
          innerRadius: 30,
          textFontSize: 16,
          textOrientation: 'vertical',
          textAlignment: 'outer',
          textDirection: 'reversed',
          textMargin: 5,
          lineWidth: 3,
          strokeStyle: '#ffffff',
          segments: this.prizes,
          animation: {
            type: 'spinToStop',
            duration: 4,
            spins: 8,
            callbackFinished: this.onSpinFinished,
            callbackSound: this.playTickSound,
            soundTrigger: 'pin'
          },
          pins: {
            number: this.prizes.length,
            fillStyle: 'silver',
            outerRadius: 4
          },
          pointerAngle: 0,
          responsive: true
        });
      },
      
      startSpin() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        this.winner = null;
        
        // Reset wheel rotation
        this.wheel.stopAnimation(false);
        this.wheel.rotationAngle = 0;
        this.wheel.draw();
        
        // Start spinning
        this.wheel.startAnimation();
      },
      
      onSpinFinished(indicatedSegment) {
        this.isSpinning = false;
        this.winner = indicatedSegment.text;
        
        // Tambahkan efek suara atau animasi tambahan di sini
        this.showWinnerAnimation();
      },
      
      showWinnerAnimation() {
        // Tambahkan animasi atau efek visual untuk pemenang
        setTimeout(() => {
          // Bisa tambahkan confetti atau animasi lainnya
          console.log('Winner:', this.winner);
        }, 500);
      },
      
      playTickSound() {
        // Tambahkan suara tick jika diperlukan
        // const audio = new Audio('/sounds/tick.mp3');
        // audio.play();
      },
      
      resetWheel() {
        this.winner = null;
        this.isSpinning = false;
        this.wheel.stopAnimation(false);
        this.wheel.rotationAngle = 0;
        this.wheel.draw();
      }
    }
  });
  </script>
  
  <style scoped>
  .wheel-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  #canvas {
    border-radius: 50%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    margin-bottom: 30px;
    max-width: 90vw;
    height: auto;
  }
  
  .spin-controls {
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
  }
  
  .winner-display {
    width: 100%;
    max-width: 400px;
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
  
  ion-card {
    text-align: center;
    background: linear-gradient(45deg, #FFD700, #FFA500);
    color: #333;
  }
  
  ion-card-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  ion-card-content h2 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    color: #2c3e50;
  }
  
  ion-button {
    --border-radius: 25px;
    --box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    font-weight: bold;
    font-size: 1.1rem;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    #canvas {
      width: 300px;
      height: 300px;
    }
    
    .wheel-container {
      padding: 10px;
    }
  }
  </style>