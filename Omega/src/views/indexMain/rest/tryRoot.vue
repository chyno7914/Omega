<template>
  <div id="amessage">
    <h1>Realtime Data:</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import io from "socket.io-client";
const message = ref("");

// onMounted(() => {
//   const socket = io("http://localhost:3008");

//   socket.on("connect", () => {
//     console.log("client: connected to server");
//   });

//   socket.on("message", (data: any) => {
//     console.log(`client: received message "${data}" from server`);
//     message.value = data;
//   });
// });
</script>

<style scoped>
#amessage {
  text-align: center;
}
</style>
