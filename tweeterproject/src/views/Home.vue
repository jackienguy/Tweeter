<template>
  <div class="home">
   <template>
  <div>
   <p>This is the home page</p>
  </div>
</template>

  </div>
</template>

<script>
  export default {
    data: () => ({
      activePicker: null,
      date: null,
      menu: false,
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    },
  }
</script>