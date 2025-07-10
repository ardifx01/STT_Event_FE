<template>
  <ion-page>
    <ion-content class="ion-padding">
      <!-- Layout utama dengan flexbox -->

      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6">
            <div class="wheel-section">
              <!-- Loading State -->
              <div v-if="isLoading" class="loading-container">
                <ion-spinner name="crescent"></ion-spinner>
                <p>Loading participants...</p>
              </div>

              <!-- Error State -->
              <div v-else-if="error" class="error-container">
                <p>{{ error }}</p>
                <ion-button
                  @click="loadParticipants"
                  fill="outline"
                  size="small"
                  >Retry</ion-button
                >
              </div>

              <!-- Wheel -->
              <div class="wheel-container" v-if="!isLoading">
                <VueWheelSpinner
                  ref="spinner"
                  class="spinner"
                  :slices="slices"
                  :winner-index="defaultWinner"
                  :cursor-angle="cursorAngle"
                  :cursor-position="cursorPosition"
                  :cursor-distance="cursorDistance"
                  @spin-start="onSpinStart"
                  @spin-end="onSpinEnd"
                >
                  <template #slice="{ slice }">
                    <div
                      class="wheel-slice"
                      :style="{
                        'background-color': slice.color,
                        color: slice.textColor,
                        'text-shadow': slice.textShadow,
                      }"
                    >
                      {{ slice.text }}
                    </div>
                  </template>
                  <template #cursor>
                    <div class="custom-cursor"></div>
                  </template>
                  <template #default>
                    <button
                      class="spin-button"
                      :disabled="isSpinning"
                      @click="handleSpinButtonClick"
                    >
                      Spin
                    </button>
                  </template>
                </VueWheelSpinner>
              </div>
            </div></ion-col
          >
          <ion-col size="12" size-md="6">
            <div class="winners-section">
              <h2 class="winners-title">
                Winner List
                <ion-button
                  size="small"
                  fill="clear"
                  @click="refreshParticipant()"
                >
                  <ion-icon :icon="refreshOutline"></ion-icon>
                </ion-button>
              </h2>

              <!-- Tabel pemenang -->
              <div class="winners-table-container">
                <table class="winners-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Winner Name</th>
                      <th>Company</th>
                      <th>Session</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(winner, index) in winners" :key="winner.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ winner.registration?.full_name || "N/A" }}</td>
                      <td>{{ winner.registration?.company_name || "N/A" }}</td>
                      <td>Sesi {{ winner.winner_spinn_number }}</td>
                    </tr>
                    <tr v-if="winners.length === 0">
                      <td colspan="4" class="no-winners">No winners yet</td>
                    </tr>
                  </tbody>
                </table>
                <p>Total Participants: {{ slices.length }}</p>
              </div>
            </div></ion-col
          >
        </ion-row>
      </ion-grid>

      <!-- Winner Modal -->
      <ion-modal :is-open="!!winnerResult">
        <ion-content class="ion-padding">
          <!-- loading -->
          <div v-if="isLoadingSubmitWinner" class="loading-overlay">
            <div class="loader"></div>
            <div class="loading-text">Loading...</div>
          </div>
          <!-- loading -->

          <div class="winner-content" v-if="winnerResult">
            <div class="winner-icon">🏆</div>
            <h1>🎉 Congratulations! 🎉</h1>
            <h1 class="winner-name">
              {{ winnerResult.originalData.registration?.full_name }}
            </h1>
            <div class="winner-details">
              <p
                v-if="winnerResult.originalData.registration?.email"
                class="winner-email"
              >
                {{ winnerResult.originalData.registration?.email }}
              </p>
              <p
                v-if="winnerResult.originalData.registration?.company_name"
                class="winner-company"
              >
                {{ winnerResult.originalData.registration?.company_name }}
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
                    OK
                  </ion-button>
                </ion-col>
              </ion-row>
            </div>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script>
import { refreshOutline } from "ionicons/icons";
import axios from "axios";
import Swal from "sweetalert2";
import VueWheelSpinner from "vue-wheel-spinner";
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
    VueWheelSpinner,
  },
  data() {
    return {
      refreshOutline,
      participants: [],
      winners: [],
      isLoading: true,
      error: null,

      close,
      isLoadingSubmitWinner: false,
      isSpinning: false,
      winnerResult: null,
      slices: [],
      isSpinning: false,
      defaultWinner: 1,
      cursorAngle: 0,
      cursorPosition: "edge",
      cursorDistance: 0,
    };
  },
  computed: {
    winners() {
      if (this.participants.length > 0) {
        console.log(
          this.participants.filters((i) => i.winner_spinn_number !== null)
        );
        return this.participants.filters((i) => i.winner_spinn_number !== null);
      }
      return [];
    },
  },
  async mounted() {
    await this.loadParticipants();
  },
  methods: {
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
      try {
        const all_participants = await this.getAllParticipants();
        const participants = all_participants.filter((i) => !i.winner);
        this.winners = all_participants.filter((i) => i.winner);
        const total = participants.length;

        this.slices = participants.map((p, i) => {
          const hue = (360 / total) * i;
          const bgColor = `hsl(${hue}, 100%, 75%)`;

          return {
            text: p.registration.full_name,
            color: bgColor,
            textColor: this.calculateTextColor(bgColor),
            textShadow: this.getTextShadow(bgColor),
            originalData: p,
          };
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        this.isLoading = false;
      }
    },
    calculateTextColor(bgColor) {
      const lightness = parseInt(bgColor.split(",")[2].replace("%)", ""));
      return lightness > 50 ? "#000000" : "#FFFFFF";
    },

    getTextShadow(bgColor) {
      const lightness = parseInt(bgColor.split(",")[2].replace("%)", ""));
      return lightness > 50
        ? "1px 1px 3px rgba(0,0,0,0.5)"
        : "1px 1px 3px rgba(255,255,255,0.5)";
    },

    handleSpinButtonClick() {
      if (this.isSpinning || this.slices.length === 0) return;

      // Generate random index
      const newWinner = Math.floor(Math.random() * this.slices.length);
      this.defaultWinner = newWinner;

      this.$refs.spinner.spinWheel(newWinner);
    },

    spinFor(index) {
      if (this.isSpinning || this.participants.length === 0) return;

      if (index >= 0 && index < this.slices.length) {
        this.defaultWinner = index;
        this.$nextTick(() => {
          this.$refs.spinner.spinWheel(index);
        });
      }
    },

    onSpinStart() {
      this.winnerResult = null;
      this.isSpinning = true;
      console.log("Spin started");
    },

    onSpinEnd(winnerIndex) {
      this.isSpinning = false;
      console.log("Spin ended on index:", winnerIndex);

      if (winnerIndex >= 0 && winnerIndex < this.slices.length) {
        this.winnerResult = this.slices[winnerIndex];
        this.storeSesiSpin();
        console.log("Winner:", this.winnerResult);
      } else {
        console.error("Invalid winner index:", winnerIndex);
      }
    },
    async refreshParticipant() {
      await this.loadParticipants();
    },

    async submitWinner() {
      this.isLoadingSubmitWinner = true;
      if (!this.winnerResult) return;
      const sesiSpin = localStorage.getItem("sesiSpin");

      try {
        const res = await axios.put(
          `${import.meta.env.VITE_SPIN_WHEEL_SUBMIT_WINNER_API}/${
            this.winnerResult.originalData.registration.id
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
        this.winnerResult = null; // Reset winner after submission
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
    dismissModal() {
      this.winnerResult = null;
      this.isSpinning = false;

      const sesiSpin = localStorage.getItem("sesiSpin");
      if (sesiSpin && parseInt(sesiSpin) > 0) {
        const resetSesiSpin = parseInt(sesiSpin) - 1;
        localStorage.setItem("sesiSpin", resetSesiSpin.toString());
      }
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
.custom-cursor {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 25px 15px 0 15px; /* Ukuran segitiga (tinggi 25px, lebar 30px) */
  border-color: #000 transparent transparent transparent;
  transform: rotate(0deg); /* Pastikan menghadap ke pusat lingkaran */
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.19));
  pointer-events: none;
  position: relative;
  z-index: 10;
}
.wheel-container {
  width: 90%; /* Adjust width as needed */
  height: 100%; /* Adjust height as needed */
  margin: 45px auto;
  padding: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .wheel-container {
    width: 100%;
  }
}

.wheel-slice {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.3s ease;
}

/* Untuk browser yang tidak support style inline */
.wheel-slice.dark-text {
  color: #000 !important;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5) !important;
}

.wheel-slice.light-text {
  color: #fff !important;
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.5) !important;
}
.spinner {
  width: 300;
  height: 100;
  transition: transform 4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.spin-button {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  aspect-ratio: 1 / 1;
  font-size: 20px;
  cursor: pointer;
  background: #eb4d4b;
  border-radius: 50%;
  transition: all 150ms;
  border: 10px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white !important;
  box-shadow: inset -3px -3px 2px 2px rgba(0, 0, 0, 0.19),
    3px 3px 2px 2px rgba(0, 0, 0, 0.19);
  z-index: 11;
  position: relative;
  user-select: none;
}

.spin-button:hover {
  box-shadow: inset -5px -5px 2px 2px rgba(0, 0, 0, 0.19),
    3px 3px 2px 2px rgba(0, 0, 0, 0.19);
}

.spin-button:active {
  box-shadow: inset 3px 3px 2px 2px rgba(0, 0, 0, 0.19),
    3px 3px 2px 2px rgba(0, 0, 0, 0.19);
}

.spin-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  pointer-events: none;
}

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

/* Tabel pemenang */
.winners-table-container {
  overflow-x: auto;
}

.winners-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
}

.winners-table th {
  background-color: var(--secondary-1);
  color: white;
  padding: 12px 15px;
  text-align: left;
}

.winners-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
}

.winners-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.winners-table tr:hover {
  background-color: #e6f7ee;
}

.no-winners {
  text-align: center;
  color: #666;
  font-style: italic;
}

/* Responsif */
@media (max-width: 768px) {
  .winners-section {
    width: 100%;
  }
}

/* Animasi untuk tabel */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.winners-title {
  display: flex;
  align-items: center;
}
.winners-table tr {
  animation: fadeIn 0.3s ease-out;
  animation-fill-mode: both;
}

.winners-table tr:nth-child(1) {
  animation-delay: 0.1s;
}
.winners-table tr:nth-child(2) {
  animation-delay: 0.2s;
}
.winners-table tr:nth-child(3) {
  animation-delay: 0.3s;
}
</style>