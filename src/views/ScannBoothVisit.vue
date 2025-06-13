<template>
    <ion-page>
      <ion-header v-if="boothSelected">
        <ion-toolbar>
          <ion-title class="ion-text-center">Scan Visit {{ boothName }} </ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content>
        <!-- Pilih Booth - tampilkan jika booth belum dipilih -->
        <div v-if="!boothSelected"  class="choose-booth full-screen-center">
            <h2>Pilih Booth Anda</h2>
            <div class="">
              <ion-button 
                  v-for="(booth, index) in allBoothVisit"
                  :key="index" 
                  @click="selectBooth(booth.id, booth.name)"
                  class="submit-btn booth-btn">
                  {{ booth.name }}
              </ion-button>
            </div>
            <!-- Tambah lebih banyak booth sesuai kebutuhan -->
        </div>

        <div v-else class="scanner-view">
          <!-- Camera Preview Area -->
          <div class="camera-preview" @click="startScanning">
            <!-- Live Camera Video -->
            <video 
              ref="videoElement" 
              v-show="cameraActive"
              autoplay 
              playsinline 
              muted
              class="camera-video"
            ></video>
            
            <!-- Scanning Frame -->
            <div class="scanning-frame" v-show="cameraActive">
              <div class="corner top-left"></div>
              <div class="corner top-right"></div>
              <div class="corner bottom-left"></div>
              <div class="corner bottom-right"></div>
            </div>
            
            <!-- Scanning indicator -->
            <div v-if="isScanning" class="scanning-indicator">
              <div class="scan-line"></div>
            </div>
            
            <!-- Camera Status Messages -->
            <div v-if="!cameraActive && !isScanning" class="camera-status">
              <ion-icon :icon="cameraOutline" class="camera-icon"></ion-icon>
              <p>{{ cameraStatusMessage }}</p>
              <ion-button 
                style="color: white;" 
                v-if="showRetryButton" 
                @click="initializeCamera" 
                size="small"
              >
                {{ cameraInitialized ? 'Coba Lagi' : 'Aktifkan Kamera' }}
              </ion-button>
            </div>
          </div>
          
          <!-- Instructions -->
          <div class="instructions">
            <h2>VERIFY REGISTRANT CODE</h2>
            <p>
              {{ 
                cameraInitialized 
                  ? 'Arahkan kamera ke QR Code peserta untuk melakukan verifikasi kehadiran pada acara ini.' 
                  : 'Tekan tombol "Aktifkan Kamera" untuk memulai proses pemindaian QR Code peserta.' 
              }}
            </p>

          <div class="refresh-btn-container">
            <ion-button @click="backChooseBooth()" expand="block" size="large" class="submit-btn">
              Back To Choose Booth
            </ion-button>
          </div>
            
            <ion-button 
              @click="getHelp" 
              fill="clear" 
              color="primary" 
              class="help-button"
            >
              <ion-icon :icon="helpCircleOutline" slot="start"></ion-icon>
              GET HELP
            </ion-button>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
    
  <script setup lang="ts">
    import axios from 'axios';
    import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
    import {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonButton,
      IonIcon,
      IonCard,
      IonCardContent,
      alertController
    } from '@ionic/vue';
    import { helpCircleOutline, cameraOutline } from 'ionicons/icons';
    import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
    import QrScanner from 'qr-scanner';
    
    // Add props to control camera activation
    const props = defineProps<{
      isActive?: boolean;
    }>();
    
    const videoElement = ref<HTMLVideoElement | null>(null);
    const isScanning = ref(false);
    const scanResult = ref('');
    const cameraActive = ref(false);
    const cameraStatusMessage = ref('Tap untuk mengaktifkan kamera...');
    const showRetryButton = ref(false);
    const stream = ref<MediaStream | null>(null);
    const qrScanner = ref<QrScanner | null>(null);
    const useQrScanner = ref(true);
    const cameraInitialized = ref(false);
    const allBoothVisit = ref<any[]>([]); // Store all booth visit data
    const boothSelected = ref(false)
    const boothID = ref<number | null>(null);
    const boothName = ref<string | null>(null);
    
    // Watch for tab activation
    watch(() => props.isActive, (newValue) => {
      if (newValue && !cameraInitialized.value) {
        // Tab became active and camera not initialized yet
        initializeCamera();
      } else if (!newValue && cameraInitialized.value) {
        // Tab became inactive, stop camera to save resources
        stopCamera();
        cameraInitialized.value = false;
      }
    });
    
    // Remove automatic initialization on mount
    onMounted(async () => {
      await nextTick(); // Ensure DOM is ready
      // Don't initialize camera automatically
      // Only show instruction to activate
      cameraStatusMessage.value = 'Tap untuk mengaktifkan kamera';
      showRetryButton.value = true;

        // Fetch booth visit data
        await getBoothVisitData();
    });
    
    // Clean up when component unmounts
    onUnmounted(() => {
      stopCamera();
    });

    // Function mengambil data booth visit
    const getBoothVisitData = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/booth/');

            console.log('Booth visit data:', res.data);
            allBoothVisit.value = res.data.data;
        } catch (error) {
            console.error('Error fetching booth visit data:', error);
        }
    };

    const selectBooth = (bootID: number, boothNameArgu : string) => {
        console.log('Selected Booth ID:', bootID);
        boothSelected.value = true;
        boothID.value = bootID;
        boothName.value = boothNameArgu;
    }

    const backChooseBooth = () => {
        boothSelected.value = false;
        boothID.value = null;
        boothName.value = null;
        scanResult.value = '';
        cameraActive.value = false;
        cameraInitialized.value = false;
        showRetryButton.value = true;
        
        // Stop camera and reset scanner
        stopCamera();
    }
    
    // Function to initialize camera with fallback support
    const initializeCamera = async () => {
      if (cameraInitialized.value) return; // Prevent double initialization
      
      try {
        cameraStatusMessage.value = 'Meminta izin kamera...';
        showRetryButton.value = false;
        cameraActive.value = true;
        
        // First try QrScanner method
        if (useQrScanner.value) {
          await initializeQrScanner();
        } else {
          // Fallback to MediaDevices method
          await initializeMediaDevices();
        }
        
        cameraInitialized.value = true;
        
      } catch (error) {
        console.error('Error initializing camera:', error);
        
        // If QrScanner fails, try MediaDevices as fallback
        if (useQrScanner.value) {
          console.log('QrScanner failed, trying MediaDevices fallback...');
          useQrScanner.value = false;
          await initializeMediaDevices();
          cameraInitialized.value = true;
        } else {
          // Both methods failed
          await handleCameraError(error);
        }
      }
    };
    
    // Initialize using QrScanner library
    const initializeQrScanner = async () => {
      // Check if QR scanner is supported
      const hasCamera = await QrScanner.hasCamera();
      if (!hasCamera) {
        throw new Error('No camera found on this device');
      }
      
      // Ensure video element exists
      if (!videoElement.value) {
        await nextTick();
        if (!videoElement.value) {
          throw new Error('Video element not found');
        }
      }
      
      console.log('Initializing QR Scanner...');
      
      // Stop any existing scanner
      if (qrScanner.value) {
        qrScanner.value.destroy();
        qrScanner.value = null;
      }
      
      // Initialize QR Scanner
      qrScanner.value = new QrScanner(
        videoElement.value,
        (result) => {
          console.log('QR Code detected:', result.data);
          handleQRCodeDetected(result.data);
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: 'environment', // Use back camera
          maxScansPerSecond: 5
        }
      );
      
      // Start the scanner
      console.log('Starting QR Scanner...');
      await qrScanner.value.start();
      
      // Set camera as active
      cameraActive.value = true;
      cameraStatusMessage.value = 'Kamera aktif - Arahkan ke QR Code';
      
      console.log('QR Scanner initialized and started successfully');
    };
    
    // Initialize using MediaDevices (fallback method)
    const initializeMediaDevices = async () => {
      console.log('Initializing MediaDevices camera...');
      
      // Request camera permission and start stream
      const constraints = {
        video: {
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };
      
      stream.value = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoElement.value && stream.value) {
        videoElement.value.srcObject = stream.value;
        cameraActive.value = true;
        cameraStatusMessage.value = 'Kamera siap - Tap untuk scan';
        
        // Auto-start when camera is ready
        videoElement.value.onloadedmetadata = () => {
          console.log('MediaDevices camera initialized successfully');
        };
      }
    };
    
    // Handle camera initialization errors
    const handleCameraError = async (error: any) => {
      cameraActive.value = false;
      showRetryButton.value = true;
      
      // Handle different types of camera errors
      if (error instanceof Error) {
        if (error.message.includes('Permission') || error.name === 'NotAllowedError') {
          cameraStatusMessage.value = 'Izin kamera ditolak. Silakan berikan izin dan coba lagi.';
        } else if (error.message.includes('No camera found') || error.name === 'NotFoundError') {
          cameraStatusMessage.value = 'Kamera tidak ditemukan pada perangkat ini.';
        } else if (error.message.includes('in use') || error.name === 'NotReadableError') {
          cameraStatusMessage.value = 'Kamera sedang digunakan aplikasi lain.';
        } else {
          cameraStatusMessage.value = 'Gagal mengakses kamera. Pastikan browser mendukung kamera.';
        }
      }
      
      // Show detailed error alert
      const alert = await alertController.create({
        header: 'Error Kamera',
        message: `${cameraStatusMessage.value}`,
        buttons: [
          {
            text: 'Coba Lagi',
            handler: () => {
              initializeCamera();
            }
          },
          {
            text: 'OK',
            role: 'cancel'
          }
        ]
      });
      await alert.present();
    };
    
    // Function to stop camera
    const stopCamera = () => {
      // Stop QrScanner if active
      if (qrScanner.value) {
        qrScanner.value.stop();
        qrScanner.value.destroy();
        qrScanner.value = null;
      }
      
      // Stop MediaDevices stream if active
      if (stream.value) {
        stream.value.getTracks().forEach(track => track.stop());
        stream.value = null;
      }
      
      cameraActive.value = false;
      cameraInitialized.value = false;
    };
    
    // Function to handle QR code detection (for QrScanner)
    const handleQRCodeDetected = async (qrCodeData: string) => {
      if (isScanning.value) return; // Prevent multiple scans

      isScanning.value = true;
      if (qrScanner.value) {
        qrScanner.value.stop();
      }

      try {
        let data;
        try {
          data = JSON.parse(qrCodeData);
        } catch {
          throw new Error('Format QR tidak valid');
        }

        if (!data.registration_id || !data.qr_token) {
          throw new Error('Format QR tidak valid');
        }

        const response = await axios.post('http://127.0.0.1:8000/api/booth-visit', {
          registration_id: data.registration_id,
          booth_id: boothID.value,
        });

        const resData = response.data;

        const alert = await alertController.create({
          header: 'Berhasil Check-in Booth',
          message: resData.message,
          buttons: ['OK']
        });
        
        await alert.present();

      } catch (err: any) {
        // Fallback: jika bukan format JSON, coba buka sebagai URL atau tampilkan konten
        // await navigateToQRCodeUrl(qrCodeData);

        const alert = await alertController.create({
          header: 'Gagal',
          message: err.response.data.message || 'Gagal memproses QR code',
          buttons: ['OK']
        });
        await alert.present();
      } finally {
        setTimeout(() => {
          isScanning.value = false;
          if (qrScanner.value && cameraActive.value) {
            qrScanner.value.start();
          }
        }, 2000);
      }
    
    };
    
    // Function to start scanning (manual trigger for MediaDevices fallback)
    const startScanning = async () => {
      if (!cameraActive.value) {
        await initializeCamera();
        return;
      }
      
      // If using QrScanner, it's already scanning automatically
      if (useQrScanner.value && qrScanner.value && !isScanning.value) {
        try {
          await qrScanner.value.start();
          cameraStatusMessage.value = 'Scanning aktif - Arahkan ke QR Code';
        } catch (error) {
          console.error('Error starting QR scanner:', error);
        }
        return;
      }
      
      // For MediaDevices fallback, capture and process frame
      if (!useQrScanner.value && videoElement.value) {
        try {
          isScanning.value = true;
          
          // Capture frame from video for processing
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          
          canvas.width = videoElement.value.videoWidth;
          canvas.height = videoElement.value.videoHeight;
          
          if (context) {
            context.drawImage(videoElement.value, 0, 0);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            
            // Simulate QR code processing (in real implementation, use a QR decoder library)
            setTimeout(() => {
              // Simulate QR code result with URL
              const qrCodeUrl = 'https://example.com/feedback-form';
              scanResult.value = `QR Code berhasil dipindai!\nURL: ${qrCodeUrl}\nTimestamp: ${new Date().toLocaleString()}`;
              isScanning.value = false;
              
              // Navigate to the QR code URL automatically
              navigateToQRCodeUrl(qrCodeUrl);
            }, 2000);
          }
        } catch (error) {
          console.error('Error during scanning:', error);
          isScanning.value = false;
          
          const alert = await alertController.create({
            header: 'Scanning Error',
            message: 'Gagal memproses gambar. Silakan coba lagi.',
            buttons: ['OK']
          });
          await alert.present();
        }
      }
    };
    
    // Function to navigate to QR code URL
    const navigateToQRCodeUrl = async (data: string) => {
      try {
        // Validate URL format
        const urlPattern = /^(https?:\/\/)[\w\.-]+\.[a-z]{2,}([\w\.-]*)*\/?.*$/i;
        
        if (urlPattern.test(data)) {
          // Show confirmation dialog for URLs
          const alert = await alertController.create({
            header: 'Buka Link',
            message: `QR Code berisi link. Apakah Anda ingin membuka link ini?\n\n${data}`,
            buttons: [
              {
                text: 'Batal',
                role: 'cancel'
              },
              {
                text: 'Buka Link',
                handler: () => {
                  // Open URL in new tab/window
                  window.open(data, '_blank');
                }
              }
            ]
          });
          await alert.present();
        } else {
          // Handle non-URL QR codes (text, numbers, etc.)
          const alert = await alertController.create({
            header: 'QR Code Dipindai',
            message: `Konten QR Code:\n\n${data}`,
            buttons: [
              {
                text: 'Salin',
                handler: () => {
                  // Copy to clipboard
                  navigator.clipboard.writeText(data).then(() => {
                    console.log('QR code data copied to clipboard');
                  }).catch(err => {
                    console.error('Failed to copy to clipboard:', err);
                  });
                }
              },
              {
                text: 'OK',
                role: 'cancel'
              }
            ]
          });
          await alert.present();
        }
      } catch (error) {
        console.error('Error processing QR code data:', error);
        const alert = await alertController.create({
          header: 'Error',
          message: 'Gagal memproses data QR code. Silakan coba lagi.',
          buttons: ['OK']
        });
        await alert.present();
      }
    };
    
    // Function to clear scan result
    const clearResult = () => {
      scanResult.value = '';
      isScanning.value = false;
      if (useQrScanner.value && qrScanner.value && cameraActive.value) {
        qrScanner.value.start();
      }
    };
    
    // Function to show help
    const getHelp = async () => {
      const helpMessage = useQrScanner.value 
        ? 'Arahkan kamera ke QR code. Scanner akan otomatis mendeteksi dan memproses QR code yang terlihat. Pastikan QR code terlihat jelas dan pencahayaan cukup.'
        : 'Arahkan kamera ke QR code dan tap area kamera untuk memindai. Pastikan QR code terlihat jelas dan pencahayaan cukup.';
        
      const alert = await alertController.create({
        header: 'Bantuan',
        message: 'Arahkan kamera ke QR code. Scanner akan otomatis mendeteksi dan memproses QR code yang terlihat. Pastikan QR code terlihat jelas dan pencahayaan cukup.',
        buttons: ['OK']
      });
      await alert.present();
    };
    </script>

<style scoped>
  .refresh-btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 16px;
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

</style>

