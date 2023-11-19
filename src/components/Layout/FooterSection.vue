<template>
  <footer class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div class="mb-4 md:mb-0">
        <img :src="require('@/assets/logo.png')" alt="App Logo" class="h-8" />
      </div>

      <!-- Social Media Icons -->
      <!-- <div class="flex space-x-4 mb-4 md:mb-0">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="path-to-instagram-icon.png" alt="Instagram" class="h-6" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="path-to-facebook-icon.png" alt="Facebook" class="h-6" />
        </a>
      </div> -->

      <!-- Copyright Text -->
      <div>
        <p>&copy; 2023 Your Company Name. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>
