<script setup lang="ts">
import { onMounted, nextTick, useSlots } from 'vue'

const slots = useSlots()

  const emit = defineEmits<{
    (e: 'index', value: number): void
  }>()

onMounted(async () => {
  await nextTick()

  const cards = document.querySelectorAll('.card')
  const leftArrow = document.querySelector('.nav-arrow.left')
  const rightArrow = document.querySelector('.nav-arrow.right')

  let currentIndex = 0
  let isAnimating = false


  function updateCarousel(newIndex: number): void {
    if (isAnimating) return
    isAnimating = true

    currentIndex = (newIndex + cards.length) % cards.length

    cards.forEach((card, i) => {
      const offset = (i - currentIndex + cards.length) % cards.length

      card.classList.remove('center', 'left-1', 'right-1', 'hidden')

      if (offset === 0) card.classList.add('center')
      else if (offset === 1) card.classList.add('right-1')
      else if (offset === cards.length - 1) card.classList.add('left-1')
      else card.classList.add('hidden')
    })

    setTimeout(() => {
      isAnimating = false
    }, 800)
    emit('index', currentIndex)
  }

  leftArrow?.addEventListener('click', () => {
    updateCarousel(currentIndex - 1)
  })

  rightArrow?.addEventListener('click', () => {
    updateCarousel(currentIndex + 1)
  })

  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      updateCarousel(i)
    })
  })


  updateCarousel(0)
})
</script>

<template>
  <div class="carousel-container">
    <button class="nav-arrow left">‹</button>

    <div class="carousel-track">
      <component
        v-for="(child, index) in slots.default?.() || []"
        :is="child"
        :key="index"
        class="card"
      />
    </div>

    <button class="nav-arrow right">›</button>
  </div>
</template>

<style scoped>
.carousel-container {
  width: 100%;
  max-width: 1200px;
  height: 300px;
  position: relative;
  perspective: 1000px;
  margin-top: 80px;
  overflow: visible;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -15%);
}

.carousel-track {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  user-select: none;
}

/* cartão de crédito - padrão */
::v-deep(.card) {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transform-origin: center center;
  transition:
    transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.8s ease;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

/* Card central maior e destacado */
::v-deep(.card.center) {
  opacity: 1;
  z-index: 10;
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
}

/* Card da esquerda menor */
::v-deep(.card.left-1) {
  opacity: 0.7;
  z-index: 5;
  transform: translate(calc(-50% - 180px), -50%) scale(0.85);
  filter: grayscale(20%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Card da direita menor */
::v-deep(.card.right-1) {
  opacity: 0.7;
  z-index: 5;
  transform: translate(calc(-50% + 180px), -50%) scale(0.85);
  filter: grayscale(20%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Cards escondidos */
::v-deep(.card.hidden) {
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0.5);
  z-index: 0;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  font-size: 1.8rem;
  border: none;
  outline: none;
  transition: all 0.3s ease;
  user-select: none;
  color: #9b51e0;
}
.nav-arrow:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow.left {
  left: 10px;
}

.nav-arrow.right {
  right: 10px;
}

@media (max-width: 768px) {
  ::v-deep(.card) {
    width: 280px;
    height: 175px;
  }
  ::v-deep(.card.left-1),
  ::v-deep(.card.right-1) {
    transform: translate(calc(-50% - 140px), -50%) scale(0.8);
  }
  ::v-deep(.card.right-1) {
    transform: translate(calc(-50% + 140px), -50%) scale(0.8);
  }
}
</style>
