<template>
    <v-dialog
    transition="dialog-bottom-transition"
    width="auto"
    v-model="store.completed"
    >

        <template v-slot:default="{ isActive }">
            <v-card>
                <v-toolbar color="primary">
                <div class="v-toolbar-title">
                <slot name="title"></slot>
                </div>
                </v-toolbar>
                    <v-card-text>
                    <div class="text-h4 pa-12">
                    <slot name="content"></slot>
                    </div>
                    </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn
                            variant="text"
                            @click="isActive.value = false"
                            >Close</v-btn>
                        </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>


<script lang="ts" setup>
import { useAppStore } from '../store/app'

const store = useAppStore()




</script>