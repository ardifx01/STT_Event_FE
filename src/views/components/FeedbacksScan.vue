<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title class="text-center">Scan Setup Code</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content>
        <div class="scanner-view">
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
              <ion-button v-if="showRetryButton" @click="initializeCamera" size="small">
                Coba Lagi
              </ion-button>
            </div>
          </div>
          
          <!-- Instructions -->
          <div class="instructions">
            <h2>SETUP CODE</h2>
            <p>
              On another device where you're already signed in to 1Password, 
              find your Setup Code and scan it to add your account.
            </p>
            
            <ion-button 
              @click="getHelp" 
              fill="clear" 
              color="primary" 
              class="help-button"
            >
              <ion-icon :icon="helpCircleOutline" slot="start"></ion-icon>
              Get help
            </ion-button>
          </div>
          
          <!-- Scan Result -->
          <!-- <div v-if="scanResult" class="scan-result">
            <ion-card>
              <ion-card-content>
                <h3>Hasil Scan:</h3>
                <p>{{ scanResult }}</p>
                <ion-button @click="clearResult" size="small" fill="outline">
                  Scan Lagi
                </ion-button>
              </ion-card-content>
            </ion-card>
          </div> -->
          
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
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
  
  const videoElement = ref<HTMLVideoElement | null>(null);
  const isScanning = ref(false);
  const scanResult = ref('');
  const cameraActive = ref(false);
  const cameraStatusMessage = ref('Memuat kamera...');
  const showRetryButton = ref(false);
  const stream = ref<MediaStream | null>(null);
  const qrScanner = ref<QrScanner | null>(null);
  
  // Initialize camera when component mounts
  onMounted(async () => {
    await initializeCamera();
  });
  
  // Clean up when component unmounts
  onUnmounted(() => {
    stopCamera();
  });
  
  // Function to initialize camera with auto permission
  const initializeCamera = async () => {
    try {
      cameraStatusMessage.value = 'Meminta izin kamera...';
      showRetryButton.value = false;
      
      // Check if QR scanner is supported
      const hasCamera = await QrScanner.hasCamera();
      if (!hasCamera) {
        throw new Error('No camera found');
      }
      
      if (videoElement.value) {
        
        // Initialize QR Scanner
        qrScanner.value = new QrScanner(
          videoElement.value,
          (result) => {
            handleQRCodeDetected(result.data);
          },
          {
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true,
            preferredCamera: 'environment' // Use back camera
          }
        );
        
        // Start the scanner
        await qrScanner.value.start();
        cameraActive.value = true;
        cameraStatusMessage.value = 'Kamera siap - Arahkan ke QR Code';
        
        console.log('QR Scanner initialized successfully');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      cameraActive.value = false;
      showRetryButton.value = true;
      
      // Handle different types of camera errors
      if (error instanceof Error) {
        if (error.message.includes('Permission')) {
          cameraStatusMessage.value = 'Izin kamera ditolak. Silakan berikan izin di pengaturan browser.';
        } else if (error.message.includes('No camera found')) {
          cameraStatusMessage.value = 'Kamera tidak ditemukan pada perangkat ini.';
        } else if (error.message.includes('in use')) {
          cameraStatusMessage.value = 'Kamera sedang digunakan aplikasi lain.';
        } else {
          cameraStatusMessage.value = 'Gagal mengakses kamera. Tap untuk mencoba lagi.';
        }
      }
      
      // Show alert for permission issues
      const alert = await alertController.create({
        header: 'Akses Kamera',
        message: cameraStatusMessage.value,
        buttons: [
          {
            text: 'Pengaturan',
            handler: () => {
              // Guide user to settings
              window.open('chrome://settings/content/camera', '_blank');
            }
          },
          {
            text: 'Coba Lagi',
            handler: () => {
              initializeCamera();
            }
          }
        ]
      });
      await alert.present();
    }
  };
  
  // Function to stop camera
  const stopCamera = () => {
    if (qrScanner.value) {
      qrScanner.value.stop();
      qrScanner.value.destroy();
      qrScanner.value = null;
    }
    cameraActive.value = false;
  };
  
  // Function to handle QR code detection
  const handleQRCodeDetected = async (qrCodeData: string) => {
    if (isScanning.value) return; // Prevent multiple scans
    
    isScanning.value = true;
    scanResult.value = `QR Code berhasil dipindai!\nData: ${qrCodeData}\nTimestamp: ${new Date().toLocaleString()}`;
    
    // Stop scanning temporarily
    if (qrScanner.value) {
      qrScanner.value.stop();
    }
    
    // Navigate to the QR code URL automatically
    await navigateToQRCodeUrl(qrCodeData);
    
    // Resume scanning after a delay
    setTimeout(() => {
      isScanning.value = false;
      if (qrScanner.value && cameraActive.value) {
        qrScanner.value.start();
      }
    }, 3000);
  };
  
  // Function to start scanning (manual trigger)
  const startScanning = async () => {
    if (!cameraActive.value) {
      await initializeCamera();
      return;
    }
    
    if (qrScanner.value && !isScanning.value) {
      try {
        await qrScanner.value.start();
        cameraStatusMessage.value = 'Scanning aktif - Arahkan ke QR Code';
      } catch (error) {
        console.error('Error starting scanner:', error);
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
    if (qrScanner.value && cameraActive.value) {
      qrScanner.value.start();
    }
  };
  
  // Function to show help
  const getHelp = async () => {
    const alert = await alertController.create({
      header: 'Bantuan',
      message: 'Arahkan kamera ke QR code. Scanner akan otomatis mendeteksi dan memproses QR code yang terlihat. Pastikan QR code terlihat jelas dan pencahayaan cukup.',
      buttons: ['OK']
    });
    await alert.present();
  };
  </script>
  
  <style scoped>
  .scanner-view {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .camera-preview {
    flex: 1;
    background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    cursor: pointer;
    overflow: hidden;
  }
  
  .camera-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
  
  .scanning-frame {
    width: 250px;
    height: 250px;
    position: relative;
    border: 2px solid transparent;
    z-index: 2;
  }
  
  .corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 3px solid #007AFF;
  }
  
  .corner.top-left {
    top: -3px;
    left: -3px;
    border-right: none;
    border-bottom: none;
  }
  
  .corner.top-right {
    top: -3px;
    right: -3px;
    border-left: none;
    border-bottom: none;
  }
  
  .corner.bottom-left {
    bottom: -3px;
    left: -3px;
    border-right: none;
    border-top: none;
  }
  
  .corner.bottom-right {
    bottom: -3px;
    right: -3px;
    border-left: none;
    border-top: none;
  }
  
  .scanning-indicator {
    position: absolute;
    width: 250px;
    height: 250px;
    background: rgba(0, 122, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
    z-index: 3;
  }
  
  .scan-line {
    width: 100%;
    height: 2px;
    background: #007AFF;
    animation: scan 2s linear infinite;
    box-shadow: 0 0 10px #007AFF;
  }
  
  @keyframes scan {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(246px);
    }
  }
  
  .camera-status {
    position: absolute;
    z-index: 2;
    text-align: center;
    color: #666;
  }
  
  .camera-icon {
    font-size: 48px;
    color: #ccc;
    margin-bottom: 16px;
  }
  
  .camera-status p {
    margin: 0 0 16px 0;
    font-size: 14px;
    line-height: 1.4;
  }
  
  .instructions {
    padding: 24px;
    text-align: center;
    background: white;
  }
  
  .instructions h2 {
    font-size: 16px;
    font-weight: 600;
    color: #8E8E93;
    margin: 0 0 16px 0;
    letter-spacing: 1px;
  }
  
  .instructions p {
    font-size: 16px;
    line-height: 1.4;
    color: #000;
    margin: 0 0 20px 0;
  }
  
  .help-button {
    --color: #007AFF;
    font-size: 16px;
  }
  
  .scan-result {
    padding: 16px;
    background: white;
  }
  
  .scan-result ion-card {
    margin: 0;
    border-radius: 12px;
  }
  
  .scan-result h3 {
    margin: 0 0 8px 0;
    color: #007AFF;
  }
  
  .scan-result p {
    margin: 0 0 12px 0;
    color: #333;
  }
  
  /* iOS-style header */
  ion-toolbar {
    --background: #f8f8f8;
    --color: #000;
  }
  
  ion-title {
    font-size: 17px;
    font-weight: 600;
  }
  
  ion-button {
    --color: #007AFF;
    font-size: 17px;
  }
  
  /* Camera overlay for better contrast */
  .camera-preview::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
    pointer-events: none;
  }
  </style>