<template>
  <Teleport to="#modal">
    <Transition name="modal">
        <div class="modal-container flex justify-center items-center flex-col" v-if="isModalOpen">
            <div class="modal max-h-full w-2/5 bg-white p-4" ref="modalRef">
              <div class="close-modal flex justify-end items-end">
                  <Icon type="x" @click="closeModal" />
              </div>
            <div class="modal-title my-4 text-center">
              <h2>{{ title }}</h2>
            </div>
            <div class="modal-description my-2 text-center">
              <p>{{ description }}</p>
            </div>
    
            <div class="modal-type flex justify-between items-center my-4" v-if="type">
              <div class="modal-type-body" :class="`modal-${type}`">
                <p>
                  {{ typeDescription }}
                </p>
              </div>
            </div>
            <div class="modal-buttons flex justify-center items-center gap-5">
                <div class="cancel">
                    <button class="btn bg-slate-500">Cancel</button>
                </div>
                <div class="continue">
                    <button :class="`btn ${buttonColorClass}`">Continue</button>
                </div>
            </div>
            <slot />
          </div>
        </div>
    </Transition>
  </Teleport>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Icon from '../buttons/Icon.vue';
import {onClickOutside} from '@vueuse/core'
interface IModalProps {
  title?: string;
  description?: string;
  typeDescription?: string;
  type?: "warning" | "success" | "info";
}
const props = defineProps<IModalProps>();

// Data properties
const isModalOpen = ref(true);
const modalRef = ref(null);
const buttonColorClass = ref("")

function determineClassClose(){
    if(props.type === "info") buttonColorClass.value = "bg-blue-700";
    if(props.type === "success") buttonColorClass.value = "bg-green-700";
    if(props.type === "warning") buttonColorClass.value = "bg-red-700";
}
determineClassClose()
// Methods
const closeModal = ()=>{
    isModalOpen.value = false
    console.log("clicked");
    
}

onClickOutside(modalRef, ()=> (isModalOpen.value = false))
</script>
<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0000008e;
  z-index: 999;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

.modal-warning {
  background: #ffe2ce;
}
.modal-warning::before {
  content: "";
  background: #da2c38;
}
.modal-success {
  background: #ceffd3;
}
.modal-success::before {
  content: "";
  background: #2af791;
}.modal-info {
  background: #ced4ff;
}
.modal-info::before {
  content: "";
  background: #2c89da;
}
.modal-type-body {
  flex: 1 1 auto;
  padding: 2rem;
  position: relative;
}
.modal-type-body::before {
  content: "";
  position: absolute;
  width: 4px;
  left: 0;
  top: 0;
  left: 0;
  bottom: 0;
}
.modal {
  border-radius: 5px;
}

@media (max-width: 768px) {
  .modal {
    width: 85%;
    margin: 0 auto;
  }
}

.modal-enter-active, .modal-leave-active {
    transition: all .3s ease-in-out;
}
.modal-enter-from, .modal-enter-to{
    opacity: 0;
    transform: scale(1.1);
}
</style>
