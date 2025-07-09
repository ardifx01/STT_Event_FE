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
        <ion-button @click="loadParticipants" fill="outline" size="small"
          >Retry</ion-button
        >
      </div>

      <!-- Wheel -->
      <fieldset v-else class="ui-wheel-of-fortune" :style="wheelStyle">
        <ul>
          <li
            v-for="(participant, index) in participants"
            :key="participant.id || index"
            :style="getSegmentStyle(index)"
          >
            {{ participant.registration?.full_name }}
          </li>
        </ul>
        <button type="button" :disabled="isSpinning">
          {{ isSpinning ? "SPINNING..." : "SPIN" }}
        </button>
      </fieldset>

      <!-- Winner Modal -->
      <ion-modal :is-open="!!winner">
        <ion-content class="ion-padding">
          <!-- loading -->
          <div v-if="isLoadingSubmitWinner" class="loading-overlay">
            <div class="loader"></div>
            <div class="loading-text">Loading...</div>
          </div>
          <!-- loading -->

          <div class="winner-content">
            <div class="winner-icon">🏆</div>
            <h1>🎉 Congratulations! 🎉</h1>
            <h1 class="winner-name">
              {{
                winner && typeof winner === "object"
                  ? winner.registration?.full_name
                  : winner
              }}
            </h1>
            <div
              v-if="winner && typeof winner === 'object'"
              class="winner-details"
            >
              <p v-if="winner.registration?.email" class="winner-email">
                {{ winner.registration?.email }}
              </p>
              <p
                v-if="winner.registration?.company_name"
                class="winner-company"
              >
                {{ winner.registration?.company_name }}
              </p>
            </div>
            <div class="winner-actions">
              <ion-row>
                <ion-col size="6">
                  <ion-button
                    @click="dismissModal()"
                    expand="block"
                    size="large"
                    fill="outline"
                    class="close-btn"
                  >
                    CLOSE
                  </ion-button>
                </ion-col>
                <ion-col size="6">
                  <ion-button
                    @click="submitWinner()"
                    expand="block"
                    size="large"
                    class="submit-btn"
                  >
                    SUBMIT
                  </ion-button>
                </ion-col>
              </ion-row>
              <!-- tekan submit, tombol ini akan reset dan yang menang akan masuk ke dalam database -->
            </div>
          </div>
        </ion-content>
      </ion-modal>

      <!-- Participants Info -->
      <div class="participants-info">
        <p>Total Participants: {{ participants.length }}</p>

        <div class="refresh-btn-container">
          <ion-button
            @click="refreshParticipant()"
            expand="block"
            size="large"
            class="submit-btn"
          >
            REFRESH PARTICIPANTS
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { defineComponent } from "vue";
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
  IonCardContent,
  IonModal,
  IonButtons,
  IonIcon,
} from "@ionic/vue";
import { close } from "ionicons/icons";

export default defineComponent({
  name: "PrizeDrawEntries",
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
    IonCardContent,
    IonModal,
    IonButtons,
    IonIcon,
  },
  data() {
    return {
      participants: [],
      isLoading: true,
      error: null,
      isSpinning: false,
      winner: null,
      animation: null,
      previousEndDegree: 0,
      close,
      isLoadingSubmitWinner: false,
    };
  },
  computed: {
    wheelStyle() {
      return {
        "--_items": this.participants.length,
      };
    },
  },
  async mounted() {
    await this.loadParticipants();
    this.$nextTick(() => {
      this.initWheelOfFortune();
    });
  },
  methods: {
    async refreshParticipant() {
      await this.loadParticipants();
      this.$nextTick(() => {
        this.initWheelOfFortune();
      });
    },

    async submitWinner() {
      this.isLoadingSubmitWinner = true;
      if (!this.winner) return;
      const sesiSpin = localStorage.getItem("sesiSpin");

      try {
        const res = await axios.put(
          `${import.meta.env.VITE_SPIN_WHEEL_SUBMIT_WINNER_API}/${
            this.winner.registration.id
          }`,
          {
            winner_spinn_number: sesiSpin,
          }
        );

        this.isLoadingSubmitWinner = false;
        Swal.fire({
          title: "Successfully Submit!",
          text: res.data.message || "Thank you for registering!",
          icon: "success",
          heightAuto: false, // ini bisa membantu
          customClass: {
            popup: "my-fullscreen-modal",
          },
        });
        this.winner = null; // Reset winner after submission
      } catch (error) {
        this.error = "Failed to submit winner. Please try again.";
        console.log("Error submitting winner:", error);
        this.isLoadingSubmitWinner = false;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message || "Something went wrong!",
          heightAuto: false, // ini bisa membantu
          customClass: {
            popup: "my-fullscreen-modal",
          },
        });
      } finally {
        this.refreshParticipant();
        this.isLoadingSubmitWinner = false;
      }
    },

    async getAllParticipants() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SPIN_WHEEL_API}`
        );
        console.log("Participants fetched successfully:", response.data.data);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching participants:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async loadParticipants() {
      this.isLoading = true;
      this.error = null;

      try {
        // TODO: Replace with actual API call
        const response = await this.getAllParticipants();
        this.participants = response;

        if (this.participants.length === 0) {
          this.error = "No participants found";
        }
      } catch (err) {
        this.error = "Failed to load participants. Please try again.";
        console.error("Error loading participants:", err);
      } finally {
        this.isLoading = false;
      }
    },

    getSegmentStyle(index) {
      return {
        "--_idx": index + 1,
      };
    },

    initWheelOfFortune() {
      const node = document.querySelector(".ui-wheel-of-fortune");
      if (!node) return;

      const spin = node.querySelector("button");
      const wheel = node.querySelector("ul");

      if (!spin || !wheel) return;

      // Remove existing event listeners
      spin.removeEventListener("click", this.handleSpinClick);
      spin.addEventListener("click", this.handleSpinClick);
    },

    handleSpinClick() {
      if (this.isSpinning || this.participants.length === 0) return;

      this.isSpinning = true;
      this.winner = null;

      const wheel = document.querySelector(".ui-wheel-of-fortune ul");
      if (!wheel) return;

      if (this.animation) {
        this.animation.cancel();
      }

      const randomAdditionalDegrees = Math.random() * 360 + 1800;
      const newEndDegree = this.previousEndDegree + randomAdditionalDegrees;

      this.animation = wheel.animate(
        [
          { transform: `rotate(${this.previousEndDegree}deg)` },
          { transform: `rotate(${newEndDegree}deg)` },
        ],
        {
          duration: 100,
          direction: "normal",
          easing: "cubic-bezier(0.25, 0.8, 0.5, 1)",
          // easing : 'ease-out',
          fill: "forwards",
          iterations: 1,
        }
      );

      this.previousEndDegree = newEndDegree;

      this.animation.addEventListener("finish", () => {
        wheel.style.transform = `rotate(${newEndDegree}deg)`;
        this.detectWinner(newEndDegree);
        this.isSpinning = false;
      });
    },

    dismissModal() {
      this.winner = null;
      this.isSpinning = false;

      const sesiSpin = localStorage.getItem("sesiSpin");
      if (sesiSpin > 0) {
        const resetSesiSpin = parseInt(sesiSpin) - 1;
        localStorage.setItem("sesiSpin", resetSesiSpin);
      }
    },

    detectWinner(finalDegree) {
      if (this.participants.length === 0) return;

      // Normalize degree to 0-360 range
      const normalizedDegree = parseInt(((finalDegree % 360) + 360) % 360);

      // Calculate segment angle
      const segmentAngle = parseInt(360 / this.participants.length);
      console.log(finalDegree);
      console.log(normalizedDegree);
      console.log(segmentAngle);
      // Arrow is at the top (270°), pointing downward into the wheel
      // Segments are arranged clockwise starting from 0° (right side)
      // We need to find which segment is currently under the arrow

      // Calculate the offset from the arrow position
      // Since arrow is at 270° and wheel rotates, we need to find what's under the arrow
      const arrowPosition = 450; // Arrow is at the top

      // Calculate which segment is currently under the arrow
      // We subtract the wheel rotation from the arrow position
      const segmentUnderArrow = parseInt(
        (arrowPosition - normalizedDegree + 360) % 360
      );
      console.log(segmentUnderArrow);
      // Find the segment index
      let winningSegmentIndex = parseInt(segmentUnderArrow / segmentAngle);
      console.log(segmentUnderArrow);
      console.log(winningSegmentIndex);
      // Ensure the index is within bounds
      winningSegmentIndex = winningSegmentIndex % this.participants.length;
      console.log(winningSegmentIndex);
      // Get the winner
      this.winner = this.participants[winningSegmentIndex];
      console.log(this.winner);
      this.storeSesiSpin();

      // Optional: Send winner data to backend
      // this.recordWinner(this.winner);
    },

    storeSesiSpin() {
      const sesiSpin = localStorage.getItem("sesiSpin") || 0;

      if (sesiSpin >= 0) {
        const newSesiSpin = parseInt(sesiSpin) + 1;
        localStorage.setItem("sesiSpin", newSesiSpin);
      }
    },
  },
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

/* Winner Modal Styles */
.winner-content {
  text-align: center;
  padding: 10px;
}

.winner-icon {
  font-size: 80px;
  margin-bottom: 20px;
  animation: bounceIn 0.8s ease-out;
}

.winner-name {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2dd36f;
  margin: 20px 0;
  animation: slideInUp 0.6s ease-out 0.2s both;
}

.winner-details {
  margin: 30px 0;
  animation: slideInUp 0.6s ease-out 0.4s both;
}

.winner-email,
.winner-company {
  margin: 8px 0;
  font-size: 1rem;
  color: #666;
  text-align: center;
}

.winner-actions {
  margin-top: 40px;
  animation: slideInUp 0.6s ease-out 0.6s both;
}

.submit-btn {
  --background: #4285f4;
  --background-activated: #3367d6;
  --background-hover: #3367d6;
  --color: white;
  font-weight: bold;
  font-size: 1rem;
  height: 50px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.close-btn {
  --background: transparent;
  --background-activated: #f0f0f0;
  --background-hover: #f0f0f0;
  --color: #666;
  --border-color: #ccc;
  font-size: 1rem;
  height: 50px;
  letter-spacing: 0.5px;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

:where(.ui-wheel-of-fortune) {
  all: unset;
  aspect-ratio: 1 / 1;
  container-type: inline-size;
  direction: ltr;
  display: grid;
  position: relative;
  width: min(9vw, 500px);
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: min(60vw, 450px);
  }

  @media (min-width: 1024px) {
    width: min(40vw, 900px);
  }

  @media (max-width: 480px) {
    width: min(95vw, 300px);
  }

  &::after {
    content: "";
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 25px solid #dc143c;
    z-index: 10;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 15px;
    background-color: #dc143c;
    border-radius: 2px;
    z-index: 9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  & > * {
    position: absolute;
  }

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
      background: hsl(
        calc(360deg / var(--_items) * calc(var(--_idx))),
        100%,
        75%
      );
      clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
      display: grid;
      font-size: 18px;
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

.participants-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px; /* Atur sesuai kebutuhan */
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.refresh-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 16px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  :where(.ui-wheel-of-fortune) {
    width: 80%;

    ul li {
      font-size: 12px;
    }

    button {
      font-size: 4cqi;
    }
  }
}

/* Overlay full screen */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(18, 18, 18, 0.8); /* putih transparan */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999 !important;
  flex-direction: column;
}

/* Spinner */
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

/* Text */
.loading-text {
  margin-top: 16px;
  font-family: sans-serif;
  font-size: 16px;
  color: #555;
}

/* Animasi */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>