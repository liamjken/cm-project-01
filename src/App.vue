<template>
<v-app id="inspire">
  <v-app-bar
    class="px-3"
    color="masthead"
    flat
    density="compact"
    >
    <v-img 
        class="" 
        src="./assets/logo.new.png"
        max-width="200"
        ></v-img>
    <v-spacer></v-spacer>
 
  </v-app-bar>
  <v-main>
    <RouterView></RouterView>
  </v-main>
</v-app>
</template>