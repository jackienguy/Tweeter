<template>
  <div>
    <v-card
    height="900"
    width="256"
    class="mx-auto"
    >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-icon
              large
              color="blue darken-2"
            >
                fas fa-kiwi-bird
            </v-icon>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
  </div>
</template>  
 

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Home', icon: 'fas fa-home' },
          { title: 'Discovery', icon: 'fas fa-hashtag' },
          { title: 'Profile', icon: 'fas fa-user-alt' },
        ],
        right: null,
      }
    },
    
  }
</script>




