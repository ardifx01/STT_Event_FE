<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title class="ion-text-center">Scan Feedback QR Code</ion-title>
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
              <ion-button style="color: white;" v-if="showRetryButton" @click="initializeCamera" size="small">
                Coba Lagi
              </ion-button>
            </div>
          </div>
          
          <!-- Instructions -->
          <div class="instructions">
            <h2>SCAN FEEDBACK CODE</h2>
            <p>
              Arahkan kamera ke QR Code yang tersedia di booth 
              untuk mengisi feedback dan memberikan penilaian.
            </p>
            
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
  import { ref, onMounted, onUnmounted, nextTick } from 'vue';
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
  const useQrScanner = ref(true); // Flag to determine which method to use
  
  // Initialize camera when component mounts
  onMounted(async () => {
    await nextTick(); // Ensure DOM is ready
    await initializeCamera();
  });
  
  // Clean up when component unmounts
  onUnmounted(() => {
    stopCamera();
  });
  
  // Function to initialize camera with fallback support
  const initializeCamera = async () => {
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
      
    } catch (error) {
      console.error('Error initializing camera:', error);
      
      // If QrScanner fails, try MediaDevices as fallback
      if (useQrScanner.value) {
        console.log('QrScanner failed, trying MediaDevices fallback...');
        useQrScanner.value = false;
        await initializeMediaDevices();
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
  };
  
  // Function to handle QR code detection (for QrScanner)
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
    }, 2000);
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