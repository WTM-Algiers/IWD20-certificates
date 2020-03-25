<template>
  <div class="NuxtLogo">
    <img src="~/assets/wtm.svg" alt="wtm" />
  </div>
</template>
<style>
.NuxtLogo {
  animation: 1s appear;
  margin: auto;
  display: flex;
  height: 8vh;
  align-items: center;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@media only screen and (max-width: 1200px) {
  .NuxtLogo {
    height: 15vh;
  }
  h1 {
    font-size: 1.5rem;
  }
}
</style>
